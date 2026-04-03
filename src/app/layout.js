import { GlobalContextProvider } from "@/Provider/Providers";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const roboto_init = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Liston Rosa",
    template: "%s | Liston Rosa",
  },
  description:
    "Campaña de concientización sobre el cáncer de mama y el arte urbano.",
  keywords: [
    "cáncer de mama",
    "concientización",
    "Liston Rosa",
    "salud",
    "murales",
    "Argentina",
  ],
  openGraph: {
    title: "Liston Rosa",
    description:
      "Campaña de concientización sobre el cáncer de mama y el arte urbano.",
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Liston Rosa",
    description:
      "Campaña de concientización sobre el cáncer de mama y el arte urbano.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${roboto_init.variable} site-body`}>
        <div className="site-shell">
          <Header />
          <GlobalContextProvider>
            <main className="site-main" id="main-content">
              {children}
            </main>
          </GlobalContextProvider>
          <Footer />
        </div>
      </body>
    </html>
  );
}
