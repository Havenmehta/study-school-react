import React, { useState } from 'react';
import { CheckCircle, FileText, Send, Loader, ChevronRight, GraduationCap, Users, Phone, Mail, MapPin, Clock, Star } from 'lucide-react';
import { storageService } from '../services/storage';

const iStyle = "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition-all text-slate-800 text-sm";
const lStyle = "block text-sm font-semibold text-slate-700 mb-1.5";

const Admissions = () => {
  const [formData, setFormData] = useState({ studentName:'', parentName:'', phone:'', email:'', grade:'', message:'' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await storageService.addAdmission({
        studentName: formData.studentName,
        parentName: formData.parentName,
        phone: formData.phone,
        email: formData.email,
        grade: formData.grade,
        status: 'pending',
        date: new Date().toLocaleDateString(),
      });
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch (err) {
      console.error('Admission submit error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* HERO */}
      <section className="relative bg-slate-900 text-white py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero/1.jpg')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-900" />
        <div className="relative max-w-3xl mx-auto px-4">
          <span className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-400/10 border border-emerald-400/20 px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
            <Star size={13} fill="currentColor" /> Admissions Open 2026–27
          </span>
          <h1 className="text-5xl font-bold mb-4">Join Our School</h1>
          <p className="text-slate-300 text-lg">Nursery to Class XII — RBSE & CBSE Affiliated · Aspur, Dungarpur</p>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <div className="bg-emerald-600">
        <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-white text-center text-sm">
          {[
            { label: "Classes", value: "Nursery – XII" },
            { label: "Board",   value: "RBSE & CBSE"          },
            { label: "Streams", value: "Arts & Science" },
            { label: "Campus",  value: "Safe & Modern"  },
          ].map(s => (
            <div key={s.label}>
              <div className="font-bold text-lg">{s.value}</div>
              <div className="text-emerald-100 text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-14">

            {/* LEFT — Process + Docs + Eligibility */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Admission Process</h2>
              <div className="w-14 h-1 bg-emerald-500 rounded-full mb-10" />

              {/* Steps */}
              <div className="space-y-4 relative">
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-100 z-0" />
                {[
                  { n:"1", title:"Online Registration",  desc:"Fill the form on this page or visit school office with basic details.",         color:"bg-emerald-500" },
                  { n:"2", title:"Interaction / Test",    desc:"Junior classes: parent-child interaction. Senior classes: basic written test.", color:"bg-blue-500"    },
                  { n:"3", title:"Document Submission",   desc:"Submit Birth Certificate, Transfer Certificate, Passport Photos, Address Proof.", color:"bg-violet-500"  },
                  { n:"4", title:"Fee Payment",           desc:"Pay the admission fee at the school office to confirm the seat.",               color:"bg-amber-500"    },
                ].map(step => (
                  <div key={step.n} className="relative z-10 flex items-start gap-5">
                    <div className={`${step.color} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0 shadow-lg text-sm`}>{step.n}</div>
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex-1 hover:shadow-md transition-shadow">
                      <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Documents */}
              <div className="mt-10 bg-slate-50 border border-slate-100 rounded-2xl p-7">
                <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
                  <FileText size={18} className="text-emerald-500" /> Required Documents
                </h3>
                <div className="grid grid-cols-2 gap-2.5">
                  {["Birth Certificate","Transfer Certificate","2 Passport Photos","Address Proof (Aadhaar)","Previous Marksheet","Caste Certificate (if applicable)"].map(d => (
                    <div key={d} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle size={14} className="text-emerald-500 shrink-0" /> {d}
                    </div>
                  ))}
                </div>
              </div>

              {/* Classes & Streams */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                  <h4 className="font-bold text-blue-800 mb-2 text-sm">Classes Offered</h4>
                  <p className="text-blue-700 text-sm">Nursery · LKG · UKG<br/>Class I to Class XII</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
                  <h4 className="font-bold text-emerald-800 mb-2 text-sm">Streams (XI–XII)</h4>
                  <p className="text-emerald-700 text-sm">Arts (Political Science)<br/>Science (Maths / Bio)</p>
                </div>
              </div>
            </div>

            {/* RIGHT — Form */}
            <div>
              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Application Submitted!</h3>
                  <p className="text-slate-600 mb-6 max-w-sm">Thank you! Our admissions team will contact you within 24–48 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="text-emerald-600 font-semibold hover:underline text-sm">Submit another application →</button>
                </div>
              ) : (
                <div className="bg-white border border-slate-100 rounded-2xl shadow-xl p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">Online Application</h3>
                  <p className="text-slate-500 text-sm mb-8">Fill in the details below to start the admission process.</p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={lStyle}>Student Name *</label>
                        <input required name="studentName" value={formData.studentName} onChange={handleChange} type="text" className={iStyle} placeholder="Student's full name" />
                      </div>
                      <div>
                        <label className={lStyle}>Class Applying For *</label>
                        <select required name="grade" value={formData.grade} onChange={handleChange} className={iStyle}>
                          <option value="">Select Class</option>
                          <option value="Nursery">Nursery</option>
                          <option value="LKG">LKG</option>
                          <option value="UKG">UKG</option>
                          {[...Array(12)].map((_,i) => <option key={i} value={`Class ${i+1}`}>Class {i+1}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={lStyle}>Parent / Guardian Name *</label>
                      <input required name="parentName" value={formData.parentName} onChange={handleChange} type="text" className={iStyle} placeholder="Parent/Guardian name" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={lStyle}>Phone Number *</label>
                        <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className={iStyle} placeholder="10-digit mobile" />
                      </div>
                      <div>
                        <label className={lStyle}>Email Address *</label>
                        <input required name="email" value={formData.email} onChange={handleChange} type="email" className={iStyle} placeholder="your@email.com" />
                      </div>
                    </div>

                    <div>
                      <label className={lStyle}>Message (Optional)</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} rows={3} className={iStyle} placeholder="Any queries or specific requirements?" />
                    </div>

                    {/* Doc upload */}
                    <div>
                      <label className={lStyle}>Upload Documents (Optional)</label>
                      <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/50 transition-all">
                        <FileText size={24} className="text-slate-400 mb-2" />
                        <span className="text-sm text-slate-500">Click to upload PDF, JPG, PNG (max 5MB)</span>
                        <input type="file" className="sr-only" accept=".pdf,.jpg,.jpeg,.png" />
                      </label>
                    </div>

                    <button type="submit" disabled={isSubmitting}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 disabled:opacity-70">
                      {isSubmitting ? <Loader size={20} className="animate-spin" /> : <><Send size={18} /> Submit Application</>}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-3">Have Questions?</h3>
          <p className="text-slate-500 mb-6">Feel free to call or visit us — we're happy to help!</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+919413016306" className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-slate-700 transition-all">
              <Phone size={16} /> +91 94130 16306
            </a>
            <a href="tel:+919587697511" className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-600 transition-all">
              <Phone size={16} /> +91 95876 97511
            </a>
            <a href="mailto:thestudyaspur@gmail.com" className="flex items-center gap-2 border border-slate-300 text-slate-700 px-6 py-3 rounded-full font-semibold hover:border-emerald-500 hover:text-emerald-600 transition-all">
              <Mail size={16} /> thestudyaspur@gmail.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;