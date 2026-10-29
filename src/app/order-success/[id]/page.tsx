'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { StoreRepository } from '@/lib/store';
import { Order } from '@/types';
import confetti from 'canvas-confetti';
import { 
  CheckCircle, 
  MessageCircle, 
  ShoppingBag, 
  Truck, 
  Phone, 
  MapPin, 
  Calendar,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';

export default function OrderSuccessPage() {
  const params = useParams();
  const orderId = params?.id as string;
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Fire celebration confetti!
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }

    if (orderId) {
      const orders = StoreRepository.getOrders();
      const found = orders.find(o => o.id === orderId || o.order_number === orderId);
      if (found) {
        setOrder(found);
      }
    }
  }, [orderId]);

  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="w-10 h-10 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin mb-4" />
        <p className="text-xs font-semibold text-neutral-600">جاري تحميل تفاصيل الفاتورة...</p>
      </div>
    );
  }

  const whatsappUrl = StoreRepository.buildWhatsAppOrderMessage(order);

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200 shadow-sm text-center space-y-4 mb-8">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
          <CheckCircle className="w-10 h-10 stroke-[2]" />
        </div>

        <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full inline-block">
          طلب مسجل بنجاح
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-neutral-950">
          شكراً لتسوقك معنا، {order.customer_name}!
        </h1>

        <p className="text-xs sm:text-sm text-neutral-600 max-w-lg mx-auto leading-relaxed">
          تم استلام طلبك رقم <strong className="text-neutral-950 font-black">#{order.order_number}</strong> بنجاح. سيقوم فريقنا بتجهيز طلبيتك والتواصل معك قبل الشحن.
        </p>

        {/* WhatsApp Direct Action Button */}
        <div className="pt-4 max-w-md mx-auto space-y-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl shadow-xl flex items-center justify-center gap-2.5 transition active:scale-98 text-sm"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>تأكيد الطلب الآن عبر واتساب 💬</span>
          </a>
          <p className="text-[11px] text-neutral-400">
            * اضغط لتأكيد فوري للشحن مع إدارة المتجر وإرسال تفاصيل العنوان بنقرة واحدة.
          </p>
        </div>
      </div>

      {/* Order Invoice Breakdown */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-xs space-y-6">
        <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3 flex items-center justify-between">
          <span>تفاصيل الفاتورة والطلب</span>
          <span className="text-xs font-bold text-neutral-500">#{order.order_number}</span>
        </h2>

        {/* Shipping & Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-700 bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
          <div className="space-y-1">
            <span className="font-bold text-neutral-900 block">👤 المستلم:</span>
            <p>{order.customer_name}</p>
            <p dir="ltr" className="text-left font-mono">{order.customer_phone}</p>
          </div>

          <div className="space-y-1">
            <span className="font-bold text-neutral-900 block">📍 عنوان الشحن:</span>
            <p>{order.governorate}</p>
            <p>{order.shipping_address}</p>
          </div>
        </div>

        {/* Items List */}
        <div className="divide-y divide-neutral-100">
          {order.items.map((item) => (
            <div key={item.id} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={item.image_url}
                  alt={item.product_title}
                  className="w-12 h-14 rounded-lg object-cover bg-neutral-100 border border-neutral-200"
                />
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">{item.product_title}</h4>
                  <p className="text-[11px] text-neutral-500">
                    اللون: {item.color_name} • المقاس: {item.size_name} • العدد: {item.quantity}
                  </p>
                </div>
              </div>

              <span className="text-xs font-extrabold text-neutral-900">
                {item.unit_price * item.quantity} ج.م
              </span>
            </div>
          ))}
        </div>

        {/* Total Calculations */}
        <div className="border-t border-neutral-200 pt-4 space-y-2 text-xs text-neutral-600">
          <div className="flex justify-between">
            <span>المجموع الفرعي:</span>
            <span className="font-bold text-neutral-900">{order.subtotal} ج.م</span>
          </div>

          <div className="flex justify-between">
            <span>تكلفة الشحن:</span>
            <span className="font-bold text-neutral-900">
              {order.shipping_fee === 0 ? 'مجاني 🎉' : `${order.shipping_fee} ج.م`}
            </span>
          </div>

          <div className="border-t border-neutral-200 pt-3 flex justify-between items-baseline text-base font-black text-neutral-950">
            <span>الإجمالي النهائي للدفع:</span>
            <span className="text-lg text-emerald-700">{order.total_amount} ج.م</span>
          </div>
        </div>

        {/* Return to Store CTA */}
        <div className="pt-4 border-t border-neutral-100">
          <Link
            href="/catalog"
            className="w-full py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>متابعة تصفح المزيد من الملابس</span>
          </Link>
        </div>
      </div>

    </main>
  );
}
