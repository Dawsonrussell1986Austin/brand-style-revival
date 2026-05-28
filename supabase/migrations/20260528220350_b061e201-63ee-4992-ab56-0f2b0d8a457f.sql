CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  value text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid
);

GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site settings"
  ON public.site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can manage site settings"
  ON public.site_settings FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

CREATE TRIGGER set_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed defaults
INSERT INTO public.site_settings (key, value) VALUES
  ('llms_txt', E'# ACES PDSI\n\n> Professional Development Services & Innovation — supporting Connecticut educators with research-based learning, AI integration, and restorative practices.\n\n## About\n- Site: https://www.acespdsi.org\n- Contact: pdsi@aces.org\n\n## Key Pages\n- /about — Mission, team, and approach\n- /services — Professional learning catalog\n- /events — Workshops, certifications, and convenings\n- /ai-center — Center for AI Services\n- /curriculum-creator — AI-powered curriculum tool\n- /contact — Talk with our team\n'),
  ('robots_txt', E'User-agent: *\nAllow: /\n\nSitemap: https://www.acespdsi.org/sitemap.xml\n'),
  ('default_og_image', ''),
  ('default_title_template', '%s | ACES PDSI'),
  ('site_name', 'ACES PDSI'),
  ('site_url', 'https://www.acespdsi.org'),
  ('gsc_verification', ''),
  ('organization_jsonld', E'{\n  "@context": "https://schema.org",\n  "@type": "EducationalOrganization",\n  "name": "ACES PDSI",\n  "url": "https://www.acespdsi.org",\n  "logo": "https://www.acespdsi.org/aces-logo.webp",\n  "sameAs": [\n    "https://www.facebook.com/ACESPDSI",\n    "https://www.instagram.com/acespdsi",\n    "https://www.linkedin.com/company/aces-pdsi"\n  ]\n}')
ON CONFLICT (key) DO NOTHING;