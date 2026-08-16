import { ParallaxProvider } from "@/lib/motion/ParallaxProvider";
import { CinematicPreloader } from "@/components/home/CinematicPreloader";
import { HeroScene } from "@/components/home/HeroScene";
import { WordmarkBridge } from "@/components/home/WordmarkBridge";
import { FeaturedGrid } from "@/components/home/FeaturedGrid";
import { NarrativeSection } from "@/components/home/NarrativeSection";
import { NewsletterModule } from "@/components/home/NewsletterModule";
import { MOCK_PRODUCTS } from "@/lib/data/fixtures";

export default function Home() {
  return (
    <ParallaxProvider>
      <CinematicPreloader />
      <HeroScene />
      <WordmarkBridge />
      <FeaturedGrid products={MOCK_PRODUCTS} />
      <NarrativeSection />
      <NewsletterModule />
    </ParallaxProvider>
  );
}
