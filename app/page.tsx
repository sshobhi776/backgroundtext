'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiEdit2 } from 'react-icons/fi';
import Header from './components/Header';
import Footer from './components/Footer';
import Logo from './components/Logo';
import FloatingObjects from './components/FloatingObjects';

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="relative w-full max-w-4xl mx-auto mb-12">
              <FloatingObjects />
              <div className="relative rounded-2xl border border-gray-700/50 overflow-hidden shadow-2xl max-h-[300px] group transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-3xl group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300"></div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                <Image
                  src="/BGBanner.webp"
                  alt="Background Text Banner"
                  width={1200}
                  height={400}
                  className="w-full h-[200px] sm:h-[250px] md:h-[300px] relative z-10 object-cover"
                  priority
                />
              </div>
            </div>
            <div className="flex justify-center mb-4 transform scale-150">
              <Logo />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Text Behind Image
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12">
              Add beautiful text to your images with advanced styling options
            </p>
            
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 bg-gray-800/80 rounded-xl transition-all duration-300 hover:bg-gray-800 hover:shadow-lg hover:shadow-blue-500/5 group">
                  <div className="text-blue-400 text-3xl mb-4 transition-transform group-hover:scale-110 duration-300">
                    <FiEdit2 className="mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Custom Text Styles</h3>
                  <p className="text-gray-400">Add text with custom fonts, colors, shadows, and strokes</p>
                </div>
                
                <div className="p-6 bg-gray-800/80 rounded-xl transition-all duration-300 hover:bg-gray-800 hover:shadow-lg hover:shadow-purple-500/5 group">
                  <div className="text-purple-400 text-3xl mb-4 transition-transform group-hover:scale-110 duration-300">
                    <svg className="mx-auto w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Image Background</h3>
                  <p className="text-gray-400">Upload your own images and customize the background</p>
                </div>
                
                <div className="p-6 bg-gray-800/80 rounded-xl transition-all duration-300 hover:bg-gray-800 hover:shadow-lg hover:shadow-blue-500/5 group">
                  <div className="text-blue-400 text-3xl mb-4 transition-transform group-hover:scale-110 duration-300">
                    <svg className="mx-auto w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Easy Download</h3>
                  <p className="text-gray-400">Download your edited image in high quality</p>
                </div>
              </div>
              
              <Link 
                href="/editor" 
                className="inline-block px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:opacity-90 transition-opacity"
              >
                Start Editing
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}