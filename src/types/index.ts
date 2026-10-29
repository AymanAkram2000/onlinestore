export type ApparelSize = 
  | 'XS' 
  | 'S' 
  | 'M' 
  | 'L' 
  | 'XL' 
  | 'XXL' 
  | 'Free Size' 
  | 'No Size'
  | '52 (طول 150-155 سم)'
  | '54 (طول 155-160 سم)'
  | '56 (طول 160-165 سم)'
  | '58 (طول 165-170 سم)'
  | '60 (طول 170-175 سم)'
  | 'مقاس 1 (يلبس حتى 70 كجم)'
  | 'مقاس 2 (يلبس حتى 90 كجم)'
  | 'مقاس 3 (يلبس حتى 110 كجم)'
  | string;

export interface Category {
  id: string;
  name: string;
  slug: string;
  image_url?: string;
  description?: string;
}

export interface Photo {
  id: string;
  url: string;
  is_cover: boolean;
  sort_order: number;
}

export interface SizeVariant {
  id: string;
  size_name: ApparelSize;
  is_available: boolean;
  stock_quantity?: number;
}

export interface ColorVariant {
  id: string;
  product_id?: string;
  color_name: string;
  hex_code: string;
  is_active: boolean; // Active or Faded/Disabled across entire store
  photos: Photo[];
  sizes: SizeVariant[];
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  category_id: string;
  category_name?: string;
  base_price: number;
  compare_at_price?: number;
  badge?: 'وصل حديثاً' | 'الأكثر مبيعاً' | 'خصم مميز' | 'طقم متكامل' | string;
  colors: ColorVariant[];
  created_at: string;
}

export interface CartItem {
  id: string;
  product_id: string;
  product_title: string;
  product_slug: string;
  color_id: string;
  color_name: string;
  color_hex: string;
  size_id: string;
  size_name: string;
  unit_price: number;
  quantity: number;
  image_url: string;
}

export interface ShippingZone {
  id: string;
  governorate: string;
  fee: number;
  estimated_delivery: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'cod' | 'instapay' | 'vodafone_cash';

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  governorate: string;
  shipping_address: string;
  notes?: string;
  items: CartItem[];
  subtotal: number;
  shipping_fee: number;
  total_amount: number;
  payment_method: PaymentMethod;
  status: OrderStatus;
  created_at: string;
}
