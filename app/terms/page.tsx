'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Terms() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
              <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Terms and Conditions</h1>
              <div className="prose prose-invert max-w-none">
                <p className="mb-6 text-gray-300">Last updated: January 17, 2025</p>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4 text-white">1. Acceptance of Terms</h2>
                  <p className="mb-4 text-gray-300">By accessing and using BackgroundText, you accept and agree to be bound by these Terms and Conditions.</p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4 text-white">2. Use License</h2>
                  <ul className="list-disc pl-6 mb-4 text-gray-300 space-y-2">
                    <li>Permission is granted to temporarily use this website for personal, non-commercial use only.</li>
                    <li>You must not modify or copy the materials unless explicitly allowed.</li>
                    <li>You must not use the materials for any commercial purpose.</li>
                  </ul>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4 text-white">3. User Content</h2>
                  <p className="mb-4 text-gray-300">You retain all rights to the images you upload. You are responsible for ensuring you have the necessary rights to use and modify any images you upload.</p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4 text-white">4. Limitations</h2>
                  <p className="mb-4 text-gray-300">BackgroundText shall not be held liable for any damages arising from the use or inability to use our services.</p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4 text-white">5. Revisions</h2>
                  <p className="text-gray-300">We may update these terms at any time. Please review this page periodically for changes.</p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
