import React, { useState } from 'react';
import { Check, ArrowRight, MapPin, Phone, Mail } from 'lucide-react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { BrandLogo } from './BrandLogo';
import { ActivePage } from './Navbar';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';

interface FooterProps {
  onNavigate: (page: ActivePage, categoryFilter?: string) => void;
  onOpenSizeGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSizeGuide }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().slice(0, 150);
    if (!cleanEmail) return;

    if (auth.currentUser && auth.currentUser.emailVerified) {
      const path = `subscribers/${auth.currentUser.uid}`;
      try {
        await setDoc(doc(db, 'subscribers', auth.currentUser.uid), {
          uid: auth.currentUser.uid,
          email: cleanEmail,
          createdAt: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, path);
      }
    }
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#1E1815] text-[#FAF7F2]">
      {/* Section 20: Minimal Luxury Newsletter Section */}
      <div className="border-b border-[#FAF7F2]/10">
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium tracking-[0.25em] text-[#C6A355] uppercase">
              Private Atelier List
            </p>
            <h2 className="mt-3 font-serif-luxury text-3xl sm:text-4xl font-normal tracking-[0.06em] text-[#FAF7F2]">
              BE THE FIRST TO KNOW
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#FAF7F2]/75">
              Discover new collections, exclusive offers and the latest fashion inspiration.
            </p>

            {subscribed ? (
              <div className="mt-6 inline-flex items-center gap-2 border border-[#C6A355]/40 bg-[#C6A355]/10 px-6 py-3 text-xs tracking-[0.15em] text-[#EED9D4] uppercase">
                <Check className="h-4 w-4 text-[#C6A355]" />
                <span>Welcome to the House of Shumaila Zaman Private List</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <input
                  type="email"
                  required
                  maxLength={150}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  aria-label="Enter your email"
                  className="flex-1 border border-[#FAF7F2]/20 bg-[#FAF7F2]/5 px-4 py-3.5 text-sm text-[#FAF7F2] placeholder-[#FAF7F2]/45 focus:border-[#C6A355] focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-[#C6A355] px-8 py-3.5 text-xs font-semibold tracking-[0.2em] text-[#1E1815] uppercase whitespace-nowrap transition-colors hover:bg-[#EED9D4]"
                >
                  <span>SUBSCRIBE</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <BrandLogo variant="footer" onClick={() => onNavigate('home')} />
            <p className="mt-4 text-xs leading-relaxed text-[#FAF7F2]/70">
              Timeless luxury fashion designed for the modern woman. Blending heritage Pakistani zardozi artistry with contemporary international silhouettes.
            </p>
            <div className="mt-6 flex items-center gap-4 text-xs tracking-[0.15em] text-[#C6A355] uppercase">
              <a
                href="#instagram"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('lookbook');
                }}
                className="hover:text-[#EED9D4] transition-colors"
              >
                Instagram
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="#pinterest"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('lookbook');
                }}
                className="hover:text-[#EED9D4] transition-colors"
              >
                Pinterest
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="#editorial"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('story');
                }}
                className="hover:text-[#EED9D4] transition-colors"
              >
                Journal
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="font-serif-luxury text-base font-semibold tracking-[0.18em] text-[#EED9D4] uppercase">
              Shop
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-[#FAF7F2]/75">
              {[
                { label: 'New Arrivals', cat: 'New Arrivals' },
                { label: 'Dresses', cat: 'Dresses' },
                { label: 'Eastern Wear', cat: 'Eastern Wear' },
                { label: 'Western Wear', cat: 'Western Wear' },
                { label: 'Collections', cat: 'All' },
                { label: 'Sale', cat: 'Sale' },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => onNavigate('shop', item.cat)}
                    className="transition-colors hover:text-[#C6A355]"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care Column */}
          <div>
            <h3 className="font-serif-luxury text-base font-semibold tracking-[0.18em] text-[#EED9D4] uppercase">
              Customer Care
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-[#FAF7F2]/75">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('account')}
                  className="transition-colors hover:text-[#C6A355]"
                >
                  Contact Us & Concierge
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('tracking')}
                  className="transition-colors hover:text-[#C6A355]"
                >
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('tracking')}
                  className="transition-colors hover:text-[#C6A355]"
                >
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenSizeGuide}
                  className="transition-colors hover:text-[#C6A355]"
                >
                  Size Guide
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('tracking')}
                  className="transition-colors hover:text-[#C6A355]"
                >
                  Track Order
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('style-finder')}
                  className="transition-colors hover:text-[#C6A355]"
                >
                  Style Finder & FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h3 className="font-serif-luxury text-base font-semibold tracking-[0.18em] text-[#EED9D4] uppercase">
              About
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-[#FAF7F2]/75">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('story')}
                  className="transition-colors hover:text-[#C6A355]"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('lookbook')}
                  className="transition-colors hover:text-[#C6A355]"
                >
                  Lookbook ’26
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('story')}
                  className="transition-colors hover:text-[#C6A355]"
                >
                  Artisanal Craftsmanship
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('story')}
                  className="transition-colors hover:text-[#C6A355]"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('story')}
                  className="transition-colors hover:text-[#C6A355]"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-serif-luxury text-base font-semibold tracking-[0.18em] text-[#EED9D4] uppercase">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-xs text-[#FAF7F2]/75">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C6A355]" />
                <span>concierge@shumailazaman.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C6A355]" />
                <span className="font-mono-tabular">+92 (42) 3575-8900</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C6A355]" />
                <span>Flagship Atelier: MM Alam Road, Gulberg III, Lahore, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[#FAF7F2]/10 pt-8 text-xs text-[#FAF7F2]/55 sm:flex-row">
          <p>© {new Date().getFullYear()} SHUMAILA ZAMAN Couture. All rights reserved.</p>
          <p>Cash on Delivery · Visa / Mastercard · Worldwide DHL Express</p>
        </div>
      </div>
    </footer>
  );
};
