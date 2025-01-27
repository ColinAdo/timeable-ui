import { Hero, Video } from "@/components/home";
import Blog from "@/components/home/Blog/index";
import Brands from "@/components/home/Brands/index";
import Contact from "@/components/home/Contact";
import Features from "@/components/home/Features";
import Header from "@/components/home/Header";
import { Pricing } from "@/components/common";
import Testimonials from "@/components/home/Testimonials";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timeable | Home",
  description: "home page",
};

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <Video />
      <Brands />
      <Testimonials />
      <Pricing />
      <Blog />
      <Contact />
    </>
  );
}
