import { HeroSection } from "@/components/home/hero/hero-section";
import { RecipeListingSection } from "@/components/home/recipe-listing/recipe-listing-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 w-full flex flex-col">
      <HeroSection />
      <RecipeListingSection />
    </main>
  );
}
