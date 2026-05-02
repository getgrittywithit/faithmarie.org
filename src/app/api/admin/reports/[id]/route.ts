import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: reportId } = await params;
    const { action, resolution, takedownMemorial, memorialId } = await request.json();

    // Verify admin access
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('role')
      .eq('user_id', user.id)
      .single();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!adminUser || (adminUser as any).role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const adminSupabase = createAdminClient() as any;

    // Validate action
    if (!['resolve', 'dismiss'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    // Update report status
    const { error: updateError } = await adminSupabase
      .from('memorial_reports')
      .update({
        status: action === 'resolve' ? 'resolved' : 'dismissed',
        resolution_notes: resolution || null,
        resolved_by: user.id,
        resolved_at: new Date().toISOString(),
      })
      .eq('id', reportId);

    if (updateError) {
      console.error('Error updating report:', updateError);
      return NextResponse.json({ error: 'Failed to update report' }, { status: 500 });
    }

    // If takedown requested, update memorial status
    if (takedownMemorial && memorialId) {
      await adminSupabase
        .from('memorials')
        .update({
          status: 'taken_down',
          updated_at: new Date().toISOString(),
        })
        .eq('id', memorialId);

      // Log moderation action
      await adminSupabase.from('moderation_actions').insert({
        memorial_id: memorialId,
        moderator_id: user.id,
        action_type: 'takedown',
        new_status: 'taken_down',
        internal_notes: `Taken down due to report: ${resolution}`,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error resolving report:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
