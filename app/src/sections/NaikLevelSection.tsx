import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface NaikLevelSectionProps {
  className?: string;
}

const NaikLevelSection = ({ className = '' }: NaikLevelSectionProps) => {
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

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(leftTop,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(rightTop,
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(leftBottom,
          { x: 0, opacity: 1 },
          { x: '-12vw', opacity: 0, ease: 'power2.in' },
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
      id="naik-level"
      className={`section-pinned bg-dark ${className}`}
    >
      {/* Left Top Headline Card */}
      <div
        ref={leftTopRef}
        className="absolute left-[6vw] top-[10vh] w-[52vw] h-[42vh] card-dark flex flex-col justify-center px-8 lg:px-12"
      >
        <h2 className="font-display font-black text-white text-[4.5vw] lg:text-[3.5vw] leading-[0.95] tracking-[-0.02em]">
          NAIK LEVEL,<br />
          <span className="text-neon">BUKAN</span><br />
          CAPIKIR.
        </h2>
      </div>

      {/* Right Top Image Card */}
      <div
        ref={rightTopRef}
        className="absolute left-[60vw] top-[10vh] w-[34vw] h-[42vh] rounded-3xl overflow-hidden shadow-card"
      >
        <img
          src="/images/journey_right_top.jpg"
          alt="Belajar"
          className="w-full h-full object-cover img-cinematic"
        />
      </div>

      {/* Left Bottom Image Card */}
      <div
        ref={leftBottomRef}
        className="absolute left-[6vw] top-[56vh] w-[38vw] h-[34vh] rounded-3xl overflow-hidden shadow-card"
      >
        <img
          src="/images/journey_left_bottom.jpg"
          alt="Kerja"
          className="w-full h-full object-cover img-cinematic"
        />
      </div>

      {/* Right Bottom CTA Card */}
      <div
        ref={rightBottomRef}
        className="absolute left-[46vw] top-[56vh] w-[48vw] h-[34vh] card-dark flex flex-col justify-center px-8 lg:px-12"
      >
        <p className="text-white/70 text-base lg:text-lg leading-relaxed mb-6 max-w-md">
          Dari nongkrong biasa jadi mandiri: English, jualan online, content creator, tour guide.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#form-section"
            className="btn-neon inline-flex items-center justify-center gap-2 text-base w-fit"
          >
            <Rocket className="w-4 h-4" />
            <span>Gabung Program Upgrade</span>
          </a>
          <a
            href="#community-programs"
            className="inline-flex items-center gap-2 text-white/60 hover:text-neon transition-colors"
          >
            <span>Lihat Silabus</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default NaikLevelSection;
