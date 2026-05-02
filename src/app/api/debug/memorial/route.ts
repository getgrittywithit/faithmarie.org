import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug') || 'faith-marie-moses';

  // Check env vars (don't expose actual values)
  const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!hasUrl || !hasServiceKey) {
    return NextResponse.json({
      error: 'Missing env vars',
      hasUrl,
      hasServiceKey,
    });
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = createAdminClient() as any;

    const { data, error } = await supabase
      .from('memorials')
      .select('id, slug, status')
      .eq('slug', slug)
      .single();

    return NextResponse.json({
      success: !error,
      hasData: !!data,
      data: data || null,
      error: error?.message || null,
    });
  } catch (e) {
    return NextResponse.json({
      error: 'Exception',
      message: e instanceof Error ? e.message : 'Unknown error',
    });
  }
}
