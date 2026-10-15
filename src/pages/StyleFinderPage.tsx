import React, { useState, useMemo } from 'react';
import { Sparkles, RotateCcw, ArrowRight, Check } from 'lucide-react';
import { PRODUCTS, Product } from '../data/catalog';
import { ProductCard } from '../components/ProductCard';

interface StyleFinderPageProps {
  wishlistIds: string[];
  onToggleWishlist: (productId: string, e?: React.MouseEvent) => void;
  onQuickView: (product: Product, e?: React.MouseEvent) => void;
  onAddToBag: (product: Product, size?: string, color?: string, e?: React.MouseEvent) => void;
  onSelectProduct: (product: Product) => void;
}

export const StyleFinderPage: React.FC<StyleFinderPageProps> = ({
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToBag,
  onSelectProduct,
}) => {
  const [occasion, setOccasion] = useState<string>('');
  const [stylePref, setStylePref] = useState<string>('');
  const [colorTone, setColorTone] = useState<string>('');
  const [fitPref, setFitPref] = useState<string>('');
  const [showResults, setShowResults] = useState(false);

  const recommendedProducts = useMemo(() => {
    const scored = PRODUCTS.map((product) => {
      let score = 0;
      if (occasion && product.occasion === occasion) score += 3;
      if (
        stylePref &&
        product.styleTags.some((t) => t.toLowerCase() === stylePref.toLowerCase())
      ) {
        score += 3;
      }
      if (
        colorTone &&
        product.colors.some((c) => c.name.toLowerCase().includes(colorTone.toLowerCase()))
      ) {
        score += 2;
      }
      if (fitPref && product.fit === fitPref) score += 2;
      return { product, score };
    });

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map((item) => item.product);
  }, [occasion, stylePref, colorTone, fitPref]);

  const handleReset = () => {
    setOccasion('');
    setStylePref('');
    setColorTone('');
    setFitPref('');
    setShowResults(false);
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] text-[#9A7B38] uppercase">
          <Sparkles className="h-4 w-4" />
          <span>Bespoke Personal Stylist</span>
        </div>
        <h1 className="mt-2 font-serif-luxury text-4xl sm:text-5xl font-semibold text-[#1E1815]">
          Find Your Signature Style
        </h1>
        <p className="mt-3 text-sm text-[#6E6259]">
          Answer four brief questions about your upcoming occasion, aesthetic preference, palette, and silhouette to unlock a personalized couture edit.
        </p>
      </div>

      {/* 4 Quiz Questions */}
      <div className="mx-auto mt-10 max-w-4xl space-y-8 border border-[#1E1815]/12 bg-white p-6 sm:p-10">
        {/* Q1: Occasion */}
        <div>
          <h2 className="font-serif-luxury text-2xl font-semibold text-[#1E1815]">
            1. What type of occasion are you shopping for?
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
            {[
              'Festive & Wedding',
              'Evening Soirée',
              'Daytime Chic',
              'Work & Atelier',
            ].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setOccasion(opt)}
                className={`flex items-center justify-between border p-4 text-left text-xs font-medium transition-colors ${
                  occasion === opt
                    ? 'border-[#1E1815] bg-[#1E1815] text-[#FAF7F2]'
                    : 'border-[#1E1815]/15 bg-[#FAF7F2] text-[#1E1815] hover:border-[#C6A355]'
                }`}
              >
                <span>{opt}</span>
                {occasion === opt && <Check className="h-3.5 w-3.5 text-[#C6A355]" />}
              </button>
            ))}
          </div>
        </div>

        {/* Q2: Style Preference */}
        <div>
          <h2 className="font-serif-luxury text-2xl font-semibold text-[#1E1815]">
            2. Which style aesthetic do you prefer?
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {['Elegant', 'Minimal', 'Traditional', 'Modern', 'Romantic'].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setStylePref(opt)}
                className={`flex items-center justify-between border p-3.5 text-left text-xs font-medium transition-colors ${
                  stylePref === opt
                    ? 'border-[#1E1815] bg-[#1E1815] text-[#FAF7F2]'
                    : 'border-[#1E1815]/15 bg-[#FAF7F2] text-[#1E1815] hover:border-[#C6A355]'
                }`}
              >
                <span>{opt}</span>
                {stylePref === opt && <Check className="h-3.5 w-3.5 text-[#C6A355]" />}
              </button>
            ))}
          </div>
        </div>

        {/* Q3: Colors */}
        <div>
          <h2 className="font-serif-luxury text-2xl font-semibold text-[#1E1815]">
            3. Which signature tones do you love?
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: 'Blush', name: 'Soft Blush & Rose', hex: '#EED9D4' },
              { label: 'Ivory', name: 'Warm Ivory & Cream', hex: '#FAF5EE' },
              { label: 'Gold', name: 'Champagne & Gold', hex: '#C6A355' },
              { label: 'Espresso', name: 'Midnight Noir & Velvet', hex: '#1E1815' },
            ].map((col) => (
              <button
                key={col.label}
                type="button"
                onClick={() => setColorTone(col.label)}
                className={`flex items-center gap-3 border p-3.5 text-left text-xs font-medium transition-colors ${
                  colorTone === col.label
                    ? 'border-[#1E1815] bg-[#1E1815] text-[#FAF7F2]'
                    : 'border-[#1E1815]/15 bg-[#FAF7F2] text-[#1E1815] hover:border-[#C6A355]'
                }`}
              >
                <span
                  className="h-4 w-4 shrink-0 rounded-full border border-black/20"
                  style={{ backgroundColor: col.hex }}
                />
                <span>{col.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Q4: Preferred Fit */}
        <div>
          <h2 className="font-serif-luxury text-2xl font-semibold text-[#1E1815]">
            4. What is your preferred silhouette & fit?
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
            {[
              'Flowing Silhouette',
              'Relaxed Tailored',
              'Structured Fit',
              'Modest Drape',
            ].map((fit) => (
              <button
                key={fit}
                type="button"
                onClick={() => setFitPref(fit)}
                className={`flex items-center justify-between border p-4 text-left text-xs font-medium transition-colors ${
                  fitPref === fit
                    ? 'border-[#1E1815] bg-[#1E1815] text-[#FAF7F2]'
                    : 'border-[#1E1815]/15 bg-[#FAF7F2] text-[#1E1815] hover:border-[#C6A355]'
                }`}
              >
                <span>{fit}</span>
                {fitPref === fit && <Check className="h-3.5 w-3.5 text-[#C6A355]" />}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#1E1815]/10 pt-6">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs text-[#6E6259] hover:text-[#1E1815]"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Answers</span>
          </button>

          <button
            type="button"
            onClick={() => setShowResults(true)}
            className="inline-flex items-center gap-2 bg-[#C6A355] px-8 py-4 text-xs font-semibold tracking-[0.2em] text-[#1E1815] uppercase transition-colors hover:bg-[#1E1815] hover:text-[#FAF7F2]"
          >
            <span>Reveal My Curated Edit</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Curated Recommendations Output */}
      {showResults && (
        <div className="mt-16 border-t border-[#1E1815]/10 pt-12 animate-fade-up">
          <div className="text-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#9A7B38] uppercase">
              Tailored For Your Profile
            </p>
            <h2 className="mt-2 font-serif-luxury text-3xl sm:text-4xl font-semibold text-[#1E1815]">
              Your Personalized SHUMAILA ZAMAN Edit
            </h2>
            <p className="mt-1 text-xs text-[#6E6259]">
              Selected based on {[occasion, stylePref, colorTone, fitPref].filter(Boolean).join(' · ') || 'our flagship couture standards'}.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {recommendedProducts.map((product) => (
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
        </div>
      )}
    </div>
  );
};
