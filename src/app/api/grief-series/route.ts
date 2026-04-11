import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getGriefSeriesEmail } from '@/data/grief-series-emails';
import { addSubscriber, getSubscriber, getStorageType } from '@/lib/grief-series-storage';

function wrapEmailTemplate(content: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <a href="https://faithmarie.org" style="color: #0D9488; text-decoration: none; font-size: 18px;">Faith Marie Foundation</a>
          <p style="color: #666; font-size: 12px; margin-top: 5px;">7-Day Grief Research Series</p>
        </div>

        ${content}

        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999; text-align: center;">
          <p>Faith Marie Foundation | Making mental health research accessible</p>
          <p><a href="https://faithmarie.org/crisis-support" style="color: #DC2626;">Crisis Support</a> • <a href="https://faithmarie.org" style="color: #0D9488;">Visit Website</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { email, firstName } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const existingSubscriber = await getSubscriber(email);
    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'You\'re already signed up for this series! Check your inbox.' },
        { status: 400 }
      );
    }

    // Get Day 1 email content
    const day1Email = getGriefSeriesEmail(1);
    if (!day1Email) {
      throw new Error('Email template not found');
    }

    // Store subscriber for subsequent emails
    await addSubscriber({
      email,
      firstName,
      signupDate: new Date().toISOString(),
      lastDaySent: 1,
    });

    // Also add to main newsletter audience for continued updates
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (audienceId) {
      try {
        await resend.contacts.create({
          email,
          firstName: firstName || undefined,
          audienceId,
        });
      } catch {
        // Contact might already exist, that's okay
      }
    }

    // Send Day 1 email immediately
    await resend.emails.send({
      from: 'Faith Marie Foundation <noreply@faithmarie.org>',
      to: email,
      subject: day1Email.subject,
      html: wrapEmailTemplate(day1Email.content),
    });

    // Notify foundation of new signup
    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'info@faithmarie.org';
    await resend.emails.send({
      from: 'Faith Marie Foundation <noreply@faithmarie.org>',
      to: notificationEmail,
      subject: 'New Grief Series Subscriber',
      html: `
        <h2>New Grief Series Subscriber</h2>
        <p><strong>Email:</strong> ${email}</p>
        ${firstName ? `<p><strong>Name:</strong> ${firstName}</p>` : ''}
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Storage:</strong> ${getStorageType()}</p>
        <p>Day 1 email has been sent automatically.</p>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Grief series signup error:', error);
    return NextResponse.json(
      { error: 'Failed to sign up. Please try again.' },
      { status: 500 }
    );
  }
}

// GET endpoint to check status
export async function GET() {
  return NextResponse.json({
    storageType: getStorageType(),
    message: 'Grief series API is running. POST to subscribe.',
    cronEndpoint: '/api/grief-series/send-daily',
  });
}
