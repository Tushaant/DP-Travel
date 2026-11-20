CREATE TABLE IF NOT EXISTS dp_enquiries (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  visitor_id TEXT NOT NULL DEFAULT '',
  name TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL,
  destination TEXT NOT NULL DEFAULT '',
  service TEXT NOT NULL DEFAULT '',
  source TEXT NOT NULL DEFAULT 'website',
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS dp_enquiries_created_idx ON dp_enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS dp_enquiries_phone_idx ON dp_enquiries(phone);