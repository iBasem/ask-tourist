// A simple script to help apply migrations to Supabase
// Note: This is a placeholder for documentation purposes

/*
To apply migrations to Supabase, you can use the Supabase CLI or
directly execute the SQL files through the Supabase SQL Editor.

Method 1: Using Supabase CLI
1. Install Supabase CLI
   npm install -g supabase

2. Login to Supabase
   supabase login

3. Link your project
   supabase link --project-ref YOUR_PROJECT_REF

4. Apply migrations
   supabase db push

Method 2: Using Supabase SQL Editor
1. Login to Supabase Dashboard
2. Navigate to the SQL Editor
3. Copy the contents of each migration file
4. Paste into the SQL Editor and execute in order:
   - 001_enable_uuid.sql
   - 002_create_packages.sql
   - 003_create_inquiries.sql
   - 004_create_bookings.sql
   - 005_create_wishlists.sql
   - 006_create_reviews.sql
   - 007_create_audit_logs.sql
   - 008_enable_rls.sql
   - 009_create_rls_policies.sql
*/
