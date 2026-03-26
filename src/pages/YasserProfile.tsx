import React, { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ServiceCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface WorkItem {
  id: number;
  title: string;
  category: string;
  img: string;
  span?: "tall" | "wide" | "normal";
}

interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  date: string;
  current?: boolean;
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const IconCamera = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path
      d="M16.917 4.667H11.083L8.167 8.167H4.667A2.333 2.333 0 0 0 2.333 10.5V21a2.333 2.333 0 0 0 2.334 2.333h18.666A2.333 2.333 0 0 0 25.667 21V10.5a2.333 2.333 0 0 0-2.334-2.333H19.833l-2.916-3.5Z"
      stroke="currentColor"
      strokeWidth="2.333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 18.667a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
      stroke="currentColor"
      strokeWidth="2.333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconCode = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <polyline points="18 7 23 14 18 21" stroke="currentColor" strokeWidth="2.333" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="10 7 5 14 10 21" stroke="currentColor" strokeWidth="2.333" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="15" y1="4" x2="13" y2="24" stroke="currentColor" strokeWidth="2.333" strokeLinecap="round" />
  </svg>
);

const IconLayout = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect x="2.333" y="2.333" width="23.334" height="23.334" rx="2.333" stroke="currentColor" strokeWidth="2.333" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="2.333" y1="9.333" x2="25.667" y2="9.333" stroke="currentColor" strokeWidth="2.333" strokeLinecap="round" />
    <line x1="9.333" y1="25.667" x2="9.333" y2="9.333" stroke="currentColor" strokeWidth="2.333" strokeLinecap="round" />
  </svg>
);

const IconBriefcase = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="12" y1="12" x2="12" y2="12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconCalendar = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M5.333 1.333V4M10.667 1.333V4M12.667 2.667H3.333A1.333 1.333 0 0 0 2 4v9.333A1.333 1.333 0 0 0 3.333 14.667h9.334A1.333 1.333 0 0 0 14 13.333V4a1.333 1.333 0 0 0-1.333-1.333ZM2 6.667h12" stroke="#A6A6A6" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconMapPin = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 1.333A4.667 4.667 0 0 0 3.333 6c0 3.5 4.667 8.667 4.667 8.667S12.667 9.5 12.667 6A4.667 4.667 0 0 0 8 1.333Z" stroke="#A6A6A6" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="8" cy="6" r="1.667" stroke="#A6A6A6" strokeWidth="1.333" />
  </svg>
);

const IconSend = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6.309 1.543a.667.667 0 0 0-1.237.018L1.351 14.225a.667.667 0 0 0 .846.847L14.44 10.315a.667.667 0 0 0 .018-1.237L9.17 7.071a1.333 1.333 0 0 1-.74-.74L6.31 1.543ZM1.43 14.569l7.294-7.293" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconPhone = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M14.667 11.28v2a1.333 1.333 0 0 1-1.454 1.333 13.2 13.2 0 0 1-5.753-2.047A13 13 0 0 1 3.46 8.567 13.2 13.2 0 0 1 1.413 2.78a1.333 1.333 0 0 1 1.327-1.447h2a1.333 1.333 0 0 1 1.333 1.147c.084.64.24 1.268.467 1.873a1.333 1.333 0 0 1-.3 1.407l-.847.847A10.667 10.667 0 0 0 9.393 10.607l.847-.847a1.333 1.333 0 0 1 1.407-.3c.605.227 1.233.383 1.873.467a1.333 1.333 0 0 1 1.147 1.353Z" stroke="rgba(166,166,166,0.5)" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1.333" y="2.667" width="13.334" height="10.667" rx="1.333" stroke="rgba(166,166,166,0.5)" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14.667 4.667L8.687 8.467a1.333 1.333 0 0 1-1.374 0L1.333 4.667" stroke="rgba(166,166,166,0.5)" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ scrolled }: { scrolled: boolean }) {
  const navLinks = [
    { href: "#about", label: "من نحن" },
    { href: "#services", label: "الخدمات" },
    { href: "#contact", label: "تواصل معنا" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#2E2E2E]"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-[1137px] mx-auto px-8 h-24 flex items-center justify-between gap-8">
        {/* Brand */}
        <span className="text-[#FAFAFA] text-3xl font-bold tracking-tight font-['IBM_Plex_Sans_Arabic',sans-serif]">ياسر</span>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-[15px] font-medium transition-colors text-[#A6A6A6] hover:text-[#FAFAFA]`}
            >
              {l.label}
            </a>
          ))}
        </nav>


        {/* Mobile menu icon */}
        <button className="md:hidden flex flex-col gap-1.5 p-1" aria-label="القائمة">
          <span className="w-6 h-[1.5px] bg-[#FAFAFA] rounded-full block" />
          <span className="w-4 h-[1.5px] bg-[#FAFAFA] rounded-full block" />
          <span className="w-5 h-[1.5px] bg-[#FAFAFA] rounded-full block" />
        </button>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative h-svh min-h-[580px] w-full flex items-end justify-center overflow-hidden">
      {/* Background image */}
      <img
        src="/pic1.png"
        alt="ياسر العبيد"
        className="absolute inset-0 w-full h-full object-cover object-top opacity-80"
      />

      {/* Gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/40 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_100%)]" />

      {/* Text content */}
      <div className="relative z-10 text-center pb-32 px-4 max-w-5xl mx-auto w-full">
        <h1 className="text-[4.5rem] sm:text-[6.5rem] md:text-[8rem] lg:text-[10rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#FAFAFA] mb-2 drop-shadow-2xl font-['IBM_Plex_Sans_Arabic',sans-serif]">
          ياسر العبيد
        </h1>
        <p className="text-lg md:text-2xl font-light tracking-wide text-[#A6A6A6] mt-4">
          مهندس برمجيات
        </p>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="relative py-32 md:py-40 px-8 overflow-hidden bg-[#0A0A0A]">
      {/* Ambient glows */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-[rgba(250,250,250,0.05)] blur-[32px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full blur-[32px] pointer-events-none" />

      {/* Gradient strip */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[rgba(18,18,18,0.2)] to-[#0A0A0A] pointer-events-none" />

      <div className="max-w-[1137px] mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

        {/* Mockup image — RIGHT side in RTL (First child) */}
        <div className="w-full lg:w-[400px] flex justify-center lg:justify-start">
          <div className="relative w-full max-w-[400px] rounded-[24px] overflow-hidden border border-[rgba(250,250,250,0.08)]">
            <img
              src="/edit.png"
              alt="مشروع تطبيق"
              className="w-full h-auto object-contain transition-opacity duration-500 relative z-10"
            />
          </div>
        </div>

        {/* Text — LEFT side in RTL (Second child) */}
        <div className="w-full lg:w-[450px] flex flex-col items-start gap-4">
          {/* Label */}
          <p className="text-[#A6A6A6] text-[12px] font-medium tracking-[0.3em] uppercase text-right w-full">
            ABOUT ME
          </p>

          {/* Name */}
          <h2 className="text-[#FAFAFA] text-[3.5rem] md:text-[4.5rem] font-bold leading-none font-['IBM_Plex_Sans_Arabic',sans-serif] text-right w-full">
            ياسر
          </h2>

          {/* Subtitle */}
          <p className="text-[#A6A6A6] text-[16px] font-light text-right w-full">
            محب للبرمجه
          </p>

          {/* Decorative divider */}
          <div className="flex items-center gap-4 w-full mt-6">
            {/* The line is positioned on the right side in RTL */}
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#2E2E2E]" />
            {/* The star is on the left side in RTL */}
            <span className="text-[#A6A6A6] text-[10px] tracking-[1px] uppercase">✦</span>
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
function ServicesSection() {
  const services: ServiceCard[] = [
    {
      id: "01",
      icon: <IconCode />,
      title: "تطوير الويب",
      description: "بناء مواقع وتطبيقات ويب سريعة ومتجاوبة باستخدام أحدث التقنيات مثل React وNext.js.",
    },
    {
      id: "02",
      icon: <IconLayout />,
      title: "تصميم الواجهات",
      description: "تصميم واجهات مستخدم أنيقة وتجارب تفاعلية استثنائية تركّز على سهولة الاستخدام.",
    },
    {
      id: "03",
      icon: <IconCamera />,
      title: "حلول تقنية",
      description: "استشارات وحلول برمجية مبتكرة ومتكاملة تناسب احتياجات مشروعك.",
    },
  ];

  return (
    <section id="services" className="relative py-32 md:py-40 overflow-hidden bg-[#0A0A0A] border-t border-[#2E2E2E]/40">
      <div className="max-w-[1137px] mx-auto px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 mb-20">
          <p className="text-[#A6A6A6] text-[12px] font-medium tracking-[0.3em] uppercase text-center">
            WHAT I OFFER
          </p>
          <h2 className="text-[#FAFAFA] text-[3.5rem] md:text-[4.5rem] font-bold leading-none font-['IBM_Plex_Sans_Arabic',sans-serif] text-center">
            خدماتي
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="group relative bg-[#121212] rounded-[24px] p-8 min-h-[220px] border border-[#2E2E2E]/60 hover:border-[#2E2E2E] transition-all duration-500 overflow-hidden hover:-translate-y-1"
            >
              {/* Number watermark */}
              <span className="absolute top-1/2 -translate-y-1/2 left-8 text-[5rem] font-bold text-[rgba(250,250,250,0.06)] leading-none select-none pointer-events-none font-['Inter']">
                {svc.id}
              </span>

              <div className="relative z-10 flex flex-col items-end gap-4 h-full">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-[rgba(250,250,250,0.05)] border border-[#2E2E2E] flex items-center justify-center text-[#FAFAFA] group-hover:bg-[#FAFAFA] group-hover:text-[#0A0A0A] transition-all duration-500">
                  {svc.icon}
                </div>

                {/* Title */}
                <h3 className="text-[#FAFAFA] text-xl font-semibold leading-7 text-right w-full">
                  {svc.title}
                </h3>

                {/* Description */}
                <p className="text-[#A6A6A6] text-[14px] font-light leading-[22.75px] text-right">
                  {svc.description}
                </p>
              </div>

              {/* Corner gradient */}
              <div className="absolute bottom-0 left-0 w-16 h-16 overflow-hidden">
                <div className="w-24 h-24 bg-gradient-to-br from-[rgba(250,250,250,0.05)] to-transparent absolute -bottom-8 -left-8" />
              </div>
            </div>
          ))}
        </div>

        {/* Dots divider */}
        <div className="flex justify-center mt-16">
          <div className="w-2 h-2 rounded-full bg-[#2E2E2E]" />
        </div>
      </div>
    </section>
  );
}

// ─── Portfolio / Work ─────────────────────────────────────────────────────────
function WorkSection() {
  const works = [
    {
      id: 1,
      img: "/picture1.png",
    },
    {
      id: 2,
      img: "/picture5.png",
    },
    {
      id: 3,
      img: "/picture6.png",
    },
    {
      id: 4,
      img: "/picture4.png",
    },
    {
      id: 5,
      img: "/picture7.png",
    },
    {
      id: 6,
      img: "/picture3.png",
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <section id="work" className="relative py-32 md:py-40 border-t border-[#2E2E2E]/40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0A0A0A]" />

      {/* Header Container (Constrained) */}
      <div className="max-w-[1137px] mx-auto px-8 relative z-10">
        <div className="flex flex-col items-center gap-2 mb-16">
          <p className="text-[#A6A6A6] text-[12px] font-medium tracking-[0.3em] uppercase text-center">
            MY WORK
          </p>
          <h2 className="text-[#FAFAFA] text-[3.5rem] md:text-[4.5rem] font-bold leading-none font-['IBM_Plex_Sans_Arabic',sans-serif] text-center">
            معرض الاعمال
          </h2>
        </div>
      </div>

      {/* Grid completely Full Width */}
      <div className="w-full relative z-10">
        <div className="columns-1 sm:columns-2 gap-0 bg-[#0A0A0A] space-y-0">
          {works.map((work, index) => (
            <div
              key={work.id}
              onClick={() => setSelectedIndex(index)}
              className="group relative overflow-hidden cursor-pointer w-full mb-0 break-inside-avoid block"
            >
              <img
                src={work.img}
                alt={`مشروع ${work.id}`}
                className="w-full h-auto object-contain transition-all duration-500"
              />
              {/* Hover overlay with + button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                <div className="w-10 h-10 rounded-full border-2 border-[rgba(255,255,255,0.8)] flex items-center justify-center">
                  <span className="text-white text-xl leading-none">+</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Container (Constrained) */}
      <div className="max-w-[1137px] mx-auto px-8 relative z-10">
        {/* Dots divider */}
        <div className="flex justify-center mt-20">
          <div className="w-2 h-2 rounded-full bg-[#2E2E2E]" />
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]/95 backdrop-blur-sm transition-all duration-300"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(null);
            }}
            className="absolute top-8 right-8 w-[46px] h-[46px] rounded-full border border-[rgba(250,250,250,0.3)] flex items-center justify-center text-[#FAFAFA] hover:bg-[rgba(250,250,250,0.1)] hover:border-transparent transition-all z-50 group"
          >
            <span className="text-2xl font-light mb-1 mt-0.5 group-hover:scale-110 transition-transform select-none">×</span>
          </button>

          {/* Prev button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(selectedIndex === 0 ? works.length - 1 : selectedIndex - 1);
            }}
            className="absolute left-8 lg:left-12 hidden md:flex items-center justify-center text-[rgba(250,250,250,0.5)] hover:text-[#FAFAFA] hover:scale-125 transition-all text-4xl font-light z-50 p-4 select-none"
          >
            ‹
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex(selectedIndex === works.length - 1 ? 0 : selectedIndex + 1);
            }}
            className="absolute right-8 lg:right-12 hidden md:flex items-center justify-center text-[rgba(250,250,250,0.5)] hover:text-[#FAFAFA] hover:scale-125 transition-all text-4xl font-light z-50 p-4 select-none"
          >
            ›
          </button>

          {/* Main Image Container */}
          <div
            className="relative w-full max-w-[85vw] md:max-w-[75vw] h-full flex flex-col items-center justify-center pointer-events-none"
          >
            <img
              src={works[selectedIndex].img}
              alt="مشروع مكبر"
              className="max-w-full max-h-[85vh] object-contain shadow-2xl pointer-events-auto select-none"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Counter */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#A6A6A6] text-sm tracking-[0.2em] font-light pointer-events-auto select-none">
              {selectedIndex + 1} / {works.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────
function ExperienceSection() {
  const experiences: ExperienceItem[] = [
    {
      company: "مطور برمجيات",
      role: "عمادة تقنية المعلومات - جامعة القصيم",
      location: "الرياض",
      date: "2025-06-01",
      current: true,
    },];

  return (
    <section id="experience" className="relative py-32 md:py-40 overflow-hidden border-t border-[#2E2E2E]/40">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[rgba(250,250,250,0.05)] blur-[32px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[rgba(250,250,250,0.05)] blur-[32px] pointer-events-none" />
      <div className="absolute inset-0 bg-[#0A0A0A]" />

      <div className="max-w-[1137px] mx-auto px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 mb-20">
          <p className="text-[#A6A6A6] text-[12px] font-medium tracking-[0.3em] uppercase text-center">
            CAREER JOURNEY
          </p>
          <h2 className="text-[#FAFAFA] text-[3.5rem] md:text-[4.5rem] font-bold leading-none tracking-tight text-center">
            Experience
          </h2>
        </div>

        {/* Experience cards */}
        <div className="space-y-4">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="group relative bg-[rgba(250,250,250,0.02)] rounded-[20px] border border-[#2E2E2E]/60 hover:border-[rgba(250,250,250,0.15)] transition-all duration-500 overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 md:p-8">
                {/* Left: icon + info */}
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-[rgba(250,250,250,0.05)] border border-[#2E2E2E] flex items-center justify-center text-[#FAFAFA] shrink-0 group-hover:bg-[#FAFAFA] group-hover:text-[#0A0A0A] transition-all duration-500">
                    <IconBriefcase />
                  </div>
                  <div className="text-right">
                    {/* Removed 'Current' status tag per user request */}
                    <h3 className="text-[#FAFAFA] text-xl font-bold leading-7">{exp.company}</h3>
                    <p className="text-[#A6A6A6] text-[14px] font-light mt-0.5">{exp.role}</p>
                  </div>
                </div>

                {/* Right: date + location */}
                <div className="flex items-center gap-3 flex-wrap justify-end">
                  {/* Removed Location badge per user request */}
                  <div className="flex items-center gap-2 bg-[rgba(250,250,250,0.05)] border border-[#2E2E2E]/60 rounded-full px-4 py-2 text-[#A6A6A6] text-sm font-['Inter']">
                    <IconCalendar />
                    <span>{exp.date}</span>
                  </div>
                </div>
              </div>

              {/* Gradient corner */}
              <div className="absolute bottom-0 left-0 w-20 h-20 overflow-hidden pointer-events-none">
                <div className="w-28 h-28 bg-gradient-to-br from-[rgba(250,250,250,0.05)] to-transparent absolute -bottom-8 -left-8" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function ContactSection() {
  const [charCount, setCharCount] = useState(0);

  return (
    <section id="contact" className="relative py-32 md:py-40 overflow-hidden border-t border-[#2E2E2E]/40">
      {/* Ambient glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-[rgba(250,250,250,0.05)] blur-[32px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-[rgba(250,250,250,0.05)] blur-[32px] pointer-events-none" />
      <div className="absolute inset-0 bg-[#0A0A0A]" />

      <div className="max-w-[896px] mx-auto px-8 relative z-10 flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col items-center gap-4">
          {/* Divider with label */}
          <div className="flex items-center gap-4 w-full justify-center">
            <div className="w-12 h-px bg-gradient-to-l from-[rgba(250,250,250,0.5)] to-transparent" />
            <span className="text-[rgba(250,250,250,0.6)] text-[14px] font-light tracking-[4.2px] uppercase">
              تواصل
            </span>
            <div className="w-12 h-px bg-gradient-to-r from-[rgba(250,250,250,0.5)] to-transparent" />
          </div>

          <h2 className="text-[#FAFAFA] text-[4rem] md:text-[4.5rem] font-bold text-center tracking-tight leading-[72px]">
            تواصل معنا
          </h2>

          <p className="text-[#A6A6A6] text-[18px] font-light leading-7 text-center max-w-[448px]">
            أرسل رسالتك وسنتواصل معك في أقرب وقت
          </p>
        </div>

        {/* Form card */}
        <div className="relative rounded-[16px] border border-[rgba(46,46,46,0.5)] bg-[rgba(18,18,18,0.5)] backdrop-blur-sm overflow-hidden">
          {/* Gradient top blur */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(250,250,250,0.1)] to-transparent" />

          <form className="p-8 md:p-12 flex flex-col gap-8">
            {/* Row 1: Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-2 text-[#FAFAFA] text-[14px] font-medium justify-end">
                  <span className="w-1.5 h-1.5 rounded-full bg-[rgba(250,250,250,0.5)]" />
                  الاسم الكامل
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="أدخل اسمك"
                    className="w-full h-12 rounded-[12px] border border-[rgba(46,46,46,0.5)] bg-[rgba(10,10,10,0.5)] text-[#FAFAFA] text-[13px] font-light placeholder-[#A6A6A6] px-4 text-right focus:outline-none focus:border-[rgba(250,250,250,0.3)] transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-2 text-[#FAFAFA] text-[14px] font-medium justify-end">
                  <span className="w-1.5 h-1.5 rounded-full bg-[rgba(250,250,250,0.5)]" />
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="example@domain.com"
                    dir="ltr"
                    className="w-full h-12 rounded-[12px] border border-[rgba(46,46,46,0.5)] bg-[rgba(10,10,10,0.5)] text-[#FAFAFA] text-[13px] font-light placeholder-[#A6A6A6] px-4 text-right focus:outline-none focus:border-[rgba(250,250,250,0.3)] transition-colors"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                    <IconMail />
                  </span>
                </div>
              </div>
            </div>

            {/* Row 2: Phone full width */}
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-2 text-[#FAFAFA] text-[14px] font-medium justify-end">
                <span className="w-1.5 h-1.5 rounded-full bg-[rgba(250,250,250,0.5)]" />
                رقم الهاتف
              </label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="+966 5XX XXX XXXX"
                  dir="ltr"
                  className="w-full h-12 rounded-[12px] border border-[rgba(46,46,46,0.5)] bg-[rgba(10,10,10,0.5)] text-[#FAFAFA] text-[13px] font-light placeholder-[#A6A6A6] px-4 text-right focus:outline-none focus:border-[rgba(250,250,250,0.3)] transition-colors"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                  <IconPhone />
                </span>
              </div>
            </div>

            {/* Message textarea */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[#A6A6A6] text-[12px]">اختياري</span>
                <label className="flex items-center gap-2 text-[#FAFAFA] text-[14px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[rgba(250,250,250,0.5)]" />
                  رسالتك
                </label>
              </div>
              <textarea
                rows={5}
                placeholder="اكتب رسالتك هنا... أخبرنا عن مشروعك أو استفسارك"
                maxLength={1000}
                className="w-full rounded-[12px] border border-[rgba(46,46,46,0.5)] bg-[rgba(10,10,10,0.5)] text-[#FAFAFA] text-[14px] font-light placeholder-[#A6A6A6] p-4 text-right focus:outline-none focus:border-[rgba(250,250,250,0.3)] transition-colors resize-none leading-[20px]"
                onChange={(e) => setCharCount(e.target.value.length)}
              />
              <span className="text-[#A6A6A6] text-[12px] text-left font-['Inter']">
                {charCount}/1000
              </span>
            </div>

            {/* Submit */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="flex items-center gap-3 h-12 px-12 rounded-[12px] bg-[#FAFAFA] text-[#0A0A0A] text-[18px] font-medium shadow-[0_10px_15px_-3px_rgba(250,250,250,0.2),0_4px_6px_-4px_rgba(250,250,250,0.2)] hover:scale-105 active:scale-95 transition-transform"
              >
                <IconSend />
                إرسال الرسالة
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function FooterSection() {
  return (
    <footer className="relative py-24 border-t border-[#2E2E2E] overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(18,18,18,0.5)] via-[#0A0A0A] to-[#0A0A0A]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[32px]" />

      <div className="max-w-[896px] mx-auto px-8 relative z-10 flex flex-col items-center gap-8">
        {/* Brand */}
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-[#FAFAFA] text-[3.75rem] font-bold leading-[60px] text-center font-['IBM_Plex_Sans_Arabic',sans-serif]">
            ياسر العبيد
          </h3>
          <p className="text-[#A6A6A6] text-[19px] font-light tracking-[0.5px]">
            Software Engineer
          </p>
        </div>

        {/* Divider */}
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#2E2E2E] to-transparent" />

        {/* Copyright */}
        <p className="text-[rgba(166,166,166,0.6)] text-[13px] font-light text-center">
          © 2026 ياسر العبيد . All rights reserved
        </p>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function YasserProfile() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Completely disable Chrome/Firefox's native scroll-memory mechanism
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Force strict zero-position scrolling instantly and right after page mounts
    window.scrollTo(0, 0);
    setTimeout(() => window.scrollTo(0, 0), 100);

    // Force RTL and dark body for this subpage
    const prevDir = document.documentElement.dir;
    const prevBg = document.body.style.backgroundColor;
    const prevColor = document.body.style.color;
    const prevTitle = document.title;

    document.documentElement.dir = "rtl";
    document.body.style.backgroundColor = "#0A0A0A";
    document.body.style.color = "#FAFAFA";
    document.title = "المصور ياسر";

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.documentElement.dir = prevDir;
      document.body.style.backgroundColor = prevBg;
      document.body.style.color = prevColor;
      document.title = prevTitle;
    };
  }, []);

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#0A0A0A] text-[#FAFAFA] font-['Inter',sans-serif] overflow-x-hidden"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
      `}</style>

      <Navbar scrolled={scrolled} />

      {/* Fixed Badge */}
      <a href="#" className="fixed bottom-8 left-8 bg-[#E6E6E6] text-[#0A0A0A] px-5 py-2.5 rounded-full flex items-center gap-3 text-[15px] font-semibold z-50 hover:scale-105 transition-transform shadow-xl hover:bg-white">
        <span>صنع بواسطة</span>
        <img src="/sourah-logo.svg" alt="Sourah" className="w-5 h-5 opacity-90" />
      </a>

      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WorkSection />
      <ExperienceSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
