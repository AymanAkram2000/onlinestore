'use client';

import React, { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { CheckCircle2, X, ShoppingBag } from 'lucide-react';

export default function ToastBanner() {
  const { toastMessage, clearToast, setIsCartDrawerOpen } = useCart();

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      clearToast();
    }, 4500);
    return () => clearTimeout(timer);
  }, [toastMessage, clearToast]);

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-neutral-950 text-white rounded-2xl p-4 shadow-2xl border border-neutral-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <p className="text-xs font-medium text-neutral-200 line-clamp-2">
            {toastMessage}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => {
              clearToast();
              setIsCartDrawerOpen(true);
            }}
            className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold rounded-lg transition"
          >
            السلة
          </button>
          <button
            onClick={clearToast}
            className="text-neutral-400 hover:text-white p-1 rounded transition"
            aria-label="إغلاق الإشعار"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
