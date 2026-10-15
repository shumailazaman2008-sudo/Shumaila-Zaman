import React, { useState } from 'react';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, Instagram } from 'lucide-react';
import {
  PRODUCTS,
  CATEGORIES,
  STYLES,
  COLLECTIONS,
  ASSETS,
  Product,
} from '../data/catalog';
import { ProductCard } from '../components/ProductCard';
import { LuxuryImage } from '../components/LuxuryImage';
import { ActivePage } from '../components/Navbar';

interface HomePageProps {
  wishlistIds: string[];
  onToggleWishlist: (productId: string, e?: React.MouseEvent) => void;
  onQuickView: (product: Product, e?: React.MouseEvent) => void;
  onAddToBag: (product: Product, size?: string, color?: string, e?: React.MouseEvent) => void;
  onSelectProduct: (product: Product) => void;
  onNavigate: (page: ActivePage, categoryFilter?: string, styleFilter?: string, collectionFilter?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToBag,
  onSelectProduct,
  onNavigate,
}) => {
  const [activeCategoryGroup, setActiveCategoryGroup] = useState<'featured' | 'all'>('featured');
  const [newArrivalPage, setNewArrivalPage] = useState(0);

  const displayedCategories =
    activeCategoryGroup === 'featured' ? CATEGORIES.slice(0, 5) : CATEGORIES;

  const newArrivals = PRODUCTS.slice(0, 8);

  return (
    <div className="space-y-24 pb-20">
      {/* 2. HERO SECTION */}
      <section className="relative min-h-[78vh] w-full overflow-hidden bg-[#1E1815]">
        <div className="absolute inset-0">
          <LuxuryImage
            src={ASSETS.heroCampaign}
            alt="SHUMAILA ZAMAN Luxury Couture Campaign — Discover Your Style"
            className="h-full w-full"
          />
          {/* Measured Contrast Scrim for 4.5:1 legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E1815]/85 via-[#1E1815]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E1815]/80 via-transparent to-[#1E1815]/25" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-[1440px] flex-col justify-end px-4 py-16 sm:px-8 md:justify-center lg:px-12">
          <div className="max-w-2xl animate-fade-up">
            <p className="text-xs font-medium tracking-[0.28em] text-[#EED9D4] uppercase">
              Autumn / Festive Couture ’26 · Lahore & International
            </p>
            <h1
              className="mt-4 font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-normal tracking-[0.06em] text-[#FAF7F2] leading-[1.08]"
              style={{ textWrap: 'balance' }}
            >
              DISCOVER YOUR STYLE
            </h1>
            <p className="mt-5 max-w-xl text-base sm:text-lg font-light leading-relaxed text-[#FAF7F2]/90">
              Timeless fashion designed for the modern woman. Hand-worked gold zari, pure mulberry silk organza, and refined contemporary silhouettes.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('shop', 'New Arrivals')}
                className="inline-flex items-center gap-3 bg-[#C6A355] px-7 py-4 text-xs font-semibold tracking-[0.2em] text-[#1E1815] uppercase whitespace-nowrap transition-all duration-200 hover:bg-[#EED9D4]"
              >
                <span>SHOP NEW ARRIVALS</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('lookbook')}
                className="inline-flex items-center gap-3 border border-[#FAF7F2]/60 bg-[#1E1815]/40 px-7 py-4 text-xs font-medium tracking-[0.2em] text-[#FAF7F2] uppercase backdrop-blur-xs whitespace-nowrap transition-all duration-200 hover:border-[#C6A355] hover:bg-[#FAF7F2] hover:text-[#1E1815]"
              >
                <span>EXPLORE COLLECTION</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NEW ARRIVALS — PREMIUM PRODUCT CAROUSEL / GRID */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-4 border-b border-[#1E1815]/10 pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-[#9A7B38] uppercase">
              01. Curated Atelier Releases
            </p>
            <h2 className="mt-2 font-serif-luxury text-3xl sm:text-4xl font-semibold text-[#1E1815]">
              New Arrivals
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => setNewArrivalPage((prev) => (prev === 0 ? 1 : 0))}
                aria-label="Previous new arrivals"
                className="flex h-10 w-10 items-center justify-center border border-[#1E1815]/15 text-[#1E1815] transition-colors hover:border-[#C6A355] hover:bg-[#F3EDE2]"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setNewArrivalPage((prev) => (prev === 1 ? 0 : 1))}
                aria-label="Next new arrivals"
                className="flex h-10 w-10 items-center justify-center border border-[#1E1815]/15 text-[#1E1815] transition-colors hover:border-[#C6A355] hover:bg-[#F3EDE2]"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('shop', 'New Arrivals')}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-[#1E1815] uppercase hover:text-[#9A7B38]"
            >
              <span>View All 24 Pieces</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* 4 products per row on desktop, 2 on mobile */}
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-7">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
              onAddToBag={onAddToBag}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* 3. SHOP BY CATEGORY — LARGE EDITORIAL CARDS */}
      <section className="bg-[#F3EDE2]/70 py-20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-[#9A7B38] uppercase">
                02. Wardrobe Architecture
              </p>
              <h2 className="mt-2 font-serif-luxury text-3xl sm:text-4xl font-semibold text-[#1E1815]">
                Shop by Category
              </h2>
            </div>

            <div className="flex items-center gap-2 bg-[#FAF7F2] p-1 border border-[#1E1815]/10 self-start">
              <button
                type="button"
                onClick={() => setActiveCategoryGroup('featured')}
                className={`px-4 py-1.5 text-xs font-medium tracking-[0.12em] uppercase transition-colors whitespace-nowrap ${
                  activeCategoryGroup === 'featured'
                    ? 'bg-[#1E1815] text-[#FAF7F2]'
                    : 'text-[#6E6259] hover:text-[#1E1815]'
                }`}
              >
                Signature 5
              </button>
              <button
                type="button"
                onClick={() => setActiveCategoryGroup('all')}
                className={`px-4 py-1.5 text-xs font-medium tracking-[0.12em] uppercase transition-colors whitespace-nowrap ${
                  activeCategoryGroup === 'all'
                    ? 'bg-[#1E1815] text-[#FAF7F2]'
                    : 'text-[#6E6259] hover:text-[#1E1815]'
                }`}
              >
                All 10 Categories
              </button>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {displayedCategories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => onNavigate('shop', cat.name)}
                className="group relative aspect-[3/4] cursor-pointer overflow-hidden bg-[#1E1815]"
              >
                <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-105">
                  <LuxuryImage src={cat.image} alt={cat.name} className="h-full w-full" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1815]/85 via-[#1E1815]/25 to-transparent" />

                <div className="absolute inset-x-5 bottom-5 flex flex-col justify-end text-[#FAF7F2]">
                  <span className="font-mono-tabular text-[11px] tracking-[0.15em] text-[#EED9D4] uppercase">
                    {cat.itemCount}
                  </span>
                  <h3 className="mt-1 font-serif-luxury text-2xl font-medium text-[#FAF7F2]">
                    {cat.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-[#FAF7F2]/75">{cat.subtitle}</p>
                  <div className="mt-3 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-[#C6A355] uppercase transition-transform duration-200 group-hover:translate-x-1">
                    <span>Explore</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. COLLECTION SECTION — EDITORIAL BANNERS */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div className="max-w-xl">
          <p className="text-xs font-semibold tracking-[0.22em] text-[#9A7B38] uppercase">
            03. Seasonal Chapters
          </p>
          <h2 className="mt-2 font-serif-luxury text-3xl sm:text-4xl font-semibold text-[#1E1815]">
            The 2026 Couture Edit
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {COLLECTIONS.map((col) => (
            <div
              key={col.id}
              className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden bg-[#1E1815] p-8 sm:p-10"
            >
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                <LuxuryImage src={col.image} alt={col.title} className="h-full w-full" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1815]/90 via-[#1E1815]/40 to-transparent" />

              <div className="relative z-10 max-w-lg">
                <p className="text-xs font-medium tracking-[0.22em] text-[#C6A355] uppercase">
                  {col.kicker}
                </p>
                <h3 className="mt-2 font-serif-luxury text-3xl sm:text-4xl font-normal tracking-[0.04em] text-[#FAF7F2] uppercase">
                  {col.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#FAF7F2]/85">
                  {col.subtitle}
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('shop', 'All', undefined, col.title)}
                  className="mt-6 inline-flex items-center gap-2.5 border border-[#C6A355] bg-[#1E1815]/70 px-6 py-3 text-xs font-semibold tracking-[0.18em] text-[#FAF7F2] uppercase backdrop-blur-xs transition-colors hover:bg-[#C6A355] hover:text-[#1E1815]"
                >
                  <span>EXPLORE COLLECTION</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SHOP BY STYLE — "FIND YOUR STYLE" + INTERACTIVE STYLE QUIZ BANNER */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div className="border border-[#1E1815]/10 bg-[#F3EDE2]/60 p-6 sm:p-10 lg:p-12">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-[#9A7B38] uppercase">
                04. Personal Aesthetic Curation
              </p>
              <h2 className="mt-2 font-serif-luxury text-3xl sm:text-4xl font-semibold text-[#1E1815]">
                FIND YOUR STYLE
              </h2>
              <p className="mt-2 max-w-xl text-sm text-[#6E6259]">
                Select an aesthetic mood below to filter our catalog immediately, or take our 4-step Atelier Style Quiz for bespoke recommendations.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('style-finder')}
              className="inline-flex items-center gap-2.5 bg-[#1E1815] px-6 py-3.5 text-xs font-semibold tracking-[0.18em] text-[#FAF7F2] uppercase self-start whitespace-nowrap transition-colors hover:bg-[#C6A355] hover:text-[#1E1815]"
            >
              <Sparkles className="h-4 w-4 text-[#C6A355]" />
              <span>Take Personal Style Quiz</span>
            </button>
          </div>

          {/* 10 Style Cards */}
          <div className="mt-8 grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-5">
            {STYLES.map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => onNavigate('shop', 'All', style.name)}
                className="group flex flex-col justify-between border border-[#1E1815]/10 bg-[#FAF7F2] p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C6A355]"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="h-3 w-3 rounded-full border border-[#1E1815]/20"
                    style={{ backgroundColor: style.accentHex }}
                  />
                  <ArrowRight className="h-3.5 w-3.5 text-[#6E6259] transition-transform group-hover:translate-x-0.5 group-hover:text-[#9A7B38]" />
                </div>
                <div className="mt-5">
                  <h3 className="font-serif-luxury text-xl font-semibold text-[#1E1815] group-hover:text-[#9A7B38]">
                    {style.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-[#6E6259]">{style.tagline}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 19. INSTAGRAM / SOCIAL SECTION — "FOLLOW OUR STYLE" */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center text-center">
          <p className="text-xs font-semibold tracking-[0.22em] text-[#9A7B38] uppercase">
            @SHUMAILAZAMAN.OFFICIAL · #HOUSEOFSHUMAILAZAMAN
          </p>
          <h2 className="mt-2 font-serif-luxury text-3xl sm:text-4xl font-semibold text-[#1E1815]">
            FOLLOW OUR STYLE
          </h2>
          <p className="mt-2 max-w-md text-xs text-[#6E6259]">
             As seen on muses and patrons across Lahore, Islamabad, Karachi, London, and Dubai. Click any look to shop the piece.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { img: ASSETS.heroCampaign, product: PRODUCTS[5], caption: 'Golden Bloom in Lahore' },
            { img: ASSETS.roseGardenMaxi, product: PRODUCTS[0], caption: 'Blush Silk Organza' },
            { img: ASSETS.pearlGraceKurti, product: PRODUCTS[1], caption: 'Raw Silk & Pearls' },
            { img: ASSETS.ivoryLuxeAbaya, product: PRODUCTS[4], caption: 'Medina Silk Abaya' },
            { img: ASSETS.midnightEleganceDress, product: PRODUCTS[3], caption: 'Midnight Velvet Soirée' },
            { img: ASSETS.editorialLookbook, product: PRODUCTS[2], caption: 'Blush Silk Co-Ord' },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => onSelectProduct(item.product)}
              className="group relative aspect-square cursor-pointer overflow-hidden bg-[#F3EDE2]"
            >
              <LuxuryImage
                src={item.img}
                alt={item.caption}
                className="h-full w-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1E1815]/60 p-3 text-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <Instagram className="h-5 w-5 text-[#C6A355]" />
                <span className="mt-2 font-serif-luxury text-sm text-[#FAF7F2]">
                  {item.product.name}
                </span>
                <span className="mt-1 text-[10px] tracking-[0.15em] text-[#EED9D4] uppercase">
                  Shop Look
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
