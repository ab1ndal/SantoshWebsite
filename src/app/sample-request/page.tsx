import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import SampleRequestForm from "@/components/ui/SampleRequestForm";

export const metadata: Metadata = {
  title: "Request a Sample | Santosh Petrochemical",
  description:
    "Request a free sample of our Group II+ RRBO. SN 150, SN 500, and Bright Stock grades available. Delivered to your facility.",
};

export default function SampleRequestPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="bg-ink-950 py-24 lg:py-32 pt-36 lg:pt-40">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left: context copy */}
              <div>
                <p className="section-label mb-4">REQUEST A SAMPLE</p>
                <h1
                  className="text-[clamp(2rem,5vw,4.5rem)] leading-tight text-white mb-6"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  Evaluate Our{" "}
                  <span className="text-green-400">Group II+ RRBO</span>{" "}
                  First-Hand
                </h1>
                <p
                  className="text-ink-200 text-sm leading-relaxed mb-10"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  We send samples free of charge to qualified lubricant blenders and industrial
                  buyers. Fill in your details and our technical team will be in touch within 2
                  business days to arrange dispatch.
                </p>
                <div className="space-y-4">
                  {[
                    { label: "Grades Available", detail: "SN 150 · SN 500 · Bright Stock" },
                    { label: "Pack Format", detail: "Sample drums (20L) — free of charge" },
                    {
                      label: "Delivery",
                      detail: "NCR and UP same-week · Pan-India available",
                    },
                    {
                      label: "Documentation",
                      detail: "CoA and TDS included with each sample",
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                      <div>
                        <span
                          className="text-sm font-bold text-white"
                          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                        >
                          {item.label}:{" "}
                        </span>
                        <span
                          className="text-sm text-ink-200"
                          style={{ fontFamily: "'Barlow', sans-serif" }}
                        >
                          {item.detail}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: form card */}
              <div className="bg-ink-800/80 border border-ink-600/50 rounded-2xl p-8">
                <SampleRequestForm />
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
