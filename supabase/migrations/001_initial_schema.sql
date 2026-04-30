-- Faith Marie Foundation Database Schema
-- Run this in Supabase SQL Editor: https://znwcraymlngmymhlrfde.supabase.co

-- ============================================
-- ENUMS
-- ============================================

CREATE TYPE user_role AS ENUM ('admin', 'board_member', 'contributor');
CREATE TYPE submission_status AS ENUM ('new', 'reviewed', 'responded', 'archived');
CREATE TYPE submission_type AS ENUM ('volunteer', 'partner', 'general');

-- ============================================
-- ADMIN USERS TABLE
-- ============================================
-- Stores users who can access the admin dashboard

CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'contributor',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Link admin_users to Supabase Auth
ALTER TABLE admin_users ADD CONSTRAINT admin_users_id_fkey
  FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- ============================================
-- RESEARCH DIGESTS TABLE
-- ============================================
-- Published research summaries

CREATE TABLE research_digests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  topic TEXT NOT NULL,
  source_url TEXT,
  source_title TEXT,
  published BOOLEAN NOT NULL DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_by UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_research_digests_topic ON research_digests(topic);
CREATE INDEX idx_research_digests_published ON research_digests(published, published_at DESC);
CREATE INDEX idx_research_digests_slug ON research_digests(slug);

-- ============================================
-- DONATIONS TABLE
-- ============================================
-- Tracks donations from Stripe webhooks

CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id TEXT UNIQUE NOT NULL,
  amount_cents INTEGER NOT NULL,
  donor_email TEXT,
  donor_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_donations_created_at ON donations(created_at DESC);
CREATE INDEX idx_donations_email ON donations(donor_email);

-- ============================================
-- SUBSCRIBERS TABLE
-- ============================================
-- Newsletter subscribers

CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  topics TEXT[] NOT NULL DEFAULT '{}',
  source TEXT,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

CREATE INDEX idx_subscribers_email ON subscribers(email);
CREATE INDEX idx_subscribers_subscribed ON subscribers(subscribed_at DESC) WHERE unsubscribed_at IS NULL;

-- ============================================
-- CONTACT SUBMISSIONS TABLE
-- ============================================
-- Volunteer applications, partnership inquiries, etc.

CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type submission_type NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT,
  message TEXT NOT NULL,
  status submission_status NOT NULL DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_contact_submissions_status ON contact_submissions(status, created_at DESC);
CREATE INDEX idx_contact_submissions_type ON contact_submissions(type);

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================
-- Automatically update updated_at timestamp

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_research_digests_updated_at
  BEFORE UPDATE ON research_digests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Enable RLS on all tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_digests ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user's role
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS user_role AS $$
  SELECT role FROM admin_users WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE SQL SECURITY DEFINER;

-- Helper function to check if user has dashboard access
CREATE OR REPLACE FUNCTION has_dashboard_access()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid()
  );
$$ LANGUAGE SQL SECURITY DEFINER;

-- ============================================
-- ADMIN USERS POLICIES
-- ============================================

-- Admins can see all admin users
CREATE POLICY "Admins can view all admin users"
  ON admin_users FOR SELECT
  USING (has_dashboard_access());

-- Only admins can insert new admin users
CREATE POLICY "Admins can create admin users"
  ON admin_users FOR INSERT
  WITH CHECK (is_admin());

-- Only admins can update admin users
CREATE POLICY "Admins can update admin users"
  ON admin_users FOR UPDATE
  USING (is_admin());

-- Only admins can delete admin users
CREATE POLICY "Admins can delete admin users"
  ON admin_users FOR DELETE
  USING (is_admin());

-- ============================================
-- RESEARCH DIGESTS POLICIES
-- ============================================

-- Anyone can read published digests (public)
CREATE POLICY "Anyone can view published digests"
  ON research_digests FOR SELECT
  USING (published = true);

-- Dashboard users can view all digests (including drafts)
CREATE POLICY "Dashboard users can view all digests"
  ON research_digests FOR SELECT
  USING (has_dashboard_access());

-- Admins and contributors can create digests
CREATE POLICY "Admins and contributors can create digests"
  ON research_digests FOR INSERT
  WITH CHECK (has_dashboard_access());

-- Admins can update any digest, contributors can update their own
CREATE POLICY "Update digests based on role"
  ON research_digests FOR UPDATE
  USING (
    is_admin() OR
    (has_dashboard_access() AND created_by = auth.uid())
  );

-- Only admins can delete digests
CREATE POLICY "Admins can delete digests"
  ON research_digests FOR DELETE
  USING (is_admin());

-- ============================================
-- DONATIONS POLICIES
-- ============================================

-- Only dashboard users can view donations
CREATE POLICY "Dashboard users can view donations"
  ON donations FOR SELECT
  USING (has_dashboard_access());

-- Service role (webhooks) can insert donations
-- This happens via the admin client which bypasses RLS

-- ============================================
-- SUBSCRIBERS POLICIES
-- ============================================

-- Only dashboard users can view subscribers
CREATE POLICY "Dashboard users can view subscribers"
  ON subscribers FOR SELECT
  USING (has_dashboard_access());

-- Service role (API) can insert/update subscribers
-- This happens via the admin client which bypasses RLS

-- ============================================
-- CONTACT SUBMISSIONS POLICIES
-- ============================================

-- Dashboard users can view submissions
CREATE POLICY "Dashboard users can view submissions"
  ON contact_submissions FOR SELECT
  USING (has_dashboard_access());

-- Anyone can submit (public forms)
CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

-- Admins can update submissions
CREATE POLICY "Admins can update submissions"
  ON contact_submissions FOR UPDATE
  USING (is_admin());

-- ============================================
-- INITIAL ADMIN USER (update with your email)
-- ============================================
-- Uncomment and run after creating your Supabase Auth account:
--
-- INSERT INTO admin_users (id, email, name, role)
-- VALUES (
--   'your-auth-user-uuid-here',
--   'your-email@example.com',
--   'Your Name',
--   'admin'
-- );
