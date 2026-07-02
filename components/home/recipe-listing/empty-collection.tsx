import Link from "next/link";
import { ChefHat } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function EmptyCollection() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 py-20 text-center">
      <ChefHat className="h-12 w-12 text-muted-foreground/50 mb-4" />
      <h3 className="text-lg font-semibold text-foreground">
        No recipes yet
      </h3>
      <p className="mt-1 mb-6 text-sm text-muted-foreground max-w-sm">
        Your collection is empty. Create your first recipe and start building
        your personal cookbook.
      </p>
      <Link
        href="/recipes/new"
        className={cn(
          buttonVariants({ size: "lg" }),
          "rounded-full px-8 font-semibold"
        )}
      >
        Create your first recipe
      </Link>
    </div>
  );
}
