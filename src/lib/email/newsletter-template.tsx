import { generateUnsubscribeUrl } from '@/app/api/newsletter/unsubscribe/route';

interface NewsletterTemplateProps {
  title: string;
  preheader?: string;
  content: string;
  featuredImageUrl?: string;
  subscriberEmail: string;
}

export function generateNewsletterHtml({
  title,
  preheader,
  content,
  featuredImageUrl,
  subscriberEmail,
}: NewsletterTemplateProps): string {
  const unsubscribeUrl = generateUnsubscribeUrl(subscriberEmail);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://faithmarie.org';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${title}</title>
  ${preheader ? `<span style="display:none;font-size:1px;color:#ffffff;max-height:0;max-width:0;opacity:0;overflow:hidden;">${preheader}</span>` : ''}
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #F5EDE0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #F5EDE0;
      padding: 40px 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #e7e5e4;
    }
    .header {
      padding: 28px 30px;
      border-bottom: 1px solid #e7e5e4;
    }
    .header h1 {
      margin: 0;
      color: #1B6E68;
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 22px;
      font-weight: 600;
    }
    .content {
      padding: 32px 30px;
    }
    .featured-image {
      width: 100%;
      height: auto;
      border-radius: 8px;
      margin-bottom: 24px;
    }
    .title {
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 28px;
      font-weight: 600;
      color: #1c1917;
      margin: 0 0 20px 0;
      line-height: 1.2;
    }
    .body-content {
      font-size: 16px;
      line-height: 1.7;
      color: #44403c;
    }
    .body-content h2 {
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 22px;
      font-weight: 600;
      color: #1c1917;
      margin: 32px 0 16px 0;
      line-height: 1.2;
    }
    .body-content h3 {
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 18px;
      font-weight: 600;
      color: #1c1917;
      margin: 24px 0 12px 0;
      line-height: 1.3;
    }
    .body-content p {
      margin: 0 0 16px 0;
    }
    .body-content ul, .body-content ol {
      margin: 0 0 16px 0;
      padding-left: 24px;
    }
    .body-content li {
      margin-bottom: 8px;
    }
    .body-content a {
      color: #1B6E68;
      text-decoration: underline;
    }
    .body-content img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 16px 0;
    }
    .cta-button {
      display: inline-block;
      background-color: #1B6E68;
      color: #ffffff !important;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 500;
      font-size: 16px;
      margin: 16px 0;
    }
    .signoff {
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #e7e5e4;
      color: #44403c;
      font-size: 16px;
      line-height: 1.6;
    }
    .signoff strong {
      color: #1c1917;
    }
    .signoff .role {
      color: #57534e;
      font-size: 14px;
    }
    .footer {
      background-color: #fafaf9;
      padding: 24px 30px;
      text-align: center;
      border-top: 1px solid #e7e5e4;
    }
    .footer p {
      margin: 0 0 12px 0;
      font-size: 13px;
      color: #57534e;
      line-height: 1.5;
    }
    .footer a {
      color: #1B6E68;
      text-decoration: underline;
    }
    .footer .tagline {
      font-size: 13px;
      color: #57534e;
      margin-bottom: 16px;
    }
    @media only screen and (max-width: 600px) {
      .content {
        padding: 24px 20px;
      }
      .title {
        font-size: 24px;
      }
      .header {
        padding: 24px 20px;
      }
      .footer {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1>FaithMarie.org</h1>
      </div>

      <div class="content">
        ${featuredImageUrl ? `<img src="${featuredImageUrl}" alt="" class="featured-image" />` : ''}

        <h2 class="title">${title}</h2>

        <div class="body-content">
          ${content}
        </div>

        <div class="signoff">
          With care,<br>
          <strong>Levi</strong><br>
          <span class="role">Faith Marie Foundation</span>
        </div>
      </div>

      <div class="footer">
        <p class="tagline">FaithMarie.org — Mental health and grief education, explained with care.</p>

        <p>
          <a href="${unsubscribeUrl}">Unsubscribe</a> ·
          <a href="${siteUrl}">Visit our website</a> ·
          <a href="${siteUrl}/blog">Read our blog</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`;
}

export function generatePlainText({
  title,
  content,
  subscriberEmail,
}: Omit<NewsletterTemplateProps, 'preheader' | 'featuredImageUrl'>): string {
  const unsubscribeUrl = generateUnsubscribeUrl(subscriberEmail);

  // Strip HTML tags for plain text
  const plainContent = content
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/h[1-6]>/gi, '\n\n')
    .replace(/<li>/gi, '• ')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://faithmarie.org';

  return `
FaithMarie.org
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${title}

${plainContent}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

With care,
Levi
Faith Marie Foundation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FaithMarie.org — Mental health and grief education, explained with care.

Unsubscribe: ${unsubscribeUrl}
Visit our website: ${siteUrl}
Read our blog: ${siteUrl}/blog
`.trim();
}
