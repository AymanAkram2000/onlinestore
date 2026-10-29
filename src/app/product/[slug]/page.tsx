'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { StoreRepository } from '@/lib/store';
import { Product, ColorVariant, SizeVariant } from '@/types';
import { useCart } from '@/context/CartContext';
import SizeGuideModal from '@/components/SizeGuideModal';
import { 
  ShoppingBag, 
  ArrowRight, 
  Check, 
  Ruler, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorVariant | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<SizeVariant | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const { addToCart } = useCart();

  useEffect(() => {
    if (!slug) return;
    const prod = StoreRepository.getProductBySlug(slug);
    if (prod) {
      setProduct(prod);

      // Check query param for initial color
      const requestedColorId = searchParams.get('color');
      const initialColor = 
        prod.colors.find(c => c.id === requestedColorId && c.is_active) || 
        prod.colors.find(c => c.is_active) || 
        prod.colors[0];

      setSelectedColor(initialColor);
      setSelectedPhotoIndex(0);

      // Select first available size of this color
      if (initialColor && initialColor.sizes) {
        const firstAvailableSize = initialColor.sizes.find(s => s.is_available) || initialColor.sizes[0];
        setSelectedSize(firstAvailableSize || null);
      }
    }
  }, [slug, searchParams]);

  // When selected color changes, update photo and default size
  const handleColorChange = (color: ColorVariant) => {
    if (!color.is_active) return;
    setSelectedColor(color);
    setSelectedPhotoIndex(0);
    setValidationError(null);

    // Pick first available size for the new color
    const firstAvailable = color.sizes.find(s => s.is_available) || color.sizes[0];
    setSelectedSize(firstAvailable || null);
  };

  const handleAddToCart = () => {
    if (!product || !selectedColor) return;

    if (!selectedSize || !selectedSize.is_available) {
      setValidationError('يرجى اختيار مقاس متوفر لإضافته إلى السلة');
      return;
    }

    setValidationError(null);
    setIsAdding(true);

    const coverPhoto = 
      selectedColor.photos[selectedPhotoIndex]?.url || 
      selectedColor.photos.find(p => p.is_cover)?.url || 
      selectedColor.photos[0]?.url || 
      '';

    // Add to cart context
    addToCart({
      product_id: product.id,
      product_title: product.title,
      product_slug: product.slug,
      color_id: selectedColor.id,
      color_name: selectedColor.color_name,
      color_hex: selectedColor.hex_code,
      size_id: selectedSize.id,
      size_name: selectedSize.size_name,
      unit_price: product.base_price,
      quantity: 1,
      image_url: coverPhoto
    });

    // Smoothly redirect back to all products catalog so the customer can keep shopping!
    setTimeout(() => {
      router.push('/catalog');
    }, 500);
  };

  if (!product || !selectedColor) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-neutral-600">جاري تحميل تفاصيل المنتج...</p>
      </div>
    );
  }

  const currentPhotos = selectedColor.photos.length > 0 ? selectedColor.photos : [
    { id: 'def', url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80', is_cover: true, sort_order: 1 }
  ];

  const mainPhotoUrl = currentPhotos[selectedPhotoIndex]?.url || currentPhotos[0]?.url;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-medium text-neutral-500 mb-8">
        <Link href="/" className="hover:text-black transition">الرئيسية</Link>
        <span>/</span>
        <Link href="/catalog" className="hover:text-black transition">جميع المنتجات</Link>
        <span>/</span>
        <Link href={`/catalog?category=${product.category_id}`} className="hover:text-black transition">
          {product.category_name || 'ملابس'}
        </Link>
        <span>/</span>
        <span className="text-neutral-900 font-bold truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main Grid: Gallery on right, Details on left (RTL) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        
        {/* Photo Gallery (7 Cols on LG) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Selected Image */}
          <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-xs">
            {product.badge && (
              <span className="absolute top-4 right-4 z-10 px-3 py-1.5 text-xs font-bold rounded-lg bg-neutral-950/85 text-white backdrop-blur-xs">
                {product.badge}
              </span>
            )}
            <img
              src={mainPhotoUrl}
              alt={`${product.title} - ${selectedColor.color_name}`}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
          </div>

          {/* Color-specific Thumbnails Bar */}
          {currentPhotos.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {currentPhotos.map((photo, idx) => (
                <button
                  key={photo.id}
                  onClick={() => setSelectedPhotoIndex(idx)}
                  className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                    selectedPhotoIndex === idx 
                      ? 'border-neutral-950 ring-2 ring-neutral-950/20 scale-105 shadow-sm' 
                      : 'border-neutral-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={photo.url}
                    alt={`زاوية ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details & Actions (5 Cols on LG) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="space-y-6">
            
            {/* Title & Category */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                {product.category_name}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 mt-1 leading-snug">
                {product.title}
              </h1>
            </div>

            {/* Price Area */}
            <div className="flex items-baseline gap-3 p-4 bg-neutral-50 rounded-2xl border border-neutral-200/80">
              <span className="text-3xl font-black text-neutral-950">
                {product.base_price} ج.م
              </span>
              {product.compare_at_price && product.compare_at_price > product.base_price && (
                <span className="text-sm font-semibold text-neutral-400 line-through">
                  {product.compare_at_price} ج.م
                </span>
              )}
              <span className="mr-auto text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full">
                شامل الضريبة
              </span>
            </div>

            {/* Description */}
            <div className="text-neutral-600 text-sm leading-relaxed border-b border-neutral-200/80 pb-6">
              {product.description}
            </div>

            {/* 1. Color Selector (Dynamic photos per color & Faded Inactive state) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-neutral-900">
                  اللون المختار: <strong className="text-neutral-950 font-black">{selectedColor.color_name}</strong>
                </span>
                <span className="text-xs text-neutral-400">
                  ({product.colors.filter(c => c.is_active).length} ألوان متوفرة)
                </span>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                {product.colors.map((color) => {
                  const isSelected = color.id === selectedColor.id;
                  const isDisabled = !color.is_active;

                  return (
                    <button
                      key={color.id}
                      type="button"
                      disabled={isDisabled}
                      onClick={() => handleColorChange(color)}
                      className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all ${
                        isSelected
                          ? 'border-neutral-950 bg-neutral-950 text-white shadow-sm'
                          : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400'
                      } ${isDisabled ? 'opacity-35 bg-neutral-100 cursor-not-allowed border-dashed' : ''}`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-neutral-300 shadow-xs"
                        style={{ backgroundColor: color.hex_code }}
                      />
                      <span>{color.color_name}</span>
                      {isDisabled && (
                        <span className="text-[10px] text-red-600 font-semibold bg-red-50 px-1 rounded">
                          (غير متوفر)
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Size Selector (Out-of-Stock Strikethrough & Size Guide) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-neutral-900">
                  المقاس: <strong className="text-neutral-950 font-black">{selectedSize?.size_name || 'اختر المقاس'}</strong>
                </span>

                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="flex items-center gap-1.5 text-xs font-bold text-neutral-800 hover:text-neutral-950 underline underline-offset-4"
                >
                  <Ruler className="w-3.5 h-3.5 text-amber-600" />
                  <span>جدول المقاسات 📏</span>
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
                {selectedColor.sizes.map((sz) => {
                  const isSelected = selectedSize?.id === sz.id;
                  const isAvailable = sz.is_available;

                  return (
                    <button
                      key={sz.id}
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => {
                        setSelectedSize(sz);
                        setValidationError(null);
                      }}
                      className={`relative py-3 rounded-xl border text-xs font-extrabold transition-all flex flex-col items-center justify-center gap-0.5 ${
                        isSelected
                          ? 'border-neutral-950 bg-neutral-950 text-white shadow-md'
                          : isAvailable
                          ? 'border-neutral-200 bg-white text-neutral-900 hover:border-neutral-950'
                          : 'border-neutral-200 bg-neutral-100 text-neutral-400 opacity-40 cursor-not-allowed'
                      }`}
                    >
                      <span className={!isAvailable ? 'line-through' : ''}>{sz.size_name}</span>
                      {!isAvailable && (
                        <span className="text-[9px] text-red-500 font-semibold">نفد</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Validation Error Message */}
            {validationError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-bold text-red-700 animate-shake">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Add to Cart CTA */}
            <div className="space-y-3 pt-4">
              <button
                type="button"
                disabled={isAdding || !selectedSize?.is_available}
                onClick={handleAddToCart}
                className="w-full py-4 px-6 bg-neutral-950 hover:bg-neutral-800 text-white font-extrabold rounded-2xl shadow-xl flex items-center justify-center gap-3 transition active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                <span>{isAdding ? 'جاري الإضافة...' : 'إضافة إلى السلة ومتابعة التسوق'}</span>
              </button>

              <p className="text-[11px] text-center text-neutral-500 font-medium">
                🔄 بعد الإضافة سيتم نقلك تلقائياً لتصفح باقي المنتجات مع بقاء سلتك محفوظة بأعلى الصفحة.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="border-t border-neutral-200 pt-6 space-y-2.5 text-xs text-neutral-600">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-neutral-800" />
                <span>توصيل سريع خلال 24 - 48 ساعة بالقاهرة والجيزة</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-neutral-800" />
                <span>معاينة القطعة وتجربتها أمام مندوب الشحن قبل الدفع</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RefreshCw className="w-4 h-4 text-neutral-800" />
                <span>استبدال مجاني للمقاسات في حال عدم المطابقة</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        categoryName={product.category_name}
      />
    </main>
  );
}
