interface RecipeListingHeaderProps {
  isAuthenticated?: boolean;
}

export function RecipeListingHeader({
  isAuthenticated = false,
}: RecipeListingHeaderProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold tracking-tight text-foreground">
        {isAuthenticated ? "My Recipes" : "Trending Recipes"}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {isAuthenticated
          ? "Your personal recipe collection"
          : "What's cooking in kitchens around the world"}
      </p>
    </div>
  );
}
