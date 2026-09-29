import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "../styles/globals.css";
import { EcosystemProvider } from "@/lib/ecosystem-context";
import { CartProvider } from "@/lib/cart-context";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Dr Natures | Premium Healthcare Ecosystem",
    template: "%s | Dr Natures",
  },
  description:
    "Integrated healthcare and clinical nutrition ecosystem in Bangladesh. BMDC registered doctors, organic supplements, medical books, and personalized lifestyle recovery protocols.",
  keywords: ["natural healthcare", "PCOS", "diabetes", "clinical nutrition", "organic honey", "black seed oil", "Dhaka", "Bangladesh"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        {/* FontAwesome 6 for pixel-perfect icons matching user design */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="antialiased min-h-screen bg-[#FDFBF7] text-[#1E293B] font-sans selection:bg-[#F59E0B]/20 selection:text-[#06261E] overflow-x-hidden relative">
        <CartProvider>
          <EcosystemProvider>
            {children}
          </EcosystemProvider>
        </CartProvider>
      </body>
    </html>
  );
}
