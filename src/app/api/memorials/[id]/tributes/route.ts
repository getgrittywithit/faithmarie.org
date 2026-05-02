import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { headers } from 'next/headers';
import { sendNewTributeEmail } from '@/lib/email/memorial-templates';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: memorialId } = await params;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = createAdminClient() as any;

    const { data: tributes, error } = await supabase
      .from('tributes')
      .select('*')
      .eq('memorial_id', memorialId)
      .eq('status', 'approved')
      .order('submitted_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch tributes' }, { status: 500 });
    }

    return NextResponse.json({ tributes });
  } catch (error) {
    console.error('Error fetching tributes:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: memorialId } = await params;
    const body = await request.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = createAdminClient() as any;
    const headersList = await headers();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Get IP address
    const ipAddress =
      headersList.get('cf-connecting-ip') ||
      headersList.get('x-real-ip') ||
      headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      null;

    // Check if email has been previously approved
    const { data: previousTributes } = await supabase
      .from('tributes')
      .select('id')
      .eq('visitor_email', body.email)
      .eq('status', 'approved')
      .limit(1);

    // Auto-approve if email has previous approved tributes
    const autoApprove = previousTributes && previousTributes.length > 0;

    // Rate limiting: check tributes from this IP in the last hour
    if (ipAddress) {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
      const { count } = await supabase
        .from('tributes')
        .select('*', { count: 'exact', head: true })
        .eq('ip_address', ipAddress)
        .gte('submitted_at', oneHourAgo);

      if ((count ?? 0) >= 5) {
        return NextResponse.json(
          { error: 'Too many submissions. Please try again later.' },
          { status: 429 }
        );
      }
    }

    // Insert tribute
    const { data: tribute, error } = await supabase
      .from('tributes')
      .insert({
        memorial_id: memorialId,
        visitor_name: body.name,
        visitor_email: body.email,
        visitor_relationship: body.relationship || null,
        message: body.message,
        status: autoApprove ? 'approved' : 'pending',
        ip_address: ipAddress,
        visitor_email_verified: false,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating tribute:', error);
      return NextResponse.json({ error: 'Failed to submit tribute' }, { status: 500 });
    }

    // Send notification email to memorial creator
    try {
      const { data: memorial } = await supabase
        .from('memorials')
        .select('slug, deceased_full_name, creator_id')
        .eq('id', memorialId)
        .single();

      if (memorial) {
        const { data: creator } = await supabase
          .from('memorial_users')
          .select('email, full_name')
          .eq('user_id', memorial.creator_id)
          .single();

        if (creator?.email) {
          await sendNewTributeEmail(
            {
              id: memorialId,
              slug: memorial.slug,
              deceasedName: memorial.deceased_full_name,
              creatorEmail: creator.email,
              creatorName: creator.full_name || 'Friend',
            },
            {
              visitorName: body.name,
              message: body.message,
            }
          );
        }
      }
    } catch (emailError) {
      console.error('Failed to send tribute notification:', emailError);
    }

    return NextResponse.json({
      success: true,
      status: tribute.status,
      message: autoApprove
        ? 'Your tribute has been published.'
        : 'Your tribute has been submitted for review.',
    });
  } catch (error) {
    console.error('Error in tribute submission:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
