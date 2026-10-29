# 0003 Frictionless Guest Checkout with WhatsApp Confirmation

## Context
High checkout friction (mandatory registration, email verification, passwords) in regional fashion e-commerce causes high cart abandonment rates. Most regional apparel orders operate on Cash on Delivery (COD) and mobile wallets (InstaPay / Vodafone Cash), requiring immediate contact validation rather than password authentication.

## Decision
We implemented a frictionless Guest Checkout requiring only recipient name, phone number, governorate, shipping address, and optional notes. Upon placing an order:
1. The order record is persisted immediately to Supabase with status `pending`.
2. The customer is redirected to an order summary screen with a prominent "Confirm via WhatsApp" button pre-filled with the order number and items.
3. The store owner dashboard updates in real-time, allowing one-click customer communication via WhatsApp and printable shipping bills.
4. Optional account creation is offered post-checkout rather than blocking the purchase.

## Consequences
- Maximizes order conversion rates by eliminating registration hurdles.
- Directly connects customer with the store owner for phone/WhatsApp address verification before dispatching shipping couriers.
