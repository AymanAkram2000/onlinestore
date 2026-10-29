# Apparel Store (Fashion E-Commerce Platform)

The core domain for the apparel and fashion online store, managing clothing catalogs, color-specific photo galleries, clothing sizes, stock availability states, guest checkout with WhatsApp confirmation, and store owner administrative controls.

## Language

**Product**:
A distinct clothing merchandise item (e.g., T-Shirt, Hoodie, Pants, Dress) containing base details such as title, description, category, and base price.
_Avoid_: Item, goods, listing

**Color Variant**:
A specific color version of a clothing Product, owning its dedicated gallery of model/garment photos, a hex color code, and an independent availability switch (Active/Inactive).
_Avoid_: Shade, color option, picture group

**Size Option**:
A clothing size specification attached to a garment (e.g., standard sizes XS, S, M, L, XL, XXL, Oversize, or Free Size, with optional 'No Size' for accessories).
_Avoid_: Dimension, weight, volume, measurement, cut

**Shipping Zone**:
A geographic area (governorate/city) paired with a defined delivery fee and estimated transit timeframe.
_Avoid_: Shipping region, district, postal code tier

**Category**:
A classification tier used to group related products for navigation and filtering.
_Avoid_: Department, section, collection tag

**Cart**:
A temporary holding container of chosen product variants and quantities assembled by the customer before checkout.
_Avoid_: Basket, shopping bag

**Order**:
A finalized purchase agreement containing customer contact/shipping information, itemized variant selections, total price, and fulfillment status.
_Avoid_: Transaction, deal, checkout invoice

**Customer**:
An individual purchasing items from the store, either via streamlined guest checkout or an authenticated profile.
_Avoid_: Buyer, visitor, client, account

**Marketing Badge**:
A visual flag on a product card highlighting special merchandising status (e.g., 'New', 'Best Seller', 'Sale %').
_Avoid_: Ribbon, sticker, label tag

**Size Guide**:
A measurement reference chart (chest, waist, length in cm) providing garment fit specifications to assist customers.
_Avoid_: Size chart table, fit manual

**Store Owner**:
The authenticated business administrator responsible for managing the product catalog, updating color availability, and overseeing orders.
_Avoid_: Admin, moderator, supervisor
