import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X, ArrowUpRight, Clock, TrendingUp } from 'lucide-react';
import { PRODUCTS, CATEGORIES, Product, formatPKR } from '../data/catalog';
import { LuxuryImage } from './LuxuryImage';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (category: string) => void;
}

const POPULAR_SEARCHES = [
  'black dress',
  'summer collection',
  'formal wear',
  'pink kurti',
  'party dress',
  'ivory abaya',
  'silk co-ord',
];

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectCategory,
}) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Rose Garden Maxi',
    'pink kurti',
    'formal wear',
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  const matchingProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS.slice(0, 4);

    return PRODUCTS.filter((p) => {
      const searchableText = [
        p.name,
        p.category,
        ...p.subCategories,
        ...p.styleTags,
        p.collection,
        p.fabric,
        p.season,
        p.shortDescription,
        ...p.colors.map((c) => c.name),
        // semantic aliases for user queries like "black dress", "summer collection", "pink kurti", "party dress"
        p.id.includes('midnight') || p.id.includes('velvet-soirée') ? 'black dress evening gown' : '',
        p.season === 'Summer/Spring' || p.id.includes('lawn') || p.id.includes('blush-silk')
          ? 'summer collection lawn'
          : '',
        p.id.includes('kurti') || p.colors.some((c) => c.name.toLowerCase().includes('blush'))
          ? 'pink kurti blush kurta'
          : '',
        p.subCategories.includes('Party Wear') || p.category === 'Dresses'
          ? 'party dress formal wear'
          : '',
      ]
        .join(' ')
        .toLowerCase();

      return q.split(' ').every((word) => searchableText.includes(word));
    });
  }, [query]);

  const matchingCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CATEGORIES.slice(0, 5);
    return CATEGORIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q)
    );
  }, [query]);

  const handleQuickQuery = (term: string) => {
    setQuery(term);
    if (!recentSearches.includes(term)) {
      setRecentSearches((prev) => [term, ...prev.slice(0, 4)]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#FAF7F2]/98 backdrop-blur-md animate-fade-up">
      {/* Top Search Bar Header */}
      <div className="border-b border-[#1E1815]/10">
        <div className="mx-auto flex max-w-[1440px] items-center gap-4 px-4 py-5 sm:px-8 lg:px-12">
          <Search className="h-5 w-5 shrink-0 text-[#9A7B38]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 'black dress', 'summer collection', 'formal wear', 'pink kurti', 'party dress'..."
            className="w-full bg-transparent font-serif-luxury text-xl sm:text-2xl text-[#1E1815] placeholder-[#6E6259]/60 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-xs tracking-[0.15em] text-[#6E6259] uppercase hover:text-[#1E1815]"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#1E1815]/15 text-[#1E1815] transition-colors hover:bg-[#1E1815] hover:text-[#FAF7F2]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Search Body */}
      <div className="mx-auto w-full max-w-[1440px] flex-1 overflow-y-auto px-4 py-8 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Column: Popular, Recent & Categories */}
          <div className="space-y-8 lg:col-span-4">
            {/* Popular Searches */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-[#9A7B38] uppercase">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>Popular Searches</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => handleQuickQuery(term)}
                    className={`border px-3 py-1.5 text-xs transition-colors whitespace-nowrap ${
                      query.toLowerCase() === term.toLowerCase()
                        ? 'border-[#1E1815] bg-[#1E1815] text-[#FAF7F2]'
                        : 'border-[#1E1815]/12 bg-[#F3EDE2]/60 text-[#1E1815] hover:border-[#C6A355]'
                    }`}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center justify-between text-xs font-semibold tracking-[0.18em] text-[#6E6259] uppercase">
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5" />
                    Recent Searches
                  </span>
                  <button
                    type="button"
                    onClick={() => setRecentSearches([])}
                    className="text-[11px] font-normal text-[#6E6259] hover:text-[#1E1815]"
                  >
                    Clear
                  </button>
                </div>
                <ul className="mt-3 space-y-2">
                  {recentSearches.map((item) => (
                    <li key={item}>
                      <button
                        type="button"
                        onClick={() => setQuery(item)}
                        className="flex w-full items-center justify-between py-1 text-left text-sm text-[#1E1815]/85 hover:text-[#9A7B38]"
                      >
                        <span>{item}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Matching Categories */}
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-[#9A7B38] uppercase">
                Categories
              </p>
              <ul className="mt-3 divide-y divide-[#1E1815]/8">
                {matchingCategories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectCategory(cat.name);
                        onClose();
                      }}
                      className="flex w-full items-center justify-between py-2.5 text-left transition-colors hover:text-[#9A7B38]"
                    >
                      <div>
                        <p className="font-serif-luxury text-base font-medium text-[#1E1815]">
                          {cat.name}
                        </p>
                        <p className="text-xs text-[#6E6259]">{cat.subtitle}</p>
                      </div>
                      <span className="font-mono-tabular text-xs text-[#6E6259]">
                        {cat.itemCount}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Matching Products */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between border-b border-[#1E1815]/10 pb-3">
              <p className="text-xs font-semibold tracking-[0.18em] text-[#1E1815] uppercase">
                {query.trim()
                  ? `Matching Creations (${matchingProducts.length})`
                  : 'Curated Trending Pieces'}
              </p>
              {query.trim() && (
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory('All');
                    onClose();
                  }}
                  className="text-xs font-medium text-[#9A7B38] hover:underline"
                >
                  View all in Shop →
                </button>
              )}
            </div>

            {matchingProducts.length === 0 ? (
              <div className="py-16 text-center">
                <p className="font-serif-luxury text-2xl text-[#1E1815]">
                  No exact matches found for “{query}”
                </p>
                <p className="mt-2 text-sm text-[#6E6259]">
                  Try searching for ‘black dress’, ‘pink kurti’, ‘formal wear’, or explore our signature collections.
                </p>
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {matchingProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="group cursor-pointer"
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-[#F3EDE2]">
                      <LuxuryImage
                        src={product.primaryImage}
                        alt={product.name}
                        className="h-full w-full transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-2.5 text-[11px] tracking-[0.1em] text-[#6E6259] uppercase">
                      {product.category}
                    </p>
                    <h4 className="font-serif-luxury text-base font-medium text-[#1E1815] group-hover:text-[#9A7B38]">
                      {product.name}
                    </h4>
                    <p className="mt-0.5 font-mono-tabular text-xs font-medium text-[#1E1815]">
                      {formatPKR(product.price)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
