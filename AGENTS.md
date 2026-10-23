# Architecture rules
- Redesign blog articles use raw HTML through RedesignPage with explicit React routes; this preserves the shared site layout and article styling.
- Uploaded article graphics use Lovable Assets JSON pointers; this keeps media out of the source repository.
- Campaign webinar pages use RedesignLayout with explicit React routes and shared session data; this preserves site navigation while keeping each registration choice testable.