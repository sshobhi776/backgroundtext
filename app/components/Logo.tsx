'use client';

import { Outfit } from 'next/font/google';
import Link from 'next/link';

const outfit = Outfit({ 
  subsets: ['latin'],
  weight: ['700', '900']  // Using bold and black weights
});

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <span className={`text-3xl ${outfit.className} tracking-tight`}>
        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent hover:from-blue-500 hover:via-purple-500 hover:to-pink-600 transition-all duration-300">
          <span className="font-bold">Background</span>
          <span className="font-black">Text</span>
        </span>
      </span>
    </Link>
  );
}
