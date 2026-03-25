import React, { useEffect, useState } from "react";
import {
  Book, Calendar, Trophy, Award, Download, FlaskConical,
  Monitor, ChevronRight, GraduationCap, Star, FileText,
  Beaker, Microscope, Clock, CheckCircle, Layers
} from "lucide-react";
import { storageService } from "../services/storage";
import { Result } from "../types";

const Academics: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);
  useEffect(() => { storageService.getResults().then(d => setResults(d || [])); }, []);

  return (
    <div>

      {/* ── HERO ── */}
      <section className="relative bg-slate-900 text-white py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero/1.jpg')] bg-cover bg-center opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-900" />
        <div className="relative max-w-3xl mx-auto px-4">
          <span className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-400/10 border border-emerald-400/20 px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
            <GraduationCap size={13} /> RBSE Affiliated School
          </span>
          <h1 className="text-5xl font-bold mb-4 leading-tight">
            Academics
          </h1>
          <p className="text-slate-300 text-lg">
            Nurturing excellence from Nursery to Class XII — Arts & Science Streams
          </p>
        </div>
      </section>

      {/* ── BOARD + CLASSES OFFERED ── */}
      <section id="curriculum" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4">

          {/* Board affiliation banner */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 mb-14 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-700">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center shrink-0">
                <Award size={30} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">Board Affiliation</p>
                <h3 className="text-white text-2xl font-bold">Rajasthan Board of Secondary Education (RBSE)</h3>
                <p className="text-slate-400 text-sm mt-1">Officially affiliated — All classes from Nursery to Class XII</p>
              </div>
            </div>
            <div className="text-center shrink-0">
              <div className="text-4xl font-bold text-white">Nursery</div>
              <div className="text-emerald-400 text-sm font-semibold">to</div>
              <div className="text-4xl font-bold text-white">Class XII</div>
            </div>
          </div>

          {/* Academic structure */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Academic Structure</h2>
            <div className="w-14 h-1 bg-emerald-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                level: "Pre-Primary",
                classes: "Nursery · LKG · UKG",
                color: "border-pink-400",
                bg: "bg-pink-50",
                icon: "🌱",
                desc: "Play-way method, activity-based learning, language development, motor skills, creativity and social behaviour.",
                methods: ["Play Way Method", "Activity Based"],
              },
              {
                level: "Primary",
                classes: "Class I – V",
                color: "border-blue-400",
                bg: "bg-blue-50",
                icon: "📚",
                desc: "Strong foundation in Languages, Mathematics, EVS, Computer Education and Life Skills.",
                methods: ["Demonstration", "Explanation"],
              },
              {
                level: "Middle & Secondary",
                classes: "Class VI – X",
                color: "border-emerald-500",
                bg: "bg-emerald-50",
                icon: "🎓",
                desc: "RBSE curriculum with conceptual clarity, analytical thinking and board examination preparedness.",
                methods: ["Practical Based", "Experiment Method"],
              },
              {
                level: "Senior Secondary",
                classes: "Class XI – XII",
                color: "border-amber-400",
                bg: "bg-amber-50",
                icon: "🏆",
                desc: "Arts (Political Science) & Science (Maths / Bio) streams with RBSE board preparation.",
                methods: ["Arts Stream", "Science Stream"],
              },
            ].map((item) => (
              <div key={item.level}
                className={`bg-white rounded-2xl border-t-4 ${item.color} shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 p-6`}>
                <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-1">{item.level}</h3>
                <p className="text-emerald-600 text-sm font-semibold mb-3">{item.classes}</p>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{item.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.methods.map((m) => (
                    <span key={m} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">{m}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STREAMS CLASS XI–XII ── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Streams in Class XI – XII</h2>
            <div className="w-14 h-1 bg-emerald-500 mx-auto rounded-full" />
            <p className="text-slate-500 mt-4">Choose your path — build your future</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Arts Stream */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                <div className="text-3xl mb-2">🎨</div>
                <h3 className="text-white text-2xl font-bold">Arts Stream</h3>
                <p className="text-blue-100 text-sm mt-1">Humanities & Social Sciences</p>
              </div>
              <div className="p-8">
                <p className="text-slate-500 text-sm mb-5">Develop critical thinking, social understanding and communication skills.</p>
                <div className="space-y-2.5">
                  {[
                    "Hindi",
                    "English",
                    "Political Science",
                    "History / Geography",
                    "Economics",
                    "Physical Education",
                  ].map((sub) => (
                    <div key={sub} className="flex items-center gap-3">
                      <CheckCircle size={15} className="text-blue-500 shrink-0" />
                      <span className="text-slate-700 text-sm font-medium">{sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Science Stream */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-8 py-6">
                <div className="text-3xl mb-2">🔬</div>
                <h3 className="text-white text-2xl font-bold">Science Stream</h3>
                <p className="text-emerald-100 text-sm mt-1">Mathematics & Biology Groups</p>
              </div>
              <div className="p-8">
                <p className="text-slate-500 text-sm mb-5">Build analytical skills for engineering, medicine, and research careers.</p>

                {/* Maths Group */}
                <div className="mb-5">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Maths Group</p>
                  <div className="space-y-2">
                    {["Physics", "Chemistry", "Mathematics", "English"].map((sub) => (
                      <div key={sub} className="flex items-center gap-3">
                        <CheckCircle size={15} className="text-emerald-500 shrink-0" />
                        <span className="text-slate-700 text-sm font-medium">{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bio Group */}
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Biology Group</p>
                  <div className="space-y-2">
                    {["Physics", "Chemistry", "Biology", "English"].map((sub) => (
                      <div key={sub} className="flex items-center gap-3">
                        <CheckCircle size={15} className="text-emerald-500 shrink-0" />
                        <span className="text-slate-700 text-sm font-medium">{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SUBJECTS CLASS-WISE ── */}
      <section id="subjects" className="py-20 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Class-wise Subjects</h2>
            <div className="w-14 h-1 bg-emerald-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Pre-Primary (Nursery – UKG)",
                color: "bg-pink-500",
                subjects: ["English (Oral)", "Hindi (Oral)", "Mathematics (Oral)", "Drawing & Craft", "Rhymes & Activities", "Moral Education"],
              },
              {
                title: "Primary (Class I – V)",
                color: "bg-blue-500",
                subjects: ["English", "Hindi", "Mathematics", "Environmental Studies (EVS)", "Computer Education", "Drawing & Art", "Moral Education", "Physical Education"],
              },
              {
                title: "Middle (Class VI – VIII)",
                color: "bg-violet-500",
                subjects: ["English", "Hindi", "Sanskrit", "Mathematics", "Science", "Social Science", "Computer", "Physical Education"],
              },
              {
                title: "Secondary (Class IX – X)",
                color: "bg-emerald-500",
                subjects: ["English", "Hindi", "Mathematics", "Science", "Social Science", "Computer Science", "Physical Education"],
              },
              {
                title: "Sr. Sec. Arts (Class XI – XII)",
                color: "bg-blue-600",
                subjects: ["Hindi", "English", "Political Science", "History", "Geography", "Economics", "Physical Education"],
              },
              {
                title: "Sr. Sec. Science (Class XI – XII)",
                color: "bg-teal-600",
                subjects: ["Physics", "Chemistry", "Mathematics / Biology", "English", "Hindi", "Computer Science (Optional)"],
              },
            ].map((group) => (
              <div key={group.title} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className={`${group.color} px-5 py-3`}>
                  <h3 className="text-white font-bold text-sm">{group.title}</h3>
                </div>
                <div className="p-5 space-y-2">
                  {group.subjects.map((sub) => (
                    <div key={sub} className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span className="text-slate-700 text-sm">{sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEACHING METHODOLOGY ── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Teaching Methodology</h2>
            <div className="w-14 h-1 bg-emerald-500 mx-auto rounded-full" />
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">
              We believe every student learns differently. Our multi-method approach ensures no child is left behind.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {[
              { icon: "💬", title: "Explanation",    desc: "Clear, structured verbal explanations with real-life examples." },
              { icon: "👁️", title: "Demonstration",  desc: "Visual demonstrations to make abstract concepts concrete." },
              { icon: "🔬", title: "Practical Based", desc: "Hands-on lab sessions for science and computer subjects." },
              { icon: "🎮", title: "Play Way Method", desc: "Learning through play for Pre-Primary and Primary classes." },
              { icon: "⚗️", title: "Experiment Method", desc: "Scientific experiments to develop curiosity and reasoning." },
            ].map((m) => (
              <div key={m.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                <div className="text-4xl mb-4">{m.icon}</div>
                <h3 className="font-bold text-slate-800 mb-2 text-sm">{m.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LABS & FACILITIES ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Labs & Practical Facilities</h2>
            <div className="w-14 h-1 bg-emerald-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FlaskConical, title: "Physics Lab",    desc: "Fully equipped physics laboratory for Class IX–XII experiments.", color: "bg-blue-50 border-blue-200 text-blue-600" },
              { icon: Beaker,       title: "Chemistry Lab",  desc: "Well-stocked chemistry lab with safety equipment for practical work.", color: "bg-green-50 border-green-200 text-green-600" },
              { icon: Microscope,   title: "Biology Lab",    desc: "Biology lab with microscopes, specimens and dissection kits.", color: "bg-teal-50 border-teal-200 text-teal-600" },
              { icon: Monitor,      title: "Computer Labs",  desc: "Two fully functional computer labs with internet-enabled systems.", color: "bg-violet-50 border-violet-200 text-violet-600" },
            ].map((lab) => {
              const Icon = lab.icon;
              return (
                <div key={lab.title}
                  className={`rounded-2xl border p-7 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ${lab.color}`}>
                  <Icon size={32} className="mb-4" />
                  <h3 className="font-bold text-lg mb-2 text-slate-800">{lab.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{lab.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ACADEMIC CALENDAR 2026-27 ── */}
      <section id="calendar" className="py-20 bg-slate-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Academic Calendar 2026–27</h2>
            <div className="w-14 h-1 bg-emerald-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Calendar Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-slate-900 px-6 py-4 flex items-center gap-3">
                <Calendar size={18} className="text-emerald-400" />
                <span className="text-white font-bold">Session 2026–27</span>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-6 py-3 text-left text-slate-500 font-semibold text-xs uppercase">Month</th>
                    <th className="px-6 py-3 text-left text-slate-500 font-semibold text-xs uppercase">Activity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { month: "April 2026",     activity: "New Academic Session Begins",      badge: "Session Start" },
                    { month: "May 2026",        activity: "Unit Test I",                      badge: "" },
                    { month: "June 2026",       activity: "Summer Vacation",                  badge: "Vacation" },
                    { month: "July 2026",       activity: "School Reopens",                   badge: "" },
                    { month: "August 2026",     activity: "Independence Day Celebration",     badge: "" },
                    { month: "September 2026",  activity: "Half-Yearly Examinations",         badge: "Exam" },
                    { month: "October 2026",    activity: "Dussehra / Diwali Vacation",       badge: "Vacation" },
                    { month: "November 2026",   activity: "Unit Test II",                     badge: "" },
                    { month: "December 2026",   activity: "Annual Sports Meet",               badge: "" },
                    { month: "January 2027",    activity: "Republic Day Celebration",         badge: "" },
                    { month: "February 2027",   activity: "Pre-Board / Model Examinations",   badge: "Exam" },
                    { month: "March 2027",      activity: "Annual Examinations",              badge: "Annual Exam" },
                  ].map((row) => (
                    <tr key={row.month} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-3.5 font-semibold text-slate-800 text-sm">{row.month}</td>
                      <td className="px-6 py-3.5 text-slate-600 text-sm">
                        <div className="flex items-center gap-2">
                          {row.activity}
                          {row.badge && (
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              row.badge === "Exam" || row.badge === "Annual Exam" || row.badge === "Pre-Board / Model Examinations"
                                ? "bg-red-100 text-red-600"
                                : row.badge === "Vacation"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-emerald-100 text-emerald-600"
                            }`}>{row.badge}</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Event calendar notice + right column */}
            <div className="space-y-6">
              {/* Event calendar coming soon */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-700 text-white">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <Clock size={22} className="text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Event Calendar</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Detailed event calendar for session 2026–27 including sports events, cultural programs, PTMs and examinations will be published very soon.
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      Coming Very Soon
                    </div>
                  </div>
                </div>
              </div>

              {/* School timing */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-7">
                <h3 className="font-bold text-slate-900 text-lg mb-5 flex items-center gap-2">
                  <Clock size={18} className="text-emerald-500" /> School Timings
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "School Hours",        value: "8:00 AM – 2:00 PM" },
                    { label: "Office Hours",         value: "8:00 AM – 4:00 PM (Mon–Sat)" },
                    { label: "Working Days",         value: "Monday – Saturday" },
                    { label: "Assembly",             value: "8:00 AM – 8:15 AM" },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between items-center py-2.5 border-b border-slate-100 last:border-0">
                      <span className="text-slate-500 text-sm">{row.label}</span>
                      <span className="text-slate-800 text-sm font-semibold">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section id="results" className="py-20 bg-gradient-to-b from-slate-50 to-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4">

          {/* Header */}
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
              <Trophy size={13} /> Board Results
            </span>
            <h2 className="text-4xl font-bold text-slate-900 mb-3">Our Academic Excellence</h2>
            <div className="w-14 h-1 bg-emerald-500 mx-auto rounded-full mb-4" />
            <p className="text-slate-500 max-w-xl mx-auto">
              Year after year, our students shine at the board level — district toppers, 90%+ achievers, and 100% pass results.
            </p>
          </div>

          {/* 2025 Toppers Spotlight */}
          <div className="mb-12">
            <h3 className="text-center text-lg font-bold text-slate-700 mb-6 flex items-center justify-center gap-2">
              <Star className="text-amber-400" size={18} fill="currentColor" /> Result 2025 — Toppers Spotlight
            </h3>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { stream: "Class X", topper: "Yaminee Yadav", pct: "98.17%", total: 64, above90: 23, color: "from-emerald-500 to-emerald-600" },
                { stream: "Class XII Arts", topper: "Diya Chouhan", pct: "98.20%", total: 20, above90: 14, color: "from-blue-500 to-blue-600" },
                { stream: "Class XII Science", topper: "Tanisha", pct: "95.8%", total: 27, above90: 5, color: "from-purple-500 to-purple-600" },
              ].map((r) => (
                <div key={r.stream} className="relative bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className={`bg-gradient-to-r ${r.color} p-4 text-white`}>
                    <div className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">{r.stream} · 2025</div>
                    <div className="text-2xl font-black">{r.pct}</div>
                    <div className="text-sm opacity-90">Topper — {r.topper}</div>
                  </div>
                  <div className="p-4 grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 rounded-xl p-3 text-center">
                      <div className="text-2xl font-black text-slate-800">{r.total}</div>
                      <div className="text-xs text-slate-500 font-medium">Total Students</div>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-3 text-center">
                      <div className="text-2xl font-black text-emerald-600">{r.above90}</div>
                      <div className="text-xs text-slate-500 font-medium">Scored 90%+</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2024 Highlights */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 mb-12">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Trophy className="text-amber-500" size={18} /> Result 2024 Highlights
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-xs font-bold text-slate-400 uppercase mb-1">Class X · District Topper</div>
                <div className="font-black text-xl text-slate-900">Krishraj Choubisa</div>
                <div className="text-emerald-600 font-bold text-lg">98.50%</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-xs font-bold text-slate-400 uppercase mb-1">Class XII Arts Topper</div>
                <div className="font-black text-xl text-slate-900">Himanshi</div>
                <div className="text-emerald-600 font-bold text-lg">91.60%</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-xs font-bold text-slate-400 uppercase mb-1">Pride of The Study</div>
                <div className="font-black text-xl text-slate-900">Tanisha Arya</div>
                <div className="text-emerald-600 font-bold text-lg">98.17% · Class X 2023</div>
              </div>
            </div>
          </div>

          {/* Result cards from admin/Firestore */}
          {results.length > 0 && (
            <div>
              <h3 className="text-center font-bold text-slate-700 mb-5 text-lg">All Result Records</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {results.map((res) => (
                  <div key={res.id}
                    className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-lg transition-all flex justify-between items-center group">
                    <div className="flex-1 mr-3">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText size={14} className="text-emerald-500 shrink-0" />
                        <h4 className="font-bold text-slate-800 text-sm leading-snug">{res.title}</h4>
                      </div>
                      <p className="text-xs text-slate-400 ml-5">{res.className} · {res.year}</p>
                    </div>
                    {res.pdfUrl ? (
                      <a href={res.pdfUrl} target="_blank" rel="noreferrer"
                        className="p-2.5 bg-emerald-500 hover:bg-emerald-600 rounded-xl transition-colors shrink-0">
                        <Download size={15} className="text-white" />
                      </a>
                    ) : (
                      <div className="text-xs text-slate-300 font-medium shrink-0">PDF soon</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section id="achievements" className="py-20 bg-slate-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Student Achievements</h2>
            <div className="w-14 h-1 bg-emerald-500 mx-auto rounded-full" />
            <p className="text-slate-500 mt-4">Academic and Sports achievements — detailed file coming soon</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-10">
            {[
              { icon: "🎓", title: "100% Board Result",      desc: "Exceptional board examination performance every year." },
              { icon: "🏆", title: "District Toppers",       desc: "Our students rank among the top in Dungarpur district." },
              { icon: "⭐", title: "Merit Scholarship",       desc: "State merit scholarship holders every academic year."   },
              { icon: "🥇", title: "Sports Achievements",    desc: "Detailed sports achievement file will be shared soon."  },
            ].map((a) => (
              <div key={a.title}
                className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100 text-center hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                <div className="text-4xl mb-4">{a.icon}</div>
                <h3 className="font-bold text-slate-800 mb-2">{a.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>

          {/* Coming soon notice */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white text-center">
            <div className="text-3xl mb-3">📁</div>
            <h3 className="font-bold text-xl mb-2">Academic & Sports Achievement Files</h3>
            <p className="text-emerald-100 text-sm max-w-lg mx-auto">
              Detailed achievement records including board class highlights and sports achievements will be published as separate files. Stay tuned!
            </p>
            <div className="mt-5 inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white text-xs font-bold px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Files being prepared — Coming Soon
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Academics;