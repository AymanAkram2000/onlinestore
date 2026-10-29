'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StoreRepository, INITIAL_CATEGORIES } from '@/lib/store';
import { Product, ColorVariant, SizeVariant, Category, Order, OrderStatus } from '@/types';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  XCircle, 
  Package, 
  ShoppingBag, 
  Layers, 
  MessageCircle, 
  Eye, 
  ShieldCheck, 
  AlertCircle,
  Image as ImageIcon,
  Check,
  RefreshCw,
  Printer
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'categories'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Form Fields for Product
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCategoryId, setFormCategoryId] = useState('');
  const [formBasePrice, setFormBasePrice] = useState<number>(450);
  const [formComparePrice, setFormComparePrice] = useState<number | undefined>(undefined);
  const [formBadge, setFormBadge] = useState<string>('');

  // Colors builder for current product
  const [formColors, setFormColors] = useState<ColorVariant[]>([]);

  // New color temporary inputs
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#18181b');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [activeColorTabId, setActiveColorTabId] = useState<string | null>(null);

  // Notification Banner
  const [adminNotification, setAdminNotification] = useState<string | null>(null);

  const loadData = () => {
    setProducts(StoreRepository.getProducts());
    setCategories(StoreRepository.getCategories());
    setOrders(StoreRepository.getOrders());
  };

  useEffect(() => {
    loadData();
  }, []);

  const showNotification = (msg: string) => {
    setAdminNotification(msg);
    setTimeout(() => setAdminNotification(null), 4000);
  };

  // 1-Click Toggle Color Active / Inactive
  const handleToggleColorActive = (productId: string, colorId: string, currentStatus: boolean) => {
    const updated = StoreRepository.toggleColorAvailability(productId, colorId, !currentStatus);
    if (updated) {
      loadData();
      showNotification(`تم ${!currentStatus ? 'تفعيل' : 'إيقاف'} هذا اللون بنجاح. سيظهر ${!currentStatus ? 'نشطاً' : 'باللون الباهت'} للعميل!`);
    }
  };

  // 1-Click Toggle Size Available / Out of Stock
  const handleToggleSizeAvailable = (productId: string, colorId: string, sizeId: string, currentStatus: boolean) => {
    const updated = StoreRepository.toggleSizeAvailability(productId, colorId, sizeId, !currentStatus);
    if (updated) {
      loadData();
      showNotification(`تم تحديث حالة المقاس بنجاح.`);
    }
  };

  // Delete product
  const handleDeleteProduct = (productId: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج نهائياً؟')) {
      StoreRepository.deleteProduct(productId);
      loadData();
      showNotification('تم حذف المنتج بنجاح.');
    }
  };

  // Open modal to add product
  const handleOpenAddModal = () => {
    setEditingProductId(null);
    setFormTitle('');
    setFormSlug('');
    setFormDescription('');
    setFormCategoryId(categories[0]?.id || 'hoodies');
    setFormBasePrice(490);
    setFormComparePrice(undefined);
    setFormBadge('وصل حديثاً');

    // Default first color
    const defaultCol: ColorVariant = {
      id: `col-${Date.now()}`,
      color_name: 'أسود كلاسيك',
      hex_code: '#18181b',
      is_active: true,
      photos: [
        {
          id: `ph-${Date.now()}`,
          url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
          is_cover: true,
          sort_order: 1
        }
      ],
      sizes: [
        { id: `sz-s-${Date.now()}`, size_name: 'S', is_available: true },
        { id: `sz-m-${Date.now()}`, size_name: 'M', is_available: true },
        { id: `sz-l-${Date.now()}`, size_name: 'L', is_available: true },
        { id: `sz-xl-${Date.now()}`, size_name: 'XL', is_available: true }
      ]
    };

    setFormColors([defaultCol]);
    setActiveColorTabId(defaultCol.id);
    setIsProductModalOpen(true);
  };

  // Open modal to edit existing product
  const handleOpenEditModal = (prod: Product) => {
    setEditingProductId(prod.id);
    setFormTitle(prod.title);
    setFormSlug(prod.slug);
    setFormDescription(prod.description);
    setFormCategoryId(prod.category_id);
    setFormBasePrice(prod.base_price);
    setFormComparePrice(prod.compare_at_price);
    setFormBadge(prod.badge || '');
    setFormColors(JSON.parse(JSON.stringify(prod.colors)));
    setActiveColorTabId(prod.colors[0]?.id || null);
    setIsProductModalOpen(true);
  };

  // Add Color to Form
  const handleAddColorToForm = () => {
    if (!newColorName.trim()) return;

    const newColor: ColorVariant = {
      id: `col-${Date.now()}`,
      color_name: newColorName.trim(),
      hex_code: newColorHex,
      is_active: true,
      photos: [],
      sizes: [
        { id: `sz-s-${Date.now()}`, size_name: 'S', is_available: true },
        { id: `sz-m-${Date.now()}`, size_name: 'M', is_available: true },
        { id: `sz-l-${Date.now()}`, size_name: 'L', is_available: true },
        { id: `sz-xl-${Date.now()}`, size_name: 'XL', is_available: true }
      ]
    };

    setFormColors([...formColors, newColor]);
    setActiveColorTabId(newColor.id);
    setNewColorName('');
  };

  // Add Photo to Active Color
  const handleAddPhotoToActiveColor = () => {
    if (!newPhotoUrl.trim() || !activeColorTabId) return;

    setFormColors(formColors.map(color => {
      if (color.id === activeColorTabId) {
        const isFirst = color.photos.length === 0;
        return {
          ...color,
          photos: [
            ...color.photos,
            {
              id: `ph-${Date.now()}`,
              url: newPhotoUrl.trim(),
              is_cover: isFirst,
              sort_order: color.photos.length + 1
            }
          ]
        };
      }
      return color;
    }));

    setNewPhotoUrl('');
  };

  // Set Cover Photo for active color
  const handleSetCoverPhoto = (colorId: string, photoId: string) => {
    setFormColors(formColors.map(color => {
      if (color.id === colorId) {
        return {
          ...color,
          photos: color.photos.map(p => ({
            ...p,
            is_cover: p.id === photoId
          }))
        };
      }
      return color;
    }));
  };

  // Remove Photo from active color
  const handleRemovePhoto = (colorId: string, photoId: string) => {
    setFormColors(formColors.map(color => {
      if (color.id === colorId) {
        const filtered = color.photos.filter(p => p.id !== photoId);
        // if removed was cover, make first cover
        if (filtered.length > 0 && !filtered.some(p => p.is_cover)) {
          filtered[0].is_cover = true;
        }
        return { ...color, photos: filtered };
      }
      return color;
    }));
  };

  // Save product from modal
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formTitle.trim()) return;

    const catObj = categories.find(c => c.id === formCategoryId);
    const generatedSlug = formSlug.trim() 
      ? formSlug.trim().toLowerCase().replace(/\s+/g, '-') 
      : formTitle.trim().toLowerCase().replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '-');

    const productPayload: Product = {
      id: editingProductId || `prod-${Date.now()}`,
      title: formTitle.trim(),
      slug: generatedSlug,
      description: formDescription.trim(),
      category_id: formCategoryId,
      category_name: catObj?.name || 'ملابس',
      base_price: Number(formBasePrice),
      compare_at_price: formComparePrice ? Number(formComparePrice) : undefined,
      badge: formBadge.trim() || undefined,
      colors: formColors,
      created_at: new Date().toISOString()
    };

    StoreRepository.saveProduct(productPayload);
    setIsProductModalOpen(false);
    loadData();
    showNotification('تم حفظ المنتج بنجاح وتحديث المتجر فوراً! ✨');
  };

  // Change order status
  const handleOrderStatusChange = (orderId: string, newStatus: OrderStatus) => {
    StoreRepository.updateOrderStatus(orderId, newStatus);
    loadData();
    showNotification(`تم تغيير حالة الطلب إلى "${newStatus}".`);
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 pb-20">
      
      {/* Admin Top Header */}
      <header className="bg-neutral-950 text-white border-b border-neutral-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-base sm:text-lg">لوحة تحكم صاحب المتجر</h1>
              <p className="text-[11px] text-neutral-400">إدارة المنتجات، الألوان، الصور والطلبات</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold rounded-xl transition"
            >
              <Eye className="w-4 h-4" />
              <span>معاينة المتجر كعميل</span>
            </Link>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4 text-xs font-bold border-t border-neutral-850">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition ${
              activeTab === 'products' ? 'border-emerald-400 text-white' : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>المنتجات والألوان ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition ${
              activeTab === 'orders' ? 'border-emerald-400 text-white' : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>طلبات العملاء ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition ${
              activeTab === 'categories' ? 'border-emerald-400 text-white' : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>الأقسام والتصنيفات ({categories.length})</span>
          </button>
        </div>
      </header>

      {/* Admin Notification Toast */}
      {adminNotification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-emerald-950 text-emerald-200 border border-emerald-700 px-6 py-3 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{adminNotification}</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ================= TAB 1: PRODUCTS & COLOR VARIANTS ================= */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
              <div>
                <h2 className="text-base font-bold text-neutral-900">إدارة قائمة الملابس والألوان</h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  يمكنك تفعيل أو إيقاف أي لون فوراً بنقرة واحدة ليظهر للعميل كـ "غير متوفر" بلون باهت.
                </p>
              </div>

              <button
                onClick={handleOpenAddModal}
                className="px-5 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة منتج جديد + ألوانه</span>
              </button>
            </div>

            {/* Products List Cards */}
            <div className="grid grid-cols-1 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs">
                  <div className="flex flex-col md:flex-row items-start justify-between gap-4 border-b border-neutral-100 pb-4">
                    <div className="flex items-start gap-4">
                      {/* Product Thumbnail */}
                      <img
                        src={product.colors[0]?.photos[0]?.url || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80'}
                        alt={product.title}
                        className="w-16 h-20 rounded-xl object-cover bg-neutral-100 border border-neutral-200 flex-shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-base text-neutral-900">{product.title}</h3>
                          {product.badge && (
                            <span className="px-2 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-bold rounded-md">
                              {product.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-500 mt-1">
                          القسم: {product.category_name} • السعر: <strong className="text-neutral-900">{product.base_price} ج.م</strong>
                        </p>
                        <p className="text-xs text-neutral-600 line-clamp-1 mt-1 max-w-xl">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-start">
                      <Link
                        href={`/product/${product.slug}`}
                        target="_blank"
                        className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition"
                        title="معاينة في المتجر"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleOpenEditModal(product)}
                        className="p-2 text-neutral-500 hover:text-blue-600 hover:bg-neutral-100 rounded-lg transition"
                        title="تعديل المنتج"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 text-neutral-500 hover:text-red-600 hover:bg-neutral-100 rounded-lg transition"
                        title="حذف المنتج"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Colors & Stock Availability Section */}
                  <div className="pt-4 space-y-3">
                    <span className="text-xs font-bold text-neutral-700 block">
                      🎨 ألوان المنتج وحالة توفرها (اضغط على المفتاح لتفعيل/قفل اللون في المتجر):
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {product.colors.map((color) => {
                        const coverImg = color.photos.find(p => p.is_cover)?.url || color.photos[0]?.url;

                        return (
                          <div
                            key={color.id}
                            className={`p-3.5 rounded-xl border transition-all ${
                              color.is_active 
                                ? 'bg-neutral-50/70 border-neutral-200' 
                                : 'bg-red-50/40 border-red-200 opacity-60'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-2.5">
                                {coverImg && (
                                  <img
                                    src={coverImg}
                                    alt={color.color_name}
                                    className="w-8 h-10 rounded object-cover border border-neutral-300"
                                  />
                                )}
                                <div className="flex items-center gap-1.5">
                                  <span
                                    className="w-4 h-4 rounded-full border border-neutral-300 shadow-xs inline-block"
                                    style={{ backgroundColor: color.hex_code }}
                                  />
                                  <span className="text-xs font-bold text-neutral-900">{color.color_name}</span>
                                </div>
                              </div>

                              {/* Instant Toggle Switch for Color */}
                              <button
                                type="button"
                                onClick={() => handleToggleColorActive(product.id, color.id, color.is_active)}
                                className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition ${
                                  color.is_active
                                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                                }`}
                                title="اضغط لتبديل حالة التوفر فوراً"
                              >
                                {color.is_active ? (
                                  <>
                                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                                    <span>متاح بالموقع</span>
                                  </>
                                ) : (
                                  <>
                                    <XCircle className="w-3 h-3 text-red-600" />
                                    <span>موقوف (باهت)</span>
                                  </>
                                )}
                              </button>
                            </div>

                            {/* Sizes under this color */}
                            <div className="mt-2.5 pt-2 border-t border-neutral-200/60 flex items-center gap-1.5 flex-wrap">
                              <span className="text-[10px] text-neutral-400 font-medium">المقاسات:</span>
                              {color.sizes.map((sz) => (
                                <button
                                  key={sz.id}
                                  type="button"
                                  onClick={() => handleToggleSizeAvailable(product.id, color.id, sz.id, sz.is_available)}
                                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition ${
                                    sz.is_available
                                      ? 'bg-white border border-neutral-300 text-neutral-800 hover:bg-neutral-100'
                                      : 'bg-neutral-200 text-neutral-400 line-through'
                                  }`}
                                  title={`المقاس ${sz.size_name}: اضغط لتبديل التوفر`}
                                >
                                  {sz.size_name}
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 2: ORDERS MANAGEMENT ================= */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-neutral-900">سجل طلبات العملاء</h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  تابع حالات الشحن، وتواصل بنقرة واحدة مع العميل عبر واتساب لتأكيد موعد التسليم.
                </p>
              </div>

              <button
                onClick={loadData}
                className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded-lg transition flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>تحديث</span>
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-neutral-200">
                <p className="text-sm font-bold text-neutral-700">لا توجد طلبات مسجلة بعد</p>
                <p className="text-xs text-neutral-400 mt-1">الطلبات الجديدة التي يسجلها الزبائن ستظهر هنا فوراً.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const whatsappMsgUrl = StoreRepository.buildWhatsAppOrderMessage(order);

                  return (
                    <div key={order.id} className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-4">
                      {/* Order Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-extrabold text-sm text-neutral-950">
                            طلب #{order.order_number}
                          </span>
                          <span className="text-xs text-neutral-400">
                            {new Date(order.created_at).toLocaleDateString('ar-EG', { dateStyle: 'medium', timeStyle: 'short' })}
                          </span>
                        </div>

                        {/* Order Status Select */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-neutral-500">حالة الطلب:</span>
                          <select
                            value={order.status}
                            onChange={(e) => handleOrderStatusChange(order.id, e.target.value as OrderStatus)}
                            className="bg-neutral-50 border border-neutral-300 text-xs font-bold rounded-lg px-3 py-1.5 text-neutral-900 focus:outline-hidden"
                          >
                            <option value="pending">⏳ قيد المراجعة / جديد</option>
                            <option value="confirmed">✅ تم التأكيد</option>
                            <option value="shipped">🚚 قيد الشحن</option>
                            <option value="delivered">🎉 تم التسليم</option>
                            <option value="cancelled">❌ ملغي</option>
                          </select>
                        </div>
                      </div>

                      {/* Customer Info & WhatsApp action */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-neutral-700 bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                        <div>
                          <span className="font-bold text-neutral-900 block">👤 بيانات العميل:</span>
                          <p>{order.customer_name}</p>
                          <p dir="ltr" className="text-left font-mono font-bold text-neutral-900">{order.customer_phone}</p>
                        </div>

                        <div>
                          <span className="font-bold text-neutral-900 block">📍 المحافظة والعنوان:</span>
                          <p>{order.governorate}</p>
                          <p>{order.shipping_address}</p>
                        </div>

                        <div className="flex flex-col justify-between items-start md:items-end">
                          <div>
                            <span className="font-bold text-neutral-900 block">💳 طريقة الدفع:</span>
                            <p>{order.payment_method === 'cod' ? 'الدفع عند الاستلام' : 'تحويل محفظة/إنستاباي'}</p>
                          </div>

                          {/* Quick WhatsApp Action Button */}
                          <a
                            href={whatsappMsgUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-xs"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-current" />
                            <span>مراسلة العميل واتساب</span>
                          </a>
                        </div>
                      </div>

                      {/* Purchased items list */}
                      <div className="space-y-2 pt-1">
                        <span className="text-xs font-bold text-neutral-800">القطع المطلوبة:</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-2 p-2 bg-neutral-50/50 rounded-lg border border-neutral-100 text-xs">
                              <img
                                src={item.image_url}
                                alt={item.product_title}
                                className="w-10 h-12 rounded object-cover border border-neutral-200"
                              />
                              <div>
                                <h4 className="font-bold text-neutral-900 truncate">{item.product_title}</h4>
                                <p className="text-[11px] text-neutral-500">
                                  {item.color_name} • مقاس: {item.size_name} • العدد: {item.quantity}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Total */}
                      <div className="border-t border-neutral-100 pt-3 flex items-center justify-between text-xs font-bold">
                        <span>إجمالي الفاتورة (مع الشحن {order.shipping_fee} ج.م):</span>
                        <span className="text-base font-black text-emerald-700">{order.total_amount} ج.م</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: CATEGORIES MANAGEMENT ================= */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs">
              <h2 className="text-base font-bold text-neutral-900">أقسام وتصنيفات الملابس</h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                تصفح وإدارة أقسام المتجر الرئيسية التي يفلتر الزوار من خلالها.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <div key={cat.id} className="bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-xs">
                  <div className="h-32 bg-neutral-100 overflow-hidden relative">
                    <img
                      src={cat.image_url}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-sm text-neutral-900">{cat.name}</h3>
                    <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2">{cat.description}</p>
                    <span className="text-[10px] text-neutral-400 mt-2 block font-mono">الرابط: /catalog?category={cat.slug}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* ================= MODAL: ADD / EDIT PRODUCT ================= */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-6">
              <h3 className="text-lg font-bold text-neutral-950">
                {editingProductId ? 'تعديل بيانات المنتج والألوان' : 'إضافة منتج ملابس جديد'}
              </h3>
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="p-2 text-neutral-400 hover:text-neutral-800 rounded-full"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-6">
              
              {/* Product Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-800 block">اسم المنتج *</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="مثال: هودي أوفرسايز صوف ثقيل"
                    className="w-full px-3.5 py-2 border border-neutral-300 rounded-xl text-xs font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-800 block">القسم / التصنيف *</label>
                  <select
                    value={formCategoryId}
                    onChange={(e) => setFormCategoryId(e.target.value)}
                    className="w-full px-3.5 py-2 border border-neutral-300 rounded-xl text-xs font-bold bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-800 block">وصف خامة ومواصفات المنتج *</label>
                <textarea
                  required
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="وصف الخامات، القطن المستخدم، تعليمات الغسيل..."
                  className="w-full px-3.5 py-2 border border-neutral-300 rounded-xl text-xs font-medium resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-800 block">السعر الأساسي (ج.م) *</label>
                  <input
                    type="number"
                    required
                    value={formBasePrice}
                    onChange={(e) => setFormBasePrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 border border-neutral-300 rounded-xl text-xs font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-800 block">السعر قبل الخصم (اختياري)</label>
                  <input
                    type="number"
                    value={formComparePrice || ''}
                    onChange={(e) => setFormComparePrice(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="مثال: 600"
                    className="w-full px-3.5 py-2 border border-neutral-300 rounded-xl text-xs font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-800 block">شارة تسويقية (Badge)</label>
                  <select
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    className="w-full px-3.5 py-2 border border-neutral-300 rounded-xl text-xs font-medium bg-white"
                  >
                    <option value="">بدون شارة</option>
                    <option value="وصل حديثاً">وصل حديثاً (New)</option>
                    <option value="الأكثر مبيعاً">الأكثر مبيعاً (Best Seller)</option>
                    <option value="خصم مميز">خصم مميز (Sale)</option>
                  </select>
                </div>
              </div>

              {/* Colors & Multi-Photo Management Section */}
              <div className="border-t border-neutral-200 pt-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-neutral-900">
                    🎨 إدارة الألوان والصور المربوطة بكل لون:
                  </h4>
                </div>

                {/* Add new color toolbar */}
                <div className="flex items-center gap-2 p-3 bg-neutral-50 rounded-2xl border border-neutral-200">
                  <input
                    type="text"
                    value={newColorName}
                    onChange={(e) => setNewColorName(e.target.value)}
                    placeholder="اسم اللون الجديد (مثال: زيتي)"
                    className="flex-1 px-3 py-1.5 border border-neutral-300 rounded-lg text-xs"
                  />
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-neutral-500">الكود:</span>
                    <input
                      type="color"
                      value={newColorHex}
                      onChange={(e) => setNewColorHex(e.target.value)}
                      className="w-8 h-8 rounded border border-neutral-300 cursor-pointer"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddColorToForm}
                    className="px-3.5 py-1.5 bg-neutral-900 text-white rounded-lg text-xs font-bold hover:bg-neutral-800 transition"
                  >
                    + إضافة اللون
                  </button>
                </div>

                {/* Color Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {formColors.map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setActiveColorTabId(color.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 border transition ${
                        activeColorTabId === color.id
                          ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                          : 'bg-white text-neutral-700 border-neutral-200'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-neutral-300 inline-block"
                        style={{ backgroundColor: color.hex_code }}
                      />
                      <span>{color.color_name}</span>
                      <span className="text-[10px] opacity-70">({color.photos.length} صور)</span>
                    </button>
                  ))}
                </div>

                {/* Active Color Manager Box */}
                {activeColorTabId && (() => {
                  const activeColor = formColors.find(c => c.id === activeColorTabId);
                  if (!activeColor) return null;

                  return (
                    <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-neutral-900">
                          ألبوم صور اللون: <strong>{activeColor.color_name}</strong>
                        </span>

                        <label className="flex items-center gap-2 text-xs font-bold text-neutral-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={activeColor.is_active}
                            onChange={(e) => {
                              setFormColors(formColors.map(c => 
                                c.id === activeColor.id ? { ...c, is_active: e.target.checked } : c
                              ));
                            }}
                          />
                          <span>اللون متاح ونشط بالموقع</span>
                        </label>
                      </div>

                      {/* Add photo by URL */}
                      <div className="flex items-center gap-2">
                        <input
                          type="url"
                          value={newPhotoUrl}
                          onChange={(e) => setNewPhotoUrl(e.target.value)}
                          placeholder="ضع رابط صورة عالية الجودة لهذا اللون (Unsplash أو رابط سحابي)..."
                          className="flex-1 px-3 py-1.5 border border-neutral-300 rounded-lg text-xs"
                        />
                        <button
                          type="button"
                          onClick={handleAddPhotoToActiveColor}
                          className="px-3.5 py-1.5 bg-neutral-900 text-white rounded-lg text-xs font-bold hover:bg-neutral-800"
                        >
                          + ربط الصورة
                        </button>
                      </div>

                      {/* Photos grid */}
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {activeColor.photos.map((photo) => (
                          <div key={photo.id} className="relative aspect-[3/4] rounded-xl overflow-hidden border border-neutral-200 bg-white group">
                            <img src={photo.url} alt="Variant" className="w-full h-full object-cover" />
                            
                            {photo.is_cover && (
                              <span className="absolute top-1 right-1 z-10 px-1.5 py-0.5 bg-emerald-600 text-white text-[9px] font-bold rounded">
                                الغلاف
                              </span>
                            )}

                            <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-1.5 p-2 text-white">
                              {!photo.is_cover && (
                                <button
                                  type="button"
                                  onClick={() => handleSetCoverPhoto(activeColor.id, photo.id)}
                                  className="px-2 py-1 bg-white text-neutral-900 text-[10px] font-bold rounded"
                                >
                                  اجعلها الغلاف
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => handleRemovePhoto(activeColor.id, photo.id)}
                                className="text-red-400 hover:text-red-300 p-1 text-[10px]"
                              >
                                حذف الصورة
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  );
                })()}

              </div>

              {/* Submit / Cancel Buttons */}
              <div className="border-t border-neutral-200 pt-5 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2.5 bg-neutral-100 text-neutral-700 font-bold rounded-xl text-xs hover:bg-neutral-200"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white font-bold rounded-xl text-xs shadow-md"
                >
                  حفظ المنتج والتحديث بالموقع
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
