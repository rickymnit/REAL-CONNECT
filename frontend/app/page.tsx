import { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServiceInfoSection } from "@/components/sections/ServiceInfoSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";
import { LatestSermonSection } from "@/components/sections/LatestSermonSection";

export const metadata: Metadata = {
  title: "Real Connect Church | You Belong Here",
  description:
    "Welcome to Real Connect Church - a multicultural Christian church in Jaipur where you can belong and grow in faith. Sunday services at 10:30 AM.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServiceInfoSection />
      <FeaturesSection />
      <TestimonialsSection />
      <LatestSermonSection />
      <CTASection />
    </>
  );
}
