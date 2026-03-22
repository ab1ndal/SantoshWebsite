"use client";

import { useRef, useState, useEffect } from "react";

const eprMilestones = [
  { year: "FY2025", pct: 5, label: "EPR mandate begins" },
  { year: "FY2027", pct: 15, label: "Growing momentum" },
  { year: "FY2029", pct: 30, label: "Formal sector scales" },
  { year: "FY2031", pct: 50, label: "National target" },
];

export default function EPRProgressBars() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-ink-900 py-24 relative overflow-hidden">
      {/* Background accent glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 80% 50%, rgba(58,158,100,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: narrative text */}
          <div>
            <p className="section-label mb-3">01 · EPR MANDATE</p>
            <h2
              className="text-[clamp(1.75rem,4vw,3rem)] leading-tight text-white mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              A Mandate With a Deadline
            </h2>
            <p
              className="text-ink-200 text-base leading-relaxed mb-6"
              style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
            >
              India&apos;s EPR regulations under the Hazardous Waste Rules 2023 require lubricant
              manufacturers to blend increasing proportions of Re-Refined Base Oil (RRBO) into their
              finished products. The mandate escalates from 5% in FY2025 to 50% by FY2031 — creating
              an immediate, binding market for domestically produced RRBO.
            </p>
            <p
              className="text-ink-200 text-base leading-relaxed"
              style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
            >
              Santosh is positioned to supply the Group&nbsp;II+ segment of this mandated market —
              the only category that meets both EPR compliance requirements and the performance
              standards demanded by premium lubricant manufacturers. As volumes scale, Santosh&apos;s
              hydrotreating technology becomes the competitive moat that Group&nbsp;I producers cannot
              replicate.
            </p>
          </div>

          {/* Right: progress bars */}
          <div>
            <h3
              className="text-sm text-ink-200 mb-8"
              style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em" }}
            >
              EPR RRBO BLENDING MANDATE PROGRESSION
            </h3>

            <div className="space-y-5">
              {eprMilestones.map((m, i) => (
                <div key={m.year}>
                  <div className="flex justify-between items-baseline mb-2">
                    <span
                      className="text-sm text-ink-200"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {m.year}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-2xl text-amber-500"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      >
                        {m.pct}%
                      </span>
                      <span className="text-xs text-ink-400">{m.label}</span>
                    </div>
                  </div>
                  <div className="h-3 bg-ink-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        i === eprMilestones.length - 1
                          ? "bg-gradient-to-r from-green-600 to-green-400"
                          : "bg-green-700"
                      }`}
                      style={{
                        width: visible ? `${m.pct * 2}%` : "0%",
                        transitionDelay: `${i * 0.2}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p
              className="mt-8 text-xs text-ink-400"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Source: CPCB EPR Portal · Hazardous Waste (Management and Transboundary Movement) Rules 2023
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
