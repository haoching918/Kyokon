import type { Ingredient } from "@/types/recipe";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RecipeIngredientsProps {
  ingredients: Ingredient[];
}

export function RecipeIngredients({ ingredients }: RecipeIngredientsProps) {
  if (!ingredients || ingredients.length === 0) return null;

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">Ingredients</h3>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <ScrollArea className="h-[460px] pr-4">
          <ul className="space-y-4">
            {ingredients.map((ingredient, index) => (
              <li 
                key={index}
                className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0"
              >
                <span className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-primary shrink-0"></span>
                  <span className="text-slate-700 dark:text-slate-300">{ingredient.item}</span>
                </span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{ingredient.amount}</span>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
    </div>
  );
}
