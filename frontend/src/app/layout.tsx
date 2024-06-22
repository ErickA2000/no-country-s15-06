import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { NavBar, Footer, Providers } from "@/components";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Santa Ana Club",
  description: "Santa Ana Club - Club deportivo y social, donde las conexiones se convierten en amistades.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased light`}>
        < Providers >

          <div className="bg-custom-gradient">
            {children}
          </div>

        </ Providers >
      </body>
    </html>
  );
}
