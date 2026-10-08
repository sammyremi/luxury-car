import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteConfig } from "@/lib/site-config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sammyremi.github.io/luxury-car"),
  title: "Nova Car | Luxury Cars for Sale & Rent",
  description:
    "Nova Car offers premium and luxury vehicles for sale and rent. Explore exceptional cars and find your next drive.",
  keywords: [
    "Luxury car sales",
    "Supercar rental",
    "Nova Car",
    "Porsche 911 GT3",
    "Ferrari 296 GTB",
    "Lamborghini Huracan",
    "Exotic car leasing",
  ],
  authors: [{ name: "Nova Car Automotive Group" }],
  openGraph: {
    title: "Nova Car | Luxury Cars for Sale & Rent",
    description:
      "Nova Car offers premium and luxury vehicles for sale and rent. Explore exceptional cars and find your next drive.",
    url: siteConfig.url,
    siteName: "Nova Car",
    images: [
      {
        url: "/cars/porche/gt side.webp",
        width: 1200,
        height: 630,
        alt: "Nova Car Luxury Porsche 911 GT3 RS",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nova Car | Luxury Cars for Sale & Rent",
    description:
      "Nova Car offers premium and luxury vehicles for sale and rent. Explore exceptional cars and find your next drive.",
    images: ["/cars/porche/gt side.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${outfit.variable}`}>
      <body className="antialiased font-sans selection:bg-amber-500 selection:text-neutral-950">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
