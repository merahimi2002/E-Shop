import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./components/Pages/Navbar/NavBar";
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
      </body>
    </html>
  );
}
