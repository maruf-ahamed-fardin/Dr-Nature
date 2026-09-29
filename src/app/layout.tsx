import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "../styles/globals.css";
import { CartProvider } from "@/lib/cart-context";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dr Natures | Pure Botanical Apothecary & Clinical Nutrition",
    template: "%s | Dr Natures",
  },
  description:
    "Bangladesh's premier luxury natural healthcare brand. Small-batch lab-tested supplements, certified clinical nutrition consultations, and evidence-based wellness literature.",
  keywords: ["natural healthcare", "botanical apothecary", "Shilajit", "Ashwagandha", "nutrition consultation", "Dhaka", "Bangladesh"],
  authors: [{ name: "Dr Natures Healthcare Ltd" }],
  creator: "Dr Natures Healthcare Ltd",
  metadataBase: new URL("https://drnatures.com"),
  openGraph: {
    type: "website",
    locale: "en_BD",
    url: "https://drnatures.com",
    siteName: "Dr Natures Apothecary",
    title: "Dr Natures | Pure Botanical Apothecary & Clinical Nutrition",
    description: "Bangladesh's premier luxury natural healthcare brand. Lab-tested adaptogens and personalized clinical protocols.",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Dr Natures Botanical Apothecary" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr Natures Apothecary",
    description: "Pure by nature. Clinically verified botanical healthcare in Bangladesh.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`} suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-background text-foreground font-body selection:bg-[#B39868]/20 selection:text-[#1F2B25]">
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
