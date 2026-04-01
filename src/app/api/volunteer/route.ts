import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { name, email, skills, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'info@faithmarie.org';

    await resend.emails.send({
      from: 'Faith Marie Foundation <noreply@faithmarie.org>',
      to: notificationEmail,
      subject: `New Volunteer Application: ${name}`,
      html: `
        <h2>New Volunteer Application</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Skills/Expertise:</strong> ${skills || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Volunteer application error:', error);
    return NextResponse.json(
      { error: 'Failed to submit volunteer application' },
      { status: 500 }
    );
  }
}
