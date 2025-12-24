-- Migration to add event_type column to posts table
-- Run this in your PostgreSQL database

ALTER TABLE posts ADD COLUMN IF NOT EXISTS event_type TEXT;

-- Add comment to document the column
COMMENT ON COLUMN posts.event_type IS 'Type of event: work, travel, sports, relationship, health, academy, feeling, custom';

