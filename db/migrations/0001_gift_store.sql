-- Initial schema. This migration intentionally contains structure only: no seed
-- inventory, personal stories, or customer data is inserted during deployment.
PRAGMA foreign_keys = ON;

CREATE TABLE inventory_records (
  id TEXT PRIMARY KEY,
  artist TEXT NOT NULL,
  title TEXT NOT NULL,
  release_year INTEGER,
  genres_json TEXT NOT NULL DEFAULT '[]',
  verified_tracks_json TEXT NOT NULL DEFAULT '[]',
  condition TEXT NOT NULL CHECK (condition IN ('mint', 'very-good-plus', 'very-good', 'good')),
  acquisition_cost_cents INTEGER NOT NULL CHECK (acquisition_cost_cents >= 0),
  reference_price_cents INTEGER NOT NULL CHECK (reference_price_cents >= 0),
  available INTEGER NOT NULL DEFAULT 0 CHECK (available IN (0, 1)),
  reserved_until TEXT,
  verified_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX inventory_available_idx ON inventory_records (available, reserved_until);

CREATE TABLE gift_drafts (
  id TEXT PRIMARY KEY,
  consent_to_store INTEGER NOT NULL DEFAULT 0 CHECK (consent_to_store IN (0, 1)),
  relationship TEXT,
  message TEXT,
  story TEXT,
  music_preferences TEXT,
  dislikes TEXT,
  pack_id TEXT,
  dedication TEXT,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX gift_drafts_expiry_idx ON gift_drafts (expires_at);

CREATE TABLE selection_proposals (
  id TEXT PRIMARY KEY,
  gift_draft_id TEXT NOT NULL REFERENCES gift_drafts(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('needs-manual-review', 'ready-for-review', 'approved', 'rejected')),
  items_json TEXT NOT NULL DEFAULT '[]',
  review_notes_json TEXT NOT NULL DEFAULT '[]',
  reviewed_at TEXT,
  reviewed_by TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX selection_proposals_status_idx ON selection_proposals (status, created_at);
