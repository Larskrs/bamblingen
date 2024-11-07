import localFont from "next/font/local";
import "./globals.css";

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

export const metadata = {
  title: "Bamblingen.no - nyheter fra Bamble når du trenger dem.",
  description: "Folkeblad for Bamble",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${domine.variable}`}>
        {children}
      </body>
    </html>
  );
}
