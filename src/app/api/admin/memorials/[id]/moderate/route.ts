import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendMemorialApprovedEmail, sendMemorialRejectedEmail } from '@/lib/email/memorial-templates';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: memorialId } = await params;
    const { action, reason, notes } = await request.json();

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
    if (!['approve', 'reject', 'request_changes'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    // Get current memorial with creator info
    const { data: memorial, error: memorialError } = await adminSupabase
      .from('memorials')
      .select('status, slug, deceased_full_name, creator_id')
      .eq('id', memorialId)
      .single();

    if (memorialError || !memorial) {
      return NextResponse.json({ error: 'Memorial not found' }, { status: 404 });
    }

    // Get creator info for email
    const { data: creator } = await adminSupabase
      .from('memorial_users')
      .select('email, full_name')
      .eq('user_id', memorial.creator_id)
      .single();

    // Determine new status
    let newStatus: string;
    switch (action) {
      case 'approve':
        newStatus = 'published';
        break;
      case 'reject':
        newStatus = 'rejected';
        break;
      case 'request_changes':
        newStatus = 'draft';
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    // Update memorial status
    const { error: updateError } = await adminSupabase
      .from('memorials')
      .update({
        status: newStatus,
        rejection_reason: action === 'reject' ? reason : null,
        moderated_at: new Date().toISOString(),
        moderated_by: user.id,
        updated_at: new Date().toISOString(),
      })
      .eq('id', memorialId);

    if (updateError) {
      console.error('Error updating memorial:', updateError);
      return NextResponse.json({ error: 'Failed to update memorial' }, { status: 500 });
    }

    // Log moderation action
    await adminSupabase.from('moderation_actions').insert({
      memorial_id: memorialId,
      moderator_id: user.id,
      action_type: action,
      previous_status: memorial.status,
      new_status: newStatus,
      rejection_reason: action === 'reject' ? reason : null,
      internal_notes: notes || null,
    });

    // Send notification email to creator
    if (creator?.email) {
      const memorialInfo = {
        id: memorialId,
        slug: memorial.slug,
        deceasedName: memorial.deceased_full_name,
        creatorEmail: creator.email,
        creatorName: creator.full_name || 'Friend',
      };

      if (action === 'approve') {
        await sendMemorialApprovedEmail(memorialInfo);
      } else if (action === 'reject' && reason) {
        await sendMemorialRejectedEmail(memorialInfo, reason);
      }
    }

    return NextResponse.json({
      success: true,
      newStatus,
    });
  } catch (error) {
    console.error('Error moderating memorial:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
