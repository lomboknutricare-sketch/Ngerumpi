import { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, MessageCircle, Instagram, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const minatOptions = [
  'Fashion & Style',
  'Gym & Fitness',
  'Belajar & Study',
  'Motor & Riding',
  'Muncak & Travel',
  'Gaming & Konten',
  'Kuliah / Sekolah ke Jawa',
  'Kecantikan & Skincare',
];

const komunitasOptions = [
  'Gym Bareng',
  'Study Partner',
  'Motor & Riding',
  'Muncak & Nongkrong',
  'Game & Konten',
  'Planning Pare / Sekolah Jawa',
  'Jastip Kosmetik & Skincare',
  'Belum tau, mau eksplor',
];

const FormSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    nama: '',
    sekolah: '',
    umur: '',
    minat: '',
    komunitas: '',
    pesan: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const form = formRef.current;

    if (!section || !left || !form) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(left,
        { x: '-4vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      gsap.fromTo(form,
        { x: '4vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Redirect to WhatsApp with form data
    const message = `Halo KoLAnPE!%0A%0ASaya mau gabung:%0A%0ANama: ${encodeURIComponent(formData.nama)}%0ASekolah: ${encodeURIComponent(formData.sekolah)}%0AUmur: ${encodeURIComponent(formData.umur)}%0AMinat: ${encodeURIComponent(formData.minat)}%0AKomunitas: ${encodeURIComponent(formData.komunitas)}%0APesan: ${encodeURIComponent(formData.pesan || '-')}`;
    
    window.open(`https://wa.me/62881027056659?text=${message}`, '_blank');

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="form-section"
      className="bg-dark-secondary py-20 lg:py-32"
    >
      <div className="px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Contact Info */}
          <div ref={leftRef} className="flex flex-col justify-center">
            <h2 className="font-display font-black text-white text-4xl lg:text-5xl mb-6">
              Mau masuk <span className="text-neon">circle ini?</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-10">
              Isi data singkat, tim kita bakal hubungin lo. Gabung ribuan anak Lombok yang udah naik level bareng KoLAnPE.
            </p>

            {/* Contact Links */}
            <div className="space-y-4">
              <a
                href="https://wa.me/62881027056659"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#25D366]/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-[#25D366]" />
                </div>
                <div>
                  <p className="text-white/40 text-sm">WhatsApp</p>
                  <p className="text-white font-medium group-hover:text-neon transition-colors">
                    0881-0270-5665
                  </p>
                </div>
              </a>

              <a
                href="https://instagram.com/Kolanpe_ngerumpi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <p className="text-white/40 text-sm">Instagram</p>
                  <p className="text-white font-medium group-hover:text-neon transition-colors">
                    @Kolanpe_ngerumpi
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5">
                <div className="w-12 h-12 rounded-xl bg-neon/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-neon" />
                </div>
                <div>
                  <p className="text-white/40 text-sm">Email</p>
                  <p className="text-white font-medium">
                    Kolanpe01@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div ref={formRef}>
            <div className="card-dark p-6 lg:p-10">
              {isSubmitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-neon/20 flex items-center justify-center mx-auto mb-6">
                    <Send className="w-8 h-8 text-neon" />
                  </div>
                  <h3 className="font-display font-bold text-white text-2xl mb-3">
                    Data Terkirim!
                  </h3>
                  <p className="text-white/60">
                    Tim kita bakal hubungin lo secepatnya.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-white/60 text-sm mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      name="nama"
                      value={formData.nama}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-neon focus:outline-none transition-colors"
                      placeholder="Masukin nama lo"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/60 text-sm mb-2">
                        Sekolah
                      </label>
                      <input
                        type="text"
                        name="sekolah"
                        value={formData.sekolah}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-neon focus:outline-none transition-colors"
                        placeholder="Nama sekolah"
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-sm mb-2">
                        Umur
                      </label>
                      <input
                        type="number"
                        name="umur"
                        value={formData.umur}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-neon focus:outline-none transition-colors"
                        placeholder="Umur lo"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/60 text-sm mb-2">
                      Minat Utama
                    </label>
                    <select
                      name="minat"
                      value={formData.minat}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-neon focus:outline-none transition-colors appearance-none"
                    >
                      <option value="" className="bg-dark">Pilih minat lo</option>
                      {minatOptions.map(option => (
                        <option key={option} value={option} className="bg-dark">
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/60 text-sm mb-2">
                      Mau Gabung Komunitas Apa?
                    </label>
                    <select
                      name="komunitas"
                      value={formData.komunitas}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-neon focus:outline-none transition-colors appearance-none"
                    >
                      <option value="" className="bg-dark">Pilih komunitas</option>
                      {komunitasOptions.map(option => (
                        <option key={option} value={option} className="bg-dark">
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/60 text-sm mb-2">
                      Pesan (Opsional)
                    </label>
                    <textarea
                      name="pesan"
                      value={formData.pesan}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-neon focus:outline-none transition-colors resize-none"
                      placeholder="Ada yang mau ditanyain?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-neon py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span>Mengirim...</span>
                    ) : (
                      <>
                        <span>Kirim & Gabung</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormSection;
