"use client";

import { useRef, useState, useEffect } from "react";

const specs = [
  {
    property: "Sulfur Content",
    unit: "",
    groupI: { value: "0.2–1.2%", raw: 120, label: "High — limits BS-VI formulation" },
    groupIIPlus: { value: "<300 ppm", raw: 15, label: "Ultra-low — BS-VI compatible" },
  },
  {
    property: "Viscosity Index",
    unit: "(min)",
    groupI: { value: "80–95", raw: 55, label: "Acceptable for basic lubrication" },
    groupIIPlus: { value: "≥ 95", raw: 90, label: "High VI for wide temp performance" },
  },
  {
    property: "Saturates",
    unit: "(%)",
    groupI: { value: "> 80%", raw: 60, label: "Moderate saturation" },
    groupIIPlus: { value: "> 90%", raw: 90, label: "High — better oxidation stability" },
  },
  {
    property: "Oxidation Stability",
    unit: "",
    groupI: { value: "Moderate", raw: 45, label: "Faster degradation in service" },
    groupIIPlus: { value: "Excellent", raw: 90, label: "Extended oil change intervals" },
  },
];

const technologyPoints = [
  {
    title: "Hydrotreating removes what adsorption cannot",
    body: "IFP and most Group I Indian re-refiners use acid clay or activated earth adsorption. This removes colour and odour — but cannot desulfurize or saturate aromatic structures. Hydrotreating reacts hydrogen with sulfur → H₂S, and saturates aromatic rings into paraffins. The result is chemically different oil.",
  },
  {
    title: "BS-VI lubricants require Group II+ base stocks",
    body: "India's BS-VI transition (April 2020) changed the base oil landscape. BS-VI engine oil grades for PCMO and HDO — API SN+, SP, CI-4+, CK-4 — require low-sulfur, high-VI base oils. Group I base stocks are insufficient for many modern OEM specifications.",
  },
  {
    title: "The IOCL MOU validates our model",
    body: "In March 2026, IOCL and Re Sustainability signed an MOU to build India's first national Group II+ RRBO circular economy. This directly validates Santosh's technology choice — Group II+ hydrotreating — as the direction India's leading oil company is committing to.",
  },
];

export default function WhyGroupII() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <p className="section-label mb-3">05 · WHY GROUP II+</p>
          <h2
            className="text-[clamp(2rem,4vw,3rem)] leading-tight text-gray-900 max-w-3xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Group I was sufficient for BS-IV.{" "}
            <span className="text-green-600">
              BS-VI needs Group II+.
            </span>
          </h2>
        </div>

        <div ref={ref} className="grid lg:grid-cols-2 gap-16">
          {/* Left: Spec comparison */}
          <div>
            <h3
              className="text-lg font-bold text-gray-800 mb-8"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Technical comparison: Group I RRBO vs Santosh Group II+
            </h3>

            <div className="space-y-8">
              {specs.map((spec, i) => (
                <div
                  key={spec.property}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(-20px)",
                    transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
                  }}
                >
                  <div className="flex justify-between items-baseline mb-2">
                    <span
                      className="text-sm text-gray-600"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {spec.property} {spec.unit}
                    </span>
                  </div>

                  {/* Group I bar */}
                  <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">Group I (adsorption)</span>
                      <span className="text-gray-600 font-mono">{spec.groupI.value}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-400 rounded-full transition-all duration-1000"
                        style={{ width: visible ? `${spec.groupI.raw}%` : "0%" }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{spec.groupI.label}</div>
                  </div>

                  {/* Group II+ bar */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-green-400">Santosh Group II+ (hydrotreating)</span>
                      <span className="text-green-400 font-mono">{spec.groupIIPlus.value}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full transition-all duration-1000"
                        style={{
                          width: visible ? `${spec.groupIIPlus.raw}%` : "0%",
                          transitionDelay: "0.2s",
                        }}
                      />
                    </div>
                    <div className="text-xs text-green-400/70 mt-1">{spec.groupIIPlus.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footnote */}
            <p
              className="mt-8 text-xs text-gray-400 leading-relaxed"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              * Sulfur measured in ppm for Group II+, % for Group I. Group I RRBO spec per
              IFP Product Data Sheet (IS 1448 methods). Group II+ per API Base Oil Categories.
            </p>
          </div>

          {/* Right: Technology points */}
          <div className="space-y-8">
            {technologyPoints.map((point, i) => (
              <div
                key={point.title}
                className="p-6 rounded-xl border border-gray-200 bg-gray-50 hover:border-green-400/50 transition-colors duration-300"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(20px)",
                  transition: `opacity 0.5s ease ${i * 0.15 + 0.1}s, transform 0.5s ease ${i * 0.15 + 0.1}s`,
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  <div>
                    <h4
                      className="text-base font-bold text-gray-900 mb-2"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
                    >
                      {point.title}
                    </h4>
                    <p
                      className="text-sm text-gray-600 leading-relaxed"
                      style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
                    >
                      {point.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Key stat */}
            <div
              className="p-6 rounded-xl border border-amber-400/40 bg-amber-50"
              style={{
                opacity: visible ? 1 : 0,
                transition: "opacity 0.5s ease 0.5s",
              }}
            >
              <div
                className="text-4xl text-amber-500 mb-2"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                66% LESS ENERGY
              </div>
              <p
                className="text-sm text-gray-600"
                style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
              >
                Re-refining uses 66% less energy than producing virgin base oil from crude.
                Every tonne of RRBO displaces virgin oil and reduces crude import dependency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
