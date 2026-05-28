import { Helmet } from "react-helmet-async";
import { useSiteSettings } from "@/hooks/useSiteSettings";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string;
  jsonLd?: Record<string, unknown>;
}

const FALLBACK_BASE_URL = "https://www.acespdsi.org";
const FALLBACK_TITLE = "ACES PDSI - Professional Development & School Improvement";
const FALLBACK_DESCRIPTION = "ACES Professional Development & School Improvement provides innovative educational services, AI training, and resources for educators across Connecticut.";
const FALLBACK_IMAGE = `${FALLBACK_BASE_URL}/og-image.png`;
const FALLBACK_TITLE_TEMPLATE = "%s | ACES PDSI";
const FALLBACK_SITE_NAME = "ACES PDSI";

export function SEO({
  title,
  description,
  image,
  url,
  type = "website",
  keywords,
  jsonLd,
}: SEOProps) {
  const { data: settings } = useSiteSettings();
  const baseUrl = settings?.site_url || FALLBACK_BASE_URL;
  const siteName = settings?.site_name || FALLBACK_SITE_NAME;
  const titleTemplate = settings?.default_title_template || FALLBACK_TITLE_TEMPLATE;
  const defaultDescription = settings?.default_description || FALLBACK_DESCRIPTION;
  const defaultImage = settings?.default_og_image || FALLBACK_IMAGE;
  const gscToken = settings?.gsc_verification || "";
  const orgJsonLd = settings?.organization_jsonld || "";

  const resolvedDescription = description || defaultDescription;
  const resolvedImage = image || defaultImage;
  const fullTitle = title
    ? titleTemplate.replace("%s", title)
    : FALLBACK_TITLE;
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;

  let parsedOrgJsonLd: Record<string, unknown> | null = null;
  if (orgJsonLd) {
    try { parsedOrgJsonLd = JSON.parse(orgJsonLd); } catch { /* ignore */ }
  }

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={resolvedDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />
      {gscToken && <meta name="google-site-verification" content={gscToken} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={resolvedImage} />
      <meta name="twitter:site" content="@ACESPDSI" />

      {/* Organization-level structured data (site-wide) */}
      {parsedOrgJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(parsedOrgJsonLd)}
        </script>
      )}

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify({ "@context": "https://schema.org", ...jsonLd })}
        </script>
      )}
    </Helmet>
  );
}
