-- Migration: 002_create_packages.sql
-- Description: Create packages table for tourism offers
-- Created: 2025-05-15

-- Create packages table
CREATE TABLE packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vendor_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  destination TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
  duration_days INTEGER NOT NULL CHECK (duration_days > 0),
  max_travelers INTEGER NOT NULL CHECK (max_travelers > 0),
  start_month INTEGER[], -- Array of months (1-12) when package is available
  images TEXT[], -- Array of image URLs
  tags TEXT[], -- Array of tags for categorization
  is_active BOOLEAN NOT NULL DEFAULT true,
  featured BOOLEAN NOT NULL DEFAULT false,
  avg_rating DECIMAL(3, 2) DEFAULT NULL,
  reviews_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create index for vendor_id for faster queries
CREATE INDEX idx_packages_vendor_id ON packages(vendor_id);

-- Create index for destination for faster searches
CREATE INDEX idx_packages_destination ON packages USING GIN (to_tsvector('english', destination));

-- Create index for is_active to quickly filter active packages
CREATE INDEX idx_packages_is_active ON packages(is_active) WHERE is_active = true;

-- Create index for price range queries
CREATE INDEX idx_packages_price ON packages(price);

-- Create trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_packages_updated_at
  BEFORE UPDATE ON packages
  FOR EACH ROW
  EXECUTE PROCEDURE update_modified_column();
