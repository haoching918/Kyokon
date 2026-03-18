"use client";

import { useState, useTransition } from "react";
import { Clock, Utensils, Flame, Heart, Edit2, HeartIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { RecipeDetail } from "@/types/recipe";
import { toggleFavoriteAction } from "@/app/actions/recipe";

interface RecipeHeaderInfoProps {
  recipe: RecipeDetail;
}

export function RecipeHeaderInfo({ recipe }: RecipeHeaderInfoProps) {
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
    <div className="flex flex-col justify-center h-full">
      <div className="mb-4 flex flex-wrap gap-2">
        {recipe.tags?.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="px-3 py-1 text-xs font-semibold"
          >
            {tag}
          </Badge>
        ))}
      </div>

      <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
        {recipe.title}
      </h2>

      <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
        {recipe.description}
      </p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-3 bg-primary/10 rounded-lg text-center flex flex-col items-center justify-center">
          <Clock className="text-primary mb-1 h-6 w-6" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Time
          </span>
          <span className="text-sm font-bold">{recipe.prepTime}</span>
        </div>
        <div className="p-3 bg-primary/10 rounded-lg text-center flex flex-col items-center justify-center">
          <Utensils className="text-primary mb-1 h-6 w-6" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Servings
          </span>
          <span className="text-sm font-bold">{recipe.servings} People</span>
        </div>
        <div className="p-3 bg-primary/10 rounded-lg text-center flex flex-col items-center justify-center">
          <Flame className="text-primary mb-1 h-6 w-6" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Calories
          </span>
          <span className="text-sm font-bold">
            {recipe.nutrition?.calories || 0} kcal
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button
          onClick={handleToggleFavorite}
          disabled={isPending}
          className={`flex-1 font-bold py-6 rounded-lg shadow-lg shadow-primary/20 transition-all text-base gap-2 ${
            isFavorite
              ? "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900 border border-red-200 dark:border-red-800"
              : "bg-primary text-primary-foreground hover:brightness-90"
          }`}
          variant="default"
        >
          {isFavorite ? (
            <>
              <Heart className="h-5 w-5 fill-current" />
              Favorited
            </>
          ) : (
            <>
              <HeartIcon className="h-5 w-5" />
              Add to Favorite
            </>
          )}
        </Button>
        <Button
          className="flex-1 font-bold py-6 rounded-lg text-base gap-2"
          variant="outline"
        >
          <Edit2 className="h-5 w-5" />
          Edit Recipe
        </Button>
      </div>
    </div>
  );
}
