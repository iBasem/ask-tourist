-- Migration: 007_create_audit_logs.sql
-- Description: Create audit logging functionality for tracking data changes
-- Created: 2025-05-15

-- Create audit_logs table
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  table_name TEXT NOT NULL,
  record_id UUID NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
  old_data JSONB,
  new_data JSONB,
  performed_by UUID,
  performed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create index for faster querying
CREATE INDEX idx_audit_logs_table_name ON audit_logs(table_name);
CREATE INDEX idx_audit_logs_record_id ON audit_logs(record_id);
CREATE INDEX idx_audit_logs_performed_by ON audit_logs(performed_by);
CREATE INDEX idx_audit_logs_performed_at ON audit_logs(performed_at);

-- Create function to log audit events
CREATE OR REPLACE FUNCTION log_audit()
RETURNS TRIGGER AS $$
DECLARE
  old_data JSONB := NULL;
  new_data JSONB := NULL;
BEGIN
  -- Capture the operation type (INSERT, UPDATE, DELETE)
  IF (TG_OP = 'INSERT') THEN
    new_data := to_jsonb(NEW);
    INSERT INTO audit_logs (table_name, record_id, action, new_data, performed_by)
    VALUES (TG_TABLE_NAME, NEW.id, TG_OP, new_data, auth.uid());
  ELSIF (TG_OP = 'UPDATE') THEN
    old_data := to_jsonb(OLD);
    new_data := to_jsonb(NEW);
    INSERT INTO audit_logs (table_name, record_id, action, old_data, new_data, performed_by)
    VALUES (TG_TABLE_NAME, NEW.id, TG_OP, old_data, new_data, auth.uid());
  ELSIF (TG_OP = 'DELETE') THEN
    old_data := to_jsonb(OLD);
    INSERT INTO audit_logs (table_name, record_id, action, old_data, performed_by)
    VALUES (TG_TABLE_NAME, OLD.id, TG_OP, old_data, auth.uid());
  END IF;
  
  RETURN NULL; -- Result is ignored for AFTER triggers
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach audit triggers to all core tables
CREATE TRIGGER audit_profiles_trigger
  AFTER INSERT OR UPDATE OR DELETE ON profiles
  FOR EACH ROW EXECUTE FUNCTION log_audit();

CREATE TRIGGER audit_packages_trigger
  AFTER INSERT OR UPDATE OR DELETE ON packages
  FOR EACH ROW EXECUTE FUNCTION log_audit();

CREATE TRIGGER audit_inquiries_trigger
  AFTER INSERT OR UPDATE OR DELETE ON inquiries
  FOR EACH ROW EXECUTE FUNCTION log_audit();

CREATE TRIGGER audit_inquiry_replies_trigger
  AFTER INSERT OR UPDATE OR DELETE ON inquiry_replies
  FOR EACH ROW EXECUTE FUNCTION log_audit();

CREATE TRIGGER audit_bookings_trigger
  AFTER INSERT OR UPDATE OR DELETE ON bookings
  FOR EACH ROW EXECUTE FUNCTION log_audit();

CREATE TRIGGER audit_wishlists_trigger
  AFTER INSERT OR UPDATE OR DELETE ON wishlists
  FOR EACH ROW EXECUTE FUNCTION log_audit();

CREATE TRIGGER audit_reviews_trigger
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW EXECUTE FUNCTION log_audit();
