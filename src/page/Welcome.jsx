import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hash, Shield, Lock, Zap, ArrowRight, Sparkles, Code, Fingerprint } from 'lucide-react';
import Navbar from '../components/Navbar';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-emerald-950 to-black text-white overflow-x-hidden pt-16">
      <Navbar />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-12">
        <div className="text-center space-y-6 max-w-7xl w-full">
          {/* Icon Animation */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-emerald-500 to-teal-500 p-6 rounded-3xl shadow-2xl shadow-emerald-500/30 transform hover:scale-110 transition-transform duration-300">
                <Hash className="w-16 h-16" />
              </div>
            </div>
          </div>

          {/* Welcome Title */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-3">
              <Sparkles className="w-6 h-6 text-emerald-400 animate-pulse" />
              <h1 className="text-3xl md:text-6xl font-bold text-white">
                Welcome to
              </h1>
              <Sparkles className="w-6 h-6 text-emerald-400 animate-pulse" />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Crypto Hash
            </h2>
            
            <h3 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-500">
              Blockchain Explorer
            </h3>
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Dive into the world of <span className="text-emerald-400 font-semibold">cryptographic hash functions</span> and discover the technology powering blockchain security
          </p>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-4 mt-8 max-w-4xl mx-auto">
            <div className="bg-emerald-950/30 backdrop-blur-xl border border-emerald-500/20 rounded-xl p-4 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/20">
              <Shield className="w-10 h-10 text-emerald-400 mb-2 mx-auto" />
              <h4 className="text-lg font-bold text-emerald-300 mb-1">Secure</h4>
              <p className="text-gray-400 text-xs">Industry-standard algorithms used in real blockchain networks</p>
            </div>

            <div className="bg-emerald-950/30 backdrop-blur-xl border border-emerald-500/20 rounded-xl p-4 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/20">
              <Zap className="w-10 h-10 text-teal-400 mb-2 mx-auto" />
              <h4 className="text-lg font-bold text-teal-300 mb-1">Fast</h4>
              <p className="text-gray-400 text-xs">Lightning-fast hash generation with real-time results</p>
            </div>

            <div className="bg-emerald-950/30 backdrop-blur-xl border border-emerald-500/20 rounded-xl p-4 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/20">
              <Code className="w-10 h-10 text-cyan-400 mb-2 mx-auto" />
              <h4 className="text-lg font-bold text-cyan-300 mb-1">Learn</h4>
              <p className="text-gray-400 text-xs">Educational tool for understanding hash functions</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <button
              onClick={() => navigate('/home')}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-lg font-bold px-10 py-4 rounded-2xl shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-110 active:scale-95"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10"></div>
            </button>

            <p className="text-gray-500 text-xs">
              Start exploring hash algorithms in seconds
            </p>
          </div>

          {/* Bottom Info Badges */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 bg-black/40 border border-emerald-500/20 px-3 py-1.5 rounded-full">
              <Fingerprint className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs text-gray-400">5 Hash Algorithms</span>
            </div>
            <div className="flex items-center gap-2 bg-black/40 border border-emerald-500/20 px-3 py-1.5 rounded-full">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs text-gray-400">Secure & Private</span>
            </div>
            <div className="flex items-center gap-2 bg-black/40 border border-emerald-500/20 px-3 py-1.5 rounded-full">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs text-gray-400">Salt Support</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Visible on scroll */}
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

      {/* Animated Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>
    </div>
  );
};

export default Welcome;