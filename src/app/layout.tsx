import type { Metadata } from "next";
import { Cinzel, Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sammy.gt.tc"),
  title: "Samuel Setiawan — Creative Frontend Engineer & Web Architect",
  description:
    "Portfolio of Samuel Setiawan — Creative Frontend Engineer & Web Architect. Building cinematic digital experiences, modern 60 FPS architectures, and world-class user interfaces.",
  keywords: [
    "Samuel Setiawan",
    "Creative Frontend Engineer",
    "Web Architect",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Portfolio",
    "Web Developer",
  ],
  authors: [{ name: "Samuel Setiawan" }],
  openGraph: {
    title: "Samuel Setiawan — Creative Frontend Engineer & Web Architect",
    description:
      "Building modern, interactive, high-performance interfaces that convert.",
    type: "website",
    url: "https://sammy.gt.tc",
    images: [
      {
        url: "/images/hero_character.png",
        width: 1200,
        height: 630,
        alt: "Samuel Setiawan - Creative Frontend Engineer & Web Architect",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${inter.variable} ${barlowCondensed.variable} scroll-smooth`}
    >
      <body className="bg-[#0B0818] text-[#F4EEFF] font-sans antialiased overflow-x-hidden selection:bg-[#E0529C] selection:text-white">
        {children}
      </body>
    </html>
  );
}
