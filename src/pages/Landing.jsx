import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Hero from "../components/landing/Hero";
import PspCarousel from "../components/landing/PspCarousel";
import HowItWorks from "../components/landing/HowItWorks";
import PaymentStackMap from "../components/PaymentStackMap";
import AiAssistant from "../components/landing/AiAssistant";
import Pricing from "../components/landing/Pricing";
import Waitlist from "../components/landing/Waitlist";
import Faq from "../components/landing/Faq";
import Footer from "../components/landing/Footer";

export default function Landing() {
  return (
    <Layout>
      <Navbar />
      <Hero />
      <PspCarousel />
      <HowItWorks />
      <PaymentStackMap />
      <AiAssistant />
      <Pricing />
      <Waitlist />
      <Faq />
      <Footer />
    </Layout>
  );
}
