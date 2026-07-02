import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { UserMenu } from "@/components/layout/user-menu";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";

export const Navbar = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let username: string | null = null;
  let avatarUrl: string | null = null;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("username, avatar_url")
      .eq("id", user.id)
      .single();
    username = profile?.username ?? user.email ?? "User";
    avatarUrl = profile?.avatar_url ?? null;
  }

  return (
    <header className="flex h-20 items-center justify-between px-6 lg:px-12 w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-transparent">
      {/* Left Area - Logo */}
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="Kyokon Logo"
          width={36}
          height={36}
          className="rounded-lg object-contain"
          priority
        />
        <span className="text-xl font-bold tracking-tight text-foreground">
          Kyokon
        </span>
      </Link>

      {/* Middle Area - Links */}
      <nav className="hidden md:flex items-center gap-8">
        <Link
          href="/"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Categories
        </Link>
        <Link
          href="/"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          My Cookbook
        </Link>
        <Link
          href="/recipes/new"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Create Recipe
        </Link>
        <Link
          href="/"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Popular
        </Link>
      </nav>

      {/* Right Area - Actions */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Button
          variant="outline"
          className="hidden sm:inline-flex rounded-full text-sm font-semibold h-10 px-5 border-gray-200 hover:bg-gray-50"
        >
          Surprise Me
        </Button>
        {user && username ? (
          <UserMenu username={username} avatarUrl={avatarUrl} />
        ) : (
          <Link
            href="/login"
            className={cn(
              buttonVariants(),
              "rounded-full text-sm font-semibold h-10 px-5"
            )}
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};
