# Phase 4 — Commerce Core

## Delivered
- Authenticated cart API: add, update, remove, read.
- Checkout transaction creates an order, snapshots order-item pricing, decrements inventory atomically, creates a stock movement, and clears the cart.
- Customer order listing/detail APIs.
- Payment abstraction with provider name, transaction id, status and signed webhook support via `PAYMENT_WEBHOOK_SECRET`.
- Failed payment restores purchased inventory and records a RETURN movement.
- Admin order status mutation.
- Customer cart, checkout and order pages in Next.js.

## Important production notes
The checkout currently treats stock as allocated immediately and relies on payment failure handling to return stock. For a real gateway, add a payment expiry/reconciliation job before launch. Replace the generic provider adapter with the selected Bangladesh gateway's exact request/signature protocol. Never trust client-side price or shipping values in production; calculate shipping server-side from zones/rules.
