import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingBag, ArrowRight, Ruler } from 'lucide-react';
import { Product, formatPKR } from '../data/catalog';
import { LuxuryImage } from './LuxuryImage';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToBag: (product: Product, size: string, color: string) => void;
  onViewFullDetails: (product: Product) => void;
  onOpenSizeGuide: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToBag,
  onViewFullDetails,
  onOpenSizeGuide,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes.includes('M') ? 'M' : product.sizes[0]);
      setSelectedColor(product.colors[0]?.name || '');
      setActiveImage(product.primaryImage);
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="fixed inset-0 bg-[#1E1815]/60 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative z-10 grid w-full max-w-4xl grid-cols-1 overflow-hidden border border-[#1E1815]/10 bg-[#FAF7F2] shadow-2xl md:grid-cols-2 animate-fade-up">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Quick View"
          className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center bg-[#FAF7F2]/90 text-[#1E1815] transition-colors hover:bg-[#1E1815] hover:text-[#FAF7F2]"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left Image Gallery */}
        <div className="relative bg-[#F3EDE2]">
          <div className="aspect-[3/4] w-full">
            <LuxuryImage src={activeImage} alt={product.name} className="h-full w-full" />
          </div>
          {product.galleryImages.length > 1 && (
            <div className="absolute bottom-4 left-4 flex gap-2">
              {product.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={`h-14 w-11 overflow-hidden border-2 transition-all ${
                    activeImage === img ? 'border-[#C6A355] scale-105' : 'border-white/70 opacity-80'
                  }`}
                >
                  <LuxuryImage src={img} alt={`${product.name} view ${idx + 1}`} className="h-full w-full" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Details */}
        <div className="flex flex-col justify-between p-6 sm:p-8">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-[0.14em] text-[#6E6259] uppercase">
              <span>{product.collection}</span>
              <span aria-hidden="true">·</span>
              <span>{product.sku}</span>
            </div>

            <h2 className="mt-2 font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#1E1815]">
              {product.name}
            </h2>

            {/* Rating & Price */}
            <div className="mt-3 flex items-center justify-between border-b border-[#1E1815]/10 pb-4">
              <div className="flex items-baseline gap-2.5 font-mono-tabular">
                <span className="text-xl font-medium text-[#1E1815]">
                  {formatPKR(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#6E6259] line-through">
                    {formatPKR(product.originalPrice)}
                  </span>
                )}
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs text-[#1E1815]">
                <Star className="h-3.5 w-3.5 fill-[#C6A355] text-[#C6A355]" />
                <span className="font-mono-tabular font-medium">{product.rating.toFixed(1)}</span>
                <span className="text-[#6E6259]">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-[#6E6259]">
              {product.shortDescription}
            </p>

            {/* Color Selection */}
            <div className="mt-5">
              <p className="text-xs font-medium tracking-[0.12em] text-[#1E1815] uppercase">
                Color: <span className="font-normal text-[#6E6259]">{selectedColor}</span>
              </p>
              <div className="mt-2 flex items-center gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-2 border px-3 py-1.5 text-xs transition-colors ${
                      selectedColor === c.name
                        ? 'border-[#1E1815] bg-[#1E1815] text-[#FAF7F2]'
                        : 'border-[#1E1815]/15 bg-white text-[#1E1815] hover:border-[#C6A355]'
                    }`}
                  >
                    <span
                      className="h-3 w-3 rounded-full border border-black/20"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mt-5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium tracking-[0.12em] text-[#1E1815] uppercase">
                  Size: <span className="font-mono-tabular font-normal text-[#6E6259]">{selectedSize}</span>
                </p>
                <button
                  type="button"
                  onClick={onOpenSizeGuide}
                  className="inline-flex items-center gap-1 text-xs text-[#9A7B38] underline-offset-4 hover:underline"
                >
                  <Ruler className="h-3.5 w-3.5" />
                  <span>Size Guide</span>
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`font-mono-tabular h-10 min-w-[44px] border px-3 text-xs font-medium transition-colors ${
                      selectedSize === size
                        ? 'border-[#1E1815] bg-[#1E1815] text-[#FAF7F2]'
                        : 'border-[#1E1815]/15 bg-white text-[#1E1815] hover:border-[#C6A355]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 space-y-3 pt-4 border-t border-[#1E1815]/10">
            <button
              type="button"
              onClick={() => {
                onAddToBag(product, selectedSize, selectedColor);
                onClose();
              }}
              className="flex w-full items-center justify-center gap-2 bg-[#1E1815] px-6 py-3.5 text-xs font-semibold tracking-[0.18em] text-[#FAF7F2] uppercase transition-colors hover:bg-[#C6A355] hover:text-[#1E1815]"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Add to Bag — {formatPKR(product.price)}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onViewFullDetails(product);
                onClose();
              }}
              className="flex w-full items-center justify-center gap-2 border border-[#1E1815]/20 py-3 text-xs font-medium tracking-[0.15em] text-[#1E1815] uppercase transition-colors hover:bg-[#EED9D4]/40"
            >
              <span>View Full Details</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
