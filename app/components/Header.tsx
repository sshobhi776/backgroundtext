'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Logo from './Logo';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-gray-950 text-white sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              className={`px-4 py-2 rounded-full transition-all ${
                isActive('/') 
                ? 'bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 text-white' 
                : 'hover:bg-gray-800'
              }`}
            >
              Home
            </Link>
            <Link
              href="/editor"
              className={`px-4 py-2 rounded-full transition-all ${
                isActive('/editor')
                ? 'bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 text-white'
                : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20'
              }`}
            >
              Editor
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <nav className="py-4 border-t border-gray-800">
              <div className="flex flex-col space-y-2">
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg transition-all ${
                    isActive('/') 
                    ? 'bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 text-white' 
                    : 'hover:bg-gray-800'
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/editor"
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg transition-all ${
                    isActive('/editor')
                    ? 'bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 text-white'
                    : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20'
                  }`}
                >
                  Editor
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
