import React from 'react';
import toast from 'react-hot-toast';

const HashOutput = ({ hash, algorithm }) => {
  const copyToClipboard = () => {
    if (hash) {
      navigator.clipboard.writeText(hash);
      toast.success('Hash copied to clipboard!');
    }
  };

  if (!hash) return null;

  return (
    <div className="mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-200">Hash Output</h3>
        <button
          onClick={copyToClipboard}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition-colors"
        >
          Copy Hash
        </button>
      </div>
      <div className="bg-black/40 border border-white/20 rounded-xl p-4">
        <code className="text-sm text-green-400 break-all font-mono">
          {hash}
        </code>
      </div>
      <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
        <span>Algorithm: {algorithm.toUpperCase()}</span>
        <span>Length: {hash.length} characters</span>
      </div>
    </div>
  );
};

export default HashOutput;
