import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ProcessHero from "@/components/sections/process/ProcessHero";
import ProcessSteps from "@/components/sections/process/ProcessSteps";
import IOCLCallout from "@/components/sections/process/IOCLCallout";

export const metadata: Metadata = {
  title: "Our Re-Refining Process | Santosh Petrochemical",
  description:
    "From used oil to Group II+ in 6 steps. Indian Oil Technology hydrotreating — vacuum distillation, catalytic hydrotreating, lab-verified quality.",
};

export default function ProcessPage() {
  return (
    <>
      <Nav />
      <main>
        <ProcessHero />
        <ProcessSteps />
        <IOCLCallout />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
