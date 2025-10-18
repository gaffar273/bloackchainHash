import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Network, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AlgorithmOption from '../components/AlgorithmOption';
import HashOutput from '../components/HashOutput';
import { algorithms } from '../data/algorithms';
import { hashText } from '../utils/hashing';

function Home() {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [salt, setSalt] = useState('');
  const [selectedAlgo, setSelectedAlgo] = useState('sha256');
  const [hashOutput, setHashOutput] = useState('');
  const [isHashing, setIsHashing] = useState(false);

  const handleHash = async () => {
    if (!inputText.trim()) {
      toast.error('Please enter some text to hash!');
      return;
    }

    setIsHashing(true);
    toast.loading('Generating hash...', { id: 'hashing' });

    try {
      const hash = await hashText(inputText, selectedAlgo, salt);
      setHashOutput(hash);
      toast.success('Hash generated successfully!', { id: 'hashing' });
    } catch (error) {
      toast.error('Failed to generate hash', { id: 'hashing' });
      console.error(error);
    } finally {
      setIsHashing(false);
    }
  };

  const selectedAlgorithm = algorithms.find(a => a.id === selectedAlgo);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-emerald-950 text-white overflow-x-hidden pt-16">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#064e3b',
              color: '#fff',
              border: '1px solid #10b981',
            },
          }}
        />

        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>

          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '3s' }}></div>
          <div className="absolute top-3/4 right-1/4 w-40 h-40 bg-teal-400/20 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-green-400/20 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}></div>

          <div className="absolute top-10 right-1/4 w-20 h-20 bg-emerald-500/30 rounded-full blur-xl" style={{ animation: 'float 6s ease-in-out infinite' }}></div>
          <div className="absolute bottom-10 left-1/3 w-28 h-28 bg-teal-500/30 rounded-full blur-xl" style={{ animation: 'float 8s ease-in-out infinite reverse' }}></div>
          <div className="absolute top-1/3 right-10 w-16 h-16 bg-green-500/30 rounded-full blur-xl" style={{ animation: 'float 7s ease-in-out infinite', animationDelay: '1s' }}></div>

          <div className="absolute top-1/2 left-20 w-64 h-64 border-2 border-emerald-500/10 rounded-full" style={{ animation: 'spin 20s linear infinite' }}></div>
          <div className="absolute bottom-1/3 right-20 w-48 h-48 border-2 border-teal-500/10 rounded-full" style={{ animation: 'spin 15s linear infinite reverse' }}></div>

          <div className="absolute top-40 right-40 w-2 h-2 bg-emerald-400 rounded-full shadow-lg shadow-emerald-500/50 animate-ping"></div>
          <div className="absolute bottom-40 left-40 w-2 h-2 bg-teal-400 rounded-full shadow-lg shadow-teal-500/50 animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-500/50 animate-ping" style={{ animationDelay: '1s' }}></div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            33% { transform: translateY(-20px) translateX(10px); }
            66% { transform: translateY(10px) translateX(-10px); }
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>

        <div className="fixed inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <Navbar />

        <main className="relative z-10 min-h-[calc(100vh-64px)] flex items-center max-w-6xl mx-auto px-6 py-12">
          <div className="w-full">
            <div className="text-center mb-12">
              <div className="relative">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 bg-clip-text text-transparent mb-6 leading-tight">
                  Secure Hash Generator
                </h1>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left Column - Input Section */}
                  <div className="space-y-6">
                    <div className="bg-black/60 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-6 shadow-2xl shadow-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300">
                      <label className="block text-sm font-semibold text-emerald-300 mb-3">
                        Input Text
                      </label>
                      <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Enter text to hash..."
                        className="w-full h-32 bg-emerald-950/50 border border-emerald-500/40 rounded-xl px-4 py-3 text-white placeholder-emerald-700/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none transition-all duration-300"
                      />
                    </div>

                    <div className="bg-black/60 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-6 shadow-2xl shadow-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300">
                      <label className="block text-sm font-semibold text-emerald-300 mb-3">
                        Salt (Optional)
                      </label>
                      <input
                        type="text"
                        value={salt}
                        onChange={(e) => setSalt(e.target.value)}
                        placeholder="Add salt for extra security..."
                        className="w-full bg-emerald-950/50 border border-emerald-500/40 rounded-xl px-4 py-3 text-white placeholder-emerald-700/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                      />
                      <p className="text-xs text-emerald-500/70 mt-2">
                        Salt adds random data to your input before hashing, making it more secure.
                      </p>
                    </div>

                    <button
                      onClick={handleHash}
                      disabled={isHashing}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {isHashing ? 'Generating Hash...' : 'Generate Hash'}
                    </button>
                  </div>

                  {/* Right Column - Algorithm Selection */}
                  <div className="space-y-6">
                    <div className="bg-black/60 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-6 shadow-2xl shadow-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300">
                      <h3 className="text-lg font-semibold mb-4 text-emerald-300">
                        Select Hash Algorithm
                      </h3>
                      <div className="space-y-3">
                        {algorithms.map((algo) => (
                          <AlgorithmOption
                            key={algo.id}
                            algorithm={algo}
                            isSelected={selectedAlgo === algo.id}
                            onSelect={setSelectedAlgo}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <HashOutput hash={hashOutput} algorithm={selectedAlgo} />
              </div>
            </div>
          </div>
        </main>

        {/* CTA Section - Before Footer */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
          <div className="relative group">
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 animate-pulse"></div>
            
            {/* Main CTA Card */}
            <div className="relative bg-gradient-to-br from-black/80 via-emerald-950/80 to-black/80 backdrop-blur-xl border-2 border-emerald-500/30 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 text-center">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-emerald-500/30 rounded-2xl blur-xl animate-pulse"></div>
                    <div className="relative bg-gradient-to-br from-emerald-600 to-teal-600 p-4 rounded-2xl">
                      <Network className="w-12 h-12 text-white" />
                    </div>
                  </div>
                </div>

                {/* Heading */}
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                    Ready for Advanced Hashing?
                  </span>
                </h2>

                {/* Description */}
                <p className="text-lg md:text-xl text-gray-300 mb-3 max-w-3xl mx-auto">
                  Experience <span className="text-emerald-400 font-semibold">Dynamic Blockchain Network Designer</span> - 
                  Build complex hash chains with drag & drop blocks!
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm md:text-base">
                  <div className="flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">Multiple Connections</span>
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
                    <Network className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">Visual Canvas</span>
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">Unlimited Blocks</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => navigate('/home/explore')}
                  className="group/btn relative inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-500 text-white text-lg md:text-xl font-bold px-10 py-5 rounded-2xl shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  <Sparkles className="w-6 h-6 animate-pulse" />
                  <span>Explore Dynamic Hashing</span>
                  <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform duration-300" />
                  
                  {/* Button glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover/btn:opacity-100 blur-xl transition-opacity duration-300 -z-10"></div>
                </button>

                <p className="mt-6 text-gray-500 text-sm">
                  🚀 Build parallel hash chains, create merges & splits, visualize your network in real-time
                </p>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Home;