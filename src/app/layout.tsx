import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { JeffNav } from "@/components/nav";
import JeffHeader from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jeff's dev stuffs",
  description: "Developer musings from a seasoned veteran",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <JeffHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
