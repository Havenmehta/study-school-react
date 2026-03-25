import React, { useState, useEffect, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu, X, Phone, Mail, MapPin,
  ChevronRight, ChevronDown,
  Facebook, Instagram, Youtube,
} from "lucide-react";

type Child  = { name: string; path: string };
type NavLink = { name: string; path: string; children: Child[] };
type LayoutProps = { children: ReactNode };

/* ── MOBILE ACCORDION ITEM ───────────────────────────────── */
const MobileItem = ({ link, onClose }: { link: NavLink; onClose: () => void }) => {
  const [open, setOpen] = useState(false);
  const hasKids = link.children.length > 0;

  return (
    <div className="border-b border-white/8 last:border-0">
      <div className="flex items-center">
        <Link
          to={link.path}
          onClick={() => { if (!hasKids) onClose(); }}
          className="flex-1 py-3 px-4 text-white font-semibold text-sm"
        >
          {link.name}
        </Link>
        {hasKids && (
          <button
            onClick={() => setOpen(!open)}
            className="px-4 py-3 text-white/40 hover:text-white transition-colors"
          >
            <ChevronDown size={16} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>

      {hasKids && open && (
        <div className="bg-black/20 border-t border-white/5">
          {link.children.map((child) =>
            child.path.startsWith("tel:") ? (
              <a key={child.name} href={child.path} onClick={onClose}
                className="flex items-center gap-2 py-2.5 px-6 text-sm text-emerald-400">
                <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                {child.name}
              </a>
            ) : (
              <Link key={child.name} to={child.path} onClick={onClose}
                className="flex items-center gap-2 py-2.5 px-6 text-sm text-white/60 hover:text-white transition-colors">
                <span className="w-1 h-1 rounded-full bg-white/30 shrink-0" />
                {child.name}
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
};

/* ── LAYOUT ──────────────────────────────────────────────── */
export default function Layout({ children }: LayoutProps) {
  const [isOpen, setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location.pathname, location.hash]);

  const navLinks: NavLink[] = [
    { name: "Home",       path: "/",           children: [] },
    { name: "About",      path: "/about",       children: [
      { name: "Our Story",        path: "/about#story"          },
      { name: "Vision & Mission", path: "/about#vision"         },
      { name: "Faculty",          path: "/about#faculty"        },
      { name: "Infrastructure",   path: "/about#infrastructure" },
      { name: "Leadership",       path: "/leadership"           },
    ]},
    { name: "Academics",  path: "/academics",  children: [
      { name: "Curriculum",   path: "/academics#curriculum"   },
      { name: "Subjects",     path: "/academics#subjects"     },
      { name: "Results",      path: "/academics#results"      },
      { name: "Achievements", path: "/academics#achievements" },
    ]},
    { name: "Admissions", path: "/admissions", children: [
      { name: "Admission Process", path: "/admissions#process"     },
      { name: "Eligibility",       path: "/admissions#eligibility" },
      { name: "Apply Online",      path: "/admissions#apply"       },
    ]},
    { name: "Gallery",    path: "/gallery",    children: [
      { name: "Our Pride",           path: "/gallery#our-pride"          },
      { name: "Results 2025",        path: "/gallery#results-2025"       },
      { name: "Results 2024",        path: "/gallery#results-2024"       },
      { name: "Sports Day",          path: "/gallery#sports-day"         },
      { name: "Annual Function",     path: "/gallery#annual-function"    },
      { name: "Cultural Activities", path: "/gallery#cultural-activities"},
    ]},
    { name: "Contact",    path: "/contact",    children: [
      { name: "Location Map",  path: "/contact#map"       },
      { name: "Enquiry Form",  path: "/contact#enquiry"   },
      { name: "Call Us",       path: "tel:+919587697511"  },
    ]},
    { name: "CBSE",       path: "/cbse",       children: [
      { name: "Mandatory Disclosure", path: "/cbse#mandatory"      },
      { name: "Affiliation Letter",   path: "/cbse#affiliation"    },
      { name: "Infrastructure Docs",  path: "/cbse#infrastructure" },
      { name: "Board Results",        path: "/cbse#results"        },
    ]},
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F8FC] text-slate-900">

      {/* ── HEADER ── */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/95 shadow-xl backdrop-blur-xl border-b border-white/10"
          : "bg-slate-900/80 backdrop-blur-lg"
      }`}>

        {/* Top bar */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-md" />
              <div className="relative h-10 w-10 rounded-full bg-white/90 border border-white shadow-lg flex items-center justify-center">
                <img src="/logo.png" alt="Logo" className="h-7 w-auto object-contain" />
              </div>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-white text-base tracking-wide">THE STUDY SCHOOL</span>
              <span className="text-white/55 text-[10px] tracking-widest uppercase">Aspur · Dungarpur</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link to={link.path}
                  className={`flex items-center gap-1 px-2.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === link.path
                      ? "text-white bg-white/10"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}>
                  {link.name}
                  {link.children.length > 0 && (
                    <ChevronDown size={11} className="opacity-50 group-hover:opacity-100 group-hover:rotate-180 transition-transform duration-200" />
                  )}
                </Link>

                {link.children.length > 0 && (
                  <div className="absolute left-0 top-full pt-1.5 min-w-[210px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden py-1">
                      {link.children.map((child) =>
                        child.path.startsWith("tel:") ? (
                          <a key={child.name} href={child.path}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-emerald-600 hover:bg-emerald-50 font-medium transition-colors">
                            <Phone size={11} className="text-emerald-400" />{child.name}
                          </a>
                        ) : (
                          <Link key={child.name} to={child.path}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                            <ChevronRight size={11} className="text-emerald-400" />{child.name}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Link to="/admissions"
              className="ml-2 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-bold px-4 py-2 rounded-full transition-all shadow-lg shadow-emerald-500/25">
              Admissions Open
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* ── MOBILE MENU — drops down inside header flow ── */}
        {isOpen && (
          <div className="lg:hidden bg-slate-900 border-t border-white/10 max-h-[75vh] overflow-y-auto">
            {/* Nav items */}
            <div>
              {navLinks.map((link) => (
                <MobileItem key={link.name} link={link} onClose={() => setIsOpen(false)} />
              ))}
            </div>

            {/* CTA buttons */}
            <div className="p-4 border-t border-white/10 space-y-2">
              <Link to="/admissions" onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-400 text-white py-3 rounded-xl font-bold text-sm transition-all">
                🎓 Admissions Open 2026–27
              </Link>
              <div className="grid grid-cols-2 gap-2">
                <a href="tel:+919587697511"
                  className="flex items-center justify-center gap-1.5 border border-white/15 text-white/70 py-2.5 rounded-xl text-xs font-semibold">
                  <Phone size={12} /> Call Us
                </a>
                <a href="mailto:thestudyaspur@gmail.com"
                  className="flex items-center justify-center gap-1.5 border border-white/15 text-white/70 py-2.5 rounded-xl text-xs font-semibold">
                  <Mail size={12} /> Email Us
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer equal to navbar height */}
      <div className="h-[62px]" />

      {/* ── PAGE CONTENT ── */}
      <main className="flex-1 w-full overflow-x-hidden">
        {children}
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="max-w-7xl mx-auto px-5 py-12 grid sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* School info */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                <img src="/logo.png" alt="Logo" className="h-6 w-auto object-contain" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">The Study School</div>
                <div className="text-white/40 text-xs">Aspur, Dungarpur</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Nurturing excellence and building future leaders since 2010. RBSE & CBSE Affiliated.
            </p>
            <div className="space-y-2">
              <a href="https://maps.google.com/?q=The+Study+School+Aspur+Dungarpur" target="_blank" rel="noreferrer"
                className="flex items-start gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                <MapPin size={13} className="mt-0.5 text-emerald-500 shrink-0" />
                Aspur, Dungarpur, Rajasthan – 314021
              </a>
              <a href="tel:+919587697511"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                <Phone size={13} className="text-emerald-500 shrink-0" /> +91-9587697511
              </a>
              <a href="mailto:thestudyaspur@gmail.com"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                <Mail size={13} className="text-emerald-500 shrink-0" /> thestudyaspur@gmail.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.name}>
                  <Link to={l.path}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                    <ChevronRight size={11} className="text-emerald-500/50" />
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academics */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Academics</h3>
            <ul className="space-y-2">
              {[
                ["Nursery – UKG",    "/academics"],
                ["Class I – V",      "/academics"],
                ["Class VI – X",     "/academics"],
                ["Class XI – XII",   "/academics"],
                ["Board Results",    "/academics#results"],
                ["Achievements",     "/academics#achievements"],
              ].map(([label, path]) => (
                <li key={label}>
                  <Link to={path}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                    <ChevronRight size={11} className="text-emerald-500/50" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Connect With Us</h3>
            <div className="flex gap-2.5 mb-5">
              {[
                { icon: Facebook,  label: "Facebook"  },
                { icon: Instagram, label: "Instagram" },
                { icon: Youtube,   label: "YouTube"   },
              ].map(({ icon: Icon, label }) => (
                <a key={label} href="#" aria-label={label}
                  className="w-9 h-9 bg-white/5 hover:bg-emerald-500 border border-white/10 rounded-xl flex items-center justify-center transition-all">
                  <Icon size={15} />
                </a>
              ))}
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
              <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">Admissions 2026–27</p>
              <p className="text-slate-300 text-sm mb-3">Applications are now open!</p>
              <Link to="/admissions"
                className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">
                Apply Now <ChevronRight size={11} />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/8">
          <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-slate-500 text-xs text-center sm:text-left">
              © {new Date().getFullYear()} The Study School, Aspur. All Rights Reserved.
            </p>
            <p className="text-slate-500 text-xs">
              Designed & Developed by <span className="text-emerald-400 font-semibold">MR DIGI COMPANY</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}