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
  metadataBase: new URL("https://thecivicdiary.com"),
  title: "The Civic Diary - News and Articles",
  description:
    "Stay informed with the latest news, insights, and articles on civic matters and community initiatives.",
  keywords: "news, articles, civic engagement, community, journalism",
  authors: [{ name: "The Civic Diary Team" }],
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/icon.png" },
      { url: "/brand/the-civic-diary-small-red.jpeg" },
    ],
    apple: "/apple-icon.png",
    shortcut: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thecivicdiary.com",
    siteName: "The Civic Diary",
    title: "The Civic Diary - Talks Straight, No Filler, Just Facts",
    description:
      "Stay informed with the latest news, insights, and articles on civic matters and community initiatives.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Civic Diary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Civic Diary - Talks Straight, No Filler, Just Facts",
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
