import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type BlockType = "hero" | "text" | "image" | "cards" | "cta" | "gallery";

export interface CardItem {
  title?: string;
  text?: string;
  image_url?: string;
  link_label?: string;
  link_url?: string;
}

export interface PageBlock {
  id: string;
  page_slug: string;
  block_type: BlockType;
  display_order: number;
  is_published: boolean;
  heading: string | null;
  subheading: string | null;
  body: string | null;
  image_url: string | null;
  image_alt: string | null;
  cta_label: string | null;
  cta_url: string | null;
  items: CardItem[];
  settings: Record<string, unknown>;
}

export function usePageBlocks(slug: string, includeDrafts = false) {
  return useQuery({
    queryKey: ["page-blocks", slug, includeDrafts],
    enabled: !!slug,
    queryFn: async () => {
      let q = supabase.from("page_blocks").select("*").eq("page_slug", slug);
      if (!includeDrafts) q = q.eq("is_published", true);
      const { data, error } = await q.order("display_order", { ascending: true });
      if (error) throw error;
      return (data || []).map((b: any) => ({
        ...b,
        items: Array.isArray(b.items) ? b.items : [],
        settings: b.settings || {},
      })) as PageBlock[];
    },
  });
}
