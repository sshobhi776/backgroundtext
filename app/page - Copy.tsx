'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiEdit2 } from 'react-icons/fi';
import Header from './components/Header';
import Footer from './components/Footer';
import Logo from './components/Logo';

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
          <div className="relative w-full h-[300px] mb-8 rounded-xl overflow-hidden">
              <Image
                src="/BGBanner.webp"
                alt="BackgroundText Banner"
                fill
                className="object-cover"
                priority
              />
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
                <div className="p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
                  <div className="text-blue-400 text-3xl mb-4">
                    <FiEdit2 className="mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Custom Text Styles</h3>
                  <p className="text-gray-400">Add text with custom fonts, colors, shadows, and strokes</p>
                </div>
                
                <div className="p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
                  <div className="text-purple-400 text-3xl mb-4">
                    <svg className="mx-auto w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Image Background</h3>
                  <p className="text-gray-400">Upload your own images and customize the background</p>
                </div>
                
                <div className="p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors">
                  <div className="text-blue-400 text-3xl mb-4">
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