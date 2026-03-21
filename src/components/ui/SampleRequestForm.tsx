"use client";
import { useState } from "react";

const grades = ["", "SN 150", "SN 500", "Bright Stock", "Multiple / Unsure"];

export default function SampleRequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; address?: string; phone?: string }>({});
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    grade: "",
    quantity: "",
    application: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; address?: string; phone?: string } = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.address.trim()) newErrors.address = "Delivery address is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    // API call happens in plan 03-05
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
          Sample request received
        </h3>
        <p className="text-ink-200 text-sm mb-4">
          Our team will contact you within 2 business days.
        </p>
        <a
          href="https://wa.me/919810121438"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          Or WhatsApp us directly →
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Full Name * */}
      <div>
        <label
          htmlFor="sr-name"
          className="block text-xs text-ink-200 mb-1.5 font-mono tracking-wider"
        >
          FULL NAME *
        </label>
        <input
          id="sr-name"
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full bg-ink-900/80 border border-ink-600/60 rounded-lg px-4 py-3 text-sm text-ink-100 placeholder-ink-400 focus:border-green-500/60 focus:outline-none transition-colors"
          placeholder="Lalit Bindal"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        />
        {errors.name && <p className="mt-1 text-xs text-red-400" style={{ fontFamily: "'Barlow', sans-serif" }}>{errors.name}</p>}
      </div>

      {/* Address * */}
      <div>
        <label
          htmlFor="sr-address"
          className="block text-xs text-ink-200 mb-1.5 font-mono tracking-wider"
        >
          DELIVERY ADDRESS *
        </label>
        <input
          id="sr-address"
          type="text"
          required
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="w-full bg-ink-900/80 border border-ink-600/60 rounded-lg px-4 py-3 text-sm text-ink-100 placeholder-ink-400 focus:border-green-500/60 focus:outline-none transition-colors"
          placeholder="Factory / plant address"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        />
        {errors.address && <p className="mt-1 text-xs text-red-400" style={{ fontFamily: "'Barlow', sans-serif" }}>{errors.address}</p>}
      </div>

      {/* Phone * */}
      <div>
        <label
          htmlFor="sr-phone"
          className="block text-xs text-ink-200 mb-1.5 font-mono tracking-wider"
        >
          PHONE NUMBER *
        </label>
        <input
          id="sr-phone"
          type="tel"
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full bg-ink-900/80 border border-ink-600/60 rounded-lg px-4 py-3 text-sm text-ink-100 placeholder-ink-400 focus:border-green-500/60 focus:outline-none transition-colors"
          placeholder="+91 98101 21438"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        />
        {errors.phone && <p className="mt-1 text-xs text-red-400" style={{ fontFamily: "'Barlow', sans-serif" }}>{errors.phone}</p>}
      </div>

      {/* Email (optional) */}
      <div>
        <label
          htmlFor="sr-email"
          className="block text-xs text-ink-200 mb-1.5 font-mono tracking-wider"
        >
          EMAIL ADDRESS
        </label>
        <input
          id="sr-email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-ink-900/80 border border-ink-600/60 rounded-lg px-4 py-3 text-sm text-ink-100 placeholder-ink-400 focus:border-green-500/60 focus:outline-none transition-colors"
          placeholder="you@company.com"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        />
      </div>

      {/* Grade select (optional) */}
      <div>
        <label
          htmlFor="sr-grade"
          className="block text-xs text-ink-200 mb-1.5 font-mono tracking-wider"
        >
          GRADE / PRODUCT WANTED
        </label>
        <select
          id="sr-grade"
          value={form.grade}
          onChange={(e) => setForm({ ...form, grade: e.target.value })}
          className="w-full bg-ink-900/80 border border-ink-600/60 rounded-lg px-4 py-3 text-sm text-ink-100 focus:border-green-500/60 focus:outline-none transition-colors appearance-none"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          {grades.map((g) => (
            <option key={g} value={g} className="bg-ink-900 text-ink-100">
              {g === "" ? "Select a grade..." : g}
            </option>
          ))}
        </select>
      </div>

      {/* Quantity (optional) */}
      <div>
        <label
          htmlFor="sr-quantity"
          className="block text-xs text-ink-200 mb-1.5 font-mono tracking-wider"
        >
          QUANTITY REQUIRED
        </label>
        <input
          id="sr-quantity"
          type="text"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          className="w-full bg-ink-900/80 border border-ink-600/60 rounded-lg px-4 py-3 text-sm text-ink-100 placeholder-ink-400 focus:border-green-500/60 focus:outline-none transition-colors"
          placeholder="e.g. 20L sample drum, 1 drum for evaluation"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        />
      </div>

      {/* Intended Application (optional) */}
      <div>
        <label
          htmlFor="sr-application"
          className="block text-xs text-ink-200 mb-1.5 font-mono tracking-wider"
        >
          INTENDED APPLICATION
        </label>
        <input
          id="sr-application"
          type="text"
          value={form.application}
          onChange={(e) => setForm({ ...form, application: e.target.value })}
          className="w-full bg-ink-900/80 border border-ink-600/60 rounded-lg px-4 py-3 text-sm text-ink-100 placeholder-ink-400 focus:border-green-500/60 focus:outline-none transition-colors"
          placeholder="e.g. Engine oil blending"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="w-full py-3.5 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-400 transition-colors duration-200"
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          letterSpacing: "0.06em",
          fontSize: "1rem",
        }}
      >
        Send Sample Request →
      </button>

      <p
        className="text-xs text-ink-400 text-center"
        style={{ fontFamily: "'Barlow', sans-serif" }}
      >
        Samples dispatched within 3–5 business days of confirmation.
      </p>
    </form>
  );
}
