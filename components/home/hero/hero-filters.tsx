import { Button } from "@/components/ui/button";
import { Leaf, Clock, Dumbbell } from "lucide-react";

export function HeroFilters() {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-2.5 px-4">
      <Button
        variant="outline"
        size="sm"
        className="rounded-full gap-2 px-5 h-9 bg-gray-200/50 hover:bg-gray-200/80 border-transparent text-xs font-bold text-foreground"
      >
        <Leaf className="h-3.5 w-3.5 fill-foreground/20" /> Vegan
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="rounded-full gap-2 px-5 h-9 bg-gray-200/50 hover:bg-gray-200/80 border-transparent text-xs font-bold text-foreground"
      >
        <Clock className="h-3.5 w-3.5 fill-foreground/20" /> Quick
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="rounded-full gap-2 px-5 h-9 bg-gray-200/50 hover:bg-gray-200/80 border-transparent text-xs font-bold text-foreground"
      >
        <Dumbbell className="h-3.5 w-3.5 fill-foreground/20" /> High Protein
      </Button>
    </div>
  );
}
