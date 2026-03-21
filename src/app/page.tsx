import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import AudienceCards from "@/components/sections/AudienceCards";
import ProcessTeaser from "@/components/sections/ProcessTeaser";
import WhyGroupII from "@/components/sections/WhyGroupII";
import SustainabilitySnapshot from "@/components/sections/SustainabilitySnapshot";
import CertificationsStrip from "@/components/sections/CertificationsStrip";
import LatestInsights from "@/components/sections/LatestInsights";
import FooterCTA from "@/components/sections/FooterCTA";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatsBar />
        <AudienceCards />
        <ProcessTeaser />
        <WhyGroupII />
        <SustainabilitySnapshot />
        <CertificationsStrip />
        <LatestInsights />
        <FooterCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
