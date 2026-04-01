import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

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

    const audienceId = process.env.RESEND_AUDIENCE_ID;
    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'info@faithmarie.org';

    if (!audienceId) {
      console.error('RESEND_AUDIENCE_ID not configured');
      return NextResponse.json(
        { error: 'Newsletter signup is not configured' },
        { status: 500 }
      );
    }

    // Add contact to audience
    await resend.contacts.create({
      email,
      firstName: firstName || undefined,
      audienceId,
    });

    // Send welcome email to subscriber
    await resend.emails.send({
      from: 'Faith Marie Foundation <noreply@faithmarie.org>',
      to: email,
      subject: 'Welcome to Faith Marie Foundation',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0D9488;">Welcome to Faith Marie Foundation</h1>
          <p>Thank you for subscribing to our newsletter${firstName ? `, ${firstName}` : ''}!</p>
          <p>You'll be the first to know when we:</p>
          <ul>
            <li>Publish new research digests</li>
            <li>Launch new tools and features</li>
            <li>Share updates on our mission</li>
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
