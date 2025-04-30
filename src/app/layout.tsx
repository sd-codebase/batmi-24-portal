import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollingNews from "./components/ScrollingNews";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://batmi24.com"),
  title: "Batmi24 - News and Articles",
  description:
    "Stay informed with the latest news, insights, and articles on civic matters and community initiatives.",
  keywords: "news, articles, civic engagement, community, journalism",
  authors: [{ name: "Batmi24 Team" }],
  robots: "index, follow",
  icons: {
    icon: [{ url: "/icon.png" }, { url: "/brand/batmi-24-square-red.png" }],
    apple: "/apple-icon.png",
    shortcut: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://batmi24.com",
    siteName: "Batmi24",
    title: "Batmi24 - Talks Straight, No Filler, Just Facts",
    description:
      "Stay informed with the latest news, insights, and articles on civic matters and community initiatives.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Batmi24",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Batmi24 - Talks Straight, No Filler, Just Facts",
    description:
      "Stay informed with the latest news, insights, and articles on civic matters and community initiatives.",
    images: ["/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <ScrollingNews />
        {/* Adjusted padding since header is now sticky instead of fixed */}
        <main className="max-w-[1200px] mx-auto px-4 py-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
