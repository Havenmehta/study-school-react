import React, { useEffect, useState } from "react";
import { Target, Eye, Award, Users, BookOpen, ChevronRight, GraduationCap, MapPin, Calendar } from "lucide-react";

const storyLeftImages  = ["/about/story-left-1.jpg","/about/story-left-2.jpg","/about/story-left-3.jpg","/about/story-left-4.jpg","/about/story-left-5.jpg"];
const storyRightImages = ["/about/story-right-1.jpg","/about/story-right-2.jpg","/about/story-right-3.jpg","/about/story-right-4.jpg","/about/story-right-5.jpg"];

const About: React.FC = () => {
  const [leftIndex,  setLeftIndex]  = useState(0);
  const [rightIndex, setRightIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setLeftIndex((p)  => (p + 1) % storyLeftImages.length);
      setRightIndex((p) => (p + 1) % storyRightImages.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div>

      {/* HERO */}
      <section className="relative bg-slate-900 text-white py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero/1.jpg')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-900" />
        <div className="relative max-w-3xl mx-auto px-4">
          <span className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-400/10 border border-emerald-400/20 px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
            <GraduationCap size={13} /> Est. 2010 · Aspur
          </span>
          <h1 className="text-5xl font-bold mb-4">About Us</h1>
          <p className="text-slate-300 text-lg">Know our story, mission and the people who make it happen</p>
        </div>
      </section>

      {/* OUR STORY */}
      <section id="story" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-emerald-600 text-xs font-bold bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">Our Story</span>
            <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
              A Journey of <span className="text-emerald-600">Excellence</span>
            </h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              Founded on <strong>28th June 2010</strong> by <strong>Gopal Singh Seva Sansthan</strong>, The Study School, Aspur began its journey with a small group of students and dedicated teachers in Dungarpur, Rajasthan.
            </p>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Over the years, we have grown into a full-fledged RBSE-affiliated Senior Secondary School offering classes from Nursery to Class XII with Arts and Science streams. Our philosophy blends traditional values with modern educational practices.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { value: "2010", label: "Founded" },
                { value: "15+",  label: "Years"   },
                { value: "XII",  label: "Till Class" },
              ].map((s) => (
                <div key={s.label} className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
                  <div className="text-2xl font-bold text-emerald-600">{s.value}</div>
                  <div className="text-slate-500 text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            <a href="/admissions" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold transition-all shadow-lg shadow-emerald-500/30">
              Apply Now <ChevronRight size={16} />
            </a>
          </div>

          {/* Sliding images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-xl">
              {storyLeftImages.map((img, i) => (
                <img key={img} src={img}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === leftIndex ? "opacity-100" : "opacity-0"}`} />
              ))}
            </div>
            <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-xl mt-8">
              {storyRightImages.map((img, i) => (
                <img key={img} src={img}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === rightIndex ? "opacity-100" : "opacity-0"}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VISION MISSION VALUES */}
      <section id="vision" className="py-20 bg-slate-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Vision, Mission & Values</h2>
            <div className="w-14 h-1 bg-emerald-500 mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Eye,    title: "Our Vision",  color: "border-blue-400",    bg: "bg-blue-50",    iconColor: "text-blue-500",
                text: "To become a center of excellence in education that inspires creativity, leadership, and lifelong learning in every student." },
              { icon: Target, title: "Our Mission", color: "border-emerald-500", bg: "bg-emerald-50", iconColor: "text-emerald-500",
                text: "To provide a safe, inclusive, and innovative learning environment that empowers students to achieve their highest potential." },
              { icon: Award,  title: "Our Values",  color: "border-amber-400",   bg: "bg-amber-50",   iconColor: "text-amber-500",
                text: "Integrity, Excellence, Respect, and Responsibility guide our teaching, relationships, and community engagement." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title}
                  className={`bg-white rounded-2xl p-8 border-t-4 ${item.color} shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300`}>
                  <div className={`w-14 h-14 ${item.bg} rounded-xl flex items-center justify-center mb-5`}>
                    <Icon size={28} className={item.iconColor} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FACULTY */}
      <section id="faculty" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Our Faculty</h2>
            <div className="w-14 h-1 bg-emerald-500 mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users,    title: "Experienced Teachers",  desc: "Qualified and passionate educators with years of teaching experience in RBSE curriculum." },
              { icon: BookOpen, title: "Student Mentors",       desc: "Dedicated mentors who guide students academically and personally for all-round development." },
              { icon: Award,    title: "Academic Leaders",      desc: "Committed academic heads who ensure quality education and consistent results every year." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title}
                  className="bg-gradient-to-br from-slate-50 to-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center group">
                  <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:bg-emerald-500 transition-colors duration-300">
                    <Icon size={26} className="text-emerald-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE */}
      <section id="infrastructure" className="py-20 bg-slate-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Infrastructure & Facilities</h2>
            <div className="w-14 h-1 bg-emerald-500 mx-auto rounded-full" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Science Laboratories", img: "/infrastructure/science-lab.jpg"    },
              { title: "Computer Labs",         img: "/infrastructure/computer-lab.jpg"   },
              { title: "Library",               img: "/infrastructure/library.jpg"        },
              { title: "Sports & Games",        img: "/infrastructure/sports.jpg"         },
              { title: "Transport",             img: "/infrastructure/transport.jpg"      },
              { title: "Audio Visual Room",     img: "/infrastructure/av-room.jpg"        },
              { title: "The Staff",             img: "/infrastructure/staff.jpg"          },
              { title: "Co-Curricular",         img: "/infrastructure/co-curricular.jpg"  },
            ].map((item) => (
              <div key={item.title}
                className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl h-[220px] cursor-pointer">
                <img src={item.img} alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-sm">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/hero/1.jpg')", backgroundSize: "cover" }} />
        <div className="absolute inset-0 bg-emerald-600/90" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Become Part of The Study School Family</h2>
          <p className="text-emerald-100 mb-8">Discover a learning environment where excellence, care, and innovation come together.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/admissions" className="bg-white text-emerald-600 px-8 py-3.5 rounded-full font-bold hover:bg-emerald-50 transition-all shadow-lg hover:-translate-y-0.5">Apply for Admission</a>
            <a href="/contact" className="bg-white/10 border border-white/30 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white/20 transition-all hover:-translate-y-0.5">Contact Us</a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;