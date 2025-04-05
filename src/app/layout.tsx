import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";

// Tipografía Poppins con los pesos que necesitas
const poppins = Poppins({
  weight: ["400", "500", "800", "900"], // Regular, Medium, Extrabold, Black
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Héctor Olimpo",
  description: "Campaña política, partido, organización sin fines de lucro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${poppins.variable} font-poppins`}>
        {children}
      </body>
    </html>
  );
}
