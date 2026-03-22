import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import EPRProgressBars from "@/components/sections/sustainability/EPRProgressBars";
import CircularEconomySVG from "@/components/sections/sustainability/CircularEconomySVG";

export const metadata: Metadata = {
  title: "Sustainability | Santosh Petrochemical",
  description:
    "Turning India's used oil problem into an opportunity. EPR mandate progression, CO\u2082 savings, and circular economy — Santosh is building the infrastructure for change.",
};

export default function SustainabilityPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="bg-ink-950 py-24 lg:py-32 pt-36 lg:pt-40 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 30% 50%, rgba(58,158,100,0.1) 0%, transparent 70%)",
            }}
          />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
            <div className="max-w-3xl">
              <h1
                className="text-[clamp(1.75rem,5vw,3rem)] leading-tight text-white mb-6"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Turning India&apos;s Used Oil Problem{" "}
                <span className="text-green-400">Into an Opportunity</span>
              </h1>
              <p
                className="text-ink-200 text-lg leading-relaxed"
                style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
              >
                India generates 1.3 million tonnes of used oil annually. Less than 15% is formally
                recycled. Santosh is building the infrastructure to change that.
              </p>
            </div>
          </div>
        </section>

        {/* EPR Progress Bars — self-contained client component */}
        <EPRProgressBars />

        {/* Circular Economy SVG — self-contained client component */}
        <CircularEconomySVG />

        {/* Section 3: Environmental Impact / CO2 Savings */}
        <section className="bg-ink-800/50 py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="section-label mb-3">03 · ENVIRONMENTAL IMPACT</p>
            <h2
              className="text-[clamp(1.75rem,4vw,3rem)] leading-tight text-white mb-8"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Less Energy. Less Carbon. Less Waste.
            </h2>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                {/* CO2 savings stat card */}
                <div className="p-6 rounded-xl border border-ink-600/40 bg-ink-800 max-w-md mb-8">
                  <div
                    className="text-2xl text-amber-500 mb-1"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    66%
                  </div>
                  <p
                    className="text-sm text-ink-200 leading-relaxed mb-3"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    Less energy consumed in production vs virgin base oil
                  </p>
                  <p
                    className="text-xs text-ink-400"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Source: TEV Report / DPR — Santosh Petrochemical Innovations
                  </p>
                </div>

                {/* Additional stats */}
                <div className="grid grid-cols-2 gap-4 max-w-md">
                  <div className="p-4 rounded-lg border border-ink-600/40 bg-ink-800/50">
                    <div
                      className="text-2xl text-amber-500 mb-1"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      ~70%
                    </div>
                    <div
                      className="text-xs text-ink-200"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      Base oil yield from used oil feedstock
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border border-ink-600/40 bg-ink-800/50">
                    <div
                      className="text-2xl text-amber-500 mb-1"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      Zero
                    </div>
                    <div
                      className="text-xs text-ink-200"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      Waste to landfill — asphalt residue reused in road construction
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p
                  className="text-ink-200 text-base leading-relaxed mb-6"
                  style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
                >
                  Re-refining used lubricating oil requires significantly less energy than refining
                  crude oil into virgin base stock. By recapturing used oil that would otherwise be
                  burned as fuel, dumped, or improperly disposed of, re-refiners like Santosh
                  eliminate a major source of soil and groundwater contamination across India.
                </p>
                <p
                  className="text-ink-200 text-base leading-relaxed mb-10"
                  style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
                >
                  The asphalt flux residue from the re-refining process is reused in road
                  construction — meaning Santosh&apos;s plant operates with zero waste to landfill.
                  Every input is either refined into premium RRBO or converted into a useful
                  secondary product.
                </p>

                {/* IOCL MOU callout */}
                <div className="p-5 rounded-xl border border-green-500/30 bg-green-900/10 flex gap-4 mt-12 max-w-2xl">
                  <div className="w-1 rounded-full bg-green-500 flex-shrink-0" />
                  <div>
                    <div
                      className="text-xs text-green-400 mb-1"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      MARCH 2026 · MOU SIGNED
                    </div>
                    <p
                      className="text-sm text-ink-100 leading-relaxed"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      IOCL and Re Sustainability signed an MOU to build India&apos;s first national
                      Group II+ RRBO circular economy — directly validating Santosh&apos;s
                      technology and market positioning.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
