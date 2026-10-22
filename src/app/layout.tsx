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
    "Portfolio Samuel Setiawan — Creative Frontend Engineer & Web Architect. Membangun dunia digital sinematik, arsitektur modern 60 FPS, dan pengalaman pengguna kelas dunia dengan nuansa AAA Game Art.",
  keywords: [
    "Samuel Setiawan",
    "Creative Frontend Engineer",
    "Web Architect",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Portfolio",
    "Game Landing Page",
  ],
  authors: [{ name: "Samuel Setiawan" }],
  openGraph: {
    title: "Samuel Setiawan — Creative Frontend Engineer & Web Architect",
    description:
      "Membangun antarmuka modern, interaktif, performa tinggi, dan berkonversi maksimal.",
    type: "website",
    url: "https://sammy.gt.tc",
    images: [
      {
        url: "/images/hero_character.jpg",
        width: 1200,
        height: 630,
        alt: "Samuel Setiawan - Digital Sorcerer & Architect",
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
      lang="id"
      className={`${cinzel.variable} ${inter.variable} ${barlowCondensed.variable} scroll-smooth`}
    >
      <body className="bg-[#0B0818] text-[#F4EEFF] font-sans antialiased overflow-x-hidden selection:bg-[#E0529C] selection:text-white">
        {children}
      </body>
    </html>
  );
}
