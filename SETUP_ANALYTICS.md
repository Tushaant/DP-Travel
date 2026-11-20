# DP Travel chatbot and analytics setup

This branch adds a lightweight FAQ-based support assistant and a private two-page analytics console. The assistant is rule-based at this stage; it does not call a generative AI model.

## 1. Create the database

1. Create a Supabase project.
2. Open SQL Editor.
3. Run the contents of `supabase/schema.sql`.

The tables store anonymous visitor/session IDs, page path, referrer hostname, device class, and chat messages. This implementation does not collect IP addresses or ask visitors for identity-document numbers.

## 2. Configure Vercel environment variables

In the DP Travel Vercel project, add these variables for Production and Preview:

- `SUPABASE_URL`: Supabase project URL.
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service-role key. Keep this server-side; never put it in browser code.
- `ADMIN_PASSWORD`: A strong unique password for the admin console.
- `ADMIN_SESSION_SECRET`: A random secret of at least 32 bytes.

Redeploy after adding variables.

## 3. Admin pages

- `/admin/index.html`: page views, unique visitors, sessions, query categories, top pages and daily trend.
- `/admin/conversations.html`: recent user and assistant messages with timestamps, session IDs and page path.

Both pages require the admin password. The signed session cookie is HTTP-only and expires after eight hours.

## 4. Current chatbot scope

The floating assistant answers common questions about attestation, verification, document tracking, travel and contact details. Unknown questions are directed to the team. Connect an approved LLM provider separately if free-form AI responses are required.

## 5. Before launch

- Test the chatbot and admin login on the Vercel Preview URL.
- Confirm Supabase tables are receiving records.
- Keep the service-role key and admin secrets private.
- Publish a privacy notice explaining anonymous analytics and chat-message retention.
- Decide an appropriate retention period and delete old conversation data periodically.

Analytics will remain empty until the Supabase schema and Vercel environment variables are configured.
