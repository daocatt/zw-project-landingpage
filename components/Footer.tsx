import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Share2, Mail } from 'lucide-react';
import { SITE_CONFIG } from '../constants';

const Footer: React.FC = () => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: SITE_CONFIG.name,
        text: SITE_CONFIG.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback for desktop
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-white text-lg font-semibold mb-2">{SITE_CONFIG.name}</h3>
            <p className="text-sm max-w-xs">{SITE_CONFIG.description}</p>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href={SITE_CONFIG.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-full"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <Link
              to="/contact"
              className="hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-full"
              aria-label="Contact"
            >
              <Mail size={20} />
            </Link>
            <button
              onClick={handleShare}
              className="hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-full"
              aria-label="Share"
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-xs">
          <p>{SITE_CONFIG.footerText}</p>
          <div className="mt-2">
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;