import React, { useState } from "react";
import {
  FileText, Download, ExternalLink, BookOpen,
  Shield, Building2, Award, ClipboardList, ChevronRight, Star,
} from "lucide-react";

interface DocItem {
  label: string;
  url: string;
}

interface DocSection {
  title: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  docs: DocItem[];
}

const sections: DocSection[] = [
  {
    title: "As per Board Requirements",
    icon: <BookOpen size={20} />,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
    docs: [
      {
        label: "Mandatory Disclosure",
        url: "https://thestudyschoolaspur.com/wp-content/uploads/2026/02/Mandatory-Disclosure-Details.pdf",
      },
      {
        label: "Affiliation Letter",
        url: "https://thestudyschoolaspur.com/wp-content/uploads/2025/07/Affiliation-letter.pdf",
      },
    ],
  },
  {
    title: "NOC",
    icon: <Shield size={20} />,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    docs: [
      {
        label: "Fire Safety Certificate",
        url: "https://thestudyschoolaspur.com/wp-content/uploads/2025/07/Fire-safety.pdf",
      },
    ],
  },
  {
    title: "Self System Generated Certificate",
    icon: <Award size={20} />,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    docs: [
      {
        label: "SMC Committee",
        url: "https://thestudyschoolaspur.com/wp-content/uploads/2026/02/SMC-Committee.pdf",
      },
    ],
  },
  {
    title: "Infrastructure Details",
    icon: <Building2 size={20} />,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    docs: [
      {
        label: "Recognition Certificate Under RTE Act",
        url: "https://thestudyschoolaspur.com/wp-content/uploads/2026/02/recognition-certificate.pdf",
      },
      {
        label: "Recognition Certificate",
        url: "https://thestudyschoolaspur.com/wp-content/uploads/2025/07/recognition-certificate.pdf",
      },
      {
        label: "Building Infrastructure",
        url: "https://thestudyschoolaspur.com/wp-content/uploads/2026/02/Building-Infrastructure.pdf",
      },
      {
        label: "Society Registration",
        url: "https://thestudyschoolaspur.com/wp-content/uploads/2025/07/SOCIETY-REG-CRT.pdf",
      },
      {
        label: "PTA (Parent Teacher Association)",
        url: "https://thestudyschoolaspur.com/wp-content/uploads/2025/07/PARENTS-TEACHERS-ASSOCIATION.pdf",
      },
      {
        label: "Land Certificate",
        url: "https://thestudyschoolaspur.com/wp-content/uploads/2025/07/Land-certificate.pdf",
      },
      {
        label: "Annual Calendar",
        url: "https://thestudyschoolaspur.com/wp-content/uploads/2025/07/celendar-the-study-school.pdf",
      },
      {
        label: "Fee Structure",
        url: "https://thestudyschoolaspur.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-27-at-11.29.54-AM.jpeg",
      },
      {
        label: "Water Sanitation Certificate",
        url: "https://thestudyschoolaspur.com/wp-content/uploads/2025/07/water-sanitation-crt.pdf",
      },
      {
        label: "Building Safety Certificate",
        url: "https://thestudyschoolaspur.com/wp-content/uploads/2025/07/Building-certificate.pdf",
      },
      {
        label: "Self Generated Certificate",
        url: "https://thestudyschoolaspur.com/wp-content/uploads/2025/07/self-generate-certificate.pdf",
      },
      {
        label: "Teacher List",
        url: "https://thestudyschoolaspur.com/wp-content/uploads/2026/02/Teacher-List.pdf",
      },
    ],
  },
  {
    title: "Last Three Year Board Result",
    icon: <ClipboardList size={20} />,
    color: "text-rose-600",
    bgColor: "bg-rose-100",
    docs: [
      {
        label: "Previous Year Results",
        url: "https://thestudyschoolaspur.com/wp-content/uploads/2026/02/Previous-Results.pdf",
      },
    ],
  },
];

const isImage = (url: string) =>
  /\.(jpg|jpeg|png|gif|webp)$/i.test(url);

export default function CBSE() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div>
      {/* HERO */}
      <section className="relative bg-slate-900 text-white py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero/1.jpg')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-900" />
        <div className="relative max-w-3xl mx-auto px-4">
          <span className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-400/10 border border-emerald-400/20 px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
            <BookOpen size={13} /> CBSE Compliance
          </span>
          <h1 className="text-5xl font-bold mb-4">CBSE Documents</h1>
          <p className="text-slate-300 text-lg">
            All mandatory disclosures and documents as per CBSE Board requirements
          </p>
        </div>
      </section>

      {/* INFO STRIP */}
      <div className="bg-emerald-600">
        <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-white text-center text-sm">
          {[
            { label: "Affiliation No.", value: "1110430" },
            { label: "DISE Code", value: "08270300117" },
            { label: "Board", value: "CBSE" },
            { label: "Established", value: "2010" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-bold text-lg">{s.value}</div>
              <div className="text-emerald-100 text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">

          {/* Intro */}
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Mandatory Disclosures
            </h2>
            <div className="w-14 h-1 bg-emerald-500 mx-auto rounded-full mb-4" />
            <p className="text-slate-500 max-w-2xl mx-auto">
              As per CBSE guidelines, all affiliated schools are required to publish
              mandatory disclosures. Below are all the documents for The Study School, Aspur.
            </p>
          </div>

          {/* Document Sections */}
          <div className="space-y-6">
            {sections.map((section) => (
              <div
                key={section.title}
                className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Section Header */}
                <button
                  onClick={() =>
                    setActiveSection(
                      activeSection === section.title ? null : section.title
                    )
                  }
                  className="w-full flex items-center justify-between p-5 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 ${section.bgColor} rounded-xl flex items-center justify-center ${section.color}`}
                    >
                      {section.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-slate-800">{section.title}</h3>
                      <p className="text-slate-500 text-xs">
                        {section.docs.length}{" "}
                        {section.docs.length === 1 ? "document" : "documents"}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    size={18}
                    className={`text-slate-400 transition-transform duration-200 ${
                      activeSection === section.title ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {/* Documents List */}
                {(activeSection === section.title || section.docs.length <= 2) && (
                  <div className="divide-y divide-slate-100">
                    {section.docs.map((doc) => (
                      <div
                        key={doc.label}
                        className="flex items-center justify-between px-5 py-4 hover:bg-emerald-50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-slate-100 group-hover:bg-emerald-100 rounded-lg flex items-center justify-center transition-colors">
                            <FileText
                              size={15}
                              className="text-slate-500 group-hover:text-emerald-600 transition-colors"
                            />
                          </div>
                          <span className="text-slate-700 text-sm font-medium group-hover:text-slate-900 transition-colors">
                            {doc.label}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 ml-4">
                          <a
                            href={`https://docs.google.com/viewer?url=${encodeURIComponent(doc.url)}&embedded=false`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-all"
                          >
                            <ExternalLink size={12} />
                            View
                          </a>
                          {!isImage(doc.url) && (
                            <a
                              href={doc.url}
                              download
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-all"
                            >
                              <Download size={12} />
                              Download
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="mt-10 p-5 bg-blue-50 border border-blue-200 rounded-2xl flex gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
              <Shield size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-blue-800 text-sm mb-1">
                CBSE Affiliation Compliance
              </p>
              <p className="text-blue-700 text-sm leading-relaxed">
                The Study School, Aspur is affiliated with the Central Board of Secondary
                Education (CBSE) with Affiliation No. 1110430. All documents listed above
                are published in compliance with CBSE mandatory disclosure norms.
              </p>
            </div>
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
            Admissions open for Nursery to Class XII — CBSE Affiliated School, Aspur, Dungarpur.
          </p>
          <a
            href="/admissions"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-emerald-500/30 hover:-translate-y-0.5"
          >
            Apply for Admission
          </a>
        </div>
      </section>
    </div>
  );
}