import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timeable | Home",
  description: "home page",
};

import Hero from "@/components/hero"
import Navbar from "@/components/navbar"

export default function Page() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative">

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <Hero />
      </div>
    </main>
  )
}
