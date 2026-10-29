# Architecture rules
- Redesign blog articles use raw HTML through RedesignPage with explicit React routes; this preserves the shared site layout and article styling.
- Uploaded article graphics use Lovable Assets JSON pointers; this keeps media out of the source repository.
- Campaign webinar pages use RedesignLayout with explicit React routes and shared session data; this preserves site navigation while keeping each registration choice testable.
- Digital tools availability uses one page-scoped clock hook and shared instant-based filtering; React anchor click handlers reuse the installed GA tag without new analytics configuration, keeping expiry and click-only tracking isolated from other pages.