import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import Hero from "@/components/Hero";
import Metrics from "@/components/Metrics";
import SelectedWork from "@/components/SelectedWork";
import Experience from "@/components/Experience";
import Principles from "@/components/Principles";
import StackMap from "@/components/StackMap";
import OpenSource from "@/components/OpenSource";
import EducationCerts from "@/components/EducationCerts";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Metrics />
        <SelectedWork />
        <Experience />
        <Principles />
        <StackMap />
        <OpenSource />
        <EducationCerts />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
