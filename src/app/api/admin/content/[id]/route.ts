import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { PostUpdate } from '@/lib/supabase/types';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET - Get a single post
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // Check auth
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: post, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching post:', error);
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Error in GET /api/admin/content/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH - Update a post
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // Check auth
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get admin user ID
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', user.id)
      .single();

    if (!adminUser) {
      return NextResponse.json({ error: 'Not an admin user' }, { status: 403 });
    }

    const body = await request.json();

    // Check for slug uniqueness if slug is being changed
    if (body.slug) {
      const { data: existingPost } = await supabase
        .from('posts')
        .select('id')
        .eq('slug', body.slug)
        .neq('id', id)
        .single();

      if (existingPost) {
        return NextResponse.json(
          { error: 'A post with this slug already exists' },
          { status: 400 }
        );
      }
    }

    // Get current post to check status change
    const { data: currentPost } = await supabase
      .from('posts')
      .select('status, published_at')
      .eq('id', id)
      .single();

    const updateData: PostUpdate = {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      body: body.body,
      body_html: body.body_html,
      topics: body.topics,
      featured_image_url: body.featured_image_url,
      reading_time_minutes: body.reading_time_minutes,
      distribution: body.distribution,
      status: body.status,
      email_subject: body.email_subject,
      email_preheader: body.email_preheader,
      updated_by: adminUser.id,
    };

    // Set published_at when transitioning to published
    if (body.status === 'published' && currentPost?.status !== 'published') {
      updateData.published_at = new Date().toISOString();
    }

    const { data: post, error } = await supabase
      .from('posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating post:', error);
      return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    }

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error('Error in PATCH /api/admin/content/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete a post
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // Check auth
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify admin role
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!adminUser || adminUser.role !== 'admin') {
      return NextResponse.json(
        { error: 'Only admins can delete posts' },
        { status: 403 }
      );
    }

    const { error } = await supabase.from('posts').delete().eq('id', id);

    if (error) {
      console.error('Error deleting post:', error);
      return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/admin/content/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
