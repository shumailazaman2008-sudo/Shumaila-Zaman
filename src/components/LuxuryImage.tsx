import React, { useState } from 'react';

interface LuxuryImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export const LuxuryImage: React.FC<LuxuryImageProps> = ({
  src,
  alt,
  className = '',
  fallbackLabel,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-[#F3EDE2] via-[#EED9D4]/50 to-[#FAF7F2] p-6 text-center ${className}`}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-3 opacity-80"
        >
          <circle cx="32" cy="32" r="28" stroke="#C6A355" strokeWidth="1.2" />
          <path
            d="M37.5 21.5C35.8 19.8 33.4 19 30.8 19C26.5 19 23.5 21.4 23.5 24.8C23.5 28.4 26.8 30 31.4 31.5C36 33 39.5 35 39.5 39.5C39.5 43.8 35.8 46.5 30.5 46.5C26.8 46.5 23.8 45.2 22 43"
            stroke="#C6A355"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span className="font-serif-luxury text-sm tracking-[0.15em] text-[#1E1815]">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#F3EDE2] ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[#F3EDE2] via-[#FAF7F2] to-[#F3EDE2]" />
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`h-full w-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
