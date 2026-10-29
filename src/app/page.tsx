'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StoreRepository } from '@/lib/store';
import { Product, Category } from '@/types';
import ProductCard from '@/components/ProductCard';
import { ArrowLeft, Sparkles, ShieldCheck, Truck, RefreshCw, Flame, Heart } from 'lucide-react';

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
        {/* Background Image: Elegant Modest Fashion */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen">
          <img
            src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1920&q=80"
            alt="HAYAA Modest Fashion"
            className="w-full h-full object-cover object-center scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/75 to-transparent z-1" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center sm:text-right">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-rose-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>تشكيلة الحشمة والوقار • خريف وشتاء 2026</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.18] text-white">
              أناقة الحشمة <br />
              <span className="text-rose-200/90 font-normal text-3xl sm:text-5xl">بقصات سابغة وخامات ملكية</span>
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl">
              اكتشفي أرقى تصاميم العبايات الخليجية، دريسات الكلوش الواسعة، أطقم الخمارات والنقابات الماليزية، ومجموعات الطرح الشيفون والكريب الفاخرة.
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
              <Link
                href="/catalog"
                className="px-8 py-4 bg-white text-neutral-950 rounded-2xl font-extrabold text-sm hover:bg-neutral-100 transition active:scale-95 shadow-xl flex items-center gap-2 group"
              >
                <span>تسوقي التشكيلة الآن</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/catalog?category=abayas-dresses"
                className="px-6 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold text-sm transition"
              >
                العبايات والدريسات
              </Link>
            </div>

            {/* Micro Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-xs text-neutral-300 font-medium">
              <div>🌸 خامات لا تشف ولا تصف</div>
              <div>✨ معاينة قبل الاستلام والدفع</div>
              <div>🚚 شحن مجاني فوق 999 ج.م</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Visual Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
              أقسام وتصنيفات المتجر
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              تصفحي حسب رغبتك بين العبايات، الخمارات، الطرح، والإكسسوارات
            </p>
          </div>
          <Link href="/catalog" className="text-xs font-bold text-neutral-900 hover:underline">
            عرض كل الأقسام ←
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
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/25 to-transparent" />

              <div className="absolute inset-x-4 bottom-4 text-white">
                <h3 className="font-bold text-base sm:text-lg group-hover:translate-x-1 transition-transform">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-neutral-300 mt-0.5 inline-block opacity-0 group-hover:opacity-100 transition-opacity">
                  تصفحي التشكيلة ←
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
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 mb-1">
              <Flame className="w-4 h-4 fill-current" />
              <span>الأكثر طلباً ومبيعاً هذا الموسم</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
              قطع محتشمة حصرية ومميزة
            </h2>
          </div>

          <Link
            href="/catalog"
            className="self-start sm:self-auto px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-bold rounded-full transition flex items-center gap-1.5"
          >
            <span>مشاهدة كل المنتجات</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 4. Modest Fabric & Quality Story Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-neutral-900 text-white p-8 sm:p-14 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-neutral-800">
          <div className="max-w-xl space-y-4 text-center md:text-right">
            <span className="text-xs font-bold text-rose-300 tracking-wider">
              سر الجودة والأناقة الشرعية
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              لماذا تختارين أزياء متجر حياء؟
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              نختار بعناية فائقة أقمشة الكريب الملكي المستورد فاحم السواد، والكتان التركي الطبيعي، والشيفون الكريب المنسدل. نضمن لكِ خامات ثقيلة غير شفافة تماماً ولا تلتصق بالجسم، لتنعمي براحة ووقار يدوم لسنوات.
            </p>
            <div className="pt-2">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-neutral-100 text-neutral-950 rounded-xl font-bold text-xs transition"
              >
                <span>تصفحي الكتالوج الكامل</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="w-full md:w-80 aspect-square rounded-2xl overflow-hidden border border-neutral-700 shadow-2xl flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=600&q=80"
              alt="Modest Fabric"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
