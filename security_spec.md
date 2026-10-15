# SAMIYA Couture — Zero-Trust Firestore Security Specification (`security_spec.md`)

## 1. Data Invariants

1. **Default-Deny Catch-All**: All paths not explicitly matched (`/{document=**}`) deny all reads and writes.
2. **Verified Identity Mandate**: Every write operation requires `request.auth != null && request.auth.token.email_verified == true`.
3. **Bootstrapped Admin Verification**: Admin privileges (`isAdmin()`) are granted ONLY if `request.auth != null && request.auth.token.email_verified == true && (request.auth.token.email == 'shumailazaman2008@gmail.com' || exists(/databases/$(database)/documents/admins/$(request.auth.uid)))`.
4. **PII Isolation (`/users/{userId}`)**:
   - Contains PII (`email`, `phone`, `displayName`).
   - `get` and `list` are strictly restricted to `isOwner(userId) || isAdmin()`. Blanket `isSignedIn()` reads are forbidden.
   - `uid` inside the document MUST match `userId` path variable AND `request.auth.uid`.
   - `wishlistIds` is a bounded list (`size() <= 10`) and if non-empty, `wishlistIds[0] is string && wishlistIds[0].size() <= 100`.
5. **Order Integrity & Terminal State Locking (`/orders/{orderId}`)**:
   - `get` and `list` are restricted to `resource.data.ownerId == request.auth.uid || isAdmin()`.
   - On `create`: `incoming().ownerId == request.auth.uid`, `incoming().orderId == orderId`, `incoming().statusStep == 0`, and `incoming().createdAt == request.time && incoming().updatedAt == request.time`.
   - On `update`:
     - Must pass `isValidOrder(incoming())`.
     - Immutable fields (`orderId`, `ownerId`, `createdAt`, `total`, `itemsSummary`, `itemCount`) cannot be modified by non-admins.
     - Terminal state lock: Once `existing().statusStep == 5` (Delivered), no further updates are permitted unless `isAdmin()`.
     - Admin status update action: `isAdmin()` can update `['statusStep', 'updatedAt']` with `incoming().updatedAt == request.time`.
6. **Newsletter Subscription (`/subscribers/{userId}`)**:
   - Keyed by `{userId}` matching `request.auth.uid`.
   - Read restricted to `isOwner(userId) || isAdmin()`.

---

## 2. The "Dirty Dozen" Payloads (Adversarial Attack Vectors)

1. **Payload 1 (Identity Spoofing on Order Creation)**: Authenticated user `uid_attacker` creates `/orders/SAM-9001` with `ownerId: "uid_victim"`. -> `PERMISSION_DENIED`
2. **Payload 2 (Shadow Field Injection on User Profile)**: Owner updates `/users/uid_1` with `{ ..., isAdmin: true }`. -> `PERMISSION_DENIED`
3. **Payload 3 (Unverified Email Admin Spoof)**: Attacker with `email: "shumailazaman2008@gmail.com"` but `email_verified: false` attempts to list `/orders`. -> `PERMISSION_DENIED`
4. **Payload 4 (PII Blanket Read Attack)**: Signed-in user `uid_attacker` attempts `get` on `/users/uid_victim`. -> `PERMISSION_DENIED`
5. **Payload 5 (Unfiltered Query Scraping on Orders)**: Signed-in non-admin user runs `list` on `/orders` without filtering `ownerId == request.auth.uid`. -> `PERMISSION_DENIED`
6. **Payload 6 (Resource Exhaustion / ID Poisoning)**: User creates document with 250-char junk ID or 10,000-char `address` string. -> `PERMISSION_DENIED`
7. **Payload 7 (Unbounded Wishlist Array Poisoning)**: User writes 50 items into `wishlistIds` (exceeding max 10). -> `PERMISSION_DENIED`
8. **Payload 8 (Client Timestamp Forgery)**: User creates order with backdated `createdAt` instead of `request.time`. -> `PERMISSION_DENIED`
9. **Payload 9 (Immortal Field Mutation)**: User updates `/orders/SAM-1001` changing `total` from `28500` to `100` or changing `ownerId`. -> `PERMISSION_DENIED`
10. **Payload 10 (Terminal State Re-opening)**: Non-admin attempts to update an order where `existing().statusStep == 5`. -> `PERMISSION_DENIED`
11. **Payload 11 (Value Type Poisoning on Update)**: Admin updates `statusStep` to a string `"Delivered"` instead of an integer `0..5`. -> `PERMISSION_DENIED`
12. **Payload 12 (Initial State Shortcut on Order Create)**: Customer creates an order with `statusStep: 5` (already delivered) instead of `0`. -> `PERMISSION_DENIED`
