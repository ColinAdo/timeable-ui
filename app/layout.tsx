import "@/styles/globals.css";
import type { Metadata } from "next";

import { Footer } from "@/components/common";
import { SetUp } from "@/components/utils";
import Provider from "@/redux/provider";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Timeable",
  description: "Timeable is an app that allows you tp generate university academic timetables",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <SetUp />
          <div className="mx-auto max-h-7xl">
            {children}
            <Toaster position="top-center" richColors />
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}