import React, { useState } from 'react';
import { Eye, Heart, ShoppingBag, Star } from 'lucide-react';
import { Product, formatPKR } from '../data/catalog';
import { LuxuryImage } from './LuxuryImage';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string, e?: React.MouseEvent) => void;
  onQuickView: (product: Product, e?: React.MouseEvent) => void;
  onAddToBag: (product: Product, size?: string, color?: string, e?: React.MouseEvent) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToBag,
  onSelectProduct,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');

  return (
    <article
      className="group relative flex flex-col bg-[#FAF7F2] transition-transform duration-200 hover:-translate-y-0.5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container - 3:4 Portrait */}
      <div
        onClick={() => onSelectProduct(product)}
        className="relative aspect-[3/4] w-full cursor-pointer overflow-hidden bg-[#F3EDE2]"
      >
        {/* Primary & Secondary Hover Image */}
        <div
          className={`h-full w-full transition-transform duration-500 ease-out ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
        >
          <LuxuryImage
            src={isHovered && product.secondaryImage ? product.secondaryImage : product.primaryImage}
            alt={product.name}
            className="h-full w-full"
          />
        </div>

        {/* Subtle Top-Left Unboxed Kicker (Max 1 tag, no pill spam) */}
        {product.badge && (
          <div className="pointer-events-none absolute top-3.5 left-3.5 bg-[#FAF7F2]/90 px-2.5 py-1 text-[11px] font-medium tracking-[0.16em] text-[#1E1815] uppercase backdrop-blur-xs">
            {product.badge}
          </div>
        )}

        {/* Top-Right Wishlist Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id, e);
          }}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className={`absolute top-3 right-3 flex h-10 w-10 items-center justify-center bg-[#FAF7F2]/90 text-[#1E1815] backdrop-blur-xs transition-all duration-200 hover:bg-[#1E1815] hover:text-[#FAF7F2] ${
            isWishlisted ? 'opacity-100 text-[#B45348]' : 'opacity-90 md:opacity-0 md:group-hover:opacity-100'
          }`}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-[#B45348] text-[#B45348]' : ''}`} />
        </button>

        {/* Bottom Hover Action Bar: Quick View + Add to Bag */}
        <div
          className={`absolute inset-x-3 bottom-3 flex items-center gap-2 transition-all duration-200 ${
            isHovered
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none translate-y-2 opacity-0'
          }`}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAddToBag(product, product.sizes[1] || product.sizes[0], selectedColor, e);
            }}
            className="flex flex-1 items-center justify-center gap-2 bg-[#1E1815]/95 px-3 py-2.5 text-xs font-medium tracking-[0.12em] text-[#FAF7F2] uppercase whitespace-nowrap transition-colors hover:bg-[#C6A355] hover:text-[#1E1815]"
          >
            <ShoppingBag className="h-3.5 w-3.5 shrink-0" />
            <span>Add to Bag</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product, e);
            }}
            aria-label={`Quick view ${product.name}`}
            className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#FAF7F2]/95 text-[#1E1815] transition-colors hover:bg-[#EED9D4]"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Product Metadata — Unboxed, Clean Hierarchy */}
      <div className="flex flex-1 flex-col justify-between pt-3.5">
        <div>
          {/* Unboxed Metadata Line with typographic separator */}
          <div className="flex items-center justify-between text-xs text-[#6E6259]">
            <span className="tracking-[0.08em] uppercase truncate">
              {product.category} <span aria-hidden="true">·</span> {product.fabric}
            </span>
            <span className="inline-flex items-center gap-1 font-mono-tabular text-[11px] text-[#1E1815] shrink-0">
              <Star className="h-3 w-3 fill-[#C6A355] text-[#C6A355]" />
              {product.rating.toFixed(1)}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="mt-1 font-serif-luxury text-lg font-semibold leading-snug text-[#1E1815]">
            <button
              type="button"
              onClick={() => onSelectProduct(product)}
              className="text-left transition-colors hover:text-[#9A7B38] focus:outline-none"
            >
              {product.name}
            </button>
          </h3>
        </div>

        {/* Price & Color Swatches */}
        <div className="mt-2 flex items-center justify-between gap-2 pt-1">
          <div className="flex items-baseline gap-2 font-mono-tabular">
            <span className="text-[15px] font-medium text-[#1E1815]">
              {formatPKR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#6E6259] line-through">
                {formatPKR(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Available Color Dots */}
          <div className="flex items-center gap-1.5" aria-label="Available colors">
            {product.colors.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(color.name);
                }}
                title={color.name}
                aria-label={`Select color ${color.name}`}
                className={`h-3.5 w-3.5 rounded-full border transition-transform ${
                  selectedColor === color.name
                    ? 'scale-110 border-[#1E1815] ring-1 ring-[#C6A355]'
                    : 'border-[#1E1815]/20 hover:scale-110'
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
