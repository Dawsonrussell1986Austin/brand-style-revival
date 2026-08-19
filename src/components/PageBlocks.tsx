import type { PageBlock } from "@/hooks/usePageBlocks";

function Cta({ label, url }: { label?: string | null; url?: string | null }) {
  if (!label || !url) return null;
  const external = /^https?:/i.test(url);
  return (
    <a
      href={url}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-primary-foreground font-semibold transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {label}
    </a>
  );
}

function Body({ text }: { text?: string | null }) {
  if (!text) return null;
  return (
    <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
      {text.split(/\n{2,}/).map((p, i) => (
        <p key={i} className="whitespace-pre-wrap">{p}</p>
      ))}
    </div>
  );
}

export function PageBlockView({ block }: { block: PageBlock }) {
  const { block_type: type } = block;

  if (type === "hero") {
    return (
      <section className="relative overflow-hidden bg-secondary/40">
        {block.image_url && (
          <img
            src={block.image_url}
            alt={block.image_alt || ""}
            aria-hidden={block.image_alt ? undefined : true}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        )}
        {block.image_url && <div className="absolute inset-0 bg-foreground/60" aria-hidden="true" />}
        <div className={`container relative mx-auto px-4 py-20 ${block.image_url ? "text-background" : ""}`}>
          {block.heading && (
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4 max-w-3xl">{block.heading}</h2>
          )}
          {block.subheading && <p className="text-xl max-w-2xl mb-6 opacity-90">{block.subheading}</p>}
          <Body text={block.body} />
          <div className="mt-8"><Cta label={block.cta_label} url={block.cta_url} /></div>
        </div>
      </section>
    );
  }

  if (type === "image") {
    return (
      <section className="container mx-auto px-4 py-12">
        {block.heading && <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">{block.heading}</h2>}
        {block.image_url && (
          <figure>
            <img
              src={block.image_url}
              alt={block.image_alt || ""}
              className="w-full rounded-2xl shadow-sm"
              loading="lazy"
            />
            {block.subheading && (
              <figcaption className="mt-3 text-sm text-muted-foreground">{block.subheading}</figcaption>
            )}
          </figure>
        )}
        <div className="mt-6"><Body text={block.body} /></div>
      </section>
    );
  }

  if (type === "gallery") {
    return (
      <section className="container mx-auto px-4 py-12">
        {block.heading && <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">{block.heading}</h2>}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0">
          {block.items.map((it, i) => (
            <li key={i}>
              <img
                src={it.image_url}
                alt={it.title || ""}
                className="w-full h-56 object-cover rounded-xl shadow-sm"
                loading="lazy"
              />
              {it.text && <p className="mt-2 text-sm text-muted-foreground">{it.text}</p>}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  if (type === "cards") {
    return (
      <section className="container mx-auto px-4 py-12">
        {block.heading && <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">{block.heading}</h2>}
        {block.subheading && <p className="text-lg text-muted-foreground mb-8">{block.subheading}</p>}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0">
          {block.items.map((it, i) => (
            <li key={i} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              {it.image_url && (
                <img src={it.image_url} alt="" className="mb-4 h-40 w-full rounded-xl object-cover" loading="lazy" />
              )}
              {it.title && <h3 className="font-heading text-xl font-semibold mb-2">{it.title}</h3>}
              {it.text && <p className="text-muted-foreground whitespace-pre-wrap">{it.text}</p>}
              {it.link_url && it.link_label && (
                <a
                  href={it.link_url}
                  {...(/^https?:/i.test(it.link_url) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="mt-4 inline-block font-semibold text-primary underline underline-offset-4"
                >
                  {it.link_label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  if (type === "cta") {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="rounded-3xl bg-primary/10 border border-primary/20 p-10 text-center">
          {block.heading && <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">{block.heading}</h2>}
          {block.subheading && <p className="text-lg text-muted-foreground mb-6">{block.subheading}</p>}
          <Cta label={block.cta_label} url={block.cta_url} />
        </div>
      </section>
    );
  }

  // text (default)
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="max-w-3xl">
        {block.heading && <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">{block.heading}</h2>}
        {block.subheading && <p className="text-lg text-muted-foreground mb-4">{block.subheading}</p>}
        <Body text={block.body} />
        <div className="mt-6"><Cta label={block.cta_label} url={block.cta_url} /></div>
      </div>
    </section>
  );
}

export function PageBlocksRenderer({ blocks }: { blocks: PageBlock[] }) {
  return (
    <>
      {blocks.map((b) => (
        <PageBlockView key={b.id} block={b} />
      ))}
    </>
  );
}
