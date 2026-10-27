import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import site from "@/content/site.json";
import { isTodo } from "@/lib/ui";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const browserTitle = "Owoade Anuoluwapo — Backend and Full-Stack Engineer";
const metaDescription =
  "A software engineer with 6+ years of experience building reliable, high-performance web applications that solve real-world problems.";

const metadataBase = isTodo(site.siteUrl) ? undefined : new URL(site.siteUrl);

export const metadata: Metadata = {
  metadataBase,
  title: browserTitle,
  description: metaDescription,
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: browserTitle,
    description: metaDescription,
    siteName: site.name,
    type: "website",
    images: [{ url: "/preview.png", width: 1672, height: 941, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: browserTitle,
    description: metaDescription,
    images: ["/preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} font-display antialiased`}>
        {children}
      </body>
    </html>
  );
}