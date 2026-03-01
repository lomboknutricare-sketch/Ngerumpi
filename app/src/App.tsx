import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from './sections/HeroSection';
import GabungSection from './sections/GabungSection';
import ProdukSection from './sections/ProdukSection';
import KomunitasSection from './sections/KomunitasSection';
import FeatureSection from './sections/FeatureSection';
import NaikLevelSection from './sections/NaikLevelSection';
import ClosingSection from './sections/ClosingSection';
import ProductCategories from './sections/ProductCategories';
import CommunityPrograms from './sections/CommunityPrograms';
import FormSection from './sections/FormSection';
import Footer from './sections/Footer';
import Navigation from './components/Navigation';
import FloatingButtons from './components/FloatingButtons';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait for all sections to mount and create their ScrollTriggers
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Global snap for pinned sections
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.08 && value <= r.end + 0.08
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-dark">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Floating Buttons */}
      <FloatingButtons />
      
      {/* Pinned Sections */}
      <div className="relative z-10">
        <HeroSection className="z-10" />
        <GabungSection className="z-20" />
        <ProdukSection className="z-30" />
        <KomunitasSection className="z-40" />
        <FeatureSection className="z-50" />
        <NaikLevelSection className="z-60" />
        <ClosingSection className="z-70" />
      </div>
      
      {/* Flowing Sections */}
      <div className="relative z-80 bg-dark">
        <ProductCategories />
        <CommunityPrograms />
        <FormSection />
        <Footer />
      </div>
    </div>
  );
}

export default App;
