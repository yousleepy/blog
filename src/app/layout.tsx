import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { JeffNav } from "@/app/components/nav";
import JeffHeader from "@/app/components/header";

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
        <JeffHeader />
        <div className="grid-cols-12 grid h-full">
          <div className="col-span-2 row-start-1 ">
            <JeffNav />
          </div>
          <div className="col-span-9 lg:-mt-16 ">{children}</div>
        </div>
      </body>
    </html>
  );
}
