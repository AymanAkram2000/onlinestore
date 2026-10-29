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
    id: 'hoodies',
    name: 'هوديز وسويت شيرت',
    slug: 'hoodies',
    image_url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
    description: 'تشكيلة الهوديز الفاخرة بقصات أوفرسايز وخامات شتوية ممتازة'
  },
  {
    id: 't-shirts',
    name: 'تيشيرتات صيفية',
    slug: 't-shirts',
    image_url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    description: 'تيشيرتات قطن مصري 100% بأوزان ثقيلة وملمس فائق النعومة'
  },
  {
    id: 'shirts',
    name: 'قمصان كلاسيك وكاجوال',
    slug: 'shirts',
    image_url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    description: 'قمصان كتان وخامات مريحة تناسب الإطلالات اليومية والرسمية'
  },
  {
    id: 'pants',
    name: 'بناطيل وكارجو',
    slug: 'pants',
    image_url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80',
    description: 'بناطيل كارجو وعصرية مصممة لأقصى درجات الراحة والأناقة'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'هودي أوفرسايز فخم - Minimal Heavyweight Hoodie',
    slug: 'minimal-heavyweight-hoodie',
    description: 'هودي مصنع من أجود خيوط القطن الممشط المبطن بالصوف الناعم بوزن 420 GSM. قصة عصرية فضفاضة تعطي مظهراً راقياً ومريحاً ومقاوماً للغسيل المتكرر.',
    category_id: 'hoodies',
    category_name: 'هوديز وسويت شيرت',
    base_price: 690,
    compare_at_price: 850,
    badge: 'الأكثر مبيعاً',
    created_at: new Date().toISOString(),
    colors: [
      {
        id: 'col-1-black',
        color_name: 'أسود فاحم',
        hex_code: '#18181b',
        is_active: true,
        photos: [
          {
            id: 'ph-1-1',
            url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
            is_cover: true,
            sort_order: 1
          },
          {
            id: 'ph-1-2',
            url: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80',
            is_cover: false,
            sort_order: 2
          },
          {
            id: 'ph-1-3',
            url: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
            is_cover: false,
            sort_order: 3
          }
        ],
        sizes: [
          { id: 'sz-1-s', size_name: 'S', is_available: true },
          { id: 'sz-1-m', size_name: 'M', is_available: true },
          { id: 'sz-1-l', size_name: 'L', is_available: true },
          { id: 'sz-1-xl', size_name: 'XL', is_available: true },
          { id: 'sz-1-os', size_name: 'Oversize', is_available: true }
        ]
      },
      {
        id: 'col-1-sand',
        color_name: 'بيج رملي',
        hex_code: '#d4c5b3',
        is_active: true,
        photos: [
          {
            id: 'ph-2-1',
            url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
            is_cover: true,
            sort_order: 1
          },
          {
            id: 'ph-2-2',
            url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
            is_cover: false,
            sort_order: 2
          }
        ],
        sizes: [
          { id: 'sz-2-s', size_name: 'S', is_available: true },
          { id: 'sz-2-m', size_name: 'M', is_available: true },
          { id: 'sz-2-l', size_name: 'L', is_available: false },
          { id: 'sz-2-xl', size_name: 'XL', is_available: true }
        ]
      },
      {
        id: 'col-1-navy',
        color_name: 'أزرق كحلي',
        hex_code: '#1e3a8a',
        is_active: false,
        photos: [
          {
            id: 'ph-3-1',
            url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80',
            is_cover: true,
            sort_order: 1
          }
        ],
        sizes: [
          { id: 'sz-3-m', size_name: 'M', is_available: false },
          { id: 'sz-3-l', size_name: 'L', is_available: false }
        ]
      }
    ]
  },
  {
    id: 'prod-2',
    title: 'تيشيرت بيسك قطن مصري 240 GSM - Premium Heavyweight Tee',
    slug: 'premium-heavyweight-tee',
    description: 'قطعة أساسية لا غنى عنها في خزانة ملابسك، مصنوعة من قطن مصري أصيل طويل التيلة بنسبة 100%. ياقة متينة وياقة مزدوجة الخياطة تحافظ على مظهرها بعد كل غسلة.',
    category_id: 't-shirts',
    category_name: 'تيشيرتات صيفية',
    base_price: 390,
    compare_at_price: 480,
    badge: 'وصل حديثاً',
    created_at: new Date().toISOString(),
    colors: [
      {
        id: 'col-2-white',
        color_name: 'أبيض ناصع',
        hex_code: '#ffffff',
        is_active: true,
        photos: [
          {
            id: 'ph-4-1',
            url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
            is_cover: true,
            sort_order: 1
          },
          {
            id: 'ph-4-2',
            url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
            is_cover: false,
            sort_order: 2
          }
        ],
        sizes: [
          { id: 'sz-4-s', size_name: 'S', is_available: true },
          { id: 'sz-4-m', size_name: 'M', is_available: true },
          { id: 'sz-4-l', size_name: 'L', is_available: true },
          { id: 'sz-4-xl', size_name: 'XL', is_available: true }
        ]
      },
      {
        id: 'col-2-olive',
        color_name: 'زيتي عسكري',
        hex_code: '#3f4f3f',
        is_active: true,
        photos: [
          {
            id: 'ph-5-1',
            url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
            is_cover: true,
            sort_order: 1
          }
        ],
        sizes: [
          { id: 'sz-5-m', size_name: 'M', is_available: true },
          { id: 'sz-5-l', size_name: 'L', is_available: true },
          { id: 'sz-5-xl', size_name: 'XL', is_available: false }
        ]
      },
      {
        id: 'col-2-black',
        color_name: 'أسود فحمي',
        hex_code: '#18181b',
        is_active: true,
        photos: [
          {
            id: 'ph-6-1',
            url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
            is_cover: true,
            sort_order: 1
          }
        ],
        sizes: [
          { id: 'sz-6-m', size_name: 'M', is_available: true },
          { id: 'sz-6-l', size_name: 'L', is_available: true }
        ]
      }
    ]
  },
  {
    id: 'prod-3',
    title: 'قميص كتان طبيعي راقي - Relaxed French Linen Shirt',
    slug: 'relaxed-french-linen-shirt',
    description: 'قميص مصمم من الكتان الطبيعي الفاخر المنعش خفيف الوزن. مريح جداً في الأيام الحارة ويمتاز بياقة أنيقة وأزرار صدفية متقنة الصنع.',
    category_id: 'shirts',
    category_name: 'قمصان كلاسيك وكاجوال',
    base_price: 590,
    compare_at_price: 750,
    badge: 'خصم مميز',
    created_at: new Date().toISOString(),
    colors: [
      {
        id: 'col-3-beige',
        color_name: 'كتاني طبيعي',
        hex_code: '#f3ede2',
        is_active: true,
        photos: [
          {
            id: 'ph-7-1',
            url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
            is_cover: true,
            sort_order: 1
          },
          {
            id: 'ph-7-2',
            url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
            is_cover: false,
            sort_order: 2
          }
        ],
        sizes: [
          { id: 'sz-7-s', size_name: 'S', is_available: true },
          { id: 'sz-7-m', size_name: 'M', is_available: true },
          { id: 'sz-7-l', size_name: 'L', is_available: true },
          { id: 'sz-7-xl', size_name: 'XL', is_available: true }
        ]
      },
      {
        id: 'col-3-sky',
        color_name: 'أزرق سماوي',
        hex_code: '#bae6fd',
        is_active: false,
        photos: [
          {
            id: 'ph-8-1',
            url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
            is_cover: true,
            sort_order: 1
          }
        ],
        sizes: [
          { id: 'sz-8-m', size_name: 'M', is_available: false }
        ]
      }
    ]
  },
  {
    id: 'prod-4',
    title: 'بنطلون كارجو ستريت وير - Tactical Relaxed Cargo Pants',
    slug: 'tactical-relaxed-cargo-pants',
    description: 'بنطلون كارجو عصري بجيوب جانبية ذكية ونسيج قطني مرن ضد الانكماش. مصمم بحزام خصر مرن وأربطة سفلية للتحكم في وسع الأرجل.',
    category_id: 'pants',
    category_name: 'بناطيل وكارجو',
    base_price: 650,
    compare_at_price: 800,
    badge: 'الأكثر مبيعاً',
    created_at: new Date().toISOString(),
    colors: [
      {
        id: 'col-4-black',
        color_name: 'أسود داكن',
        hex_code: '#18181b',
        is_active: true,
        photos: [
          {
            id: 'ph-9-1',
            url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
            is_cover: true,
            sort_order: 1
          }
        ],
        sizes: [
          { id: 'sz-9-30', size_name: '30', is_available: true },
          { id: 'sz-9-32', size_name: '32', is_available: true },
          { id: 'sz-9-34', size_name: '34', is_available: true },
          { id: 'sz-9-36', size_name: '36', is_available: false }
        ]
      },
      {
        id: 'col-4-grey',
        color_name: 'رمادي حجري',
        hex_code: '#6b7280',
        is_active: true,
        photos: [
          {
            id: 'ph-10-1',
            url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
            is_cover: true,
            sort_order: 1
          }
        ],
        sizes: [
          { id: 'sz-10-32', size_name: '32', is_available: true },
          { id: 'sz-10-34', size_name: '34', is_available: true }
        ]
      }
    ]
  }
];

const STORAGE_KEYS = {
  PRODUCTS: 'apparel_store_products_v1',
  CATEGORIES: 'apparel_store_categories_v1',
  ORDERS: 'apparel_store_orders_v1',
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

    const text = `السلام عليكم، أود تأكيد طلبي من المتجر:\n` +
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
      `\nشكراً لكم!`;

    const encoded = encodeURIComponent(text);
    return `https://wa.me/${storePhone.replace(/[^0-9]/g, '')}?text=${encoded}`;
  }
}
