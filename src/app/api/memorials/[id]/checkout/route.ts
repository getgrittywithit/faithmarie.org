import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-08-27.basil',
  });

  try {
    const { id: memorialId } = await params;
    const { amount, donorName, donorEmail, message } = await request.json();

    if (!amount || amount < 100) {
      return NextResponse.json(
        { error: 'Invalid amount. Minimum donation is $1.' },
        { status: 400 }
      );
    }

    // Get memorial info for the donation description
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = createAdminClient() as any;
    const { data: memorial, error } = await supabase
      .from('memorials')
      .select('deceased_full_name, slug')
      .eq('id', memorialId)
      .single();

    if (error || !memorial) {
      return NextResponse.json({ error: 'Memorial not found' }, { status: 404 });
    }

    const fullName = memorial.deceased_full_name;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: donorEmail || undefined,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Donation in Memory of ${fullName}`,
              description: 'Your gift supports grieving families through Faith Marie Foundation.',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        memorial_id: memorialId,
        memorial_slug: memorial.slug,
        donor_name: donorName || '',
        donor_message: message || '',
        donation_type: 'in_memory',
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://faithmarie.org'}/in-memory/${memorial.slug}?donation=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://faithmarie.org'}/in-memory/${memorial.slug}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Memorial checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
