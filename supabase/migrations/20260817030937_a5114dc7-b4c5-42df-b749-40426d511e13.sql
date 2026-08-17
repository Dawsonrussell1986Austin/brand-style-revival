
INSERT INTO public.site_settings (key, value) VALUES
('default_description', 'ACES Professional Development & School Improvement partners with Connecticut districts on educator professional learning, school improvement, restorative practices, and responsible AI integration.'),
('default_og_image', 'https://www.acespdsi.org/og-image.png')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value WHERE public.site_settings.value IS NULL OR public.site_settings.value = '';

CREATE TEMP TABLE seo_seed (page text, content_key text, content_value text);

INSERT INTO seo_seed VALUES
('home','title','Professional Development for Connecticut Educators'),
('home','description','ACES PDSI supports Connecticut schools with educator professional learning, school improvement, restorative practices, and human-centered AI integration.'),
('home','canonical','/'),
('home','og_image','https://www.acespdsi.org/redesign-assets/hero-educators.png'),
('home','robots','index,follow'),
('home','jsonld_type','WebSite'),

('about','title','About ACES PDSI'),
('about','description','Meet the ACES PDSI team of professional learning specialists and learn how we partner with Connecticut districts on school improvement.'),
('about','canonical','/about'),
('about','og_image','https://www.acespdsi.org/redesign-assets/hero-educators.png'),
('about','robots','index,follow'),
('about','jsonld_type','AboutPage'),

('services','title','PDSI Services for Schools & Districts'),
('services','description','Professional learning, coaching, leadership support, and school improvement services designed with and for Connecticut educators.'),
('services','canonical','/pdsi-services'),
('services','og_image','https://www.acespdsi.org/redesign-assets/hero-educators.png'),
('services','robots','index,follow'),
('services','jsonld_type','Service'),

('events','title','Workshops & Events'),
('events','description','Browse upcoming ACES PDSI workshops, institutes, and events for Connecticut educators, with registration details for every session.'),
('events','canonical','/workshops-events'),
('events','og_image','https://www.acespdsi.org/redesign-assets/events-hero.jpg'),
('events','robots','index,follow'),
('events','jsonld_type','ItemList'),

('resources','title','Educational Resources & Free Tools'),
('resources','description','Download free guides, templates, and tools from ACES PDSI on instruction, assessment, restorative practices, and classroom AI use.'),
('resources','canonical','/resources'),
('resources','og_image','https://www.acespdsi.org/og-image.png'),
('resources','robots','index,follow'),
('resources','jsonld_type','CollectionPage'),

('ai-center','title','Center for Artificial Intelligence'),
('ai-center','description','The ACES Center for AI Services helps Connecticut schools adopt AI with clear policy, educator readiness, and human-centered practice.'),
('ai-center','canonical','/center-for-ai-services'),
('ai-center','og_image','https://www.acespdsi.org/redesign-assets/aicenter-hero.png'),
('ai-center','robots','index,follow'),
('ai-center','jsonld_type','Service'),

('center-for-ai-services','title','Center for Artificial Intelligence'),
('center-for-ai-services','description','The ACES Center for AI Services helps Connecticut schools adopt AI with clear policy, educator readiness, and human-centered practice.'),
('center-for-ai-services','canonical','/center-for-ai-services'),
('center-for-ai-services','og_image','https://www.acespdsi.org/redesign-assets/aicenter-hero.png'),
('center-for-ai-services','robots','index,follow'),
('center-for-ai-services','jsonld_type','Service'),

('arc','title','ARC: Aspiring Regional Coaches'),
('arc','description','ARC is the ACES PDSI coaching program that prepares educators to lead instructional improvement in their own schools and districts.'),
('arc','canonical','/arc'),
('arc','og_image','https://www.acespdsi.org/og-image.png'),
('arc','robots','index,follow'),
('arc','jsonld_type','Service'),

('curriculum-creator','title','AI Curriculum Creator for Educators'),
('curriculum-creator','description','Build standards-aligned units and lessons faster with the ACES Curriculum Creator, an AI-assisted tool designed with Connecticut educators.'),
('curriculum-creator','canonical','/curriculum-creator'),
('curriculum-creator','og_image','https://www.acespdsi.org/redesign-assets/curriculum-creator.png'),
('curriculum-creator','robots','index,follow'),
('curriculum-creator','jsonld_type','Service'),

('contact','title','Contact ACES PDSI'),
('contact','description','Talk with the ACES PDSI team about professional learning, school improvement, or AI support for your school or district.'),
('contact','canonical','/contact'),
('contact','og_image','https://www.acespdsi.org/redesign-assets/contact-hero.png'),
('contact','robots','index,follow'),
('contact','jsonld_type','ContactPage'),

('ai-ready-schools','title','AI-Ready Schools'),
('ai-ready-schools','description','Build the policy, professional learning, and leadership strategy that prepare schools and districts to use AI responsibly.'),
('ai-ready-schools','canonical','/center-for-ai-services/ai-ready-schools'),
('ai-ready-schools','og_image','https://www.acespdsi.org/redesign-assets/ai-literacy-hero.jpeg'),
('ai-ready-schools','robots','index,follow'),
('ai-ready-schools','jsonld_type','Service'),

('innovative-tools','title','Innovative AI Tools for Educators'),
('innovative-tools','description','Custom AI tools, prompt libraries, and workflow templates built for educators and school teams.'),
('innovative-tools','canonical','/center-for-ai-services/innovative-tools'),
('innovative-tools','og_image','https://www.acespdsi.org/redesign-assets/ai-innovation-hero.jpeg'),
('innovative-tools','robots','index,follow'),
('innovative-tools','jsonld_type','Service'),

('research-ethics','title','AI Research & Ethics in Education'),
('research-ethics','description','Frameworks, research, and ethical guidance to help schools use AI responsibly and keep people at the center.'),
('research-ethics','canonical','/center-for-ai-services/research-ethics'),
('research-ethics','og_image','https://www.acespdsi.org/redesign-assets/ai-research-hero.png'),
('research-ethics','robots','index,follow'),
('research-ethics','jsonld_type','Service'),

('regional-forums','title','Regional Forums for School Leaders'),
('regional-forums','description','Collaborative forums where Connecticut district and school leaders work on shared problems of practice and bring practical tools back to their teams.'),
('regional-forums','canonical','/pdsi-services/regional-forums'),
('regional-forums','og_image','https://www.acespdsi.org/og-image.png'),
('regional-forums','robots','index,follow'),
('regional-forums','jsonld_type','Service'),

('ai-conference-2026','title','ACES AI Conference 2026'),
('ai-conference-2026','description','Join Connecticut educators and leaders on September 25, 2026 in Bristol, CT for keynotes, breakout sessions, and an Innovation Lab on human-centered AI.'),
('ai-conference-2026','canonical','/ai-conference-2026'),
('ai-conference-2026','og_image','https://www.acespdsi.org/redesign-assets/og-ai-conference.jpg'),
('ai-conference-2026','robots','index,follow'),
('ai-conference-2026','jsonld_type','Event');

DELETE FROM public.site_content sc
USING seo_seed s
WHERE sc.section = 'seo' AND sc.page = s.page AND sc.content_key = s.content_key;

INSERT INTO public.site_content (page, section, content_key, content_value, content_type)
SELECT page, 'seo', content_key, content_value, 'text' FROM seo_seed;

DROP TABLE seo_seed;
