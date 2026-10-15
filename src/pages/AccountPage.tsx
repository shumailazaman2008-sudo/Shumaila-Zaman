import React, { useState } from 'react';
import {
  User as UserIcon,
  Package,
  MapPin,
  Heart,
  LogOut,
  CheckCircle2,
  ArrowRight,
  Plus,
  ShieldAlert,
  LogIn,
} from 'lucide-react';
import { User } from 'firebase/auth';
import { OrderRecord } from './CheckoutPage';
import { formatPKR } from '../data/catalog';
import { ActivePage } from '../components/Navbar';
import { BOOTSTRAPPED_ADMIN_EMAIL } from '../lib/firebase';

interface AccountPageProps {
  currentUser: User | null;
  orders: OrderRecord[];
  wishlistCount: number;
  onSignInWithGoogle: () => Promise<void>;
  onSignOut: () => Promise<void>;
  onUpdateOrderStatus: (orderId: string, newStatusStep: number) => Promise<void>;
  onNavigate: (page: ActivePage) => void;
  onSelectOrderToTrack: (order: OrderRecord) => void;
}

const STAGE_NAMES = [
  '0. Order Placed',
  '1. Confirmed',
  '2. Processing in Atelier',
  '3. Shipped via DHL',
  '4. Out for Delivery',
  '5. Delivered',
];

export const AccountPage: React.FC<AccountPageProps> = ({
  currentUser,
  orders,
  wishlistCount,
  onSignInWithGoogle,
  onSignOut,
  onUpdateOrderStatus,
  onNavigate,
  onSelectOrderToTrack,
}) => {
  const isAdmin =
    Boolean(currentUser?.emailVerified) &&
    currentUser?.email === BOOTSTRAPPED_ADMIN_EMAIL;

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'addresses' | 'admin'>(
    'overview'
  );

  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      label: 'Primary Residence (Default)',
      recipient: currentUser?.displayName || 'Ayesha Sikandar Khan',
      line1: 'House 42-B, Main Boulevard, Gulberg III',
      city: 'Lahore, 54660, Pakistan',
      phone: '+92 300 8452190',
    },
  ]);

  const [newAddressCity, setNewAddressCity] = useState('');
  const [newAddressLine, setNewAddressLine] = useState('');

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddressLine.trim() || !newAddressCity.trim()) return;
    setAddresses((prev) => [
      ...prev,
      {
        id: `addr-${Date.now()}`,
        label: 'Additional Saved Address',
        recipient: currentUser?.displayName || 'SHUMAILA ZAMAN Patron',
        line1: newAddressLine.trim().slice(0, 200),
        city: newAddressCity.trim().slice(0, 80),
        phone: '+92 300 8452190',
      },
    ]);
    setNewAddressLine('');
    setNewAddressCity('');
  };

  if (!currentUser) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20">
        <div className="border border-[#1E1815]/12 bg-white p-8 sm:p-10 shadow-sm text-center">
          <p className="text-xs font-semibold tracking-[0.22em] text-[#9A7B38] uppercase">
            The House of Shumaila Zaman · Cloud Database Portal
          </p>
          <h1 className="mt-2 font-serif-luxury text-3xl sm:text-4xl font-semibold text-[#1E1815]">
            Patron & Admin Sign In
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[#6E6259]">
            Sign in with your Google Account to sync your wishlist across devices, store permanent couture orders in Firestore, and access the SHUMAILA ZAMAN Admin Order Console.
          </p>

          <button
            type="button"
            onClick={onSignInWithGoogle}
            className="mt-8 inline-flex w-full items-center justify-center gap-3 bg-[#1E1815] px-6 py-4 text-xs font-semibold tracking-[0.2em] text-[#FAF7F2] uppercase transition-colors hover:bg-[#C6A355] hover:text-[#1E1815]"
          >
            <LogIn className="h-4 w-4 text-[#C6A355]" />
            <span>Continue with Google Authentication</span>
          </button>

          <p className="mt-6 text-[11px] text-[#6E6259]">
            Protected by Firebase Authentication & Zero-Trust Firestore Security Rules.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-8 lg:px-12">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-[#1E1815]/10 pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-[#9A7B38] uppercase">
            {isAdmin ? 'SHUMAILA ZAMAN Executive Admin & Patron Portal' : 'Gold Privé Patron Portal'} · {currentUser.email}
          </p>
          <h1 className="mt-2 font-serif-luxury text-3xl sm:text-5xl font-semibold text-[#1E1815]">
            Welcome, {currentUser.displayName || 'Valued Patron'}
          </h1>
        </div>
        <button
          type="button"
          onClick={onSignOut}
          className="inline-flex items-center gap-2 border border-[#1E1815]/20 px-4 py-2 text-xs font-medium tracking-[0.14em] text-[#1E1815] uppercase self-start hover:bg-[#1E1815] hover:text-[#FAF7F2]"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-3 space-y-2">
          {[
            { id: 'overview', label: 'Account Overview', icon: UserIcon },
            { id: 'orders', label: `Order History (${orders.length})`, icon: Package },
            { id: 'addresses', label: `Saved Addresses (${addresses.length})`, icon: MapPin },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id as typeof activeTab)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left text-xs font-semibold tracking-[0.14em] uppercase transition-colors ${
                  activeTab === item.id
                    ? 'bg-[#1E1815] text-[#FAF7F2]'
                    : 'bg-[#F3EDE2]/60 text-[#1E1815] hover:bg-[#EED9D4]/50'
                }`}
              >
                <Icon className="h-4 w-4 text-[#C6A355]" />
                <span>{item.label}</span>
              </button>
            );
          })}

          {isAdmin && (
            <button
              type="button"
              onClick={() => setActiveTab('admin')}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left text-xs font-semibold tracking-[0.14em] uppercase transition-colors ${
                activeTab === 'admin'
                  ? 'bg-[#1E1815] text-[#C6A355]'
                  : 'border border-[#C6A355] bg-[#F3EDE2] text-[#1E1815]'
              }`}
            >
              <ShieldAlert className="h-4 w-4 text-[#C6A355]" />
              <span>Admin Order Console</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => onNavigate('wishlist')}
            className="flex w-full items-center gap-3 bg-[#F3EDE2]/60 px-4 py-3 text-left text-xs font-semibold tracking-[0.14em] text-[#1E1815] uppercase transition-colors hover:bg-[#EED9D4]/50"
          >
            <Heart className="h-4 w-4 text-[#C6A355]" />
            <span>Saved Wishlist ({wishlistCount})</span>
          </button>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-9">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="border border-[#1E1815]/10 bg-white p-6">
                  <p className="text-xs tracking-[0.14em] text-[#6E6259] uppercase">
                    Cloud Orders
                  </p>
                  <p className="mt-2 font-mono-tabular text-3xl font-semibold text-[#1E1815]">
                    {orders.length}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('orders')}
                    className="mt-3 inline-flex items-center gap-1 text-xs text-[#9A7B38] hover:underline"
                  >
                    <span>View & Track</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>

                <div className="border border-[#1E1815]/10 bg-white p-6">
                  <p className="text-xs tracking-[0.14em] text-[#6E6259] uppercase">
                    Synced Wishlist
                  </p>
                  <p className="mt-2 font-mono-tabular text-3xl font-semibold text-[#1E1815]">
                    {wishlistCount}
                  </p>
                  <button
                    type="button"
                    onClick={() => onNavigate('wishlist')}
                    className="mt-3 inline-flex items-center gap-1 text-xs text-[#9A7B38] hover:underline"
                  >
                    <span>Manage Wishlist</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>

                <div className="border border-[#1E1815]/10 bg-white p-6">
                  <p className="text-xs tracking-[0.14em] text-[#6E6259] uppercase">
                    Database Status
                  </p>
                  <p className="mt-2 font-serif-luxury text-xl font-semibold text-[#1E1815]">
                    Firestore Connected
                  </p>
                  <p className="mt-1 text-xs text-[#2E5A44] inline-flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Real-time Sync Active
                  </p>
                </div>
              </div>

              {/* Recent Orders Preview */}
              <div className="border border-[#1E1815]/10 bg-white p-6 sm:p-8">
                <h2 className="font-serif-luxury text-2xl font-semibold text-[#1E1815]">
                  Recent Acquisitions
                </h2>
                <div className="mt-4 divide-y divide-[#1E1815]/10">
                  {orders.map((ord) => (
                    <div
                      key={ord.orderId}
                      className="flex flex-col justify-between gap-4 py-4 sm:flex-row sm:items-center"
                    >
                      <div>
                        <p className="font-mono-tabular text-sm font-semibold text-[#1E1815]">
                          Order #{ord.orderId} · {ord.date}
                        </p>
                        <p className="mt-0.5 text-xs text-[#6E6259]">
                          {ord.itemsSummary ||
                            ord.items.map((i) => `${i.product.name} (${i.size})`).join(', ')}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-mono-tabular text-sm font-medium text-[#1E1815]">
                          {formatPKR(ord.total)}
                        </span>
                        <button
                          type="button"
                          onClick={() => onSelectOrderToTrack(ord)}
                          className="bg-[#1E1815] px-4 py-2 text-xs font-medium tracking-[0.14em] text-[#FAF7F2] uppercase hover:bg-[#C6A355] hover:text-[#1E1815]"
                        >
                          Track Order
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="border border-[#1E1815]/10 bg-white p-6 sm:p-8 space-y-6">
              <h2 className="font-serif-luxury text-2xl font-semibold text-[#1E1815]">
                Complete Order History
              </h2>
              {orders.map((ord) => (
                <div
                  key={ord.orderId}
                  className="border border-[#1E1815]/10 bg-[#FAF7F2] p-5 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E1815]/10 pb-3">
                    <div>
                      <span className="font-mono-tabular text-sm font-semibold text-[#1E1815]">
                        #{ord.orderId}
                      </span>
                      <span className="mx-2 text-[#6E6259]">·</span>
                      <span className="text-xs text-[#6E6259]">{ord.date}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onSelectOrderToTrack(ord)}
                      className="text-xs font-semibold tracking-[0.14em] text-[#9A7B38] uppercase underline"
                    >
                      Live Tracking Timeline →
                    </button>
                  </div>
                  <p className="text-xs text-[#6E6259]">
                    Shipping to: {ord.address}, {ord.city} ({ord.paymentMethod})
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-[#1E1815]">
                      {ord.itemsSummary || `${ord.items.length} Couture Item(s)`}
                    </span>
                    <span className="font-mono-tabular text-sm font-semibold text-[#1E1815]">
                      {formatPKR(ord.total)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'admin' && isAdmin && (
            <div className="border border-[#C6A355] bg-white p-6 sm:p-8 space-y-6">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-[#9A7B38] uppercase">
                  SHUMAILA ZAMAN Atelier Executive Control
                </p>
                <h2 className="mt-1 font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#1E1815]">
                  Live Firestore Order Management
                </h2>
                <p className="mt-1 text-xs text-[#6E6259]">
                  Update the live dispatch stage of any customer order stored in Firestore.
                </p>
              </div>

              <div className="space-y-4">
                {orders.map((ord) => (
                  <div
                    key={ord.orderId}
                    className="border border-[#1E1815]/12 bg-[#FAF7F2] p-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
                  >
                    <div>
                      <p className="font-mono-tabular text-sm font-semibold text-[#1E1815]">
                        #{ord.orderId} — {ord.customerName} ({ord.city})
                      </p>
                      <p className="mt-1 text-xs text-[#6E6259]">
                        {ord.itemsSummary || 'Couture Order'} · {formatPKR(ord.total)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <select
                        value={ord.statusStep}
                        onChange={(e) =>
                          onUpdateOrderStatus(ord.orderId, Number(e.target.value))
                        }
                        className="border border-[#1E1815]/20 bg-white px-3 py-2 text-xs font-medium text-[#1E1815]"
                      >
                        {STAGE_NAMES.map((label, idx) => (
                          <option key={label} value={idx}>
                            {label}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => onSelectOrderToTrack(ord)}
                        className="bg-[#1E1815] px-3.5 py-2 text-xs font-medium text-[#FAF7F2] uppercase"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="border border-[#1E1815]/12 bg-white p-6 flex flex-col justify-between"
                  >
                    <div>
                      <p className="text-xs font-semibold tracking-[0.15em] text-[#9A7B38] uppercase">
                        {addr.label}
                      </p>
                      <h3 className="mt-2 font-serif-luxury text-xl font-semibold text-[#1E1815]">
                        {addr.recipient}
                      </h3>
                      <p className="mt-1 text-xs text-[#6E6259]">{addr.line1}</p>
                      <p className="text-xs text-[#6E6259]">{addr.city}</p>
                      <p className="mt-2 font-mono-tabular text-xs text-[#1E1815]">
                        {addr.phone}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <form
                onSubmit={handleAddAddress}
                className="border border-[#1E1815]/12 bg-white p-6 space-y-4"
              >
                <h3 className="font-serif-luxury text-xl font-semibold text-[#1E1815]">
                  Add New Delivery Address
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    required
                    maxLength={200}
                    placeholder="Street Address, House No., Sector"
                    value={newAddressLine}
                    onChange={(e) => setNewAddressLine(e.target.value)}
                    className="border border-[#1E1815]/20 bg-[#FAF7F2] px-3.5 py-2.5 text-xs"
                  />
                  <input
                    type="text"
                    required
                    maxLength={80}
                    placeholder="City & Postal Code (e.g. Karachi, 75500)"
                    value={newAddressCity}
                    onChange={(e) => setNewAddressCity(e.target.value)}
                    className="border border-[#1E1815]/20 bg-[#FAF7F2] px-3.5 py-2.5 text-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#1E1815] px-5 py-2.5 text-xs font-semibold tracking-[0.16em] text-[#FAF7F2] uppercase hover:bg-[#C6A355] hover:text-[#1E1815]"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Save Address</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
