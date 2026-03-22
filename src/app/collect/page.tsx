import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import PickupForm from "@/components/sections/collect/PickupForm";

export const metadata: Metadata = {
  title: "Used Oil Collection | Santosh Petrochemical",
  description:
    "We pick up your used engine oil. Free collection across Delhi NCR, Ghaziabad, Meerut, and Western UP. Schedule a pickup or WhatsApp us.",
};

const processSteps = [
  {
    number: "STEP 01",
    title: "Schedule a Pickup",
    description:
      "Fill out the form below or message us on WhatsApp. Tell us your location and approximate quantity.",
  },
  {
    number: "STEP 02",
    title: "We Collect",
    description:
      "Our team arrives at your location with the right equipment. We handle all logistics and paperwork.",
  },
  {
    number: "STEP 03",
    title: "You Get Paid",
    description:
      "Receive payment for your used oil. Regular suppliers get priority scheduling and better rates.",
  },
];

const serviceAreas = [
  "Delhi NCR",
  "Ghaziabad",
  "Meerut",
  "Muzaffarnagar",
  "Saharanpur",
  "Moradabad",
  "Rampur",
];

const formBullets = [
  "Free collection — no pickup fees",
  "Flexible scheduling — one-time or regular",
  "Prompt payment — transparent pricing",
  "All paperwork handled by us",
];

export default function CollectPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="bg-ink-950 py-24 lg:py-32 pt-36 lg:pt-40">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h1
              className="text-[clamp(2rem,5vw,5rem)] leading-tight text-white mb-6 max-w-4xl"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              We pick up. You get paid. No hassle.
            </h1>
            <p
              className="text-ink-200 text-lg leading-relaxed max-w-2xl"
              style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}
            >
              Turn your used engine oil into income. We handle collection, logistics, and payment.
              You focus on your business.
            </p>
          </div>
        </section>

        {/* Section 1: How It Works */}
        <section className="bg-ink-900 py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="section-label mb-3">01 · HOW IT WORKS</p>
            <h2
              className="text-[clamp(1.75rem,4vw,3rem)] text-white mb-10"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Three Simple Steps
            </h2>
            <div className="grid lg:grid-cols-3 gap-6 mt-10">
              {processSteps.map((step) => (
                <div
                  key={step.number}
                  className="bg-ink-800 rounded-xl border border-ink-600/40 p-6"
                >
                  <span
                    className="text-xs text-amber-500 mb-2 block"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {step.number}
                  </span>
                  <h3
                    className="text-lg font-semibold text-white mb-3"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm text-ink-200"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Service Area */}
        <section className="bg-ink-800 py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="section-label mb-3">02 · SERVICE AREAS</p>
            <div className="max-w-2xl">
              <h2
                className="text-2xl font-semibold text-white mb-6"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Currently Serving
              </h2>
              <div className="bg-ink-800 rounded-xl border border-ink-600/40 p-6">
                {serviceAreas.map((city) => (
                  <div key={city} className="flex items-center gap-3 py-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                    <span
                      className="text-ink-100"
                      style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.9375rem" }}
                    >
                      {city}
                    </span>
                  </div>
                ))}
                <p
                  className="text-sm text-ink-400 mt-4"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  Expanding to additional locations across Uttar Pradesh. Contact us for coverage in
                  your area.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Pickup Form */}
        <section className="bg-ink-900 py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left column: context copy */}
              <div>
                <p className="section-label mb-3">03 · SCHEDULE A PICKUP</p>
                <h2
                  className="text-[clamp(1.75rem,4vw,3rem)] text-white mb-6"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  Schedule a Pickup
                </h2>
                <p
                  className="text-ink-200 text-sm leading-relaxed mb-8"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  We offer free collection from your premises — no minimum quantity, no pickup fees.
                  Whether you need a one-time collection or a regular arrangement, we work around
                  your schedule.
                </p>
                <div className="space-y-3">
                  {formBullets.map((text) => (
                    <div key={text} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                      <span
                        className="text-sm text-ink-200"
                        style={{ fontFamily: "'Barlow', sans-serif" }}
                      >
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right column: form card */}
              <div className="bg-ink-800/80 border border-ink-600/50 rounded-2xl p-8">
                <PickupForm />
              </div>
            </div>
          </div>
        </section>

        {/* WhatsApp CTA Block */}
        <section className="bg-green-900/20 py-16">
          <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
            <h2
              className="text-2xl font-semibold text-white"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Prefer to chat?
            </h2>
            <p
              className="text-sm text-ink-200 mt-3"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              Message us directly on WhatsApp for a faster response.
            </p>
            <a
              href="https://wa.me/919810121438"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 mt-6 px-8 py-4 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-400 transition-colors"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.25rem" }}
            >
              Chat on WhatsApp →
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
