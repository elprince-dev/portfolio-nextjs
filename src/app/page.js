import AboutSection from "@/components/AboutSection";
import BlogSection from "@/components/BlogSection";
import Contact from "@/components/Contact";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <BlogSection />
      <Contact />
    </main>
  );
}
