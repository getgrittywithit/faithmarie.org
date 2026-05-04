import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createAdminClient } from '@/lib/supabase/admin';

type Topic = 'depression' | 'anxiety' | 'ptsd' | 'grief';

const TOPIC_LABELS: Record<Topic, string> = {
  depression: 'Depression',
  anxiety: 'Anxiety',
  ptsd: 'PTSD',
  grief: 'Grief',
};

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const supabase = createAdminClient();

  try {
    const { email, firstName, topics, source } = await request.json() as {
      email: string;
      firstName?: string;
      topics?: Topic[];
      source?: string;
    };

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const audienceId = process.env.RESEND_AUDIENCE_ID;
    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'info@faithmarie.org';

    if (!audienceId) {
      console.error('RESEND_AUDIENCE_ID not configured');
      return NextResponse.json(
        { error: 'Newsletter signup is not configured' },
        { status: 500 }
      );
    }

    // Add contact to Resend audience
    const { data: contact } = await resend.contacts.create({
      email,
      firstName: firstName || undefined,
      audienceId,
    });

    // Sync to Supabase subscribers table
    const { error: dbError } = await supabase.from('subscribers').upsert(
      {
        email,
        name: firstName || null,
        topics: topics || [],
        source: source || 'website',
        resend_contact_id: contact?.id || null,
        subscribed_at: new Date().toISOString(),
        unsubscribed_at: null, // Clear any previous unsubscribe
      } as never,
      { onConflict: 'email' }
    );

    if (dbError) {
      console.error('Failed to sync subscriber to database:', dbError);
      // Don't fail the request - Resend is the source of truth for email delivery
    }

    // Format topics for email
    const topicLabels = topics && topics.length > 0
      ? topics.map(t => TOPIC_LABELS[t]).join(', ')
      : null;

    // Build what to expect content based on topics
    const topicContent = topicLabels
      ? `<p style="color: #44403c; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">You mentioned an interest in <strong style="color: #1c1917;">${topicLabels}</strong>. We'll keep that in mind when we share resources.</p>`
      : '';

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://faithmarie.org';

    // Send welcome email to subscriber
    await resend.emails.send({
      from: 'Faith Marie Foundation <hello@faithmarie.org>',
      to: email,
      subject: 'Welcome to Faith Marie Foundation',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #F5EDE0; padding: 40px 24px;">
          <div style="background-color: #ffffff; border-radius: 8px; padding: 32px; border: 1px solid #e7e5e4;">
            <h1 style="font-family: Georgia, 'Times New Roman', serif; color: #1c1917; font-size: 28px; font-weight: 600; margin: 0 0 24px 0; line-height: 1.2;">
              ${firstName ? `Hello, ${firstName}` : 'Hello'}
            </h1>

            <p style="color: #44403c; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              Thank you for joining our community. We are glad you are here.
            </p>

            ${topicContent}

            <p style="color: #44403c; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              We send a newsletter twice a week:
            </p>

            <ul style="color: #44403c; font-size: 16px; line-height: 1.8; margin: 0 0 24px 0; padding-left: 20px;">
              <li><strong style="color: #1c1917;">Tuesdays</strong> — Research roundup with the latest findings and practical takeaways</li>
              <li><strong style="color: #1c1917;">Fridays</strong> — A longer read, plus resources that might help</li>
            </ul>

            <p style="color: #44403c; font-size: 16px; line-height: 1.6; margin: 0 0 28px 0;">
              Our mission is to make mental health and grief education clearer, kinder, and easier to act on. Everything we publish is free, ad-free, and written for the person reading on their phone at 2 a.m. who just wants to know what to do next.
            </p>

            <p style="margin: 0 0 32px 0;">
              <a href="${siteUrl}/research" style="display: inline-block; background-color: #1B6E68; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 500;">
                Explore our resources
              </a>
            </p>

            <p style="color: #44403c; font-size: 16px; line-height: 1.6; margin: 0;">
              With care,<br>
              <strong style="color: #1c1917;">Levi</strong><br>
              <span style="color: #57534e; font-size: 14px;">Faith Marie Foundation</span>
            </p>
          </div>

          <div style="text-align: center; padding: 24px 0 0 0;">
            <p style="color: #57534e; font-size: 13px; line-height: 1.5; margin: 0 0 8px 0;">
              FaithMarie.org — Mental health and grief education, explained with care.
            </p>
            <p style="color: #57534e; font-size: 13px; line-height: 1.5; margin: 0;">
              <a href="${siteUrl}/unsubscribe?email=${encodeURIComponent(email)}" style="color: #1B6E68; text-decoration: underline;">Unsubscribe</a>
            </p>
          </div>
        </div>
      `,
    });

    // Send notification to foundation
    await resend.emails.send({
      from: 'Faith Marie Foundation <noreply@faithmarie.org>',
      to: notificationEmail,
      subject: 'New Newsletter Subscriber',
      html: `
        <h2>New Newsletter Subscriber</h2>
        <p><strong>Email:</strong> ${email}</p>
        ${firstName ? `<p><strong>Name:</strong> ${firstName}</p>` : ''}
        ${topicLabels ? `<p><strong>Topics:</strong> ${topicLabels}</p>` : '<p><strong>Topics:</strong> All topics</p>'}
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter signup error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
}
