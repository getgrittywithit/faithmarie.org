import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = createAdminClient() as any;

    const { count, error } = await supabase
      .from('pay_it_forward_credits')
      .select('*', { count: 'exact', head: true })
      .is('consumed_by_memorial_id', null);

    if (error) {
      console.error('Error fetching credits:', error);
      return NextResponse.json({ count: 0 });
    }

    return NextResponse.json({ count: count ?? 0 });
  } catch (error) {
    console.error('Error in credits API:', error);
    return NextResponse.json({ count: 0 });
  }
}
