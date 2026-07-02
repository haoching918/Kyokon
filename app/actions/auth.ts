"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  // Layout-wide revalidation so the navbar and listing drop the session view.
  revalidatePath("/", "layout");
  redirect("/");
}
