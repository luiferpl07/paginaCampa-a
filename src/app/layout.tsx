import type { Metadata } from "next";
import { Inter, Lato, Open_Sans, Kurale } from "next/font/google";

import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const lato = Lato({ weight: ["400", "700", "900"], subsets: ["latin"], variable: "--font-lato", display: "swap" });
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans", display: "swap" });
const kurale = Kurale({ 
  weight: ["400"], // Kurale solo viene en peso 400
  subsets: ["latin"],
  variable: "--font-kurale", 
  display: "swap" 
});

export const metadata: Metadata = {
  title: "Hector Olimpo",
  description: "Campaña política, partido, organización sin fines de lucro ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>

      <body className={`${inter.variable} ${lato.variable} ${openSans.variable} font-open-sans  ${kurale.variable}`}>
        {children }
      </body>
    </html>
  );
}
