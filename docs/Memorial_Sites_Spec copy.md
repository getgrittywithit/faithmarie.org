# FMF Memorial Sites — Product & Technical Spec

**Status:** Draft v0.1 — pre-development
**Owner:** Levi Moses (Faith Marie Foundation)
**Audience:** Developer(s) building the platform; FMF board for review
**Last updated:** 2026-05-01

---

## 1. Overview

The Faith Marie Foundation will offer free and low-cost memorial websites to families who have lost a loved one. Memorials are persistent, beautiful, lightly-templated personal pages where families can collect photos, written tributes, life history, and a guestbook. Faith Marie Moses's memorial will be the anchor of the program; every other memorial is built on the same foundation.

This spec is meant to be sufficient for a developer to scope and begin building. It captures the decisions already made, the trust-and-safety model, the data model, and the phased rollout. Items still open are listed in **Section 15: Open Questions**.

### Mission alignment

FMF's stated mission area is grief and mental-health accessibility. Memorial sites are a direct extension of that mission: the act of creating one is grief work, and the resulting page is a durable artifact that helps surviving family. The program also creates a renewable donor pipeline — every memorial creator becomes a donor of record — and a content surface that compounds the foundation's organic search visibility on grief-adjacent queries.

### Non-goals

- Not a fundraising platform. Memorial pages **do not** host donate-to-the-deceased buttons, GoFundMe-style campaigns, or per-memorial fundraising. There is one "donate to FMF in memory of X" link only.
- Not a social network. No follower graph, no feed, no algorithmic discovery between memorials.
- Not a public obituary aggregator. We do not scrape or auto-create memorials from obituary data.

---

## 2. Decisions already locked in

These have been settled and the spec is built on them. Do not re-litigate without flagging.

| Area | Decision |
|---|---|
| **Tech stack** | Next.js (App Router) + Supabase (Postgres, Auth, Storage, RLS) + Stripe (donations) + Resend or Postmark (transactional email) |
| **URL structure** | Path-based, not subdomain. `faithmariefoundation.org/in-memory/<slug>` |
| **Privacy model** | Two tiers — Public (indexed, shareable) and Private (password-protected, no-index) |
| **Editing model** | Single creator + up to 5 invited co-editors per memorial |
| **Pricing** | Suggested donation of $20 covers 10 years of hosting. Hardship door always available. |
| **Grant program (confirmed)** | Pay-it-forward (every paid memorial funds one free slot) and Community Sponsorship (donor pays for someone else's memorial). Other grant structures TBD — see Section 9. |
| **Moderation** | All new memorials enter a pre-publish review queue. No memorial goes live without human approval. |
| **Fundraising scope** | No per-memorial donations, no campaigns. Single "Donate to FMF in memory of <name>" link only. |
| **Archive promise** | Every memorial creator is guaranteed a downloadable HTML+media archive on request, and automatically if FMF ever winds down. |

---

## 3. User roles

| Role | Capabilities |
|---|---|
| **Visitor** | View public memorials; submit guestbook entries (email-verified); view private memorials with password |
| **Creator** | Owns the memorial. Can edit all content, invite/remove co-editors, change privacy, request takedown, transfer ownership |
| **Co-editor** | Invited by creator. Can edit content (photos, stories, life events), but cannot change privacy, cannot remove the creator, cannot delete the memorial |
| **Moderator** | FMF volunteer. Sees the review queue, approves/rejects new memorials, handles takedown requests, can suspend memorials |
| **Sponsor** | A donor who paid for someone else's memorial. Optional name credit on the memorial ("Sponsored by Jane D.") if both parties opt in. No edit rights. |
| **Admin** | FMF staff/board. Full access. Can manage moderators, view metrics, handle disputes, issue refunds. |

---

## 4. Anatomy of a memorial page

### URL
`faithmariefoundation.org/in-memory/<slug>` where `<slug>` is human-readable (e.g., `faith-marie-moses` or just `faith` for early/curated memorials). Slugs are unique platform-wide; collisions auto-append a short hash.

### Page sections (in order)

1. **Hero** — Full-width portrait photo, name, dates (`b. Apr 5, 2019 — d. Sept 12, 2022`), optional one-line epitaph chosen by family.
2. **Obituary / life story** — Free-form rich text. Recommended 200–800 words. Editor supports headings, bold/italic, links, embedded images.
3. **Photo gallery** — Up to 50 photos in v1. Captions optional. Lightbox on click. Photos auto-resized and stripped of EXIF location data.
4. **Life events timeline** — Optional structured entries (date + title + description + optional photo). Birth, graduation, marriage, etc. Renders as a vertical timeline.
5. **Tributes / guestbook** — Email-verified entries from visitors. Pre-moderated for first-time submitters; auto-published for previously-approved emails. Each entry: name, relationship, message, optional photo. Creator/co-editors can hide any entry.
6. **Service & memorial info** (optional) — Funeral details, link to live-stream, address. Auto-hides 30 days after the listed date.
7. **Music** (optional, v2+) — One ambient audio track (royalty-free or uploaded with rights attestation). Off by default; play button only.
8. **Footer** — "Hosted by Faith Marie Foundation" attribution, link to FMF, link to "Donate to FMF in memory of <name>", small "Report this memorial" link.

### Theme

One default theme at launch. Soft, warm, low-saturation palette. Serif display + clean sans body. Designed to read well on phones (where most visitors will arrive from a text-message link). Three optional accent colors so families can pick a flower/season/feel without overwhelming the moderator with QA surface. **Themes that look like greeting cards or social-media filters are out of scope.**

### Things explicitly not on the page

- Comment threads (only flat tributes)
- Social share counters
- Ads, ever
- "Related memorials" sidebars
- Algorithmically-ranked anything
- Donate-to-this-family buttons

---

## 5. Onboarding flow (automated)

The automated flow runs end-to-end with no human intervention until step 7 (the moderation queue).

### Step 1 — Landing
`faithmariefoundation.org/start-a-memorial`
- One-line value prop: *"A free memorial site that lasts. Built by the Faith Marie Foundation."*
- "Start a memorial" CTA
- Below the fold: how it works (3 steps), what it looks like (Faith's site as example), pricing/donation explanation, FAQ.

### Step 2 — Account creation
- Magic-link email auth via Supabase Auth (no passwords).
- Collect: full legal name, email, phone (optional but recommended for takedown contact).
- Reuses existing account if email matches.

### Step 3 — Tell us about your loved one
- Deceased's full name (required)
- Date of birth (required)
- Date of death (required, must be in the past)
- City/state/country at time of death (optional, used for de-duplication)
- Relationship of creator to deceased (required, dropdown: parent, spouse, child, sibling, grandchild, other family, close friend, other)

### Step 4 — Proof of death
At least **one** of the following must be provided. The flow accepts whichever is fastest for the family:
- Link to a published online obituary or memorial notice (validated via URL fetch and basic content match)
- Funeral home name + city (cross-checked against a list FMF maintains; phone number optional)
- Newspaper death notice (link or upload)
- *Hardship path*: family attests they have no online record yet — this routes to a slower manual review queue and may add 24–48h to publish time.

This step is gated. The form does not let the user proceed without at least one entry. Lying here is grounds for permanent removal and is stated explicitly on the screen.

### Step 5 — Standing attestation
A short, plain-language statement the creator must check:

> *I am [relationship] to [deceased's name], or I have explicit permission from immediate family to create this memorial. I understand that FMF will email immediate family members named in the obituary before this memorial is published, giving them an opportunity to respond. I understand that knowingly false information here may result in permanent removal and potential legal consequences.*

The creator's name and IP are recorded with the attestation.

### Step 6 — Donation / hardship choice
Three buttons, equally weighted in the UI:

- **"Donate $20 — covers 10 years"** (default highlighted)
- **"Donate a different amount"** — slider $0–$500, $20 suggested
- **"I need a hardship waiver"** — opens a one-sentence text field ("Anything you'd like us to know?") and routes to a separate volunteer-reviewed queue. No card required.

If the donation succeeds, one pay-it-forward credit is automatically added to a public counter ("Free memorials available: 7"). The next hardship request consumes one credit and is approved without review (still subject to all other moderation gates).

Stripe collects identity + billing address. This is the abuse filter — committed bad actors can pay $20, but the audit trail is real.

### Step 7 — Pre-publish moderation queue
The memorial enters `status='pending_review'`. The creator sees a confirmation screen:

> *Thanks. Your memorial is being reviewed. We'll publish within 48 hours and email you the link. While you wait, you can keep editing — any changes you make will be visible to reviewers.*

The creator can immediately keep adding photos and writing. The page is not publicly accessible during this window. A volunteer moderator reviews and either approves, requests changes, or rejects. **Section 7** describes this in detail.

### Step 8 — Family-contact email (parallel to step 7)
If the obituary URL was provided and our parser extracts named immediate family members and their email addresses (rare, but worth trying), we send a one-time courtesy notice:

> *A memorial for [Name] is being created on Faith Marie Foundation by [Creator]. If you have concerns or are not aware of this, please reply to this email within 48 hours.*

Most obituaries don't expose family emails, so this is best-effort. We don't block on it.

### Step 9 — Approval & publish
Moderator approves → memorial flips to `status='published'`. Creator receives an email with the live link, a pre-formatted text-message share blurb, and a one-pager PDF they can print for the funeral/wake.

### Step 10 — Post-publish onboarding
First-time creators see a one-screen "what to do next" card on their dashboard:
- Add 5 more photos
- Invite a co-editor (sibling, partner, child)
- Share the link with family
- Read our grief resources

This is the only growth-style nudge in the entire product. No streaks, no badges, no email drips. **Grief is not a habit-loop product.**

---

## 6. Edit experience

### Principles
- **Mobile-first.** Most editing will happen on a phone, often through tears. Forgive everything: autosave, undo, no destructive confirmations on simple things.
- **No deadlines, no nudges.** A memorial that's blank for 6 months is fine. We never email "you haven't finished yet."
- **Co-edit conflict resolution is last-write-wins per field**, with a "history" view showing who edited what (audit trail).

### Dashboard (`/dashboard`)
- List of memorials the user owns or co-edits
- Per-memorial: status (live / private / pending review / archived), quick edit, share link, "invite co-editor"
- Donation receipt history
- Account settings

### In-page editor
- Inline editing where possible (click the obituary text, edit, autosave)
- A persistent left rail with sections (Hero / Obituary / Photos / Timeline / Tributes / Service Info / Music)
- Drag to reorder photos and timeline events
- Live preview toggle (matches what visitors see)

### Co-editor invites
- Creator enters email + relationship + optional message
- Invitee receives email with a magic link → joins as co-editor
- Cap of 5 active co-editors per memorial in v1
- Creator can revoke at any time

### Privacy switch
- Creator-only control
- Public ↔ Private (password) toggle. Switching to Private retains the URL but adds a password gate. Switching to Public re-submits to a quick moderator re-check (because content may have changed since approval).
- Search engine `noindex` is enforced on Private memorials.

---

## 7. Moderation pipeline

### Pre-publish review (every new memorial)
A small dashboard at `/admin/moderation` shows pending memorials with:
- Auto-flagged signals (profanity, hate-term matches, suspicious patterns, rate-limit hits on this creator)
- Proof-of-death evidence the creator submitted, with a "verify obituary" button that opens the URL in a new tab
- The creator's full submission, rendered as the visitor would see it
- Quick action buttons: **Approve**, **Request changes** (with a templated reason), **Reject** (with a templated reason), **Escalate to admin**

A first-pass approval should take a moderator 60–90 seconds in the typical case.

### AI-assisted pre-flag (v1)
Before a memorial hits the queue, run text content through a moderation API (Anthropic, OpenAI, or Perspective API) to surface:
- Slurs / hate speech
- Sexual content
- Apparent threats
- Doxxing patterns (phone numbers, addresses other than the deceased's last city)

Flagged items are highlighted in the moderator view, not auto-rejected. Humans decide.

### Guestbook moderation
- First-time submitter from a given email → entry held for moderator approval
- Once an email is approved, future entries from that email auto-publish
- Creators can hide any entry instantly without admin involvement
- Reported entries flag for moderator review

### Takedown flow
- Public link on every memorial: "Report this memorial"
- Form asks: relationship to deceased / nature of concern / contact email
- Submission instantly suspends visibility (`status='suspended_pending_review'`) if reporter claims to be immediate family. Otherwise it queues without suspension.
- Moderator reviews within 24h. **Default behavior on credible immediate-family objection is to remove**, not to investigate or arbitrate. FMF is not in the position to adjudicate family disputes.

### Strikes & bans
- Creator-account strikes: 1 = warning, 2 = manual review on every action, 3 = ban
- Stripe customer ID and email both blocked on ban
- Banned content's archive is preserved internally for 1 year in case of legal request

### Volunteer moderation team
- Recruit 2–3 volunteers initially (board members can rotate)
- Written moderation playbook (separate doc; v0 stub: see Section 15)
- All actions logged with reviewer name + timestamp
- Sensitive content warnings; rotation expectations to prevent burnout

---

## 8. Trust & safety policies (encoded in product)

These are the rules the product enforces by design, not just by policy text.

| Rule | Enforcement |
|---|---|
| One memorial per deceased person | Soft de-dup on (full name + DOB + DOD + city). Collision triggers manual review with both creators contacted. |
| No memorials of living people | DOD must be a past date. Plus: any memorial of someone whose obituary cannot be verified gets extra scrutiny. |
| No memorials of public figures by strangers | Flag any deceased name matching a curated public-figure list; require additional documentation of family relationship. |
| No fundraising / no donate-for-family buttons | Hard-coded — there is no UI for it. The only outbound donation link goes to FMF. |
| No anonymous tributes | Email verification required for all guestbook entries. |
| No EXIF location leakage | All uploaded photos auto-stripped of GPS metadata. |
| Identity tied to payment | Stripe Customer ID stored alongside creator account; one Stripe ID may control no more than 3 memorials before manual review. |
| No bulk creation | Rate limit: 1 memorial per account per 7 days without manual review. |
| Hardship path always exists | Hard-coded as a top-level option; never gated behind multiple clicks. |
| Right to be forgotten | Creator can delete a memorial entirely; co-editors cannot. Deletion is soft for 30 days, then hard. |
| Archive guarantee | Any creator can request a ZIP of their memorial (HTML + media) at any time, no questions asked. |

---

## 9. Pricing, donations, and grant program

### Default model
- **Suggested donation: $20** for 10 years of hosting, downloadable archive guaranteed, free renewal at year 10 if FMF still operates.
- **Pay what you want:** $0–$500 slider, $20 suggested. $0 still requires the hardship-attestation field.
- **Hardship door:** always available, free, one-sentence note required, routed to a separate volunteer-reviewed queue.

### Grant programs (confirmed)

**Pay-it-forward.** Every paid donation auto-credits one free hardship slot. A live counter on `/start-a-memorial` reads "Free memorials available: N" and decrements as hardship requests are approved. If the counter hits 0, hardship requests still go through but route to a manually-funded reserve pool.

**Community sponsorship.** A donor can pay for someone else's memorial directly (church groups, employers, friends, communities pooling for a family in crisis). Sponsor enters: their name (or "Anonymous"), the recipient's email, an optional note. Recipient gets an email: *"[Sponsor] has covered the cost of a memorial for your loved one. Click here to begin."* Memorials funded this way show a small "Sponsored by [Name]" credit in the footer if both parties opt in.

### Grant programs (TBD — see Section 15)
The third and fourth grant structures (named hardship waivers; targeted-circumstance funds like "Faith's Fund" for child loss) are deferred for later phases. The data model below leaves room for them.

### Donation accounting
- All donations flow through Stripe to FMF's nonprofit account
- Until 501(c)(3) approval: donations carry "tax-exempt status pending" disclosure on the receipt
- After approval: receipts are deductible to the donor and dated to the original donation date (within the 27-month retroactive window)
- Donors are tagged in the system with `donor_source = 'memorial'` so we can report on this revenue stream separately

---

## 10. Data model (Supabase / Postgres)

Tables below are sketch-level. Field types are illustrative; the developer should refine. **Row-level security (RLS) is mandatory on every table.**

```sql
-- core entities
users (
  id uuid pk,
  email text unique,
  full_name text,
  phone text,
  created_at timestamptz,
  banned_at timestamptz null,
  ban_reason text null
)

memorials (
  id uuid pk,
  slug text unique,                          -- e.g., 'faith-marie-moses'
  creator_id uuid references users(id),
  deceased_full_name text,
  deceased_dob date,
  deceased_dod date,
  deceased_city text,
  deceased_country text,
  epitaph text,                              -- one-line under name
  obituary_text text,                        -- rich text / markdown
  hero_photo_url text,
  privacy text check (privacy in ('public','private')),
  privacy_password_hash text null,
  status text check (status in ('draft','pending_review','published','suspended_pending_review','archived','deleted')),
  hosting_paid_until date,                   -- DOD + 10 years on paid creation
  funded_by text check (funded_by in ('paid','hardship','sponsored','pay_it_forward','grant')),
  sponsor_user_id uuid null references users(id),
  sponsor_display_name text null,
  created_at timestamptz,
  published_at timestamptz null,
  last_edited_at timestamptz
)

memorial_editors (                            -- co-editor invites
  memorial_id uuid references memorials(id),
  user_id uuid references users(id),
  invited_by uuid references users(id),
  invited_at timestamptz,
  accepted_at timestamptz null,
  removed_at timestamptz null,
  primary key (memorial_id, user_id)
)

photos (
  id uuid pk,
  memorial_id uuid references memorials(id),
  storage_path text,                          -- Supabase Storage key
  caption text null,
  sort_order int,
  uploaded_by uuid references users(id),
  uploaded_at timestamptz
)

life_events (
  id uuid pk,
  memorial_id uuid references memorials(id),
  event_date date,
  title text,
  description text,
  photo_id uuid null references photos(id),
  sort_order int
)

tributes (                                    -- guestbook entries
  id uuid pk,
  memorial_id uuid references memorials(id),
  visitor_email text,
  visitor_email_verified boolean,
  visitor_name text,
  visitor_relationship text,
  message text,
  photo_id uuid null references photos(id),
  status text check (status in ('pending','approved','hidden','spam')),
  submitted_at timestamptz,
  moderated_by uuid null references users(id),
  moderated_at timestamptz null
)

proof_of_death (
  id uuid pk,
  memorial_id uuid references memorials(id),
  type text check (type in ('obituary_url','funeral_home','newspaper_link','upload','hardship_attestation')),
  payload jsonb,                              -- url, funeral home name, etc.
  verified_by uuid null references users(id),
  verified_at timestamptz null,
  notes text null
)

attestations (
  id uuid pk,
  memorial_id uuid references memorials(id),
  user_id uuid references users(id),
  text text,                                  -- frozen copy of the attestation language
  signed_at timestamptz,
  ip text,
  user_agent text
)

donations (
  id uuid pk,
  user_id uuid null references users(id),     -- null for anonymous
  memorial_id uuid null references memorials(id),  -- null = general fund
  amount_cents int,
  currency text,
  stripe_payment_intent_id text,
  donor_source text,                          -- 'memorial','sponsorship','general','recurring'
  is_sponsorship boolean,
  sponsorship_recipient_email text null,
  generated_payif_credit boolean,
  created_at timestamptz
)

pay_it_forward_credits (
  id uuid pk,
  funded_by_donation_id uuid references donations(id),
  consumed_by_memorial_id uuid null references memorials(id),
  consumed_at timestamptz null,
  expires_at timestamptz null                 -- credits don't have to expire; leaving option open
)

moderation_actions (
  id uuid pk,
  memorial_id uuid null references memorials(id),
  tribute_id uuid null references tributes(id),
  user_id uuid null references users(id),     -- the moderator
  action text,                                -- 'approve','reject','request_changes','suspend','restore','ban_user'
  reason text,
  notes text,
  created_at timestamptz
)

reports (
  id uuid pk,
  memorial_id uuid references memorials(id),
  reporter_email text,
  reporter_relationship text,
  nature_of_concern text,
  message text,
  status text,                                -- 'open','resolved_removed','resolved_kept','duplicate'
  created_at timestamptz,
  resolved_by uuid null references users(id),
  resolved_at timestamptz null
)

audit_log (
  id uuid pk,
  actor_user_id uuid references users(id),
  entity_type text,                           -- 'memorial','tribute','user','donation'
  entity_id uuid,
  action text,                                -- free-form ('edit_obituary','add_photo','change_privacy', etc.)
  diff jsonb,                                 -- before/after where relevant
  created_at timestamptz
)
```

### RLS policies (sketch)
- `memorials`: SELECT allowed when `status='published' AND privacy='public'`, OR (`privacy='private'` AND password matches), OR creator/co-editor of memorial, OR moderator/admin
- `tributes`: SELECT allowed when memorial is viewable AND `status='approved'`, OR creator/co-editor, OR moderator
- `donations`: SELECT only by donor or admin
- All write operations: enforced by role checks

---

## 11. Tech stack & architecture

### Frontend
- **Next.js 14+ (App Router)**, deployed on Vercel or Cloudflare Pages
- **Tailwind CSS** + a small component library (shadcn/ui)
- **TipTap** or similar for the rich-text obituary editor
- **next/image** for photo handling and resizing
- **next-intl** scaffolded but not used at v1 (English-only launch; structure for i18n later)

### Backend
- **Supabase**: Postgres + Auth + Storage + RLS + Edge Functions where needed
- **Stripe** for donations (Stripe Checkout, not custom card forms — we want PCI scope at a minimum)
- **Resend** or **Postmark** for transactional email (lower deliverability risk than SendGrid for a new domain)
- **Cloudflare** in front for DDoS protection, image CDN, and bot mitigation

### Image processing
- Supabase Storage holds originals
- An edge function generates thumbnails (400px, 800px, 1600px) on upload
- EXIF GPS data is stripped server-side before public URLs are generated
- Max upload: 15MB per photo, 50 photos per memorial in v1

### Search & indexing
- Public memorials are indexed via a clean sitemap.xml regenerated nightly
- Private memorials emit `<meta name="robots" content="noindex,nofollow">`
- robots.txt explicitly disallows `/admin/*`

### Observability
- Vercel/Cloudflare logs + Supabase logs
- Sentry for frontend + backend errors
- A small Slack or email alert on: moderation queue depth > N, payment failure rate > X%, takedown reports filed

### Infra cost (rough projection, year 1)
- Vercel Pro: $20/mo
- Supabase Pro: $25/mo
- Stripe: 2.9% + $0.30 per donation (nonprofit rate available post-501c3)
- Resend: $20/mo
- Cloudflare: $0–20/mo
- Domain + email: existing
- **Total: ~$65–85/mo at low volume**, scaling sub-linearly

---

## 12. Email & notification flows

| Trigger | Recipient | Template purpose |
|---|---|---|
| Memorial submitted | Creator | "We got it. Reviewing within 48h." |
| Moderator requested changes | Creator | What needs to change, link back to edit |
| Moderator approved | Creator | "Live now! Here's your link + share blurb + printable card" |
| Moderator rejected | Creator | Reason, appeal contact |
| Co-editor invited | Invitee | Magic link to join |
| Tribute submitted (first-time) | Creator | "New tribute pending your approval" |
| Tribute auto-published | Creator | "New tribute on [memorial]" — daily digest, not per-event |
| Family-contact courtesy | Family member from obituary | "A memorial is being created. Concerns? Reply within 48h." |
| Takedown filed | Creator | "Someone has reported this memorial. Here's what happens next." |
| Takedown resolved | Reporter + Creator | Outcome |
| Donation received | Donor | Receipt with pending-501c3 disclosure or full deductibility once approved |
| Sponsorship gift sent | Recipient | "[Sponsor] has covered a memorial for your loved one. Start here." |
| Year 9.5 reminder | Creator | "Your memorial's hosting renews in 6 months. Free renewal — just click to confirm." |
| Wind-down | Creator | (Reserved) "Here is your downloadable archive." |

All emails are plain, warm, and short. No marketing copy. No emoji. Unsubscribe link on everything per CAN-SPAM, but the only "campaign" emails are the year-9.5 renewal reminders and the FMF newsletter (separate opt-in).

---

## 13. Analytics & metrics

### Product metrics
- Memorials created per week (paid / hardship / sponsored)
- Time from submission → approval (target: median < 24h)
- Co-editor adoption rate (% of memorials with ≥1 co-editor)
- Tributes per memorial (median, P90)
- Privacy mix (% public / % private)

### Mission metrics (for FMF reporting)
- Total families served (= unique creators)
- Total memorials hosted
- Hardship slots used / pay-it-forward credits generated
- Sponsorship dollars
- Total donations attributed to memorial channel

### Trust & safety metrics
- Reports filed per 100 memorials
- Memorials removed post-publish per 100 published
- Creators banned (cumulative)
- Moderator queue depth (alert if > 50)
- Median moderator review time

### Privacy posture
- No third-party analytics (no GA, no Meta Pixel, no Hotjar) on memorial pages themselves — these are grief spaces
- Plausible or Cloudflare Analytics on marketing pages only (`/start-a-memorial`, `/about`, etc.)
- Internal product analytics via Supabase + a lightweight custom event table

---

## 14. Phased rollout

### Phase 0 — Faith's memorial (manual, before any product exists)
Hand-build Faith's memorial page as a static page on the FMF site. Use it to test the visual design, the emotional weight, and as the "this is what you'll get" example on `/start-a-memorial`. **No code yet.**

### Phase 1 — MVP (target: 6–8 weeks of dev)
- Onboarding flow steps 1–10
- Memorial page sections 1–5 (hero, obituary, photos, timeline, tributes)
- Public + private (password) privacy
- Single creator (no co-editors yet)
- Stripe donation + hardship door + pay-it-forward counter
- Moderation queue
- Family-contact courtesy email (best-effort)
- Takedown flow
- Faith's memorial migrated onto the platform as memorial #1

### Phase 2 — Family & community (target: 4–6 weeks after MVP)
- Co-editor invites
- Community sponsorship gifting flow
- Service info section
- Guestbook moderation tooling improvements
- Volunteer moderator dashboard polish
- Printable one-pager PDF generation

### Phase 3 — Polish & sustain (ongoing)
- Music section
- Themes (3 accent colors)
- Year-10 renewal reminders
- Targeted-circumstance grant funds (e.g., "Faith's Fund" for child loss) once we know there's demand
- Volunteer recruitment pipeline for moderation team
- Annual archive ZIP download self-service

---

## 15. Open questions

These are the things I (Levi) still need to think through, or that should be decided before or during MVP build.

1. **Grant program — final shape.** Pay-it-forward and community sponsorship are confirmed. Do we also want named circumstance funds (Faith's Fund for child loss; sudden-loss fund; income-based fund)? My instinct is yes eventually, but probably Phase 3 after we have data on what kinds of hardship requests come in.
2. **Volunteer moderator recruitment.** Who are the first 2–3 reviewers? Board members at first, but we'll need outside volunteers within 6 months.
3. **Moderation playbook.** This spec describes the system; we still need a written playbook for moderators (how to handle a death-hoax flag, what counts as "credible" family objection, how to write a "request changes" message, when to escalate).
4. **Public-figure list.** Where does it come from? Wikipedia API + a manual override table is probably enough for v1.
5. **Children of deceased who are minors.** When parents who are still children (under 18) want to memorialize a parent — verification gets harder. Defer until we hit the case, but flag it.
6. **Content rights / copyright.** Photos uploaded by family — we'll want a one-line license grant in the ToS so we can host, resize, and serve them. Standard memorial-platform language; nothing exotic.
7. **State-by-state donation registration.** Texas formation is the plan, but soliciting nationwide may trigger registration requirements in other states. **Talk to a nonprofit attorney before opening donations to non-Texas residents.**
8. **PII in obituaries.** Some obits include addresses or living relatives' contact info. Our parser should redact these before storing.
9. **Archive guarantee — operational backstop.** What's the actual mechanism if FMF winds down? Suggest: an annual "release the source" backup to Internet Archive of all public memorials, plus a per-creator email with a ZIP of their content. Worth specifying once we're closer to launch.
10. **Naming.** The product currently doesn't have a name beyond "FMF Memorial Sites." A small naming pass before launch would help — something that lives next to "Faith Marie Foundation" without competing with it. Working title: *In Memory*.

---

## 16. Appendix — the core trust loop, in one paragraph

The thing keeping bad actors out is not any single check; it is the **layering**. To create a fake or hostile memorial on this platform, someone has to (1) pass an obituary or funeral-home verification, (2) sign a standing attestation tied to their IP and account, (3) put $20 on a credit card with their real name and billing address — or write a hardship request that a human will read — (4) wait 24–48 hours during which immediate family may receive a courtesy email, and (5) clear a human moderator's review of the actual content. Any one of those filters is bypassable; all five together are the moat. The pricing isn't really about money; it's about layered identity verification dressed as a donation, with the side effect of funding the next family's free memorial.

---

*End of spec.*
