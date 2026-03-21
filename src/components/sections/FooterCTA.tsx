import ContactForm from "@/components/ui/ContactForm";

export default function FooterCTA() {
  return (
    <section className="bg-green-900/20 border-t border-green-500/20 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <p className="section-label mb-4">09 · GET IN TOUCH</p>
            <h2
              className="text-[clamp(2.5rem,5vw,4rem)] leading-tight text-white mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Ready to source{" "}
              <span className="text-green-400">Group II+ RRBO?</span>
            </h2>
            <p className="text-ink-200 text-base leading-relaxed mb-10" style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}>
              Whether you&apos;re a lubricant blender evaluating suppliers, a workshop looking
              to dispose of used oil responsibly, or a compliance team with questions —
              we respond within one business day.
            </p>

            <div className="space-y-4">
              {[
                { label: "Lubricant Blenders", action: "Request a sample or TDS download → /products" },
                { label: "Used Oil Suppliers", action: "WhatsApp pickup booking — fastest response" },
                { label: "Compliance & EPR", action: "Certification documents on request" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-semibold text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                      {item.label}:{" "}
                    </span>
                    <span className="text-sm text-ink-200" style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300 }}>
                      {item.action}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-ink-800/80 border border-ink-600/50 rounded-2xl p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
