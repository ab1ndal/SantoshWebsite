import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ProductsHero from "@/components/sections/products/ProductsHero";
import SpecTable from "@/components/sections/products/SpecTable";
import ComparisonTable from "@/components/sections/products/ComparisonTable";
import GradeCards from "@/components/sections/products/GradeCards";
import PackFormats from "@/components/sections/products/PackFormats";
import TDSGate from "@/components/sections/products/TDSGate";

export const metadata: Metadata = {
  title: "Group II+ RRBO Products | Santosh Petrochemical",
  description:
    "Re-refined base oil meeting API Group II+ specifications — SN 150, SN 500, Bright Stock. Produced at our 65 TPD plant using Indian Oil Technology hydrotreating.",
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Group II+ Re-Refined Base Oil (RRBO)",
  description:
    "Premium Group II+ re-refined base oil produced via vacuum distillation and hydrotreating. Viscosity Index >=95, Sulfur <300ppm.",
  manufacturer: {
    "@type": "Organization",
    name: "Santosh Petrochemical Innovations Pvt. Ltd.",
  },
  category: "Base Oil",
};

export default function ProductsPage() {
  return (
    <>
      <Nav />
      <main>
        <ProductsHero />
        <SpecTable />
        <ComparisonTable />
        <GradeCards />
        <PackFormats />
        <TDSGate />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
