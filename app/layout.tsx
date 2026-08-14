import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  metadataBase: new URL("https://murec.com"),
  title: "MUREC — Madhusudan Urban Real Estate Collection",
  description:
    "MUREC — Madhusudan Urban Real Estate Collection. 78+ years of legacy, building trust and premium living spaces that endure for generations.",
  keywords: [
    "MUREC",
    "Madhusudan Urban Real Estate",
    "Forest Walk",
    "Dasna",
    "Ghaziabad",
    "IGBC Certified",
    "Luxury Villas",
    "Premium Real Estate",
  ],
  openGraph: {
    title: "MUREC — Madhusudan Urban Real Estate Collection",
    description:
      "78+ years of legacy. Premium living spaces built on trust, quality, transparency, and innovation.",
    url: "/",
    siteName: "MUREC",
    images: [
      {
        url: "/images/banner.jpg",
        width: 1200,
        height: 630,
        alt: "MUREC — Forest Walk Collection",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/images/fav.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <CustomCursor />
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
