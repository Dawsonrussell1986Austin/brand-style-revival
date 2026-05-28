## Goal

Make every page and functional section of the site editable from `/admin` — headings, paragraphs, list items, button labels, images, and team bios — using the existing `site_content` + `site_images` tables and `useContent` / `useImage` hooks (with hardcoded fallbacks so the site never breaks).

## Approach (per-page pattern)

For each page we:
1. Replace hardcoded strings with `useContent(page, section, key, fallback)` calls.
2. Replace hardcoded image imports with `useImage(page, section, key, fallback)` calls.
3. Register the page slug in `Admin.tsx` (`pageRoutes`, `pageLabels`) and add any new section labels to `sectionLabels`.
4. Add fallback image entries to `defaultImageMap` in `Admin.tsx` so the admin preview shows the default when no upload exists.
5. Seed `site_content` rows with sensible defaults so the admin UI lists every editable field (no need for admins to know the keys).

No schema changes — `site_content` and `site_images` already support arbitrary `page/section/key` tuples. Team bios and similar list data stay on existing tables (`free_resources`, `events`) — only static page copy moves to CMS.

## Stages (separate turns, one PR-sized batch each)

This is too large for one turn. Proposed order — I'll ship one stage per turn and check in between:

```text
Stage 1 — Recently added pages (this turn)
  • src/pages/AIReadySchools.tsx
  • src/pages/InnovativeTools.tsx
  • src/pages/ResearchEthics.tsx
  • src/pages/RegionalForums.tsx
  • Register all 4 in Admin + seed defaults

Stage 2 — Curriculum Creator + AI Center hub pages
  • src/pages/CurriculumCreator.tsx (596 lines)
  • src/pages/CenterForAIServices.tsx
  • src/pages/AICenter.tsx

Stage 3 — Core marketing pages
  • src/pages/About.tsx (incl. team bios — extend to all members)
  • src/pages/Services.tsx
  • src/pages/ARC.tsx

Stage 4 — Utility pages + home/header/footer leftovers
  • src/pages/Contact.tsx
  • src/pages/Resources.tsx
  • src/pages/Events.tsx static copy
  • src/components/Header.tsx nav labels / Footer.tsx columns
  • Home components (HeroV2, ServiceGridV2, FeaturedContentV2, TestimonialsV2) — fill gaps
```

## Stage 1 detail (what ships this turn)

- Convert AIReadySchools, InnovativeTools, ResearchEthics, RegionalForums to use `useContent` / `useImage` for hero, intro, feature cards, and CTA copy.
- Add `pageLabels` + `pageRoutes` entries: `ai-ready-schools`, `innovative-tools`, `research-ethics`, `regional-forums`.
- Seed `site_content` with the current hardcoded strings (via `supabase--insert`) so admins see every field populated and can edit in place.
- Add new section labels to `sectionLabels` (e.g. `features`, `benefits`, `process`, `outcomes`).

## Acceptance per stage

- Page renders identically to current production (fallbacks).
- Admin → page selector lists the page; editing any field updates the live page after refresh.
- Image uploads replace the default and revert cleanly on delete.

After Stage 1 ships and you confirm it works the way you expect, I'll proceed with Stage 2 in the next turn.