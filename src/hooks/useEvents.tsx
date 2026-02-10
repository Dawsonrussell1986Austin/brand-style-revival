import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface DBEvent {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  end_time: string;
  location: string;
  address: string | null;
  type: "virtual" | "in-person";
  category: string | null;
  registration_url: string | null;
  image_url: string | null;
  is_published: boolean;
}

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("is_published", true)
        .order("date", { ascending: true });
      if (error) throw error;
      return data as DBEvent[];
    },
  });
}

export function useEvent(slug: string | undefined) {
  return useQuery({
    queryKey: ["event", slug],
    queryFn: async () => {
      if (!slug) return null;
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();
      if (error) throw error;
      return data as DBEvent | null;
    },
    enabled: !!slug,
  });
}
