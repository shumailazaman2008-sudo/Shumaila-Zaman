import React, { useState, useEffect } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Compass,
  BookOpen,
  Package,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { Product } from '../data/catalog';

export type ActivePage =
  | 'home'
  | 'shop'
  | 'product'
  | 'lookbook'
  | 'story'
  | 'wishlist'
  | 'checkout'
  | 'account'
  | 'tracking'
  | 'style-finder';

interface NavbarProps {
  activePage: ActivePage;
  selectedCategory: string;
  cartCount: number;
  wishlistCount: number;
  onNavigate: (page: ActivePage, categoryFilter?: string) => void;
  onOpenSearch: () => void;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  selectedCategory,
  cartCount,
  wishlistCount,
  onNavigate,
  onOpenSearch,
  onOpenCart,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [womenDropdownOpen, setWomenDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const primaryNavLinks: { label: string; category?: Product['category'] | 'All' | 'Sale'; page: ActivePage }[] = [
    { label: 'Home', page: 'home' },
    { label: 'New Arrivals', page: 'shop', category: 'New Arrivals' },
    { label: 'Dresses', page: 'shop', category: 'Dresses' },
    { label: 'Eastern Wear', page: 'shop', category: 'Eastern Wear' },
    { label: 'Western Wear', page: 'shop', category: 'Western Wear' },
  ];

  const womenSubCategories: { label: string; category?: string; page: ActivePage }[] = [
    { label: 'All Women’s Couture', page: 'shop', category: 'All' },
    { label: 'Co-Ord Sets', page: 'shop', category: 'Co-Ord Sets' },
    { label: 'Abayas & Modest Wear', page: 'shop', category: 'Abayas' },
    { label: 'Formal & Wedding Wear', page: 'shop', category: 'Formal Wear' },
    { label: 'Party & Evening Wear', page: 'shop', category: 'Party Wear' },
    { label: 'Casual Pret', page: 'shop', category: 'Casual Wear' },
    { label: 'Accessories & Pearl Sets', page: 'shop', category: 'Accessories' },
    { label: 'Archive Sale', page: 'shop', category: 'Sale' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full border-b border-[#1E1815]/8 bg-[#FAF7F2]/95 backdrop-blur-md transition-all duration-200 ${
          isScrolled ? 'py-2.5 shadow-xs' : 'py-4'
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 sm:px-8 lg:px-12">
          {/* Zone 1: Brand Title (Single element wordmark + crest) */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="flex h-10 w-10 items-center justify-center text-[#1E1815] lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <BrandLogo
              variant={isScrolled ? 'compact' : 'header'}
              onClick={() => onNavigate('home')}
            />
          </div>

          {/* Zone 2: 5 Primary Navigation Links + Curated Women/Editorial Dropdown */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-7 text-[13px] font-medium tracking-[0.14em] text-[#1E1815] uppercase"
          >
            {primaryNavLinks.map((item) => {
              const isActive =
                (item.page === 'home' && activePage === 'home') ||
                (item.page === 'shop' &&
                  activePage === 'shop' &&
                  selectedCategory === item.category);
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => onNavigate(item.page, item.category)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors hover:text-[#9A7B38] ${
                    isActive
                      ? 'text-[#1E1815] after:absolute after:inset-x-0 after:bottom-0 after:h-[1.5px] after:bg-[#C6A355]'
                      : 'text-[#1E1815]/80'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Collections & Women Menu Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setWomenDropdownOpen(true)}
              onMouseLeave={() => setWomenDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setWomenDropdownOpen((prev) => !prev)}
                className="inline-flex items-center gap-1 py-1 whitespace-nowrap shrink-0 text-[#1E1815]/80 transition-colors hover:text-[#9A7B38]"
              >
                <span>Collections</span>
                <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200" />
              </button>

              {womenDropdownOpen && (
                <div className="absolute top-full left-1/2 z-50 w-[520px] -translate-x-1/2 pt-3">
                  <div className="grid grid-cols-2 gap-6 border border-[#1E1815]/10 bg-[#FAF7F2] p-6 shadow-xl">
                    <div>
                      <p className="mb-3 font-serif-luxury text-sm font-semibold tracking-[0.18em] text-[#9A7B38] uppercase">
                        Women’s Categories
                      </p>
                      <ul className="space-y-2">
                        {womenSubCategories.map((sub) => (
                          <li key={sub.label}>
                            <button
                              type="button"
                              onClick={() => {
                                setWomenDropdownOpen(false);
                                onNavigate(sub.page, sub.category);
                              }}
                              className="block w-full text-left text-xs font-normal tracking-[0.08em] text-[#1E1815]/85 capitalize transition-colors hover:text-[#9A7B38]"
                            >
                              {sub.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-l border-[#1E1815]/10 pl-6">
                      <p className="mb-3 font-serif-luxury text-sm font-semibold tracking-[0.18em] text-[#9A7B38] uppercase">
                        Atelier & Editorial
                      </p>
                      <ul className="space-y-2.5 text-xs tracking-[0.08em] capitalize">
                        <li>
                          <button
                            type="button"
                            onClick={() => {
                              setWomenDropdownOpen(false);
                              onNavigate('lookbook');
                            }}
                            className="flex items-center gap-2 text-[#1E1815] transition-colors hover:text-[#9A7B38]"
                          >
                            <BookOpen className="h-3.5 w-3.5 text-[#C6A355]" />
                            <span>The ’26 Interactive Lookbook</span>
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            onClick={() => {
                              setWomenDropdownOpen(false);
                              onNavigate('style-finder');
                            }}
                            className="flex items-center gap-2 text-[#1E1815] transition-colors hover:text-[#9A7B38]"
                          >
                            <Sparkles className="h-3.5 w-3.5 text-[#C6A355]" />
                            <span>Find Your Style Quiz</span>
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            onClick={() => {
                              setWomenDropdownOpen(false);
                              onNavigate('story');
                            }}
                            className="flex items-center gap-2 text-[#1E1815] transition-colors hover:text-[#9A7B38]"
                          >
                            <Compass className="h-3.5 w-3.5 text-[#C6A355]" />
                            <span>Our Story & Craftsmanship</span>
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            onClick={() => {
                              setWomenDropdownOpen(false);
                              onNavigate('tracking');
                            }}
                            className="flex items-center gap-2 text-[#1E1815] transition-colors hover:text-[#9A7B38]"
                          >
                            <Package className="h-3.5 w-3.5 text-[#C6A355]" />
                            <span>Track Your Order</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Zone 3: Primary Utility Actions (Search, Wishlist, Bag, Account) */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search collections and products"
              className="flex h-10 w-10 items-center justify-center text-[#1E1815] transition-colors hover:text-[#9A7B38]"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('wishlist')}
              aria-label="View Wishlist"
              className="relative flex h-10 w-10 items-center justify-center text-[#1E1815] transition-colors hover:text-[#9A7B38]"
            >
              <Heart className="h-[18px] w-[18px]" />
              {wishlistCount > 0 && (
                <span className="font-mono-tabular absolute top-1.5 right-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#EED9D4] px-1 text-[10px] font-medium text-[#1E1815]">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => onNavigate('account')}
              aria-label="Customer Account"
              className="hidden sm:flex h-10 w-10 items-center justify-center text-[#1E1815] transition-colors hover:text-[#9A7B38]"
            >
              <User className="h-[18px] w-[18px]" />
            </button>

            <button
              type="button"
              onClick={onOpenCart}
              aria-label="Open Shopping Bag"
              className="relative flex h-10 items-center gap-2 px-2.5 text-[#1E1815] transition-colors hover:text-[#9A7B38]"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              <span className="font-mono-tabular text-xs font-medium">
                ({cartCount})
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-[#1E1815]/50 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 flex w-[85%] max-w-sm flex-col justify-between bg-[#FAF7F2] p-6 shadow-2xl overflow-y-auto">
            <div>
              <div className="flex items-center justify-between border-b border-[#1E1815]/10 pb-4">
                <BrandLogo
                  variant="mobile"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('home');
                  }}
                />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center text-[#1E1815]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6 space-y-1">
                <p className="px-2 pb-2 text-[11px] font-semibold tracking-[0.2em] text-[#9A7B38] uppercase">
                  Shop Categories
                </p>
                {[
                  { label: 'Home', page: 'home' as ActivePage },
                  { label: 'New Arrivals', page: 'shop' as ActivePage, category: 'New Arrivals' },
                  { label: 'All Women', page: 'shop' as ActivePage, category: 'All' },
                  { label: 'Dresses', page: 'shop' as ActivePage, category: 'Dresses' },
                  { label: 'Eastern Wear', page: 'shop' as ActivePage, category: 'Eastern Wear' },
                  { label: 'Western Wear', page: 'shop' as ActivePage, category: 'Western Wear' },
                  { label: 'Co-Ord Sets', page: 'shop' as ActivePage, category: 'Co-Ord Sets' },
                  { label: 'Abayas', page: 'shop' as ActivePage, category: 'Abayas' },
                  { label: 'Formal & Party Wear', page: 'shop' as ActivePage, category: 'Formal Wear' },
                  { label: 'Sale Edit', page: 'shop' as ActivePage, category: 'Sale' },
                ].map((link) => (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigate(link.page, link.category);
                    }}
                    className="flex w-full items-center justify-between rounded-none px-2 py-2.5 text-left font-serif-luxury text-lg font-medium text-[#1E1815] transition-colors hover:bg-[#EED9D4]/40"
                  >
                    <span>{link.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-6 border-t border-[#1E1815]/10 pt-6 space-y-2">
                <p className="px-2 pb-1 text-[11px] font-semibold tracking-[0.2em] text-[#9A7B38] uppercase">
                  The House of Shumaila Zaman
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('lookbook');
                  }}
                  className="block w-full px-2 py-2 text-left text-sm text-[#1E1815] hover:text-[#9A7B38]"
                >
                  Interactive Lookbook ’26
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('style-finder');
                  }}
                  className="block w-full px-2 py-2 text-left text-sm text-[#1E1815] hover:text-[#9A7B38]"
                >
                  Style Finder Quiz
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('story');
                  }}
                  className="block w-full px-2 py-2 text-left text-sm text-[#1E1815] hover:text-[#9A7B38]"
                >
                  Our Story & Atelier
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('tracking');
                  }}
                  className="block w-full px-2 py-2 text-left text-sm text-[#1E1815] hover:text-[#9A7B38]"
                >
                  Track Order
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('account');
                  }}
                  className="block w-full px-2 py-2 text-left text-sm text-[#1E1815] hover:text-[#9A7B38]"
                >
                  My Account & Dashboard
                </button>
              </div>
            </div>

            <div className="mt-8 border-t border-[#1E1815]/10 pt-4 text-xs text-[#6E6259]">
              <p>Complimentary Shipping over Rs. 25,000</p>
              <p className="mt-1">Lahore · Karachi · Islamabad · Dubai</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
