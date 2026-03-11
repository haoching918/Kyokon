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
