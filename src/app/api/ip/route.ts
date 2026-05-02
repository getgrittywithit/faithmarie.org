import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Get IP from various headers (Cloudflare, Vercel, etc.)
  const ip =
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown';

  return NextResponse.json({ ip });
}
