-- Clear previous demo data
DELETE FROM public.size_variants;
DELETE FROM public.color_photos;
DELETE FROM public.color_variants;
DELETE FROM public.products;
DELETE FROM public.categories;

-- Seed Modest Fashion Categories
INSERT INTO public.categories (id, name, slug, image_url, description)
VALUES 
  ('abayas-dresses', 'عبايات ودريسات محجبات', 'abayas-dresses', 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80', 'عبايات خليجية ملكي ودريسات كلوش قطن وكتان بقصات سابغة ومحتشمة'),
  ('niqab-khimar', 'نقابات وخمارات إسلامية', 'niqab-khimar', 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80', 'خمارات ماليزية وسعودية ونقابات تاندة ومقواة بأقمشة كريب مريحة وساترة'),
  ('tarha-scarves', 'طرح وشالات فاخرة', 'tarha-scarves', 'https://images.unsplash.com/photo-1617922001439-4a2e6562f328?auto=format&fit=crop&w=600&q=80', 'طرح شيفون كريب ليزر، قطن كويتي بيور، وشالات كشمير شتوية ناعمة'),
  ('accessories', 'إكسسوارات الحجاب وبندانات', 'accessories', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80', 'دبابيس مغناطيسية ضد التلف، بندانات قطن سوري، معاصم وجوانتيات شرعية')
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

-- Seed Modest Products
INSERT INTO public.products (id, title, slug, description, category_id, category_name, base_price, compare_at_price, badge)
VALUES
  ('prod-abaya-1', 'عباية إسلامية خليجية كريب ملكي سعودي - Royal Modest Abaya', 'royal-modest-abaya', 'عباية خليجية أنيقة مصنوعة من قماش الكريب الملكي المستورد فاحم السواد، واسعة وسابغة لا تشف ولا تصف. تمتاز بقصة مريحة وأكمام كلاسيكية مع لمسات راقية تناسب كافة المناسبات والزيارات اليومية.', 'abayas-dresses', 'عبايات ودريسات محجبات', 790, 950, 'الأكثر مبيعاً'),
  ('prod-dress-2', 'دريس كلوش محتشم كتان تركي - Elegant Modest Linen Maxi Dress', 'elegant-modest-linen-maxi-dress', 'دريس خروج راقٍ للمحجبات بقصة كلوش ملكية واسعة لا تصف تفاصيل الجسم. مصمم من أجود خيوط الكتان التركي المعالج ضد الانكماش مع بطانة ناعمة تضمن حشمة كاملة وراحة استثنائية.', 'abayas-dresses', 'عبايات ودريسات محجبات', 680, 820, 'وصل حديثاً'),
  ('prod-khimar-3', 'خمار ماليزي كريب إيروباك مع نقاب تاندة - Malaysian Khimar & Niqab Set', 'malaysian-khimar-niqab-set', 'طقم إسلامي متكامل يجمع بين خمار ماليزي طويل ساتر من الأمام والخلف بقصة مثلثة أنيقة، ونقاب تاندة مقوى من قماش الكريب الكوري سوبر بلاك مع شريط مطاطي مريح للغاية.', 'niqab-khimar', 'نقابات وخمارات إسلامية', 420, 520, 'طقم متكامل'),
  ('prod-tarha-4', 'طرحة شيفون بيور أوريجينال مع بندانة متصلة - 2-in-1 Chiffon Hijab', '2-in-1-chiffon-hijab', 'الطرحة الأكثر راحة وعملية للمحجبات والجامعة والعمل، تجمع بين بندانة قطن بيور مريحة مع طرحة شيفون كريب تركي منسدلة ثابتة طوال اليوم بدون انزلاق أو الحاجة لدبابيس كثيرة.', 'tarha-scarves', 'طرح وشالات فاخرة', 180, 240, 'الأكثر طلباً'),
  ('prod-pins-5', 'طقم دبابيس حجاب مغناطيسية فاخرة (4 أزواج) - Magnetic Hijab Pins', 'magnetic-hijab-pins', 'بديل الدبابيس التقليدية لحماية الطرح الحرير والشيفون من النتش والتلف. مغناطيس فائق القوة يثبت الحجاب والنقاب بثبات تام طوال اليوم دون ترك أي ثقوب أو علامات في الأقمشة.', 'accessories', 'إكسسوارات الحجاب وبندانات', 140, 190, 'إكسسوار مميز')
ON CONFLICT (id) DO NOTHING;

-- Seed Color Variants for Abaya 1
INSERT INTO public.color_variants (id, product_id, color_name, hex_code, is_active)
VALUES
  ('col-ab-black', 'prod-abaya-1', 'أسود ملكي فاحم', '#111111', true),
  ('col-ab-navy', 'prod-abaya-1', 'كحلي ليلي وقور', '#172554', true),
  ('col-ab-grey', 'prod-abaya-1', 'رمادي دخاني', '#4b5563', false)
ON CONFLICT (id) DO NOTHING;

-- Seed Photos for Abaya 1 Colors
INSERT INTO public.color_photos (id, color_variant_id, url, is_cover, sort_order)
VALUES
  ('ph-ab-1', 'col-ab-black', 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80', true, 1),
  ('ph-ab-2', 'col-ab-black', 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80', false, 2),
  ('ph-ab-3', 'col-ab-navy', 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80', true, 1),
  ('ph-ab-4', 'col-ab-grey', 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80', true, 1)
ON CONFLICT (id) DO NOTHING;

-- Seed Sizes for Abaya 1 Colors
INSERT INTO public.size_variants (id, color_variant_id, size_name, is_available)
VALUES
  ('sz-52', 'col-ab-black', '52 (طول 150-155 سم)', true),
  ('sz-54', 'col-ab-black', '54 (طول 155-160 سم)', true),
  ('sz-56', 'col-ab-black', '56 (طول 160-165 سم)', true),
  ('sz-58', 'col-ab-black', '58 (طول 165-170 سم)', true),
  ('sz-60', 'col-ab-black', '60 (طول 170-175 سم)', true),
  ('sz-54-n', 'col-ab-navy', '54 (طول 155-160 سم)', true),
  ('sz-56-n', 'col-ab-navy', '56 (طول 160-165 سم)', true),
  ('sz-58-n', 'col-ab-navy', '58 (طول 165-170 سم)', false),
  ('sz-56-g', 'col-ab-grey', '56 (طول 160-165 سم)', false)
ON CONFLICT (id) DO NOTHING;
