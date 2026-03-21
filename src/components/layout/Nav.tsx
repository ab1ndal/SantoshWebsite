"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/process", label: "Process" },
  { href: "/sustainability", label: "Sustainability" },
  { href: "/collect", label: "Collect Used Oil" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink-900/95 backdrop-blur-md border-b border-ink-600/50 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Santosh Petrochemical">
            {/* SVG Icon — simplified gear+flame mark */}
            <svg
              width="36"
              height="36"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0"
            >
              <circle cx="50" cy="50" r="48" fill="#1a3a2a" stroke="#2d7a4e" strokeWidth="2" />
              <path
                d="M50 15 C50 15 35 35 35 55 C35 65 42 73 50 73 C58 73 65 65 65 55 C65 35 50 15 50 15Z"
                fill="#3a9e64"
              />
              <path
                d="M50 35 C50 35 42 48 42 57 C42 63 45.5 68 50 68 C54.5 68 58 63 58 57 C58 48 50 35 50 35Z"
                fill="#f59e0b"
              />
              <circle cx="50" cy="57" r="6" fill="#1a3a2a" />
            </svg>
            <div>
              <div
                className="text-xl leading-none tracking-widest text-green-400 font-display"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                SANTOSH
              </div>
              <div
                className="text-[9px] leading-tight tracking-[0.15em] text-ink-200 uppercase"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Petrochemical Innovations
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide text-ink-200 hover:text-green-400 transition-colors duration-200"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.9rem", letterSpacing: "0.06em" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/collect"
              className="text-sm font-semibold px-4 py-2 rounded border border-amber-500/60 text-amber-500 hover:bg-amber-500/10 transition-colors duration-200"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.06em" }}
            >
              Schedule Pickup
            </Link>
            <Link
              href="/products#sample"
              className="text-sm font-semibold px-5 py-2 rounded bg-green-500 text-white hover:bg-green-400 transition-colors duration-200"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.06em" }}
            >
              Request Sample →
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-ink-200 hover:text-green-400 transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-ink-900/98 backdrop-blur-md border-t border-ink-600/50">
          <nav className="px-6 py-6 flex flex-col gap-5" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-ink-200 hover:text-green-400 transition-colors"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.06em" }}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-ink-600/50 flex flex-col gap-3">
              <Link
                href="/collect"
                onClick={() => setOpen(false)}
                className="text-center text-sm font-semibold px-4 py-3 rounded border border-amber-500/60 text-amber-500"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Schedule Pickup
              </Link>
              <Link
                href="/products#sample"
                onClick={() => setOpen(false)}
                className="text-center text-sm font-semibold px-4 py-3 rounded bg-green-500 text-white"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Request Sample →
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
