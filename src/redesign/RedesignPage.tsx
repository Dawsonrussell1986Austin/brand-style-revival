import { useEffect } from "react";
import { RedesignLayout } from "./RedesignLayout";
import { SEO } from "@/components/SEO";

type Props = {
  html: string;
  pageInit?: () => void;
  title?: string;
  description?: string;
  url?: string;
};

// Strip the full-document scaffolding and duplicate header/footer from raw
// HTML page exports so only the body content renders inside <RedesignLayout>.
function sanitize(raw: string): string {
  let out = raw;
  // Preserve any <style> blocks from <head> — pages ship page-specific CSS there.
  const headStyles: string[] = [];
  const headMatch = out.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  if (headMatch) {
    const styleRe = /<style[^>]*>[\s\S]*?<\/style>/gi;
    let m: RegExpExecArray | null;
    while ((m = styleRe.exec(headMatch[1])) !== null) headStyles.push(m[0]);
  }
  // Drop everything outside <body>...</body> if present
  const bodyMatch = out.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) out = bodyMatch[1];
  // Remove any embedded <header>...</header> and <footer>...</footer> blocks
  out = out.replace(/<header[\s\S]*?<\/header>/gi, "");
  out = out.replace(/<footer[\s\S]*?<\/footer>/gi, "");
  // Remove doctype / html / head remnants just in case
  out = out.replace(/<!DOCTYPE[^>]*>/gi, "");
  out = out.replace(/<\/?(html|head|body)[^>]*>/gi, "");
  // Remove <template> blocks (bundler thumbnails etc.)
  out = out.replace(/<template[\s\S]*?<\/template>/gi, "");
  // Reinject preserved head <style> blocks at the top of the body content.
  return headStyles.join("\n") + out;
}

export function RedesignPage({ html, pageInit, title, description, url }: Props) {
  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0); }, [html]);
  const cleaned = sanitize(html);
  return (
    <>
      {(title || description) && (
        <SEO title={title} description={description} url={url} />
      )}
      <RedesignLayout pageInit={pageInit}>
        <div dangerouslySetInnerHTML={{ __html: cleaned }} />
      </RedesignLayout>
    </>
  );
}