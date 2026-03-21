import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ContactForm from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Santosh Petrochemical",
  description:
    "Get in touch with Santosh Petrochemical Innovations. Inquiries for lubricant blenders, used oil suppliers, and compliance teams. Based in Ghaziabad, UP.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="bg-ink-950 py-24 lg:py-32 pt-36 lg:pt-40">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left: context copy */}
              <div>
                <p className="section-label mb-4">GET IN TOUCH</p>
                <h1
                  className="text-[clamp(2rem,5vw,4.5rem)] leading-tight text-white mb-6"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  Ready to Source{" "}
                  <span className="text-green-400">Group II+ RRBO?</span>
                </h1>
                <p
                  className="text-ink-200 text-sm leading-relaxed mb-10"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  Whether you&apos;re a lubricant blender evaluating suppliers, a workshop looking
                  to dispose of used oil responsibly, or a compliance team with questions —
                  we respond within one business day.
                </p>

                {/* Contact details */}
                <div className="space-y-4 mb-10">
                  {[
                    {
                      label: "Lubricant Blenders",
                      action: "Request a sample or TDS download → /products",
                    },
                    {
                      label: "Used Oil Suppliers",
                      action: "WhatsApp pickup booking — fastest response",
                    },
                    {
                      label: "Compliance & EPR",
                      action: "Certification documents on request",
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
                          {item.action}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Direct contact */}
                <div className="border-t border-ink-600/30 pt-8 space-y-3">
                  <a
                    href="tel:+919810121438"
                    className="flex items-center gap-3 text-sm text-ink-200 hover:text-green-400 transition-colors"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    <span className="text-green-400">Phone/WhatsApp:</span>
                    +91 98101 21438
                  </a>
                  <a
                    href="mailto:santoshgzb@yahoo.com"
                    className="flex items-center gap-3 text-sm text-ink-200 hover:text-green-400 transition-colors"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    <span className="text-green-400">Email:</span>
                    santoshgzb@yahoo.com
                  </a>
                  <p className="text-sm text-ink-200" style={{ fontFamily: "'Barlow', sans-serif" }}>
                    <span className="text-green-400">Address:</span>{" "}
                    7, New Arya Nagar, Meerut Road, Ghaziabad, UP 201001
                  </p>
                </div>
              </div>

              {/* Right: form card */}
              <div className="bg-ink-800/80 border border-ink-600/50 rounded-2xl p-8">
                <ContactForm />
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
