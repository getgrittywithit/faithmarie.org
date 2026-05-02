import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: memorialId } = await params;
    const { tributeId, status } = await request.json();
    const supabase = await createClient();

    if (!tributeId || !status) {
      return NextResponse.json(
        { error: 'Tribute ID and status are required' },
        { status: 400 }
      );
    }

    const validStatuses = ['pending', 'approved', 'rejected', 'hidden'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify memorial ownership
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: memorial, error: memorialError } = await (supabase as any)
      .from('memorials')
      .select('creator_id')
      .eq('id', memorialId)
      .single();

    if (memorialError || !memorial || memorial.creator_id !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Update tribute status
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: tribute, error } = await (supabase as any)
      .from('tributes')
      .update({
        status,
        moderated_at: new Date().toISOString(),
        moderated_by: user.id,
      })
      .eq('id', tributeId)
      .eq('memorial_id', memorialId)
      .select()
      .single();

    if (error) {
      console.error('Error updating tribute:', error);
      return NextResponse.json({ error: 'Failed to update tribute' }, { status: 500 });
    }

    return NextResponse.json({ tribute });
  } catch (error) {
    console.error('Error moderating tribute:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
