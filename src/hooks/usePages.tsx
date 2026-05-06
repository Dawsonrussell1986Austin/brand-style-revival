import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CmsPage {
  id: string;
  slug: string;
  title: string;
  nav_label: string;
  meta_description: string;
  show_in_header: boolean;
  show_in_footer: boolean;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

// Public hook — only published pages
export function usePublishedPages() {
  return useQuery({
    queryKey: ["cms-pages", "published"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pages")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return (data || []) as CmsPage[];
    },
  });
}

export function usePageBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: ["cms-pages", "slug", slug],
    queryFn: async () => {
      if (!slug) return null;
      const { data, error } = await supabase
        .from("pages")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();
      if (error) throw error;
      return (data as CmsPage | null) || null;
    },
    enabled: !!slug,
  });
}

// Admin hook — all pages
export function useAllPages() {
  return useQuery({
    queryKey: ["cms-pages", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pages")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return (data || []) as CmsPage[];
    },
  });
}