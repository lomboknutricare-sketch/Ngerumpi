import { Heart, MapPin } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-dark py-12 lg:py-16 border-t border-white/5">
      <div className="px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-10">
          {/* Logo & Tagline */}
          <div>
            <h3 className="font-display font-black text-white text-2xl mb-2">
              KoLAnPE <span className="text-neon">Ngerumpi</span>
            </h3>
            <p className="text-white/60 text-sm max-w-md">
              Dibuat untuk menghimpun seluruh Gen Z Lombok jadi satu kekuatan.
            </p>
            <div className="flex items-center gap-2 mt-3 text-white/40 text-sm">
              <MapPin className="w-4 h-4" />
              <span>Mataram, Lombok</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6 lg:gap-10">
            <button
              onClick={() => scrollToSection('product-categories')}
              className="text-white/60 hover:text-neon transition-colors text-sm"
            >
              Produk
            </button>
            <button
              onClick={() => scrollToSection('community-programs')}
              className="text-white/60 hover:text-neon transition-colors text-sm"
            >
              Komunitas
            </button>
            <button
              onClick={() => scrollToSection('naik-level')}
              className="text-white/60 hover:text-neon transition-colors text-sm"
            >
              Program
            </button>
            <button
              onClick={() => scrollToSection('form-section')}
              className="text-white/60 hover:text-neon transition-colors text-sm"
            >
              Kontak
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © 2026 KoLAnPE. Made di Lombok.
          </p>
          <p className="text-white/40 text-sm flex items-center gap-1">
            Dibuat dengan <Heart className="w-4 h-4 text-red-500 fill-red-500" /> untuk Gen Z Lombok
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
