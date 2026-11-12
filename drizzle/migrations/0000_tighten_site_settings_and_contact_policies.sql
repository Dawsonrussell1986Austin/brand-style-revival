DROP POLICY IF EXISTS "Anyone can read site settings" ON public.site_settings;
CREATE POLICY "Anyone can read public site settings" ON public.site_settings
FOR SELECT TO anon, authenticated
USING (key IN ('default_description','default_og_image','default_title_template','gsc_verification','llms_txt','organization_jsonld','robots_txt','site_name','site_url'));

DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;
CREATE POLICY "Anyone can submit valid contact form" ON public.contact_submissions
FOR INSERT TO anon, authenticated
WITH CHECK (
  length(btrim(name)) BETWEEN 1 AND 200
  AND length(email) BETWEEN 3 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(message) BETWEEN 1 AND 10000
  AND (phone IS NULL OR length(phone) <= 50)
  AND (organization IS NULL OR length(organization) <= 300)
  AND (role IS NULL OR length(role) <= 200)
  AND (source IS NULL OR length(source) <= 100)
);