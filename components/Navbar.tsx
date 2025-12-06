import React, { useState } from 'react';
import { Menu, X, Search, Globe, User } from 'lucide-react';
import { Category, ViewState } from '../types';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = Object.values(Category);

  const handleNav = (view: ViewState) => {
    onNavigate(view);
    setIsMenuOpen(false);
  };

  const isActive = (cat: Category) => 
    currentView.type === 'CATEGORY' && currentView.category === cat;

  return (
    <nav className="sticky top-0 z-50 bg-black text-white shadow-md">
      {/* Top Utility Bar */}
      <div className="bg-gray-900 px-4 py-1 flex justify-end space-x-4 text-xs text-gray-400 border-b border-gray-800">
        <button className="hover:text-white flex items-center gap-1"><Globe size={12} /> US Edition</button>
        <button className="hover:text-white flex items-center gap-1"><User size={12} /> Log In</button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer"
            onClick={() => handleNav({ type: 'HOME' })}
          >
            <div className="bg-red-600 text-white font-bold text-2xl tracking-tighter px-2 py-1 rounded-sm">
              NOVA
            </div>
            <span className="ml-2 font-bold text-xl tracking-tight hidden sm:block">NEWS</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6 items-center overflow-x-auto no-scrollbar">
             <button 
                onClick={() => handleNav({ type: 'HOME' })}
                className={`text-sm font-bold uppercase hover:text-red-500 transition-colors ${currentView.type === 'HOME' ? 'text-red-500' : 'text-gray-300'}`}
              >
                Home
              </button>
            {categories.slice(0, 6).map((cat) => (
              <button
                key={cat}
                onClick={() => handleNav({ type: 'CATEGORY', category: cat })}
                className={`text-sm font-bold uppercase hover:text-red-500 transition-colors ${isActive(cat) ? 'text-red-500' : 'text-gray-300'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Icon */}
          <div className="flex items-center">
            <button className="text-gray-300 hover:text-white p-2">
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 animate-fade-in-down">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
               onClick={() => handleNav({ type: 'HOME' })}
               className="block px-3 py-2 text-base font-medium text-white hover:bg-gray-800 w-full text-left"
            >
              Home
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleNav({ type: 'CATEGORY', category: cat })}
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 w-full text-left"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
