import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ClosingSectionProps {
  className?: string;
}

const ClosingSection = ({ className = '' }: ClosingSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const socialProofRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const content = contentRef.current;
    const socialProof = socialProofRef.current;

    if (!section || !bg || !content || !socialProof) return;

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
        .fromTo(bg,
          { scale: 1.08, opacity: 0 },
          { scale: 1, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(content.querySelectorAll('.animate-in'),
          { y: '12vh', opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
          0.05
        )
        .fromTo(socialProof,
          { x: '20vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.15
        );

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(bg,
          { scale: 1, opacity: 1 },
          { scale: 1.05, opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(content.querySelectorAll('.animate-in'),
          { y: 0, opacity: 1 },
          { y: '-6vh', opacity: 0, stagger: 0.02, ease: 'power2.in' },
          0.7
        )
        .fromTo(socialProof,
          { x: 0, opacity: 1 },
          { x: '10vw', opacity: 0, ease: 'power2.in' },
          0.75
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="closing"
      className={`section-pinned ${className}`}
    >
      {/* Full-bleed Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="/images/closing_fullbleed.jpg"
          alt="Komunitas KoLAnPE"
          className="w-full h-full object-cover img-cinematic"
        />
        <div className="absolute inset-0 bg-dark/55" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-16"
      >
        {/* Micro Label */}
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-neon mb-6 animate-in">
          KOLANPE NGERUMPI
        </span>

        {/* Headline */}
        <h2 className="font-display font-black text-white text-[8vw] lg:text-[6vw] leading-[0.9] tracking-[-0.02em] max-w-4xl mb-6 animate-in">
          JADI BAGIAN DARI<br />
          <span className="text-neon">GERAKAN INI.</span>
        </h2>

        {/* Subheadline */}
        <p className="text-white/70 text-lg lg:text-xl leading-relaxed max-w-2xl mb-10 animate-in">
          Produk lokal, komunitas nyata, dan jalur mandiri—semua dimulai dari satu klik.
        </p>

        {/* CTA */}
        <a
          href="#form-section"
          className="btn-neon inline-flex items-center justify-center gap-3 text-lg w-fit animate-in"
        >
          <span>Gabung Sekarang</span>
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>

      {/* Social Proof Card */}
      <div
        ref={socialProofRef}
        className="absolute bottom-[8vh] right-[6vw] card-dark px-6 py-5 flex items-center gap-4"
      >
        <div className="flex -space-x-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-neon/30 to-neon/10 border-2 border-dark flex items-center justify-center"
            >
              <Users className="w-4 h-4 text-neon" />
            </div>
          ))}
        </div>
        <div>
          <p className="font-display font-bold text-white text-lg">1,200+</p>
          <p className="text-white/60 text-sm">anak Lombok sudah gabung</p>
        </div>
      </div>
    </section>
  );
};

export default ClosingSection;
