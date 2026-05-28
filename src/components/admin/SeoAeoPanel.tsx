import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Save, Globe, FileText, Bot, RefreshCw, Copy } from "lucide-react";
import {
  useSiteSettings,
  useUpdateSiteSetting,
} from "@/hooks/useSiteSettings";
import {
  useAllContent,
  useUpdateContent,
} from "@/hooks/useSiteContent";

const GLOBAL_FIELDS: {
  key: string;
  label: string;
  help?: string;
  multiline?: boolean;
  mono?: boolean;
  rows?: number;
  placeholder?: string;
}[] = [
  { key: "site_name", label: "Site name", help: "Used in Open Graph og:site_name." },
  { key: "site_url", label: "Site URL", help: "Canonical base URL, e.g. https://www.acespdsi.org" },
  { key: "default_title_template", label: "Default title template", help: "Use %s as the page title placeholder. Example: %s | ACES PDSI" },
  { key: "default_description", label: "Default meta description", multiline: true, rows: 3, placeholder: "Fallback description used when a page does not set its own." },
  { key: "default_og_image", label: "Default Open Graph image URL", help: "Used when a page does not set its own og:image. Must be absolute URL." },
  { key: "gsc_verification", label: "Google Search Console verification token", help: "The content value from the google-site-verification meta tag." },
  { key: "organization_jsonld", label: "Organization JSON-LD (site-wide)", multiline: true, mono: true, rows: 12 },
];

const AEO_FIELDS: { key: string; label: string; rows: number; help: string }[] = [
  {
    key: "llms_txt",
    label: "llms.txt (AI crawler guidance)",
    rows: 14,
    help: "Plain-text file served at /llms.txt to help AI assistants understand your site. Edit content here, then download and place in /public/llms.txt to publish.",
  },
  {
    key: "robots_txt",
    label: "robots.txt",
    rows: 10,
    help: "Edit content here, then download and place in /public/robots.txt to publish.",
  },
];

const PER_PAGE_KEYS = [
  { key: "title", label: "Title tag" },
  { key: "description", label: "Meta description", multiline: true },
  { key: "canonical", label: "Canonical URL (path, e.g. /about)" },
  { key: "og_image", label: "Open Graph image URL" },
  { key: "robots", label: "Robots directive (e.g. index,follow)" },
  { key: "jsonld_type", label: "JSON-LD primary type (Article, Service, FAQPage, Breadcrumb)" },
];

const PAGE_LIST = [
  "home",
  "about",
  "services",
  "events",
  "resources",
  "ai-center",
  "arc",
  "curriculum-creator",
  "center-for-ai-services",
  "contact",
  "ai-ready-schools",
  "innovative-tools",
  "research-ethics",
  "regional-forums",
];

export function SeoAeoPanel() {
  const { data: settings, isLoading } = useSiteSettings();
  const updateSetting = useUpdateSiteSetting();
  const { data: allContent } = useAllContent();
  const updateContent = useUpdateContent();

  const [draft, setDraft] = useState<Record<string, string>>({});
  const [selectedPage, setSelectedPage] = useState<string>("home");
  const [pageDraft, setPageDraft] = useState<Record<string, string>>({});
  const [savingKey, setSavingKey] = useState<string | null>(null);

  useEffect(() => {
    if (settings) setDraft({ ...settings });
  }, [settings]);

  useEffect(() => {
    if (!allContent) return;
    const next: Record<string, string> = {};
    for (const k of PER_PAGE_KEYS) {
      const row = allContent.find(
        (c) => c.page === selectedPage && c.section === "seo" && c.content_key === k.key
      );
      next[k.key] = row?.content_value || "";
    }
    setPageDraft(next);
  }, [allContent, selectedPage]);

  // Auto-generated sitemap preview
  const { data: events } = useQuery({
    queryKey: ["seo-sitemap-events"],
    queryFn: async () => {
      const { data } = await supabase
        .from("events")
        .select("slug, updated_at")
        .eq("is_published", true);
      return data || [];
    },
  });

  const baseUrl = draft.site_url || "https://www.acespdsi.org";
  const sitemap = generateSitemap(
    baseUrl,
    PAGE_LIST,
    (events || []).map((e: any) => ({ slug: e.slug, updated_at: e.updated_at }))
  );

  const handleSaveGlobal = async (key: string) => {
    try {
      setSavingKey(key);
      await updateSetting.mutateAsync({ key, value: draft[key] ?? "" });
      toast.success("Saved");
    } catch (err: any) {
      toast.error(err.message || "Failed to save");
    } finally {
      setSavingKey(null);
    }
  };

  const handleSavePageField = async (fieldKey: string) => {
    try {
      setSavingKey(`page-${fieldKey}`);
      await updateContent.mutateAsync({
        page: selectedPage,
        section: "seo",
        key: fieldKey,
        value: pageDraft[fieldKey] ?? "",
      });
      toast.success("Saved");
    } catch (err: any) {
      toast.error(err.message || "Failed to save");
    } finally {
      setSavingKey(null);
    }
  };

  const downloadText = (filename: string, content: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied");
    } catch {
      toast.error("Copy failed");
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50">
        <RefreshCw className="w-6 h-6 text-slate-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            SEO &amp; AEO
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage site-wide search optimization, AI-engine optimization files, and per-page metadata.
          </p>
        </header>

        {/* Site-wide settings */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <div>
            <h3 className="font-semibold text-slate-900">Site-wide SEO</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Defaults applied across every page when a per-page value is not set.
            </p>
          </div>
          <div className="space-y-4">
            {GLOBAL_FIELDS.map((field) => (
              <div key={field.key} className="space-y-1">
                <Label className="text-xs font-semibold text-slate-600">
                  {field.label}
                </Label>
                {field.multiline ? (
                  <Textarea
                    rows={field.rows || 4}
                    value={draft[field.key] || ""}
                    onChange={(e) =>
                      setDraft((p) => ({ ...p, [field.key]: e.target.value }))
                    }
                    placeholder={field.placeholder}
                    className={field.mono ? "font-mono text-xs" : ""}
                  />
                ) : (
                  <Input
                    className="h-9"
                    value={draft[field.key] || ""}
                    onChange={(e) =>
                      setDraft((p) => ({ ...p, [field.key]: e.target.value }))
                    }
                    placeholder={field.placeholder}
                  />
                )}
                {field.help && (
                  <p className="text-[11px] text-slate-400">{field.help}</p>
                )}
                <div className="pt-1">
                  <Button
                    size="sm"
                    onClick={() => handleSaveGlobal(field.key)}
                    disabled={savingKey === field.key}
                    className="h-7 bg-blue-600 hover:bg-blue-700 text-white text-xs"
                  >
                    {savingKey === field.key ? (
                      <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                    ) : (
                      <Save className="w-3 h-3 mr-1" />
                    )}
                    Save
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AEO files */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <div>
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <Bot className="w-4 h-4 text-emerald-600" />
              AEO &amp; crawler files
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Edit content here, then download and replace the matching file in your <code className="text-[11px] bg-slate-100 px-1 rounded">public/</code> folder to publish.
            </p>
          </div>
          {AEO_FIELDS.map((field) => (
            <div key={field.key} className="space-y-2">
              <Label className="text-xs font-semibold text-slate-600">
                {field.label}
              </Label>
              <Textarea
                rows={field.rows}
                value={draft[field.key] || ""}
                onChange={(e) =>
                  setDraft((p) => ({ ...p, [field.key]: e.target.value }))
                }
                className="font-mono text-xs"
              />
              <p className="text-[11px] text-slate-400">{field.help}</p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleSaveGlobal(field.key)}
                  disabled={savingKey === field.key}
                  className="h-7 bg-blue-600 hover:bg-blue-700 text-white text-xs"
                >
                  {savingKey === field.key ? (
                    <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                  ) : (
                    <Save className="w-3 h-3 mr-1" />
                  )}
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    downloadText(
                      field.key === "llms_txt" ? "llms.txt" : "robots.txt",
                      draft[field.key] || ""
                    )
                  }
                  className="h-7 text-xs"
                >
                  Download
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(draft[field.key] || "")}
                  className="h-7 text-xs"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
              </div>
            </div>
          ))}

          {/* Auto-generated sitemap */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <Label className="text-xs font-semibold text-slate-600">
              sitemap.xml (auto-generated)
            </Label>
            <p className="text-[11px] text-slate-400">
              Generated from your registered pages and published events. Download and place in <code className="text-[11px] bg-slate-100 px-1 rounded">public/sitemap.xml</code>.
            </p>
            <Textarea
              rows={10}
              value={sitemap}
              readOnly
              className="font-mono text-xs bg-slate-50"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => downloadText("sitemap.xml", sitemap)}
                className="h-7 text-xs"
              >
                Download
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(sitemap)}
                className="h-7 text-xs"
              >
                <Copy className="w-3 h-3 mr-1" />
                Copy
              </Button>
            </div>
          </div>
        </section>

        {/* Per-page SEO */}
        <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                Per-page SEO
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Overrides for individual pages. Empty fields fall back to site-wide defaults.
              </p>
            </div>
            <select
              value={selectedPage}
              onChange={(e) => setSelectedPage(e.target.value)}
              className="h-9 px-3 rounded-md border border-slate-200 text-sm bg-white"
            >
              {PAGE_LIST.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-4">
            {PER_PAGE_KEYS.map((field) => (
              <div key={field.key} className="space-y-1">
                <Label className="text-xs font-semibold text-slate-600">
                  {field.label}
                </Label>
                {field.multiline ? (
                  <Textarea
                    rows={3}
                    value={pageDraft[field.key] || ""}
                    onChange={(e) =>
                      setPageDraft((p) => ({ ...p, [field.key]: e.target.value }))
                    }
                  />
                ) : (
                  <Input
                    className="h-9"
                    value={pageDraft[field.key] || ""}
                    onChange={(e) =>
                      setPageDraft((p) => ({ ...p, [field.key]: e.target.value }))
                    }
                  />
                )}
                <div className="pt-1">
                  <Button
                    size="sm"
                    onClick={() => handleSavePageField(field.key)}
                    disabled={savingKey === `page-${field.key}`}
                    className="h-7 bg-blue-600 hover:bg-blue-700 text-white text-xs"
                  >
                    {savingKey === `page-${field.key}` ? (
                      <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                    ) : (
                      <Save className="w-3 h-3 mr-1" />
                    )}
                    Save
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function generateSitemap(
  baseUrl: string,
  pages: string[],
  events: { slug: string; updated_at?: string }[]
) {
  const today = new Date().toISOString().split("T")[0];
  const urls: string[] = [];
  // Root
  urls.push(
    `  <url>\n    <loc>${baseUrl}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>`
  );
  for (const page of pages) {
    if (page === "home") continue;
    urls.push(
      `  <url>\n    <loc>${baseUrl}/${page}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`
    );
  }
  for (const ev of events) {
    const lm = (ev.updated_at || today).split("T")[0];
    urls.push(
      `  <url>\n    <loc>${baseUrl}/events/${ev.slug}</loc>\n    <lastmod>${lm}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`
    );
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
}