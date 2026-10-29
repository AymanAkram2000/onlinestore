'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StoreRepository } from '@/lib/store';
import { Product, Category } from '@/types';
import ProductCard from '@/components/ProductCard';
import { ArrowLeft, Sparkles, ShieldCheck, Truck, RefreshCw, Flame } from 'lucide-react';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setCategories(StoreRepository.getCategories());
    setFeaturedProducts(StoreRepository.getProducts().slice(0, 4));
  }, []);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. Hero Banner */}
      <section className="relative overflow-hidden bg-neutral-950 text-white min-h-[580px] sm:min-h-[640px] flex items-center">
        {/* Ambient background glow & overlay */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen">
          <img
            src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1920&q=80"
            alt="Atelier Fashion Studio"
            className="w-full h-full object-cover object-center scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent z-1" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center sm:text-right">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>تشكيلة خريف وشتاء 2026 الحصرية</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.15] text-white">
              فن الأناقة العصرية <br />
              <span className="text-neutral-400 font-normal text-3xl sm:text-5xl">بخامات صُممت لتدوم</span>
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl">
              اكتشف أرقى خطوط الأزياء الرجالية والنسائية، المصنعة من القطن المصري الممشط والكتان الطبيعي بأعلى مواصفات الرفاهية العالمية.
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
              <Link
                href="/catalog"
                className="px-8 py-4 bg-white text-neutral-950 rounded-2xl font-extrabold text-sm hover:bg-neutral-200 transition active:scale-95 shadow-xl flex items-center gap-2 group"
              >
                <span>تسوق التشكيلة الآن</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/catalog?category=hoodies"
                className="px-6 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold text-sm transition"
              >
                أفضل الهوديز
              </Link>
            </div>

            {/* Quick Micro-Trust Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-xs text-neutral-300 font-medium">
              <div>• قطن مصري 100%</div>
              <div>• معاينة قبل الاستلام</div>
              <div>• استبدال سهل للمقاسات</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Visual Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
              تسوق حسب القسم
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              اختر الفئة التي تبحث عنها لاستكشاف أحدث التصاميم
            </p>
          </div>
          <Link href="/catalog" className="text-xs font-bold text-neutral-900 hover:underline">
            عرض الجميع ←
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/catalog?category=${cat.slug}`}
              className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-100 shadow-sm border border-neutral-200/80 luxury-card block"
            >
              <img
                src={cat.image_url}
                alt={cat.name}
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />

              <div className="absolute inset-x-4 bottom-4 text-white">
                <h3 className="font-bold text-base sm:text-lg group-hover:translate-x-1 transition-transform">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-neutral-300 mt-0.5 inline-block opacity-0 group-hover:opacity-100 transition-opacity">
                  تصفح القسم ←
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Featured / Best-Seller Products Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 mb-1">
              <Flame className="w-4 h-4 fill-current" />
              <span>الأكثر طلباً هذا الأسبوع</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
              قطع حصرية ومميزة
            </h2>
          </div>

          <Link
            href="/catalog"
            className="self-start sm:self-auto px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-bold rounded-full transition flex items-center gap-1.5"
          >
            <span>مشاهدة كل الملابس</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 4. Luxury Fabric & Quality Story Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-neutral-900 text-white p-8 sm:p-14 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-neutral-800">
          <div className="max-w-xl space-y-4 text-center md:text-right">
            <span className="text-xs font-bold text-amber-400 tracking-wider">
              سر الجودة والفخامة
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              لماذا يختار عملاؤنا أزياء ATELIER؟
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              نختار فقط القطن المصري فائق النعومة والكتان المعالج بأحدث التقنيات لضمان عدم الانكماش أو بهتان الألوان مع مرور الوقت، مع خياطة مزدوجة تمنح القطعة متانة تدوم لسنوات.
            </p>
            <div className="pt-2">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 rounded-xl font-bold text-xs transition"
              >
                <span>ابدأ التسوق الآن</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="w-full md:w-80 aspect-square rounded-2xl overflow-hidden border border-neutral-700 shadow-2xl flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80"
              alt="Quality Fabric"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
