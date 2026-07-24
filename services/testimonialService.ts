import { getSupabaseClient } from "../lib/supabase";
import type {
  AdminTestimonial,
  NewTestimonialInput,
  Testimonial,
  TestimonialRow,
  TestimonialUpdate,
} from "../types/testimonial";

// ── Mapping between DB columns and the UI shape ─────────────────────
//
// DB:  name        designation   company   testimonial   avatar   approved   created_at
// UI:  author      role (designation + company)          quote    emoji

const DEFAULT_EMOJI = "💬";

/** Combine `designation` + `company` into the single "role" string the UI shows. */
function toRole(row: TestimonialRow): string {
  return [row.designation, row.company].filter(Boolean).join(", ");
}

function rowToTestimonial(row: TestimonialRow): Testimonial {
  return {
    id: row.id,
    quote: row.testimonial,
    author: row.name,
    role: toRole(row),
    emoji: row.avatar || DEFAULT_EMOJI,
  };
}

function rowToAdminTestimonial(row: TestimonialRow): AdminTestimonial {
  return {
    ...rowToTestimonial(row),
    approved: row.approved,
    createdAt: row.created_at,
  };
}

/**
 * Fetch approved testimonials, newest first. Used by the public portfolio page.
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(rowToTestimonial);
}

/**
 * Fetch every testimonial (approved and pending), newest first.
 * Used by the admin dashboard for moderation.
 */
export async function getAllTestimonials(): Promise<AdminTestimonial[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(rowToAdminTestimonial);
}

/**
 * Insert a new testimonial submitted by a visitor and return the created row.
 *
 * The row is stored with `approved: true` so it is saved permanently and shows
 * up immediately on the public site — this matches the project's RLS policy,
 * which only permits inserting approved rows via the anon key.
 */
export async function createTestimonial(
  input: NewTestimonialInput
): Promise<Testimonial> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("testimonials")
    .insert({
      name: input.author.trim(),
      designation: input.role.trim() || null,
      company: null,
      testimonial: input.quote.trim(),
      avatar: input.emoji,
      approved: true,
    })
    .select("*")
    .single();

  if (error) throw error;
  return rowToTestimonial(data as TestimonialRow);
}

/**
 * Update a testimonial (e.g. approve it). Accepts DB-column-shaped patch.
 */
export async function updateTestimonial(
  id: string,
  patch: TestimonialUpdate
): Promise<void> {
  const supabase = getSupabaseClient();
  const { error } = await supabase
    .from("testimonials")
    .update(patch)
    .eq("id", id);

  if (error) throw error;
}

/**
 * Permanently delete a testimonial.
 */
export async function deleteTestimonial(id: string): Promise<void> {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);

  if (error) throw error;
}
