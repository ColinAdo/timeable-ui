import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar, Footer } from "@/components/common";
import { SetUp } from "@/components/utils";
import Provider from "@/redux/provider";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Timeable",
  description:
    "This app generate timetables automatically by providing units using excel file...",
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
          <Navbar />
          <div className="mx-auto max-w-7xl: px-2 sm:px-6 lg:px-8 my-8">
            {children}
          </div>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
