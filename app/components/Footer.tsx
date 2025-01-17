import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white border-t border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          <div className="flex justify-center">
            <Logo />
          </div>
          
          <div className="flex justify-center items-center gap-6 text-sm text-gray-400">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="text-gray-600">•</span>
            <a href="/terms" className="hover:text-white transition-colors">Terms & Conditions</a>
            <span className="text-gray-600">•</span>
            <a href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <p className="text-gray-400 text-sm text-center">
            {new Date().getFullYear()} BackgroundText. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
