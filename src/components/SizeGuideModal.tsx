'use client';

import React from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName?: string;
}

export default function SizeGuideModal({ isOpen, onClose, categoryName = 'العبايات والدريسات' }: SizeGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 z-10 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-700">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900">دليل مقاسات العبايات والدريسات</h3>
              <p className="text-xs text-neutral-500">اختر مقاس العباية الخليجية بناءً على طولك الإجمالي بالسنتمتر</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-800 rounded-full hover:bg-neutral-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Abaya Sizing Chart */}
        <div className="space-y-4">
          <span className="text-xs font-bold text-neutral-800 block">1. جدول مقاسات العبايات الخليجية (حسب الطول):</span>
          <div className="overflow-x-auto rounded-xl border border-neutral-200">
            <table className="w-full text-center text-xs text-neutral-800">
              <thead className="bg-neutral-50 border-b border-neutral-200 font-bold text-neutral-900">
                <tr>
                  <th className="py-2.5 px-3">رقم المقاس</th>
                  <th className="py-2.5 px-3">طول العباية (بوصة / سم)</th>
                  <th className="py-2.5 px-3">طول قامتك المناسب</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 font-medium">
                <tr>
                  <td className="py-2.5 px-3 font-bold bg-neutral-50/50">مقاس 52</td>
                  <td className="py-2.5 px-3">132 سم (52 بوصة)</td>
                  <td className="py-2.5 px-3">150 - 155 سم</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold bg-neutral-50/50">مقاس 54</td>
                  <td className="py-2.5 px-3">137 سم (54 بوصة)</td>
                  <td className="py-2.5 px-3">155 - 160 سم</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold bg-neutral-50/50">مقاس 56</td>
                  <td className="py-2.5 px-3">142 سم (56 بوصة)</td>
                  <td className="py-2.5 px-3">160 - 165 سم</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold bg-neutral-50/50">مقاس 58</td>
                  <td className="py-2.5 px-3">147 سم (58 بوصة)</td>
                  <td className="py-2.5 px-3">165 - 170 سم</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold bg-neutral-50/50">مقاس 60</td>
                  <td className="py-2.5 px-3">152 سم (60 بوصة)</td>
                  <td className="py-2.5 px-3">170 - 175 سم</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Dresses Sizing Chart */}
          <span className="text-xs font-bold text-neutral-800 block pt-2">2. جدول مقاسات الدريسات الكلوش (حسب الوزن):</span>
          <div className="overflow-x-auto rounded-xl border border-neutral-200">
            <table className="w-full text-center text-xs text-neutral-800">
              <thead className="bg-neutral-50 border-b border-neutral-200 font-bold text-neutral-900">
                <tr>
                  <th className="py-2 px-3">المقاس</th>
                  <th className="py-2 px-3">محيط الصدر</th>
                  <th className="py-2 px-3">الوزن التقريبي</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 font-medium">
                <tr>
                  <td className="py-2 px-3 font-bold">مقاس 1</td>
                  <td className="py-2 px-3">حتى 108 سم</td>
                  <td className="py-2 px-3">من 50 إلى 70 كجم</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold">مقاس 2</td>
                  <td className="py-2 px-3">حتى 118 سم</td>
                  <td className="py-2 px-3">من 70 إلى 90 كجم</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold">مقاس 3</td>
                  <td className="py-2 px-3">حتى 130 سم</td>
                  <td className="py-2 px-3">من 90 إلى 110 كجم</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tip box */}
        <div className="mt-5 p-3.5 bg-rose-50/60 rounded-2xl border border-rose-200/80 text-xs text-rose-900 space-y-1">
          <p className="font-bold">🌸 ملاحظة الحشمة والأناقة:</p>
          <p>جميع عباياتنا ودريساتنا مصممة بقصات فضفاضة ومحتشمة (Over-Free Cut) بحيث لا تحدد الجسم إطلاقاً، وتمنحك وقاراً وحرية تامة في الحركة.</p>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 bg-neutral-950 text-white rounded-xl text-xs font-bold hover:bg-neutral-800 transition"
        >
          حسناً، فهمت المقاس المناسب
        </button>
      </div>
    </div>
  );
}
