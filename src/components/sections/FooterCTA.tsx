"use client";

import { useState } from "react";

export default function FooterCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Resend integration to be added in Phase 5
    setSubmitted(true);
  };

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
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" stroke="#3a9e64" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-xl text-white font-bold mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  Message received
                </h3>
                <p className="text-ink-200 text-sm">We&apos;ll be in touch within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="name" className="block text-xs text-ink-200 mb-1.5 font-mono tracking-wider">
                    FULL NAME *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-ink-900/80 border border-ink-600/60 rounded-lg px-4 py-3 text-sm text-ink-100 placeholder-ink-400 focus:border-green-500/60 focus:outline-none transition-colors"
                    placeholder="Lalit Bindal"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-xs text-ink-200 mb-1.5 font-mono tracking-wider">
                    COMPANY
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full bg-ink-900/80 border border-ink-600/60 rounded-lg px-4 py-3 text-sm text-ink-100 placeholder-ink-400 focus:border-green-500/60 focus:outline-none transition-colors"
                    placeholder="Your company"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs text-ink-200 mb-1.5 font-mono tracking-wider">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-ink-900/80 border border-ink-600/60 rounded-lg px-4 py-3 text-sm text-ink-100 placeholder-ink-400 focus:border-green-500/60 focus:outline-none transition-colors"
                    placeholder="you@company.com"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs text-ink-200 mb-1.5 font-mono tracking-wider">
                    MESSAGE
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-ink-900/80 border border-ink-600/60 rounded-lg px-4 py-3 text-sm text-ink-100 placeholder-ink-400 focus:border-green-500/60 focus:outline-none transition-colors resize-none"
                    placeholder="I&apos;m interested in sourcing SN 500 grade RRBO..."
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-400 transition-colors duration-200"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.06em", fontSize: "1rem" }}
                >
                  Send Message →
                </button>
                <p className="text-xs text-ink-400 text-center" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  Or WhatsApp us directly at +91 98101 21438
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
