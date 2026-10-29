'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/store';

export default function CartDrawer() {
  const { items, isCartDrawerOpen, setIsCartDrawerOpen, removeFromCart, updateQuantity, subtotal, totalCount } = useCart();

  if (!isCartDrawerOpen) return null;

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-neutral-900" />
              <h2 className="text-lg font-bold text-neutral-900">سلة مشترياتك ({totalCount})</h2>
            </div>
            <button 
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-2 text-neutral-500 hover:text-neutral-900 rounded-full hover:bg-neutral-200/60 transition"
              aria-label="إغلاق السلة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free shipping progress bar */}
          <div className="bg-amber-50/70 border-b border-amber-200/60 px-5 py-3 text-xs">
            {remainingForFreeShipping > 0 ? (
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-amber-900 font-medium">
                  <Truck className="w-4 h-4 text-amber-600" />
                  <span>أضف بـ <strong>{remainingForFreeShipping} ج.م</strong> إضافية للحصول على <strong>شحن مجاني</strong>!</span>
                </div>
                <div className="w-full bg-amber-200/80 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-amber-600 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>تهانينا! طلبيتك مؤهلة لـ <strong>شحن مجاني</strong> بالكامل 🎉</span>
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-neutral-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mb-4 text-neutral-400">
                  <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                </div>
                <h3 className="text-base font-bold text-neutral-800 mb-1">السلة فارغة حالياً</h3>
                <p className="text-xs text-neutral-500 max-w-xs mb-6">
                  لم تقم بإضافة أي قطع بعد. استكشف تشكيلتنا الفاخرة واختر ملابسك المفضلة الآن!
                </p>
                <Link
                  href="/catalog"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="px-6 py-2.5 bg-neutral-900 text-white rounded-full text-xs font-bold hover:bg-neutral-800 transition"
                >
                  تصفح المنتجات الآن
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-start group">
                  <div className="relative w-20 h-24 rounded-lg bg-neutral-100 overflow-hidden flex-shrink-0 border border-neutral-200">
                    <img 
                      src={item.image_url} 
                      alt={item.product_title} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-300"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-neutral-900 truncate">
                      {item.product_title}
                    </h4>

                    <div className="flex items-center gap-2 mt-1 text-xs text-neutral-600">
                      <span className="flex items-center gap-1">
                        <span 
                          className="w-3 h-3 rounded-full border border-neutral-300 inline-block" 
                          style={{ backgroundColor: item.color_hex }}
                        />
                        {item.color_name}
                      </span>
                      <span>•</span>
                      <span className="bg-neutral-100 px-1.5 py-0.5 rounded text-[11px] font-semibold text-neutral-700">
                        مقاس: {item.size_name}
                      </span>
                    </div>

                    <div className="text-sm font-extrabold text-neutral-900 mt-2">
                      {item.unit_price} ج.م
                    </div>

                    {/* Quantity & Delete Controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-neutral-300 rounded-lg bg-white overflow-hidden shadow-xs">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-neutral-600 hover:bg-neutral-100 transition"
                          aria-label="تقليل العدد"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-neutral-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-neutral-600 hover:bg-neutral-100 transition"
                          aria-label="زيادة العدد"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-neutral-400 hover:text-red-600 p-1 rounded transition"
                        title="حذف القطعة"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Actions */}
          {items.length > 0 && (
            <div className="p-5 border-t border-neutral-200 bg-neutral-50 space-y-3">
              <div className="flex items-center justify-between text-base font-bold text-neutral-900">
                <span>المجموع الفرعي:</span>
                <span className="text-lg">{subtotal} ج.م</span>
              </div>
              <p className="text-[11px] text-neutral-500">
                * تكلفة الشحن النهائية يتم حسابها حسب محافظتك في الخطوة التالية.
              </p>

              <div className="space-y-2 pt-1">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-neutral-950 text-white font-bold rounded-xl hover:bg-neutral-800 transition active:scale-98 shadow-md"
                >
                  <span>إتمام الطلب والشراء الآن</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full py-2.5 bg-transparent border border-neutral-300 text-neutral-800 font-semibold rounded-xl text-xs hover:bg-neutral-100 transition"
                >
                  متابعة التسوق وإضافة منتجات أخرى
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
