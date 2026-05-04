import { Resend } from 'resend';
import { createAdminClient } from '@/lib/supabase/admin';
import { generateNewsletterHtml, generatePlainText } from './newsletter-template';
import type { Post, Subscriber } from '@/lib/supabase/types';

const BATCH_SIZE = 50;
const BATCH_DELAY_MS = 1000; // 1 second between batches to respect rate limits

interface SendNewsletterOptions {
  post: Post;
  sendId: string;
  targetTopics: string[];
  targetAllSubscribers: boolean;
  sentBy: string;
}

interface SendResult {
  success: boolean;
  totalSent: number;
  errors: string[];
}

// Sleep utility
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function sendNewsletter({
  post,
  sendId,
  targetTopics,
  targetAllSubscribers,
  sentBy,
}: SendNewsletterOptions): Promise<SendResult> {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const supabase = createAdminClient();

  const errors: string[] = [];
  let totalSent = 0;

  try {
    // Update send status to 'sending'
    await supabase
      .from('newsletter_sends')
      .update({
        status: 'sending',
        started_at: new Date().toISOString(),
      })
      .eq('id', sendId);

    // Get subscribers based on targeting
    let query = supabase
      .from('subscribers')
      .select('*')
      .is('unsubscribed_at', null);

    if (!targetAllSubscribers && targetTopics.length > 0) {
      // Filter by topics - subscribers must have at least one matching topic
      query = query.overlaps('topics', targetTopics);
    }

    const { data: subscribers, error: fetchError } = await query;

    if (fetchError) {
      throw new Error(`Failed to fetch subscribers: ${fetchError.message}`);
    }

    if (!subscribers || subscribers.length === 0) {
      await supabase
        .from('newsletter_sends')
        .update({
          status: 'sent',
          completed_at: new Date().toISOString(),
          total_recipients: 0,
          sent_count: 0,
        })
        .eq('id', sendId);

      return { success: true, totalSent: 0, errors: [] };
    }

    // Update total recipients count
    await supabase
      .from('newsletter_sends')
      .update({ total_recipients: subscribers.length })
      .eq('id', sendId);

    // Process subscribers in batches
    for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
      const batch = subscribers.slice(i, i + BATCH_SIZE);

      for (const subscriber of batch) {
        try {
          const emailHtml = generateNewsletterHtml({
            title: post.title,
            preheader: post.email_preheader || undefined,
            content: post.body_html || post.body,
            featuredImageUrl: post.featured_image_url || undefined,
            subscriberEmail: subscriber.email,
          });

          const emailText = generatePlainText({
            title: post.title,
            content: post.body_html || post.body,
            subscriberEmail: subscriber.email,
          });

          const { data: emailResult, error: sendError } = await resend.emails.send({
            from: 'Faith Marie Foundation <noreply@faithmarie.org>',
            to: subscriber.email,
            subject: post.email_subject || post.title,
            html: emailHtml,
            text: emailText,
            tags: [
              { name: 'send_id', value: sendId },
              { name: 'post_id', value: post.id },
            ],
          });

          if (sendError) {
            errors.push(`Failed to send to ${subscriber.email}: ${sendError.message}`);
            continue;
          }

          // Create recipient record
          await supabase.from('newsletter_recipients').insert({
            send_id: sendId,
            subscriber_id: subscriber.id,
            resend_email_id: emailResult?.id || null,
            sent_at: new Date().toISOString(),
          });

          // Update subscriber's last email sent timestamp
          await supabase
            .from('subscribers')
            .update({ last_email_sent_at: new Date().toISOString() })
            .eq('id', subscriber.id);

          totalSent++;

          // Update sent count periodically
          if (totalSent % 10 === 0) {
            await supabase
              .from('newsletter_sends')
              .update({ sent_count: totalSent })
              .eq('id', sendId);
          }
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Unknown error';
          errors.push(`Failed to send to ${subscriber.email}: ${errorMessage}`);
        }
      }

      // Pause between batches to respect rate limits
      if (i + BATCH_SIZE < subscribers.length) {
        await sleep(BATCH_DELAY_MS);
      }
    }

    // Update send status to 'sent'
    await supabase
      .from('newsletter_sends')
      .update({
        status: 'sent',
        completed_at: new Date().toISOString(),
        sent_count: totalSent,
      })
      .eq('id', sendId);

    return { success: true, totalSent, errors };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    errors.push(errorMessage);

    // Update send status to 'failed'
    await supabase
      .from('newsletter_sends')
      .update({
        status: 'failed',
        completed_at: new Date().toISOString(),
        sent_count: totalSent,
      })
      .eq('id', sendId);

    return { success: false, totalSent, errors };
  }
}

export async function sendTestEmail(
  post: Post,
  recipientEmail: string
): Promise<{ success: boolean; error?: string }> {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const emailHtml = generateNewsletterHtml({
      title: post.title,
      preheader: post.email_preheader || undefined,
      content: post.body_html || post.body,
      featuredImageUrl: post.featured_image_url || undefined,
      subscriberEmail: recipientEmail,
    });

    const emailText = generatePlainText({
      title: post.title,
      content: post.body_html || post.body,
      subscriberEmail: recipientEmail,
    });

    const { error } = await resend.emails.send({
      from: 'Faith Marie Foundation <noreply@faithmarie.org>',
      to: recipientEmail,
      subject: `[TEST] ${post.email_subject || post.title}`,
      html: emailHtml,
      text: emailText,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to send test email',
    };
  }
}
