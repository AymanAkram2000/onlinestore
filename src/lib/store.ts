import { Category, Product, Order, ShippingZone, OrderStatus } from '@/types';
import { supabase } from './supabase';

export const INITIAL_SHIPPING_ZONES: ShippingZone[] = [
  { id: 'cairo', governorate: 'القاهرة', fee: 45, estimated_delivery: '1 - 2 يوم عمل' },
  { id: 'giza', governorate: 'الجيزة', fee: 45, estimated_delivery: '1 - 2 يوم عمل' },
  { id: 'alex', governorate: 'الإسكندرية', fee: 55, estimated_delivery: '2 - 3 أيام عمل' },
  { id: 'delta', governorate: 'الدلتا والقناة (المنصورة، طنطا، الإسماعيلية...)', fee: 65, estimated_delivery: '2 - 3 أيام عمل' },
  { id: 'upper', governorate: 'الصعيد (بني سويف، أسيوط، سوهاج...)', fee: 75, estimated_delivery: '3 - 4 أيام عمل' },
  { id: 'redsea', governorate: 'البحر الأحمر وجنوب سيناء', fee: 90, estimated_delivery: '3 - 5 أيام عمل' },
];

export const FREE_SHIPPING_THRESHOLD = 999; // الشحن مجاني للطلبات فوق 999 ج.م

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'abayas-dresses',
    name: 'عبايات ودريسات محجبات',
    slug: 'abayas-dresses',
    image_url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
    description: 'عبايات خليجية ملكي ودريسات كلوش قطن وكتان بقصات سابغة ومحتشمة'
  },
  {
    id: 'niqab-khimar',
    name: 'نقابات وخمارات إسلامية',
    slug: 'niqab-khimar',
    image_url: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80',
    description: 'خمارات ماليزية وسعودية ونقابات تاندة ومقواة بأقمشة كريب مريحة وساترة'
  },
  {
    id: 'tarha-scarves',
    name: 'طرح وشالات فاخرة',
    slug: 'tarha-scarves',
    image_url: 'https://images.unsplash.com/photo-1617922001439-4a2e6562f328?auto=format&fit=crop&w=600&q=80',
    description: 'طرح شيفون كريب ليزر، قطن كويتي بيور، وشالات كشمير شتوية ناعمة'
  },
  {
    id: 'accessories',
    name: 'إكسسوارات الحجاب وبندانات',
    slug: 'accessories',
    image_url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80',
    description: 'دبابيس مغناطيسية ضد التلف، بندانات قطن سوري، معاصم وجوانتيات شرعية'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-abaya-1',
    title: 'عباية إسلامية خليجية كريب ملكي سعودي - Royal Modest Abaya',
    slug: 'royal-modest-abaya',
    description: 'عباية خليجية أنيقة مصنوعة من قماش الكريب الملكي المستورد فاحم السواد، واسعة وسابغة لا تشف ولا تصف. تمتاز بقصة مريحة وأكمام كلاسيكية مع لمسات راقية تناسب كافة المناسبات والزيارات اليومية.',
    category_id: 'abayas-dresses',
    category_name: 'عبايات ودريسات محجبات',
    base_price: 790,
    compare_at_price: 950,
    badge: 'الأكثر مبيعاً',
    created_at: new Date().toISOString(),
    colors: [
      {
        id: 'col-ab-black',
        color_name: 'أسود ملكي فاحم',
        hex_code: '#111111',
        is_active: true,
        photos: [
          {
            id: 'ph-ab-1',
            url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
            is_cover: true,
            sort_order: 1
          },
          {
            id: 'ph-ab-2',
            url: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80',
            is_cover: false,
            sort_order: 2
          }
        ],
        sizes: [
          { id: 'sz-52', size_name: '52 (طول 150-155 سم)', is_available: true },
          { id: 'sz-54', size_name: '54 (طول 155-160 سم)', is_available: true },
          { id: 'sz-56', size_name: '56 (طول 160-165 سم)', is_available: true },
          { id: 'sz-58', size_name: '58 (طول 165-170 سم)', is_available: true },
          { id: 'sz-60', size_name: '60 (طول 170-175 سم)', is_available: true }
        ]
      },
      {
        id: 'col-ab-navy',
        color_name: 'كحلي ليلي وقور',
        hex_code: '#172554',
        is_active: true,
        photos: [
          {
            id: 'ph-ab-3',
            url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
            is_cover: true,
            sort_order: 1
          }
        ],
        sizes: [
          { id: 'sz-54-n', size_name: '54 (طول 155-160 سم)', is_available: true },
          { id: 'sz-56-n', size_name: '56 (طول 160-165 سم)', is_available: true },
          { id: 'sz-58-n', size_name: '58 (طول 165-170 سم)', is_available: false }
        ]
      },
      {
        id: 'col-ab-grey',
        color_name: 'رمادي دخاني',
        hex_code: '#4b5563',
        is_active: false, // معطل لتجربة اللون الباهت
        photos: [
          {
            id: 'ph-ab-4',
            url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
            is_cover: true,
            sort_order: 1
          }
        ],
        sizes: [
          { id: 'sz-56-g', size_name: '56 (طول 160-165 سم)', is_available: false }
        ]
      }
    ]
  },
  {
    id: 'prod-dress-2',
    title: 'دريس كلوش محتشم كتان تركي - Elegant Modest Linen Maxi Dress',
    slug: 'elegant-modest-linen-maxi-dress',
    description: 'دريس خروج راقٍ للمحجبات بقصة كلوش ملكية واسعة لا تصف تفاصيل الجسم. مصمم من أجود خيوط الكتان التركي المعالج ضد الانكماش مع بطانة ناعمة تضمن حشمة كاملة وراحة استثنائية.',
    category_id: 'abayas-dresses',
    category_name: 'عبايات ودريسات محجبات',
    base_price: 680,
    compare_at_price: 820,
    badge: 'وصل حديثاً',
    created_at: new Date().toISOString(),
    colors: [
      {
        id: 'col-dr-beige',
        color_name: 'بيج كشميري راقٍ',
        hex_code: '#d4b8a5',
        is_active: true,
        photos: [
          {
            id: 'ph-dr-1',
            url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
            is_cover: true,
            sort_order: 1
          },
          {
            id: 'ph-dr-2',
            url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
            is_cover: false,
            sort_order: 2
          }
        ],
        sizes: [
          { id: 'sz-dr-1', size_name: 'مقاس 1 (يلبس حتى 70 كجم)', is_available: true },
          { id: 'sz-dr-2', size_name: 'مقاس 2 (يلبس حتى 90 كجم)', is_available: true },
          { id: 'sz-dr-3', size_name: 'مقاس 3 (يلبس حتى 110 كجم)', is_available: true }
        ]
      },
      {
        id: 'col-dr-olive',
        color_name: 'زيتي زمرّدي',
        hex_code: '#2d4030',
        is_active: true,
        photos: [
          {
            id: 'ph-dr-3',
            url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
            is_cover: true,
            sort_order: 1
          }
        ],
        sizes: [
          { id: 'sz-dr-1-o', size_name: 'مقاس 1 (يلبس حتى 70 كجم)', is_available: true },
          { id: 'sz-dr-2-o', size_name: 'مقاس 2 (يلبس حتى 90 كجم)', is_available: false },
          { id: 'sz-dr-3-o', size_name: 'مقاس 3 (يلبس حتى 110 كجم)', is_available: true }
        ]
      },
      {
        id: 'col-dr-blue',
        color_name: 'أزرق كحلي داكن',
        hex_code: '#1e3a8a',
        is_active: false, // معطل
        photos: [
          {
            id: 'ph-dr-4',
            url: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80',
            is_cover: true,
            sort_order: 1
          }
        ],
        sizes: [
          { id: 'sz-dr-2-b', size_name: 'مقاس 2 (يلبس حتى 90 كجم)', is_available: false }
        ]
      }
    ]
  },
  {
    id: 'prod-khimar-3',
    title: 'خمار ماليزي كريب إيروباك مع نقاب تاندة - Malaysian Khimar & Niqab Set',
    slug: 'malaysian-khimar-niqab-set',
    description: 'طقم إسلامي متكامل يجمع بين خمار ماليزي طويل ساتر من الأمام والخلف بقصة مثلثة أنيقة، ونقاب تاندة مقوى من قماش الكريب الكوري سوبر بلاك مع شريط مطاطي مريح للغاية.',
    category_id: 'niqab-khimar',
    category_name: 'نقابات وخمارات إسلامية',
    base_price: 420,
    compare_at_price: 520,
    badge: 'طقم متكامل',
    created_at: new Date().toISOString(),
    colors: [
      {
        id: 'col-kh-black',
        color_name: 'أسود سوبر بلاك',
        hex_code: '#0a0a0a',
        is_active: true,
        photos: [
          {
            id: 'ph-kh-1',
            url: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
            is_cover: true,
            sort_order: 1
          }
        ],
        sizes: [
          { id: 'sz-kh-free', size_name: 'Free Size', is_available: true }
        ]
      },
      {
        id: 'col-kh-dusty',
        color_name: 'كشمير ترابي هادئ',
        hex_code: '#c89f9c',
        is_active: true,
        photos: [
          {
            id: 'ph-kh-2',
            url: 'https://images.unsplash.com/photo-1617922001439-4a2e6562f328?auto=format&fit=crop&w=800&q=80',
            is_cover: true,
            sort_order: 1
          }
        ],
        sizes: [
          { id: 'sz-kh-free-d', size_name: 'Free Size', is_available: true }
        ]
      },
      {
        id: 'col-kh-sand',
        color_name: 'بيج رملي طبيعي',
        hex_code: '#d8cbb8',
        is_active: true,
        photos: [
          {
            id: 'ph-kh-3',
            url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
            is_cover: true,
            sort_order: 1
          }
        ],
        sizes: [
          { id: 'sz-kh-free-s', size_name: 'Free Size', is_available: false } // نفد
        ]
      }
    ]
  },
  {
    id: 'prod-tarha-4',
    title: 'طرحة شيفون بيور أوريجينال مع بندانة متصلة - 2-in-1 Chiffon Hijab',
    slug: '2-in-1-chiffon-hijab',
    description: 'الطرحة الأكثر راحة وعملية للمحجبات والجامعة والعمل، تجمع بين بندانة قطن بيور مريحة مع طرحة شيفون كريب تركي منسدلة ثابتة طوال اليوم بدون انزلاق أو الحاجة لدبابيس كثيرة.',
    category_id: 'tarha-scarves',
    category_name: 'طرح وشالات فاخرة',
    base_price: 180,
    compare_at_price: 240,
    badge: 'الأكثر طلباً',
    created_at: new Date().toISOString(),
    colors: [
      {
        id: 'col-tr-white',
        color_name: 'أوف وايت / سكري',
        hex_code: '#fbf8f2',
        is_active: true,
        photos: [
          {
            id: 'ph-tr-1',
            url: 'https://images.unsplash.com/photo-1617922001439-4a2e6562f328?auto=format&fit=crop&w=800&q=80',
            is_cover: true,
            sort_order: 1
          }
        ],
        sizes: [
          { id: 'sz-tr-one', size_name: 'No Size', is_available: true }
        ]
      },
      {
        id: 'col-tr-pink',
        color_name: 'كشمير وردي هادئ',
        hex_code: '#dba39a',
        is_active: true,
        photos: [
          {
            id: 'ph-tr-2',
            url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
            is_cover: true,
            sort_order: 1
          }
        ],
        sizes: [
          { id: 'sz-tr-one-p', size_name: 'No Size', is_available: true }
        ]
      },
      {
        id: 'col-tr-black',
        color_name: 'أسود فاحم كلاسيكي',
        hex_code: '#171717',
        is_active: true,
        photos: [
          {
            id: 'ph-tr-3',
            url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
            is_cover: true,
            sort_order: 1
          }
        ],
        sizes: [
          { id: 'sz-tr-one-b', size_name: 'No Size', is_available: true }
        ]
      },
      {
        id: 'col-tr-mint',
        color_name: 'مينت جرين هادئ',
        hex_code: '#a3b899',
        is_active: false, // معطل لتجربة اللون الباهت
        photos: [
          {
            id: 'ph-tr-4',
            url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
            is_cover: true,
            sort_order: 1
          }
        ],
        sizes: [
          { id: 'sz-tr-one-m', size_name: 'No Size', is_available: false }
        ]
      }
    ]
  },
  {
    id: 'prod-pins-5',
    title: 'طقم دبابيس حجاب مغناطيسية فاخرة (4 أزواج) - Magnetic Hijab Pins',
    slug: 'magnetic-hijab-pins',
    description: 'بديل الدبابيس التقليدية لحماية الطرح الحرير والشيفون من النتش والتلف. مغناطيس فائق القوة يثبت الحجاب والنقاب بثبات تام طوال اليوم دون ترك أي ثقوب أو علامات في الأقمشة.',
    category_id: 'accessories',
    category_name: 'إكسسوارات الحجاب وبندانات',
    base_price: 140,
    compare_at_price: 190,
    badge: 'إكسسوار مميز',
    created_at: new Date().toISOString(),
    colors: [
      {
        id: 'col-pin-classic',
        color_name: 'ألوان كلاسيك (ذهبي وفضي وأسود ومطفي)',
        hex_code: '#c5a059',
        is_active: true,
        photos: [
          {
            id: 'ph-pin-1',
            url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
            is_cover: true,
            sort_order: 1
          }
        ],
        sizes: [
          { id: 'sz-pin-set', size_name: 'No Size', is_available: true }
        ]
      },
      {
        id: 'col-pin-pastel',
        color_name: 'ألوان باستيل ناعمة',
        hex_code: '#e2d4c9',
        is_active: true,
        photos: [
          {
            id: 'ph-pin-2',
            url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
            is_cover: true,
            sort_order: 1
          }
        ],
        sizes: [
          { id: 'sz-pin-set-2', size_name: 'No Size', is_available: true }
        ]
      }
    ]
  }
];

const STORAGE_KEYS = {
  PRODUCTS: 'apparel_store_products_v2', // v2 to refresh localStorage automatically!
  CATEGORIES: 'apparel_store_categories_v2',
  ORDERS: 'apparel_store_orders_v2',
};

export class StoreRepository {
  static getCategories(): Category[] {
    if (typeof window === 'undefined') return INITIAL_CATEGORIES;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return data ? JSON.parse(data) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  }

  static saveCategory(category: Category): void {
    if (typeof window === 'undefined') return;
    const list = this.getCategories();
    const existingIndex = list.findIndex(c => c.id === category.id);
    if (existingIndex >= 0) {
      list[existingIndex] = category;
    } else {
      list.push(category);
    }
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(list));
  }

  static deleteCategory(categoryId: string): void {
    if (typeof window === 'undefined') return;
    const list = this.getCategories().filter(c => c.id !== categoryId);
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(list));
  }

  static getProducts(filter?: { categorySlug?: string; search?: string; sort?: string }): Product[] {
    let list: Product[] = INITIAL_PRODUCTS;
    if (typeof window !== 'undefined') {
      try {
        const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
        list = data ? JSON.parse(data) : INITIAL_PRODUCTS;
      } catch {
        list = INITIAL_PRODUCTS;
      }
    }

    if (!filter) return list;

    let filtered = [...list];

    if (filter.categorySlug && filter.categorySlug !== 'all') {
      filtered = filtered.filter(p => p.category_id === filter.categorySlug);
    }

    if (filter.search && filter.search.trim() !== '') {
      const q = filter.search.toLowerCase().trim();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.category_name?.toLowerCase().includes(q)
      );
    }

    if (filter.sort) {
      if (filter.sort === 'price-asc') {
        filtered.sort((a, b) => a.base_price - b.base_price);
      } else if (filter.sort === 'price-desc') {
        filtered.sort((a, b) => b.base_price - a.base_price);
      } else if (filter.sort === 'newest') {
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      }
    }

    return filtered;
  }

  static getProductBySlug(slug: string): Product | undefined {
    const list = this.getProducts();
    return list.find(p => p.slug === slug || p.id === slug);
  }

  static saveProduct(product: Product): void {
    if (typeof window === 'undefined') return;
    const list = this.getProducts();
    const existingIndex = list.findIndex(p => p.id === product.id);
    if (existingIndex >= 0) {
      list[existingIndex] = product;
    } else {
      list.unshift(product);
    }
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(list));
  }

  static deleteProduct(productId: string): void {
    if (typeof window === 'undefined') return;
    const list = this.getProducts().filter(p => p.id !== productId);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(list));
  }

  // Seam: Toggle Color Availability (Active/Disabled Faded)
  static toggleColorAvailability(productId: string, colorId: string, isActive: boolean): Product | undefined {
    const product = this.getProductBySlug(productId);
    if (!product) return undefined;

    product.colors = product.colors.map(color => {
      if (color.id === colorId) {
        return { ...color, is_active: isActive };
      }
      return color;
    });

    this.saveProduct(product);
    return product;
  }

  // Seam: Toggle Size Availability (Available / Out of Stock)
  static toggleSizeAvailability(productId: string, colorId: string, sizeId: string, isAvailable: boolean): Product | undefined {
    const product = this.getProductBySlug(productId);
    if (!product) return undefined;

    product.colors = product.colors.map(color => {
      if (color.id === colorId) {
        return {
          ...color,
          sizes: color.sizes.map(sz => sz.id === sizeId ? { ...sz, is_available: isAvailable } : sz)
        };
      }
      return color;
    });

    this.saveProduct(product);
    return product;
  }

  // Seam: Shipping calculation
  static calculateShipping(governorateName: string, subtotal: number): { fee: number; isFree: boolean; zone?: ShippingZone } {
    if (subtotal >= FREE_SHIPPING_THRESHOLD) {
      return { fee: 0, isFree: true };
    }

    const zone = INITIAL_SHIPPING_ZONES.find(z => z.governorate.includes(governorateName) || governorateName.includes(z.governorate));
    const fee = zone ? zone.fee : 50;
    return { fee, isFree: false, zone };
  }

  // Seam: Orders management
  static getOrders(): Order[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static saveOrder(order: Order): void {
    if (typeof window === 'undefined') return;
    const list = this.getOrders();
    list.unshift(order);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(list));

    // Also persist asynchronously to Supabase remote database
    try {
      supabase.from('orders').insert({
        id: order.id,
        order_number: order.order_number,
        customer_name: order.customer_name,
        customer_phone: order.customer_phone,
        governorate: order.governorate,
        shipping_address: order.shipping_address,
        notes: order.notes || null,
        items: order.items,
        subtotal: order.subtotal,
        shipping_fee: order.shipping_fee,
        total_amount: order.total_amount,
        payment_method: order.payment_method,
        status: order.status
      }).then(({ error }) => {
        if (error) console.warn('Supabase order insert note:', error.message);
      });
    } catch (e) {
      console.warn('Supabase offline or unreachable:', e);
    }
  }

  static updateOrderStatus(orderId: string, status: OrderStatus): void {
    if (typeof window === 'undefined') return;
    const list = this.getOrders().map(o => o.id === orderId ? { ...o, status } : o);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(list));

    // Sync status change to Supabase
    try {
      supabase.from('orders').update({ status }).eq('id', orderId).then(({ error }) => {
        if (error) console.warn('Supabase status update note:', error.message);
      });
    } catch (e) {
      console.warn('Supabase offline update note:', e);
    }
  }

  // Upload an image file directly to Supabase Storage bucket 'apparel-images'
  static async uploadImageToSupabase(file: File): Promise<string> {
    const fileExt = file.name.split('.').pop() || 'jpg';
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    try {
      const { data, error } = await supabase.storage
        .from('apparel-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from('apparel-images')
        .getPublicUrl(filePath);

      return publicUrlData.publicUrl;
    } catch (err: any) {
      console.error('Supabase upload error, using local data URL fallback:', err);
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }
  }

  // Seam: WhatsApp Order Message Builder
  static buildWhatsAppOrderMessage(order: Order, storePhone: string = '+201000000000'): string {
    const itemsList = order.items.map(item => 
      `• ${item.product_title} (${item.color_name} - مقاس: ${item.size_name}) × ${item.quantity} = ${item.unit_price * item.quantity} ج.م`
    ).join('\n');

    const paymentText = order.payment_method === 'cod' 
      ? 'الدفع عند الاستلام' 
      : order.payment_method === 'instapay' ? 'تحويل إنستاباي' : 'فودافون كاش';

    const text = `السلام عليكم ورحمة الله، أود تأكيد طلبي من المتجر:\n` +
      `📦 رقم الطلب: #${order.order_number}\n` +
      `👤 العميل: ${order.customer_name}\n` +
      `📞 رقم الهاتف: ${order.customer_phone}\n` +
      `📍 العنوان: ${order.governorate} - ${order.shipping_address}\n` +
      `💳 طريقة الدفع: ${paymentText}\n\n` +
      `🛍️ المنتجات:\n${itemsList}\n\n` +
      `💵 المجموع: ${order.subtotal} ج.م\n` +
      `🚚 الشحن: ${order.shipping_fee === 0 ? 'مجاني 🎉' : `${order.shipping_fee} ج.م`}\n` +
      `💰 الإجمالي النهائي: ${order.total_amount} ج.م\n` +
      (order.notes ? `📝 ملاحظات: ${order.notes}\n` : '') +
      `\nشكراً لكم وبارك الله فيكم!`;

    const encoded = encodeURIComponent(text);
    return `https://wa.me/${storePhone.replace(/[^0-9]/g, '')}?text=${encoded}`;
  }
}
