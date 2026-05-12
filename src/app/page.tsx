import Hero from "@/components/home/Hero";
import ConnectionSection from "@/components/home/ConnectionSection";
import LogoTicker from "@/components/home/LogoTicker";
import ServicesSection from "@/components/home/ServicesSection";
import AboutSection from "@/components/home/AboutSection";
import ProcessSection from "@/components/home/ProcessSection";
import EbookSection from "@/components/home/EbookSection";
import PricingSection from "@/components/home/PricingSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <ConnectionSection />
      <LogoTicker />
      <ServicesSection />
      <ProcessSection />
      <AboutSection />
      <EbookSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}
