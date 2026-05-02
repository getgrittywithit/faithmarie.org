import { Resend } from 'resend';

const FROM_EMAIL = 'Faith Marie Foundation <noreply@faithmarie.org>';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://faithmarie.org';

function getResendClient(): Resend {
  return new Resend(process.env.RESEND_API_KEY);
}

interface MemorialInfo {
  id: string;
  slug: string;
  deceasedName: string;
  creatorEmail: string;
  creatorName: string;
}

// Base email wrapper
function emailWrapper(content: string): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="border-bottom: 3px solid #0D9488; padding-bottom: 20px; margin-bottom: 20px;">
        <h1 style="color: #0D9488; font-size: 24px; margin: 0;">Faith Marie Foundation</h1>
      </div>
      ${content}
      <div style="border-top: 1px solid #e5e7eb; margin-top: 30px; padding-top: 20px;">
        <p style="color: #6b7280; font-size: 12px; margin: 0;">
          This email was sent by Faith Marie Foundation.<br>
          <a href="${SITE_URL}" style="color: #0D9488;">faithmarie.org</a>
        </p>
      </div>
    </div>
  `;
}

// Memorial submitted - sent to creator
export async function sendMemorialSubmittedEmail(memorial: MemorialInfo): Promise<void> {
  try {
    await getResendClient().emails.send({
      from: FROM_EMAIL,
      to: memorial.creatorEmail,
      subject: `Memorial Submitted: ${memorial.deceasedName}`,
      html: emailWrapper(`
        <h2 style="color: #1f2937; margin-top: 0;">Your Memorial Has Been Submitted</h2>
        <p style="color: #4b5563; line-height: 1.6;">
          Dear ${memorial.creatorName},
        </p>
        <p style="color: #4b5563; line-height: 1.6;">
          Thank you for creating a memorial for <strong>${memorial.deceasedName}</strong>.
          Your submission has been received and is now pending review.
        </p>
        <p style="color: #4b5563; line-height: 1.6;">
          Our team typically reviews memorials within 24-48 hours. We&apos;ll notify you by email once your memorial is approved.
        </p>
        <div style="background-color: #f0fdfa; border-left: 4px solid #0D9488; padding: 16px; margin: 20px 0;">
          <p style="color: #0f766e; margin: 0; font-size: 14px;">
            <strong>What happens next?</strong><br>
            We review each memorial to ensure a respectful and safe environment for all families.
          </p>
        </div>
        <p style="color: #4b5563; line-height: 1.6;">
          If you have any questions, please contact us at <a href="mailto:support@faithmarie.org" style="color: #0D9488;">support@faithmarie.org</a>.
        </p>
        <p style="color: #4b5563; line-height: 1.6;">
          With gratitude,<br>
          The Faith Marie Foundation Team
        </p>
      `),
    });
  } catch (error) {
    console.error('Failed to send memorial submitted email:', error);
  }
}

// Memorial approved - sent to creator
export async function sendMemorialApprovedEmail(memorial: MemorialInfo): Promise<void> {
  try {
    await getResendClient().emails.send({
      from: FROM_EMAIL,
      to: memorial.creatorEmail,
      subject: `Memorial Published: ${memorial.deceasedName}`,
      html: emailWrapper(`
        <h2 style="color: #1f2937; margin-top: 0;">Your Memorial Is Now Live</h2>
        <p style="color: #4b5563; line-height: 1.6;">
          Dear ${memorial.creatorName},
        </p>
        <p style="color: #4b5563; line-height: 1.6;">
          Great news! The memorial for <strong>${memorial.deceasedName}</strong> has been approved and is now published.
        </p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${SITE_URL}/in-memory/${memorial.slug}" style="display: inline-block; background-color: #0D9488; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 500;">
            View Memorial
          </a>
        </p>
        <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <p style="color: #4b5563; margin: 0 0 10px 0; font-size: 14px;"><strong>Share this memorial:</strong></p>
          <p style="color: #0D9488; margin: 0; font-size: 14px; word-break: break-all;">
            ${SITE_URL}/in-memory/${memorial.slug}
          </p>
        </div>
        <p style="color: #4b5563; line-height: 1.6;">
          You can manage your memorial anytime from your <a href="${SITE_URL}/memorials/dashboard" style="color: #0D9488;">dashboard</a>.
        </p>
        <p style="color: #4b5563; line-height: 1.6;">
          With gratitude,<br>
          The Faith Marie Foundation Team
        </p>
      `),
    });
  } catch (error) {
    console.error('Failed to send memorial approved email:', error);
  }
}

// Memorial rejected - sent to creator
export async function sendMemorialRejectedEmail(
  memorial: MemorialInfo,
  reason: string
): Promise<void> {
  try {
    await getResendClient().emails.send({
      from: FROM_EMAIL,
      to: memorial.creatorEmail,
      subject: `Memorial Review Update: ${memorial.deceasedName}`,
      html: emailWrapper(`
        <h2 style="color: #1f2937; margin-top: 0;">Memorial Review Update</h2>
        <p style="color: #4b5563; line-height: 1.6;">
          Dear ${memorial.creatorName},
        </p>
        <p style="color: #4b5563; line-height: 1.6;">
          Thank you for submitting a memorial for <strong>${memorial.deceasedName}</strong>.
          After review, we were unable to publish the memorial at this time.
        </p>
        <div style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 16px; margin: 20px 0;">
          <p style="color: #991b1b; margin: 0; font-size: 14px;">
            <strong>Reason:</strong><br>
            ${reason}
          </p>
        </div>
        <p style="color: #4b5563; line-height: 1.6;">
          If you believe this was made in error or would like to provide additional information,
          please contact us at <a href="mailto:support@faithmarie.org" style="color: #0D9488;">support@faithmarie.org</a>.
        </p>
        <p style="color: #4b5563; line-height: 1.6;">
          We understand this may be disappointing, and we appreciate your understanding.
        </p>
        <p style="color: #4b5563; line-height: 1.6;">
          Sincerely,<br>
          The Faith Marie Foundation Team
        </p>
      `),
    });
  } catch (error) {
    console.error('Failed to send memorial rejected email:', error);
  }
}

// New tribute notification - sent to creator
export async function sendNewTributeEmail(
  memorial: MemorialInfo,
  tributeInfo: { visitorName: string; message: string }
): Promise<void> {
  try {
    await getResendClient().emails.send({
      from: FROM_EMAIL,
      to: memorial.creatorEmail,
      subject: `New Tribute for ${memorial.deceasedName}`,
      html: emailWrapper(`
        <h2 style="color: #1f2937; margin-top: 0;">A New Tribute Has Been Submitted</h2>
        <p style="color: #4b5563; line-height: 1.6;">
          Dear ${memorial.creatorName},
        </p>
        <p style="color: #4b5563; line-height: 1.6;">
          Someone has left a tribute on the memorial for <strong>${memorial.deceasedName}</strong>.
        </p>
        <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">
            <strong>From:</strong> ${tributeInfo.visitorName}
          </p>
          <p style="color: #4b5563; margin: 0; font-style: italic;">
            "${tributeInfo.message.substring(0, 200)}${tributeInfo.message.length > 200 ? '...' : ''}"
          </p>
        </div>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${SITE_URL}/memorials/dashboard/${memorial.id}/tributes" style="display: inline-block; background-color: #0D9488; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 500;">
            Review Tribute
          </a>
        </p>
        <p style="color: #6b7280; font-size: 14px;">
          You can approve or hide tributes from your dashboard.
        </p>
      `),
    });
  } catch (error) {
    console.error('Failed to send new tribute email:', error);
  }
}

// Memorial donation thank you - sent to donor (extends existing webhook email)
export async function sendMemorialDonationThankYou(
  donorEmail: string,
  donorName: string,
  amount: string,
  deceasedName: string,
  memorialSlug: string
): Promise<void> {
  try {
    await getResendClient().emails.send({
      from: FROM_EMAIL,
      to: donorEmail,
      subject: `Thank You for Honoring ${deceasedName}'s Memory`,
      html: emailWrapper(`
        <h2 style="color: #1f2937; margin-top: 0;">Thank You for Your Generous Gift</h2>
        <p style="color: #4b5563; line-height: 1.6;">
          Dear ${donorName || 'Friend'},
        </p>
        <p style="color: #4b5563; line-height: 1.6;">
          Thank you for your donation of <strong>$${amount}</strong> in memory of <strong>${deceasedName}</strong>.
        </p>
        <p style="color: #4b5563; line-height: 1.6;">
          Your gift helps Faith Marie Foundation:
        </p>
        <ul style="color: #4b5563; line-height: 1.8;">
          <li>Provide free memorial sites for families in need</li>
          <li>Support grieving families with accessible resources</li>
          <li>Keep our grief support tools free for everyone</li>
        </ul>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${SITE_URL}/in-memory/${memorialSlug}" style="display: inline-block; background-color: #0D9488; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 500;">
            View Memorial
          </a>
        </p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        <p style="color: #6b7280; font-size: 12px;">
          This email serves as your donation receipt.<br>
          Amount: $${amount} | Date: ${new Date().toLocaleDateString()}<br>
          Faith Marie Foundation is a pending 501(c)(3) nonprofit organization.
        </p>
      `),
    });
  } catch (error) {
    console.error('Failed to send memorial donation thank you:', error);
  }
}

// Magic link email (used by auth flow)
export async function sendMagicLinkEmail(
  email: string,
  code: string,
  name?: string
): Promise<void> {
  try {
    await getResendClient().emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Your Faith Marie Foundation Verification Code',
      html: emailWrapper(`
        <h2 style="color: #1f2937; margin-top: 0;">Verify Your Email</h2>
        <p style="color: #4b5563; line-height: 1.6;">
          ${name ? `Hi ${name},` : 'Hello,'}
        </p>
        <p style="color: #4b5563; line-height: 1.6;">
          Use this code to verify your email address:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="display: inline-block; background-color: #f3f4f6; padding: 16px 32px; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #1f2937; border-radius: 8px;">
            ${code}
          </span>
        </div>
        <p style="color: #6b7280; font-size: 14px; text-align: center;">
          This code expires in 10 minutes.
        </p>
        <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
          If you didn't request this code, you can safely ignore this email.
        </p>
      `),
    });
  } catch (error) {
    console.error('Failed to send magic link email:', error);
    throw error;
  }
}
