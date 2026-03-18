import { ChevronRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { RecipeDetail } from "@/types/recipe";
import { RecipeHeaderImage } from "./recipe-header-image";
import { RecipeHeaderInfo } from "./recipe-header-info";

interface RecipeHeaderProps {
  recipe: RecipeDetail;
}

export function RecipeHeader({ recipe }: RecipeHeaderProps) {
  return (
    <>
      <Breadcrumb className="mb-8 overflow-x-auto whitespace-nowrap">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>{recipe.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        <div className="lg:col-span-7">
          <RecipeHeaderImage recipe={recipe} />
        </div>
        <div className="lg:col-span-5 flex flex-col justify-center">
          <RecipeHeaderInfo recipe={recipe} />
        </div>
      </section>
    </>
  );
}
