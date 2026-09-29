import type { Metadata } from "next";
import "../styles/globals.css";
import { CartProvider } from "@/lib/cart-context";

export const metadata: Metadata = {
  title: {
    default: "Dr Natures Healthcare | Natural Supplements & Consultations",
    template: "%s | Dr Natures Healthcare",
  },
  description:
    "Bangladesh's trusted natural healthcare platform. Shop organic supplements, book nutrition consultations, and read evidence-based wellness content.",
  keywords: ["nutrition", "supplements", "health consultation", "Bangladesh", "organic", "wellness"],
  authors: [{ name: "Dr Natures Healthcare" }],
  creator: "Dr Natures Healthcare",
  metadataBase: new URL("https://drnatures.com"),
  openGraph: {
    type: "website",
    locale: "en_BD",
    url: "https://drnatures.com",
    siteName: "Dr Natures Healthcare",
    title: "Dr Natures Healthcare | Natural Supplements & Consultations",
    description: "Bangladesh's trusted natural healthcare platform.",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Dr Natures Healthcare" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr Natures Healthcare",
    description: "Natural supplements, nutrition consultations & wellness education.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-background text-foreground">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
