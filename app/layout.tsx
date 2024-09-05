import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "./pages/Footer";
import NavBar from "./pages/Navbar/NavBar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Electro Shop",
  description: "Electronic shop for selling electronic devices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
