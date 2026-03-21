"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const grades = [
  {
    name: "SN 150",
    primaryUse: "Light-duty engine oils, hydraulic fluids",
    kv40: "28–32 cSt",
    flashPoint: "≥200°C",
    specPreview: "VI ≥95 · KV40: 28–32 cSt · Flash ≥200°C",
    href: "/sample-request?grade=SN150",
  },
  {
    name: "SN 500",
    primaryUse: "Heavy-duty engine oils, industrial lubricants",
    kv40: "95–105 cSt",
    flashPoint: "≥220°C",
    specPreview: "VI ≥95 · KV40: 95–105 cSt · Flash ≥220°C",
    href: "/sample-request?grade=SN500",
  },
  {
    name: "Bright Stock",
    primaryUse: "Viscosity index improvers, greases",
    kv40: "480–520 cSt",
    flashPoint: "≥260°C",
    specPreview: "VI ≥95 · KV40: 480–520 cSt · Flash ≥260°C",
    href: "/sample-request?grade=BrightStock",
  },
];

export default function GradeCards() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-ink-800 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="section-label mb-4">04 · AVAILABLE GRADES</p>
        <h2
          className="text-[clamp(2rem,5vw,4.5rem)] leading-tight text-white mb-12"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Three Grades. One Quality Standard.
        </h2>

        <div ref={sectionRef} className="grid lg:grid-cols-3 gap-6">
          {grades.map((grade, i) => (
            <div
              key={grade.name}
              className="bg-ink-800/80 border border-ink-600/50 rounded-2xl p-8 hover:border-green-500/30 transition-colors duration-300"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s, border-color 0.3s ease`,
              }}
            >
              <span
                className="inline-block bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full uppercase mb-4"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}
              >
                BASE OIL
              </span>

              <h3
                className="text-[clamp(2rem,5vw,4.5rem)] leading-none text-white mb-3"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {grade.name}
              </h3>

              <p
                className="text-ink-200 mb-4"
                style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400, fontSize: "0.875rem" }}
              >
                {grade.primaryUse}
              </p>

              <p
                className="text-green-400"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}
              >
                {grade.specPreview}
              </p>

              <div className="border-t border-ink-600/30 my-6" />

              <Link
                href={grade.href}
                className="text-green-400 hover:text-green-300 transition-colors"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
              >
                Request Sample →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
