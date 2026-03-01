import { useState, useEffect } from 'react';
import { MessageCircle, Instagram, X } from 'lucide-react';

const FloatingButtons = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappUrl = 'https://wa.me/62881027056659';
  const instagramUrl = 'https://instagram.com/Kolanpe_ngerumpi';

  return (
    <div
      className={`fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      {/* Expanded Buttons */}
      <div
        className={`flex flex-col gap-3 transition-all duration-300 ${
          isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-5 py-3 bg-[#25D366] text-white rounded-full font-medium shadow-lg hover:scale-105 transition-transform"
        >
          <MessageCircle className="w-5 h-5" />
          <span>WhatsApp</span>
        </a>
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-full font-medium shadow-lg hover:scale-105 transition-transform"
        >
          <Instagram className="w-5 h-5" />
          <span>Instagram</span>
        </a>
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-glow transition-all duration-300 hover:scale-110 ${
          isExpanded ? 'bg-white/10 rotate-45' : 'bg-neon'
        }`}
      >
        {isExpanded ? (
          <X className={`w-6 h-6 ${isExpanded ? 'text-white' : 'text-black'}`} />
        ) : (
          <MessageCircle className="w-6 h-6 text-black" />
        )}
      </button>
    </div>
  );
};

export default FloatingButtons;
