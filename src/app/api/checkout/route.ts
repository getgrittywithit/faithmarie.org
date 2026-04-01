import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-08-27.basil',
  });
  try {
    const { amount } = await request.json();

    if (!amount || amount < 100) {
      return NextResponse.json(
        { error: 'Invalid amount. Minimum donation is $1.' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Donation to Faith Marie Foundation',
              description: 'Thank you for supporting mental health research accessibility.',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://faithmarie.org'}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://faithmarie.org'}/donate/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
