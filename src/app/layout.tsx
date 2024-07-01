import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

export const metadata = {
  title: "Emerick Bosch",
  description: "Some of my thoughts, for sharing.",
  icons: [{ rel: "icon", url: "/xpcoffee-icon.svg" }],
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
    },
  },
  openGraph: {
    siteName: "emerickbosch.com",
    type: "website",
    locale: "en_GB",
    title: "emerickbosch.com",
    description: "Some of my thoughts, for sharing.",
    url: `https://emerickbosch.com`,
    images: [
      {
        url: "https://emerickbosch.com/xpcoffee-logo.svg",
        width: 800,
        height: 600,
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
    <html lang="en" className={`${GeistSans.variable}`}>
      {children}
    </html>
  );
}
