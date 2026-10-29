'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { StoreRepository, INITIAL_SHIPPING_ZONES } from '@/lib/store';
import { PaymentMethod, Order } from '@/types';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Banknote,
  Smartphone
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedGovernorate, setSelectedGovernorate] = useState(INITIAL_SHIPPING_ZONES[0].governorate);
  const [shippingAddress, setShippingAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Recalculate shipping based on governorate and subtotal
  const shippingInfo = StoreRepository.calculateShipping(selectedGovernorate, subtotal);
  const finalShippingFee = shippingInfo.fee;
  const finalTotal = subtotal + finalShippingFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      setErrorMessage('سلتك فارغة! يرجى إضافة منتجات أولاً.');
      return;
    }

    if (!customerName.trim() || !customerPhone.trim() || !shippingAddress.trim()) {
      setErrorMessage('يرجى ملء جميع الحقول المطلوبة (الاسم، الهاتف، والعنوان).');
      return;
    }

    if (customerPhone.trim().length < 10) {
      setErrorMessage('يرجى إدخال رقم هاتف صحيح مكون من 11 رقماً.');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `ATL-${randomNum}`;

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      order_number: orderNumber,
      customer_name: customerName.trim(),
      customer_phone: customerPhone.trim(),
      governorate: selectedGovernorate,
      shipping_address: shippingAddress.trim(),
      notes: notes.trim() || undefined,
      items: [...items],
      subtotal,
      shipping_fee: finalShippingFee,
      total_amount: finalTotal,
      payment_method: paymentMethod,
      status: 'pending',
      created_at: new Date().toISOString()
    };

    StoreRepository.saveOrder(newOrder);
    clearCart();

    // Redirect to Order Confirmation Success page
    router.push(`/order-success/${newOrder.id}`);
  };

  if (items.length === 0) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400">
          <Truck className="w-8 h-8 stroke-[1.5]" />
        </div>
        <h2 className="text-xl font-bold text-neutral-900 mb-2">سلة مشترياتك فارغة</h2>
        <p className="text-xs text-neutral-500 max-w-sm mx-auto mb-6">
          لا توجد منتجات في السلة لتأكيد طلبها. تصفح تشكيلتنا الآن واختر ما يناسبك!
        </p>
        <Link
          href="/catalog"
          className="px-6 py-3 bg-neutral-950 text-white rounded-full text-xs font-bold hover:bg-neutral-800 transition inline-block"
        >
          الذهاب لجميع المنتجات
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-neutral-950">
          إتمام الطلب السريع (Guest Checkout)
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          أدخل بيانات الشحن والتوصيل فقط، وسنقوم بتجهيز طلبيتك والتواصل معك فوراً.
        </p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Form Fields (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Customer Contact Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-xs space-y-5">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>1. معلومات المستلم والتوصيل</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-800 block">
                  الاسم بالكامل <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="مثال: أحمد محمد علي"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-xs font-medium focus:ring-2 focus:ring-neutral-950 focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-800 block">
                  رقم الهاتف (واتساب) <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="01012345678"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-xs font-medium focus:ring-2 focus:ring-neutral-950 focus:outline-hidden text-left"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-800 block">
                المحافظة / المنطقة <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedGovernorate}
                onChange={(e) => setSelectedGovernorate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-xs font-bold text-neutral-900 bg-white focus:ring-2 focus:ring-neutral-950 focus:outline-hidden"
              >
                {INITIAL_SHIPPING_ZONES.map((zone) => (
                  <option key={zone.id} value={zone.governorate}>
                    {zone.governorate} ({zone.fee} ج.م - خلال {zone.estimated_delivery})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-800 block">
                العنوان بالتفصيل (المدينة، الحي، اسم الشارع، رقم العمارة والشقة) <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={2}
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="مثال: مدينة نصر، شارع عباس العقاد، عمارة 12، الدور الرابع"
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-xs font-medium focus:ring-2 focus:ring-neutral-950 focus:outline-hidden resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-700 block">
                ملاحظات إضافية لمندوب الشحن (اختياري)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="مثال: يرجى الاتصال قبل الوصول بنصف ساعة"
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-xs font-medium focus:ring-2 focus:ring-neutral-950 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-neutral-800" />
              <span>2. طريقة الدفع المفضلة</span>
            </h2>

            <div className="space-y-3">
              {/* Option 1: COD */}
              <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition ${
                paymentMethod === 'cod' ? 'border-neutral-950 bg-neutral-50/70 ring-1 ring-neutral-950' : 'border-neutral-200 hover:border-neutral-300'
              }`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Banknote className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-neutral-950">الدفع نقداً عند الاستلام (COD)</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">الأكثر طلباً</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-1">
                    ادفع قيمة طلبيتك نقداً لمندوب الشحن بعد معاينة القطعة والتأكد من المقاس.
                  </p>
                </div>
              </label>

              {/* Option 2: InstaPay */}
              <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition ${
                paymentMethod === 'instapay' ? 'border-neutral-950 bg-neutral-50/70 ring-1 ring-neutral-950' : 'border-neutral-200 hover:border-neutral-300'
              }`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'instapay'}
                  onChange={() => setPaymentMethod('instapay')}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-bold text-neutral-950">تحويل فوري عبر إنستاباي (InstaPay)</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-1">
                    سيظهر لك معرف حساب إنستاباي فور تأكيد الطلب للتحويل المباشر.
                  </p>
                </div>
              </label>

              {/* Option 3: Vodafone Cash */}
              <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition ${
                paymentMethod === 'vodafone_cash' ? 'border-neutral-950 bg-neutral-50/70 ring-1 ring-neutral-950' : 'border-neutral-200 hover:border-neutral-300'
              }`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'vodafone_cash'}
                  onChange={() => setPaymentMethod('vodafone_cash')}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-red-600" />
                    <span className="text-xs font-bold text-neutral-950">فودافون كاش / محافظ المحمول</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-1">
                    تحويل مباشر إلى رقم محفظة المتجر مع إرسال صورة التحويل عبر واتساب.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs font-bold text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-neutral-950 hover:bg-neutral-800 text-white font-extrabold rounded-2xl shadow-xl flex items-center justify-center gap-2 transition active:scale-98 disabled:opacity-50 text-sm"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>{isSubmitting ? 'جاري تسجيل الطلب...' : 'تأكيد وإرسال الطلب الآن'}</span>
          </button>
        </div>

        {/* Order Summary Sidebar (5 Cols) */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xs sticky top-28 space-y-5">
            <h3 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              ملخص طلبك ({items.length} قطع)
            </h3>

            {/* Items mini list */}
            <div className="divide-y divide-neutral-100 max-h-72 overflow-y-auto pl-1">
              {items.map((item) => (
                <div key={item.id} className="py-3 flex items-center gap-3">
                  <img
                    src={item.image_url}
                    alt={item.product_title}
                    className="w-14 h-16 rounded-lg object-cover bg-neutral-100 border border-neutral-200 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-neutral-900 truncate">
                      {item.product_title}
                    </h4>
                    <p className="text-[11px] text-neutral-500">
                      {item.color_name} • مقاس: {item.size_name}
                    </p>
                    <p className="text-xs font-extrabold text-neutral-900 mt-0.5">
                      {item.unit_price} ج.م × {item.quantity}
                    </p>
                  </div>
                  <span className="text-xs font-extrabold text-neutral-900">
                    {item.unit_price * item.quantity} ج.م
                  </span>
                </div>
              ))}
            </div>

            {/* Pricing breakdown */}
            <div className="border-t border-neutral-100 pt-4 space-y-2.5 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>المجموع الفرعي:</span>
                <span className="font-bold text-neutral-900">{subtotal} ج.م</span>
              </div>

              <div className="flex justify-between items-center">
                <span>الشحن والتوصيل ({selectedGovernorate}):</span>
                {finalShippingFee === 0 ? (
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    شحن مجاني 🎉
                  </span>
                ) : (
                  <span className="font-bold text-neutral-900">{finalShippingFee} ج.م</span>
                )}
              </div>

              <div className="border-t border-neutral-200 pt-3 flex justify-between items-baseline text-base font-black text-neutral-950">
                <span>الإجمالي النهائي للدفع:</span>
                <span className="text-xl text-emerald-700">{finalTotal} ج.م</span>
              </div>
            </div>

            <div className="bg-neutral-50 rounded-2xl p-3.5 border border-neutral-200/80 text-[11px] text-neutral-600 space-y-1">
              <p className="font-bold text-neutral-800">🔒 أمان تام وضمان فحص القطعة:</p>
              <p>يحق لك فتح الطرد وفحص الملابس قبل الاستلام والدفع لمندوب الشحن.</p>
            </div>
          </div>
        </div>

      </form>
    </main>
  );
}
