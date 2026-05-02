import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: memorialId } = await params;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = createAdminClient() as any;

    const { data: photos, error } = await supabase
      .from('memorial_photos')
      .select('*')
      .eq('memorial_id', memorialId)
      .order('sort_order', { ascending: true });

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch photos' }, { status: 500 });
    }

    return NextResponse.json({ photos });
  } catch (error) {
    console.error('Error fetching photos:', error);
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
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const adminSupabase = createAdminClient() as any;

    // Verify user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get current photo count
    const { count } = await adminSupabase
      .from('memorial_photos')
      .select('*', { count: 'exact', head: true })
      .eq('memorial_id', memorialId);

    if ((count ?? 0) >= 50) {
      return NextResponse.json(
        { error: 'Maximum of 50 photos allowed per memorial' },
        { status: 400 }
      );
    }

    // Insert new photo record
    const { data: photo, error } = await adminSupabase
      .from('memorial_photos')
      .insert({
        memorial_id: memorialId,
        storage_path: body.storagePath,
        original_filename: body.originalFilename || null,
        caption: body.caption || null,
        sort_order: (count ?? 0),
        uploaded_by: user.id,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating photo record:', error);
      return NextResponse.json({ error: 'Failed to save photo' }, { status: 500 });
    }

    return NextResponse.json({ photo });
  } catch (error) {
    console.error('Error in photo upload:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: memorialId } = await params;
    const body = await request.json();
    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const adminSupabase = createAdminClient() as any;

    // Verify user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Handle bulk reorder
    if (body.reorder && Array.isArray(body.photos)) {
      for (const photo of body.photos) {
        await adminSupabase
          .from('memorial_photos')
          .update({ sort_order: photo.sort_order })
          .eq('id', photo.id)
          .eq('memorial_id', memorialId);
      }
      return NextResponse.json({ success: true });
    }

    // Handle single photo update
    if (body.photoId) {
      const updates: Record<string, unknown> = {};
      if (body.caption !== undefined) updates.caption = body.caption;
      if (body.sortOrder !== undefined) updates.sort_order = body.sortOrder;

      const { error } = await adminSupabase
        .from('memorial_photos')
        .update(updates)
        .eq('id', body.photoId)
        .eq('memorial_id', memorialId);

      if (error) {
        return NextResponse.json({ error: 'Failed to update photo' }, { status: 500 });
      }

      return NextResponse.json({ success: true });
    }

    // Handle set hero photo
    if (body.heroPhotoId) {
      const { error } = await adminSupabase
        .from('memorials')
        .update({ hero_photo_id: body.heroPhotoId })
        .eq('id', memorialId);

      if (error) {
        return NextResponse.json({ error: 'Failed to set hero photo' }, { status: 500 });
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  } catch (error) {
    console.error('Error updating photo:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: memorialId } = await params;
    const { searchParams } = new URL(request.url);
    const photoId = searchParams.get('photoId');

    if (!photoId) {
      return NextResponse.json({ error: 'Photo ID required' }, { status: 400 });
    }

    const supabase = await createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const adminSupabase = createAdminClient() as any;

    // Verify user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Delete photo record
    const { error } = await adminSupabase
      .from('memorial_photos')
      .delete()
      .eq('id', photoId)
      .eq('memorial_id', memorialId);

    if (error) {
      return NextResponse.json({ error: 'Failed to delete photo' }, { status: 500 });
    }

    // Check if deleted photo was hero, if so clear it
    const { data: memorial } = await adminSupabase
      .from('memorials')
      .select('hero_photo_id')
      .eq('id', memorialId)
      .single();

    if (memorial?.hero_photo_id === photoId) {
      await adminSupabase
        .from('memorials')
        .update({ hero_photo_id: null })
        .eq('id', memorialId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting photo:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
