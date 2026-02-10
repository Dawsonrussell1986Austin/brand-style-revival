
-- Create free_resources table for manageable downloads
CREATE TABLE public.free_resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  file_url TEXT NOT NULL DEFAULT '',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.free_resources ENABLE ROW LEVEL SECURITY;

-- Anyone can read published resources
CREATE POLICY "Anyone can read published resources"
ON public.free_resources
FOR SELECT
USING (is_published = true);

-- Admins can manage resources
CREATE POLICY "Admins can manage resources"
ON public.free_resources
FOR ALL
USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));

-- Trigger for updated_at
CREATE TRIGGER update_free_resources_updated_at
BEFORE UPDATE ON public.free_resources
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
