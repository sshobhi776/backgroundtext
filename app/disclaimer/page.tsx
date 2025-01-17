'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Disclaimer() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
              <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Disclaimer</h1>
              <div className="prose prose-invert max-w-none">
                <p className="mb-6 text-gray-300">Last updated: January 17, 2025</p>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4 text-white">Website Disclaimer</h2>
                  <p className="mb-4 text-gray-300">The information provided by BackgroundText on our website is for general informational purposes only. All information is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on our website.</p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4 text-white">External Links Disclaimer</h2>
                  <p className="mb-4 text-gray-300">Our website may contain links to other websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.</p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4 text-white">Professional Disclaimer</h2>
                  <p className="mb-4 text-gray-300">The site cannot and does not contain professional advice. The information is provided for general informational and educational purposes only and is not a substitute for professional advice.</p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4 text-white">Fair Use Disclaimer</h2>
                  <p className="mb-4 text-gray-300">This website may use copyrighted material which has not always been specifically authorized by the copyright owner. We are making such material available for criticism, comment, news reporting, teaching, scholarship, or research.</p>
                </section>

                <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-4 text-white">Contact Us</h2>
                  <p className="text-gray-300">If you have any questions about this Disclaimer, please contact us.</p>
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
