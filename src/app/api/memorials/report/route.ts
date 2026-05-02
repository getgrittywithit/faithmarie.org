import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const headersList = await headers();

    // Validate required fields
    if (!body.memorialSlug || !body.reportType || !body.description || !body.reporterName || !body.reporterEmail) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = createAdminClient() as any;

    // Extract slug from URL if full URL was provided
    let slug = body.memorialSlug;
    if (slug.includes('/in-memory/')) {
      slug = slug.split('/in-memory/')[1];
    }
    slug = slug.replace(/\/$/, ''); // Remove trailing slash

    // Find the memorial
    const { data: memorial, error: memorialError } = await supabase
      .from('memorials')
      .select('id, status')
      .eq('slug', slug)
      .single();

    if (memorialError || !memorial) {
      return NextResponse.json(
        { error: 'Memorial not found. Please check the URL or slug.' },
        { status: 404 }
      );
    }

    // Get IP address
    const ipAddress =
      headersList.get('cf-connecting-ip') ||
      headersList.get('x-real-ip') ||
      headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      null;

    // Rate limiting: check reports from this IP in the last hour
    if (ipAddress) {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
      const { count } = await supabase
        .from('memorial_reports')
        .select('*', { count: 'exact', head: true })
        .eq('reporter_ip', ipAddress)
        .gte('created_at', oneHourAgo);

      if ((count ?? 0) >= 3) {
        return NextResponse.json(
          { error: 'Too many reports submitted. Please try again later.' },
          { status: 429 }
        );
      }
    }

    // Create report
    const { error: insertError } = await supabase
      .from('memorial_reports')
      .insert({
        memorial_id: memorial.id,
        report_type: body.reportType,
        description: body.description,
        reporter_name: body.reporterName,
        reporter_email: body.reporterEmail,
        reporter_relationship: body.relationship || null,
        reporter_ip: ipAddress,
        status: 'pending',
      });

    if (insertError) {
      console.error('Error creating report:', insertError);
      return NextResponse.json(
        { error: 'Failed to submit report' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in report submission:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
