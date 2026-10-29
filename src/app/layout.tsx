import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ToastBanner from '@/components/ToastBanner';

export const metadata: Metadata = {
  title: 'ATELIER | متجر ملابس وأزياء فاخرة',
  description: 'متجر أزياء عصري يقدم تشكيلة حصرية من الهوديز والتيشيرتات والقمصان المصنوعة من القطن المصري الممشط والكتان الطبيعي.',
  keywords: ['متجر ملابس', 'هوديز أوفرسايز', 'تيشيرتات قطن مصري', 'أزياء فاخرة', 'ملابس رجالي', 'أناقة عصرية'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="min-h-screen flex flex-col justify-between bg-[#fafafa] text-neutral-900 antialiased selection:bg-neutral-900 selection:text-white">
        <CartProvider>
          <Navbar />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
          <CartDrawer />
          <ToastBanner />
        </CartProvider>
      </body>
    </html>
  );
}
