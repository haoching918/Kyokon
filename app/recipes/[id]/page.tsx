import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { RecipeHeader } from "@/components/recipe/recipe-header";
import { RecipeIngredients } from "@/components/recipe/recipe-ingredients";
import { RecipeNutrition } from "@/components/recipe/recipe-nutrition";
import { RecipeSteps } from "@/components/recipe/recipe-steps";
import { RecipeVideo } from "@/components/recipe/recipe-video";
import type { RecipeDetail } from "@/types/recipe";

// In Next.js App Router, page components receive params as a Promise in Next 15+
// However, checking package.json, we have next v14 or v15?
// package.json says "next": "16.1.6" meaning params is a Promise!
interface RecipePageProps {
  params: Promise<{ id: string }>;
}

export default async function RecipeDetailPage({ params }: RecipePageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const supabase = await createClient();

  const { data: recipe, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !recipe) {
    notFound();
  }

  // Map the database snake_case to our typescript camelCase interface
  const recipeDetail: RecipeDetail = {
    id: recipe.id,
    title: recipe.title,
    description: recipe.description,
    imageUrl: recipe.image_url,
    prepTime: recipe.prep_time,
    cookTime: recipe.cook_time,
    tags: recipe.tags || [],
    difficulty: recipe.difficulty,
    servings: recipe.servings,
    isFavorite: recipe.is_favorite,
    nutrition: recipe.nutrition,
    ingredients: recipe.ingredients || [],
    steps: recipe.steps || [],
    videoUrl: recipe.video_url,
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <RecipeHeader recipe={recipeDetail} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Side: Ingredients & Nutrition */}
        <aside className="lg:col-span-4 space-y-12">
          <RecipeIngredients ingredients={recipeDetail.ingredients} />
          <RecipeNutrition nutrition={recipeDetail.nutrition} />
        </aside>

        {/* Right side: Step-by-step Procedures & Video */}
        <div className="lg:col-span-8">
          <RecipeSteps steps={recipeDetail.steps} />
          <RecipeVideo videoUrl={recipeDetail.videoUrl} />
        </div>
      </div>
    </main>
  );
}
