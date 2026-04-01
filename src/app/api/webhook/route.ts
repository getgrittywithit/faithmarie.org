import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-08-27.basil',
  });
  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name;
    const amount = session.amount_total ? (session.amount_total / 100).toFixed(2) : '0.00';
    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'info@faithmarie.org';

    // Send thank you email to donor
    if (customerEmail) {
      try {
        await resend.emails.send({
          from: 'Faith Marie Foundation <noreply@faithmarie.org>',
          to: customerEmail,
          subject: 'Thank You for Your Donation',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #0D9488;">Thank You for Your Generosity</h1>
              <p>Dear ${customerName || 'Friend'},</p>
              <p>Thank you for your donation of <strong>$${amount}</strong> to Faith Marie Foundation.</p>
              <p>Your support helps us:</p>
              <ul>
                <li>Power AI research teams scanning thousands of papers daily</li>
                <li>Build tools that make mental health support accessible</li>
                <li>Keep our resources free for everyone who needs them</li>
              </ul>
              <p>Every contribution extends Faith Marie's legacy and helps ensure that no one has to navigate mental health challenges alone.</p>
              <p style="margin-top: 30px;">
                <a href="https://faithmarie.org/our-story" style="background-color: #0D9488; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Read Our Story</a>
              </p>
              <p style="color: #666; font-size: 14px; margin-top: 40px;">
                With deep gratitude,<br>
                The Faith Marie Foundation Team
              </p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
              <p style="color: #999; font-size: 12px;">
                This email serves as your donation receipt. Amount: $${amount}. Date: ${new Date().toLocaleDateString()}.
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send donor thank you email:', emailError);
      }
    }

    // Send notification to foundation
    try {
      await resend.emails.send({
        from: 'Faith Marie Foundation <noreply@faithmarie.org>',
        to: notificationEmail,
        subject: `New Donation: $${amount}`,
        html: `
          <h2>New Donation Received!</h2>
          <p><strong>Amount:</strong> $${amount}</p>
          <p><strong>Donor:</strong> ${customerName || 'Anonymous'}</p>
          <p><strong>Email:</strong> ${customerEmail || 'Not provided'}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Stripe Session ID:</strong> ${session.id}</p>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send donation notification:', emailError);
    }
  }

  return NextResponse.json({ received: true });
}
