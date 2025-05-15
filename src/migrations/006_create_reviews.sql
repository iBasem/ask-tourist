-- Migration: 006_create_reviews.sql
-- Description: Create reviews table for customer ratings and feedback
-- Created: 2025-05-15

-- Create reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  images TEXT[], -- Array of image URLs
  approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  -- Ensure a user can only review a package once per booking
  CONSTRAINT unique_user_package_booking UNIQUE (user_id, package_id, booking_id)
);

-- Create indexes for faster querying
CREATE INDEX idx_reviews_package_id ON reviews(package_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_booking_id ON reviews(booking_id);
CREATE INDEX idx_reviews_approved ON reviews(approved) WHERE approved = true;
CREATE INDEX idx_reviews_rating ON reviews(rating);

-- Create trigger to update the updated_at timestamp
CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE PROCEDURE update_modified_column();

-- Create function to update package average rating
CREATE OR REPLACE FUNCTION update_package_rating()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the avg_rating and reviews_count in the packages table
  UPDATE packages
  SET 
    avg_rating = (
      SELECT ROUND(AVG(rating)::numeric, 2)
      FROM reviews
      WHERE package_id = NEW.package_id AND approved = true
    ),
    reviews_count = (
      SELECT COUNT(*)
      FROM reviews
      WHERE package_id = NEW.package_id AND approved = true
    )
  WHERE id = NEW.package_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update package ratings when reviews change
CREATE TRIGGER update_package_rating_on_insert
  AFTER INSERT ON reviews
  FOR EACH ROW
  WHEN (NEW.approved = true)
  EXECUTE PROCEDURE update_package_rating();

CREATE TRIGGER update_package_rating_on_update
  AFTER UPDATE ON reviews
  FOR EACH ROW
  WHEN (NEW.approved = true OR OLD.approved = true)
  EXECUTE PROCEDURE update_package_rating();

CREATE TRIGGER update_package_rating_on_delete
  AFTER DELETE ON reviews
  FOR EACH ROW
  WHEN (OLD.approved = true)
  EXECUTE PROCEDURE update_package_rating();
