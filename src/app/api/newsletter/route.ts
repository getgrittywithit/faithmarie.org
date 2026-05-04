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
      },
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
      ? `<p>You've selected to receive updates about: <strong>${topicLabels}</strong></p>`
      : '';

    // Send welcome email to subscriber
    await resend.emails.send({
      from: 'Faith Marie Foundation <noreply@faithmarie.org>',
      to: email,
      subject: 'Welcome to Faith Marie Foundation',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0D9488;">Welcome to Faith Marie Foundation</h1>
          <p>Thank you for subscribing to our newsletter${firstName ? `, ${firstName}` : ''}!</p>
          ${topicContent}
          <p>Here's what to expect:</p>
          <ul>
            <li><strong>Tuesday:</strong> Research Roundup - the latest findings and practical takeaways</li>
            <li><strong>Friday:</strong> Weekend Read - a featured deep-dive plus helpful resources</li>
          </ul>
          <p>We're working to make mental health research accessible to everyone through AI. Your support means the world to us.</p>
          <p style="margin-top: 30px;">
            <a href="https://faithmarie.org/research" style="background-color: #0D9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Explore Our Research</a>
          </p>
          <p style="color: #666; font-size: 14px; margin-top: 40px;">
            With gratitude,<br>
            The Faith Marie Foundation Team
          </p>
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
