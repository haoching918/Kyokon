"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, Utensils, Flame, Edit2, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import type { RecipeDetail } from "@/types/recipe";
import { deleteRecipeAction } from "@/app/actions/recipe";

interface RecipeHeaderInfoProps {
  recipe: RecipeDetail;
}

export function RecipeHeaderInfo({ recipe }: RecipeHeaderInfoProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteConfirm = () => {
    startTransition(async () => {
      const result = await deleteRecipeAction(recipe.id);
      if (result.success) {
        setIsDeleteDialogOpen(false);
        router.push("/");
      } else {
        alert("Failed to delete recipe: " + result.error);
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
          onClick={() => router.push(`/recipes/${recipe.id}/edit`)}
          disabled={isPending}
          className="flex-1 font-bold py-6 rounded-lg text-base gap-2 hover:bg-slate-100 dark:hover:bg-slate-800"
          variant="outline"
        >
          <Edit2 className="h-5 w-5" />
          Edit Recipe
        </Button>
        <Button
          onClick={() => setIsDeleteDialogOpen(true)}
          disabled={isPending}
          className="flex-1 font-bold py-6 rounded-lg shadow-lg transition-all text-base gap-2 bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 dark:bg-red-950/50 dark:text-red-400 dark:hover:bg-red-900 border border-red-200 dark:border-red-900"
          variant="ghost"
        >
          <Trash2 className="h-5 w-5" />
          Delete
        </Button>
      </div>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              recipe.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700"
              disabled={isPending}
              onClick={(e) => {
                e.preventDefault();
                handleDeleteConfirm();
              }}
            >
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
