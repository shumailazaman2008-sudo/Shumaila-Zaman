import React, { useState } from 'react';
import { X, Ruler, CheckCircle2 } from 'lucide-react';
import { SIZE_GUIDE_DATA } from '../data/catalog';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  if (!isOpen) return null;

  const convertValue = (val: string) => {
    if (unit === 'in') return val;
    return val.replace(/(\d+)/g, (match) => String(Math.round(Number(match) * 2.54))).replace(/"/g, ' cm');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="fixed inset-0 bg-[#1E1815]/60 backdrop-blur-xs"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-2xl border border-[#1E1815]/15 bg-[#FAF7F2] p-6 sm:p-8 shadow-2xl animate-fade-up max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between border-b border-[#1E1815]/10 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-[#9A7B38] uppercase">
              <Ruler className="h-4 w-4" />
              <span>Atelier Measurement Chart</span>
            </div>
            <h2 className="mt-1 font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#1E1815]">
              SHUMAILA ZAMAN Size & Fit Guide
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Size Guide"
            className="flex h-10 w-10 items-center justify-center text-[#1E1815] hover:bg-[#1E1815]/5"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Unit Toggle */}
        <div className="mt-5 flex items-center justify-between">
          <p className="text-xs text-[#6E6259]">
            All garments include a generous 1.5-inch internal seam allowance for custom tailoring adjustments.
          </p>
          <div className="inline-flex border border-[#1E1815]/15 bg-[#F3EDE2] p-0.5 shrink-0">
            <button
              type="button"
              onClick={() => setUnit('in')}
              className={`px-3 py-1 text-xs font-medium transition-colors whitespace-nowrap ${
                unit === 'in' ? 'bg-[#1E1815] text-[#FAF7F2]' : 'text-[#1E1815]'
              }`}
            >
              Inches
            </button>
            <button
              type="button"
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 text-xs font-medium transition-colors whitespace-nowrap ${
                unit === 'cm' ? 'bg-[#1E1815] text-[#FAF7F2]' : 'text-[#1E1815]'
              }`}
            >
              CM
            </button>
          </div>
        </div>

        {/* Size Table */}
        <div className="mt-5 overflow-x-auto border border-[#1E1815]/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F3EDE2] text-xs font-semibold tracking-[0.12em] text-[#1E1815] uppercase">
              <tr>
                <th className="px-4 py-3">Size</th>
                <th className="px-4 py-3">UK Size</th>
                <th className="px-4 py-3">Bust</th>
                <th className="px-4 py-3">Waist</th>
                <th className="px-4 py-3">Hips</th>
                <th className="px-4 py-3">Length (Maxi / Kurta)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E1815]/10 font-mono-tabular text-xs">
              {SIZE_GUIDE_DATA.map((row) => (
                <tr key={row.size} className="hover:bg-[#EED9D4]/25">
                  <td className="px-4 py-3 font-semibold text-[#1E1815]">{row.size}</td>
                  <td className="px-4 py-3 text-[#6E6259]">{row.uk}</td>
                  <td className="px-4 py-3 text-[#1E1815]">{convertValue(row.bust)}</td>
                  <td className="px-4 py-3 text-[#1E1815]">{convertValue(row.waist)}</td>
                  <td className="px-4 py-3 text-[#1E1815]">{convertValue(row.hips)}</td>
                  <td className="px-4 py-3 text-[#1E1815]">{convertValue(row.length)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* How to Measure Guide */}
        <div className="mt-6 grid grid-cols-1 gap-4 bg-[#F3EDE2]/60 p-4 sm:grid-cols-3 text-xs">
          <div>
            <p className="font-semibold text-[#1E1815]">1. Bust</p>
            <p className="mt-1 text-[#6E6259]">
              Measure around the fullest part of your chest, keeping the tape level under your arms.
            </p>
          </div>
          <div>
            <p className="font-semibold text-[#1E1815]">2. Natural Waist</p>
            <p className="mt-1 text-[#6E6259]">
              Measure around the narrowest part of your waistline above your hip bone.
            </p>
          </div>
          <div>
            <p className="font-semibold text-[#1E1815]">3. Hips</p>
            <p className="mt-1 text-[#6E6259]">
              Stand with heels together and measure around the fullest contour of your hips.
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-[#1E1815]/10 pt-4 text-xs text-[#6E6259]">
          <span className="inline-flex items-center gap-1.5 text-[#2E5A44]">
            <CheckCircle2 className="h-4 w-4" />
            Complimentary size exchange within 14 days
          </span>
          <button
            type="button"
            onClick={onClose}
            className="bg-[#1E1815] px-5 py-2 text-xs font-medium tracking-[0.14em] text-[#FAF7F2] uppercase hover:bg-[#C6A355] hover:text-[#1E1815]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
