import localFont from "next/font/local";
import googleFont from "next/font/google"
import { Inter } from "next/font/google";

import { SessionProvider } from "next-auth/react"

import "./globals.css";
import Link from "next/link";
import { auth } from "@/auth";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const domine = localFont({
  src: "./fonts/Domine-VariableFont_wght.ttf",
  variable: "--font-domine",
  weight: "400 500 600 700" 
})
const inter = Inter({
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ['latin']
})

export const metadata = {
  title: "Bamblingen.no - nyheter fra Bamble",
  description: "Folkeblad for Bamble",
};

export default async function RootLayout({ children }) {

  return (
    <SessionProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} ${domine.variable} ${inter.variable}`}>
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
