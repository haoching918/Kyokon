import Image from "next/image";
import type { RecipeStep } from "@/types/recipe";

interface RecipeStepsProps {
  steps: RecipeStep[];
}

export function RecipeSteps({ steps }: RecipeStepsProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="lg:col-span-8">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        Cooking Steps
      </h3>
      <div className="space-y-12">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row gap-8 items-start"
          >
            <div className="flex-1 order-2 md:order-1">
              <div className="flex items-center gap-4 mb-4">
                <span className="h-14 w-14 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-black text-2xl shadow-md shrink-0 border-4 border-background">
                  {index + 1}
                </span>
                <h4 className="text-xl font-bold">{step.title}</h4>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {step.description}
              </p>
            </div>
            {step.imageUrl && (
              <div className="w-full md:w-64 h-44 rounded-xl overflow-hidden shadow-md order-1 md:order-2 shrink-0 relative">
                <Image
                  src={step.imageUrl}
                  alt={step.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 256px"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
