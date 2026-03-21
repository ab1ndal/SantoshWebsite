"use client";

import { useState } from "react";
import Link from "next/link";

type FormState = {
  name: string;
  phone: string;
  email: string;
};

export default function TDSGate() {
  const [expanded, setExpanded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({ name: "", phone: "", email: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const a = document.createElement("a");
    a.href = "/santosh-tds-placeholder.pdf";
    a.download = "Santosh-Group-II-Plus-TDS.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    console.log("TDS download lead captured:", form);
    setSubmitted(true);
  };

  return (
    <section id="tds" className="bg-green-900/20 border-t border-green-500/20 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="section-label mb-4">06 · TECHNICAL DATA SHEET</p>
        <h2
          className="text-[clamp(2rem,5vw,4.5rem)] leading-tight text-white mb-12"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Download the Full TDS
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: description */}
          <div>
            <p
              className="text-ink-200 leading-relaxed mb-6"
              style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400, fontSize: "0.875rem" }}
            >
              Our Technical Data Sheet covers the full specification for all three grades — SN 150,
              SN 500, and Bright Stock equivalent. Includes viscosity index, sulfur content (ppm),
              flash point, pour point, and colour ASTM data per grade.
            </p>
            <ul className="space-y-3">
              {[
                "Viscosity Index per grade",
                "Sulfur content in ppm (Group II+ spec)",
                "Flash point and pour point data",
                "Colour ASTM per grade",
                "Test methods: ASTM D445, D2270, D92, D97, D2622, D1500",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                  <span
                    className="text-ink-200"
                    style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400, fontSize: "0.875rem" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: gate form */}
          <div>
            {!submitted ? (
              <>
                {!expanded ? (
                  /* State 1: Button only */
                  <button
                    onClick={() => setExpanded(true)}
                    className="px-6 py-3.5 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-400 transition-colors"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.06em" }}
                  >
                    Download TDS →
                  </button>
                ) : (
                  /* State 2: Expanded form */
                  <form
                    onSubmit={handleSubmit}
                    className="bg-ink-800/80 border border-ink-600/50 rounded-2xl p-8 space-y-5"
                    noValidate
                  >
                    <div>
                      <label
                        htmlFor="tds-name"
                        className="block text-xs text-ink-200 mb-1.5 tracking-wider"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        FULL NAME *
                      </label>
                      <input
                        id="tds-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-ink-900/80 border border-ink-600/60 rounded-lg px-4 py-3 text-sm text-ink-100 placeholder-ink-400 focus:border-green-500/60 focus:outline-none transition-colors"
                        placeholder="Your full name"
                        style={{ fontFamily: "'Barlow', sans-serif" }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="tds-phone"
                        className="block text-xs text-ink-200 mb-1.5 tracking-wider"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        PHONE NUMBER *
                      </label>
                      <input
                        id="tds-phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-ink-900/80 border border-ink-600/60 rounded-lg px-4 py-3 text-sm text-ink-100 placeholder-ink-400 focus:border-green-500/60 focus:outline-none transition-colors"
                        placeholder="+91 98765 43210"
                        style={{ fontFamily: "'Barlow', sans-serif" }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="tds-email"
                        className="block text-xs text-ink-200 mb-1.5 tracking-wider"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        EMAIL ADDRESS
                      </label>
                      <input
                        id="tds-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-ink-900/80 border border-ink-600/60 rounded-lg px-4 py-3 text-sm text-ink-100 placeholder-ink-400 focus:border-green-500/60 focus:outline-none transition-colors"
                        placeholder="you@company.com (optional)"
                        style={{ fontFamily: "'Barlow', sans-serif" }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-400 transition-colors duration-200"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        letterSpacing: "0.06em",
                        fontSize: "1rem",
                      }}
                    >
                      Download Now →
                    </button>
                  </form>
                )}
              </>
            ) : (
              /* State 3: Success */
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="#3a9e64"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl text-white font-bold mb-2"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  Downloading now — check your downloads folder.
                </h3>
                <p className="text-ink-200 text-sm">Our team will follow up within one business day.</p>
              </div>
            )}

            {/* Section CTA below form */}
            <div className="mt-6">
              <Link
                href="/sample-request"
                className="text-green-400 hover:text-green-300 transition-colors"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
              >
                Request a Sample →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
