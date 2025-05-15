-- Migration: 009_create_rls_policies.sql
-- Description: Define Row Level Security policies for all tables
-- Created: 2025-05-15

-- Profiles table policies
-- Note: profiles policy was already created in Phase 2, but we'll recreate it here to ensure consistency
DROP POLICY IF EXISTS "Profiles: manage own row" ON profiles;
CREATE POLICY "Profiles: manage own row"
  ON profiles
  FOR ALL
  USING (auth.uid() = user_id);

-- Admin can select all profiles
DROP POLICY IF EXISTS "Profiles: admin select" ON profiles;
CREATE POLICY "Profiles: admin select"
  ON profiles
  FOR SELECT
  USING (auth.role() = 'service_role');

-- Packages table policies
-- Vendors can manage their own packages
CREATE POLICY "Packages: vendors manage own"
  ON packages
  FOR ALL
  USING (auth.uid() = vendor_id);

-- Everyone can view active packages
CREATE POLICY "Packages: public view active"
  ON packages
  FOR SELECT
  USING (is_active = true);

-- Inquiries table policies
-- Customers can view and manage their own inquiries
CREATE POLICY "Inquiries: customers manage own"
  ON inquiries
  FOR ALL
  USING (auth.uid() = user_id);

-- Vendors can view inquiries for their packages
CREATE POLICY "Inquiries: vendors view for own packages"
  ON inquiries
  FOR SELECT
  USING (
    auth.uid() IN (
      SELECT vendor_id FROM packages WHERE id = package_id
    )
  );

-- Inquiry replies policies
-- Anyone can view replies to their inquiries
CREATE POLICY "Inquiry_replies: view for own inquiries"
  ON inquiry_replies
  FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM inquiries WHERE id = inquiry_id
    )
  );

-- Users can manage their own replies
CREATE POLICY "Inquiry_replies: manage own"
  ON inquiry_replies
  FOR ALL
  USING (auth.uid() = user_id);

-- Vendors can view replies for their package inquiries
CREATE POLICY "Inquiry_replies: vendors view for own packages"
  ON inquiry_replies
  FOR SELECT
  USING (
    auth.uid() IN (
      SELECT p.vendor_id
      FROM packages p
      JOIN inquiries i ON p.id = i.package_id
      WHERE i.id = inquiry_id
    )
  );

-- Bookings table policies
-- Customers can view and manage their own bookings
CREATE POLICY "Bookings: customers manage own"
  ON bookings
  FOR ALL
  USING (auth.uid() = user_id);

-- Vendors can view bookings for their packages
CREATE POLICY "Bookings: vendors view for own packages"
  ON bookings
  FOR SELECT
  USING (
    auth.uid() IN (
      SELECT vendor_id FROM packages WHERE id = package_id
    )
  );

-- Vendors can update booking status for their packages
CREATE POLICY "Bookings: vendors update status"
  ON bookings
  FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT vendor_id FROM packages WHERE id = package_id
    )
  )
  WITH CHECK (
    -- Only allow updating status field, nothing else
    (OLD.user_id = NEW.user_id) AND
    (OLD.package_id = NEW.package_id) AND
    (OLD.start_date = NEW.start_date) AND
    (OLD.end_date = NEW.end_date) AND
    (OLD.num_travelers = NEW.num_travelers) AND
    (OLD.total_price = NEW.total_price)
  );

-- Wishlists table policies
-- Users can manage their own wishlists
CREATE POLICY "Wishlists: users manage own"
  ON wishlists
  FOR ALL
  USING (auth.uid() = user_id);

-- Reviews table policies
-- Users can manage their own reviews
CREATE POLICY "Reviews: users manage own"
  ON reviews
  FOR ALL
  USING (auth.uid() = user_id);

-- Everyone can view approved reviews
CREATE POLICY "Reviews: public view approved"
  ON reviews
  FOR SELECT
  USING (approved = true);

-- Vendors can view all reviews for their packages
CREATE POLICY "Reviews: vendors view for own packages"
  ON reviews
  FOR SELECT
  USING (
    auth.uid() IN (
      SELECT vendor_id FROM packages WHERE id = package_id
    )
  );

-- Audit logs policies
-- Only service_role (admin) can view audit logs
CREATE POLICY "Audit_logs: admin only"
  ON audit_logs
  FOR SELECT
  USING (auth.role() = 'service_role');

-- Users can view audit logs for their own actions
CREATE POLICY "Audit_logs: users view own"
  ON audit_logs
  FOR SELECT
  USING (performed_by = auth.uid());
