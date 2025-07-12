# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Start development server:**
```bash
npm run dev
```

**Build application:**
```bash
npm run build
```

**Start production server:**
```bash
npm run start
```

**Lint code:**
```bash
npm run lint
```

## Architecture Overview

This is a Next.js 15 full-stack SaaS application with authentication, payments, and subscription management.

### Core Stack
- **Framework:** Next.js 15 with App Router
- **Authentication:** Supabase Auth with Google OAuth
- **Database:** Supabase PostgreSQL
- **Payments:** Stripe with webhook handling
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Analytics:** PostHog and Vercel Analytics

### Key Architectural Patterns

**Authentication Flow:**
- AuthContext (`contexts/AuthContext.tsx`) manages auth state and subscription status
- ProtectedRoute wrapper handles route protection
- Automatic subscription validation on auth state changes
- Google OAuth with Supabase redirect handling

**Payment Integration:**
- Stripe webhook endpoint at `/api/stripe/webhook` handles subscription events
- Real-time subscription sync with Supabase via webhooks
- Trial period management with automatic expiration
- Subscription status checking integrated with auth state

**Database Structure:**
- `users` table with soft deletion support (is_deleted flag)
- `subscriptions` table tracking Stripe subscription data
- `user_preferences` and `user_trials` for feature management
- RLS policies for data security

### Important File Locations

**Configuration:**
- Environment variables: `.env.local` (copy from `.env.example`)
- MCP configuration: `.cursor/mcp.json` (copy from `.cursor/mcp.json.example`)
- Database schema: `initial_supabase_table_schema.sql`

**Core Utilities:**
- Supabase client: `utils/supabase.ts`
- Admin Supabase client: `utils/supabase-admin.ts`
- Analytics setup: `utils/analytics.ts` and `utils/posthog.ts`

**API Routes:**
- Stripe webhooks: `app/api/stripe/webhook/route.ts`
- Subscription management: `app/api/stripe/sync/route.ts`
- User management: `app/api/user/delete/route.ts`

### Development Workflow

**Environment Setup:**
1. Copy `.env.example` to `.env.local` and fill in all required values
2. Set up Supabase project with required tables and RLS policies
3. Configure Stripe webhooks pointing to `/api/stripe/webhook`
4. Set up Google OAuth credentials in both GCP and Supabase

**MCP Integration:**
- Stripe MCP server for payment debugging
- Supabase MCP server for database operations
- Configuration in `.cursor/mcp.json` (never commit this file)

**Testing Payments:**
- Use Stripe test mode during development
- Webhook testing via Stripe CLI or ngrok
- Subscription status syncs automatically via webhooks

### Key Business Logic

**Subscription Handling:**
- Webhook events update subscription status in real-time
- AuthContext automatically checks subscription validity
- Trial periods managed through Stripe and tracked in database
- Soft account deletion preserves subscription data

**User Account Management:**
- Soft deletion with reactivation capability
- Password reset flow with email verification
- Profile updates with email change verification
- Account deletion cascades to related data

### Security Considerations
- All database access uses RLS policies
- Webhook signature verification for Stripe events
- Service role key used only for admin operations
- Client-side auth state synced with server-side validation