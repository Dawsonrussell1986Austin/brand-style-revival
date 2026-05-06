import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { usePageBySlug } from "@/hooks/usePages";
import { usePageContent, usePageImages } from "@/hooks/useSiteContent";
import NotFound from "./NotFound";

export default function DynamicPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: page, isLoading } = usePageBySlug(slug);
  const { data: contentItems } = usePageContent(slug || "");
  const { data: imageItems } = usePageImages(slug || "");

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!page) return <NotFound />;

  // Group content + images by section
  const sections = new Map<string, { content: typeof contentItems; images: typeof imageItems }>();
  (contentItems || []).forEach((c) => {
    if (!sections.has(c.section)) sections.set(c.section, { content: [], images: [] });
    sections.get(c.section)!.content!.push(c);
  });
  (imageItems || []).forEach((i) => {
    if (!sections.has(i.section)) sections.set(i.section, { content: [], images: [] });
    sections.get(i.section)!.images!.push(i);
  });

  const findKey = (items: typeof contentItems, key: string) =>
    items?.find((i) => i.content_key === key)?.content_value;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title={page.title}
        description={page.meta_description || undefined}
        url={`/${page.slug}`}
      />
      <Header />
      <main className="flex-1 pt-24">
        {/* Page title */}
        <section className="container mx-auto px-4 py-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            {page.title}
          </h1>
          {page.meta_description && (
            <p className="text-lg text-muted-foreground max-w-3xl">
              {page.meta_description}
            </p>
          )}
        </section>

        {/* Sections */}
        {Array.from(sections.entries()).map(([sectionKey, { content, images }]) => {
          const heading =
            findKey(content, "heading") ||
            findKey(content, "title") ||
            sectionKey.replace(/_/g, " ");
          const subtitle = findKey(content, "subtitle");
          const body = findKey(content, "body") || findKey(content, "description");
          const otherContent = (content || []).filter(
            (c) => !["heading", "title", "subtitle", "body", "description"].includes(c.content_key)
          );

          return (
            <section key={sectionKey} className="container mx-auto px-4 py-10 border-t border-border">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3 capitalize">
                {heading}
              </h2>
              {subtitle && (
                <p className="text-lg text-muted-foreground mb-4">{subtitle}</p>
              )}
              {body && (
                <div className="prose max-w-none text-foreground whitespace-pre-wrap mb-6">
                  {body}
                </div>
              )}

              {(images || []).length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {images!.map((img) => (
                    <img
                      key={img.id}
                      src={img.image_url}
                      alt={img.alt_text || ""}
                      className="w-full h-auto rounded-lg shadow-sm"
                    />
                  ))}
                </div>
              )}

              {otherContent.length > 0 && (
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {otherContent.map((c) => (
                    <div key={c.id} className="bg-secondary/50 rounded-lg p-4">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                        {c.content_key.replace(/_/g, " ")}
                      </dt>
                      <dd className="text-foreground whitespace-pre-wrap">{c.content_value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </section>
          );
        })}
      </main>
      <Footer />
    </div>
  );
}