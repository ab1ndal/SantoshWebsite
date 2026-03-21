"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { FlaskConical, Truck, ShieldCheck } from "lucide-react";

const audiences = [
  {
    icon: FlaskConical,
    tag: "Lubricant Blenders",
    tagColor: "text-green-400 border-green-500/30 bg-green-500/5",
    headline: "Group II+ RRBO that meets your formulation specs.",
    body:
      "Procurement teams at lubricant manufacturers and blending companies need base oil that matches Group II+ virgin specs. Our hydrotreating process delivers the purity, VI, and low sulfur your BS-VI formulations require.",
    ctas: [
      { label: "Download TDS", href: "/products#tds", variant: "secondary" },
      { label: "Request a Sample →", href: "/products#sample", variant: "primary" },
    ],
    accent: "green",
  },
  {
    icon: Truck,
    tag: "Used Oil Suppliers",
    tagColor: "text-amber-400 border-amber-500/30 bg-amber-500/5",
    headline: "Turn your workshop's used oil into value — responsibly.",
    body:
      "We collect used lubricating oil from garages, fleet operators, petrol pumps, and workshops across NCR and western UP. Fair price. Proper disposal. Full EPR compliance documentation provided.",
    ctas: [
      { label: "Schedule a Pickup →", href: "/collect", variant: "amber" },
    ],
    accent: "amber",
  },
  {
    icon: ShieldCheck,
    tag: "Compliance Teams",
    tagColor: "text-ink-200 border-ink-400/30 bg-ink-600/20",
    headline: "EPR-compliant recycling with full audit trail.",
    body:
      "MoEF/PCB auditors and corporate ESG teams need a recycler that's registered, compliant, and transparent. We provide EPR certificates, CPCB documentation, and environmental data on request.",
    ctas: [
      { label: "View Certifications →", href: "/quality", variant: "ghost" },
    ],
    accent: "neutral",
  },
];

const accentMap: Record<string, { border: string; glow: string; ctaPrimary: string }> = {
  green: {
    border: "border-green-500/20 hover:border-green-500/50",
    glow: "hover:shadow-green-900/20",
    ctaPrimary: "bg-green-500 text-white hover:bg-green-400",
  },
  amber: {
    border: "border-amber-500/20 hover:border-amber-500/50",
    glow: "hover:shadow-amber-900/20",
    ctaPrimary: "bg-amber-500 text-ink-950 hover:bg-amber-400",
  },
  neutral: {
    border: "border-ink-600/40 hover:border-ink-400/60",
    glow: "hover:shadow-black/30",
    ctaPrimary: "border border-ink-400/60 text-ink-200 hover:text-white hover:border-ink-200",
  },
};

export default function AudienceCards() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-ink-800 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <p className="section-label mb-3">03 · WHO WE SERVE</p>
          <h2
            className="text-[clamp(2rem,4vw,3rem)] leading-tight text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Three audiences. One{" "}
            <span className="text-green-400">circular solution.</span>
          </h2>
        </div>

        {/* Cards */}
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {audiences.map((aud, i) => {
            const colors = accentMap[aud.accent];
            const Icon = aud.icon;

            return (
              <div
                key={aud.tag}
                className={`relative flex flex-col p-8 rounded-xl border bg-ink-700/50 transition-all duration-300 shadow-xl ${colors.border} ${colors.glow}`}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 0.55s ease ${i * 0.15}s, transform 0.55s ease ${i * 0.15}s, border-color 0.3s ease, box-shadow 0.3s ease`,
                }}
              >
                {/* Icon */}
                <div className="mb-5">
                  <div className="w-12 h-12 rounded-lg bg-ink-900/80 flex items-center justify-center">
                    <Icon
                      size={22}
                      className={
                        aud.accent === "green"
                          ? "text-green-400"
                          : aud.accent === "amber"
                          ? "text-amber-400"
                          : "text-ink-200"
                      }
                    />
                  </div>
                </div>

                {/* Tag */}
                <div className={`inline-flex items-center px-2.5 py-1 rounded border text-xs font-mono tracking-wider mb-4 w-fit ${aud.tagColor}`}>
                  {aud.tag}
                </div>

                {/* Content */}
                <h3
                  className="text-xl font-bold text-white mb-4 leading-snug"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
                >
                  {aud.headline}
                </h3>
                <p
                  className="text-sm text-ink-200 leading-relaxed flex-1 mb-8"
                  style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
                >
                  {aud.body}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 mt-auto">
                  {aud.ctas.map((cta) => (
                    <Link
                      key={cta.label}
                      href={cta.href}
                      className={`inline-flex items-center px-5 py-2.5 rounded text-sm font-semibold transition-colors duration-200 ${
                        cta.variant === "primary" ? colors.ctaPrimary :
                        cta.variant === "amber" ? "bg-amber-500 text-ink-950 hover:bg-amber-400" :
                        cta.variant === "secondary" ? "border border-green-500/50 text-green-400 hover:bg-green-500/10" :
                        "border border-ink-400/50 text-ink-200 hover:text-white hover:border-ink-200"
                      }`}
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}
                    >
                      {cta.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
