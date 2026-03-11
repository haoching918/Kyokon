import { RecipeListingHeader } from "./recipe-listing-header";
import { RecipeListingGrid } from "./recipe-listing-grid";
import { createClient } from "@/lib/supabase/server";
import { Recipe } from "@/types/recipe";

export async function RecipeListingSection() {
  const supabase = await createClient();
  const { data: recipesData } = await supabase
    .from("recipes")
    .select("*")
    .order("created_at", { ascending: true });

  const recipes: Recipe[] =
    recipesData?.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      imageUrl: recipe.image_url,
      prepTime: recipe.prep_time,
      cookTime: recipe.cook_time,
      tags: recipe.tags,
      difficulty: recipe.difficulty,
      servings: recipe.servings,
      isFavorite: recipe.is_favorite,
    })) || [];

  return (
    <section className="w-full bg-white px-4 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <RecipeListingHeader />

        <RecipeListingGrid recipes={recipes} />
      </div>
    </section>
  );
}
