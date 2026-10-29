'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product, ColorVariant } from '@/types';
import { Eye, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Find the first active color, or fallback to first color
  const defaultColor = product.colors.find(c => c.is_active) || product.colors[0];
  const [selectedColor, setSelectedColor] = useState<ColorVariant>(defaultColor);

  // Active cover photo for the currently selected color
  const currentCoverPhoto = 
    selectedColor.photos.find(p => p.is_cover)?.url || 
    selectedColor.photos[0]?.url || 
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80';

  const hasDiscount = product.compare_at_price && product.compare_at_price > product.base_price;
  const discountPercent = hasDiscount 
    ? Math.round(((product.compare_at_price! - product.base_price) / product.compare_at_price!) * 100) 
    : 0;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-neutral-200/90 luxury-card flex flex-col justify-between">
      
      {/* Top Image Area */}
      <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden">
        {/* Marketing Badge */}
        {product.badge && (
          <span className="absolute top-3 right-3 z-10 px-2.5 py-1 text-[11px] font-bold rounded-md bg-neutral-950/85 text-white backdrop-blur-xs tracking-wide">
            {product.badge}
          </span>
        )}

        {/* Discount Badge */}
        {hasDiscount && (
          <span className="absolute top-3 left-3 z-10 px-2 py-0.5 text-[11px] font-extrabold rounded-md bg-red-600 text-white">
            -{discountPercent}%
          </span>
        )}

        {/* Product Image linked to selected color */}
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={currentCoverPhoto}
            alt={`${product.title} - ${selectedColor.color_name}`}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Hover Quick Action overlay */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex gap-2">
          <Link
            href={`/product/${product.slug}?color=${selectedColor.id}`}
            className="flex-1 py-2.5 px-3 bg-white/95 backdrop-blur-xs hover:bg-neutral-950 hover:text-white text-neutral-900 text-xs font-bold rounded-xl shadow-lg flex items-center justify-center gap-1.5 transition"
          >
            <Eye className="w-4 h-4" />
            <span>عرض التفاصيل واختيار المقاس</span>
          </Link>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Tag */}
          <span className="text-[11px] font-semibold text-neutral-400 block mb-1">
            {product.category_name || 'ملابس'}
          </span>

          {/* Product Title */}
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-bold text-sm sm:text-base text-neutral-900 line-clamp-1 group-hover:text-neutral-700 transition">
              {product.title}
            </h3>
          </Link>

          {/* Interactive Color Swatches */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[11px] text-neutral-400 font-medium">الألوان:</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {product.colors.map((color) => {
                const isSelected = color.id === selectedColor.id;
                const isDisabled = !color.is_active;

                return (
                  <button
                    key={color.id}
                    type="button"
                    title={isDisabled ? `${color.color_name} (غير متوفر)` : color.color_name}
                    disabled={isDisabled}
                    onClick={() => setSelectedColor(color)}
                    onMouseEnter={() => !isDisabled && setSelectedColor(color)}
                    className={`relative w-5 h-5 rounded-full border swatch-ring flex items-center justify-center transition-all ${
                      isSelected 
                        ? 'ring-2 ring-neutral-950 ring-offset-2 scale-110' 
                        : 'border-neutral-300 hover:scale-110'
                    } ${isDisabled ? 'variant-disabled opacity-40' : ''}`}
                    style={{ backgroundColor: color.hex_code }}
                  >
                    {/* Selected inner indicator for white/light colors */}
                    {isSelected && (
                      <span className={`w-1.5 h-1.5 rounded-full ${color.hex_code.toLowerCase() === '#ffffff' ? 'bg-neutral-900' : 'bg-white'}`} />
                    )}
                  </button>
                );
              })}
            </div>
            <span className="text-[11px] text-neutral-600 font-medium mr-auto">
              {selectedColor.color_name}
            </span>
          </div>
        </div>

        {/* Price & Link */}
        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-extrabold text-neutral-950">
              {product.base_price} ج.م
            </span>
            {hasDiscount && (
              <span className="text-xs text-neutral-400 line-through">
                {product.compare_at_price} ج.م
              </span>
            )}
          </div>

          <Link
            href={`/product/${product.slug}?color=${selectedColor.id}`}
            className="sm:hidden text-xs font-bold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-lg transition"
          >
            اختيار
          </Link>
        </div>
      </div>
    </div>
  );
}
