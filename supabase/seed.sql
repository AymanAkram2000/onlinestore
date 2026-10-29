-- Seed Categories
INSERT INTO public.categories (id, name, slug, image_url, description)
VALUES 
  ('hoodies', 'هوديز وسويت شيرت', 'hoodies', 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80', 'تشكيلة الهوديز الفاخرة بقصات أوفرسايز وخامات شتوية ممتازة'),
  ('t-shirts', 'تيشيرتات صيفية', 't-shirts', 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80', 'تيشيرتات قطن مصري 100% بأوزان ثقيلة وملمس فائق النعومة'),
  ('shirts', 'قمصان كلاسيك وكاجوال', 'shirts', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80', 'قمصان كتان وخامات مريحة تناسب الإطلالات اليومية والرسمية'),
  ('pants', 'بناطيل وكارجو', 'pants', 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80', 'بناطيل كارجو وعصرية مصممة لأقصى درجات الراحة والأناقة')
ON CONFLICT (id) DO NOTHING;

-- Seed Shipping Zones
INSERT INTO public.shipping_zones (id, governorate, fee, estimated_delivery)
VALUES
  ('cairo', 'القاهرة', 45, '1 - 2 يوم عمل'),
  ('giza', 'الجيزة', 45, '1 - 2 يوم عمل'),
  ('alex', 'الإسكندرية', 55, '2 - 3 أيام عمل'),
  ('delta', 'الدلتا والقناة (المنصورة، طنطا، الإسماعيلية...)', 65, '2 - 3 أيام عمل'),
  ('upper', 'الصعيد (بني سويف، أسيوط، سوهاج...)', 75, '3 - 4 أيام عمل'),
  ('redsea', 'البحر الأحمر وجنوب سيناء', 90, '3 - 5 أيام عمل')
ON CONFLICT (id) DO NOTHING;

-- Seed Products
INSERT INTO public.products (id, title, slug, description, category_id, category_name, base_price, compare_at_price, badge)
VALUES
  ('prod-1', 'هودي أوفرسايز فخم - Minimal Heavyweight Hoodie', 'minimal-heavyweight-hoodie', 'هودي مصنع من أجود خيوط القطن الممشط المبطن بالصوف الناعم بوزن 420 GSM. قصة عصرية فضفاضة تعطي مظهراً راقياً ومريحاً ومقاوماً للغسيل المتكرر.', 'hoodies', 'هوديز وسويت شيرت', 690, 850, 'الأكثر مبيعاً'),
  ('prod-2', 'تيشيرت بيسك قطن مصري 240 GSM - Premium Heavyweight Tee', 'premium-heavyweight-tee', 'قطعة أساسية لا غنى عنها في خزانة ملابسك، مصنوعة من قطن مصري أصيل طويل التيلة بنسبة 100%. ياقة متينة وياقة مزدوجة الخياطة تحافظ على مظهرها بعد كل غسلة.', 't-shirts', 'تيشيرتات صيفية', 390, 480, 'وصل حديثاً'),
  ('prod-3', 'قميص كتان طبيعي راقي - Relaxed French Linen Shirt', 'relaxed-french-linen-shirt', 'قميص مصمم من الكتان الطبيعي الفاخر المنعش خفيف الوزن. مريح جداً في الأيام الحارة ويمتاز بياقة أنيقة وأزرار صدفية متقنة الصنع.', 'shirts', 'قمصان كلاسيك وكاجوال', 590, 750, 'خصم مميز'),
  ('prod-4', 'بنطلون كارجو ستريت وير - Tactical Relaxed Cargo Pants', 'tactical-relaxed-cargo-pants', 'بنطلون كارجو عصري بجيوب جانبية ذكية ونسيج قطني مرن ضد الانكماش. مصمم بحزام خصر مرن وأربطة سفلية للتحكم في وسع الأرجل.', 'pants', 'بناطيل وكارجو', 650, 800, 'الأكثر مبيعاً')
ON CONFLICT (id) DO NOTHING;

-- Seed Color Variants for Product 1
INSERT INTO public.color_variants (id, product_id, color_name, hex_code, is_active)
VALUES
  ('col-1-black', 'prod-1', 'أسود فاحم', '#18181b', true),
  ('col-1-sand', 'prod-1', 'بيج رملي', '#d4c5b3', true),
  ('col-1-navy', 'prod-1', 'أزرق كحلي', '#1e3a8a', false)
ON CONFLICT (id) DO NOTHING;

-- Seed Photos for Product 1 Colors
INSERT INTO public.color_photos (id, color_variant_id, url, is_cover, sort_order)
VALUES
  ('ph-1-1', 'col-1-black', 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80', true, 1),
  ('ph-1-2', 'col-1-black', 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80', false, 2),
  ('ph-1-3', 'col-1-black', 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80', false, 3),
  ('ph-2-1', 'col-1-sand', 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80', true, 1),
  ('ph-2-2', 'col-1-sand', 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80', false, 2),
  ('ph-3-1', 'col-1-navy', 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80', true, 1)
ON CONFLICT (id) DO NOTHING;

-- Seed Sizes for Product 1 Colors
INSERT INTO public.size_variants (id, color_variant_id, size_name, is_available)
VALUES
  ('sz-1-s', 'col-1-black', 'S', true),
  ('sz-1-m', 'col-1-black', 'M', true),
  ('sz-1-l', 'col-1-black', 'L', true),
  ('sz-1-xl', 'col-1-black', 'XL', true),
  ('sz-1-os', 'col-1-black', 'Oversize', true),
  ('sz-2-s', 'col-1-sand', 'S', true),
  ('sz-2-m', 'col-1-sand', 'M', true),
  ('sz-2-l', 'col-1-sand', 'L', false),
  ('sz-2-xl', 'col-1-sand', 'XL', true),
  ('sz-3-m', 'col-1-navy', 'M', false),
  ('sz-3-l', 'col-1-navy', 'L', false)
ON CONFLICT (id) DO NOTHING;
