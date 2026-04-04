import { Metadata } from "next";
import { ContactHero } from "@/components/sections/ContactHero";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { ContactInfo } from "@/components/sections/ContactInfo";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Real Connect Church. We'd love to hear from you and answer any questions you may have.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactFormSection />
      <ContactInfo />
    </>
  );
}
