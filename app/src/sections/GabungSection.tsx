import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface GabungSectionProps {
  className?: string;
}

const GabungSection = ({ className = '' }: GabungSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const topLeftRef = useRef<HTMLDivElement>(null);
  const topRightRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const topLeft = topLeftRef.current;
    const topRight = topRightRef.current;
    const bottomLeft = bottomLeftRef.current;
    const bottomRight = bottomRightRef.current;

    if (!section || !topLeft || !topRight || !bottomLeft || !bottomRight) return;

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
        .fromTo(topLeft,
          { x: '-60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(bottomRight,
          { x: '60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(topRight,
          { x: '60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(bottomLeft,
          { x: '-60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.08
        );

      // Text reveal (10% - 30%)
      scrollTl.fromTo(
        section.querySelectorAll('.reveal-text'),
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
        0.1
      );

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(topLeft,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(bottomRight,
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(topRight,
          { x: 0, opacity: 1 },
          { x: '12vw', opacity: 0, ease: 'power2.in' },
          0.72
        )
        .fromTo(bottomLeft,
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
      id="gabung"
      className={`section-pinned bg-dark ${className}`}
    >
      {/* Top Left Photo Card */}
      <div
        ref={topLeftRef}
        className="absolute left-[6vw] top-[8vh] w-[38vw] h-[34vh] rounded-3xl overflow-hidden shadow-card"
      >
        <img
          src="/images/community_top_left.jpg"
          alt="Komunitas"
          className="w-full h-full object-cover img-cinematic"
        />
      </div>

      {/* Top Right Headline Card */}
      <div
        ref={topRightRef}
        className="absolute left-[46vw] top-[8vh] w-[48vw] h-[34vh] card-dark flex flex-col justify-center px-8 lg:px-12"
      >
        <h2 className="font-display font-black text-white text-[4vw] lg:text-[3vw] leading-[0.95] tracking-[-0.02em] reveal-text">
          GABUNG SAMA<br />
          <span className="text-neon">RIBUAN ANAK</span><br />
          LOMBOK.
        </h2>
      </div>

      {/* Bottom Left Headline Card */}
      <div
        ref={bottomLeftRef}
        className="absolute left-[6vw] top-[46vh] w-[52vw] h-[46vh] card-dark flex flex-col justify-center px-8 lg:px-12"
      >
        <p className="text-white/70 text-lg lg:text-xl leading-relaxed mb-8 max-w-md reveal-text">
          Nongkrong, gym, belajar, touring—semua ada circle-nya.
        </p>
        <a
          href="#community-programs"
          className="inline-flex items-center gap-2 text-neon hover:underline reveal-text"
        >
          <span>Lihat Komunitas</span>
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>

      {/* Bottom Right Photo Card */}
      <div
        ref={bottomRightRef}
        className="absolute left-[60vw] top-[46vh] w-[34vw] h-[46vh] rounded-3xl overflow-hidden shadow-card"
      >
        <img
          src="/images/community_bottom_right.jpg"
          alt="Tongkrongan"
          className="w-full h-full object-cover img-cinematic"
        />
      </div>
    </section>
  );
};

export default GabungSection;
