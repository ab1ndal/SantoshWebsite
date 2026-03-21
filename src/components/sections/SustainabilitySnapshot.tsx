"use client";

import { useRef, useState, useEffect } from "react";

const eprMilestones = [
  { year: "FY2025", pct: 5, label: "EPR mandate begins" },
  { year: "FY2027", pct: 15, label: "Growing momentum" },
  { year: "FY2029", pct: 30, label: "Formal sector scales" },
  { year: "FY2031", pct: 50, label: "National target" },
];

export default function SustainabilitySnapshot() {
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
    <section className="bg-ink-900 py-28 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 80% 50%, rgba(58,158,100,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="section-label mb-3">06 · SUSTAINABILITY</p>
            <h2
              className="text-[clamp(2rem,4vw,3rem)] leading-tight text-white mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              The{" "}
              <span className="text-green-400">circular economy</span>
              <br />
              India is mandating.
            </h2>
            <p
              className="text-ink-200 text-base leading-relaxed mb-10"
              style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
            >
              India&apos;s EPR regulations under the Hazardous Waste Rules 2023 require lubricant
              manufacturers to blend increasing proportions of RRBO — starting 5% in FY2025,
              scaling to 50% by FY2031. Santosh is positioned to supply the Group&nbsp;II+ segment
              of this mandated market.
            </p>

            {/* Impact numbers */}
            <div className="grid grid-cols-2 gap-5 mb-10">
              {[
                { value: "66%", label: "Less energy vs virgin oil production" },
                { value: "~70%", label: "Base oil yield from used oil feed" },
                { value: "1.3MT", label: "Annual used oil generated in India" },
                { value: "0", label: "Waste to landfill — asphalt residue reused" },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="p-4 rounded-lg border border-ink-600/40 bg-ink-800/50"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(15px)",
                    transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
                  }}
                >
                  <div
                    className="text-2xl text-amber-500 mb-1"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {item.value}
                  </div>
                  <div className="text-xs text-ink-200" style={{ fontFamily: "'Barlow', sans-serif" }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* IOCL MOU callout */}
            <div className="p-5 rounded-xl border border-green-500/30 bg-green-900/10 flex gap-4">
              <div className="w-1 rounded-full bg-green-500 flex-shrink-0" />
              <div>
                <div
                  className="text-xs text-green-400 mb-1"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  MARCH 2026 · MOU SIGNED
                </div>
                <p className="text-sm text-ink-100 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  IOCL and Re Sustainability signed an MOU to build India&apos;s first national
                  Group II+ RRBO circular economy — directly validating Santosh&apos;s technology
                  and market positioning.
                </p>
              </div>
            </div>
          </div>

          {/* Right: EPR mandate visualization */}
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
                      className="text-sm font-mono text-ink-200"
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

            {/* Circular flow diagram — simplified SVG */}
            <div className="mt-12 flex justify-center">
              <svg viewBox="0 0 300 180" className="w-full max-w-sm" aria-label="Circular economy flow">
                {/* Flow arrows */}
                <defs>
                  <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                    <path d="M0,0 L0,8 L8,4 Z" fill="#3a9e64" />
                  </marker>
                </defs>

                {/* Boxes */}
                {[
                  { x: 10, y: 70, w: 80, h: 40, label: "Used Oil", sub: "Workshops / Fleets" },
                  { x: 110, y: 70, w: 80, h: 40, label: "Re-Refining", sub: "Santosh Plant" },
                  { x: 210, y: 70, w: 80, h: 40, label: "RRBO", sub: "Group II+" },
                ].map((box) => (
                  <g key={box.label}>
                    <rect
                      x={box.x}
                      y={box.y}
                      width={box.w}
                      height={box.h}
                      rx="6"
                      fill="#1c1e18"
                      stroke="#2d7a4e"
                      strokeWidth="1.5"
                    />
                    <text x={box.x + box.w / 2} y={box.y + 16} textAnchor="middle" fontSize="9" fill="#d4d8c8" fontFamily="Barlow Condensed, sans-serif" fontWeight="700">
                      {box.label}
                    </text>
                    <text x={box.x + box.w / 2} y={box.y + 28} textAnchor="middle" fontSize="7.5" fill="#5c6050" fontFamily="Barlow, sans-serif">
                      {box.sub}
                    </text>
                  </g>
                ))}

                {/* Arrows left → right */}
                <path d="M90 90 L110 90" stroke="#3a9e64" strokeWidth="1.5" markerEnd="url(#arrow)" />
                <path d="M190 90 L210 90" stroke="#3a9e64" strokeWidth="1.5" markerEnd="url(#arrow)" />

                {/* Return arc */}
                <path
                  d="M250 70 Q250 20 150 20 Q50 20 50 70"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  markerEnd="url(#arrow)"
                />
                <text x="150" y="14" textAnchor="middle" fontSize="8" fill="#f59e0b" fontFamily="JetBrains Mono, monospace">
                  Lubricant → Used Oil → Collection
                </text>

                {/* Labels below */}
                <text x="150" y="150" textAnchor="middle" fontSize="9" fill="#a8ad96" fontFamily="Barlow, sans-serif">
                  EPR-mandated circular economy
                </text>
                <text x="150" y="163" textAnchor="middle" fontSize="8.5" fill="#3a9e64" fontFamily="Barlow Condensed, sans-serif">
                  5% FY2025 → 50% FY2031
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
