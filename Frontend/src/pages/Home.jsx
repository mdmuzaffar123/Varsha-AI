import HomeHero from "../components/home/HomeHero";
import FeatureSection from "../components/home/FeatureSection";
import ImpactSection from "../components/home/ImpactSection";
import WhyVarshaAI from "../components/home/WhyVarshaAI";
import ProductFlow from "../components/home/ProductFlow";
import ImpactBanner from "../components/home/ImpactBanner";

export default function Home() {
  return (
    <>
      <HomeHero />
      <FeatureSection />
      <ImpactSection />
      <WhyVarshaAI />
      <ProductFlow />
      <ImpactBanner />
    </>
  );
}

