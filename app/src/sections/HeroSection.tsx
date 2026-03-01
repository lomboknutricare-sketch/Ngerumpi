import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ShoppingBag } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const headline = headlineRef.current;
    const subhead = subheadRef.current;
    const cta = ctaRef.current;

    if (!section || !image || !headline || !subhead || !cta) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation on load
      const loadTl = gsap.timeline();

      loadTl
        .fromTo(image, 
          { opacity: 0, x: '-6vw' },
          { opacity: 1, x: 0, duration: 0.9, ease: 'power2.out' }
        )
        .fromTo(headline.querySelectorAll('.word'),
          { y: '10vh', opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: 'power2.out' },
          '-=0.5'
        )
        .fromTo(subhead,
          { y: '4vh', opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(cta,
          { y: '4vh', opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
          '-=0.5'
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([image, headline, subhead, cta], { opacity: 1, x: 0, y: 0 });
          }
        }
      });

      // Exit animations (70% - 100%)
      scrollTl
        .fromTo(image,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(headline,
          { x: 0, opacity: 1 },
          { x: '10vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(subhead,
          { y: 0, opacity: 1 },
          { y: '6vh', opacity: 0, ease: 'power2.in' },
          0.75
        )
        .fromTo(cta,
          { y: 0, opacity: 1 },
          { y: '6vh', opacity: 0, ease: 'power2.in' },
          0.8
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`section-pinned bg-dark ${className}`}
    >
      {/* Left Portrait Image */}
      <div
        ref={imageRef}
        className="absolute left-0 top-0 w-[52vw] h-full z-[2]"
      >
        <img
          src="/images/hero_portrait.jpg"
          alt="Anak Lombok"
          className="w-full h-full object-cover img-cinematic"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-dark/80" />
      </div>

      {/* Right Content Area */}
      <div className="absolute left-[52vw] top-0 w-[48vw] h-full bg-dark z-[3] flex flex-col justify-center px-8 lg:px-16">
        {/* Headline */}
        <div ref={headlineRef} className="mb-8">
          <h1 className="font-display font-black text-white leading-[0.85] tracking-[-0.02em] text-[12vw] lg:text-[8vw]">
            <span className="word block">ANAK</span>
            <span className="word block text-neon">LOMBOK</span>
          </h1>
        </div>

        {/* Subheadline */}
        <div ref={subheadRef} className="mb-10 max-w-md">
          <p className="text-white/70 text-lg lg:text-xl leading-relaxed">
            Tempat semua anak Lombok naik level—dari nongkrong, gym, belajar, sampe muncak.
          </p>
        </div>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col gap-4">
          <a
            href="#form-section"
            className="btn-neon inline-flex items-center justify-center gap-3 w-fit text-lg"
          >
            <span>Gabung Sekarang</span>
            <ArrowRight className="w-5 h-5" />
          </a>
          
          <div className="flex gap-6 mt-4">
            <a
              href="#product-categories"
              className="text-white/60 hover:text-neon transition-colors flex items-center gap-2 text-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Lihat Produk</span>
            </a>
            <a
              href="#community-programs"
              className="text-white/60 hover:text-neon transition-colors text-sm"
            >
              Kenalan Dulu →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
