import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import crypto from 'crypto';

// Resend webhook event types
type ResendEventType =
  | 'email.sent'
  | 'email.delivered'
  | 'email.delivery_delayed'
  | 'email.complained'
  | 'email.bounced'
  | 'email.opened'
  | 'email.clicked';

interface ResendWebhookPayload {
  type: ResendEventType;
  created_at: string;
  data: {
    email_id: string;
    from: string;
    to: string[];
    subject: string;
    tags?: { name: string; value: string }[];
    click?: {
      link: string;
      timestamp: string;
    };
  };
}

// Verify Svix webhook signature
function verifyWebhookSignature(
  payload: string,
  headers: {
    svixId: string | null;
    svixTimestamp: string | null;
    svixSignature: string | null;
  },
  secret: string
): boolean {
  const { svixId, svixTimestamp, svixSignature } = headers;

  if (!svixId || !svixTimestamp || !svixSignature) {
    return false;
  }

  // Check timestamp is within 5 minutes
  const timestamp = parseInt(svixTimestamp, 10);
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - timestamp) > 300) {
    return false;
  }

  // Build the signed content
  const signedContent = `${svixId}.${svixTimestamp}.${payload}`;

  // Decode the secret (base64 with "whsec_" prefix)
  const secretBytes = Buffer.from(secret.replace('whsec_', ''), 'base64');

  // Calculate expected signature
  const expectedSignature = crypto
    .createHmac('sha256', secretBytes)
    .update(signedContent)
    .digest('base64');

  // Compare signatures (svixSignature format: "v1,<signature>")
  const signatures = svixSignature.split(' ');
  for (const sig of signatures) {
    const [version, signature] = sig.split(',');
    if (version === 'v1' && signature === expectedSignature) {
      return true;
    }
  }

  return false;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();

    // Verify webhook signature if secret is configured
    const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;
    if (webhookSecret) {
      const isValid = verifyWebhookSignature(body, {
        svixId: request.headers.get('svix-id'),
        svixTimestamp: request.headers.get('svix-timestamp'),
        svixSignature: request.headers.get('svix-signature'),
      }, webhookSecret);

      if (!isValid) {
        console.error('Invalid webhook signature');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    const payload: ResendWebhookPayload = JSON.parse(body);
    const { type, data } = payload;

    const supabase = createAdminClient();

    // Find the recipient record by resend_email_id
    const { data: recipient, error: recipientError } = await supabase
      .from('newsletter_recipients')
      .select('id, send_id')
      .eq('resend_email_id', data.email_id)
      .single();

    if (recipientError || !recipient) {
      // Not a newsletter email or recipient not found
      return NextResponse.json({ received: true });
    }

    const now = new Date().toISOString();

    switch (type) {
      case 'email.delivered':
        // Update recipient as delivered
        await supabase
          .from('newsletter_recipients')
          .update({ delivered_at: now })
          .eq('id', recipient.id);

        // Increment delivered count on send
        await supabase.rpc('increment_newsletter_stat', {
          p_send_id: recipient.send_id,
          p_column: 'delivered_count',
        });
        break;

      case 'email.opened':
        // Only count first open
        const { data: existingOpen } = await supabase
          .from('newsletter_recipients')
          .select('opened_at')
          .eq('id', recipient.id)
          .single();

        if (!existingOpen?.opened_at) {
          await supabase
            .from('newsletter_recipients')
            .update({ opened_at: now })
            .eq('id', recipient.id);

          await supabase.rpc('increment_newsletter_stat', {
            p_send_id: recipient.send_id,
            p_column: 'opened_count',
          });

          // Update subscriber's last opened timestamp
          const { data: recipientWithSub } = await supabase
            .from('newsletter_recipients')
            .select('subscriber_id')
            .eq('id', recipient.id)
            .single();

          if (recipientWithSub?.subscriber_id) {
            await supabase
              .from('subscribers')
              .update({ last_email_opened_at: now })
              .eq('id', recipientWithSub.subscriber_id);
          }
        }
        break;

      case 'email.clicked':
        // Only count first click
        const { data: existingClick } = await supabase
          .from('newsletter_recipients')
          .select('clicked_at')
          .eq('id', recipient.id)
          .single();

        if (!existingClick?.clicked_at) {
          await supabase
            .from('newsletter_recipients')
            .update({ clicked_at: now })
            .eq('id', recipient.id);

          await supabase.rpc('increment_newsletter_stat', {
            p_send_id: recipient.send_id,
            p_column: 'clicked_count',
          });
        }
        break;

      case 'email.bounced':
        await supabase
          .from('newsletter_recipients')
          .update({ bounced_at: now })
          .eq('id', recipient.id);

        await supabase.rpc('increment_newsletter_stat', {
          p_send_id: recipient.send_id,
          p_column: 'bounced_count',
        });

        // Increment subscriber bounce count
        const { data: recipientForBounce } = await supabase
          .from('newsletter_recipients')
          .select('subscriber_id')
          .eq('id', recipient.id)
          .single();

        if (recipientForBounce?.subscriber_id) {
          const { data: subscriber } = await supabase
            .from('subscribers')
            .select('bounce_count')
            .eq('id', recipientForBounce.subscriber_id)
            .single();

          await supabase
            .from('subscribers')
            .update({ bounce_count: (subscriber?.bounce_count || 0) + 1 })
            .eq('id', recipientForBounce.subscriber_id);
        }
        break;

      case 'email.complained':
        // User marked as spam - unsubscribe them
        const { data: recipientForComplaint } = await supabase
          .from('newsletter_recipients')
          .select('subscriber_id')
          .eq('id', recipient.id)
          .single();

        if (recipientForComplaint?.subscriber_id) {
          await supabase
            .from('subscribers')
            .update({ unsubscribed_at: now })
            .eq('id', recipientForComplaint.subscriber_id);
        }
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Resend webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
