# 0002 Color-Centric Product Variant and Stock Model

## Context
In apparel retail, customers evaluate clothing primarily by visual color and garment appearance before selecting a size. The client required that photos strictly belong to individual color choices, that disabling a color visually dims it (faded state) across the storefront, and that sizes within that color can also be individually toggled as out-of-stock.

## Decision
We structured the domain model as a two-tier variant hierarchy:
1. `Product` contains baseline catalog metadata (name, slug, description, category_id, base_price, badges).
2. `ProductColorVariant` owns the color name, hex code, availability status (`is_active`), and an ordered gallery of image URLs with a designated cover image.
3. `ProductSizeVariant` resides within the color variant, defining the clothing size (e.g. S, M, L, XL, Oversize) and its stock availability (`is_available`).

## Consequences
- Front-end galleries dynamically switch image streams on color selection without page reloads.
- Catalog cards can present interactive color swatch dots that swap preview images instantly.
- Disabling a color automatically renders its swatch and gallery disabled and faded across the catalog and product view without deleting assets.
- If a specific size runs out for a given color, only that size chip displays with a disabled strikethrough state.
