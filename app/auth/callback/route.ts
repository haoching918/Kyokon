import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// PKCE code exchange: Supabase redirects here after OAuth consent (or a
// magic link) with a one-time code. Exchanging it sets the session cookie.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";
  // Only allow same-origin relative paths — prevents open redirects.
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Behind Vercel's load balancer, origin is the internal host —
      // x-forwarded-host carries the real one.
      const forwardedHost = request.headers.get("x-forwarded-host");
      if (process.env.NODE_ENV === "development") {
        return NextResponse.redirect(`${origin}${safeNext}`);
      }
      if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${safeNext}`);
      }
      return NextResponse.redirect(`${origin}${safeNext}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`);
}
