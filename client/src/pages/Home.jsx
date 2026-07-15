import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Companies from "../components/Companies";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import DashboardPreview from "../components/DashboardPreview";
import Pricing from "../components/Pricing";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Navbar />
      <Hero />
      <Companies />
      <Features />
      <HowItWorks />
      <DashboardPreview />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}