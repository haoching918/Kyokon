"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { RecipeDetail } from "@/types/recipe";

// Derived from RecipeDetail — drops camelCase DB-mapped fields and replaces them
// with their snake_case column equivalents. id is excluded (auto-generated).
export type RecipePayload = Omit<
  RecipeDetail,
  "id" | "imageUrl" | "videoUrl" | "prepTime" | "cookTime" | "isFavorite"
> & {
  image_url?: string;
  video_url?: string;
  prep_time?: string;
  cook_time?: string;
  is_favorite?: boolean;
};

export async function toggleFavoriteAction(
  recipeId: string,
  newIsFavorite: boolean
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("recipes")
    .update({ is_favorite: newIsFavorite })
    .eq("id", recipeId);

  if (error) {
    console.error("Error toggling favorite:", error);
    return { success: false, error: error.message };
  }

  // Revalidate the route to show fresh data next time the page loads
  revalidatePath(`/recipes/${recipeId}`);
  
  return { success: true };
}

export async function createRecipeAction(
  recipeData: RecipePayload
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("recipes")
    .insert([recipeData])
    .select();

  if (error) {
    console.error("Error creating recipe:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/recipes"); // Revalidate recipes listings
  
  return { success: true, data: data[0] };
}

export async function updateRecipeAction(id: string, recipeData: Partial<RecipePayload>) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("recipes")
    .update(recipeData)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating recipe:", error);
    return { success: false, error: error.message };
  }

  revalidatePath(`/recipes/${id}`);
  revalidatePath("/recipes");
  
  return { success: true, data: data[0] };
}

export async function deleteRecipeAction(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("recipes")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting recipe:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/recipes");
  
  return { success: true };
}
