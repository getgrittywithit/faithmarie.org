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

    if (!audienceId) {
      console.error('RESEND_AUDIENCE_ID not configured');
      return NextResponse.json(
        { error: 'Newsletter signup is not configured' },
        { status: 500 }
      );
    }

    await resend.contacts.create({
      email,
      firstName: firstName || undefined,
      audienceId,
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
