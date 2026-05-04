# External Services Setup Guide

This guide walks you through setting up all external services required for Faith Marie Foundation to function properly.

## Table of Contents

1. [Quick Reference](#quick-reference)
2. [Supabase (Database & Auth)](#supabase-database--auth)
3. [Stripe (Payments)](#stripe-payments)
4. [Resend (Email)](#resend-email)
5. [Anthropic (AI Resource Guide)](#anthropic-ai-resource-guide)
6. [Upstash Redis (Email Series)](#upstash-redis-email-series)
7. [Vercel (Deployment)](#vercel-deployment)
8. [Testing Checklist](#testing-checklist)

---

## Quick Reference

### Environment Variables

Copy `.env.example` to `.env.local` and fill in these values:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://znwcraymlngmymhlrfde.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Stripe
STRIPE_SECRET_KEY=sk_test_...          # Use sk_live_... for production
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...  # Use pk_live_... for production
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend
RESEND_API_KEY=re_...
RESEND_AUDIENCE_ID=...
RESEND_WEBHOOK_SECRET=whsec_...  # For email tracking (opens, clicks, bounces)

# Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# Upstash Redis
KV_REST_API_URL=https://....upstash.io
KV_REST_API_TOKEN=...

# Other
NOTIFICATION_EMAIL=info@faithmarie.org
NEXT_PUBLIC_SITE_URL=https://faithmarie.org  # or http://localhost:3000 for local dev
CRON_SECRET=your-random-secret
```

---

## Supabase (Database & Auth)

### Project Info
- **Project ID**: `znwcraymlngmymhlrfde`
- **Region**: us-east-2
- **Dashboard**: https://supabase.com/dashboard/project/znwcraymlngmymhlrfde

### Getting API Keys

1. Go to **Project Settings** → **API**
2. Copy these values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

### Auth Configuration

1. Go to **Authentication** → **URL Configuration**
2. Set **Site URL**: `https://faithmarie.org` (or your domain)
3. Add **Redirect URLs**:
   ```
   https://faithmarie.org/**
   http://localhost:3000/**
   ```

### Email Templates (Optional)

1. Go to **Authentication** → **Email Templates**
2. Customize the confirmation email with Faith Marie branding

---

## Stripe (Payments)

### Dashboard
- **Test Mode**: https://dashboard.stripe.com/test
- **Live Mode**: https://dashboard.stripe.com

### Step 1: Get API Keys

1. Go to **Developers** → **API Keys**
2. Copy:
   - **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** → `STRIPE_SECRET_KEY`

> **Important**: Use `sk_test_` and `pk_test_` keys for development. Switch to `sk_live_` and `pk_live_` for production.

### Step 2: Set Up Webhook

Webhooks notify your app when payments complete.

#### For Local Development (using Stripe CLI)

1. Install the Stripe CLI:
   ```bash
   brew install stripe/stripe-cli/stripe
   ```

2. Login and forward events:
   ```bash
   stripe login
   stripe listen --forward-to localhost:3000/api/webhook
   ```

3. Copy the webhook signing secret (shown in terminal) → `STRIPE_WEBHOOK_SECRET`

#### For Production (Vercel/Live Site)

1. Go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Configure:
   - **Endpoint URL**: `https://faithmarie.org/api/webhook`
   - **Events to listen for**: Select these events:
     - `checkout.session.completed`

4. After creating, click the webhook → **Reveal** signing secret → `STRIPE_WEBHOOK_SECRET`

### Step 3: Test the Integration

1. Use test card: `4242 4242 4242 4242` (any future date, any CVC)
2. Make a test donation on your site
3. Verify:
   - [ ] Checkout redirects to Stripe
   - [ ] Success page shows after payment
   - [ ] Webhook fires (check Stripe Dashboard → Webhooks → Events)
   - [ ] Donation appears in admin dashboard (`/admin/donations`)
   - [ ] Thank you email is sent
   - [ ] Notification email received at `NOTIFICATION_EMAIL`

### Test Card Numbers

| Scenario | Card Number |
|----------|-------------|
| Successful payment | `4242 4242 4242 4242` |
| Declined | `4000 0000 0000 0002` |
| Requires authentication | `4000 0025 0000 3155` |

---

## Resend (Email)

### Dashboard
https://resend.com/overview

### Step 1: Get API Key

1. Go to **API Keys** → **Create API Key**
2. Name it (e.g., "Faith Marie Production")
3. Copy the key → `RESEND_API_KEY`

### Step 2: Verify Domain

1. Go to **Domains** → **Add Domain**
2. Enter `faithmarie.org`
3. Add the DNS records shown (typically DKIM, SPF, DMARC)
4. Wait for verification (usually a few minutes)

> **Note**: Until domain is verified, emails can only be sent to your own email address.

### Step 3: Create Audience for Newsletter

1. Go to **Audiences** → **Create Audience**
2. Name it "Newsletter Subscribers"
3. Copy the **Audience ID** → `RESEND_AUDIENCE_ID`

### Step 4: Set Up Webhook for Email Tracking

1. Go to **Webhooks** → **Add Webhook**
2. Configure:
   - **Endpoint URL**: `https://faithmarie.org/api/webhooks/resend`
   - **Events**: Select all of these:
     - `email.delivered`
     - `email.opened`
     - `email.clicked`
     - `email.bounced`
     - `email.complained`
3. After creating, copy the **Signing Secret** (starts with `whsec_`) → `RESEND_WEBHOOK_SECRET`

> **Important**: Add `RESEND_WEBHOOK_SECRET` to Vercel environment variables. The webhook handler verifies signatures and will reject requests without a valid signature.

### Step 5: Test the Integration

1. Subscribe to the newsletter on your site
2. Verify:
   - [ ] Welcome email received
   - [ ] Subscriber appears in Resend Audience
   - [ ] Subscriber appears in Supabase `subscribers` table
   - [ ] Subscriber appears in admin dashboard (`/admin/subscribers`)

### Testing Newsletter Send

1. Create and publish a post at `/admin/content`
2. Go to `/admin/newsletter/send`
3. Send a test email to yourself
4. Verify:
   - [ ] Email received with correct formatting
   - [ ] Unsubscribe link works
   - [ ] Tracking pixels load (check webhook events)

---

## Anthropic (AI Resource Guide)

### Dashboard
https://console.anthropic.com/

### Get API Key

1. Go to **API Keys** → **Create Key**
2. Copy the key → `ANTHROPIC_API_KEY`

### Test the Integration

1. Go to `/tools/chatbot` on your site
2. Ask a question about grief, anxiety, etc.
3. Verify:
   - [ ] Response is generated
   - [ ] Crisis keywords trigger crisis response
   - [ ] Research digests are referenced when relevant

### Usage Monitoring

- Monitor usage at https://console.anthropic.com/settings/usage
- The chatbot uses `claude-sonnet-4-20250514` model
- Typical conversation costs ~$0.01-0.05

---

## Upstash Redis (Email Series)

### Dashboard
https://console.upstash.com/

### Setup

1. Create a new Redis database
2. Choose a region close to your deployment (e.g., us-east-1 for Vercel)
3. Copy:
   - **REST URL** → `KV_REST_API_URL`
   - **REST Token** → `KV_REST_API_TOKEN`

### Purpose

Used for the 7-day grief email series to track:
- Which day each subscriber is on
- When to send the next email
- Subscriber state between requests

---

## Vercel (Deployment)

### Environment Variables

1. Go to your project → **Settings** → **Environment Variables**
2. Add all variables from `.env.local`
3. Set appropriate environments (Production, Preview, Development)

### Important Settings

| Variable | Production | Preview | Development |
|----------|------------|---------|-------------|
| `STRIPE_SECRET_KEY` | `sk_live_...` | `sk_test_...` | `sk_test_...` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` | `pk_test_...` | `pk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | Production secret | Test secret | CLI secret |
| `RESEND_WEBHOOK_SECRET` | `whsec_...` | `whsec_...` | `whsec_...` |
| `NEXT_PUBLIC_SITE_URL` | `https://faithmarie.org` | Preview URL | `http://localhost:3000` |

### Cron Jobs (if needed)

Add to `vercel.json` if you need scheduled tasks:

```json
{
  "crons": [
    {
      "path": "/api/cron/send-scheduled?secret=YOUR_CRON_SECRET",
      "schedule": "0 * * * *"
    }
  ]
}
```

---

## Testing Checklist

### Local Development

```bash
# 1. Copy environment file
cp .env.example .env.local

# 2. Fill in all values

# 3. Start Stripe CLI for webhook testing
stripe listen --forward-to localhost:3000/api/webhook

# 4. Start development server
npm run dev
```

### Full System Test

#### Donations (Stripe)
- [ ] Visit `/donate`
- [ ] Select an amount
- [ ] Complete checkout with test card `4242 4242 4242 4242`
- [ ] Verify success page
- [ ] Check donation in `/admin/donations`
- [ ] Verify thank you email received
- [ ] Verify notification email received

#### Newsletter (Resend + Supabase)
- [ ] Subscribe via homepage form
- [ ] Verify welcome email received
- [ ] Check subscriber in `/admin/subscribers`
- [ ] Check subscriber in Resend Audiences
- [ ] Create a post at `/admin/content/new`
- [ ] Publish the post
- [ ] Send newsletter at `/admin/newsletter/send`
- [ ] Verify email received
- [ ] Click unsubscribe link
- [ ] Verify unsubscribed status

#### Blog (Supabase)
- [ ] Create post at `/admin/content/new`
- [ ] Set distribution to "Both" or "Website"
- [ ] Publish
- [ ] Visit `/blog`
- [ ] Verify post appears
- [ ] Click through to post

#### Resource Guide (Anthropic)
- [ ] Visit `/tools/chatbot`
- [ ] Ask about grief
- [ ] Verify response includes research references
- [ ] Type crisis keyword (e.g., "I want to end my life")
- [ ] Verify crisis intervention response

#### Memorial Donations (Stripe)
- [ ] Visit a memorial page
- [ ] Make a donation
- [ ] Verify checkout includes memorial name
- [ ] Verify donation tracked with memorial_id

---

## Troubleshooting

### Stripe webhook not firing

1. Check webhook endpoint in Stripe Dashboard
2. Verify `STRIPE_WEBHOOK_SECRET` is correct
3. Check Vercel function logs for errors
4. Ensure endpoint is publicly accessible

### Emails not sending

1. Verify domain is verified in Resend
2. Check `RESEND_API_KEY` is valid
3. Check Resend dashboard for delivery status
4. Verify `from` address uses verified domain

### Newsletter not syncing to Supabase

1. Check `SUPABASE_SERVICE_ROLE_KEY` is set
2. Verify RLS policies allow inserts
3. Check Vercel function logs

### Chatbot not responding

1. Verify `ANTHROPIC_API_KEY` is set
2. Check API key is not expired
3. Monitor usage limits in Anthropic console

---

## Security Notes

1. **Never commit `.env.local`** - it's in `.gitignore`
2. **Rotate keys** if you suspect they've been exposed
3. **Use test keys** for development and preview deployments
4. **Webhook secrets** are per-endpoint - local and production are different
5. **Service role key** bypasses RLS - use only in API routes, never in client code
