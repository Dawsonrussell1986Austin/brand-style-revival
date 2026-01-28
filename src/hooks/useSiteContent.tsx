import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ContentItem {
  id: string;
  page: string;
  section: string;
  content_key: string;
  content_value: string;
  content_type: string;
  updated_at: string;
}

interface ImageItem {
  id: string;
  page: string;
  section: string;
  image_key: string;
  image_url: string;
  alt_text: string | null;
  updated_at: string;
}

// Hook to get all content for a page
export function usePageContent(page: string) {
  return useQuery({
    queryKey: ["site-content", page],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("page", page);
      
      if (error) throw error;
      return data as ContentItem[];
    },
  });
}

// Hook to get a specific content value with fallback
export function useContent(page: string, section: string, key: string, fallback: string = "") {
  const { data, isLoading } = useQuery({
    queryKey: ["site-content", page, section, key],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("content_value")
        .eq("page", page)
        .eq("section", section)
        .eq("content_key", key)
        .maybeSingle();
      
      if (error) throw error;
      return data?.content_value || null;
    },
  });

  return { content: data ?? fallback, isLoading };
}

// Hook to get all images for a page
export function usePageImages(page: string) {
  return useQuery({
    queryKey: ["site-images", page],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_images")
        .select("*")
        .eq("page", page);
      
      if (error) throw error;
      return data as ImageItem[];
    },
  });
}

// Hook to get a specific image with fallback
export function useImage(page: string, section: string, key: string, fallback: string = "") {
  const { data, isLoading } = useQuery({
    queryKey: ["site-images", page, section, key],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_images")
        .select("image_url, alt_text")
        .eq("page", page)
        .eq("section", section)
        .eq("image_key", key)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
  });

  return { 
    imageUrl: data?.image_url ?? fallback, 
    altText: data?.alt_text ?? "",
    isLoading 
  };
}

// Hook to update content (for admin)
export function useUpdateContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      page, 
      section, 
      key, 
      value,
      type = "text"
    }: { 
      page: string; 
      section: string; 
      key: string; 
      value: string;
      type?: string;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from("site_content")
        .upsert({
          page,
          section,
          content_key: key,
          content_value: value,
          content_type: type,
          updated_by: user?.id
        }, {
          onConflict: "page,section,content_key"
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-content"] });
    },
  });
}

// Hook to update image (for admin)
export function useUpdateImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      page, 
      section, 
      key, 
      url,
      altText
    }: { 
      page: string; 
      section: string; 
      key: string; 
      url: string;
      altText?: string;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from("site_images")
        .upsert({
          page,
          section,
          image_key: key,
          image_url: url,
          alt_text: altText,
          updated_by: user?.id
        }, {
          onConflict: "page,section,image_key"
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-images"] });
    },
  });
}

// Hook to upload image to storage
export function useUploadImage() {
  return useMutation({
    mutationFn: async ({ 
      file, 
      path 
    }: { 
      file: File; 
      path: string;
    }) => {
      const { data, error } = await supabase.storage
        .from("cms-images")
        .upload(path, file, { upsert: true });
      
      if (error) throw error;
      
      const { data: { publicUrl } } = supabase.storage
        .from("cms-images")
        .getPublicUrl(data.path);
      
      return publicUrl;
    },
  });
}

// Hook to check if user is admin
export function useIsAdmin() {
  return useQuery({
    queryKey: ["is-admin"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;
      
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .in("role", ["admin", "editor"]);
      
      if (error) return false;
      return data && data.length > 0;
    },
  });
}

// Hook to get all content (for admin dashboard)
export function useAllContent() {
  return useQuery({
    queryKey: ["site-content-all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .order("page")
        .order("section")
        .order("content_key");
      
      if (error) throw error;
      return data as ContentItem[];
    },
  });
}

// Hook to get all images (for admin dashboard)
export function useAllImages() {
  return useQuery({
    queryKey: ["site-images-all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_images")
        .select("*")
        .order("page")
        .order("section")
        .order("image_key");
      
      if (error) throw error;
      return data as ImageItem[];
    },
  });
}
