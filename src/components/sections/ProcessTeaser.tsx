"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

const steps = [
  {
    num: "01",
    title: "Collection & Intake",
    body: "Used lubricating oil collected from workshops, fleets, and garages across NCR/UP. Every batch tested for PCB content before acceptance.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M8 32 L8 16 M16 32 L16 10 M24 32 L24 20 M32 32 L32 8" stroke="#3a9e64" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M4 32 L36 32" stroke="#5c6050" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="14" r="3" fill="#f59e0b" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Pre-Treatment",
    body: "Dehydration at 120°C removes water, glycol, and light ends. Filtration down to 150–250 microns. Chemical injection prevents fouling.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <rect x="10" y="8" width="20" height="24" rx="3" stroke="#3a9e64" strokeWidth="2" />
        <path d="M10 18 L30 18" stroke="#5c6050" strokeWidth="1.5" />
        <circle cx="20" cy="24" r="4" fill="#f59e0b" opacity="0.7" />
        <path d="M20 10 L20 16" stroke="#52c17e" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Vacuum Distillation",
    body: "Dry oil heated to 280–300°C. Wiped Film Evaporator (WFE) separates base fractions under high vacuum. Asphalt residue recovered as saleable byproduct.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M20 4 L20 36" stroke="#5c6050" strokeWidth="1.5" strokeDasharray="2 2" />
        <rect x="12" y="10" width="16" height="20" rx="8" stroke="#3a9e64" strokeWidth="2" />
        <path d="M12 20 Q20 14 28 20" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Hydrotreating",
    body: "Distillate reacts with H₂ over metallic catalysts — removing sulfur, nitrogen, and halogens. Aromatics saturate to paraffins. This is what produces Group II+.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <circle cx="20" cy="20" r="12" stroke="#3a9e64" strokeWidth="2" />
        <path d="M14 20 L26 20 M20 14 L20 26" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="20" cy="20" r="4" fill="#3a9e64" opacity="0.4" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Lab Testing",
    body: "Every batch verified: viscosity index, sulfur content (ppm), flash point, pour point, colour ASTM. Third-party certification available.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M16 8 L16 24 L10 34 L30 34 L24 24 L24 8 Z" stroke="#3a9e64" strokeWidth="2" strokeLinejoin="round" />
        <path d="M10 30 L30 30" stroke="#f59e0b" strokeWidth="1.5" />
        <circle cx="20" cy="28" r="3" fill="#52c17e" opacity="0.7" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Dispatch",
    body: "Group II+ RRBO dispatched in bulk tanker, 210L drums, or IBC. Delivery to lubricant blenders, OEM suppliers, and industrial customers.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <rect x="4" y="20" width="24" height="12" rx="2" stroke="#3a9e64" strokeWidth="2" />
        <path d="M28 24 L36 24 L36 32 L28 32" stroke="#3a9e64" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="10" cy="34" r="3" stroke="#f59e0b" strokeWidth="1.5" />
        <circle cx="28" cy="34" r="3" stroke="#f59e0b" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export default function ProcessTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Auto-cycle steps
  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => setActiveStep((s) => (s + 1) % steps.length), 2200);
    return () => clearInterval(id);
  }, [visible]);

  return (
    <section className="bg-ink-900 py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20 items-end">
          <div>
            <p className="section-label mb-3">04 · THE PROCESS</p>
            <h2
              className="text-[clamp(2rem,4vw,3rem)] leading-tight text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              From used oil to{" "}
              <span className="text-green-400">Group II+</span>
              <br />
              in six steps.
            </h2>
          </div>
          <div>
            <p className="text-ink-200 text-base leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}>
              Indian Oil Technology powers our plant. Vacuum distillation with Wiped Film
              Evaporation, followed by catalytic hydrotreating — the same technology trusted
              by leading Group II+ producers in India.
            </p>
            <Link
              href="/process"
              className="inline-flex items-center gap-2 mt-5 text-green-400 font-semibold hover:text-green-300 transition-colors"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.06em" }}
            >
              View Full Process →
            </Link>
          </div>
        </div>

        {/* Steps — horizontal scrolling timeline */}
        <div ref={ref} className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-ink-600/60" />
          <div
            className="hidden lg:block absolute top-10 left-0 h-px bg-green-500/60 transition-all duration-500"
            style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
          />

          <div className="grid grid-cols-2 lg:grid-cols-6 gap-5 lg:gap-4">
            {steps.map((step, i) => (
              <button
                key={step.num}
                onClick={() => setActiveStep(i)}
                className={`relative text-left p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                  i === activeStep
                    ? "border-green-500/50 bg-green-900/20 shadow-lg shadow-green-900/20"
                    : "border-ink-600/40 bg-ink-800/50 hover:border-ink-400/60"
                }`}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s, border-color 0.3s ease, background 0.3s ease`,
                }}
                aria-label={`Step ${step.num}: ${step.title}`}
              >
                {/* Step number indicator */}
                <div className="relative w-6 h-6 mb-4">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      i === activeStep
                        ? "border-green-400 bg-green-400"
                        : i < activeStep
                        ? "border-green-600 bg-green-900"
                        : "border-ink-500 bg-ink-800"
                    }`}
                  >
                    {i < activeStep && (
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                        <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                </div>

                <div className="mb-3">{step.icon}</div>

                <div
                  className="text-xs text-amber-500 mb-1"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {step.num}
                </div>
                <h3
                  className={`text-sm font-bold mb-2 transition-colors ${
                    i === activeStep ? "text-white" : "text-ink-100"
                  }`}
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-xs leading-relaxed transition-colors ${
                    i === activeStep ? "text-ink-100" : "text-ink-400"
                  }`}
                  style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
                >
                  {step.body}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
