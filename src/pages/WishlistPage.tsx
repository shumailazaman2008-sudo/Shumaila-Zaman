import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { PRODUCTS, Product, formatPKR } from '../data/catalog';
import { LuxuryImage } from '../components/LuxuryImage';

interface WishlistPageProps {
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToBag: (product: Product, size?: string, color?: string) => void;
  onSelectProduct: (product: Product) => void;
  onExploreShop: () => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  wishlistIds,
  onToggleWishlist,
  onAddToBag,
  onSelectProduct,
  onExploreShop,
}) => {
  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-8 lg:px-12">
      <div className="border-b border-[#1E1815]/10 pb-6">
        <p className="text-xs font-semibold tracking-[0.22em] text-[#9A7B38] uppercase">
          Personal Curated Archive
        </p>
        <h1 className="mt-2 font-serif-luxury text-3xl sm:text-5xl font-semibold text-[#1E1815]">
          Saved Wishlist ({wishlistedProducts.length})
        </h1>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="my-16 flex flex-col items-center justify-center border border-[#1E1815]/10 bg-[#F3EDE2]/40 py-20 px-4 text-center">
          <Heart className="h-12 w-12 text-[#C6A355] stroke-1" />
          <h2 className="mt-4 font-serif-luxury text-3xl text-[#1E1815]">
            Your Wishlist is Currently Empty
          </h2>
          <p className="mt-2 max-w-md text-sm text-[#6E6259]">
            Save your favorite hand-embellished kurtis, maxi dresses, and silk co-ords as you browse to curate your personal wardrobe.
          </p>
          <button
            type="button"
            onClick={onExploreShop}
            className="mt-7 inline-flex items-center gap-2 bg-[#1E1815] px-7 py-3.5 text-xs font-semibold tracking-[0.2em] text-[#FAF7F2] uppercase transition-colors hover:bg-[#C6A355] hover:text-[#1E1815]"
          >
            <span>Explore New Arrivals</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {wishlistedProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col justify-between border border-[#1E1815]/10 bg-white p-4"
            >
              <div>
                <div
                  onClick={() => onSelectProduct(product)}
                  className="relative aspect-[3/4] cursor-pointer overflow-hidden bg-[#F3EDE2]"
                >
                  <LuxuryImage
                    src={product.primaryImage}
                    alt={product.name}
                    className="h-full w-full transition-transform duration-300 hover:scale-105"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    aria-label={`Remove ${product.name} from wishlist`}
                    className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center bg-[#FAF7F2]/90 text-[#1E1815] hover:bg-[#B45348] hover:text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <p className="mt-3 text-[11px] tracking-[0.12em] text-[#6E6259] uppercase">
                  {product.category} · {product.fabric}
                </p>
                <h3
                  onClick={() => onSelectProduct(product)}
                  className="mt-1 cursor-pointer font-serif-luxury text-xl font-semibold text-[#1E1815] hover:text-[#9A7B38]"
                >
                  {product.name}
                </h3>
                <p className="mt-1 font-mono-tabular text-sm font-medium text-[#1E1815]">
                  {formatPKR(product.price)}
                </p>
              </div>

              <div className="mt-4 space-y-2 pt-3 border-t border-[#1E1815]/10">
                <button
                  type="button"
                  onClick={() =>
                    onAddToBag(product, product.sizes[1] || product.sizes[0], product.colors[0]?.name)
                  }
                  className="flex w-full items-center justify-center gap-2 bg-[#1E1815] py-3 text-xs font-semibold tracking-[0.16em] text-[#FAF7F2] uppercase transition-colors hover:bg-[#C6A355] hover:text-[#1E1815]"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  <span>Move to Bag</span>
                </button>
                <button
                  type="button"
                  onClick={() => onSelectProduct(product)}
                  className="w-full py-2 text-center text-xs text-[#6E6259] hover:text-[#1E1815]"
                >
                  View Full Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
