import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { RecipeForm } from "@/components/recipe/recipe-form";
import type { RecipeDetail } from "@/types/recipe";

interface EditRecipePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditRecipePage({ params }: EditRecipePageProps) {
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
    <>
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 border-b border-zinc-200 pb-6">Edit Recipe</h1>
      </div>
      <RecipeForm recipe={recipeDetail} />
    </>
  );
}
