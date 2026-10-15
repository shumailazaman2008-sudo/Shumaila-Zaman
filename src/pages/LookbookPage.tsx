import React, { useState } from 'react';
import { Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { LOOKBOOK_SPREADS, PRODUCTS, Product, formatPKR } from '../data/catalog';
import { LuxuryImage } from '../components/LuxuryImage';

interface LookbookPageProps {
  onSelectProduct: (product: Product) => void;
  onAddToBag: (product: Product, size?: string, color?: string) => void;
}

export const LookbookPage: React.FC<LookbookPageProps> = ({
  onSelectProduct,
  onAddToBag,
}) => {
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>('hs-1');

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-8 lg:px-12">
      {/* Editorial Magazine Header */}
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold tracking-[0.26em] text-[#9A7B38] uppercase">
          The Editorial Issue · Autumn / Festive ’26
        </p>
        <h1 className="mt-3 font-serif-luxury text-4xl sm:text-6xl font-normal tracking-[0.04em] text-[#1E1815]">
          THE ATELIER LOOKBOOK
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#6E6259]">
          Click the golden interactive hotspots on any editorial photograph below to inspect fabric details and shop the featured look directly.
        </p>
      </div>

      {/* Lookbook Magazine Spreads */}
      <div className="mt-14 space-y-24">
        {LOOKBOOK_SPREADS.map((spread) => (
          <section
            key={spread.id}
            className="grid grid-cols-1 items-center gap-10 border-t border-[#1E1815]/10 pt-14 lg:grid-cols-12"
          >
            {/* Interactive Image Spread (8 cols) */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1E1815] lg:col-span-8">
              <LuxuryImage
                src={spread.image}
                alt={spread.title}
                className="h-full w-full"
              />
              <div className="absolute inset-0 bg-[#1E1815]/15" />

              {/* Interactive Hotspots */}
              {spread.hotspots.map((hs) => {
                const product = PRODUCTS.find((p) => p.id === hs.productId);
                if (!product) return null;
                const isOpen = activeHotspotId === hs.id;

                return (
                  <div
                    key={hs.id}
                    style={{ left: `${hs.xPercent}%`, top: `${hs.yPercent}%` }}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setActiveHotspotId(isOpen ? null : hs.id)
                      }
                      aria-label={`Inspect ${product.name}`}
                      className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#FAF7F2] bg-[#C6A355] text-[#1E1815] shadow-lg transition-transform duration-200 hover:scale-110 ${
                        isOpen ? 'rotate-45 bg-[#1E1815] text-[#C6A355]' : ''
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </button>

                    {/* Hotspot Popover Card */}
                    {isOpen && (
                      <div className="absolute top-11 left-1/2 z-30 w-64 -translate-x-1/2 border border-[#1E1815]/15 bg-[#FAF7F2] p-4 shadow-2xl animate-fade-up">
                        <p className="text-[10px] tracking-[0.15em] text-[#9A7B38] uppercase">
                          Featured Look
                        </p>
                        <h4 className="mt-0.5 font-serif-luxury text-lg font-semibold text-[#1E1815]">
                          {product.name}
                        </h4>
                        <p className="font-mono-tabular text-xs font-medium text-[#1E1815]">
                          {formatPKR(product.price)}
                        </p>
                        <div className="mt-3 flex gap-2">
                          <button
                            type="button"
                            onClick={() => onSelectProduct(product)}
                            className="flex-1 bg-[#1E1815] py-2 text-[11px] font-semibold tracking-[0.14em] text-[#FAF7F2] uppercase hover:bg-[#C6A355] hover:text-[#1E1815]"
                          >
                            Shop This Look
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              onAddToBag(
                                product,
                                product.sizes[1] || product.sizes[0],
                                product.colors[0]?.name
                              )
                            }
                            aria-label={`Quick add ${product.name} to bag`}
                            className="flex h-8 w-8 items-center justify-center border border-[#1E1815]/20 text-[#1E1815] hover:bg-[#EED9D4]"
                          >
                            <ShoppingBag className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Editorial Narrative & Featured Pieces List (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-[#9A7B38] uppercase">
                  {spread.chapter}
                </p>
                <h2 className="mt-2 font-serif-luxury text-3xl font-semibold text-[#1E1815]">
                  {spread.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#6E6259]">
                  {spread.editorialNote}
                </p>
              </div>

              <div className="border-t border-[#1E1815]/10 pt-5 space-y-4">
                <p className="text-xs font-semibold tracking-[0.16em] text-[#1E1815] uppercase">
                  Pieces in This Spread
                </p>
                {spread.hotspots.map((hs) => {
                  const prod = PRODUCTS.find((p) => p.id === hs.productId);
                  if (!prod) return null;
                  return (
                    <div
                      key={hs.id}
                      onClick={() => onSelectProduct(prod)}
                      className="group flex cursor-pointer items-center justify-between border border-[#1E1815]/10 bg-white p-3.5 transition-colors hover:border-[#C6A355]"
                    >
                      <div>
                        <p className="font-serif-luxury text-lg font-semibold text-[#1E1815] group-hover:text-[#9A7B38]">
                          {prod.name}
                        </p>
                        <p className="font-mono-tabular text-xs text-[#6E6259]">
                          {formatPKR(prod.price)} · {prod.fabric}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-[#9A7B38]">
                        <span>Shop</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
