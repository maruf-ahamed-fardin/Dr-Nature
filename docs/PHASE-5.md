# Phase 5 — Payments, Delivery & Operations

## Included
- SSLCOMMERZ hosted checkout integration using the V4 API.
- Server-side SSLCOMMERZ order validation before marking an order paid.
- IPN endpoint for backend payment notifications.
- Failed/cancelled payment stock restoration in a transaction.
- Delivery zones with fee and ETA.
- Server-side shipping fee calculation; checkout no longer accepts a client-supplied shipping amount.
- Customer address CRUD.
- Shipment records with courier, tracking number and delivery status.
- Admin product/category/shipping-zone/order/booking operational screens.
- Admin API for shipment status updates.
- Seed data for an admin account, categories and Bangladesh delivery zones.

## SSLCOMMERZ flow
1. Customer creates an order.
2. Backend creates a pending payment transaction.
3. Backend requests a hosted payment session from SSLCOMMERZ.
4. Customer is redirected to SSLCOMMERZ.
5. Success/IPN callbacks are validated server-to-server using the SSLCOMMERZ Order Validation API.
6. The backend checks transaction ID and amount against its own payment record.
7. Only then is the order marked paid/confirmed.

SSLCOMMERZ documentation requires server-side API communication and transaction validation. Configure the IPN URL in the merchant panel after deployment.

## Environment
Copy `.env.example` and set:
- `DATABASE_URL`
- `WEB_URL`
- `PUBLIC_API_URL`
- `SSLCOMMERZ_SANDBOX=true|false`
- `SSLCOMMERZ_STORE_ID`
- `SSLCOMMERZ_STORE_PASSWORD`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

## Seed
From `apps/api`:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

Change the seeded admin password before using the application in production.

## Delivery model
`ShippingZone` is intentionally simple for Phase 5: city/area → fee → ETA range. This can later be replaced by courier-specific rate APIs without changing the order model.

## Production checklist
- Use HTTPS/TLS.
- Configure SSLCOMMERZ live credentials only on the server.
- Register the deployed IPN URL in SSLCOMMERZ.
- Keep payment validation server-side.
- Add webhook/IPN request logging and alerting.
- Add a courier integration in a later phase if automatic labels/tracking are required.
