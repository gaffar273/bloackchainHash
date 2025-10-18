import React from 'react';

const AlgorithmOption = ({ algorithm, isSelected, onSelect }) => {
  const Icon = algorithm.icon;
  
  return (
    <div
      onClick={() => onSelect(algorithm.id)}
      className={`group relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'border-emerald-500 bg-emerald-500/20 shadow-lg shadow-emerald-500/20'
          : 'border-emerald-500/20 bg-black/30 hover:border-emerald-500/40 hover:bg-emerald-950/30'
      }`}
    >
      {/* Main content */}
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-lg bg-gradient-to-br ${algorithm.color} flex-shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-base text-white">{algorithm.name}</h4>
            {isSelected && (
              <span className="px-2 py-0.5 bg-emerald-500 text-white text-[10px] rounded-full">
                Active
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Hover tooltip - appears above */}
      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-72 p-4 bg-black/95 backdrop-blur-xl border border-emerald-500/30 rounded-xl shadow-2xl shadow-emerald-500/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none">
        {/* Arrow pointing down to the card */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-emerald-500/30"></div>
        
        <div className="flex items-start gap-2 mb-2">
          <div className={`p-1.5 rounded-lg bg-gradient-to-br ${algorithm.color} flex-shrink-0`}>
            <Icon className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-emerald-300 text-sm">{algorithm.name}</h4>
        </div>
        
        <p className="text-xs text-gray-300 leading-relaxed">
          {algorithm.description}
        </p>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-emerald-500/5 rounded-xl -z-10 blur-xl"></div>
      </div>
    </div>
  );
};

export default AlgorithmOption;