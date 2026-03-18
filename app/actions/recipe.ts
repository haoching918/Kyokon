"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

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
