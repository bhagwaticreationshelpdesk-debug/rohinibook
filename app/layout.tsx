import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Online Bookstore | Buy Books Online | Rohini Book Depot",
  description: "Buy books online at best prices in India. Read book reviews & author details and more at Rohini Book Depot.",
};

import { AppContextProvider } from "./context/AppContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppContextProvider>
          <Header />
          <main className="perspective-container">{children}</main>
          <Footer />
        </AppContextProvider>
      </body>
    </html>
  );
}
