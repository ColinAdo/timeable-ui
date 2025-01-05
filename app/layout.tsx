import "@/styles/globals.css";
import type { Metadata } from "next";

import { Toaster } from "sonner";
import Provider from "@/redux/provider";
import { Inter } from "next/font/google";
import { SetUp } from "@/components/utils";
import { Footer } from "@/components/common";
import { ThemeProvider } from "@/components/common/ThemeProvider";

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
          <div className="mx-auto max-h-7xl px-2 sm:px-6 lg:px-8 mt-6">
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
            <Toaster position="top-center" richColors />
          </div>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}