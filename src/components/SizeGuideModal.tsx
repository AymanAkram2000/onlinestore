'use client';

import React from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName?: string;
}

export default function SizeGuideModal({ isOpen, onClose, categoryName = 'الملابس' }: SizeGuideModalProps) {
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
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-800">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900">جدول المقاسات الدقيق</h3>
              <p className="text-xs text-neutral-500">القياسات بالسنتمتر (cm) لأفضل ملاءمة لمقاسك</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-800 rounded-full hover:bg-neutral-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Size Chart Table */}
        <div className="overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-center text-xs text-neutral-800">
            <thead className="bg-neutral-50 border-b border-neutral-200 font-bold text-neutral-900">
              <tr>
                <th className="py-3 px-3">المقاس</th>
                <th className="py-3 px-3">عرض الصدر (سم)</th>
                <th className="py-3 px-3">الطول الكلي (سم)</th>
                <th className="py-3 px-3">الوزن التقريبي (كجم)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-medium">
              <tr>
                <td className="py-3 px-3 font-bold bg-neutral-50/50">Small (S)</td>
                <td className="py-3 px-3">52 - 54</td>
                <td className="py-3 px-3">68</td>
                <td className="py-3 px-3">50 - 65 كجم</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold bg-neutral-50/50">Medium (M)</td>
                <td className="py-3 px-3">55 - 57</td>
                <td className="py-3 px-3">71</td>
                <td className="py-3 px-3">65 - 75 كجم</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold bg-neutral-50/50">Large (L)</td>
                <td className="py-3 px-3">58 - 60</td>
                <td className="py-3 px-3">74</td>
                <td className="py-3 px-3">75 - 85 كجم</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold bg-neutral-50/50">X-Large (XL)</td>
                <td className="py-3 px-3">61 - 63</td>
                <td className="py-3 px-3">77</td>
                <td className="py-3 px-3">85 - 95 كجم</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold bg-neutral-50/50">2X-Large (XXL)</td>
                <td className="py-3 px-3">64 - 67</td>
                <td className="py-3 px-3">80</td>
                <td className="py-3 px-3">95 - 110 كجم</td>
              </tr>
              <tr className="bg-amber-50/40 text-amber-900 font-bold">
                <td className="py-3 px-3">Oversize (أوفرسايز)</td>
                <td className="py-3 px-3">62 - 68</td>
                <td className="py-3 px-3">75 - 80</td>
                <td className="py-3 px-3">قصة مريحة واسعة تناسب الجميع</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Tip box */}
        <div className="mt-5 p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs text-neutral-600 space-y-1">
          <p className="font-bold text-neutral-900">💡 نصيحة لاختيار المقاس المثالي:</p>
          <p>قم بقياس أفضل تيشيرت أو هودي لديك من تحت الإبط إلى الإبط الآخر وقارنه بالجدول أعلاه لضمان مقاس مناسب 100%.</p>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 bg-neutral-950 text-white rounded-xl text-xs font-bold hover:bg-neutral-800 transition"
        >
          فهمت ذلك، العودة للاختيار
        </button>
      </div>
    </div>
  );
}
