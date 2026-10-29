'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, ShieldCheck, Menu, X, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { totalCount, isCartDrawerOpen, setIsCartDrawerOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-200/80 transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-neutral-900 text-neutral-100 text-xs py-1.5 px-4 text-center font-medium tracking-wide">
        <span>✨ شحن مجاني لجميع محافظات مصر للطلبات فوق 999 ج.م • الدفع عند الاستلام متاح</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Right: Brand Logo */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-extrabold text-2xl tracking-tighter text-neutral-950 group-hover:opacity-80 transition">
                ATELIER
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 bg-neutral-100 border border-neutral-300 rounded text-neutral-800 tracking-wider">
                أزياء فاخرة
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-700">
            <Link href="/" className="hover:text-black transition">الرئيسية</Link>
            <Link href="/catalog" className="hover:text-black transition">جميع المنتجات</Link>
            <Link href="/catalog?category=hoodies" className="hover:text-black transition">هوديز</Link>
            <Link href="/catalog?category=t-shirts" className="hover:text-black transition">تيشيرتات</Link>
            <Link href="/catalog?category=shirts" className="hover:text-black transition">قمصان</Link>
            <Link href="/catalog?category=pants" className="hover:text-black transition">بناطيل</Link>
          </nav>

          {/* Left: Actions (Admin & Cart) */}
          <div className="flex items-center gap-3">
            <Link 
              href="/admin" 
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-full transition border border-neutral-200"
              title="لوحة تحكم صاحب المتجر"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">لوحة التحكم</span>
            </Link>

            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-neutral-950 text-white hover:bg-neutral-800 transition active:scale-95 shadow-sm"
              aria-label="سلة المشتريات"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-bold hidden sm:inline">السلة</span>
              {totalCount > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-[11px] font-bold bg-amber-400 text-neutral-950 rounded-full">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-neutral-900 border-b border-neutral-100"
          >
            الرئيسية
          </Link>
          <Link 
            href="/catalog" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-neutral-900 border-b border-neutral-100"
          >
            جميع المنتجات (الكتالوج)
          </Link>
          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link 
              href="/catalog?category=hoodies" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 bg-neutral-50 rounded-lg text-sm font-medium text-neutral-800"
            >
              هوديز وسويت شيرت
            </Link>
            <Link 
              href="/catalog?category=t-shirts" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 bg-neutral-50 rounded-lg text-sm font-medium text-neutral-800"
            >
              تيشيرتات صيفية
            </Link>
            <Link 
              href="/catalog?category=shirts" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 bg-neutral-50 rounded-lg text-sm font-medium text-neutral-800"
            >
              قمصان كلاسيك وكاجوال
            </Link>
            <Link 
              href="/catalog?category=pants" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 bg-neutral-50 rounded-lg text-sm font-medium text-neutral-800"
            >
              بناطيل وكارجو
            </Link>
          </div>
          <div className="pt-2">
            <Link 
              href="/admin" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-neutral-900 text-white text-sm font-bold rounded-xl"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              الدخول للوحة تحكم صاحب المتجر
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
