"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RecipeGrid } from "./recipe-grid";
import { Recipe } from "@/types/recipe";

const INITIAL_COUNT = 6;

interface RecipeListingGridProps {
  recipes: Recipe[];
}

export function RecipeListingGrid({ recipes }: RecipeListingGridProps) {
  const [showAll, setShowAll] = useState(false);

  const visibleRecipes = showAll ? recipes : recipes.slice(0, INITIAL_COUNT);

  return (
    <>
      <RecipeGrid recipes={visibleRecipes} />

      {recipes.length > INITIAL_COUNT && (
        <div className="mt-10 flex justify-center">
          <Button
            variant="outline"
            className="rounded-full px-8 py-5 text-sm font-semibold"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Show Less Recipes ↑" : "Discover More Recipes →"}
          </Button>
        </div>
      )}
    </>
  );
}
