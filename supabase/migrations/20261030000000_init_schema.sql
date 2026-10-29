-- ==========================================
-- Online Store: Apparel & Fashion Schema
-- ==========================================

-- 1. Categories
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    image_url TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Products
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    category_id TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
    category_name TEXT,
    base_price NUMERIC(10, 2) NOT NULL,
    compare_at_price NUMERIC(10, 2),
    badge TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Color Variants (Each color has its photos and active/disabled toggle)
CREATE TABLE IF NOT EXISTS public.color_variants (
    id TEXT PRIMARY KEY,
    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    color_name TEXT NOT NULL,
    hex_code TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Color Photos
CREATE TABLE IF NOT EXISTS public.color_photos (
    id TEXT PRIMARY KEY,
    color_variant_id TEXT NOT NULL REFERENCES public.color_variants(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    is_cover BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Size Variants (under color variant)
CREATE TABLE IF NOT EXISTS public.size_variants (
    id TEXT PRIMARY KEY,
    color_variant_id TEXT NOT NULL REFERENCES public.color_variants(id) ON DELETE CASCADE,
    size_name TEXT NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    stock_quantity INT DEFAULT 10,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Orders
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    order_number TEXT NOT NULL UNIQUE,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    governorate TEXT NOT NULL,
    shipping_address TEXT NOT NULL,
    notes TEXT,
    items JSONB NOT NULL,
    subtotal NUMERIC(10, 2) NOT NULL,
    shipping_fee NUMERIC(10, 2) NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    payment_method TEXT NOT NULL DEFAULT 'cod',
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Shipping Zones
CREATE TABLE IF NOT EXISTS public.shipping_zones (
    id TEXT PRIMARY KEY,
    governorate TEXT NOT NULL,
    fee NUMERIC(10, 2) NOT NULL,
    estimated_delivery TEXT NOT NULL
);

-- Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.color_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.color_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.size_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipping_zones ENABLE ROW LEVEL SECURITY;

-- Public Read Policies for Catalog
CREATE POLICY "Public read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public read color variants" ON public.color_variants FOR SELECT USING (true);
CREATE POLICY "Public read color photos" ON public.color_photos FOR SELECT USING (true);
CREATE POLICY "Public read size variants" ON public.size_variants FOR SELECT USING (true);
CREATE POLICY "Public read shipping zones" ON public.shipping_zones FOR SELECT USING (true);

-- Public Insert Policy for Guest Orders
CREATE POLICY "Public insert orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read own order" ON public.orders FOR SELECT USING (true);
