import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../types/testimonial";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Build the client only when both env vars are present. If they are missing we
// keep `client` null and log a clear message rather than throwing at import
// time — the calling code surfaces a graceful error/retry state instead of the
// whole page crashing.
let client: SupabaseClient<Database> | null = null;

if (supabaseUrl && supabaseAnonKey) {
  client = createClient<Database>(supabaseUrl, supabaseAnonKey);
} else {
  console.error(
    "Supabase environment variables are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local."
  );
}

/** The shared Supabase client, or `null` when env vars are not configured. */
export const supabase = client;

/**
 * Returns the configured Supabase client, throwing a friendly error if the
 * environment is not set up. Service functions call this and let callers catch
 * the error to render the "Couldn't load testimonials right now." state.
 */
export function getSupabaseClient(): SupabaseClient<Database> {
  if (!client) {
    throw new Error(
      "Supabase is not configured. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }
  return client;
}
