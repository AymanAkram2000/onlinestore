'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, RefreshCw, MessageSquare, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 border-t border-neutral-800 mt-20">
      {/* Guarantees Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-neutral-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-right">
          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-amber-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">توصيل سريع لكافة المحافظات</h4>
              <p className="text-xs text-neutral-400">شحن مجاني للطلبات فوق 999 ج.م</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">خامات ساترة لا تشف 100%</h4>
              <p className="text-xs text-neutral-400">معاينة القطعة أمام المندوب قبل الدفع</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-rose-400">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">استبدال سهل للمقاسات</h4>
              <p className="text-xs text-neutral-400">إمكانية تبديل المقاس بكل سهولة ويسر</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-purple-400">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">تأكيد مباشر عبر واتساب</h4>
              <p className="text-xs text-neutral-400">خدمة عملاء مباشرة للإجابة على استفساراتك</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-black text-2xl tracking-tighter text-white">
                HAYAA
              </span>
              <span className="text-xs font-bold text-rose-400">حياء • أزياء محتشمة</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              براند مصري راقٍ متخصص في تصميم أزياء المحجبات والمنقبات، عبايات كريب خليجية، خمارات ونقابات إسلامية، ومجموعات الطرح والإكسسوارات الفاخرة بأعلى مواصفات الحشمة والوقار.
            </p>
          </div>

          <div>
            <h5 className="text-sm font-bold text-white mb-4">أقسام المتجر</h5>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><Link href="/catalog?category=abayas-dresses" className="hover:text-white transition">عبايات ودريسات محجبات</Link></li>
              <li><Link href="/catalog?category=niqab-khimar" className="hover:text-white transition">نقابات وخمارات إسلامية</Link></li>
              <li><Link href="/catalog?category=tarha-scarves" className="hover:text-white transition">طرح وشالات فاخرة</Link></li>
              <li><Link href="/catalog?category=accessories" className="hover:text-white transition">إكسسوارات الحجاب وبندانات</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-bold text-white mb-4">روابط سريعة</h5>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><Link href="/catalog" className="hover:text-white transition">جميع المعروضات</Link></li>
              <li><Link href="/admin" className="hover:text-white transition">لوحة تحكم صاحب المتجر</Link></li>
              <li><Link href="/checkout" className="hover:text-white transition">سلة الشراء وإنهاء الطلب</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-bold text-white mb-4">طرق الدفع والتأكيد</h5>
            <div className="space-y-2 text-xs text-neutral-400">
              <p>• الدفع عند الاستلام نقداً (COD)</p>
              <p>• التحويل المباشر عبر إنستاباي (InstaPay)</p>
              <p>• فودافون كاش ومحافظ المحمول</p>
              <div className="pt-2">
                <span className="inline-block px-3 py-1 bg-neutral-800 rounded-lg text-emerald-400 font-semibold text-[11px]">
                  ✓ متجر معتمد وآمن 100%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 text-center text-xs text-neutral-500">
          جميع الحقوق محفوظة © {new Date().getFullYear()} HAYAA Modest Fashion Store.
        </div>
      </div>
    </footer>
  );
}
