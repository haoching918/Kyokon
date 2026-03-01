import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Navbar = () => {
  return (
    <header className="flex h-20 items-center justify-between px-6 lg:px-12 w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-transparent">
      {/* Left Area - Logo */}
      <Link href="/" className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#111827]"></div>
        <span className="text-xl font-bold tracking-tight text-foreground">
          Kyokon
        </span>
      </Link>

      {/* Middle Area - Links */}
      <nav className="hidden md:flex items-center gap-8">
        <Link
          href="/categories"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Categories
        </Link>
        <Link
          href="/cookbook"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          My Cookbook
        </Link>
        <Link
          href="/popular"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Popular
        </Link>
      </nav>

      {/* Right Area - Actions */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          className="hidden sm:inline-flex rounded-full text-sm font-semibold h-10 px-5 border-gray-200 hover:bg-gray-50"
        >
          Surprise Me
        </Button>
        <Avatar className="h-10 w-10 border border-gray-200 cursor-pointer shadow-sm">
          <AvatarImage
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            alt="User avatar"
          />
          <AvatarFallback className="bg-orange-100 text-orange-800 font-medium">
            U
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
