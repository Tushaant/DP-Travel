CREATE TABLE IF NOT EXISTS dp_service_pages (
  slug TEXT PRIMARY KEY,
  draft_content JSONB NOT NULL,
  published_content JSONB,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  published_at TIMESTAMPTZ
);
