import { Metadata } from "next";
import { AboutHero } from "@/components/sections/AboutHero";
import { MissionSection } from "@/components/sections/MissionSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { BeliefsSection } from "@/components/sections/BeliefsSection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Real Connect Church's mission, vision, beliefs, and meet our leadership team.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MissionSection />
      <TeamSection />
      <BeliefsSection />
    </>
  );
}
