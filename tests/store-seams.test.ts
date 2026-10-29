import { describe, it, expect, beforeEach } from 'vitest';
import { StoreRepository, FREE_SHIPPING_THRESHOLD, INITIAL_PRODUCTS } from '../src/lib/store';
import { Order } from '../src/types';

describe('Apparel Store Core Seams', () => {

  describe('Catalog Seam', () => {
    it('returns all products when no filter is provided', () => {
      const products = StoreRepository.getProducts();
      expect(products.length).toBeGreaterThan(0);
      expect(products[0]).toHaveProperty('title');
      expect(products[0]).toHaveProperty('colors');
    });

    it('filters products correctly by category slug', () => {
      const hoodies = StoreRepository.getProducts({ categorySlug: 'hoodies' });
      expect(hoodies.length).toBeGreaterThan(0);
      expect(hoodies.every(p => p.category_id === 'hoodies')).toBe(true);
    });

    it('filters products correctly by search query', () => {
      const results = StoreRepository.getProducts({ search: 'هودي' });
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(p => p.title.includes('هودي'))).toBe(true);
    });

    it('retrieves single product by its slug', () => {
      const product = StoreRepository.getProductBySlug('minimal-heavyweight-hoodie');
      expect(product).toBeDefined();
      expect(product?.title).toContain('هودي أوفرسايز فخم');
    });
  });

  describe('Variant & Inventory Availability Seam', () => {
    it('toggles color availability state (active vs disabled/faded)', () => {
      const targetProduct = INITIAL_PRODUCTS[0];
      const targetColor = targetProduct.colors[0];

      // Initially active
      expect(targetColor.is_active).toBe(true);

      // Disable color
      const updated = StoreRepository.toggleColorAvailability(targetProduct.id, targetColor.id, false);
      const updatedColor = updated?.colors.find(c => c.id === targetColor.id);
      expect(updatedColor?.is_active).toBe(false);

      // Re-enable color
      const reEnabled = StoreRepository.toggleColorAvailability(targetProduct.id, targetColor.id, true);
      const reEnabledColor = reEnabled?.colors.find(c => c.id === targetColor.id);
      expect(reEnabledColor?.is_active).toBe(true);
    });

    it('toggles specific size availability state (in stock vs out of stock strikethrough)', () => {
      const targetProduct = INITIAL_PRODUCTS[0];
      const targetColor = targetProduct.colors[0];
      const targetSize = targetColor.sizes[0];

      // Toggle size to false (out of stock)
      const updated = StoreRepository.toggleSizeAvailability(targetProduct.id, targetColor.id, targetSize.id, false);
      const updatedSize = updated?.colors.find(c => c.id === targetColor.id)?.sizes.find(s => s.id === targetSize.id);
      expect(updatedSize?.is_available).toBe(false);

      // Toggle size back to true
      const restored = StoreRepository.toggleSizeAvailability(targetProduct.id, targetColor.id, targetSize.id, true);
      const restoredSize = restored?.colors.find(c => c.id === targetColor.id)?.sizes.find(s => s.id === targetSize.id);
      expect(restoredSize?.is_available).toBe(true);
    });
  });

  describe('Shipping Seam', () => {
    it('awards free shipping when subtotal reaches or exceeds threshold (999 EGP)', () => {
      const result = StoreRepository.calculateShipping('القاهرة', 1200);
      expect(result.fee).toBe(0);
      expect(result.isFree).toBe(true);
    });

    it('calculates regional shipping fee for Cairo when subtotal is below threshold', () => {
      const result = StoreRepository.calculateShipping('القاهرة', 500);
      expect(result.fee).toBe(45);
      expect(result.isFree).toBe(false);
    });

    it('calculates regional shipping fee for Alexandria when subtotal is below threshold', () => {
      const result = StoreRepository.calculateShipping('الإسكندرية', 400);
      expect(result.fee).toBe(55);
      expect(result.isFree).toBe(false);
    });
  });

  describe('Order & WhatsApp Message Seam', () => {
    it('generates properly formatted and URL-encoded WhatsApp confirmation link', () => {
      const mockOrder: Order = {
        id: 'ord-test-1',
        order_number: 'ATL-9988',
        customer_name: 'محمد خالد',
        customer_phone: '01011223344',
        governorate: 'الجيزة',
        shipping_address: 'الدقي، شارع التحرير',
        notes: 'الرجاء الاتصال قبل التوصيل',
        items: [
          {
            id: 'item-1',
            product_id: 'prod-1',
            product_title: 'هودي أوفرسايز',
            product_slug: 'hoodie',
            color_id: 'col-black',
            color_name: 'أسود',
            color_hex: '#000000',
            size_id: 'sz-l',
            size_name: 'L',
            unit_price: 690,
            quantity: 2,
            image_url: 'https://example.com/img.jpg'
          }
        ],
        subtotal: 1380,
        shipping_fee: 0,
        total_amount: 1380,
        payment_method: 'cod',
        status: 'pending',
        created_at: new Date().toISOString()
      };

      const url = StoreRepository.buildWhatsAppOrderMessage(mockOrder, '+201099999999');
      expect(url).toContain('https://wa.me/201099999999?text=');
      
      const decodedText = decodeURIComponent(url);
      expect(decodedText).toContain('ATL-9988');
      expect(decodedText).toContain('محمد خالد');
      expect(decodedText).toContain('01011223344');
      expect(decodedText).toContain('هودي أوفرسايز (أسود - مقاس: L) × 2');
      expect(decodedText).toContain('الدفع عند الاستلام');
      expect(decodedText).toContain('1380 ج.م');
      expect(decodedText).toContain('شحن: مجاني 🎉');
    });
  });

});
