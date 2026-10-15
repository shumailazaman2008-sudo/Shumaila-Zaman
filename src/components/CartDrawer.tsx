import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { Product, formatPKR } from '../data/catalog';
import { LuxuryImage } from './LuxuryImage';

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, size: string, color: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string, color: string) => void;
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
}

const FREE_SHIPPING_THRESHOLD = 25000;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onContinueShopping,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = subtotal >= 50000 ? Math.round(subtotal * 0.05) : 0;
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 450;
  const total = subtotal - discount + shipping;
  const amountRemainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-[#1E1815]/55 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative z-10 flex h-full w-full max-w-md flex-col justify-between bg-[#FAF7F2] shadow-2xl animate-fade-up">
        {/* Top Header */}
        <div className="border-b border-[#1E1815]/10 px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="h-5 w-5 text-[#9A7B38]" />
              <h2 className="font-serif-luxury text-2xl font-semibold text-[#1E1815]">
                Your Shopping Bag
              </h2>
              <span className="font-mono-tabular text-xs text-[#6E6259]">
                ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Shopping Bag"
              className="flex h-10 w-10 items-center justify-center text-[#1E1815] hover:bg-[#1E1815]/5"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="mt-4 bg-[#F3EDE2] p-3">
            <div className="flex items-center gap-2 text-xs text-[#1E1815]">
              <Truck className="h-4 w-4 shrink-0 text-[#9A7B38]" />
              {amountRemainingForFreeShipping > 0 ? (
                <span>
                  You&apos;re{' '}
                  <strong className="font-mono-tabular font-semibold">
                    {formatPKR(amountRemainingForFreeShipping)}
                  </strong>{' '}
                  away from <strong>FREE SHIPPING</strong>
                </span>
              ) : (
                <span className="font-medium text-[#2E5A44]">
                  You have unlocked Complimentary Luxury Express Shipping!
                </span>
              )}
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden bg-[#1E1815]/10">
              <div
                className="h-full bg-[#C6A355] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center py-12">
              <ShoppingBag className="h-12 w-12 text-[#C6A355]/60 stroke-1" />
              <h3 className="mt-4 font-serif-luxury text-2xl text-[#1E1815]">
                Your Shopping Bag is Empty
              </h3>
              <p className="mt-2 max-w-xs text-xs leading-relaxed text-[#6E6259]">
                Explore our new arrivals, silk co-ord sets, and hand-embellished eastern couture.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onContinueShopping();
                }}
                className="mt-6 bg-[#1E1815] px-6 py-3 text-xs font-semibold tracking-[0.18em] text-[#FAF7F2] uppercase transition-colors hover:bg-[#C6A355] hover:text-[#1E1815]"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-[#1E1815]/10">
              {items.map((item) => (
                <li
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="flex gap-4 py-4"
                >
                  <div className="h-28 w-20 shrink-0 overflow-hidden bg-[#F3EDE2]">
                    <LuxuryImage
                      src={item.product.primaryImage}
                      alt={item.product.name}
                      className="h-full w-full"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif-luxury text-base font-semibold text-[#1E1815]">
                          {item.product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() =>
                            onRemoveItem(item.product.id, item.size, item.color)
                          }
                          aria-label={`Remove ${item.product.name}`}
                          className="text-[#6E6259] transition-colors hover:text-[#B45348]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-[#6E6259]">
                        Size: <span className="font-mono-tabular text-[#1E1815]">{item.size}</span>{' '}
                        <span aria-hidden="true">·</span> Color:{' '}
                        <span className="text-[#1E1815]">{item.color}</span>
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      {/* Quantity Stepper */}
                      <div className="inline-flex items-center border border-[#1E1815]/15 bg-white">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.size, item.color, -1)
                          }
                          aria-label="Decrease quantity"
                          className="flex h-7 w-7 items-center justify-center text-[#1E1815] hover:bg-[#F3EDE2]"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="font-mono-tabular px-2.5 text-xs font-medium text-[#1E1815]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.size, item.color, 1)
                          }
                          aria-label="Increase quantity"
                          className="flex h-7 w-7 items-center justify-center text-[#1E1815] hover:bg-[#F3EDE2]"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <span className="font-mono-tabular text-sm font-medium text-[#1E1815]">
                        {formatPKR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer Totals & Buttons */}
        {items.length > 0 && (
          <div className="border-t border-[#1E1815]/10 bg-[#F3EDE2]/60 px-6 py-5">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-[#6E6259]">
                <span>Subtotal</span>
                <span className="font-mono-tabular text-[#1E1815]">{formatPKR(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#2E5A44]">
                  <span>VIP Tier Privilege (5% Off Rs. 50,000+)</span>
                  <span className="font-mono-tabular">-{formatPKR(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#6E6259]">
                <span>Insured Courier Shipping</span>
                <span className="font-mono-tabular text-[#1E1815]">
                  {shipping === 0 ? 'Complimentary' : formatPKR(shipping)}
                </span>
              </div>
              <div className="flex justify-between border-t border-[#1E1815]/10 pt-2.5 text-sm font-semibold text-[#1E1815]">
                <span>Total</span>
                <span className="font-mono-tabular text-base">{formatPKR(total)}</span>
              </div>
            </div>

            <div className="mt-5 space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="flex w-full items-center justify-center gap-2 bg-[#1E1815] py-3.5 text-xs font-semibold tracking-[0.18em] text-[#FAF7F2] uppercase transition-colors hover:bg-[#C6A355] hover:text-[#1E1815]"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onContinueShopping();
                }}
                className="w-full border border-[#1E1815]/20 bg-transparent py-3 text-xs font-medium tracking-[0.15em] text-[#1E1815] uppercase transition-colors hover:bg-[#EED9D4]/40"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
