import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendTestEmail } from '@/lib/email/send';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check auth
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify admin user
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', user.id)
      .single();

    if (!adminUser) {
      return NextResponse.json({ error: 'Not an admin user' }, { status: 403 });
    }

    const { postId, email } = await request.json();

    if (!postId || !email) {
      return NextResponse.json(
        { error: 'Post ID and email are required' },
        { status: 400 }
      );
    }

    // Validate email
    if (!email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Get the post
    const adminSupabase = createAdminClient();
    const { data: post, error: postError } = await adminSupabase
      .from('posts')
      .select('*')
      .eq('id', postId)
      .single();

    if (postError || !post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Send test email
    const result = await sendTestEmail(post, email);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to send test email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: `Test email sent to ${email}` });
  } catch (error) {
    console.error('Error in POST /api/admin/newsletter/send-test:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
