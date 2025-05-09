import { GoogleAnalytics } from "@next/third-parties/google";
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
  title:
    "ताज्या महाराष्ट्र बातम्या व ब्रेकिंग न्यूज | batmi24.com | मराठी बातम्या | Batmi 24 | Latest Marathi News",
  description:
    "महाराष्ट्र, राजकारण, मनोरंजन, आणि शेती बातम्यांचे अचूक अपडेट्स. batmi24.com वर वाचा ताज्या व्हायरल न्यूज, Latest News, आणि ब्रेकिंग न्यूज.",
  keywords:
    "ताज्या बातम्या, Latest News, Maharashtra News, Marathi News, महाराष्ट्र ब्रेकिंग न्यूज, Maharashtra Breaking News, मुंबई बातम्या, मराठी वृत्तपत्र, ताज्या घटना, Maharashtra News Today, Maharashtra News Live, Maharashtra News Paper, Maharashtra News Website",
  authors: [{ name: "Batmi24 Digital Team" }],
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
    title:
      "Batmi24 - मराठीतून, महाराष्ट्रासाठी, थेट आणि नेमक्या ताज्या बातम्या!",
    description:
      "महाराष्ट्र, राजकारण, मनोरंजन, आणि शेती बातम्यांचे अचूक अपडेट्स. batmi24.com वर वाचा ताज्या व्हायरल न्यूज, Latest News, आणि ब्रेकिंग न्यूज.",
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
    title:
      "Batmi24 - मराठीतून, महाराष्ट्रासाठी, थेट आणि नेमक्या ताज्या बातम्या!",
    description:
      "महाराष्ट्र, राजकारण, मनोरंजन, आणि शेती बातम्यांचे अचूक अपडेट्स. batmi24.com वर वाचा ताज्या व्हायरल न्यूज, Latest News, आणि ब्रेकिंग न्यूज.",
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
        <GoogleAnalytics gaId="G-62QTPB7SDG" />
        <Header />
        <ScrollingNews />
        {/* Adjusted padding since header is now sticky instead of fixed */}
        <main className="max-w-[1200px] mx-auto px-4 py-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
