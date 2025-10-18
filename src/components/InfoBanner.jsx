import React from 'react';
import { Info } from 'lucide-react';

const InfoBanner = () => {
  return (
    <div className="mb-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl backdrop-blur-sm">
      <div className="flex gap-3">
        <Info className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-blue-300 mb-1">Welcome to Hash Explorer!</h3>
          <p className="text-gray-300 text-sm">
            Explore cryptographic hash functions used in blockchain technology. Hash functions are one-way mathematical functions that convert any input into a fixed-size string of characters.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoBanner;