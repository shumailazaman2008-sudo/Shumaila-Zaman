import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, X, RotateCcw, Sparkles } from 'lucide-react';
import {
  PRODUCTS,
  CATEGORIES,
  STYLES,
  COLLECTIONS,
  Product,
  formatPKR,
} from '../data/catalog';
import { ProductCard } from '../components/ProductCard';

interface ShopPageProps {
  initialCategory?: string;
  initialStyle?: string;
  initialCollection?: string;
  wishlistIds: string[];
  onToggleWishlist: (productId: string, e?: React.MouseEvent) => void;
  onQuickView: (product: Product, e?: React.MouseEvent) => void;
  onAddToBag: (product: Product, size?: string, color?: string, e?: React.MouseEvent) => void;
  onSelectProduct: (product: Product) => void;
  onOpenStyleFinder: () => void;
}

type SortOption =
  | 'featured'
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'bestselling'
  | 'rating';

export const ShopPage: React.FC<ShopPageProps> = ({
  initialCategory = 'All',
  initialStyle = 'All',
  initialCollection = 'All',
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToBag,
  onSelectProduct,
  onOpenStyleFinder,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedStyle, setSelectedStyle] = useState<string>(initialStyle);
  const [selectedCollection, setSelectedCollection] = useState<string>(initialCollection);
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [selectedFabric, setSelectedFabric] = useState<string>('All');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('All');
  const [selectedSeason, setSelectedSeason] = useState<string>('All');
  const [selectedColorFamily, setSelectedColorFamily] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(45000);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  // Sync when props change from navbar navigation
  React.useEffect(() => {
    setSelectedCategory(initialCategory || 'All');
  }, [initialCategory]);

  React.useEffect(() => {
    setSelectedStyle(initialStyle || 'All');
  }, [initialStyle]);

  React.useEffect(() => {
    setSelectedCollection(initialCollection || 'All');
  }, [initialCollection]);

  const resetAllFilters = () => {
    setSelectedCategory('All');
    setSelectedStyle('All');
    setSelectedCollection('All');
    setSelectedSize('All');
    setSelectedFabric('All');
    setSelectedOccasion('All');
    setSelectedSeason('All');
    setSelectedColorFamily('All');
    setMaxPrice(45000);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('featured');
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All') {
        if (selectedCategory === 'Sale') {
          if (!product.originalPrice && product.badge !== 'Sale') return false;
        } else if (
          product.category !== selectedCategory &&
          !product.subCategories.includes(selectedCategory)
        ) {
          return false;
        }
      }

      // Style filter
      if (
        selectedStyle !== 'All' &&
        !product.styleTags.includes(selectedStyle as Product['styleTags'][number])
      ) {
        return false;
      }

      // Collection filter
      if (selectedCollection !== 'All' && product.collection !== selectedCollection) {
        return false;
      }

      // Size filter
      if (
        selectedSize !== 'All' &&
        !product.sizes.includes(selectedSize as Product['sizes'][number])
      ) {
        return false;
      }

      // Fabric filter
      if (selectedFabric !== 'All' && product.fabric !== selectedFabric) {
        return false;
      }

      // Occasion filter
      if (selectedOccasion !== 'All' && product.occasion !== selectedOccasion) {
        return false;
      }

      // Season filter
      if (selectedSeason !== 'All' && product.season !== selectedSeason) {
        return false;
      }

      // Color family filter
      if (selectedColorFamily !== 'All') {
        const matchColor = product.colors.some((c) =>
          c.name.toLowerCase().includes(selectedColorFamily.toLowerCase())
        );
        if (!matchColor) return false;
      }

      // Price filter
      if (product.price > maxPrice) return false;

      // Rating filter
      if (product.rating < minRating) return false;

      // Availability
      if (inStockOnly && !product.inStock) return false;

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'bestselling':
          return b.reviewCount - a.reviewCount;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [
    selectedCategory,
    selectedStyle,
    selectedCollection,
    selectedSize,
    selectedFabric,
    selectedOccasion,
    selectedSeason,
    selectedColorFamily,
    maxPrice,
    minRating,
    inStockOnly,
    sortBy,
  ]);

  const activeFilterCount = [
    selectedCategory !== 'All',
    selectedStyle !== 'All',
    selectedCollection !== 'All',
    selectedSize !== 'All',
    selectedFabric !== 'All',
    selectedOccasion !== 'All',
    selectedSeason !== 'All',
    selectedColorFamily !== 'All',
    maxPrice < 45000,
    minRating > 0,
  ].filter(Boolean).length;

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-8 lg:px-12">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-[#1E1815]/10 pb-8 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-[#9A7B38] uppercase">
            SHUMAILA ZAMAN Couture Catalog
          </p>
          <h1 className="mt-2 font-serif-luxury text-3xl sm:text-5xl font-semibold text-[#1E1815]">
            {selectedCategory === 'All'
              ? selectedCollection !== 'All'
                ? selectedCollection
                : selectedStyle !== 'All'
                ? `${selectedStyle} Edit`
                : 'All Women’s Couture'
              : selectedCategory}
          </h1>
          <p className="mt-2 text-sm text-[#6E6259]">
            Explore {filteredProducts.length} handcrafted creations tailored in pure silk, organza, raw silk, and velvet.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenStyleFinder}
          className="inline-flex items-center gap-2 border border-[#C6A355] bg-[#F3EDE2] px-4 py-2.5 text-xs font-medium tracking-[0.14em] text-[#1E1815] uppercase self-start transition-colors hover:bg-[#C6A355]"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#9A7B38]" />
          <span>Unsure? Launch Style Finder</span>
        </button>
      </div>

      {/* VIRTUAL FILTER BAR (Quick Visual Category & Color Pills/Buttons) */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#1E1815]/10 pb-6">
        <div className="flex flex-wrap items-center gap-1.5">
          {['All', 'New Arrivals', 'Dresses', 'Eastern Wear', 'Western Wear', 'Co-Ord Sets', 'Abayas', 'Formal Wear', 'Party Wear', 'Accessories', 'Sale'].map(
            (cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 text-xs font-medium tracking-[0.1em] uppercase transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#1E1815] text-[#FAF7F2]'
                    : 'bg-[#F3EDE2]/70 text-[#1E1815]/80 hover:bg-[#EED9D4]/60'
                }`}
              >
                {cat}
              </button>
            )
          )}
        </div>

        {/* Sort & Mobile Filter Trigger */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 border border-[#1E1815]/15 bg-white px-4 py-2 text-xs font-medium tracking-[0.12em] text-[#1E1815] uppercase lg:hidden"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
          </button>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-xs text-[#6E6259] whitespace-nowrap">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="border border-[#1E1815]/15 bg-white px-3 py-2 text-xs font-medium text-[#1E1815] focus:border-[#C6A355] focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="bestselling">Best Selling</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Left Sidebar Filters + Right 4-Col Desktop / 3-Col Tablet / 2-Col Mobile Grid */}
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Sidebar Filters */}
        <aside
          className={`lg:col-span-3 space-y-6 border-r border-[#1E1815]/8 pr-0 lg:pr-6 ${
            mobileFiltersOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="flex items-center justify-between border-b border-[#1E1815]/10 pb-3">
            <span className="text-xs font-semibold tracking-[0.18em] text-[#1E1815] uppercase">
              Refine By ({activeFilterCount})
            </span>
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1 text-xs text-[#9A7B38] hover:underline"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Color Palette Visual Filter */}
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] text-[#1E1815] uppercase">
              Color Palette
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { label: 'All', hex: 'transparent' },
                { label: 'Ivory', hex: '#FAF5EE' },
                { label: 'Blush', hex: '#EED9D4' },
                { label: 'Gold', hex: '#C6A355' },
                { label: 'Rose', hex: '#C99690' },
                { label: 'Noir', hex: '#1E1815' },
              ].map((col) => (
                <button
                  key={col.label}
                  type="button"
                  onClick={() => setSelectedColorFamily(col.label)}
                  className={`inline-flex items-center gap-1.5 border px-2.5 py-1.5 text-xs transition-colors ${
                    selectedColorFamily === col.label
                      ? 'border-[#1E1815] bg-[#1E1815] text-[#FAF7F2]'
                      : 'border-[#1E1815]/15 bg-white text-[#1E1815] hover:border-[#C6A355]'
                  }`}
                >
                  {col.label !== 'All' && (
                    <span
                      className="h-3 w-3 rounded-full border border-black/20"
                      style={{ backgroundColor: col.hex }}
                    />
                  )}
                  <span>{col.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Style Filter */}
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] text-[#1E1815] uppercase">
              Style Aesthetic
            </p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {['All', ...STYLES.map((s) => s.name)].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setSelectedStyle(st)}
                  className={`border px-2.5 py-1 text-xs transition-colors ${
                    selectedStyle === st
                      ? 'border-[#1E1815] bg-[#1E1815] text-[#FAF7F2]'
                      : 'border-[#1E1815]/12 bg-[#FAF7F2] text-[#1E1815] hover:border-[#C6A355]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] text-[#1E1815] uppercase">
              Size
            </p>
            <div className="mt-2.5 grid grid-cols-4 gap-1.5 font-mono-tabular">
              {['All', 'XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSelectedSize(sz)}
                  className={`border py-1.5 text-xs font-medium transition-colors ${
                    selectedSize === sz
                      ? 'border-[#1E1815] bg-[#1E1815] text-[#FAF7F2]'
                      : 'border-[#1E1815]/15 bg-white text-[#1E1815] hover:border-[#C6A355]'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Fabric Filter */}
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] text-[#1E1815] uppercase">
              Fabric & Material
            </p>
            <div className="mt-2 space-y-1.5 text-xs">
              {[
                'All',
                'Pure Organza Silk',
                'Raw Silk',
                'Crepe Chiffon',
                'Velvet & Zari',
                'Satin Charmeuse',
                'Korean Lawn',
              ].map((fab) => (
                <button
                  key={fab}
                  type="button"
                  onClick={() => setSelectedFabric(fab)}
                  className={`block w-full py-1 text-left transition-colors ${
                    selectedFabric === fab
                      ? 'font-semibold text-[#9A7B38]'
                      : 'text-[#6E6259] hover:text-[#1E1815]'
                  }`}
                >
                  {fab}
                </button>
              ))}
            </div>
          </div>

          {/* Occasion & Season Virtual Filters */}
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] text-[#1E1815] uppercase">
              Occasion
            </p>
            <select
              value={selectedOccasion}
              onChange={(e) => setSelectedOccasion(e.target.value)}
              className="mt-2 w-full border border-[#1E1815]/15 bg-white px-3 py-2 text-xs text-[#1E1815]"
            >
              <option value="All">All Occasions</option>
              <option value="Festive & Wedding">Festive & Wedding</option>
              <option value="Evening Soirée">Evening Soirée</option>
              <option value="Daytime Chic">Daytime Chic</option>
              <option value="Work & Atelier">Work & Atelier</option>
            </select>
          </div>

          {/* Collection Filter */}
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] text-[#1E1815] uppercase">
              Collection
            </p>
            <select
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
              className="mt-2 w-full border border-[#1E1815]/15 bg-white px-3 py-2 text-xs text-[#1E1815]"
            >
              <option value="All">All Collections</option>
              {COLLECTIONS.map((c) => (
                <option key={c.id} value={c.title}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* Max Price Range */}
          <div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold tracking-[0.15em] text-[#1E1815] uppercase">
                Max Price
              </span>
              <span className="font-mono-tabular font-medium text-[#9A7B38]">
                {formatPKR(maxPrice)}
              </span>
            </div>
            <input
              type="range"
              min={10000}
              max={45000}
              step={2500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-2 w-full accent-[#C6A355]"
            />
          </div>

          {/* Minimum Rating */}
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] text-[#1E1815] uppercase">
              Customer Rating
            </p>
            <div className="mt-2 flex gap-2">
              {[0, 4.8, 4.9].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setMinRating(r)}
                  className={`border px-2.5 py-1 text-xs font-mono-tabular ${
                    minRating === r
                      ? 'border-[#1E1815] bg-[#1E1815] text-[#FAF7F2]'
                      : 'border-[#1E1815]/15 bg-white text-[#1E1815]'
                  }`}
                >
                  {r === 0 ? 'All' : `${r}★ & up`}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid: 4 cols desktop, 3 cols tablet, 2 cols mobile */}
        <div className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="border border-[#1E1815]/10 bg-[#F3EDE2]/40 py-20 text-center px-4">
              <h3 className="font-serif-luxury text-2xl text-[#1E1815]">
                No couture pieces match your exact filter combination
              </h3>
              <p className="mt-2 text-xs text-[#6E6259]">
                Try broadening your price range or resetting active filters.
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="mt-6 bg-[#1E1815] px-6 py-3 text-xs font-semibold tracking-[0.18em] text-[#FAF7F2] uppercase hover:bg-[#C6A355] hover:text-[#1E1815]"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
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
          )}
        </div>
      </div>
    </div>
  );
};
