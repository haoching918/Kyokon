"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createRecipeAction, updateRecipeAction } from "@/app/actions/recipe";
import type { RecipePayload } from "@/app/actions/recipe";
import {
  Camera,
  Image as ImageIcon,
  Trash2,
  PlusCircle,
  CheckCircle,
  Plus,
  X,
  Video,
} from "lucide-react";
import type { RecipeDetail } from "@/types/recipe";
import { ImageUploadModal } from "./image-upload-modal";

export function RecipeForm({ recipe }: { recipe?: RecipeDetail }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [imageUrl, setImageUrl] = useState(recipe?.imageUrl || "");
  const [videoUrl, setVideoUrl] = useState(recipe?.videoUrl || "");
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);
  const [stepModalIndex, setStepModalIndex] = useState<number | null>(null);
  const [title, setTitle] = useState(recipe?.title || "");
  const [description, setDescription] = useState(recipe?.description || "");
  const [prepTime, setPrepTime] = useState(recipe?.prepTime || "");
  const [cookTime, setCookTime] = useState(recipe?.cookTime || "");
  const [servings, setServings] = useState(recipe?.servings?.toString() || "");
  const [difficulty, setDifficulty] = useState(recipe?.difficulty || "Medium");

  const [tags, setTags] = useState<string[]>(recipe?.tags || []);
  const [tagInput, setTagInput] = useState("");

  const [ingredients, setIngredients] = useState<
    { item: string; amount: string }[]
  >(
    recipe?.ingredients?.length
      ? recipe.ingredients
      : [{ item: "", amount: "" }],
  );

  const [nutrition, setNutrition] = useState({
    calories: recipe?.nutrition?.calories?.toString() || "",
    protein: recipe?.nutrition?.protein?.toString() || "",
    netCarbs: recipe?.nutrition?.netCarbs?.toString() || "",
    totalFat: recipe?.nutrition?.totalFat?.toString() || "",
    sodium: recipe?.nutrition?.sodium?.toString() || "",
  });
  const [steps, setSteps] = useState<
    { description: string; imageUrl: string }[]
  >(
    recipe?.steps?.length
      ? recipe.steps.map((s) => ({
          description: s.description || "",
          imageUrl: s.imageUrl || "",
        }))
      : [{ description: "", imageUrl: "" }],
  );

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = tagInput.replace(",", "").trim();
      if (val !== "" && !tags.includes(val)) {
        setTags([...tags, val]);
      }
      setTagInput("");
    }
  };
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const addIngredient = () =>
    setIngredients([...ingredients, { item: "", amount: "" }]);
  const removeIngredient = (index: number) =>
    setIngredients(ingredients.filter((_, i) => i !== index));

  const addStep = () => setSteps([...steps, { description: "", imageUrl: "" }]);
  const removeStep = (index: number) =>
    setSteps(steps.filter((_, i) => i !== index));

  async function handleSubmit(e?: React.KeyboardEvent<HTMLInputElement>) {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);

    const recipeData: RecipePayload = {
      title,
      description,
      image_url:
        imageUrl ||
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAT6nFJv10aDF_SQqXHtLv3xBoyUp8UXaAbckqyWISRN0K3hR_miAnKBmAF4L7ohOjSCZLgviaTTcFni9noIELa-RZ3Ij2st7baAlKIVpOEUi29OrD75hgyGj5H2G4GAdOyHeO5u7h6vKUDFM2q0dU1tW-zL8NbzD8Zm7J4n4CRaQHK9PVkZY6G01sJyqbjeGc_cL9lXEt-eBwFKv51dBWoCotRwykIK1wjH9sYk-yX1oWYRcD0b7sV0yAA6XQoorM2dv27-SNqnrs",
      video_url: videoUrl,
      prep_time: prepTime || "15 mins",
      cook_time: cookTime || "30 mins",
      difficulty: difficulty,
      servings: parseInt(servings, 10) || 2,
      is_favorite: recipe ? recipe.isFavorite : false,
      tags: tags,
      ingredients: ingredients.filter((i) => i.item.trim() !== ""),
      steps: steps.map((s, idx) => ({
        title: `Step ${idx + 1}`,
        description: s.description,
        imageUrl: s.imageUrl,
      })),
      nutrition: {
        calories: parseInt(nutrition.calories, 10) || 0,
        protein: nutrition.protein || "0g",
        totalFat: nutrition.totalFat || "0g",
        netCarbs: nutrition.netCarbs || "0g",
        sodium: nutrition.sodium || "0mg",
      },
    };

    let result;
    if (recipe) {
      result = await updateRecipeAction(recipe.id, recipeData);
    } else {
      result = await createRecipeAction(recipeData);
    }

    if (!result.success) {
      setError(result.error || "An unknown error occurred while saving.");
      setLoading(false);
    } else {
      router.push(`/recipes/${result.data?.id}`);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="pb-12"
    >
      <main className="max-w-7xl mx-auto px-6 py-12">
        {error && (
          <div className="mb-8 text-red-500 bg-red-50 font-bold p-4 rounded-xl border border-red-200">
            {error}
          </div>
        )}

        {/* Header & Core Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Hero Image Placeholder */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-video group overflow-hidden bg-zinc-100 rounded-xl border-2 border-dashed border-zinc-300 flex items-center justify-center transition-all hover:border-zinc-800 shadow-2xl shadow-zinc-200/50 focus-within:border-zinc-800">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Recipe cover"
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                />
              ) : (
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAT6nFJv10aDF_SQqXHtLv3xBoyUp8UXaAbckqyWISRN0K3hR_miAnKBmAF4L7ohOjSCZLgviaTTcFni9noIELa-RZ3Ij2st7baAlKIVpOEUi29OrD75hgyGj5H2G4GAdOyHeO5u7h6vKUDFM2q0dU1tW-zL8NbzD8Zm7J4n4CRaQHK9PVkZY6G01sJyqbjeGc_cL9lXEt-eBwFKv51dBWoCotRwykIK1wjH9sYk-yX1oWYRcD0b7sV0yAA6XQoorM2dv27-SNqnrs"
                  alt="Placeholder"
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-20 transition-opacity"
                />
              )}
              <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-3 text-zinc-800 bg-white/90 px-6 py-4 rounded-xl backdrop-blur-sm border border-zinc-200 shadow-sm transition-opacity">
                <Camera size={36} />
                <button
                  type="button"
                  onClick={() => setIsCoverModalOpen(true)}
                  className="bg-zinc-900 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-zinc-800 transition-colors w-full uppercase tracking-widest text-xs mb-2 mt-2"
                >
                  {imageUrl ? "Change Cover Image" : "Upload Cover Image"}
                </button>

                <Video size={24} className="mt-2 text-zinc-500" />
                <span className="font-bold tracking-tight text-sm uppercase text-zinc-500">
                  YouTube Video URL
                </span>
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full bg-white border border-zinc-200 rounded-lg p-2 text-xs font-medium focus:ring-1 focus:ring-zinc-800 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Right: Meta Information */}
          <div className="lg:col-span-5 space-y-8 bg-white p-8 rounded-xl shadow-sm border border-zinc-100">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.1em] text-zinc-500 font-bold">
                Recipe Title
              </label>
              <input
                className="w-full text-4xl font-extrabold tracking-tight border-none p-0 focus:ring-0 placeholder:text-zinc-200 rounded-xl focus:outline-none bg-transparent"
                placeholder="e.g., Miso-Glazed Black Cod"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.1em] text-zinc-500 font-bold">
                Short Description
              </label>
              <textarea
                className="w-full text-lg font-medium text-zinc-600 bg-zinc-50 border-none rounded-xl focus:ring-1 focus:ring-zinc-800 placeholder:text-zinc-400 p-4 focus:outline-none resize-none"
                placeholder="Describe the essence of this dish..."
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* Extended Meta Info not in original design visually but required */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.1em] text-zinc-500 font-bold">
                  Prep Time
                </label>
                <input
                  className="w-full bg-zinc-50 border-none rounded-xl text-sm font-bold p-3 focus:ring-1 focus:ring-zinc-800 focus:outline-none"
                  placeholder="15 mins"
                  value={prepTime}
                  onChange={(e) => setPrepTime(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.1em] text-zinc-500 font-bold">
                  Cook Time
                </label>
                <input
                  className="w-full bg-zinc-50 border-none rounded-xl text-sm font-bold p-3 focus:ring-1 focus:ring-zinc-800 focus:outline-none"
                  placeholder="30 mins"
                  value={cookTime}
                  onChange={(e) => setCookTime(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.1em] text-zinc-500 font-bold">
                  Servings
                </label>
                <input
                  className="w-full bg-zinc-50 border-none rounded-xl text-sm font-bold p-3 focus:ring-1 focus:ring-zinc-800 focus:outline-none"
                  placeholder="2"
                  type="number"
                  min="1"
                  value={servings}
                  onChange={(e) => setServings(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-[0.1em] text-zinc-500 font-bold">
                  Difficulty
                </label>
                <select
                  className="w-full bg-zinc-50 border-none rounded-xl text-sm font-bold p-3 focus:ring-1 focus:ring-zinc-800 focus:outline-none"
                  value={difficulty}
                  onChange={(e) =>
                    setDifficulty(e.target.value as "Easy" | "Medium" | "Hard")
                  }
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.1em] text-zinc-500 font-bold">
                Labels
              </label>
              <div className="flex flex-wrap gap-2 items-center">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 bg-zinc-800/10 text-zinc-800 text-xs font-bold border border-zinc-800/20 flex items-center gap-2 rounded-xl"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="focus:outline-none hover:text-red-500 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
                <div className="relative group/tag">
                  <span className="absolute inset-y-0 left-3 flex items-center text-zinc-400">
                    <Plus size={14} />
                  </span>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="Add tag & press enter"
                    className="pl-8 pr-4 py-1.5 w-40 bg-transparent border border-dashed border-zinc-300 text-zinc-600 text-xs font-bold focus:border-zinc-800 focus:text-zinc-800 focus:ring-0 focus:outline-none transition-colors rounded-xl placeholder:text-zinc-400 placeholder:font-semibold"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detail Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16 border-t-[0.5px] border-zinc-200 pt-16">
          {/* Ingredients & Nutrition */}
          <div className="lg:col-span-5 space-y-12">
            {/* Ingredients */}
            <section>
              <div className="flex justify-between items-end mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-zinc-800">
                  Ingredients
                </h2>
                <button
                  type="button"
                  onClick={addIngredient}
                  className="flex items-center gap-2 text-zinc-800 font-bold text-sm hover:underline decoration-2 underline-offset-4 rounded-xl focus:outline-none"
                >
                  <PlusCircle size={16} /> Add Ingredient
                </button>
              </div>
              <div className="space-y-4">
                {ingredients.map((ing, i) => (
                  <div key={i} className="flex gap-4 items-center group">
                    <input
                      className="w-24 bg-zinc-100 border-none rounded-xl p-3 text-sm font-bold text-center focus:outline-none focus:ring-1 focus:ring-zinc-800 placeholder:text-zinc-400"
                      type="text"
                      placeholder="e.g. 200g"
                      value={ing.amount}
                      onChange={(e) => {
                        const newIng = [...ingredients];
                        newIng[i].amount = e.target.value;
                        setIngredients(newIng);
                      }}
                    />
                    <input
                      className="flex-1 bg-transparent border-b border-zinc-200 p-3 text-sm font-medium focus:border-zinc-800 focus:outline-none transition-colors rounded-none placeholder:text-zinc-400"
                      type="text"
                      placeholder="Item name (e.g. Black Cod Fillet)"
                      value={ing.item}
                      onChange={(e) => {
                        const newIng = [...ingredients];
                        newIng[i].item = e.target.value;
                        setIngredients(newIng);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeIngredient(i)}
                      className="opacity-0 group-hover:opacity-100 focus:opacity-100 text-zinc-300 hover:text-red-500 transition-all p-2 rounded-xl focus:outline-none"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Nutrition */}
            <section className="bg-zinc-50 p-8 rounded-xl border border-zinc-200">
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black mb-6">
                Nutrition Facts (Per Serving)
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-600 font-bold uppercase">
                    Calories
                  </label>
                  <input
                    className="w-full bg-white border border-zinc-200 rounded-xl text-lg font-bold p-3 focus:outline-none focus:ring-1 focus:ring-zinc-800 placeholder:text-zinc-300"
                    placeholder="0"
                    type="number"
                    value={nutrition.calories}
                    onChange={(e) =>
                      setNutrition({ ...nutrition, calories: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-600 font-bold uppercase">
                    Protein (g)
                  </label>
                  <input
                    className="w-full bg-white border border-zinc-200 rounded-xl text-lg font-bold p-3 focus:outline-none focus:ring-1 focus:ring-zinc-800 placeholder:text-zinc-300"
                    placeholder="0g"
                    type="text"
                    value={nutrition.protein}
                    onChange={(e) =>
                      setNutrition({ ...nutrition, protein: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-600 font-bold uppercase">
                    Carbs (g)
                  </label>
                  <input
                    className="w-full bg-white border border-zinc-200 rounded-xl text-lg font-bold p-3 focus:outline-none focus:ring-1 focus:ring-zinc-800 placeholder:text-zinc-300"
                    placeholder="0g"
                    type="text"
                    value={nutrition.netCarbs}
                    onChange={(e) =>
                      setNutrition({ ...nutrition, netCarbs: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-zinc-600 font-bold uppercase">
                    Fat (g)
                  </label>
                  <input
                    className="w-full bg-white border border-zinc-200 rounded-xl text-lg font-bold p-3 focus:outline-none focus:ring-1 focus:ring-zinc-800 placeholder:text-zinc-300"
                    placeholder="0g"
                    type="text"
                    value={nutrition.totalFat}
                    onChange={(e) =>
                      setNutrition({ ...nutrition, totalFat: e.target.value })
                    }
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Cooking Steps */}
          <div className="lg:col-span-7">
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-800">
                Cooking Steps
              </h2>
            </div>

            <div className="space-y-12">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="flex-none">
                    <div className="w-10 h-10 bg-zinc-800 text-white flex items-center justify-center font-black text-sm rounded-xl shadow-lg">
                      {(i + 1).toString().padStart(2, "0")}
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="relative">
                      <textarea
                        className="w-full bg-white border border-zinc-200 rounded-xl p-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-800/20 placeholder:text-zinc-300 resize-none pb-14"
                        placeholder={
                          i === 0
                            ? "Describe the first step..."
                            : "Next instructions..."
                        }
                        rows={3}
                        value={step.description}
                        onChange={(e) => {
                          setSteps((prev) => {
                            const newSteps = [...prev];
                            newSteps[i] = {
                              ...newSteps[i],
                              description: e.target.value,
                            };
                            return newSteps;
                          });
                        }}
                        required
                      />
                      <div className="absolute right-4 bottom-4 flex gap-2">
                        <button
                          type="button"
                          onClick={() => setStepModalIndex(i)}
                          className="w-8 h-8 flex items-center justify-center bg-zinc-50 text-zinc-500 rounded-xl transition-colors hover:text-zinc-800 hover:bg-zinc-100 focus:outline-none"
                          title="Upload step image"
                        >
                          <ImageIcon size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeStep(i)}
                          className="w-8 h-8 flex items-center justify-center bg-zinc-50 text-zinc-500 rounded-xl hover:text-red-500 hover:bg-red-50 transition-colors focus:outline-none"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Step Image Preview */}
                    {step.imageUrl && (
                      <div className="w-full rounded-xl overflow-hidden bg-zinc-200 relative group/img shadow-md">
                        <img
                          className="w-full max-h-64 object-cover"
                          src={step.imageUrl}
                          alt={`Step ${i + 1}`}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                          <button
                            type="button"
                            onClick={() => {
                              const newSteps = [...steps];
                              newSteps[i].imageUrl = "";
                              setSteps(newSteps);
                            }}
                            className="bg-white px-4 py-2 text-xs font-bold text-red-500 rounded-xl shadow-xl hover:bg-red-50 transition-colors"
                          >
                            Remove Image
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Add Step Button */}
              <div className="flex gap-6 group">
                <div className="flex-none">
                  <div className="w-10 h-10 bg-zinc-200 text-zinc-500 flex items-center justify-center font-black text-sm rounded-xl">
                    {(steps.length + 1).toString().padStart(2, "0")}
                  </div>
                </div>
                <div className="flex-1">
                  <button
                    type="button"
                    onClick={addStep}
                    className="w-full h-24 border-2 border-dashed border-zinc-300 rounded-xl flex flex-col items-center justify-center gap-2 text-zinc-500 hover:border-zinc-800 hover:text-zinc-800 transition-all focus:outline-none focus:border-zinc-800 focus:text-zinc-800"
                  >
                    <Plus size={24} />
                    <span className="text-xs font-bold uppercase tracking-widest">
                      Click to add next step
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Cancel/Save — inline after steps */}
        <div className="hidden md:flex max-w-7xl mx-auto mt-8 justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-zinc-200 text-zinc-600 font-bold rounded-xl hover:bg-zinc-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-zinc-800 text-white font-bold rounded-xl shadow-lg hover:bg-zinc-700 transition-all disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Recipe"}
          </button>
        </div>

        {/* Contextual Actions (Mobile & Desktop) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-zinc-200 flex gap-4 z-40">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 px-6 py-4 border border-zinc-200 text-zinc-900 font-bold rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-[2] px-6 py-4 bg-zinc-800 text-white font-bold rounded-xl shadow-lg disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Recipe"}
          </button>
        </div>
      </main>

      {/* Upload Modals */}
      <ImageUploadModal
        isOpen={isCoverModalOpen}
        onClose={() => setIsCoverModalOpen(false)}
        onUploadComplete={(urls) => {
          if (urls.length > 0) setImageUrl(urls[0]);
        }}
      />

      <ImageUploadModal
        isOpen={stepModalIndex !== null}
        onClose={() => setStepModalIndex(null)}
        onUploadComplete={(urls) => {
          if (urls.length > 0 && stepModalIndex !== null) {
            setSteps((prevSteps) => {
              const newSteps = [...prevSteps];
              newSteps[stepModalIndex] = {
                ...newSteps[stepModalIndex],
                imageUrl: urls[0],
              };
              return newSteps;
            });
          }
        }}
      />
    </form>
  );
}
