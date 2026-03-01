import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, BookOpen, Mountain } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FeatureSectionProps {
  className?: string;
}

const FeatureSection = ({ className = '' }: FeatureSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const centerCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const leftCard = leftCardRef.current;
    const centerCard = centerCardRef.current;
    const rightCard = rightCardRef.current;

    if (!section || !leftCard || !centerCard || !rightCard) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(leftCard,
          { x: '-60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(centerCard,
          { y: '-60vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(rightCard,
          { y: '60vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.08
        );

      // Card text reveal
      scrollTl.fromTo(
        section.querySelectorAll('.card-text'),
        { y: '3vh', opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
        0.12
      );

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(leftCard,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(centerCard,
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(rightCard,
          { y: 0, opacity: 1 },
          { y: '10vh', opacity: 0, ease: 'power2.in' },
          0.72
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className={`section-pinned bg-dark ${className}`}
    >
      {/* Left Tall Card - Naik Level */}
      <div
        ref={leftCardRef}
        className="absolute left-[6vw] top-[10vh] w-[28vw] h-[80vh] rounded-3xl overflow-hidden shadow-card relative group"
      >
        <img
          src="/images/feature_left_tall.jpg"
          alt="Naik Level"
          className="w-full h-full object-cover img-cinematic group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
          <TrendingUp className="w-8 h-8 text-neon mb-4" />
          <h3 className="font-display font-black text-white text-3xl lg:text-4xl mb-3 card-text">
            NAIK LEVEL
          </h3>
          <p className="text-white/70 text-sm lg:text-base leading-relaxed card-text">
            Upgrade diri, bukan capikir—dari style sampe skill.
          </p>
        </div>
      </div>

      {/* Center Wide Top Card - Belajar Bareng */}
      <div
        ref={centerCardRef}
        className="absolute left-[36vw] top-[10vh] w-[58vw] h-[38vh] rounded-3xl overflow-hidden shadow-card relative group"
      >
        <img
          src="/images/feature_center_top.jpg"
          alt="Belajar Bareng"
          className="w-full h-full object-cover img-cinematic group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 lg:p-8 max-w-md">
          <BookOpen className="w-8 h-8 text-neon mb-4" />
          <h3 className="font-display font-black text-white text-2xl lg:text-3xl mb-3 card-text">
            BELAJAR BARENG
          </h3>
          <p className="text-white/70 text-sm lg:text-base leading-relaxed card-text">
            Study partner & English basic yang nyantai tapi ngena.
          </p>
        </div>
      </div>

      {/* Right Wide Bottom Card - Muncak & Tour */}
      <div
        ref={rightCardRef}
        className="absolute left-[36vw] top-[52vh] w-[58vw] h-[38vh] rounded-3xl overflow-hidden shadow-card relative group"
      >
        <img
          src="/images/feature_right_bottom.jpg"
          alt="Muncak & Tour"
          className="w-full h-full object-cover img-cinematic group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 lg:p-8 max-w-md">
          <Mountain className="w-8 h-8 text-neon mb-4" />
          <h3 className="font-display font-black text-white text-2xl lg:text-3xl mb-3 card-text">
            MUNCAK & TOUR
          </h3>
          <p className="text-white/70 text-sm lg:text-base leading-relaxed card-text">
            Healing sambil networking—bukan cuma foto doang.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
