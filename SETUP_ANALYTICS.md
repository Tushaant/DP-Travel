# DP Travel custom admin portal setup

The admin interface, authentication endpoints and analytics APIs are custom DP Travel code. PostgreSQL is the persistence layer; Supabase is not used.

## 1. Provision PostgreSQL through Vercel
1. Open the DP Travel project in Vercel.
2. Open Storage / Marketplace and select Neon Postgres.
3. Create a new Neon database and connect it to this Vercel project.
4. Ensure the integration adds `DATABASE_URL` to Production and Preview.
5. Keep the connection string server-side; never expose it in browser code or commit it.

Vercel's old first-party Vercel Postgres product has been retired. Use a Postgres provider integration from the Vercel Marketplace; Neon is the recommended option for this project.

## 2. Create the tables
1. Open the Neon SQL Editor.
2. Run the complete contents of `database/schema.sql`.
3. Redeploy after confirming `DATABASE_URL` is available.

## 3. Configure admin credentials in Vercel
Add these variables for Production and Preview:
- `ADMIN_PASSWORD`: a unique, strong admin password.
- `ADMIN_SESSION_SECRET`: a cryptographically random secret with at least 32 bytes.
- `DATABASE_URL`: supplied by the Neon integration.

Generate the secret locally with `openssl rand -base64 48`. Do not share it in chat or commit it. Redeploy after changing environment variables.

## 4. Admin portal
- `/admin/index.html`: page views, unique visitors, sessions, query categories, top pages and daily trend.
- `/admin/conversations.html`: recent chatbot messages with timestamps, session IDs and page path.

Both pages use the custom password login and an HTTP-only, Secure, SameSite=Strict signed session cookie. The API validates its signature and expiry on every admin data request.

## 5. Data and privacy
The analytics store anonymous visitor/session IDs, page path, referrer text and device class. It does not intentionally collect IP addresses or request passport/identity numbers. Chat messages are stored to support the conversation history screen. Publish a privacy notice, choose a retention period and periodically delete records no longer needed.

## 6. Current scope and hardening
The chatbot is rule-based FAQ guidance, not a generative AI assistant. The admin portal currently provides overview analytics and conversation history. Before a high-traffic production launch, add durable login rate-limiting, admin account management/MFA, configurable retention jobs, audit logging and role-based permissions.
