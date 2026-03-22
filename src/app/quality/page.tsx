import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { ShieldCheck, Award, BadgeCheck, Gauge, Droplets, Thermometer } from "lucide-react";

export const metadata: Metadata = {
  title: "Quality & Certifications | Santosh Petrochemical",
  description:
    "Pursuing PCB registration, BIS IS 18722, and ISO 9001 certifications. Our quality assurance follows ASTM and BIS test methods for every batch.",
};

const certCards = [
  {
    Icon: ShieldCheck,
    name: "Pollution Control Board Registration",
    issuingBody: "State Pollution Control Board",
    description:
      "Required registration for used oil recyclers under the Hazardous and Other Wastes (Management & Transboundary Movement) Rules, 2016. Mandatory for feedstock collection and processing operations.",
  },
  {
    Icon: Award,
    name: "BIS IS 18722 Certification",
    issuingBody: "Bureau of Indian Standards",
    description:
      "India's first dedicated standard for Re-Refined Base Oils. Santosh targets Group II+ compliance — exceeding the minimum specifications that most incumbents struggle to meet.",
  },
  {
    Icon: BadgeCheck,
    name: "ISO 9001 Quality Management",
    issuingBody: "International Organization for Standardization",
    description:
      "Quality Management System certification for consistent, documented production processes. Ensures every batch of RRBO meets the same exacting standards.",
  },
];

const methodologyCards = [
  {
    Icon: Gauge,
    name: "Viscosity Index (VI)",
    description:
      "Measured per ASTM D2270. A higher VI indicates better thermal stability — the oil maintains consistent viscosity across temperature extremes. Group II+ targets VI of 95 or above.",
  },
  {
    Icon: Droplets,
    name: "Sulfur Content",
    description:
      "Tested per ASTM D4294 (XRF method). Lower sulfur means cleaner combustion and longer additive life. Our hydrotreating step is specifically designed to reduce sulfur to Group II+ levels.",
  },
  {
    Icon: Thermometer,
    name: "Flash Point",
    description:
      "Determined per ASTM D92 (Cleveland Open Cup). Flash point indicates safe handling temperature thresholds and confirms removal of volatile light-end contaminants during distillation.",
  },
];

export default function QualityPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="bg-ink-900 py-28 pt-36 lg:pt-40">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="section-label mb-4">QUALITY</p>
            <h1
              className="text-[clamp(1.75rem,4vw,3rem)] leading-tight text-white mb-6 max-w-3xl"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Quality Built Into Every Step
            </h1>
            <p
              className="text-ink-200 max-w-2xl leading-relaxed"
              style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
            >
              At Santosh, quality isn&apos;t an afterthought — it&apos;s engineered into every stage
              of our re-refining process. From feedstock screening to final dispatch, every batch
              meets Group II+ specifications.
            </p>
          </div>
        </section>

        {/* Section 1: Certifications */}
        <section className="bg-ink-950 py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="section-label mb-3">01 · CERTIFICATIONS</p>
            <h2
              className="text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-white mb-3"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Standards We&apos;re Building Toward
            </h2>
            <p
              className="text-ink-200 max-w-2xl leading-relaxed mb-10"
              style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
            >
              Our compliance roadmap targets the certifications required for Group II+ RRBO
              production and distribution in India. Each certification is in active pursuit as
              plant commissioning proceeds.
            </p>

            <div className="grid lg:grid-cols-3 gap-6 mt-10">
              {certCards.map((card) => (
                <div
                  key={card.name}
                  className="bg-ink-800 rounded-xl border border-ink-600/40 p-6 relative"
                >
                  {/* PURSUING badge — top-right */}
                  <span
                    className="absolute top-4 right-4 text-xs tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    PURSUING
                  </span>
                  {/* Icon */}
                  <card.Icon className="w-8 h-8 text-green-400 mb-4" />
                  {/* Cert name */}
                  <h3
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "1.125rem",
                      fontWeight: 600,
                    }}
                    className="text-white mb-1"
                  >
                    {card.name}
                  </h3>
                  {/* Issuing body */}
                  <p
                    className="text-xs text-ink-400 mb-3"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {card.issuingBody}
                  </p>
                  {/* Description */}
                  <p
                    className="text-sm text-ink-200 leading-relaxed"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Lab Testing Methodology */}
        <section className="bg-ink-800/50 py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="section-label mb-3">02 · TESTING METHODOLOGY</p>
            <h2
              className="text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-white mb-3"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              How We Verify Every Batch
            </h2>
            <p
              className="text-ink-200 max-w-2xl leading-relaxed mb-10"
              style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
            >
              Our quality assurance follows established ASTM and BIS test methods. Every batch is
              characterized across three key parameters before release.
            </p>

            <div className="grid lg:grid-cols-3 gap-6 mt-10">
              {methodologyCards.map((card) => (
                <div
                  key={card.name}
                  className="bg-ink-800 rounded-xl border border-ink-600/40 p-6"
                >
                  <card.Icon className="w-7 h-7 text-green-400 mb-3" />
                  <h4
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "1rem",
                      fontWeight: 600,
                    }}
                    className="text-white mb-2"
                  >
                    {card.name}
                  </h4>
                  <p
                    className="text-sm text-ink-200 leading-relaxed"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
