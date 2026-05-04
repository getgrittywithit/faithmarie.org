import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendNewsletter } from '@/lib/email/send';
import type { Post, NewsletterSend } from '@/lib/supabase/types';

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

    // Get admin user
    const { data: adminUserData } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', user.id)
      .single();

    const adminUser = adminUserData as { id: string } | null;

    if (!adminUser) {
      return NextResponse.json({ error: 'Not an admin user' }, { status: 403 });
    }

    const { postId, targetTopics, targetAllSubscribers } = await request.json();

    if (!postId) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    // Get the post
    const adminSupabase = createAdminClient();
    const { data: postData, error: postError } = await adminSupabase
      .from('posts')
      .select('*')
      .eq('id', postId)
      .single();

    if (postError || !postData) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const post = postData as Post;

    // Verify post can be sent as newsletter
    if (post.distribution !== 'newsletter' && post.distribution !== 'both') {
      return NextResponse.json(
        { error: 'This post is not configured for newsletter distribution' },
        { status: 400 }
      );
    }

    // Create newsletter send record
    const { data: sendData, error: sendError } = await adminSupabase
      .from('newsletter_sends')
      .insert({
        post_id: postId,
        target_topics: targetTopics || [],
        target_all_subscribers: targetAllSubscribers || false,
        status: 'pending',
        sent_by: adminUser.id,
      } as never)
      .select()
      .single();

    if (sendError || !sendData) {
      console.error('Error creating newsletter send:', sendError);
      return NextResponse.json(
        { error: 'Failed to create newsletter send' },
        { status: 500 }
      );
    }

    const send = sendData as NewsletterSend;

    // Start sending in the background (don't await)
    sendNewsletter({
      post,
      sendId: send.id,
      targetTopics: targetTopics || [],
      targetAllSubscribers: targetAllSubscribers || false,
      sentBy: adminUser.id,
    }).catch((err) => {
      console.error('Newsletter send error:', err);
    });

    return NextResponse.json({
      success: true,
      sendId: send.id,
      message: 'Newsletter send started',
    });
  } catch (error) {
    console.error('Error in POST /api/admin/newsletter/send:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
