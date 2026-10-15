import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Banknote,
  Building2,
  ArrowRight,
  ArrowLeft,
  Lock,
  LogIn,
} from 'lucide-react';
import { User } from 'firebase/auth';
import { CartItem } from '../components/CartDrawer';
import { formatPKR } from '../data/catalog';
import { LuxuryImage } from '../components/LuxuryImage';

export interface OrderRecord {
  orderId: string;
  ownerId?: string;
  date: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  deliveryMethod: 'Standard Insured' | 'Express VIP Air';
  paymentMethod: 'Cash on Delivery' | 'Card Payment' | 'Online Bank Transfer';
  items: CartItem[];
  itemsSummary?: string;
  itemCount?: number;
  total: number;
  statusStep: number; // 0 to 5
}

interface CheckoutPageProps {
  items: CartItem[];
  currentUser: User | null;
  onSignInWithGoogle: () => Promise<void>;
  onPlaceOrder: (order: OrderRecord) => Promise<void>;
  onContinueShopping: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  items,
  currentUser,
  onSignInWithGoogle,
  onPlaceOrder,
  onContinueShopping,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [email, setEmail] = useState(currentUser?.email || 'ayesha.khan@example.com');
  const [phone, setPhone] = useState('+92 300 8452190');
  const [fullName, setFullName] = useState(currentUser?.displayName || 'Ayesha Sikandar Khan');
  const [address, setAddress] = useState('House 42-B, Main Boulevard, Gulberg III');
  const [city, setCity] = useState('Lahore');
  const [postalCode, setPostalCode] = useState('54660');
  const [deliveryMethod, setDeliveryMethod] = useState<'Standard Insured' | 'Express VIP Air'>(
    'Standard Insured'
  );
  const [paymentMethod, setPaymentMethod] = useState<
    'Cash on Delivery' | 'Card Payment' | 'Online Bank Transfer'
  >('Cash on Delivery');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.email) setEmail(currentUser.email);
      if (currentUser.displayName) setFullName(currentUser.displayName);
    }
  }, [currentUser]);

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const discount = subtotal >= 50000 ? Math.round(subtotal * 0.05) : 0;
  const baseShipping = subtotal >= 25000 ? 0 : 450;
  const expressFee = deliveryMethod === 'Express VIP Air' ? 1200 : 0;
  const shipping = baseShipping + expressFee;
  const total = subtotal - discount + shipping;

  const handleConfirmOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const summaryText = items
        .map((i) => `${i.product.name} (${i.size}, ${i.color}) x${i.quantity}`)
        .join(' · ')
        .slice(0, 500);
      const totalPieces = Math.min(
        100,
        Math.max(1, items.reduce((acc, i) => acc + i.quantity, 0))
      );

      const newOrder: OrderRecord = {
        orderId: `SAM-${Math.floor(1040 + Math.random() * 8900)}`,
        ownerId: currentUser?.uid || 'guest',
        date: new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        customerName: fullName.trim().slice(0, 100),
        email: email.trim().slice(0, 150),
        phone: phone.trim().slice(0, 40),
        address: address.trim().slice(0, 250),
        city: city.trim().slice(0, 80),
        postalCode: postalCode.trim().slice(0, 20),
        deliveryMethod,
        paymentMethod,
        items: [...items],
        itemsSummary: summaryText,
        itemCount: totalPieces,
        total: Math.round(total),
        statusStep: 0, // Order Placed
      };
      await onPlaceOrder(newOrder);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="font-serif-luxury text-3xl text-[#1E1815]">
          Your Shopping Bag is Empty
        </h1>
        <p className="mt-2 text-sm text-[#6E6259]">
          Add couture pieces to your bag before proceeding to checkout.
        </p>
        <button
          type="button"
          onClick={onContinueShopping}
          className="mt-6 bg-[#1E1815] px-7 py-3.5 text-xs font-semibold tracking-[0.18em] text-[#FAF7F2] uppercase"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-8 lg:px-12">
      <div className="mb-8 border-b border-[#1E1815]/10 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#9A7B38] uppercase">
              <Lock className="h-3.5 w-3.5" />
              <span>Encrypted SHUMAILA ZAMAN Atelier Checkout</span>
            </div>
            <h1 className="mt-2 font-serif-luxury text-3xl sm:text-4xl font-semibold text-[#1E1815]">
              Complete Your Acquisition
            </h1>
          </div>

          {!currentUser ? (
            <button
              type="button"
              onClick={onSignInWithGoogle}
              className="inline-flex items-center gap-2 border border-[#C6A355] bg-[#F3EDE2] px-4 py-2.5 text-xs font-semibold tracking-[0.14em] text-[#1E1815] uppercase transition-colors hover:bg-[#C6A355]"
            >
              <LogIn className="h-3.5 w-3.5 text-[#9A7B38]" />
              <span>Sign in with Google to Sync Order to Cloud</span>
            </button>
          ) : (
            <div className="inline-flex items-center gap-2 bg-[#F3EDE2] px-4 py-2 text-xs text-[#2E5A44]">
              <CheckCircle2 className="h-4 w-4" />
              <span>Cloud Sync Active: {currentUser.email}</span>
            </div>
          )}
        </div>

        {/* 5 Step Progress Bar */}
        <div className="mt-6 grid grid-cols-5 gap-2">
          {[
            { num: 1, label: '1. Contact' },
            { num: 2, label: '2. Shipping' },
            { num: 3, label: '3. Delivery' },
            { num: 4, label: '4. Payment' },
            { num: 5, label: '5. Review' },
          ].map((s) => (
            <button
              key={s.num}
              type="button"
              onClick={() => setStep(s.num as 1 | 2 | 3 | 4 | 5)}
              className={`border-t-2 pt-2 text-left text-xs font-medium transition-colors ${
                step >= s.num
                  ? 'border-[#C6A355] text-[#1E1815]'
                  : 'border-[#1E1815]/15 text-[#6E6259]'
              }`}
            >
              <span className="truncate block">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left Steps Form (7 cols) */}
        <form onSubmit={handleConfirmOrder} className="space-y-8 lg:col-span-7">
          {/* Step 1: Contact Information */}
          <div className="border border-[#1E1815]/12 bg-white p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="font-serif-luxury text-2xl font-semibold text-[#1E1815]">
                1. Contact Information
              </h2>
              {step > 1 && <CheckCircle2 className="h-5 w-5 text-[#2E5A44]" />}
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium tracking-[0.1em] text-[#1E1815] uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  minLength={3}
                  maxLength={150}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full border border-[#1E1815]/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-[#1E1815] focus:border-[#C6A355] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium tracking-[0.1em] text-[#1E1815] uppercase">
                  Mobile Number (For Courier SMS)
                </label>
                <input
                  type="tel"
                  required
                  minLength={3}
                  maxLength={40}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1.5 w-full border border-[#1E1815]/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm font-mono-tabular text-[#1E1815] focus:border-[#C6A355] focus:outline-none"
                />
              </div>
            </div>

            {step === 1 && (
              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 bg-[#1E1815] px-6 py-2.5 text-xs font-semibold tracking-[0.16em] text-[#FAF7F2] uppercase hover:bg-[#C6A355] hover:text-[#1E1815]"
                >
                  <span>Continue to Shipping</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Step 2: Shipping Address */}
          <div className="border border-[#1E1815]/12 bg-white p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="font-serif-luxury text-2xl font-semibold text-[#1E1815]">
                2. Shipping Address
              </h2>
              {step > 2 && <CheckCircle2 className="h-5 w-5 text-[#2E5A44]" />}
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-medium tracking-[0.1em] text-[#1E1815] uppercase">
                  Recipient Full Name
                </label>
                <input
                  type="text"
                  required
                  minLength={1}
                  maxLength={100}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1.5 w-full border border-[#1E1815]/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-[#1E1815] focus:border-[#C6A355] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium tracking-[0.1em] text-[#1E1815] uppercase">
                  Street Address & Residence Details
                </label>
                <input
                  type="text"
                  required
                  minLength={3}
                  maxLength={250}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1.5 w-full border border-[#1E1815]/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-[#1E1815] focus:border-[#C6A355] focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium tracking-[0.1em] text-[#1E1815] uppercase">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    minLength={2}
                    maxLength={80}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-1.5 w-full border border-[#1E1815]/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm text-[#1E1815] focus:border-[#C6A355] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium tracking-[0.1em] text-[#1E1815] uppercase">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    minLength={2}
                    maxLength={20}
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="mt-1.5 w-full border border-[#1E1815]/20 bg-[#FAF7F2] px-3.5 py-2.5 text-sm font-mono-tabular text-[#1E1815] focus:border-[#C6A355] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {step === 2 && (
              <div className="mt-5 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 text-xs text-[#6E6259] hover:text-[#1E1815]"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 bg-[#1E1815] px-6 py-2.5 text-xs font-semibold tracking-[0.16em] text-[#FAF7F2] uppercase hover:bg-[#C6A355] hover:text-[#1E1815]"
                >
                  <span>Continue to Delivery</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Step 3: Delivery Method */}
          <div className="border border-[#1E1815]/12 bg-white p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="font-serif-luxury text-2xl font-semibold text-[#1E1815]">
                3. Delivery Method
              </h2>
              {step > 3 && <CheckCircle2 className="h-5 w-5 text-[#2E5A44]" />}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setDeliveryMethod('Standard Insured')}
                className={`flex flex-col justify-between border p-4 text-left transition-colors ${
                  deliveryMethod === 'Standard Insured'
                    ? 'border-[#1E1815] bg-[#F3EDE2]/70'
                    : 'border-[#1E1815]/15 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[0.12em] text-[#1E1815] uppercase">
                    Standard Insured Courier
                  </span>
                  <span className="font-mono-tabular text-xs font-medium text-[#2E5A44]">
                    {baseShipping === 0 ? 'FREE' : formatPKR(baseShipping)}
                  </span>
                </div>
                <p className="mt-2 text-xs text-[#6E6259]">
                  2–4 Business Days in signature keepsake garment box.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryMethod('Express VIP Air')}
                className={`flex flex-col justify-between border p-4 text-left transition-colors ${
                  deliveryMethod === 'Express VIP Air'
                    ? 'border-[#1E1815] bg-[#F3EDE2]/70'
                    : 'border-[#1E1815]/15 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[0.12em] text-[#1E1815] uppercase">
                    Express VIP Air (24h)
                  </span>
                  <span className="font-mono-tabular text-xs font-medium text-[#1E1815]">
                    +{formatPKR(1200)}
                  </span>
                </div>
                <p className="mt-2 text-xs text-[#6E6259]">
                  Next-day priority air dispatch with white-glove courier.
                </p>
              </button>
            </div>

            {step === 3 && (
              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="inline-flex items-center gap-2 bg-[#1E1815] px-6 py-2.5 text-xs font-semibold tracking-[0.16em] text-[#FAF7F2] uppercase hover:bg-[#C6A355] hover:text-[#1E1815]"
                >
                  <span>Select Payment Method</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Step 4 & 5: Payment Method & Final Review */}
          <div className="border border-[#1E1815]/12 bg-white p-6 sm:p-8">
            <h2 className="font-serif-luxury text-2xl font-semibold text-[#1E1815]">
              4. Payment Method & Order Review
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                {
                  id: 'Cash on Delivery' as const,
                  label: 'Cash on Delivery (COD)',
                  desc: 'Pay in cash upon doorstep verification',
                  icon: Banknote,
                },
                {
                  id: 'Card Payment' as const,
                  label: 'Credit / Debit Card',
                  desc: 'Visa, Mastercard, Amex (3D Secure)',
                  icon: CreditCard,
                },
                {
                  id: 'Online Bank Transfer' as const,
                  label: 'Online IBFT / Raast',
                  desc: 'Direct priority transfer to Atelier account',
                  icon: Building2,
                },
              ].map((pm) => {
                const Icon = pm.icon;
                return (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => {
                      setPaymentMethod(pm.id);
                      setStep(5);
                    }}
                    className={`flex flex-col justify-between border p-4 text-left transition-colors ${
                      paymentMethod === pm.id
                        ? 'border-[#1E1815] bg-[#F3EDE2]/70 ring-1 ring-[#C6A355]'
                        : 'border-[#1E1815]/15 bg-white hover:border-[#C6A355]'
                    }`}
                  >
                    <Icon className="h-5 w-5 text-[#9A7B38]" />
                    <div className="mt-3">
                      <p className="text-xs font-semibold text-[#1E1815]">{pm.label}</p>
                      <p className="mt-1 text-[11px] text-[#6E6259]">{pm.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {paymentMethod === 'Card Payment' && (
              <div className="mt-5 grid grid-cols-1 gap-3 border border-[#1E1815]/10 bg-[#FAF7F2] p-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Card Number (•••• •••• •••• 4242)"
                  className="border border-[#1E1815]/20 bg-white px-3 py-2 text-xs font-mono-tabular sm:col-span-2"
                />
                <input
                  type="text"
                  placeholder="MM / YY"
                  className="border border-[#1E1815]/20 bg-white px-3 py-2 text-xs font-mono-tabular"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  className="border border-[#1E1815]/20 bg-white px-3 py-2 text-xs font-mono-tabular"
                />
              </div>
            )}

            <div className="mt-8 border-t border-[#1E1815]/10 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-3 bg-[#1E1815] py-4 text-xs font-semibold tracking-[0.22em] text-[#FAF7F2] uppercase transition-colors hover:bg-[#C6A355] hover:text-[#1E1815] disabled:opacity-50"
              >
                <ShieldCheck className="h-4 w-4 text-[#C6A355]" />
                <span>
                  {isSubmitting
                    ? 'SAVING ORDER TO ATELIER DATABASE...'
                    : `COMPLETE ORDER — ${formatPKR(total)}`}
                </span>
              </button>
              <p className="mt-2.5 text-center text-[11px] text-[#6E6259]">
                By placing your order, you agree to SHUMAILA ZAMAN’s 14-day complimentary size exchange & couture care guarantee.
              </p>
            </div>
          </div>
        </form>

        {/* Right Order Summary (5 cols) */}
        <aside className="lg:col-span-5">
          <div className="sticky top-24 border border-[#1E1815]/12 bg-[#F3EDE2]/65 p-6 sm:p-8">
            <h2 className="font-serif-luxury text-2xl font-semibold text-[#1E1815]">
              Order Summary ({items.reduce((acc, i) => acc + i.quantity, 0)} Pieces)
            </h2>

            <ul className="mt-5 divide-y divide-[#1E1815]/10">
              {items.map((item) => (
                <li
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="flex items-center justify-between gap-4 py-3.5"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="h-20 w-14 shrink-0 overflow-hidden bg-white">
                      <LuxuryImage
                        src={item.product.primaryImage}
                        alt={item.product.name}
                        className="h-full w-full"
                      />
                    </div>
                    <div>
                      <p className="font-serif-luxury text-base font-semibold text-[#1E1815]">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-[#6E6259]">
                        Size: {item.size} · {item.color} · Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono-tabular text-xs font-medium text-[#1E1815]">
                    {formatPKR(item.product.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-2.5 border-t border-[#1E1815]/10 pt-5 text-xs">
              <div className="flex justify-between text-[#6E6259]">
                <span>Subtotal</span>
                <span className="font-mono-tabular text-[#1E1815]">{formatPKR(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#2E5A44]">
                  <span>VIP Privilege Discount (5%)</span>
                  <span className="font-mono-tabular">-{formatPKR(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#6E6259]">
                <span>Shipping ({deliveryMethod})</span>
                <span className="font-mono-tabular text-[#1E1815]">
                  {shipping === 0 ? 'Complimentary' : formatPKR(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-[#6E6259]">
                <span>Payment Method</span>
                <span className="font-medium text-[#1E1815]">{paymentMethod}</span>
              </div>
              <div className="flex justify-between border-t border-[#1E1815]/15 pt-3 text-base font-semibold text-[#1E1815]">
                <span>Total Due</span>
                <span className="font-mono-tabular text-lg">{formatPKR(total)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
