import React from 'react';
import { ArrowRight, Award, Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';
import { ASSETS } from '../data/catalog';
import { LuxuryImage } from '../components/LuxuryImage';

interface OurStoryPageProps {
  onExploreCollection: () => void;
  onOpenLookbook: () => void;
}

export const OurStoryPage: React.FC<OurStoryPageProps> = ({
  onExploreCollection,
  onOpenLookbook,
}) => {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Banner */}
      <section className="relative bg-[#1E1815] py-24 text-[#FAF7F2]">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6 space-y-6">
              <p className="text-xs font-semibold tracking-[0.26em] text-[#C6A355] uppercase">
                The House of Shumaila Zaman · Est. Lahore
              </p>
              <h1
                className="font-serif-luxury text-4xl sm:text-6xl font-normal leading-tight text-[#FAF7F2]"
                style={{ textWrap: 'balance' }}
              >
                Where Heritage Craftsmanship Meets Modern Femininity
              </h1>
              <p className="text-sm sm:text-base leading-relaxed text-[#FAF7F2]/80">
                Founded with a devotion to understated opulence, SHUMAILA ZAMAN creates heirloom eastern couture and contemporary western silhouettes in signature tones of warm ivory, soft blush rose, and antique gold.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="aspect-[16/10] overflow-hidden border border-[#C6A355]/30">
                <LuxuryImage
                  src={ASSETS.editorialLookbook}
                  alt="SHUMAILA ZAMAN Couture Atelier"
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Centerpiece Brand Manifesto Quote */}
      <section className="mx-auto max-w-4xl px-4 text-center sm:px-8">
        <div className="border-y border-[#C6A355]/40 py-14">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#9A7B38] uppercase">
            Our Philosophy
          </p>
          <blockquote
            className="mt-5 font-serif-luxury text-3xl sm:text-5xl italic font-normal leading-snug text-[#1E1815]"
            style={{ textWrap: 'balance' }}
          >
            “Fashion is not just what you wear. It is how you express who you are.”
          </blockquote>
          <p className="mt-4 text-xs tracking-[0.2em] text-[#6E6259] uppercase">
            — Shumaila Zaman, Creative Director
          </p>
        </div>
      </section>

      {/* Five Pillars: Elegance, Quality, Confidence, Individuality, Modern Femininity */}
      <section className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5">
            <div className="aspect-[3/4] overflow-hidden bg-[#F3EDE2]">
              <LuxuryImage
                src={ASSETS.roseGardenMaxi}
                alt="Hand-worked Zardozi and Organza Silk Detail"
                className="h-full w-full"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-[#9A7B38] uppercase">
                Atelier Savoir-Faire
              </p>
              <h2 className="mt-2 font-serif-luxury text-3xl sm:text-4xl font-semibold text-[#1E1815]">
                Crafted Without Compromise
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#6E6259]">
                Every SHUMAILA ZAMAN garment begins on the handloom with pure mulberry silk organza, Korean raw silk, and Medina crepe. Master artisans spend up to 140 hours hand-embellishing a single formal ensemble using antique gold tilla, dabka, and natural freshwater pearls.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[
                {
                  icon: Sparkles,
                  title: '01. Timeless Elegance',
                  desc: 'Silhouettes that transcend fleeting trends, designed to be cherished and worn across seasons.',
                },
                {
                  icon: Award,
                  title: '02. Uncompromising Quality',
                  desc: '100% pure natural silks, breathable linings, and French-seam interior finishing.',
                },
                {
                  icon: ShieldCheck,
                  title: '03. Quiet Confidence',
                  desc: 'Tailored proportions that flatter and empower the modern woman from boardroom to wedding soirée.',
                },
                {
                  icon: HeartHandshake,
                  title: '04. Individuality & Heritage',
                  desc: 'Small-batch couture editions that honor generational Pakistani embroidery artisans.',
                },
              ].map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="border border-[#1E1815]/10 bg-[#F3EDE2]/50 p-6"
                  >
                    <Icon className="h-5 w-5 text-[#9A7B38]" />
                    <h3 className="mt-3 font-serif-luxury text-xl font-semibold text-[#1E1815]">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#6E6259]">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                type="button"
                onClick={onExploreCollection}
                className="inline-flex items-center gap-2 bg-[#1E1815] px-7 py-3.5 text-xs font-semibold tracking-[0.2em] text-[#FAF7F2] uppercase transition-colors hover:bg-[#C6A355] hover:text-[#1E1815]"
              >
                <span>Shop The Signature Collection</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={onOpenLookbook}
                className="inline-flex items-center gap-2 border border-[#1E1815]/25 px-7 py-3.5 text-xs font-semibold tracking-[0.2em] text-[#1E1815] uppercase transition-colors hover:bg-[#EED9D4]/50"
              >
                <span>Explore Lookbook ’26</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
