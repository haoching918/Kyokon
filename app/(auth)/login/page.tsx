import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OAuthButton } from "@/components/auth/oauth-button";
import { LoginForm } from "@/components/auth/login-form";

const ERROR_MESSAGES: Record<string, string> = {
  auth: "Sign-in failed. Please try again.",
  confirm: "Email confirmation failed or the link expired. Please try again.",
};

interface LoginPageProps {
  searchParams: Promise<{ next?: string; error?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next: rawNext = "/", error } = await searchParams;
  // Same-origin relative paths only — LoginForm feeds this to router.push,
  // so an unvalidated value would be an open redirect after sign-in.
  const next =
    rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/");

  return (
    <main className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gray-50 px-4 py-16">
      <Card className="w-full max-w-md rounded-lg shadow-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Sign in to manage your recipe collection
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {error && ERROR_MESSAGES[error] && (
            <p
              role="alert"
              className="text-sm text-red-600 dark:text-red-400 text-center"
            >
              {ERROR_MESSAGES[error]}
            </p>
          )}

          <OAuthButton next={next} />

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs uppercase text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

          <LoginForm next={next} />

          <p className="text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-foreground hover:underline"
            >
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
