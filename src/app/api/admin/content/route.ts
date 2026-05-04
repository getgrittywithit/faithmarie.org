import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { Post, PostInsert } from '@/lib/supabase/types';

// GET - List all posts
export async function GET() {
  try {
    const supabase = await createClient();

    // Check auth
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error in GET /api/admin/content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create a new post
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

    // Get admin user ID
    const { data: adminUserData } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', user.id)
      .single();

    const adminUser = adminUserData as { id: string } | null;

    if (!adminUser) {
      return NextResponse.json({ error: 'Not an admin user' }, { status: 403 });
    }

    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.slug) {
      return NextResponse.json(
        { error: 'Title and slug are required' },
        { status: 400 }
      );
    }

    // Check for slug uniqueness
    const { data: existingPost } = await supabase
      .from('posts')
      .select('id')
      .eq('slug', body.slug)
      .single();

    if (existingPost) {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 400 }
      );
    }

    const postData: PostInsert = {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt || null,
      body: body.body || '',
      body_html: body.body_html || null,
      topics: body.topics || [],
      featured_image_url: body.featured_image_url || null,
      reading_time_minutes: body.reading_time_minutes || 1,
      distribution: body.distribution || 'both',
      status: body.status || 'draft',
      email_subject: body.email_subject || null,
      email_preheader: body.email_preheader || null,
      created_by: adminUser.id,
      updated_by: adminUser.id,
      published_at: body.status === 'published' ? new Date().toISOString() : null,
    };

    const { data, error } = await supabase
      .from('posts')
      .insert(postData as never)
      .select()
      .single();

    if (error) {
      console.error('Error creating post:', error);
      return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }

    const post = data as Post;
    return NextResponse.json({ success: true, id: post.id, post });
  } catch (error) {
    console.error('Error in POST /api/admin/content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
