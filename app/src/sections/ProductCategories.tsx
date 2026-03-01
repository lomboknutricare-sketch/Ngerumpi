import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Shirt, Headphones, Backpack, Bike } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    id: 1,
    title: 'Fashion',
    subtitle: 'Sekolah & Tongkrongan',
    description: 'Hoodie, kaos, tote bag, dan jaket dengan desain khas Lombok.',
    image: '/images/product_fashion.jpg',
    icon: Shirt,
    priceRange: '50rb - 300rb',
  },
  {
    id: 2,
    title: 'Elektronik',
    subtitle: 'Aksesoris Gadget',
    description: 'Headset, powerbank, holder HP, tripod untuk konten creator.',
    image: '/images/product_electronic.jpg',
    icon: Headphones,
    priceRange: '30rb - 500rb',
  },
  {
    id: 3,
    title: 'Sekolah',
    subtitle: 'Perlengkapan Unik',
    description: 'Tas transparan, planner, pulpen estetik untuk Gen Z.',
    image: '/images/product_school.jpg',
    icon: Backpack,
    priceRange: '15rb - 150rb',
  },
  {
    id: 4,
    title: 'Motor',
    subtitle: 'Aksesoris Riding',
    description: 'Spion custom, striping, stiker Lombok Pride untuk motor lo.',
    image: '/images/product_motor.jpg',
    icon: Bike,
    priceRange: '25rb - 400rb',
  },
];

const ProductCategories = () => {
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
        { y: '4vh', opacity: 0 },
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
      const cardElements = cards.querySelectorAll('.category-card');
      gsap.fromTo(cardElements,
        { y: '6vh', opacity: 0 },
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
      id="product-categories"
      className="bg-dark py-20 lg:py-32"
    >
      <div className="px-6 lg:px-16">
        {/* Header */}
        <div ref={headerRef} className="mb-12 lg:mb-16">
          <h2 className="font-display font-black text-white text-4xl lg:text-5xl mb-4">
            Produk <span className="text-neon">KoLAnPE</span>
          </h2>
          <p className="text-white/60 text-lg max-w-xl">
            Dibuat di Lombok, dikirim ke seluruh Indonesia.
          </p>
        </div>

        {/* Categories Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className="category-card group relative bg-dark-secondary rounded-3xl overflow-hidden border border-white/5 hover:border-neon/35 transition-all duration-500 hover:-translate-y-1.5"
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-neon/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-neon" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-white text-lg">
                        {category.title}
                      </h3>
                      <p className="text-white/50 text-xs">{category.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-white/60 text-sm leading-relaxed mb-4">
                    {category.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-neon text-sm font-medium">
                      {category.priceRange}
                    </span>
                    <a
                      href="https://wa.me/62881027056659"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-white/60 hover:text-neon transition-colors text-sm"
                    >
                      <span>Pesan</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
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

export default ProductCategories;
