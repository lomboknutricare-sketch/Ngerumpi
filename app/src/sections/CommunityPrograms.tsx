import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Dumbbell, BookOpen, Bike, Mountain, Gamepad2, Plane, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const programs = [
  {
    id: 1,
    title: 'Gym Bareng',
    description: 'Untuk yang insecure mau upgrade fisik. Trainer gratis, motivasi berlimpah.',
    icon: Dumbbell,
    admin: '0881-0270-5665',
    waNumber: '62881027056659',
    color: 'from-orange-500/20 to-red-500/20',
  },
  {
    id: 2,
    title: 'Study Partner',
    description: 'Belajar bareng + English Basic. Nyantai tapi ngena, progres terukur.',
    icon: BookOpen,
    admin: '0881-0270-5665',
    waNumber: '62881027056659',
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    id: 3,
    title: 'Motor & Riding',
    description: 'Pretel, modif, touring bareng. Komunitas rider Lombok yang solid.',
    icon: Bike,
    admin: '0881-0270-5665',
    waNumber: '62881027056659',
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    id: 4,
    title: 'Muncak & Nongkrong',
    description: 'Healing + networking. Dari kopi sampai puncak gunung.',
    icon: Mountain,
    admin: '0881-0270-5665',
    waNumber: '62881027056659',
    color: 'from-green-500/20 to-emerald-500/20',
  },
  {
    id: 5,
    title: 'Game & Konten',
    description: 'Push rank + bikin konten. Belajar editing dan grow social media.',
    icon: Gamepad2,
    admin: '0881-0270-5665',
    waNumber: '62881027056659',
    color: 'from-yellow-500/20 to-orange-500/20',
  },
  {
    id: 6,
    title: 'Planning Pare / Sekolah Jawa',
    description: 'Rencana ke Kampung Inggris Pare atau sekolah ke Jawa. Info lengkap dan barengan.',
    icon: Plane,
    admin: '0881-0270-5665',
    waNumber: '62881027056659',
    color: 'from-indigo-500/20 to-blue-500/20',
  },
  {
    id: 7,
    title: 'Jastip Kosmetik & Skincare',
    description: 'Titip produk kecantikan, skincare, dan barang-barang feminine lainnya.',
    icon: Sparkles,
    admin: '0881-0270-5665',
    waNumber: '62881027056659',
    color: 'from-pink-500/20 to-rose-500/20',
  },
];

const CommunityPrograms = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section || !header || !cards) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(header,
        { y: '3vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Cards stagger reveal
      const cardElements = cards.querySelectorAll('.program-card');
      gsap.fromTo(cardElements,
        { y: '5vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="community-programs"
      className="bg-dark py-20 lg:py-32"
    >
      <div className="px-6 lg:px-16">
        {/* Header */}
        <div ref={headerRef} className="mb-12 lg:mb-16">
          <h2 className="font-display font-black text-white text-4xl lg:text-5xl mb-4">
            Circle & <span className="text-neon">Program</span>
          </h2>
          <p className="text-white/60 text-lg max-w-xl">
            Pilih circle yang sesuai sama minat lo.
          </p>
        </div>

        {/* Programs Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <div
                key={program.id}
                className="program-card group relative bg-dark-secondary rounded-3xl p-6 border border-white/5 hover:border-neon/35 transition-all duration-500 hover:-translate-y-1.5"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-neon/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-neon" />
                    </div>
                    <span className="text-white/40 text-xs font-mono">
                      Admin: {program.admin}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-white text-xl mb-2">
                    {program.title}
                  </h3>

                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    {program.description}
                  </p>

                  <div className="flex gap-3">
                    <a
                      href={`https://wa.me/${program.waNumber}?text=Halo%20KoLAnPE%2C%20saya%20mau%20gabung%20circle%20${encodeURIComponent(program.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 btn-neon py-3 text-sm text-center"
                    >
                      Gabung WA
                    </a>
                    <button className="px-4 py-3 rounded-full bg-white/5 text-white/60 hover:text-neon hover:bg-white/10 transition-colors">
                      <span className="text-xs">Discord</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CommunityPrograms;
