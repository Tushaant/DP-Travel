CREATE TABLE IF NOT EXISTS dp_page_visits(id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,visitor_id TEXT NOT NULL,session_id TEXT NOT NULL,page_path TEXT NOT NULL,referrer TEXT NOT NULL DEFAULT '',device_type TEXT NOT NULL DEFAULT 'unknown',created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
CREATE INDEX IF NOT EXISTS dp_page_visits_created_idx ON dp_page_visits(created_at DESC);
CREATE INDEX IF NOT EXISTS dp_page_visits_visitor_idx ON dp_page_visits(visitor_id);
CREATE TABLE IF NOT EXISTS dp_chat_messages(id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,visitor_id TEXT NOT NULL,session_id TEXT NOT NULL,page_path TEXT NOT NULL,role TEXT NOT NULL CHECK(role IN('user','assistant')),message TEXT NOT NULL,created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
CREATE INDEX IF NOT EXISTS dp_chat_messages_created_idx ON dp_chat_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS dp_chat_messages_session_idx ON dp_chat_messages(session_id,created_at DESC);
