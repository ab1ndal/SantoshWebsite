import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "About Us | Santosh Petrochemical",
  description:
    "35 years of petroleum industry experience. Santosh Petrochemical Innovations is building India's premier Group II+ re-refined base oil facility.",
};

const promoters = [
  {
    name: "Lalit Bindal",
    role: "Founder & Managing Director",
    bio: "Over 35 years in the petroleum industry, including operations under Indian Oil Corporation's SSI framework and HPCL LPG distribution. Lalit brings deep refining and supply chain expertise to Santosh Petrochemical Innovations.",
  },
  {
    name: "Robin Kumar",
    role: "Director",
    bio: "Robin Kumar brings operational expertise to Santosh's re-refining operations. Full profile forthcoming.", // TODO: Replace with actual bio when provided by client
  },
];

const whyNowStats = [
  { value: "50%", label: "RRBO blending mandate by FY2031" },
  { value: "$3.38B", label: "India waste oil recycling market (2025)" },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="bg-ink-950 py-24 lg:py-32 pt-36 lg:pt-40 relative overflow-hidden">
          <div
            className="gradient-mesh absolute inset-0 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 80% 50%, rgba(58,158,100,0.07) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
            <p className="section-label mb-4">ABOUT US</p>
            <h1
              className="text-[clamp(2rem,5vw,4rem)] leading-tight text-white mb-6 max-w-3xl"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              35 Years. One Vision. Group II+ for India.
            </h1>
            <p
              className="text-ink-200 text-base leading-relaxed max-w-2xl"
              style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
            >
              Santosh Petrochemical Innovations is building India&apos;s premier Group II+
              re-refined base oil facility — backed by 35 years of petroleum industry heritage,
              IOCL partnerships, and a proven supply chain across Western Uttar Pradesh.
            </p>
          </div>
        </section>

        {/* Section 1: Company & Credibility */}
        <section className="bg-ink-900 py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="section-label mb-3">01 · COMPANY</p>
            <h2
              className="text-[clamp(1.75rem,4vw,3rem)] leading-tight text-white mb-10"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Built on Three Decades of Trust
            </h2>

            <div className="max-w-3xl space-y-6 mb-12">
              <p
                className="text-ink-200 text-base leading-relaxed"
                style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
              >
                Santosh Associates was established circa 2003 as an IOCL Servo SSI stockist,
                serving 6 districts of Western Uttar Pradesh. Over two decades, the group built
                deep distribution expertise across India&apos;s largest petroleum brand —
                cultivating relationships with workshops, fleets, and industrial buyers that now
                anchor Santosh&apos;s used oil collection network.
              </p>
              <p
                className="text-ink-200 text-base leading-relaxed"
                style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
              >
                The group&apos;s petroleum operations extend across segments: HPCL LPG bottling
                at the Amroha plant (30 TMT/yr capacity) and an HPCL Operations &amp; Maintenance
                contract at the Sitarganj LPG plant. This cross-segment experience — spanning
                supply chain, regulatory compliance, and plant operations — is the foundation for
                Santosh Petrochemical Innovations.
              </p>
              <p
                className="text-ink-200 text-base leading-relaxed"
                style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
              >
                Santosh Petrochemical Innovations is the next chapter: a 65 TPD re-refining
                facility in Ghaziabad using vacuum distillation and hydrotreating via Indian Oil
                technology. Designed for 200 TPD feed capacity, the plant will produce API
                Group II+ RRBO — a standard the industry&apos;s incumbents cannot match with
                adsorption-only processes.
              </p>
            </div>

            {/* Commissioning milestone callout */}
            <div className="border-l-2 border-green-500 pl-4 mb-16 max-w-xl">
              <span
                className="text-xs text-amber-500"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                PLANT COMMISSIONING
              </span>
              <p
                className="text-ink-100 text-sm leading-relaxed mt-1"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                Plant commissioning underway. Production expected within approximately 2 years.
              </p>
            </div>

            {/* Promoter Cards */}
            <div className="grid lg:grid-cols-2 gap-6 mt-12">
              {promoters.map((promoter, i) => (
                <div
                  key={promoter.name}
                  className="bg-ink-800 rounded-xl border border-ink-600/40 p-6"
                  style={{
                    opacity: 1,
                    transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
                  }}
                >
                  <div className="w-14 h-14 rounded-full bg-ink-700 flex-shrink-0 mb-4" />
                  <h3
                    className="text-white"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "1.25rem",
                      fontWeight: 600,
                    }}
                  >
                    {promoter.name}
                  </h3>
                  <p
                    className="text-xs text-amber-500 mt-1 mb-3"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {promoter.role}
                  </p>
                  <p
                    className="text-ink-200 leading-relaxed"
                    style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.875rem" }}
                  >
                    {promoter.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Market Opportunity / Why Now */}
        <section className="bg-ink-800 py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="section-label mb-3">02 · WHY NOW</p>
            <h2
              className="text-[clamp(1.75rem,4vw,3rem)] leading-tight text-white mb-8"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              The Right Technology at the Right Time
            </h2>
            <p
              className="text-ink-200 text-base leading-relaxed max-w-3xl mb-10"
              style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
            >
              India&apos;s EPR mandate is reshaping the lubricants industry. Under the Hazardous
              Waste Rules 2023, lubricant manufacturers must blend RRBO starting at 5% in FY2025,
              scaling to 50% by FY2031. Yet India generates 1.3 million tonnes of used oil
              annually — and fewer than 15% is formally recycled. The IOCL and Re Sustainability
              MOU (March 2026) for India&apos;s first national Group II+ RRBO circular economy
              validates exactly the market segment Santosh is entering. The timing is not
              coincidental — the mandate, the infrastructure, and the technology are converging.
            </p>

            {/* Why now stat row */}
            <div className="grid grid-cols-2 gap-5 mt-8 max-w-xl">
              {whyNowStats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-lg border border-ink-600/40 bg-ink-800/50"
                >
                  <div
                    className="text-2xl text-amber-500 mb-1"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs text-ink-200"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    {stat.label}
                  </div>
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
