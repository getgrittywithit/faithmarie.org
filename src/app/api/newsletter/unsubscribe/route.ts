import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  if (!email) {
    return new NextResponse(
      generateUnsubscribePage('Missing email address', false),
      { headers: { 'Content-Type': 'text/html' } }
    );
  }

  // Validate token (simple hash check for basic security)
  const expectedToken = generateUnsubscribeToken(email);
  if (token !== expectedToken) {
    return new NextResponse(
      generateUnsubscribePage('Invalid unsubscribe link', false),
      { headers: { 'Content-Type': 'text/html' } }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const supabase = createAdminClient();
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  try {
    // Remove from Resend audience
    if (audienceId) {
      await resend.contacts.remove({
        email,
        audienceId,
      });
    }

    // Mark as unsubscribed in Supabase
    await supabase
      .from('subscribers')
      .update({ unsubscribed_at: new Date().toISOString() } as never)
      .eq('email', email);

    return new NextResponse(
      generateUnsubscribePage('You have been unsubscribed', true),
      { headers: { 'Content-Type': 'text/html' } }
    );
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return new NextResponse(
      generateUnsubscribePage('Something went wrong. Please try again or contact us.', false),
      { headers: { 'Content-Type': 'text/html' } }
    );
  }
}

// POST endpoint for form-based unsubscribe
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const supabase = createAdminClient();
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    // Remove from Resend audience
    if (audienceId) {
      await resend.contacts.remove({
        email,
        audienceId,
      });
    }

    // Mark as unsubscribed in Supabase
    await supabase
      .from('subscribers')
      .update({ unsubscribed_at: new Date().toISOString() } as never)
      .eq('email', email);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to unsubscribe' },
      { status: 500 }
    );
  }
}

// Generate a simple token for unsubscribe links
export function generateUnsubscribeToken(email: string): string {
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY || 'fallback-secret';
  // Simple hash - in production you might want something more robust
  const data = `${email}:${secret}`;
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

// Generate unsubscribe URL for use in emails
export function generateUnsubscribeUrl(email: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://faithmarie.org';
  const token = generateUnsubscribeToken(email);
  return `${baseUrl}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}&token=${token}`;
}

function generateUnsubscribePage(message: string, success: boolean): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${success ? 'Unsubscribed' : 'Unsubscribe Error'} - Faith Marie Foundation</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #f9fafb;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      padding: 20px;
    }
    .container {
      background: white;
      border-radius: 12px;
      padding: 40px;
      max-width: 480px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .icon {
      width: 64px;
      height: 64px;
      margin: 0 auto 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
    }
    .icon.success { background-color: #d1fae5; }
    .icon.error { background-color: #fee2e2; }
    h1 {
      color: #111827;
      font-size: 24px;
      margin-bottom: 12px;
    }
    p {
      color: #6b7280;
      margin-bottom: 24px;
    }
    a {
      color: #0d9488;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon ${success ? 'success' : 'error'}">
      ${success ? '✓' : '✕'}
    </div>
    <h1>${message}</h1>
    <p>
      ${success
        ? 'You will no longer receive newsletter emails from Faith Marie Foundation.'
        : 'Please try again or contact us at info@faithmarie.org'}
    </p>
    <a href="https://faithmarie.org">Return to Faith Marie Foundation</a>
  </div>
</body>
</html>
`;
}
