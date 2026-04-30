import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { assessment_type, score, severity, answers } = body;

    // Validate required fields
    if (!assessment_type || score === undefined || !severity || !answers) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate assessment type
    const validTypes = ['phq9', 'gad7', 'pcl5', 'pg13'];
    if (!validTypes.includes(assessment_type)) {
      return NextResponse.json(
        { error: 'Invalid assessment type' },
        { status: 400 }
      );
    }

    // Validate severity
    const validSeverities = ['minimal', 'mild', 'moderate', 'moderately_severe', 'severe'];
    if (!validSeverities.includes(severity)) {
      return NextResponse.json(
        { error: 'Invalid severity level' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Get referrer from headers (for analytics)
    const referrer = request.headers.get('referer') || null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from('assessment_results').insert({
      assessment_type,
      score,
      severity,
      answers,
      referrer,
    });

    if (error) {
      console.error('Failed to save assessment:', error);
      return NextResponse.json(
        { error: 'Failed to save assessment' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Assessment API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
