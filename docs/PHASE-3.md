# Dr Natures Phase 3 — Auth, RBAC & Admin Foundation

## Included
- Cookie-based database sessions with SHA-256 token storage
- Argon2 password hashing
- Registration, login, logout, current-user endpoint
- AuthGuard + role-based authorization
- ADMIN / EDITOR protected admin area
- Admin dashboard statistics
- Product create/update/read APIs
- Transactional inventory adjustment + stock movement record
- Admin order and booking read APIs
- Global DTO validation with whitelist + forbidden-property rejection
- Authenticated booking creation (no client-supplied userId)
- Corrected Prisma inverse relations and added Session/AuditLog foundations
- Minimal Next.js login + admin dashboard UI

## API
Base URL: `/api/v1`

Auth:
- POST `/auth/register`
- POST `/auth/login`
- POST `/auth/logout`
- GET `/auth/me`

Admin:
- GET `/admin/dashboard`
- GET `/admin/products`
- POST `/admin/products` (ADMIN)
- PATCH `/admin/products/:id` (ADMIN)
- POST `/admin/products/:id/inventory` (ADMIN)
- GET `/admin/orders`
- GET `/admin/bookings`

## Local setup
1. Create PostgreSQL database.
2. Copy `.env.example` to `.env`.
3. Install dependencies in `apps/api` and `apps/web`.
4. Run `npx prisma generate --schema packages/database/schema.prisma`.
5. Run `npx prisma migrate dev --schema packages/database/schema.prisma --name phase3-auth-rbac`.
6. Start API on port 4000 and web on port 3000.

## Production hardening still required
- Email verification / password reset
- CSRF strategy if deployment topology requires it
- Rate limiting / login throttling
- Audit log writes on admin mutations
- Payment provider + webhook verification
- Transaction-safe order checkout/reservation
- Full admin CRUD for categories, services, consultants, content and users
- Object storage uploads
- Tests, observability, backups and deployment configuration
