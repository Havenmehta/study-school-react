import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Images, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const gd = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;
const FALLBACK = "https://placehold.co/400x300/1e293b/64748b?text=Photo";

type Photo = { src: string; alt: string };
type Category = { id: string; name: string; icon: string; cover: string; photos: Photo[] };

const CATEGORIES: Category[] = [
  {
    id: "our-pride",
    name: "Our Pride",
    icon: "🏆",
    cover: gd("1-I1PTucuZYL9gkCIUWK8_Y5sIoW7Nz5x"),
    photos: [
      { src: gd("1_AEgihAoRvHN6j0vkl45CJwDD8FQooXB"), alt: "Pride of The Study — Tanisha Arya 98.17%" },
      { src: gd("1-I1PTucuZYL9gkCIUWK8_Y5sIoW7Nz5x"), alt: "Pride of The Study — Krishraj 98.50% District Topper" },
    ],
  },
  {
    id: "results-2025",
    name: "Results 2025",
    icon: "🎓",
    cover: gd("1rHLqYP1VBsrm1svL-iLMz5ReCLVnqcDV"),
    photos: [
      { src: gd("1rHLqYP1VBsrm1svL-iLMz5ReCLVnqcDV"), alt: "Class X Result 2025 — Yaminee Yadav 98.17%" },
      { src: gd("1OSEJQrLtOG5Gjw9UNDWhUQ5TrGnarpHz"),  alt: "Class X 2025 Topper Card — Yaminee Yadav" },
      { src: gd("1QfTt7LEsSW55hweBKX0-_A5ubFwwGqi3"),  alt: "Class X 2025 All Toppers" },
      { src: gd("1yAA4zfmxYFOS5EklYK0jy5iDnOfuJjFv"), alt: "Class XII Arts Result 2025 — Diya Chouhan 98.20%" },
      { src: gd("1Z9yd5qmuMGNxr0s0SgeRxRYMG4Xfq5YH"), alt: "Class XII Arts 2025 All Toppers" },
      { src: gd("1z0IWqziBdF5syIDy5PK6JkUtEmqL0dLt"), alt: "Class XII Science 2025 — Tanisha 95.8%" },
    ],
  },
  {
    id: "results-2024",
    name: "Results 2024",
    icon: "📋",
    cover: gd("103wdIQhKQJ6xsrxHZIN-_VrfcM80AvXG"),
    photos: [
      { src: gd("103wdIQhKQJ6xsrxHZIN-_VrfcM80AvXG"), alt: "Excellent Result 2024 — Class X & XII" },
      { src: gd("1EqxbNUEXxyo3E8n_xvR5m18p2RSfHsqU"), alt: "Class X Board Result 2024 Toppers" },
      { src: gd("1euaObkWD2yHQlZUP1CagZRMYxOK3KEUA"), alt: "Class X 2024 Toppers" },
      { src: gd("18bwwHNT9U-pFZdZqNDuxOp0Ibx18R3da"), alt: "Board Toppers Combined 2024" },
      { src: gd("1Zvqc9_drHu9a_AAqCT4UmW-ckVKkqEZo"),  alt: "Class XII Arts 2024 Toppers" },
    ],
  },
  {
    id: "sports-day",
    name: "Sports Day",
    icon: "🏅",
    cover: gd("1jAkTcuIVydzccU2bp9ydH_UL0-JZMhKo"),
    photos: [
      { src: gd("1jAkTcuIVydzccU2bp9ydH_UL0-JZMhKo"), alt: "Sports Day at The Study School" },
      { src: gd("1uPzLUwaogaTO5LownrGLzs1lXig_diWP"), alt: "Sports Day Activities" },
    ],
  },
  {
    id: "annual-function",
    name: "Annual Function",
    icon: "🎭",
    cover: gd("1uPzLUwaogaTO5LownrGLzs1lXig_diWP"),
    photos: [
      { src: gd("1uPzLUwaogaTO5LownrGLzs1lXig_diWP"), alt: "Annual Function" },
      { src: gd("1jAkTcuIVydzccU2bp9ydH_UL0-JZMhKo"), alt: "Annual Function Performance" },
    ],
  },
  {
    id: "cultural-activities",
    name: "Cultural Activities",
    icon: "🎨",
    cover: gd("1jAkTcuIVydzccU2bp9ydH_UL0-JZMhKo"),
    photos: [
      { src: gd("1jAkTcuIVydzccU2bp9ydH_UL0-JZMhKo"), alt: "Cultural Activity" },
      { src: gd("1uPzLUwaogaTO5LownrGLzs1lXig_diWP"), alt: "Cultural Program" },
    ],
  },
];

interface LightboxProps {
  photos: Photo[]; index: number;
  onClose: () => void; onPrev: () => void; onNext: () => void;
}
const Lightbox: React.FC<LightboxProps> = ({ photos, index, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose, onPrev, onNext]);

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white p-3 rounded-full transition-all z-10">
        <ChevronLeft size={22} />
      </button>
      <img src={photos[index].src} alt={photos[index].alt}
        className="max-h-[85vh] max-w-[85vw] object-contain rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK; }} />
      <button onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white p-3 rounded-full transition-all z-10">
        <ChevronRight size={22} />
      </button>
      <button onClick={onClose}
        className="absolute top-4 right-4 bg-white/10 hover:bg-red-500 text-white p-2 rounded-full transition-all z-10">
        <X size={20} />
      </button>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-black/50 text-white/70 text-sm px-4 py-1.5 rounded-full">
        {index + 1} / {photos.length}
      </div>
    </div>
  );
};

const Gallery: React.FC = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ photos: Photo[]; index: number } | null>(null);

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      setActiveCategory(hash);
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  }, [location.hash]);

  const activeCat = CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HERO */}
      <section className="relative bg-slate-900 text-white py-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 to-slate-900" />
        <div className="relative max-w-3xl mx-auto px-4">
          <span className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-400/10 border border-emerald-400/20 px-4 py-1.5 rounded-full mb-5 uppercase tracking-wider">
            <Images size={13} /> Photo Gallery
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Memories</h1>
          <p className="text-slate-300 text-lg">Events, achievements and proud moments from The Study School, Aspur</p>
        </div>
      </section>

      {/* TABS */}
      <div className="sticky top-[62px] z-30 bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto">
          <button onClick={() => setActiveCategory(null)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeCategory === null ? "bg-slate-900 text-white shadow-md" : "text-slate-600 hover:bg-slate-100"
            }`}>
            All Albums
          </button>
          {CATEGORIES.map((cat) => (
            <button key={cat.id} id={cat.id} onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat.id
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                  : "text-slate-600 hover:bg-slate-100"
              }`}>
              <span>{cat.icon}</span>{cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* ALL ALBUMS */}
        {!activeCategory && (
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-8">All Albums</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {CATEGORIES.map((cat) => (
                <div key={cat.id} onClick={() => setActiveCategory(cat.id)}
                  className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                  <div className="relative h-52 overflow-hidden bg-slate-200">
                    <img src={cat.cover} alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK; }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 text-white">
                      <div className="text-lg font-bold">{cat.icon} {cat.name}</div>
                      <div className="text-xs text-white/70">{cat.photos.length} photos</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SINGLE CATEGORY */}
        {activeCat && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <button onClick={() => setActiveCategory(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-medium flex items-center gap-1 transition-colors">
                <ChevronLeft size={16} /> All Albums
              </button>
              <span className="text-slate-300">/</span>
              <h2 className="text-2xl font-bold text-slate-900">{activeCat.icon} {activeCat.name}</h2>
              <span className="text-sm text-slate-400 ml-auto">{activeCat.photos.length} photos</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {activeCat.photos.map((photo, i) => (
                <div key={i}
                  onClick={() => setLightbox({ photos: activeCat.photos, index: i })}
                  className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer bg-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <img src={photo.src} alt={photo.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK; }} />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                    <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <Lightbox
          photos={lightbox.photos}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onPrev={() => setLightbox((p) => p ? { ...p, index: (p.index - 1 + p.photos.length) % p.photos.length } : null)}
          onNext={() => setLightbox((p) => p ? { ...p, index: (p.index + 1) % p.photos.length } : null)}
        />
      )}

    </div>
  );
};

export default Gallery;