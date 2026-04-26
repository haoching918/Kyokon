"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import type { RecipeDetail } from "@/types/recipe";
import { toggleFavoriteAction } from "@/app/actions/recipe";

interface RecipeHeaderImageProps {
  recipe: RecipeDetail;
}

export function RecipeHeaderImage({ recipe }: RecipeHeaderImageProps) {
  const [isFavorite, setIsFavorite] = useState(recipe.isFavorite);
  const [isPending, setIsPending] = useTransition();

  const handleToggleFavorite = () => {
    // Optimistically update the UI
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);

    // Call server action in transition
    setIsPending(async () => {
      const result = await toggleFavoriteAction(recipe.id, newFavoriteState);
      if (!result.success) {
        // Revert on failure
        setIsFavorite(!newFavoriteState);
      }
    });
  };

  return (
    <div className="relative aspect-4/3 overflow-hidden rounded-xl shadow-2xl group">
      <Image
        src={recipe.imageUrl || "/placeholder.jpg"}
        alt={recipe.title}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 1024px) 100vw, 60vw"
      />

      {/* Floating Favorite Button */}
      <button
        onClick={handleToggleFavorite}
        disabled={isPending}
        className="absolute top-4 right-4 z-10 p-3 bg-white rounded-full shadow-lg transition-transform hover:scale-105 disabled:opacity-70 disabled:hover:scale-100"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          className={`w-6 h-6 transition-colors ${
            isFavorite
              ? "fill-red-500 text-red-500"
              : "fill-transparent text-slate-400 hover:text-red-400"
          }`}
        />
      </button>
    </div>
  );
}
