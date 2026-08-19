alter table public.events add column if not exists category_key text;
alter table public.events add column if not exists facilitator text;
alter table public.events add column if not exists date_label text;
alter table public.events add column if not exists display_order integer not null default 0;
create unique index if not exists events_slug_key on public.events(slug);
update public.events set is_published = false where category in ('AI & Technology','Leadership','Social-Emotional') and category_key is null;