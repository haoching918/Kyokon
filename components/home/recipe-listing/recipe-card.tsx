import Image from "next/image";
import { Heart } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Clock03Icon } from "@hugeicons/core-free-icons";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Recipe } from "@/types/recipe";

import Link from "next/link";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipes/${recipe.id}`} className="group/card block">
      <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow duration-300 py-0 gap-0 h-full">
        <div className="relative aspect-3/2 w-full overflow-hidden">
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            fill
            className="object-cover transition-transform duration-300 group-hover/card:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <button
            className="absolute top-3 right-3 rounded-full bg-white/80 backdrop-blur-sm p-1.5 hover:bg-white transition-colors"
            aria-label={
              recipe.isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Heart
              className="h-4 w-4"
              fill={recipe.isFavorite ? "#ef4444" : "none"}
              color={recipe.isFavorite ? "#ef4444" : "#6b7280"}
            />
          </button>
        </div>

        <CardHeader className="pb-0 pt-4 gap-1.5">
          <div className="flex flex-wrap gap-1.5">
            {recipe.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <CardTitle className="text-base font-semibold leading-tight line-clamp-1">
            {recipe.title}
          </CardTitle>
          <CardDescription className="text-xs line-clamp-2 text-muted-foreground">
            {recipe.description}
          </CardDescription>
        </CardHeader>

        <CardFooter className="pt-3 pb-4 text-xs text-muted-foreground gap-4">
          <span className="flex items-center gap-1">
            <HugeiconsIcon icon={Clock03Icon} className="h-3.5 w-3.5" />
            {recipe.prepTime} prep
          </span>
          <span className="flex items-center gap-1">
            <HugeiconsIcon icon={Clock03Icon} className="h-3.5 w-3.5" />
            {recipe.cookTime} cook
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
