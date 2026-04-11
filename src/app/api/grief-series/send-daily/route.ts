import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getGriefSeriesEmail } from '@/data/grief-series-emails';
import { getAllSubscribers, updateSubscriber, removeSubscriber, getStorageType } from '@/lib/grief-series-storage';

function wrapEmailTemplate(content: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <a href="https://faithmarie.org" style="color: #0D9488; text-decoration: none; font-size: 18px;">Faith Marie Foundation</a>
          <p style="color: #666; font-size: 12px; margin-top: 5px;">7-Day Grief Research Series</p>
        </div>

        ${content}

        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999; text-align: center;">
          <p>Faith Marie Foundation | Making mental health research accessible</p>
          <p><a href="https://faithmarie.org/crisis-support" style="color: #DC2626;">Crisis Support</a> • <a href="https://faithmarie.org" style="color: #0D9488;">Visit Website</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Calculate which day a subscriber should receive based on signup date
function calculateDayToSend(signupDate: string): number {
  const signup = new Date(signupDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - signup.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Day 1 is sent immediately on signup, so:
  // Day 0 after signup = Day 1 (already sent)
  // Day 1 after signup = Day 2
  // Day 2 after signup = Day 3
  // etc.
  return Math.min(diffDays + 1, 7);
}

export async function POST(request: NextRequest) {
  // Verify cron secret for security (optional but recommended)
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const results: { email: string; day: number; status: 'sent' | 'skipped' | 'completed' | 'error'; error?: string }[] = [];

  try {
    const subscribers = await getAllSubscribers();

    for (const subscriber of subscribers) {
      const dayToSend = calculateDayToSend(subscriber.signupDate);

      // Skip if already sent this day's email
      if (dayToSend <= subscriber.lastDaySent) {
        results.push({ email: subscriber.email, day: dayToSend, status: 'skipped' });
        continue;
      }

      // If they've completed the series, remove them from active list
      if (subscriber.lastDaySent >= 7) {
        await removeSubscriber(subscriber.email);
        results.push({ email: subscriber.email, day: 7, status: 'completed' });
        continue;
      }

      // Get the email content for this day
      const emailContent = getGriefSeriesEmail(dayToSend);
      if (!emailContent) {
        results.push({ email: subscriber.email, day: dayToSend, status: 'error', error: 'Template not found' });
        continue;
      }

      try {
        // Send the email
        await resend.emails.send({
          from: 'Faith Marie Foundation <noreply@faithmarie.org>',
          to: subscriber.email,
          subject: emailContent.subject,
          html: wrapEmailTemplate(emailContent.content),
        });

        // Update the subscriber's last sent day
        await updateSubscriber({
          ...subscriber,
          lastDaySent: dayToSend,
        });

        results.push({ email: subscriber.email, day: dayToSend, status: 'sent' });

      } catch (error) {
        results.push({
          email: subscriber.email,
          day: dayToSend,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    // Summary
    const sent = results.filter(r => r.status === 'sent').length;
    const skipped = results.filter(r => r.status === 'skipped').length;
    const completed = results.filter(r => r.status === 'completed').length;
    const errors = results.filter(r => r.status === 'error').length;

    return NextResponse.json({
      success: true,
      storageType: getStorageType(),
      summary: {
        total: subscribers.length,
        sent,
        skipped,
        completed,
        errors,
      },
      results,
    });

  } catch (error) {
    console.error('Send daily grief series error:', error);
    return NextResponse.json(
      { error: 'Failed to send daily emails', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// GET endpoint for status check
export async function GET() {
  try {
    const subscribers = await getAllSubscribers();

    return NextResponse.json({
      storageType: getStorageType(),
      subscriberCount: subscribers.length,
      subscribers: subscribers.map(s => ({
        email: s.email.replace(/(.{2}).*@/, '$1***@'),
        signupDate: s.signupDate,
        lastDaySent: s.lastDaySent,
        nextDay: calculateDayToSend(s.signupDate),
      })),
      message: 'POST to this endpoint to trigger daily email sends',
    });
  } catch {
    return NextResponse.json({
      storageType: getStorageType(),
      error: 'Could not fetch subscribers',
    });
  }
}
