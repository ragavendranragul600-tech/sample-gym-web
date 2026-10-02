-- ========================================
-- IRONFORGE FITNESS - SUPABASE SCHEMA
-- ========================================
-- 
-- This SQL script creates the necessary tables and security policies
-- for the IronForge Fitness website.
--
-- Execute this in your Supabase SQL editor:
-- 1. Go to https://app.supabase.com
-- 2. Select your project
-- 3. Go to SQL Editor
-- 4. Click "New Query"
-- 5. Copy and paste this entire script
-- 6. Click "Run"
--
-- ========================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- TABLE 1: contact_enquiries
-- ========================================
-- Stores contact form submissions from the website
--
CREATE TABLE IF NOT EXISTS public.contact_enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    interested_program VARCHAR(255),
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on created_at for faster queries
CREATE INDEX idx_contact_enquiries_created_at 
ON public.contact_enquiries(created_at DESC);

-- Create index on email for finding duplicates
CREATE INDEX idx_contact_enquiries_email 
ON public.contact_enquiries(email);

-- Add table comment
COMMENT ON TABLE public.contact_enquiries IS 
'Stores contact form enquiries from website visitors. Automatically timestamped.';

-- ========================================
-- TABLE 2: trial_requests
-- ========================================
-- Stores free trial booking requests
--
CREATE TABLE IF NOT EXISTS public.trial_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    preferred_date VARCHAR(50),
    program VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on created_at for faster queries
CREATE INDEX idx_trial_requests_created_at 
ON public.trial_requests(created_at DESC);

-- Create index on email for finding duplicates
CREATE INDEX idx_trial_requests_email 
ON public.trial_requests(email);

-- Add table comment
COMMENT ON TABLE public.trial_requests IS 
'Stores free trial booking requests from website visitors.';

-- ========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================
-- RLS enables fine-grained access control

-- Enable RLS on contact_enquiries
ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;

-- Enable RLS on trial_requests
ALTER TABLE public.trial_requests ENABLE ROW LEVEL SECURITY;

-- ========================================
-- Policies for contact_enquiries
-- ========================================

-- Anyone can INSERT new enquiries (public form submission)
CREATE POLICY "Anyone can insert contact enquiries" 
ON public.contact_enquiries 
FOR INSERT 
WITH CHECK (true);

-- Only authenticated admins can SELECT (view all enquiries)
-- This is checked through Supabase Auth JWT
CREATE POLICY "Only authenticated users can view contact enquiries" 
ON public.contact_enquiries 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Only admins can UPDATE enquiries
CREATE POLICY "Only authenticated users can update contact enquiries" 
ON public.contact_enquiries 
FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Only admins can DELETE enquiries
CREATE POLICY "Only authenticated users can delete contact enquiries" 
ON public.contact_enquiries 
FOR DELETE 
USING (auth.role() = 'authenticated');

-- ========================================
-- Policies for trial_requests
-- ========================================

-- Anyone can INSERT new trial requests (public form submission)
CREATE POLICY "Anyone can insert trial requests" 
ON public.trial_requests 
FOR INSERT 
WITH CHECK (true);

-- Only authenticated admins can SELECT (view all requests)
CREATE POLICY "Only authenticated users can view trial requests" 
ON public.trial_requests 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Only admins can UPDATE requests
CREATE POLICY "Only authenticated users can update trial requests" 
ON public.trial_requests 
FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Only admins can DELETE requests
CREATE POLICY "Only authenticated users can delete trial requests" 
ON public.trial_requests 
FOR DELETE 
USING (auth.role() = 'authenticated');

-- ========================================
-- GRANT PERMISSIONS
-- ========================================

-- Grant INSERT to anon (public users can submit forms)
GRANT INSERT ON public.contact_enquiries TO anon;
GRANT INSERT ON public.trial_requests TO anon;

-- Grant SELECT, UPDATE, DELETE to authenticated (admins)
GRANT SELECT, UPDATE, DELETE ON public.contact_enquiries TO authenticated;
GRANT SELECT, UPDATE, DELETE ON public.trial_requests TO authenticated;

-- ========================================
-- VERIFICATION
-- ========================================
-- Run this to verify tables were created:
-- SELECT * FROM information_schema.tables WHERE table_schema = 'public';

-- ========================================
-- END OF SETUP SCRIPT
-- ========================================