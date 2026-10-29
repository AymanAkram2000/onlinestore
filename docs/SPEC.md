# Apparel Online Store Specification

## 1. Overview
A modern, luxury-styled e-commerce web application tailored for apparel and fashion brands. The store enables customers to browse clothing collections, interactively preview color variants directly on product cards, select sizes with out-of-stock indications, view interactive size guides, and complete frictionless guest orders with instant WhatsApp confirmation.

The store owner has access to a streamlined, Arabic-first administration dashboard to manage products, categories, multi-photo color galleries, color/size inventory availability switches, and customer orders.

## 2. Technical Stack
- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, Mobile-first responsive RTL support, Lucide Icons
- **State Management & Persistence**: LocalStorage for Cart + Supabase (PostgreSQL & Storage) with built-in resilient offline/demo seed fallback
- **Testing**: Vitest / Node test runner for seam validation

## 3. Domain Model & Seams
1. **Catalog Seam**:
   - `getProducts({ category, search, sort })`
   - `getProductBySlug(slug)`
   - `getCategories()`
2. **Variant & Inventory Seam**:
   - `toggleColorAvailability(colorId, isActive)`
   - `toggleSizeAvailability(sizeId, isAvailable)`
   - `switchActiveColor(productId, colorId)`
3. **Cart & Shipping Seam**:
   - `calculateShipping(governorate, cartSubtotal)`
   - `validateCartItems(items)`
4. **Order Seam**:
   - `createGuestOrder(orderPayload)`
   - `updateOrderStatus(orderId, newStatus)`
   - `buildWhatsAppOrderMessage(order)`

## 4. User Journeys
1. **Shopper**:
   - Visits `/` or `/catalog`.
   - Sees clothing cards with interactive color swatches. Clicking/hovering on a swatch immediately swaps the garment image.
   - Enters product page `/product/[slug]`. Swapping colors updates the gallery. Inactive colors display dimmed/faded (`opacity-40 pointer-events-none`) with "غير متوفر".
   - Selects available size or opens the "جدول المقاسات 📏" modal.
   - Clicks "إضافة إلى السلة" -> toast appears and shopper is smoothly redirected to `/catalog` to continue shopping.
   - Clicks floating cart to checkout at `/checkout`.
   - Enters Name, Phone, Governorate (calculates shipping), Address, Notes.
   - Chooses Payment (COD / InstaPay / Vodafone Cash).
   - Order confirmation displays with prominent green "تأكيد عبر واتساب" button.

2. **Store Owner**:
   - Accesses `/admin`.
   - Adds/Edits products with categories, descriptions, and base prices.
   - Adds colors with hex codes and uploads/manages multi-photo galleries, setting cover photos.
   - Uses 1-click toggle switches to activate/deactivate colors and sizes.
   - Tracks orders with real-time status transitions and 1-click WhatsApp customer contact.
