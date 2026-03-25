import React from "react";
import { Phone, Mail, Award, Users, Shield, ChevronRight } from "lucide-react";

/* ── LEADERSHIP DATA ── */
const leaders = [
  {
    name: "Mr. Arvind Singh Chundawat",
    role: "Chief Advisor",
    image: "/leaders/Arvind.jpg",
    phone: "+91 99826 68595",
    email: "askareliya@gmail.com",
    color: "from-slate-800 to-slate-700",
    badge: "bg-amber-500",
  },
  {
    name: "Mrs. Hemlata Kunwar",
    role: "Director",
    image: "/leaders/Hemlata.jpg",
    phone: "+91 94147 24263",
    email: "",
    color: "from-slate-800 to-slate-700",
    badge: "bg-emerald-500",
  },
];

const smcMembers = [
  { sno: 1,  head: "President of SMC",          name: "Mr. Sandeep Singh Chouhan"  },
  { sno: 2,  head: "Secretary (Principal)",      name: "Mr. Benoy P J"              },
  { sno: 3,  head: "Member",                     name: "Mr. Ashok Kumar Jain"       },
  { sno: 4,  head: "Member",                     name: "Mrs. Hemlata Kunwar"        },
  { sno: 5,  head: "Member",                     name: "Mr. Ganeshlal Suthar"       },
  { sno: 6,  head: "Member",                     name: "Mr. Jayesh Kumar Jain"      },
  { sno: 7,  head: "Member",                     name: "Mr. Ranjeet Singh Chundawat"},
  { sno: 8,  head: "Member",                     name: "Mrs. Sidhi Jain"            },
  { sno: 9,  head: "Member",                     name: "Mr. Hitesh Suthar"          },
  { sno: 10, head: "Member",                     name: "Mrs. Meenakshi Suthar"      },
  { sno: 11, head: "Member",                     name: "Mrs. Gulshan Kunwar"        },
  { sno: 12, head: "Member",                     name: "Mrs. Gaju Kunwar"           },
  { sno: 13, head: "Member",                     name: "Mrs. Kiran Jain"            },
  { sno: 14, head: "Member",                     name: "Mrs. Geeta Devi Meena"      },
  { sno: 15, head: "Member",                     name: "Mrs. Mogi Devi Patel"       },
  { sno: 16, head: "Member",                     name: "Mr. Arvind Singh Chundawat" },
  { sno: 17, head: "Two Parents",                name: "Mr. Indrajeet Singh Chouhan"},
  { sno: 18, head: "Two Parents",                name: "Mrs. Gudiya Ahada"          },
  { sno: 19, head: "Teachers of the School",     name: "Mr. Pushpendra Singh Parihar"},
  { sno: 20, head: "Teachers of the School",     name: "Mrs. Vidhi Bhatt"           },
  { sno: 21, head: "Social Worker / Educationist", name: "Mr. Nikunj Joshi"         },
];

export default function Leadership() {
  return (
    <div>

      {/* ── HERO ── */}
      <section className="relative bg-slate-900 text-white py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero/1.jpg')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-900" />
        <div className="relative max-w-3xl mx-auto px-4">
          <span className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-400/10 border border-emerald-400/20 px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
            <Shield size={13} /> School Governance
          </span>
          <h1 className="text-5xl font-bold mb-4">Leadership & Management</h1>
          <p className="text-slate-300 text-lg">
            Guiding The Study School with vision, dedication and commitment
          </p>
        </div>
      </section>

      {/* ── SCHOOL INFO STRIP ── */}
      <div className="bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap justify-center md:justify-between items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-bold">Affiliation No:</span>
            <span className="text-emerald-100">1110430</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold">DISE Code:</span>
            <span className="text-emerald-100">08270300117</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold">Sponsored By:</span>
            <span className="text-emerald-100">Gopal Singh Seva Sansthan</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold">Soc. Reg No:</span>
            <span className="text-emerald-100">91/DPR/2010-11</span>
          </div>
        </div>
      </div>

      {/* ── LEADERSHIP CARDS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">School Leadership</h2>
            <div className="w-14 h-1 bg-emerald-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {leaders.map((leader, i) => (
              <div key={leader.name}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                style={{ animationDelay: `${i * 150}ms` }}>
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="sm:w-2/5 relative overflow-hidden">
                    <img src={leader.image} alt={leader.name}
                      className="w-full h-56 sm:h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent sm:bg-gradient-to-r" />
                  </div>

                  {/* Content */}
                  <div className="sm:w-3/5 p-7 flex flex-col justify-center">
                    <span className={`inline-block ${leader.badge} text-white text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit`}>
                      {leader.role}
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 mb-4">{leader.name}</h2>

                    <div className="space-y-3">
                      <a href={`tel:${leader.phone.replace(/\s/g, "")}`}
                        className="flex items-center gap-3 text-slate-600 hover:text-emerald-600 transition-colors group">
                        <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                          <Phone size={14} className="text-emerald-500 group-hover:text-white transition-colors" />
                        </div>
                        <span className="text-sm font-medium">{leader.phone}</span>
                      </a>
                      {leader.email && (
                        <a href={`mailto:${leader.email}`}
                          className="flex items-center gap-3 text-slate-600 hover:text-emerald-600 transition-colors group">
                          <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                            <Mail size={14} className="text-emerald-500 group-hover:text-white transition-colors" />
                          </div>
                          <span className="text-sm font-medium">{leader.email}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Principal card - separate full width */}
          <div className="mt-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 relative">
                  <img src="/principal/principal.jpg" alt="Principal Mr. Benoy P J"
                    className="w-full h-64 md:h-full object-cover opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/50" />
                </div>
                <div className="md:w-2/3 p-10">
                  <span className="inline-block bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                    Principal & Secretary SMC
                  </span>
                  <h2 className="text-white text-2xl font-bold mb-1">Mr. Benoy P J</h2>
                  <p className="text-slate-400 text-sm mb-6">The Study Public Senior Secondary School, Aspur</p>
                  <div className="space-y-3">
                    <a href="tel:+919413016306"
                      className="flex items-center gap-3 text-emerald-400 hover:text-emerald-300 transition-colors group">
                      <div className="w-8 h-8 bg-emerald-400/10 rounded-lg flex items-center justify-center group-hover:bg-emerald-400/20 transition-colors">
                        <Phone size={14} />
                      </div>
                      +91 94130 16306
                    </a>
                    <a href="mailto:pjbenoy@gmail.com"
                      className="flex items-center gap-3 text-emerald-400 hover:text-emerald-300 transition-colors group">
                      <div className="w-8 h-8 bg-emerald-400/10 rounded-lg flex items-center justify-center group-hover:bg-emerald-400/20 transition-colors">
                        <Mail size={14} />
                      </div>
                      pjbenoy@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SMC COMMITTEE ── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-emerald-600 text-xs font-bold bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
              <Users size={13} /> Official Committee
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              School Management Committee (SMC)
            </h2>
            <div className="w-14 h-1 bg-emerald-500 mx-auto rounded-full" />
            <p className="text-slate-500 mt-4 text-sm">
              The Study Public Senior Secondary School, Aspur · Dungarpur (Raj.)
            </p>
          </div>

          {/* SMC Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {/* Table header */}
            <div className="bg-slate-900 px-6 py-4 flex items-center gap-3">
              <Shield size={18} className="text-emerald-400" />
              <span className="text-white font-bold">School Management Committee — Official List</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-5 py-3.5 text-left text-slate-500 font-semibold text-xs uppercase tracking-wider w-16">S.No.</th>
                    <th className="px-5 py-3.5 text-left text-slate-500 font-semibold text-xs uppercase tracking-wider">Designation</th>
                    <th className="px-5 py-3.5 text-left text-slate-500 font-semibold text-xs uppercase tracking-wider">Name</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {smcMembers.map((m, i) => (
                    <tr key={m.sno}
                      className={`hover:bg-emerald-50/50 transition-colors ${
                        m.sno === 1 ? "bg-amber-50/50" :
                        m.sno === 2 ? "bg-emerald-50/50" : ""
                      }`}>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                          m.sno === 1 ? "bg-amber-500 text-white" :
                          m.sno === 2 ? "bg-emerald-500 text-white" :
                          "bg-slate-100 text-slate-600"
                        }`}>
                          {m.sno}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`text-sm font-medium ${
                          m.sno === 1 ? "text-amber-700" :
                          m.sno === 2 ? "text-emerald-700" :
                          "text-slate-500"
                        }`}>
                          {m.head}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`font-semibold ${
                          m.sno === 1 ? "text-amber-800" :
                          m.sno === 2 ? "text-emerald-800" :
                          "text-slate-800"
                        }`}>
                          {m.name}
                        </span>
                        {m.sno === 1 && (
                          <span className="ml-2 text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold">President</span>
                        )}
                        {m.sno === 2 && (
                          <span className="ml-2 text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">Principal</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer note */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <p className="text-slate-500 text-xs">
                Total Members: <span className="font-bold text-slate-700">21</span>
              </p>
              <p className="text-slate-400 text-xs">
                Affn. No: 1110430 · Soc. Reg No: 91/DPR/2010-11
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-12 border border-slate-700 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
            <div className="relative">
              <Award size={36} className="text-emerald-400 mx-auto mb-4" />
              <h2 className="text-white text-3xl font-bold mb-4">
                Building a Better Tomorrow
              </h2>
              <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                Our leadership team is committed to providing the highest quality education and creating a nurturing environment for every student.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/admissions"
                  className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/30">
                  Apply for Admission <ChevronRight size={16} />
                </a>
                <a href="/contact"
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3 rounded-full font-medium transition-all">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animations */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .animate-fadeUp { animation: fadeUp 0.6s ease forwards; }
      `}</style>
    </div>
  );
}