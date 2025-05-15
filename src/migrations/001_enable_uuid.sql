-- Migration: 001_enable_uuid.sql
-- Description: Enable UUID extension for generating UUIDs
-- Created: 2025-05-15

-- Enable the uuid-ossp extension if it doesn't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
