# KPM Rental Manager — Fresh Project

This folder is a clean new KPM project. It does **not** use the previous Supabase database or credentials.

## Files

- `index.html` — application shell
- `css/app.css` — mobile-first UI, enlarged for easier reading/touch use
- `js/config.js` — paste only your new Supabase Project URL and public Publishable/Anon key
- `js/app.js` — KPM application logic
- `supabase/01_schema.sql` — complete fresh database, RLS, storage, and RPC setup
- `supabase/functions/create-user/index.ts` — secure Admin-only user-creation Edge Function

## Setup order

1. Create a **new Supabase project**.
2. Open **SQL Editor**, paste the complete contents of `supabase/01_schema.sql`, and Run it once.
3. In Supabase **Authentication → Users**, create your first login user (email/password).
4. Copy that user's UUID. In SQL Editor run:

   ```sql
   update public.profiles
   set role='admin', active=true, full_name='KPM Admin'
   where id='PASTE-FIRST-AUTH-USER-UUID';
   ```

5. In the new Supabase project, copy:
   - Project URL
   - Publishable key (or legacy public anon key)
6. Open `js/config.js` and replace the two placeholders. **Never paste the service_role key in frontend files.**
7. Deploy the Edge Function `create-user` from `supabase/functions/create-user/index.ts`. The function uses Supabase server secrets, including the service-role key, only inside Supabase's server environment.
8. Upload this project folder to GitHub Pages (or run it locally through a normal HTTP server). Then sign in using the Admin account.

## Core rules implemented

- Bill numbers are generated inside PostgreSQL to avoid duplicates across devices.
- Stock is rechecked inside the `create_rental` transaction, not trusted from the browser.
- Partial returns are supported and recorded as separate return transactions.
- Rental status and payment status are independent.
- Multiple payments are supported and over-payment is blocked server-side.
- Item history is preserved by deactivation instead of deletion.
- RLS blocks unauthenticated access.
- Admin/Staff profile model is included.
- Item images use Supabase Storage (`item-photos`).
- KPM remains `KPM` in both English and Tamil UI modes.

## Important

The web application needs internet access to Supabase for live business data. The UI can detect loss of connectivity, but creating rentals/returns/payments while fully offline is intentionally blocked rather than risking conflicting stock.
