import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Hash, Sparkles, Zap, Menu, X } from 'lucide-react';
import logo from '../assets/logo.jpg';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Discovery', icon: Sparkles },
    { path: '/home', label: 'HashLab', icon: Zap }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-black/90 backdrop-blur-2xl border-b border-emerald-500/30 shadow-2xl shadow-emerald-500/10 mx-4 mt-4 rounded-2xl' 
        : 'bg-black/40 backdrop-blur-xl border-b border-emerald-500/20'
    }`}>
      <div className={`max-w-7xl mx-auto px-6 transition-all duration-500 ${
        isScrolled ? 'py-3' : ''
      }`}>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/30 rounded-lg blur-md group-hover:bg-emerald-500/50 transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-emerald-500 to-teal-500 p-1.5 rounded-lg">
                <img src={logo} alt="CryptoHash Logo" className='h-8 w-8 object-cover rounded'/>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                CryptoHash
              </span>
              <span className="text-[9px] text-gray-400 -mt-1 tracking-wide">KGP Blockchain</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`relative flex items-center gap-2 px-5 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  isActive(path)
                    ? 'text-white bg-emerald-500/20 shadow-lg shadow-emerald-500/20'
                    : 'text-gray-400 hover:text-emerald-300 hover:bg-emerald-500/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
                {isActive(path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
          >
            {isOpen ? (
              <X className="w-5 h-5 text-emerald-400" />
            ) : (
              <Menu className="w-5 h-5 text-emerald-400" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-fadeIn">
            <div className="flex flex-col gap-2">
              {navLinks.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    isActive(path)
                      ? 'text-white bg-emerald-500/20 shadow-lg shadow-emerald-500/20 border border-emerald-500/30'
                      : 'text-gray-400 hover:text-emerald-300 hover:bg-emerald-500/10 border border-transparent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                  {isActive(path) && (
                    <span className="ml-auto px-2 py-0.5 text-xs bg-emerald-500 text-white rounded-full">
                      Active
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
