import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function HeroSearchBar() {
  return (
    <div className="relative mx-auto flex w-full max-w-2xl items-center overflow-hidden bg-white dark:bg-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-full border border-gray-100/50 p-1.5 focus-within:ring-2 focus-within:ring-slate-900/10 focus-within:border-slate-300 transition-all">
      <div className="flex items-center justify-center pl-5 pr-2 text-muted-foreground/60 shrink-0">
        <Search className="h-5 w-5" />
      </div>
      <Input
        type="text"
        placeholder="Search ingredients, cuisines, or dishes..."
        className="flex-1 border-0 shadow-none focus-visible:ring-0 text-base h-12 bg-transparent rounded-full px-1 placeholder:text-muted-foreground/60 w-full truncate"
      />
      <Button className="rounded-full px-8 h-12 text-sm font-semibold transition-transform active:scale-95 bg-[#111827] hover:bg-[#1f2937] text-white shrink-0 ml-1">
        Search
      </Button>
    </div>
  );
}
