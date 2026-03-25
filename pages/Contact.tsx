import React, { useState } from "react";
import {
  Phone, Mail, MapPin, Clock, Send, CheckCircle,
  MessageSquare, Navigation, Building2, Star,
} from "lucide-react";
import { db } from "../firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const iStyle =
  "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition-all text-slate-800 text-sm placeholder:text-slate-400";
const lStyle = "block text-sm font-semibold text-slate-700 mb-1.5";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      setError("Name, phone number and message are required.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await addDoc(collection(db, "enquiries"), {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
        date: new Date().toLocaleDateString("en-IN"),
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /* ── SUCCESS STATE ── */
  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Message Received!</h2>
          <p className="text-slate-500 mb-2">Thank you for reaching out to us.</p>
          <p className="text-slate-500 mb-8">
            We will get back to you shortly on{" "}
            <span className="font-semibold text-slate-700">{form.phone}</span>.
          </p>
          <button
            onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", message: "" }); }}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-bold transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  /* ── MAIN PAGE ── */
  return (
    <div>

      {/* HERO */}
      <section className="relative bg-slate-900 text-white py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero/1.jpg')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-900" />
        <div className="relative max-w-3xl mx-auto px-4">
          <span className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-400/10 border border-emerald-400/20 px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
            <MessageSquare size={13} /> Get In Touch
          </span>
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-slate-300 text-lg">Have a question? We are here to help you.</p>
        </div>
      </section>

      {/* QUICK CONTACT STRIP */}
      <div className="bg-emerald-600">
        <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-white text-center text-sm">
          <a href="tel:+919587697511" className="flex items-center justify-center gap-2 hover:text-emerald-100 transition-colors">
            <Phone size={15} /><span className="font-semibold">+91-9587697511</span>
          </a>
          <a href="tel:+919413016306" className="flex items-center justify-center gap-2 hover:text-emerald-100 transition-colors">
            <Phone size={15} /><span className="font-semibold">+91-9413016306</span>
          </a>
          <a href="mailto:thestudyaspur@gmail.com" className="flex items-center justify-center gap-2 hover:text-emerald-100 transition-colors">
            <Mail size={15} /><span className="font-semibold">thestudyaspur@gmail.com</span>
          </a>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-14">

            {/* LEFT — Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">School Information</h2>
              <div className="w-14 h-1 bg-emerald-500 rounded-full mb-8" />

              <div className="space-y-5">

                {/* Address */}
                <div className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all">
                  <div className="w-11 h-11 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 mb-0.5">Address</p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      The Study Public Senior Secondary School<br />
                      Aspur, Dungarpur, Rajasthan – 314021
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all">
                  <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 mb-1">Phone Numbers</p>
                    <div className="space-y-1">
                      <a href="tel:+919587697511" className="block text-slate-600 text-sm hover:text-emerald-600 transition-colors font-medium">
                        +91-9587697511 (School Office)
                      </a>
                      <a href="tel:+919413016306" className="block text-slate-600 text-sm hover:text-emerald-600 transition-colors font-medium">
                        +91-9413016306 (Principal — Mr. P.J. Benoy)
                      </a>
                      <a href="tel:+919982668595" className="block text-slate-600 text-sm hover:text-emerald-600 transition-colors font-medium">
                        +91-9982668595 (Chief Advisor)
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all">
                  <div className="w-11 h-11 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 mb-0.5">Email</p>
                    <a href="mailto:thestudyaspur@gmail.com" className="block text-slate-600 text-sm hover:text-emerald-600 transition-colors font-medium">
                      thestudyaspur@gmail.com
                    </a>
                    <a href="mailto:pjbenoy@gmail.com" className="block text-slate-600 text-sm hover:text-emerald-600 transition-colors font-medium mt-0.5">
                      pjbenoy@gmail.com (Principal)
                    </a>
                  </div>
                </div>

                {/* Timings */}
                <div className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all">
                  <div className="w-11 h-11 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                    <Clock size={20} className="text-purple-600" />
                  </div>
                  <div className="w-full">
                    <p className="font-bold text-slate-800 mb-2">School Timings</p>
                    <div className="space-y-1 text-sm text-slate-600">
                      <div className="flex justify-between gap-6">
                        <span>School Hours</span>
                        <span className="font-semibold text-slate-700">8:00 AM – 2:00 PM</span>
                      </div>
                      <div className="flex justify-between gap-6">
                        <span>Office Hours</span>
                        <span className="font-semibold text-slate-700">8:00 AM – 4:00 PM</span>
                      </div>
                      <div className="flex justify-between gap-6">
                        <span>Working Days</span>
                        <span className="font-semibold text-slate-700">Monday – Saturday</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* School Details */}
                <div className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all">
                  <div className="w-11 h-11 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                    <Building2 size={20} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 mb-1">School Details</p>
                    <div className="space-y-0.5 text-sm text-slate-600">
                      <p>Affiliation No: <span className="font-semibold text-slate-700">1110430</span></p>
                      <p>DISE Code: <span className="font-semibold text-slate-700">08270300117</span></p>
                      <p>Society Reg. No: <span className="font-semibold text-slate-700">91/DPR/2010-11</span></p>
                      <p>Sponsored by: <span className="font-semibold text-slate-700">Gopal Singh Seva Sansthan</span></p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT — Enquiry Form */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Send an Enquiry</h2>
              <div className="w-14 h-1 bg-emerald-500 rounded-full mb-8" />

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <p className="text-slate-500 text-sm mb-6">
                  Fill in the form below and we will get back to you via call or email shortly.
                </p>

                {error && (
                  <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium">
                    ⚠️ {error}
                  </div>
                )}

                <div className="space-y-5">

                  <div>
                    <label className={lStyle}>Full Name <span className="text-red-400">*</span></label>
                    <input
                      type="text" name="name" value={form.name} onChange={handleChange}
                      placeholder="Enter your full name" className={iStyle}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={lStyle}>Phone Number <span className="text-red-400">*</span></label>
                      <input
                        type="tel" name="phone" value={form.phone} onChange={handleChange}
                        placeholder="10-digit mobile number" className={iStyle}
                      />
                    </div>
                    <div>
                      <label className={lStyle}>Email <span className="text-slate-400 font-normal">(optional)</span></label>
                      <input
                        type="email" name="email" value={form.email} onChange={handleChange}
                        placeholder="your@email.com" className={iStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={lStyle}>Message <span className="text-red-400">*</span></label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange} rows={4}
                      placeholder="Write your question or message here..."
                      className={`${iStyle} resize-none`}
                    />
                  </div>

                  <button
                    onClick={handleSubmit} disabled={submitting}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
                  >
                    {submitting ? (
                      <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Sending...</>
                    ) : (
                      <><Send size={16} /> Send Message</>
                    )}
                  </button>

                  <p className="text-xs text-slate-400 text-center">
                    Your information will only be shared with the school.
                  </p>
                </div>
              </div>

              {/* Quick Contact Buttons */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <a href="tel:+919587697511"
                  className="flex items-center justify-center gap-2 p-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-semibold text-sm transition-all hover:-translate-y-0.5 shadow-md">
                  <Phone size={16} /> Call Now
                </a>
                <a href="mailto:thestudyaspur@gmail.com"
                  className="flex items-center justify-center gap-2 p-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-semibold text-sm transition-all hover:-translate-y-0.5 shadow-md">
                  <Mail size={16} /> Send Email
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* GOOGLE MAP */}
      <section id="map" className="bg-slate-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3 flex items-center justify-center gap-3">
              <Navigation size={28} className="text-emerald-500" />
              How to Reach Us
            </h2>
            <div className="w-14 h-1 bg-emerald-500 mx-auto rounded-full" />
            <p className="text-slate-500 mt-4">The Study School — Aspur, Dungarpur, Rajasthan</p>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200">
            <iframe
              title="The Study School Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.8!2d74.0499!3d23.8167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ5JzAwLjAiTiA3NMKwMDMnMDAuMCJF!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
              width="100%" height="480" style={{ border: 0 }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
            <a href="https://maps.google.com/?q=The+Study+School+Aspur+Dungarpur+Rajasthan"
              target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-full font-bold transition-all shadow-lg hover:-translate-y-0.5">
              <Navigation size={16} /> Open in Google Maps
            </a>
            <a href="https://maps.google.com/?q=The+Study+School+Aspur+Dungarpur+Rajasthan&travelmode=driving"
              target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3.5 rounded-full font-bold transition-all shadow-lg hover:-translate-y-0.5">
              <MapPin size={16} /> Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 bg-slate-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/hero/1.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-slate-900/80" />
        <div className="relative max-w-2xl mx-auto px-4">
          <Star size={32} className="text-emerald-400 mx-auto mb-4" fill="currentColor" />
          <h2 className="text-3xl font-bold mb-3">Ready to Join The Study School?</h2>
          <p className="text-slate-300 mb-8">
            Admissions open for Nursery to Class XII — RBSE Affiliated School, Aspur, Dungarpur.
          </p>
          <a href="/admissions"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-emerald-500/30 hover:-translate-y-0.5">
            Apply for Admission
          </a>
        </div>
      </section>

    </div>
  );
}