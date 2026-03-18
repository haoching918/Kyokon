import type { NutritionFacts } from "@/types/recipe";

interface RecipeNutritionProps {
  nutrition?: NutritionFacts;
}

export function RecipeNutrition({ nutrition }: RecipeNutritionProps) {
  if (!nutrition) return null;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <h4 className="text-xl font-bold mb-6">Nutrition Facts</h4>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest block mb-1">Total Fat</span>
          <span className="text-xl font-bold">{nutrition.totalFat}</span>
        </div>
        <div>
          <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest block mb-1">Net Carbs</span>
          <span className="text-xl font-bold">{nutrition.netCarbs}</span>
        </div>
        <div>
          <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest block mb-1">Protein</span>
          <span className="text-xl font-bold">{nutrition.protein}</span>
        </div>
        <div>
          <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest block mb-1">Sodium</span>
          <span className="text-xl font-bold">{nutrition.sodium}</span>
        </div>
      </div>
    </div>
  );
}
