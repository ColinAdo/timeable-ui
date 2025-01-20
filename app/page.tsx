import { AboutSectionOne } from "@/components/home";
import { AboutSectionTwo } from "@/components/home";
import Blog from "@/components/home/Blog/index";
import Brands from "@/components/home/Brands/index";
import { ScrollUp } from "@/components/home/";
import Contact from "@/components/home/Contact";
import Features from "@/components/home/Features";
import { Hero } from "@/components/home";
import Pricing from "@/components/home/Pricing";
import Testimonials from "@/components/home/Testimonials";
import { Video } from "@/components/home";
import { Metadata } from "next";
import Header from "@/components/home/Header";

export const metadata: Metadata = {
  title: "Timeable | Home",
  description: "home page",
};

export default function Home() {
  return (
    <>
      <Header />
      <ScrollUp />
      <Hero />
      <Features />
      <Video />
      <Brands />
      <AboutSectionOne />
      <AboutSectionTwo />
      <Testimonials />
      <Pricing />
      <Blog />
      <Contact />
    </>
  );
}
