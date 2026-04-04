import type { Metadata } from "next";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: "Real Connect Church | You Belong Here",
    template: "%s | Real Connect Church",
  },
  description:
    "Real Connect Church is a multicultural Christian church in Jaipur focused on community, belonging, and spiritual growth. Sunday services at 10:30 AM.",
  keywords: [
    "church",
    "Jaipur",
    "Christian",
    "worship",
    "community",
    "sermons",
    "Real Connect",
  ],
  authors: [{ name: "Real Connect Church" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://realconnectchurch.com",
    siteName: "Real Connect Church",
    title: "Real Connect Church | You Belong Here",
    description:
      "A multicultural Christian church focused on community, belonging, and spiritual growth.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Real Connect Church",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Connect Church | You Belong Here",
    description:
      "A multicultural Christian church focused on community, belonging, and spiritual growth.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
