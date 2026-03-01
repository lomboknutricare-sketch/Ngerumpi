import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface KomunitasSectionProps {
  className?: string;
}

const KomunitasSection = ({ className = '' }: KomunitasSectionProps) => {
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
        .fromTo(rightBottom,
          { x: '60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(rightTop,
          { x: '60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(leftBottom,
          { x: '-60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.08
        );

      // Text reveal
      scrollTl.fromTo(
        section.querySelectorAll('.reveal-text'),
        { y: '5vh', opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
        0.1
      );

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(leftTop,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(rightBottom,
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(rightTop,
          { x: 0, opacity: 1 },
          { x: '12vw', opacity: 0, ease: 'power2.in' },
          0.72
        )
        .fromTo(leftBottom,
          { x: 0, opacity: 1 },
          { x: '-12vw', opacity: 0, ease: 'power2.in' },
          0.74
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="komunitas"
      className={`section-pinned bg-dark ${className}`}
    >
      {/* Left Top Image Card */}
      <div
        ref={leftTopRef}
        className="absolute left-[6vw] top-[10vh] w-[38vw] h-[42vh] rounded-3xl overflow-hidden shadow-card"
      >
        <img
          src="/images/community_left_top.jpg"
          alt="Komunitas"
          className="w-full h-full object-cover img-cinematic"
        />
      </div>

      {/* Right Top Headline Card */}
      <div
        ref={rightTopRef}
        className="absolute left-[46vw] top-[10vh] w-[48vw] h-[42vh] card-dark flex flex-col justify-center px-8 lg:px-12"
      >
        <h2 className="font-display font-black text-white text-[4.5vw] lg:text-[3.5vw] leading-[0.95] tracking-[-0.02em] reveal-text">
          KOMUNITAS<br />
          <span className="text-neon">ADALAH</span><br />
          INTINYA.
        </h2>
      </div>

      {/* Left Bottom Headline Card */}
      <div
        ref={leftBottomRef}
        className="absolute left-[6vw] top-[56vh] w-[52vw] h-[34vh] card-dark flex flex-col justify-center px-8 lg:px-12"
      >
        <p className="text-white/70 text-base lg:text-lg leading-relaxed mb-6 max-w-md reveal-text">
          Gym bareng, study partner, touring, muncak—semua circle ada di sini.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#community-programs"
            className="btn-neon inline-flex items-center justify-center gap-2 text-base w-fit reveal-text"
          >
            <Users className="w-4 h-4" />
            <span>Gabung Circle</span>
          </a>
          <a
            href="#community-programs"
            className="inline-flex items-center gap-2 text-white/60 hover:text-neon transition-colors reveal-text"
          >
            <span>Lihat Jadwal Event</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Right Bottom Image Card */}
      <div
        ref={rightBottomRef}
        className="absolute left-[60vw] top-[56vh] w-[34vw] h-[34vh] rounded-3xl overflow-hidden shadow-card"
      >
        <img
          src="/images/community_right_bottom.jpg"
          alt="Nongkrong"
          className="w-full h-full object-cover img-cinematic"
        />
      </div>
    </section>
  );
};

export default KomunitasSection;
