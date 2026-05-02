import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { slug, password } = await request.json();

    if (!slug || !password) {
      return NextResponse.json(
        { error: 'Slug and password are required' },
        { status: 400 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = createAdminClient() as any;

    // Get memorial with password hash
    const { data: memorial, error } = await supabase
      .from('memorials')
      .select('privacy_password_hash, privacy')
      .eq('slug', slug)
      .single();

    if (error || !memorial) {
      return NextResponse.json(
        { error: 'Memorial not found' },
        { status: 404 }
      );
    }

    if (memorial.privacy !== 'password') {
      return NextResponse.json(
        { error: 'Memorial is not password protected' },
        { status: 400 }
      );
    }

    if (!memorial.privacy_password_hash) {
      return NextResponse.json(
        { error: 'Password not set for this memorial' },
        { status: 400 }
      );
    }

    // Verify password
    const isValid = await bcrypt.compare(password, memorial.privacy_password_hash);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Incorrect password' },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error verifying password:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
