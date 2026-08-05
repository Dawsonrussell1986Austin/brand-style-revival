-- Scope admin policies to authenticated role so helper functions are never evaluated for anon
DROP POLICY IF EXISTS "Admins can manage pages" ON public.pages;
CREATE POLICY "Admins can manage pages" ON public.pages FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can manage resources" ON public.free_resources;
CREATE POLICY "Admins can manage resources" ON public.free_resources FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can manage events" ON public.events;
CREATE POLICY "Admins can manage events" ON public.events FOR ALL TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can view contact submissions" ON public.contact_submissions;
CREATE POLICY "Admins can view contact submissions" ON public.contact_submissions FOR SELECT TO authenticated
  USING (public.is_admin(auth.uid()));

-- Public read policies restated with explicit roles
DROP POLICY IF EXISTS "Anyone can read published pages" ON public.pages;
CREATE POLICY "Anyone can read published pages" ON public.pages FOR SELECT TO anon, authenticated
  USING (is_published = true);

DROP POLICY IF EXISTS "Anyone can read published resources" ON public.free_resources;
CREATE POLICY "Anyone can read published resources" ON public.free_resources FOR SELECT TO anon, authenticated
  USING (is_published = true);

DROP POLICY IF EXISTS "Anyone can read published events" ON public.events;
CREATE POLICY "Anyone can read published events" ON public.events FOR SELECT TO anon, authenticated
  USING (is_published = true);

DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;
CREATE POLICY "Anyone can submit contact form" ON public.contact_submissions FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Revoke direct execution of SECURITY DEFINER helpers from unauthenticated callers
REVOKE ALL ON FUNCTION public.is_admin(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

-- Trigger-only helper: no client should call it directly
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;