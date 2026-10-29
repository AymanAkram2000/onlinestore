'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { StoreRepository } from '@/lib/store';
import { Product, Category } from '@/types';
import ProductCard from '@/components/ProductCard';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');

  useEffect(() => {
    setCategories(StoreRepository.getCategories());
  }, []);

  useEffect(() => {
    const list = StoreRepository.getProducts({
      categorySlug: selectedCategory,
      search: searchQuery,
      sort: sortBy
    });
    setProducts(list);
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Title & Introduction */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 pb-8 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-rose-700 mb-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>تشكيلة حياء لأزياء المحجبات والمنقبات 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
            جميع المنتجات والتشكيلات المحتشمة
          </h1>
          <p className="text-sm text-neutral-500 mt-2 max-w-xl leading-relaxed">
            استكشفي أحدث العبايات الخليجية، فساتين ودريسات الخروج، الخمارات الماليزية، ومجموعات الطرح والإكسسوارات بأعلى جودة.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-80 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحثي عن عباية، دريس، خمار، طرحة..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-neutral-300 bg-white text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-neutral-950 transition"
          />
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Category Filter Chips & Sort Dropdown */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition flex-shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-neutral-950 text-white shadow-sm'
                : 'bg-white border border-neutral-200 text-neutral-700 hover:border-neutral-400'
            }`}
          >
            جميع المعروضات
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition flex-shrink-0 ${
                selectedCategory === cat.slug
                  ? 'bg-neutral-950 text-white shadow-sm'
                  : 'bg-white border border-neutral-200 text-neutral-700 hover:border-neutral-400'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 self-end">
          <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-xs text-neutral-500 font-medium">الترتيب:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-neutral-200 rounded-lg px-3 py-1.5 text-xs font-bold text-neutral-800 focus:outline-hidden"
          >
            <option value="newest">الأحدث أولاً</option>
            <option value="price-asc">السعر: من الأقل للأعلى</option>
            <option value="price-desc">السعر: من الأعلى للأقل</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-neutral-200 p-8">
          <p className="text-base font-bold text-neutral-800 mb-2">لا توجد قطع مطابقة لبحثك</p>
          <p className="text-xs text-neutral-500 mb-6">جرّبي البحث باسم آخر أو اضغطي على زر جميع المعروضات أعلاه.</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="px-5 py-2.5 bg-neutral-900 text-white text-xs font-bold rounded-full hover:bg-neutral-800 transition"
          >
            إعادة تعيين الفلاتر
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {products.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </main>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />
      </div>
    }>
      <CatalogContent />
    </Suspense>
  );
}
