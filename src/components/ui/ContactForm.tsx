"use client";
import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Phase 5: wire Resend integration
    console.log("Contact form submission:", form);
    setSubmitted(true);
  };

  if (submitted) {
    return (
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
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Full Name */}
      <div>
        <label htmlFor="contact-name" className="block text-xs text-ink-200 mb-1.5 font-mono tracking-wider">FULL NAME *</label>
        <input id="contact-name" type="text" required value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full bg-ink-900/80 border border-ink-600/60 rounded-lg px-4 py-3 text-sm text-ink-100 placeholder-ink-400 focus:border-green-500/60 focus:outline-none transition-colors"
          placeholder="Lalit Bindal" style={{ fontFamily: "'Barlow', sans-serif" }} />
      </div>
      {/* Company */}
      <div>
        <label htmlFor="contact-company" className="block text-xs text-ink-200 mb-1.5 font-mono tracking-wider">COMPANY</label>
        <input id="contact-company" type="text" value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className="w-full bg-ink-900/80 border border-ink-600/60 rounded-lg px-4 py-3 text-sm text-ink-100 placeholder-ink-400 focus:border-green-500/60 focus:outline-none transition-colors"
          placeholder="Your company" style={{ fontFamily: "'Barlow', sans-serif" }} />
      </div>
      {/* Email */}
      <div>
        <label htmlFor="contact-email" className="block text-xs text-ink-200 mb-1.5 font-mono tracking-wider">EMAIL ADDRESS *</label>
        <input id="contact-email" type="email" required value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-ink-900/80 border border-ink-600/60 rounded-lg px-4 py-3 text-sm text-ink-100 placeholder-ink-400 focus:border-green-500/60 focus:outline-none transition-colors"
          placeholder="you@company.com" style={{ fontFamily: "'Barlow', sans-serif" }} />
      </div>
      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block text-xs text-ink-200 mb-1.5 font-mono tracking-wider">MESSAGE</label>
        <textarea id="contact-message" rows={4} value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full bg-ink-900/80 border border-ink-600/60 rounded-lg px-4 py-3 text-sm text-ink-100 placeholder-ink-400 focus:border-green-500/60 focus:outline-none transition-colors resize-none"
          placeholder="I'm interested in sourcing SN 500 grade RRBO..."
          style={{ fontFamily: "'Barlow', sans-serif" }} />
      </div>
      <button type="submit"
        className="w-full py-3.5 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-400 transition-colors duration-200"
        style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.06em", fontSize: "1rem" }}>
        Send Message →
      </button>
      <p className="text-xs text-ink-400 text-center" style={{ fontFamily: "'Barlow', sans-serif" }}>
        Or WhatsApp us directly at +91 98101 21438
      </p>
    </form>
  );
}
