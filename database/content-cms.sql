-- DP Travel custom homepage CMS
CREATE TABLE IF NOT EXISTS dp_site_content (
  content_key TEXT PRIMARY KEY,
  content JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
