import React from 'react'
import { Hash, Shield, Lock, Zap, ArrowRight, Sparkles, Code, Fingerprint } from 'lucide-react';

const Footer = () => {
  return (
    <div>
      <footer className="relative z-10 border-t border-emerald-500/20 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="flex items-center gap-2">
                <Hash className="w-6 h-6 text-emerald-400" />
                <span className="text-xl font-bold text-emerald-400">KGP Blockchain</span>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm">
              Season of Blockchain - IIT Kharagpur Blockchain Society
            </p>
            
            <div className="flex justify-center gap-6 text-sm text-gray-500">
              <span>Learn</span>
              <span>•</span>
              <span>Build</span>
              <span>•</span>
              <span>Innovate</span>
            </div>
            
            <p className="text-gray-600 text-xs">
              © 2024 KGP Blockchain Society. Empowering the next generation of blockchain developers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer