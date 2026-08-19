CREATE TABLE public.page_blocks (
  id uuid primary key default gen_random_uuid(),
  page_slug text not null,
  block_type text not null default 'text',
  display_order integer not null default 0,
  is_published boolean not null default true,
  heading text default '',
  subheading text default '',
  body text default '',
  image_url text default '',
  image_alt text default '',
  cta_label text default '',
  cta_url text default '',
  items jsonb not null default '[]'::jsonb,
  settings jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

GRANT SELECT ON public.page_blocks TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.page_blocks TO authenticated;
GRANT ALL ON public.page_blocks TO service_role;

ALTER TABLE public.page_blocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published blocks" ON public.page_blocks
FOR SELECT TO anon, authenticated USING (is_published = true);

CREATE POLICY "Admins can manage page blocks" ON public.page_blocks
FOR ALL TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

CREATE INDEX page_blocks_slug_order_idx ON public.page_blocks (page_slug, display_order);

CREATE TRIGGER update_page_blocks_updated_at BEFORE UPDATE ON public.page_blocks
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();