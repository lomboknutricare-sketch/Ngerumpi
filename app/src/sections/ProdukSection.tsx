import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ShoppingCart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProdukSectionProps {
  className?: string;
}

const ProdukSection = ({ className = '' }: ProdukSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftTopRef = useRef<HTMLDivElement>(null);
  const rightTopRef = useRef<HTMLDivElement>(null);
  const leftBottomRef = useRef<HTMLDivElement>(null);
  const rightBottomRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const leftTop = leftTopRef.current;
    const rightTop = rightTopRef.current;
    const leftBottom = leftBottomRef.current;
    const rightBottom = rightBottomRef.current;

    if (!section || !leftTop || !rightTop || !leftBottom || !rightBottom) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(leftTop,
          { x: '-60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(rightTop,
          { x: '60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(leftBottom,
          { x: '-60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(rightBottom,
          { x: '60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.08
        );

      // CTA button reveal
      scrollTl.fromTo(
        section.querySelector('.cta-btn'),
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none' },
        0.15
      );

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(leftTop,
          { x: 0, opacity: 1 },
          { x: '-12vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(rightTop,
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(leftBottom,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.72
        )
        .fromTo(rightBottom,
          { x: 0, opacity: 1 },
          { x: '12vw', opacity: 0, ease: 'power2.in' },
          0.74
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="produk"
      className={`section-pinned bg-dark ${className}`}
    >
      {/* Left Top Headline Card */}
      <div
        ref={leftTopRef}
        className="absolute left-[6vw] top-[10vh] w-[52vw] h-[42vh] card-dark flex flex-col justify-center px-8 lg:px-12"
      >
        <h2 className="font-display font-black text-white text-[4.5vw] lg:text-[3.5vw] leading-[0.95] tracking-[-0.02em]">
          PRODUK LOKAL,<br />
          <span className="text-neon">KUALITAS</span><br />
          NASIONAL.
        </h2>
      </div>

      {/* Right Top Product Image Card */}
      <div
        ref={rightTopRef}
        className="absolute left-[60vw] top-[10vh] w-[34vw] h-[42vh] rounded-3xl overflow-hidden shadow-card"
      >
        <img
          src="/images/product_top_right.jpg"
          alt="Produk"
          className="w-full h-full object-cover img-cinematic"
        />
      </div>

      {/* Left Bottom Product Image Card */}
      <div
        ref={leftBottomRef}
        className="absolute left-[6vw] top-[56vh] w-[38vw] h-[34vh] rounded-3xl overflow-hidden shadow-card"
      >
        <img
          src="/images/product_bottom_left.jpg"
          alt="Fashion"
          className="w-full h-full object-cover img-cinematic"
        />
      </div>

      {/* Right Bottom CTA Card */}
      <div
        ref={rightBottomRef}
        className="absolute left-[46vw] top-[56vh] w-[48vw] h-[34vh] card-dark flex flex-col justify-center px-8 lg:px-12"
      >
        <p className="text-white/70 text-base lg:text-lg leading-relaxed mb-6 max-w-md">
          Fashion, aksesoris, gear motor—semua dari Lombok, buat seluruh Indonesia.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#product-categories"
            className="cta-btn btn-neon inline-flex items-center justify-center gap-2 text-base w-fit"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Belanja Sekarang</span>
          </a>
          <a
            href="https://wa.me/62881027056659"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/60 hover:text-neon transition-colors"
          >
            <span>Jadi Seller</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProdukSection;
