import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  X, ArrowRight, Users, Shield, BookOpen, Award, Bell,
  Calendar, Phone, Mail, User, MessageSquare, Download,
  UserPlus, Layers, FileText, Image, ChevronRight,
  MapPin, Clock, Star, GraduationCap, Trophy, type LucideIcon,
} from "lucide-react";
import { storageService } from "../services/storage";
import { Notice, Event } from "../types";

/* ── HERO ─────────────────────────────────────────────────── */
const heroImages = ["/hero/1.jpg", "/hero/2.jpg", "/hero/3.jpg"];

const Hero = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((p) => (p + 1) % heroImages.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {heroImages.map((img, i) => (
        <img key={i} src={img}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-slate-950/85" />

      {/* Slide dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {heroImages.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)}
            className={`transition-all duration-300 rounded-full ${i === index ? "w-8 h-2 bg-emerald-400" : "w-2 h-2 bg-white/30 hover:bg-white/60"}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl text-center px-4">

        {/* LOGO + SCHOOL NAME — prominent */}
        <div className="flex flex-col items-center gap-4 mb-10">
          {/* Logo circle */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-emerald-400/25 blur-2xl scale-150" />
            <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/15 backdrop-blur-lg border-2 border-white/25 shadow-2xl flex items-center justify-center">
              <img src="/logo.png" alt="The Study School Logo" className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-lg" />
            </div>
          </div>

          {/* School name */}
          <div className="flex flex-col items-center">
            <h2 className="text-white/90 text-xl md:text-3xl font-bold tracking-widest uppercase font-serif">
              The Study School
            </h2>
            <span className="text-emerald-400 text-sm tracking-[0.3em] uppercase mt-1 font-medium">
              Aspur · Dungarpur · Rajasthan
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-20 bg-white/20" />
          <span className="text-white/40 text-xs tracking-widest uppercase">Est. 2010</span>
          <div className="h-px w-20 bg-white/20" />
        </div>

        <h1 className="text-white text-3xl md:text-6xl font-bold mb-4 leading-tight tracking-tight">
          Shaping <span className="text-emerald-400">Future</span> Leaders
        </h1>
        <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          World-class education rooted in discipline, innovation, and values — nurturing excellence since 2010.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/admissions"
            className="bg-emerald-500 hover:bg-emerald-400 text-white px-7 py-3 rounded-full font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/40 text-sm md:text-base">
            Admissions Open <ArrowRight size={18} />
          </Link>
          <Link to="/contact"
            className="bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 px-7 py-3 rounded-full text-white font-medium transition-all text-sm md:text-base">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ── NOTICE TICKER ─────────────────────────────────────────── */
const NoticeTicker = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    storageService.getNotices().then(d => setNotices(d || []));
  }, []);

  useEffect(() => {
    if (notices.length <= 1) return;
    const t = setInterval(() => setActive(p => (p + 1) % notices.length), 3500);
    return () => clearInterval(t);
  }, [notices.length]);

  if (!notices.length) return null;

  return (
    <section className="bg-emerald-600 py-4 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header row */}
        <div className="flex items-center gap-2 mb-3">
          <Bell size={16} className="text-white" />
          <span className="text-white font-bold text-sm uppercase tracking-widest">
            Latest Updates
          </span>
          <span className="ml-auto text-emerald-200 text-xs">
            {active + 1} / {notices.length}
          </span>
        </div>

        {/* Notice card */}
        <div className="bg-white/15 backdrop-blur rounded-xl px-4 py-3 min-h-[56px] flex items-center gap-3">
          {notices[active]?.isImportant && (
            <span className="shrink-0 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">
              Important
            </span>
          )}
          <p className="text-white font-semibold text-sm sm:text-base leading-snug flex-1">
            {notices[active]?.title}
          </p>
          <span className="text-emerald-200 text-xs shrink-0 hidden sm:block">
            {notices[active]?.date}
          </span>
        </div>

        {/* Dot nav */}
        {notices.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-3">
            {notices.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-6 h-2 bg-white"
                    : "w-2 h-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

/* ── WELCOME + STATS ───────────────────────────────────────── */
const Welcome = () => (
  <section className="py-20 bg-white">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-emerald-600 text-xs font-bold bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
            <GraduationCap size={13} /> About Our School
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mb-5 leading-tight">
            Welcome to<br />
            <span className="text-emerald-600">The Study School</span>
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Established on 28th June 2010 by <strong>Gopal Singh Seva Sansthan</strong>, The Study School, Aspur has grown into a trusted institution known for academic excellence, disciplined learning, and holistic development.
          </p>
          <p className="text-slate-600 leading-relaxed mb-6">
            Our philosophy blends traditional values with modern educational practices, preparing students to thrive as confident global citizens.
          </p>
          <Link to="/about" className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:gap-3 transition-all text-sm">
            Learn More About Us <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { value: "15+",   label: "Years of Excellence", icon: Star },
            { value: "2000+", label: "Students Taught",     icon: Users },
            { value: "100%",  label: "Board Results",       icon: Trophy },
            { value: "50+",   label: "Expert Faculty",      icon: GraduationCap },
          ].map((s) => (
            <div key={s.label}
              className="bg-gradient-to-br from-slate-50 to-white border border-slate-100 rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <s.icon className="mx-auto text-emerald-500 mb-3 group-hover:scale-110 transition-transform" size={26} />
              <div className="text-3xl font-bold text-slate-900">{s.value}</div>
              <div className="text-slate-500 text-xs mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ── FEATURES ──────────────────────────────────────────────── */
const Features = () => (
  <section className="py-20 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-14">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">Why Choose Us?</h2>
        <div className="w-14 h-1 bg-emerald-500 mx-auto rounded-full" />
      </div>
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { icon: Users,    title: "Qualified Faculty",   desc: "Experienced educators committed to every student's growth and success." },
          { icon: Shield,   title: "Safe Campus",         desc: "A secure, inclusive environment where every child feels at home." },
          { icon: BookOpen, title: "Smart Learning",      desc: "Modern CBSE curriculum blending technology with traditional values." },
          { icon: Award,    title: "Holistic Growth",     desc: "Academics, sports, arts — developing the complete individual." },
        ].map((f) => (
          <div key={f.title}
            className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group text-center">
            <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:bg-emerald-500 transition-colors duration-300">
              <f.icon className="text-emerald-500 group-hover:text-white transition-colors duration-300" size={26} />
            </div>
            <h3 className="font-bold text-slate-800 mb-2 text-base">{f.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── RESULTS PHOTOS GALLERY ────────────────────────────────── */
const resultPhotos = [
  "/results/1.jpg",
  "/results/2.jpg",
  "/results/3.jpg",
  "/results/4.jpg",
  "/results/5.jpg",
  "/results/6.jpg",
];

const ResultsShowcase = () => {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-emerald-600 text-xs font-bold bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
            <Trophy size={13} /> Our Achievers
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Academic Excellence</h2>
          <div className="w-14 h-1 bg-emerald-500 mx-auto rounded-full" />
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            Our students consistently achieve outstanding results. Proud moments of our toppers and achievers.
          </p>
        </div>

        {/* Achievement stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "100% Board Result", icon: "🎓" },
            { label: "District Toppers",  icon: "🏆" },
            { label: "Merit Scholars",    icon: "⭐" },
            { label: "Olympiad Winners",  icon: "🥇" },
          ].map((a) => (
            <div key={a.label} className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-2xl p-5 text-center shadow-lg shadow-emerald-500/20">
              <div className="text-3xl mb-2">{a.icon}</div>
              <div className="font-bold text-sm">{a.label}</div>
            </div>
          ))}
        </div>

        {/* Results photos grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {resultPhotos.map((photo, i) => (
            <div key={i}
              onClick={() => setLightbox(photo)}
              className="relative overflow-hidden rounded-2xl cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300 aspect-[4/3]">
              <img src={photo} alt={`Result ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-sm font-semibold">View Photo</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/academics#results"
            className="inline-flex items-center gap-2 text-emerald-600 font-bold border border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50 px-6 py-2.5 rounded-full transition-all text-sm">
            View All Results <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <img src={lightbox} alt="Result" className="max-h-[90vh] max-w-full rounded-2xl shadow-2xl" />
        </div>
      )}
    </section>
  );
};

/* ── IMPORTANT LINKS ───────────────────────────────────────── */
const navLinks = [
  { title: "About School",    icon: User,          link: "/about"      },
  { title: "Management Desk", icon: MessageSquare, link: "/leadership" },
  { title: "Downloads",       icon: Download,      link: "/academics"  },
  { title: "Principal Desk",  icon: UserPlus,      link: "/about"      },
  { title: "News & Events",   icon: Layers,        link: "/gallery"    },
  { title: "Academics",       icon: FileText,      link: "/academics"  },
  { title: "Photo Gallery",   icon: Image,         link: "/gallery"    },
  { title: "Contact Details", icon: Mail,          link: "/contact"    },
];

const ImportantLinks = () => (
  <section className="py-20 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-14">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">Quick Navigation</h2>
        <div className="w-14 h-1 bg-emerald-500 mx-auto rounded-full" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {navLinks.map((l) => (
          <Link key={l.title} to={l.link}
            className="group bg-white hover:bg-slate-900 border border-slate-100 hover:border-slate-900 rounded-2xl p-6 transition-all duration-300 text-center hover:-translate-y-1.5 hover:shadow-xl">
            <div className="w-12 h-12 bg-slate-50 group-hover:bg-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 border border-slate-100 group-hover:border-emerald-500 transition-all duration-300 shadow-sm">
              <l.icon className="text-emerald-500 group-hover:text-white transition-colors duration-300" size={22} />
            </div>
            <div className="font-semibold text-slate-700 group-hover:text-white text-sm transition-colors duration-300">{l.title}</div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

/* ── PRINCIPAL MESSAGE ─────────────────────────────────────── */
const PrincipalMessage = () => (
  <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

    <div className="relative max-w-6xl mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-14 items-center">

        {/* Photo */}
        <div className="relative">
          <div className="absolute -inset-4 bg-emerald-500/10 rounded-3xl blur-xl" />
          <img src="/principal/principal.jpg" alt="Principal"
            className="relative rounded-2xl shadow-2xl w-full object-cover border border-white/10" />
          <div className="absolute -bottom-4 left-6 bg-emerald-500 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-xl shadow-emerald-500/30">
            Principal, The Study School
          </div>
        </div>

        {/* Content */}
        <div>
          <span className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-400/10 border border-emerald-400/20 px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
            Message from the Principal
          </span>
          <h2 className="text-4xl font-bold mb-2 leading-tight">
            Principal's <span className="text-emerald-400">Message</span>
          </h2>
          {/* Principal name */}
          <p className="text-slate-400 text-sm mb-6 font-medium">— Mr. P.J. Benoy, Principal</p>

          <div className="text-emerald-400/25 text-8xl font-serif leading-none mb-2 select-none">"</div>
          <p className="text-slate-300 leading-relaxed mb-4 -mt-6">
            Education is not merely imparting bookish knowledge — it is the process of making all possible input of learning, values, discipline, and character into the mind and body of a human. The enlightening aspect of education is the most important.
          </p>
          <p className="text-slate-400 leading-relaxed mb-6">
            The Study School is driven by this force and has proved its words in a short span of period.
          </p>

          <div className="flex flex-col gap-3 border-t border-white/10 pt-5 mt-5">
            <a href="tel:+919413016306"
              className="flex items-center gap-3 text-emerald-400 hover:text-emerald-300 transition-colors group w-fit">
              <div className="w-8 h-8 bg-emerald-400/10 rounded-lg flex items-center justify-center group-hover:bg-emerald-400/20 transition-colors">
                <Phone size={14} />
              </div>
              +91 94130 16306
            </a>
            <a href="mailto:pjbenoy@gmail.com"
              className="flex items-center gap-3 text-emerald-400 hover:text-emerald-300 transition-colors group w-fit">
              <div className="w-8 h-8 bg-emerald-400/10 rounded-lg flex items-center justify-center group-hover:bg-emerald-400/20 transition-colors">
                <Mail size={14} />
              </div>
              pjbenoy@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ── EVENTS PREVIEW ────────────────────────────────────────── */
const EventsPreview = () => {
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => { storageService.getEvents().then(d => setEvents((d || []).slice(0, 3))); }, []);
  if (!events.length) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">School Happenings</h2>
            <div className="w-14 h-1 bg-emerald-500 rounded-full" />
          </div>
          <Link to="/gallery" className="hidden md:flex items-center gap-2 text-emerald-600 font-bold text-sm hover:gap-3 transition-all">
            View Gallery <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {events.map((e) => (
            <div key={e.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
              <div className="relative overflow-hidden h-52">
                <img src={e.image} alt={e.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-2 font-medium">
                  <Calendar size={12} /> {e.date}
                </div>
                <h3 className="font-bold text-slate-800">{e.title}</h3>
                {e.description && <p className="text-slate-500 text-sm mt-1.5 line-clamp-2">{e.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── CTA BANNER ────────────────────────────────────────────── */
const CTABanner = () => (
  <section className="py-16 bg-emerald-600 relative overflow-hidden">
    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/hero/1.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
    <div className="absolute inset-0 bg-emerald-600/90" />
    <div className="relative max-w-4xl mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Ready to Join The Study School Family?
      </h2>
      <p className="text-emerald-100 mb-8 max-w-xl mx-auto">
        Admissions open for 2026–27. Give your child the best foundation for a bright future.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/admissions"
          className="bg-white text-emerald-600 px-8 py-3.5 rounded-full font-bold hover:bg-emerald-50 transition-all shadow-lg hover:-translate-y-0.5">
          Apply for Admission
        </Link>
        <Link to="/contact"
          className="bg-white/10 border border-white/30 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white/20 transition-all hover:-translate-y-0.5">
          Contact Us
        </Link>
      </div>
    </div>
  </section>
);

/* ── ADMISSION POPUP ───────────────────────────────────────── */
const AdmissionPopup = () => {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", grade: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Show popup after 2.5s, only once per session
    const seen = sessionStorage.getItem("popupSeen");
    if (!seen) {
      const t = setTimeout(() => setShow(true), 2500);
      return () => clearTimeout(t);
    }
  }, []);

  const close = () => {
    setShow(false);
    sessionStorage.setItem("popupSeen", "1");
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone) return;
    setLoading(true);
    try {
      await storageService.addAdmission({
        studentName: form.name,
        parentName: "",
        phone: form.phone,
        email: "",
        grade: form.grade,
        status: "pending",
        date: new Date().toLocaleDateString("en-IN"),
      });
      setSubmitted(true);
      setTimeout(close, 2500);
    } catch {
      // silent fail
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={(e) => e.target === e.currentTarget && close()}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />

      {/* Card */}
      <div className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-slide-up">

        {/* Top green banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 pt-6 pb-8 text-white relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/10 rounded-full" />
          <div className="absolute top-4 -right-2 w-14 h-14 bg-white/10 rounded-full" />

          {/* Close button */}
          <button onClick={close}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all z-10">
            <X size={16} className="text-white" />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <img src="/logo.png" alt="Logo" className="w-9 h-9 object-contain" />
            </div>
            <div>
              <p className="text-emerald-100 text-xs font-semibold uppercase tracking-wider">The Study School</p>
              <p className="text-white text-[11px] opacity-75">Aspur, Dungarpur</p>
            </div>
          </div>

          <h2 className="text-2xl font-black leading-tight">
            Admissions Open<br />
            <span className="text-emerald-200">2026–27 🎓</span>
          </h2>
          <p className="text-emerald-100 text-sm mt-1.5">
            Nursery to Class XII · RBSE & CBSE Affiliated
          </p>
        </div>

        {/* Form */}
        <div className="px-6 py-5">
          {!submitted ? (
            <>
              <p className="text-slate-600 text-sm mb-4 font-medium">
                Fill in your details — we'll call you back! 📞
              </p>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Student / Parent Name *"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
                />
                <select
                  value={form.grade}
                  onChange={e => setForm(f => ({ ...f, grade: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-600 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all bg-white">
                  <option value="">Select Class (optional)</option>
                  {["Nursery", "LKG", "UKG", "Class 1", "Class 2", "Class 3",
                    "Class 4", "Class 5", "Class 6", "Class 7", "Class 8",
                    "Class 9", "Class 10", "Class 11", "Class 12"].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || !form.name || !form.phone}
                className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-3.5 rounded-xl transition-all text-sm shadow-lg shadow-emerald-500/25">
                {loading ? "Submitting..." : "Submit Enquiry →"}
              </button>

              <p className="text-center text-slate-400 text-xs mt-3">
                Or call us directly:{" "}
                <a href="tel:+919587697511" className="text-emerald-600 font-semibold">
                  +91-9587697511
                </a>
              </p>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="text-xl font-bold text-slate-800 mb-1">Thank You!</h3>
              <p className="text-slate-500 text-sm">
                We've received your enquiry.<br />Our team will call you shortly!
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .animate-slide-up { animation: slideUp 0.35s ease-out forwards; }
      `}</style>
    </div>
  );
};

/* ── PAGE ──────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <AdmissionPopup />
      <Hero />
      <NoticeTicker />
      <Welcome />
      <Features />
      <ResultsShowcase />
      <ImportantLinks />
      <PrincipalMessage />
      <EventsPreview />
      <CTABanner />
    </>
  );
}