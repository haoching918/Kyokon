import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-12 md:py-16 px-6 lg:px-12 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-10 lg:gap-16 md:grid-cols-12">
        {/* Brand & Description */}
        <div className="flex flex-col gap-4 md:col-span-4 max-w-sm">
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
          <p className="text-sm text-muted-foreground leading-relaxed mt-2">
            create home recipe database for you daily life
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4 md:col-span-2 md:col-start-6">
          <h4 className="font-semibold text-sm text-foreground tracking-tight">
            Quick Links
          </h4>
          <nav className="flex flex-col gap-3 mt-1">
            <Link
              href="/submit"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Submit a Recipe
            </Link>
            <Link
              href="/newsletter"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Newsletter
            </Link>
            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/help"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Help Center
            </Link>
          </nav>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-4 md:col-span-2">
          <h4 className="font-semibold text-sm text-foreground tracking-tight">
            Legal
          </h4>
          <nav className="flex flex-col gap-3 mt-1">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cookie Policy
            </Link>
          </nav>
        </div>

        {/* Stay Updated */}
        <div className="flex flex-col gap-4 md:col-span-3">
          <h4 className="font-semibold text-sm text-foreground tracking-tight">
            Stay Updated
          </h4>
          <p className="text-sm text-muted-foreground mt-1 mb-2">
            Get the best recipes delivered to your inbox weekly.
          </p>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="email"
              placeholder="Email"
              className="bg-white border-gray-200"
            />
            <Button
              size="icon"
              className="bg-[#111827] hover:bg-[#1f2937] text-white shrink-0 px-3"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 md:mt-16 pt-8 border-t border-gray-200 text-center text-xs font-medium text-muted-foreground">
        © 2026 Kyokon. All rights reserved. Made with ❤️ for food lovers.
      </div>
    </footer>
  );
};
