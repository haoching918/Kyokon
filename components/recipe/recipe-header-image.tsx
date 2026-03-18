import Image from "next/image";
import type { RecipeDetail } from "@/types/recipe";

interface RecipeHeaderImageProps {
  recipe: RecipeDetail;
}

export function RecipeHeaderImage({ recipe }: RecipeHeaderImageProps) {
  return (
    <div className="relative aspect-4/3 overflow-hidden rounded-xl shadow-2xl">
      <Image
        src={recipe.imageUrl || "/placeholder.jpg"}
        alt={recipe.title}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 1024px) 100vw, 60vw"
      />
    </div>
  );
}
