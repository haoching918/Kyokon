import { HeroTitle } from "./hero-title";
import { HeroSearchBar } from "./hero-search-bar";
import { HeroFilters } from "./hero-filters";

export const HeroSection = () => {
  return (
    <section className="relative flex min-h-[450px] items-center justify-center px-4 py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div className="relative z-10 w-full max-w-3xl text-center flex flex-col items-center">
        <HeroTitle />
        <HeroSearchBar />
        <HeroFilters />
      </div>
    </section>
  );
};
