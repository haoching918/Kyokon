export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  prepTime: string;
  cookTime: string;
  tags: string[];
  difficulty: Difficulty;
  servings: number;
  isFavorite: boolean;
}

export interface Ingredient {
  item: string;
  amount: string;
}

export interface RecipeStep {
  title: string;
  description: string;
  imageUrl?: string; 
}

export interface NutritionFacts {
  calories: number;
  totalFat: string;
  netCarbs: string;
  protein: string;
  sodium: string;
}

export interface RecipeDetail extends Recipe {
  nutrition: NutritionFacts;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  videoUrl?: string;
}
