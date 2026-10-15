import React, { useState } from 'react';
import {
  CheckCircle2,
  PackageCheck,
  Sparkles,
  Truck,
  MapPin,
  Home,
  Search,
} from 'lucide-react';
import { OrderRecord } from './CheckoutPage';
import { formatPKR } from '../data/catalog';

interface OrderTrackingPageProps {
  activeOrder: OrderRecord;
  allOrders: OrderRecord[];
  onSelectOrder: (order: OrderRecord) => void;
}

const TIMELINE_STEPS = [
  {
    step: 0,
    title: 'Order Placed',
    subtitle: 'Received at SHUMAILA ZAMAN Digital Flagship',
    time: 'Oct 06, 10:15 AM',
    icon: CheckCircle2,
  },
  {
    step: 1,
    title: 'Confirmed',
    subtitle: 'Patron verification & fabric allocation complete',
    time: 'Oct 06, 11:40 AM',
    icon: PackageCheck,
  },
  {
    step: 2,
    title: 'Processing',
    subtitle: 'Steam finishing, quality inspection & luxury gift boxing in Lahore Atelier',
    time: 'Oct 07, 02:30 PM',
    icon: Sparkles,
  },
  {
    step: 3,
    title: 'Shipped',
    subtitle: 'Handed over to insured priority air courier (Tracking #DHL-99281-PK)',
    time: 'Estimated Oct 08',
    icon: Truck,
  },
  {
    step: 4,
    title: 'Out for Delivery',
    subtitle: 'Courier concierge en route to your residence',
    time: 'Estimated Oct 09',
    icon: MapPin,
  },
  {
    step: 5,
    title: 'Delivered',
    subtitle: 'Signed and received at destination',
    time: 'Pending',
    icon: Home,
  },
];

export const OrderTrackingPage: React.FC<OrderTrackingPageProps> = ({
  activeOrder,
  allOrders,
  onSelectOrder,
}) => {
  const [searchOrderId, setSearchOrderId] = useState(activeOrder.orderId);
  const [simulatedStep, setSimulatedStep] = useState<number>(activeOrder.statusStep);

  React.useEffect(() => {
    setSearchOrderId(activeOrder.orderId);
    setSimulatedStep(activeOrder.statusStep);
  }, [activeOrder]);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const found = allOrders.find(
      (o) => o.orderId.toLowerCase() === searchOrderId.trim().toLowerCase()
    );
    if (found) {
      onSelectOrder(found);
    }
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-8 lg:px-12">
      <div className="flex flex-col justify-between gap-6 border-b border-[#1E1815]/10 pb-8 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-[#9A7B38] uppercase">
            Live Couture Dispatch Telemetry
          </p>
          <h1 className="mt-2 font-serif-luxury text-3xl sm:text-5xl font-semibold text-[#1E1815]">
            Track Your Order
          </h1>
        </div>

        <form onSubmit={handleLookup} className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#6E6259]" />
            <input
              type="text"
              value={searchOrderId}
              onChange={(e) => setSearchOrderId(e.target.value)}
              placeholder="Order ID (e.g. SHM-1042)"
              className="border border-[#1E1815]/20 bg-white py-2.5 pr-4 pl-9 text-xs font-mono-tabular text-[#1E1815] focus:border-[#C6A355] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-[#1E1815] px-5 py-2.5 text-xs font-semibold tracking-[0.16em] text-[#FAF7F2] uppercase hover:bg-[#C6A355] hover:text-[#1E1815]"
          >
            Track
          </button>
        </form>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left Vertical Timeline (7 cols) */}
        <div className="lg:col-span-7 border border-[#1E1815]/12 bg-white p-6 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E1815]/10 pb-5">
            <div>
              <span className="text-xs tracking-[0.14em] text-[#6E6259] uppercase">
                Tracking Order
              </span>
              <h2 className="font-mono-tabular text-2xl font-semibold text-[#1E1815]">
                #{activeOrder.orderId}
              </h2>
            </div>

            {/* Interactive Step Simulator for Testing */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-[#6E6259]">Preview Stage:</span>
              {[1, 2, 3, 4, 5].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setSimulatedStep(st)}
                  className={`font-mono-tabular h-6 w-6 text-[11px] border ${
                    simulatedStep === st
                      ? 'border-[#1E1815] bg-[#1E1815] text-[#FAF7F2]'
                      : 'border-[#1E1815]/15 text-[#6E6259]'
                  }`}
                >
                  {st + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Vertical Stepper */}
          <div className="mt-8 space-y-6">
            {TIMELINE_STEPS.map((item, index) => {
              const Icon = item.icon;
              const isCompleted = index <= simulatedStep;
              const isCurrent = index === simulatedStep;

              return (
                <div key={item.title} className="relative flex items-start gap-4">
                  {/* Connector Line */}
                  {index < TIMELINE_STEPS.length - 1 && (
                    <div
                      className={`absolute top-10 left-5 h-10 w-[1.5px] -translate-x-1/2 ${
                        index < simulatedStep ? 'bg-[#C6A355]' : 'bg-[#1E1815]/12'
                      }`}
                    />
                  )}

                  <div
                    className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      isCompleted
                        ? 'border-[#C6A355] bg-[#1E1815] text-[#C6A355]'
                        : 'border-[#1E1815]/15 bg-[#FAF7F2] text-[#6E6259]'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="flex-1 pt-0.5">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`font-serif-luxury text-xl font-semibold ${
                          isCompleted ? 'text-[#1E1815]' : 'text-[#6E6259]'
                        }`}
                      >
                        {item.title}
                        {isCurrent && (
                          <span className="ml-2 text-xs font-sans font-normal tracking-[0.12em] text-[#9A7B38] uppercase">
                            · Current Stage
                          </span>
                        )}
                      </h3>
                      <span className="font-mono-tabular text-xs text-[#6E6259]">
                        {item.time}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#6E6259]">{item.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Destination & Order Manifest (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border border-[#1E1815]/12 bg-[#F3EDE2]/65 p-6 sm:p-8">
            <h3 className="font-serif-luxury text-2xl font-semibold text-[#1E1815]">
              Dispatch Manifest
            </h3>
            <dl className="mt-4 space-y-3 text-xs">
              <div className="flex justify-between">
                <dt className="text-[#6E6259]">Patron Name</dt>
                <dd className="font-medium text-[#1E1815]">{activeOrder.customerName}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#6E6259]">Destination</dt>
                <dd className="font-medium text-[#1E1815] text-right">
                  {activeOrder.address}, {activeOrder.city}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#6E6259]">Courier Tier</dt>
                <dd className="font-medium text-[#1E1815]">{activeOrder.deliveryMethod}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#6E6259]">Payment Method</dt>
                <dd className="font-medium text-[#1E1815]">{activeOrder.paymentMethod}</dd>
              </div>
              <div className="flex justify-between border-t border-[#1E1815]/10 pt-3 text-sm font-semibold">
                <dt className="text-[#1E1815]">Total Value</dt>
                <dd className="font-mono-tabular text-[#1E1815]">
                  {formatPKR(activeOrder.total)}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};
