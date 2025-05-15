-- Migration: 005_create_wishlists.sql
-- Description: Create wishlists table for users to save favorite packages
-- Created: 2025-05-15

-- Create wishlists table
CREATE TABLE wishlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  -- Ensure a user can wishlist a package only once
  CONSTRAINT unique_user_package UNIQUE (user_id, package_id)
);

-- Create indexes for faster querying
CREATE INDEX idx_wishlists_user_id ON wishlists(user_id);
CREATE INDEX idx_wishlists_package_id ON wishlists(package_id);
