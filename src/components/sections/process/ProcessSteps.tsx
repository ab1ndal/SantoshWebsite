"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Collection & Intake",
    body: "Used lubricating oil collected from workshops, fleets, and garages across NCR/UP. Every batch tested for PCB content before acceptance.",
    technicalParams: "PCB screening · Batch acceptance testing · Collection from NCR, UP, western districts",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-16 h-16">
        <path d="M8 32 L8 16 M16 32 L16 10 M24 32 L24 20 M32 32 L32 8" stroke="#3a9e64" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M4 32 L36 32" stroke="#5c6050" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="14" r="3" fill="#f59e0b" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Pre-Treatment",
    body: "Dehydration removes water, glycol, and light ends. Filtration down to 150–250 microns. Chemical injection prevents fouling.",
    technicalParams: "120°C dehydration · 150–250 micron filtration · Anti-fouling chemical injection",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-16 h-16">
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
    technicalParams: "Wiped Film Evaporator (WFE) · 280–300°C · High vacuum distillation · Asphalt byproduct recovery",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-16 h-16">
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
    technicalParams: "H₂ catalyst reactor · Sulfur + nitrogen + halogen removal · Aromatics → paraffins saturation",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-16 h-16">
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
    technicalParams: "VI · Sulfur ppm · Flash point · Pour point · Colour ASTM · Third-party CoA available",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-16 h-16">
        <path d="M16 8 L16 24 L10 34 L30 34 L24 24 L24 8 Z" stroke="#3a9e64" strokeWidth="2" strokeLinejoin="round" />
        <path d="M10 30 L30 30" stroke="#f59e0b" strokeWidth="1.5" />
        <circle cx="20" cy="28" r="3" fill="#52c17e" opacity="0.7" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Dispatch",
    body: "Group II+ RRBO dispatched in bulk tanker, 210L drums, or IBC. Delivery across NCR and UP.",
    technicalParams: "Bulk tanker · 210L drums · IBC (1000L) · NCR/UP delivery · Export documentation available",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-16 h-16">
        <rect x="4" y="20" width="24" height="12" rx="2" stroke="#3a9e64" strokeWidth="2" />
        <path d="M28 24 L36 24 L36 32 L28 32" stroke="#3a9e64" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="10" cy="34" r="3" stroke="#f59e0b" strokeWidth="1.5" />
        <circle cx="28" cy="34" r="3" stroke="#f59e0b" strokeWidth="1.5" />
      </svg>
    ),
  },
];

function StepReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [32, 0]);
  return (
    <motion.div ref={ref} style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}

export default function ProcessSteps() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = stepRefs.current.findIndex((r) => r === entry.target);
            if (idx !== -1) setActiveStep(idx);
          }
        });
      },
      { threshold: 0.5 }
    );
    stepRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  const activeStepData = steps[activeStep];

  return (
    <div className="lg:grid lg:grid-cols-[1fr_1fr]">
      {/* Left: Sticky panel (desktop only) */}
      <div className="hidden lg:flex sticky-section flex-col justify-center p-16 bg-ink-900">
        {/* Progress bar */}
        <div className="w-full h-0.5 bg-ink-700 mb-3 rounded-full overflow-hidden">
          <div
            className="h-0.5 bg-green-500 transition-all duration-500 rounded-full"
            style={{ width: `${((activeStep + 1) / 6) * 100}%` }}
          />
        </div>

        {/* Step counter */}
        <p
          className="text-ink-400 uppercase mb-8"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}
        >
          STEP {activeStep + 1} OF 6
        </p>

        {/* Active step number */}
        <p
          className="text-amber-500 mb-3"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
          }}
        >
          {activeStepData.num}
        </p>

        {/* Active step title */}
        <h2
          className="text-[clamp(2rem,3vw,3rem)] leading-tight text-white mb-6"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {activeStepData.title}
        </h2>

        {/* Technical params */}
        <div className="space-y-1">
          {activeStepData.technicalParams.split(" · ").map((param) => (
            <p
              key={param}
              className="text-green-400"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}
            >
              {param}
            </p>
          ))}
        </div>
      </div>

      {/* Right: Scrollable steps */}
      <div>
        {steps.map((step, i) => (
          <div
            key={step.num}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            className={`min-h-screen flex flex-col justify-center px-8 lg:px-16 py-24 ${
              i % 2 === 0 ? "bg-ink-900" : "bg-ink-800"
            }`}
          >
            <StepReveal>
              {/* Step number */}
              <p
                className="text-amber-500 mb-4"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}
              >
                {step.num}
              </p>

              {/* Icon */}
              <div className="mb-6">{step.icon}</div>

              {/* Title */}
              <h3
                className="text-[clamp(2rem,4vw,3rem)] leading-tight text-white mb-4"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {step.title}
              </h3>

              {/* Body */}
              <p
                className="text-ink-200 mb-4"
                style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400, fontSize: "0.875rem" }}
              >
                {step.body}
              </p>

              {/* Technical params */}
              <p
                className="text-green-400"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}
              >
                {step.technicalParams}
              </p>

              {/* Infographic placeholder */}
              <div className="w-full aspect-video bg-ink-800/60 border-2 border-dashed border-ink-600/40 rounded-2xl flex items-center justify-center mt-8">
                <p
                  className="text-ink-400"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}
                >
                  [ INFOGRAPHIC: {step.title} ]
                </p>
              </div>
            </StepReveal>
          </div>
        ))}
      </div>
    </div>
  );
}
