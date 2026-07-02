import { RecipeListingHeader } from "./recipe-listing-header";
import { RecipeListingGrid } from "./recipe-listing-grid";
import { EmptyCollection } from "./empty-collection";
import { createClient } from "@/lib/supabase/server";
import { Recipe } from "@/types/recipe";

export async function RecipeListingSection() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // RLS already scopes rows to the session; the explicit filters make the
  // guest/owner split visible in code (ADR-001 route access matrix).
  let query = supabase
    .from("recipes")
    .select("*")
    .order("created_at", { ascending: true });
  query = user ? query.eq("user_id", user.id) : query.eq("is_public", true);

  const { data: recipesData } = await query;

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
        <RecipeListingHeader isAuthenticated={!!user} />

        {user && recipes.length === 0 ? (
          <EmptyCollection />
        ) : (
          <RecipeListingGrid recipes={recipes} />
        )}
      </div>
    </section>
  );
}
