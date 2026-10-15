import React from 'react';

interface BrandLogoProps {
  variant?: 'header' | 'footer' | 'mobile' | 'compact';
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ variant = 'header', onClick }) => {
  if (variant === 'mobile' || variant === 'compact') {
    return (
      <button
        onClick={onClick}
        className="group inline-flex items-center gap-2 sm:gap-2.5 text-left focus:outline-none whitespace-nowrap"
        aria-label="SHUMAILA ZAMAN Home"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 transition-transform duration-200 group-hover:scale-105"
        >
          <circle cx="32" cy="32" r="30" fill="#1E1815" stroke="#C6A355" strokeWidth="1.5" />
          <circle cx="32" cy="32" r="25" stroke="#EED9D4" strokeWidth="0.6" strokeDasharray="2 2" />
          <path
            d="M37.5 21.5C35.8 19.8 33.4 19 30.8 19C26.5 19 23.5 21.4 23.5 24.8C23.5 28.4 26.8 30 31.4 31.5C36 33 39.5 35 39.5 39.5C39.5 43.8 35.8 46.5 30.5 46.5C26.8 46.5 23.8 45.2 22 43"
            stroke="#C6A355"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle cx="31.5" cy="14.5" r="1.5" fill="#EED9D4" />
          <circle cx="31.5" cy="50.5" r="1.5" fill="#EED9D4" />
        </svg>
        <div className="flex flex-col text-left">
          <span className="font-serif-luxury text-base sm:text-lg font-semibold tracking-[0.18em] sm:tracking-[0.22em] text-[#1E1815] leading-none uppercase">
            SHUMAILA ZAMAN
          </span>
          <span className="text-[7.5px] sm:text-[8px] tracking-[0.28em] uppercase text-[#9A7B38] font-medium leading-none mt-1">
            Haute Couture
          </span>
        </div>
      </button>
    );
  }

  if (variant === 'footer') {
    return (
      <button
        onClick={onClick}
        className="group inline-flex items-center gap-3.5 text-left focus:outline-none whitespace-nowrap"
        aria-label="SHUMAILA ZAMAN Home"
      >
        <svg
          width="46"
          height="46"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 transition-transform duration-200 group-hover:scale-105"
        >
          <circle cx="32" cy="32" r="30" fill="#FAF7F2" fillOpacity="0.05" stroke="#C6A355" strokeWidth="1.5" />
          <circle cx="32" cy="32" r="25.5" stroke="#EED9D4" strokeOpacity="0.45" strokeWidth="0.75" />
          <path
            d="M37.5 21.5C35.8 19.8 33.4 19 30.8 19C26.5 19 23.5 21.4 23.5 24.8C23.5 28.4 26.8 30 31.4 31.5C36 33 39.5 35 39.5 39.5C39.5 43.8 35.8 46.5 30.5 46.5C26.8 46.5 23.8 45.2 22 43"
            stroke="#C6A355"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle cx="31.5" cy="14" r="1.5" fill="#EED9D4" />
          <circle cx="31.5" cy="50" r="1.5" fill="#EED9D4" />
        </svg>
        <div className="flex flex-col text-left">
          <span className="font-serif-luxury text-xl sm:text-2xl font-semibold tracking-[0.24em] text-[#FAF7F2] leading-none uppercase">
            SHUMAILA ZAMAN
          </span>
          <span className="text-[9px] tracking-[0.34em] uppercase text-[#C6A355] font-medium leading-none mt-1">
            Haute Couture Atelier
          </span>
        </div>
      </button>
    );
  }

  // Default: 'header'
  return (
    <button
      onClick={onClick}
      className="group inline-flex items-center gap-2.5 sm:gap-3 text-left focus:outline-none whitespace-nowrap shrink-0"
      aria-label="SHUMAILA ZAMAN Home"
    >
      <svg
        width="38"
        height="38"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-200 group-hover:scale-105"
      >
        <circle cx="32" cy="32" r="30" fill="#1E1815" stroke="#C6A355" strokeWidth="1.5" />
        <circle cx="32" cy="32" r="25.5" stroke="#EED9D4" strokeOpacity="0.6" strokeWidth="0.75" />
        <path
          d="M37.5 21.5C35.8 19.8 33.4 19 30.8 19C26.5 19 23.5 21.4 23.5 24.8C23.5 28.4 26.8 30 31.4 31.5C36 33 39.5 35 39.5 39.5C39.5 43.8 35.8 46.5 30.5 46.5C26.8 46.5 23.8 45.2 22 43"
          stroke="#C6A355"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="31.5" cy="14" r="1.5" fill="#EED9D4" />
        <circle cx="31.5" cy="50" r="1.5" fill="#EED9D4" />
      </svg>
      <div className="flex flex-col text-left">
        <span className="font-serif-luxury text-xl sm:text-2xl font-semibold tracking-[0.2em] sm:tracking-[0.24em] text-[#1E1815] leading-none uppercase">
          SHUMAILA ZAMAN
        </span>
        <span className="text-[8.5px] sm:text-[9.5px] tracking-[0.32em] uppercase text-[#9A7B38] font-medium leading-none mt-1">
          Haute Couture
        </span>
      </div>
    </button>
  );
};
