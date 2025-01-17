'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Privacy() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
              <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Privacy Policy</h1>
              <div className="prose prose-invert max-w-none">
                <p className="mb-6 text-gray-300">Last updated: January 17, 2025</p>
                
                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4 text-white">Information We Collect</h2>
                  <p className="mb-4 text-gray-300">When you use BackgroundText, we collect the following types of information:</p>
                  <ul className="list-disc pl-6 mb-4 text-gray-300 space-y-2">
                    <li>Images you upload for editing</li>
                    <li>Text content you add to images</li>
                    <li>Browser type and version</li>
                    <li>Usage statistics and preferences</li>
                  </ul>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4 text-white">How We Use Your Information</h2>
                  <p className="mb-4 text-gray-300">We use the collected information to:</p>
                  <ul className="list-disc pl-6 mb-4 text-gray-300 space-y-2">
                    <li>Provide and improve our image editing services</li>
                    <li>Analyze usage patterns to enhance user experience</li>
                    <li>Maintain and optimize our website performance</li>
                  </ul>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4 text-white">Data Security</h2>
                  <p className="mb-4 text-gray-300">We implement appropriate security measures to protect your information. Your uploaded images and text are processed securely and are not stored permanently on our servers unless explicitly requested.</p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4 text-white">Contact Us</h2>
                  <p className="text-gray-300">If you have any questions about our Privacy Policy, please contact us.</p>
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
