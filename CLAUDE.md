# Faith Marie Foundation - Project Context

## Overview

Faith Marie Foundation (faithmarie.org) is a nonprofit website that translates mental health research into accessible, plain-language guidance for families navigating grief, trauma, depression, and anxiety.

**Mission**: Making mental health research accessible to every family.

## Tech Stack

- **Framework**: Next.js 16 with App Router (src/app directory)
- **Language**: TypeScript with React 19
- **Styling**: Tailwind CSS v4 (teal primary color: #0D9488)
- **Database**: Supabase (project: `znwcraymlngmymhlrfde`, region: us-east-2)
- **Auth**: Supabase Auth with role-based access
- **Payments**: Stripe (donations)
- **Email**: Resend
- **AI**: Anthropic Claude (Resource Guide chatbot)

## Supabase Configuration

**Project ID**: `znwcraymlngmymhlrfde`
**Project Name**: FaithMarie.org

### Database Schema

Tables (all have RLS enabled):
- `admin_users` - Dashboard users with roles (admin, board_member, contributor)
- `research_digests` - Published research summaries
- `donations` - Stripe donation records
- `subscribers` - Newsletter subscribers with topic preferences
- `contact_submissions` - Volunteer/partner inquiries

### Role-Based Access
- `admin` - Full access, can manage users and all content
- `board_member` - Read access to all dashboard data
- `contributor` - Can create/edit own research digests

### RLS Helper Functions
- `is_admin()` - Returns true if current user is admin
- `has_dashboard_access()` - Returns true if user has any admin role
- `get_user_role()` - Returns current user's role enum

## Key Directories

```
src/
├── app/
│   ├── admin/          # Admin dashboard (protected)
│   ├── api/            # API routes (Stripe, newsletter, chat)
│   ├── research/       # Research library and digests
│   ├── tools/chatbot/  # Resource Guide (AI assistant)
│   └── ...
├── components/
│   ├── admin/          # Admin-specific components
│   └── ...
└── lib/
    └── supabase/       # Supabase client utilities
        ├── client.ts   # Browser client
        ├── server.ts   # Server component client
        ├── admin.ts    # Service role client (bypasses RLS)
        └── types.ts    # Database types
```

## Conventions

### Positioning
- **Mission-focused, not AI-forward**: The foundation helps families, not "AI teams"
- Use "Resource Guide" not "AI chatbot" in user-facing copy
- Avoid "AI-powered", "autonomous", "AI teams" language

### Code Style
- Use TypeScript strict mode
- Prefer server components; use 'use client' only when needed
- Keep components focused and small
- Use Supabase MCP tools to inspect schema before creating migrations

### Database Operations
- Always use the appropriate Supabase client:
  - `createClient()` from `server.ts` for server components
  - `createClient()` from `client.ts` for client components
  - `createAdminClient()` from `admin.ts` for webhooks/API routes that bypass RLS
- Apply migrations via Supabase MCP, not manual SQL

### Git Commits
- Include "Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>" in commits
- Write concise commit messages focused on "why" not "what"

## Environment Variables

Required in `.env.local` (never commit):
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
RESEND_AUDIENCE_ID=
```

## Common Tasks

### Adding a new database table
1. Use `mcp__claude_ai_Supabase__list_tables` to inspect current schema
2. Use `mcp__claude_ai_Supabase__apply_migration` to create table
3. Update `src/lib/supabase/types.ts` with new types
4. Add RLS policies as needed

### Creating admin features
1. Add page in `src/app/admin/`
2. Use server components with `createClient()` from `lib/supabase/server`
3. Dashboard access is protected by middleware

### Working with donations
- Stripe webhook saves to `donations` table via admin client
- View in admin dashboard at `/admin/donations`
