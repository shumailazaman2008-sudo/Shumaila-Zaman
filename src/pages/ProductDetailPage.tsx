import React, { useState, useEffect } from 'react';
import {
  Star,
  Heart,
  ShoppingBag,
  Ruler,
  Plus,
  Minus,
  Check,
  ShieldCheck,
  Truck,
  RefreshCw,
  ArrowLeft,
} from 'lucide-react';
import { PRODUCTS, Product, formatPKR } from '../data/catalog';
import { LuxuryImage } from '../components/LuxuryImage';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailPageProps {
  product: Product;
  isWishlisted: boolean;
  wishlistIds: string[];
  onToggleWishlist: (productId: string, e?: React.MouseEvent) => void;
  onAddToBag: (product: Product, size: string, color: string, e?: React.MouseEvent, quantity?: number) => void;
  onBuyNow: (product: Product, size: string, color: string, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product, e?: React.MouseEvent) => void;
  onOpenSizeGuide: () => void;
  onBackToShop: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  isWishlisted,
  wishlistIds,
  onToggleWishlist,
  onAddToBag,
  onBuyNow,
  onSelectProduct,
  onQuickView,
  onOpenSizeGuide,
  onBackToShop,
}) => {
  const [selectedImage, setSelectedImage] = useState(product.primaryImage);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(
    product.sizes.includes('M') ? 'M' : product.sizes[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    'description' | 'fabric' | 'fit' | 'delivery' | 'reviews'
  >('description');
  const [addedNotification, setAddedNotification] = useState(false);

  useEffect(() => {
    setSelectedImage(product.primaryImage);
    setSelectedColor(product.colors[0]?.name || '');
    setSelectedSize(product.sizes.includes('M') ? 'M' : product.sizes[0]);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const completeTheLookProducts = PRODUCTS.filter((p) =>
    product.completeTheLookIds.includes(p.id)
  );

  const youMayAlsoLikeProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && !product.completeTheLookIds.includes(p.id)
  ).slice(0, 4);

  const handleAdd = () => {
    onAddToBag(product, selectedSize, selectedColor, undefined, quantity);
    setAddedNotification(true);
    setTimeout(() => setAddedNotification(false), 2000);
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-8 lg:px-12">
      {/* Breadcrumb & Back */}
      <div className="mb-6 flex items-center justify-between text-xs text-[#6E6259]">
        <button
          type="button"
          onClick={onBackToShop}
          className="inline-flex items-center gap-2 font-medium text-[#1E1815] hover:text-[#9A7B38]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Collection</span>
        </button>
        <div className="hidden sm:flex items-center gap-2 tracking-[0.12em] uppercase">
          <span>{product.collection}</span>
          <span aria-hidden="true">/</span>
          <span>{product.category}</span>
          <span aria-hidden="true">/</span>
          <span className="text-[#1E1815]">{product.name}</span>
        </div>
      </div>

      {/* Main Contiguous Purchase Module: Left Sticky Gallery, Right Purchase Module */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Left Gallery (7 cols) */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
            {/* Thumbnails */}
            <div className="order-2 flex gap-3 sm:order-1 sm:col-span-2 sm:flex-col">
              {product.galleryImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-[3/4] w-20 sm:w-full overflow-hidden border transition-all ${
                    selectedImage === img
                      ? 'border-[#C6A355] ring-1 ring-[#C6A355]'
                      : 'border-[#1E1815]/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <LuxuryImage src={img} alt={`${product.name} thumbnail ${i + 1}`} className="h-full w-full" />
                </button>
              ))}
            </div>

            {/* Main Large Image */}
            <div className="order-1 sm:order-2 sm:col-span-10">
              <div className="aspect-[3/4] w-full overflow-hidden bg-[#F3EDE2]">
                <LuxuryImage src={selectedImage} alt={product.name} className="h-full w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Purchase Module (5 cols) */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 border border-[#1E1815]/10 bg-[#FAF7F2] p-6 sm:p-8">
            <div className="flex items-center justify-between text-xs tracking-[0.16em] text-[#6E6259] uppercase">
              <span>{product.collection}</span>
              <span className="font-mono-tabular">SKU: {product.sku}</span>
            </div>

            <h1 className="mt-2 font-serif-luxury text-3xl sm:text-4xl font-semibold text-[#1E1815]">
              {product.name}
            </h1>

            {/* Price & Rating */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-b border-[#1E1815]/10 pb-5">
              <div className="flex items-baseline gap-3 font-mono-tabular">
                <span className="text-2xl font-semibold text-[#1E1815]">
                  {formatPKR(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-sm text-[#6E6259] line-through">
                      {formatPKR(product.originalPrice)}
                    </span>
                    <span className="text-xs font-medium text-[#B45348]">
                      Save {formatPKR(product.originalPrice - product.price)}
                    </span>
                  </>
                )}
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs">
                <Star className="h-4 w-4 fill-[#C6A355] text-[#C6A355]" />
                <span className="font-mono-tabular font-semibold text-[#1E1815]">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-[#6E6259]">({product.reviewCount} verified reviews)</span>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-[#6E6259]">
              {product.shortDescription}
            </p>

            {/* Color Selection */}
            <div className="mt-6">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#1E1815] uppercase">
                Color: <span className="font-normal text-[#6E6259]">{selectedColor}</span>
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    className={`inline-flex items-center gap-2 border px-3.5 py-2 text-xs transition-colors ${
                      selectedColor === c.name
                        ? 'border-[#1E1815] bg-[#1E1815] text-[#FAF7F2]'
                        : 'border-[#1E1815]/15 bg-white text-[#1E1815] hover:border-[#C6A355]'
                    }`}
                  >
                    <span
                      className="h-3.5 w-3.5 rounded-full border border-black/20"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection & Size Guide Trigger */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold tracking-[0.14em] text-[#1E1815] uppercase">
                  Size: <span className="font-mono-tabular font-normal text-[#6E6259]">{selectedSize}</span>
                </p>
                <button
                  type="button"
                  onClick={onOpenSizeGuide}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#9A7B38] underline-offset-4 hover:underline"
                >
                  <Ruler className="h-3.5 w-3.5" />
                  <span>Size Guide</span>
                </button>
              </div>
              <div className="mt-2.5 grid grid-cols-6 gap-2 font-mono-tabular">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`h-11 border text-xs font-medium transition-colors ${
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

            {/* Quantity Selector + Wishlist */}
            <div className="mt-6 flex items-center gap-4">
              <div className="inline-flex items-center border border-[#1E1815]/20 bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="flex h-11 w-11 items-center justify-center text-[#1E1815] hover:bg-[#F3EDE2]"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="font-mono-tabular w-10 text-center text-sm font-medium text-[#1E1815]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="flex h-11 w-11 items-center justify-center text-[#1E1815] hover:bg-[#F3EDE2]"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={(e) => onToggleWishlist(product.id, e)}
                className={`inline-flex h-11 flex-1 items-center justify-center gap-2 border px-4 text-xs font-medium tracking-[0.14em] uppercase transition-colors ${
                  isWishlisted
                    ? 'border-[#B45348] bg-[#EED9D4]/40 text-[#B45348]'
                    : 'border-[#1E1815]/20 bg-white text-[#1E1815] hover:border-[#C6A355]'
                }`}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-[#B45348]' : ''}`} />
                <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>

            {/* Primary CTAs: Add to Bag & Buy Now */}
            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={handleAdd}
                className="flex w-full items-center justify-center gap-2.5 bg-[#1E1815] py-4 text-xs font-semibold tracking-[0.2em] text-[#FAF7F2] uppercase transition-colors hover:bg-[#C6A355] hover:text-[#1E1815]"
              >
                {addedNotification ? (
                  <>
                    <Check className="h-4 w-4 text-[#C6A355]" />
                    <span>Added to Your Shopping Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    <span>Add to Bag — {formatPKR(product.price * quantity)}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onBuyNow(product, selectedSize, selectedColor, quantity)}
                className="w-full border border-[#C6A355] bg-[#EED9D4]/50 py-3.5 text-xs font-semibold tracking-[0.2em] text-[#1E1815] uppercase transition-colors hover:bg-[#C6A355]"
              >
                Buy It Now (Express Checkout)
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 grid grid-cols-3 gap-2 border-t border-[#1E1815]/10 pt-5 text-center text-[11px] text-[#6E6259]">
              <div className="flex flex-col items-center gap-1">
                <Truck className="h-4 w-4 text-[#9A7B38]" />
                <span>Free Shipping 25k+</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-[#9A7B38]" />
                <span>100% Pure Silk & Zari</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="h-4 w-4 text-[#9A7B38]" />
                <span>14-Day Easy Exchange</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information Tabs: Description, Fabric & Material, Size & Fit, Care & Delivery, Reviews */}
      <div className="mt-16 border-t border-[#1E1815]/10 pt-10">
        <div className="flex flex-wrap gap-2 border-b border-[#1E1815]/10 pb-4">
          {[
            { id: 'description', label: 'Description & Craft' },
            { id: 'fabric', label: 'Fabric & Care Instructions' },
            { id: 'fit', label: 'Size & Fit' },
            { id: 'delivery', label: 'Delivery & Returns' },
            { id: 'reviews', label: `Customer Reviews (${product.reviewCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-5 py-2.5 text-xs font-semibold tracking-[0.15em] uppercase transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#1E1815] text-[#FAF7F2]'
                  : 'bg-[#F3EDE2]/60 text-[#6E6259] hover:text-[#1E1815]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-8 max-w-3xl text-sm leading-relaxed text-[#1E1815]/85">
          {activeTab === 'description' && (
            <div className="space-y-4">
              <p className="text-base leading-relaxed">{product.description}</p>
              <p className="text-xs text-[#6E6259]">
                Style Tags: {product.styleTags.join(' · ')} | Occasion: {product.occasion}
              </p>
            </div>
          )}

          {activeTab === 'fabric' && (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <h3 className="font-serif-luxury text-xl font-semibold text-[#1E1815]">
                  Fabric & Material Composition
                </h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
                  {product.fabricDetails.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-serif-luxury text-xl font-semibold text-[#1E1815]">
                  Care Instructions
                </h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
                  {product.careInstructions.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'fit' && (
            <div className="space-y-3">
              <h3 className="font-serif-luxury text-xl font-semibold text-[#1E1815]">
                Silhouette & Fit Guidance
              </h3>
              <p>{product.sizeAndFit}</p>
              <button
                type="button"
                onClick={onOpenSizeGuide}
                className="mt-2 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.15em] text-[#9A7B38] uppercase underline"
              >
                Open Full XS–XXL Measurement Chart
              </button>
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="space-y-3">
              <h3 className="font-serif-luxury text-xl font-semibold text-[#1E1815]">
                Shipping, Packaging & Returns
              </h3>
              <p>{product.deliveryInfo}</p>
              <p className="text-xs text-[#6E6259]">
                Returns & Exchanges: Unworn garments with original tags attached may be exchanged or returned within 14 days of delivery. Complimentary courier pickup in Lahore, Karachi, and Islamabad.
              </p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {product.reviews.length === 0 ? (
                <p className="text-sm text-[#6E6259]">
                  Rated {product.rating.toFixed(1)} out of 5 stars by {product.reviewCount} verified boutique patrons.
                </p>
              ) : (
                product.reviews.map((rev) => (
                  <div key={rev.id} className="border-b border-[#1E1815]/10 pb-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-serif-luxury text-lg font-semibold text-[#1E1815]">
                          {rev.title}
                        </p>
                        <p className="text-xs text-[#6E6259]">
                          {rev.author} ({rev.city}) · Verified Patron · Size Purchased: {rev.verifiedSize}
                        </p>
                      </div>
                      <span className="font-mono-tabular text-xs text-[#9A7B38]">
                        {'★'.repeat(rev.rating)}
                      </span>
                    </div>
                    <p className="mt-2.5 text-sm text-[#1E1815]/85">{rev.comment}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* COMPLETE THE LOOK SECTION */}
      {completeTheLookProducts.length > 0 && (
        <section className="mt-20 border-t border-[#1E1815]/10 pt-14">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#9A7B38] uppercase">
            Stylist Pairing
          </p>
          <h2 className="mt-1 font-serif-luxury text-3xl font-semibold text-[#1E1815]">
            COMPLETE THE LOOK
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {completeTheLookProducts.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                isWishlisted={wishlistIds.includes(item.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
                onAddToBag={onAddToBag}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </section>
      )}

      {/* YOU MAY ALSO LIKE SECTION */}
      <section className="mt-20 border-t border-[#1E1815]/10 pt-14">
        <p className="text-xs font-semibold tracking-[0.2em] text-[#9A7B38] uppercase">
          Curated Recommendations
        </p>
        <h2 className="mt-1 font-serif-luxury text-3xl font-semibold text-[#1E1815]">
          YOU MAY ALSO LIKE
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {youMayAlsoLikeProducts.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              isWishlisted={wishlistIds.includes(item.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
              onAddToBag={onAddToBag}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
