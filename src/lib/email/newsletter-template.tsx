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
      background-color: #f6f9fc;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #f6f9fc;
      padding: 40px 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .header {
      background-color: #0d9488;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      color: #ffffff;
      font-size: 24px;
      font-weight: 600;
    }
    .content {
      padding: 40px 30px;
    }
    .featured-image {
      width: 100%;
      height: auto;
      border-radius: 8px;
      margin-bottom: 24px;
    }
    .title {
      font-size: 28px;
      font-weight: 700;
      color: #111827;
      margin: 0 0 20px 0;
      line-height: 1.3;
    }
    .body-content {
      font-size: 16px;
      line-height: 1.7;
      color: #374151;
    }
    .body-content h2 {
      font-size: 22px;
      font-weight: 600;
      color: #111827;
      margin: 32px 0 16px 0;
    }
    .body-content h3 {
      font-size: 18px;
      font-weight: 600;
      color: #111827;
      margin: 24px 0 12px 0;
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
      color: #0d9488;
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
      background-color: #0d9488;
      color: #ffffff !important;
      text-decoration: none;
      padding: 14px 28px;
      border-radius: 6px;
      font-weight: 600;
      margin: 16px 0;
    }
    .footer {
      background-color: #f9fafb;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
    .footer p {
      margin: 0 0 12px 0;
      font-size: 14px;
      color: #6b7280;
    }
    .footer a {
      color: #0d9488;
      text-decoration: underline;
    }
    .footer .social {
      margin: 20px 0;
    }
    .footer .social a {
      display: inline-block;
      margin: 0 8px;
      text-decoration: none;
    }
    .footer .address {
      font-size: 12px;
      color: #9ca3af;
      margin-top: 20px;
    }
    @media only screen and (max-width: 600px) {
      .content {
        padding: 30px 20px;
      }
      .title {
        font-size: 24px;
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1>Faith Marie Foundation</h1>
      </div>

      <div class="content">
        ${featuredImageUrl ? `<img src="${featuredImageUrl}" alt="" class="featured-image" />` : ''}

        <h2 class="title">${title}</h2>

        <div class="body-content">
          ${content}
        </div>

        <div style="margin-top: 32px; text-align: center;">
          <a href="https://faithmarie.org/blog" class="cta-button">
            Read More on Our Blog
          </a>
        </div>
      </div>

      <div class="footer">
        <p>You're receiving this email because you subscribed to Faith Marie Foundation.</p>

        <p>
          <a href="${unsubscribeUrl}">Unsubscribe</a> •
          <a href="https://faithmarie.org">Visit our website</a>
        </p>

        <div class="address">
          <p>Faith Marie Foundation</p>
          <p>Making mental health research accessible to every family.</p>
        </div>
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

  return `
FAITH MARIE FOUNDATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${title}

${plainContent}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Read more on our blog: https://faithmarie.org/blog

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You're receiving this email because you subscribed to Faith Marie Foundation.

Unsubscribe: ${unsubscribeUrl}
Visit our website: https://faithmarie.org

Faith Marie Foundation
Making mental health research accessible to every family.
`.trim();
}
