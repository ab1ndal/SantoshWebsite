"use client";
import { useState } from "react";

const frequencies = ["One-time pickup", "Regular (weekly)", "Regular (monthly)", "Not sure yet"];

export default function PickupForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ business?: string; phone?: string }>({});
  const [form, setForm] = useState({
    business: "",
    phone: "",
    location: "",
    quantity: "",
    frequency: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { business?: string; phone?: string } = {};
    if (!form.business.trim()) newErrors.business = "Business name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      await fetch("/api/collect-pickup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (err) {
      console.error("Pickup form submission error:", err);
    }
    setSubmitting(false);
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
        <h3
          className="text-xl text-white font-bold mb-2"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          Pickup Scheduled
        </h3>
        <p className="text-ink-200 text-sm mb-4" style={{ fontFamily: "'Barlow', sans-serif" }}>
          We'll be in touch within 24 hours to confirm your pickup window.
        </p>
        <a
          href="https://wa.me/919810121438"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-400 transition-colors"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          Chat on WhatsApp →
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Business Name * */}
      <div>
        <label
          htmlFor="cp-business"
          className="block text-xs text-ink-200 mb-1.5 font-mono tracking-wider"
        >
          BUSINESS NAME *
        </label>
        <input
          id="cp-business"
          type="text"
          required
          value={form.business}
          onChange={(e) => setForm({ ...form, business: e.target.value })}
          className="w-full bg-ink-900/80 border border-ink-600/60 rounded-lg px-4 py-3 text-sm text-ink-100 placeholder-ink-400 focus:border-green-500/60 focus:outline-none transition-colors"
          placeholder="Sharma Motors"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        />
        {errors.business && (
          <p className="mt-1 text-xs text-red-400" style={{ fontFamily: "'Barlow', sans-serif" }}>
            {errors.business}
          </p>
        )}
      </div>

      {/* Phone Number * */}
      <div>
        <label
          htmlFor="cp-phone"
          className="block text-xs text-ink-200 mb-1.5 font-mono tracking-wider"
        >
          PHONE NUMBER *
        </label>
        <input
          id="cp-phone"
          type="tel"
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full bg-ink-900/80 border border-ink-600/60 rounded-lg px-4 py-3 text-sm text-ink-100 placeholder-ink-400 focus:border-green-500/60 focus:outline-none transition-colors"
          placeholder="+91 98101 21438"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-red-400" style={{ fontFamily: "'Barlow', sans-serif" }}>
            {errors.phone}
          </p>
        )}
      </div>

      {/* Location / Address (optional) */}
      <div>
        <label
          htmlFor="cp-location"
          className="block text-xs text-ink-200 mb-1.5 font-mono tracking-wider"
        >
          LOCATION / ADDRESS
        </label>
        <input
          id="cp-location"
          type="text"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="w-full bg-ink-900/80 border border-ink-600/60 rounded-lg px-4 py-3 text-sm text-ink-100 placeholder-ink-400 focus:border-green-500/60 focus:outline-none transition-colors"
          placeholder="Workshop address or area"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        />
      </div>

      {/* Quantity Available (optional) */}
      <div>
        <label
          htmlFor="cp-quantity"
          className="block text-xs text-ink-200 mb-1.5 font-mono tracking-wider"
        >
          QUANTITY AVAILABLE
        </label>
        <input
          id="cp-quantity"
          type="text"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          className="w-full bg-ink-900/80 border border-ink-600/60 rounded-lg px-4 py-3 text-sm text-ink-100 placeholder-ink-400 focus:border-green-500/60 focus:outline-none transition-colors"
          placeholder="e.g. 200 litres, 4 drums"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        />
      </div>

      {/* Preferred Frequency (optional) */}
      <div>
        <label
          htmlFor="cp-frequency"
          className="block text-xs text-ink-200 mb-1.5 font-mono tracking-wider"
        >
          PREFERRED FREQUENCY
        </label>
        <select
          id="cp-frequency"
          value={form.frequency}
          onChange={(e) => setForm({ ...form, frequency: e.target.value })}
          className="w-full bg-ink-900/80 border border-ink-600/60 rounded-lg px-4 py-3 text-sm text-ink-100 focus:border-green-500/60 focus:outline-none transition-colors appearance-none"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          <option value="" className="bg-ink-900 text-ink-100">
            Select frequency...
          </option>
          {frequencies.map((f) => (
            <option key={f} value={f} className="bg-ink-900 text-ink-100">
              {f}
            </option>
          ))}
        </select>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3.5 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-400 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          letterSpacing: "0.06em",
          fontSize: "1rem",
        }}
      >
        Schedule Pickup →
      </button>
    </form>
  );
}
