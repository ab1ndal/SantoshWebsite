import Link from "next/link";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";

const footerLinks = {
  Products: [
    { label: "Group II+ RRBO", href: "/products" },
    { label: "SN 150 Grade", href: "/products#sn150" },
    { label: "SN 500 Grade", href: "/products#sn500" },
    { label: "Request a Sample", href: "/sample-request" },
    { label: "Download TDS", href: "/products#tds" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Process", href: "/process" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Quality & Certs", href: "/quality" },
    { label: "Insights", href: "/insights" },
    { label: "Contact Us", href: "/contact" },
  ],
  "Used Oil Collection": [
    { label: "Schedule a Pickup", href: "/collect" },
    { label: "Service Areas", href: "/collect#areas" },
    { label: "EPR Compliance", href: "/sustainability#epr" },
    { label: "FAQ", href: "/collect#faq" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-ink-950 border-t border-ink-600/40">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="48" fill="#1a3a2a" stroke="#2d7a4e" strokeWidth="2" />
                <path d="M50 15 C50 15 35 35 35 55 C35 65 42 73 50 73 C58 73 65 65 65 55 C65 35 50 15 50 15Z" fill="#3a9e64" />
                <path d="M50 35 C50 35 42 48 42 57 C42 63 45.5 68 50 68 C54.5 68 58 63 58 57 C58 48 50 35 50 35Z" fill="#f59e0b" />
                <circle cx="50" cy="57" r="6" fill="#1a3a2a" />
              </svg>
              <div>
                <div className="text-lg tracking-widest text-green-400" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  SANTOSH
                </div>
                <div className="text-[9px] tracking-[0.12em] text-ink-400 uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  Petrochemical Innovations
                </div>
              </div>
            </Link>

            <p className="text-ink-200 text-sm leading-relaxed mb-6 max-w-xs">
              Re-refining India&apos;s used lubricating oil into Group&nbsp;II+ base oil via hydrotreating technology.
              EPR-compliant. BS-VI ready.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-ink-200">
                <MapPin size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span>7, New Arya Nagar, Meerut Road,<br />Ghaziabad, Uttar Pradesh 201001</span>
              </div>
              <a href="tel:+919810121438" className="flex items-center gap-3 text-sm text-ink-200 hover:text-green-400 transition-colors">
                <Phone size={14} className="text-green-500 flex-shrink-0" />
                +91 98101 21438
              </a>
              <a href="mailto:santoshgzb@yahoo.com" className="flex items-center gap-3 text-sm text-ink-200 hover:text-green-400 transition-colors">
                <Mail size={14} className="text-green-500 flex-shrink-0" />
                santoshgzb@yahoo.com
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3
                className="text-xs font-semibold tracking-widest text-ink-400 uppercase mb-5"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-200 hover:text-green-400 transition-colors duration-200 flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={10}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Stats strip */}
      <div className="border-t border-ink-700/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            {[
              { value: "1.3MT", label: "Used oil generated annually in India" },
              { value: "<15%", label: "Currently formally recycled" },
              { value: "Group II+", label: "RRBO via hydrotreating" },
              { value: "EPR", label: "Compliant recycler, CPCB registered" },
            ].map((stat) => (
              <div key={stat.label} className="py-2">
                <div
                  className="text-xl text-amber-500"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-ink-400 mt-0.5 leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ink-700/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-ink-400">
            © {new Date().getFullYear()} Santosh Petrochemical Innovations Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-xs text-ink-400">
            Part of{" "}
            <span className="text-ink-200">Santosh Associates</span>
            {" "}· IOCL Servo SSI Stockist · Western Uttar Pradesh
          </p>
        </div>
      </div>
    </footer>
  );
}
