import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

const SITE_URL = "https://www.acespdsi.org";

/**
 * Routes that need real (crawler-visible) meta tags in the static HTML,
 * since link scrapers (LinkedIn, Facebook, Slack) don't run JS.
 */
const PRERENDER_ROUTES = [
  {
    path: "ai-conference-2026",
    title: "ACES AI Conference 2026 | Register Today",
    description:
      "Join CT educators and leaders Sept 25, 2026 in Bristol, CT for the ACES AI Conference: keynotes, breakouts, and an Innovation Lab. Register today.",
    image: `${SITE_URL}/redesign-assets/og-ai-conference.jpg`,
  },
];

function metaPrerender() {
  return {
    name: "aces-meta-prerender",
    apply: "build" as const,
    closeBundle() {
      const outDir = path.resolve(__dirname, "dist");
      const indexPath = path.join(outDir, "index.html");
      if (!fs.existsSync(indexPath)) return;
      const base = fs.readFileSync(indexPath, "utf8");
      for (const r of PRERENDER_ROUTES) {
        const url = `${SITE_URL}/${r.path}`;
        const html = base
          .replace(/<title>[\s\S]*?<\/title>/i, `<title>${r.title}</title>`)
          .replace(
            /<meta name="title" content="[^"]*" \/>/i,
            `<meta name="title" content="${r.title}" />`
          )
          .replace(
            /<meta name="description" content="[^"]*" \/>/i,
            `<meta name="description" content="${r.description}" />`
          )
          .replace(
            /<link rel="canonical" href="[^"]*" \/>/i,
            `<link rel="canonical" href="${url}" />`
          )
          .replace(
            /<meta property="og:url" content="[^"]*" \/>/i,
            `<meta property="og:url" content="${url}" />`
          )
          .replace(
            /<meta property="og:title" content="[^"]*" \/>/i,
            `<meta property="og:title" content="${r.title}" />`
          )
          .replace(
            /<meta property="og:description" content="[^"]*" \/>/i,
            `<meta property="og:description" content="${r.description}" />`
          )
          .replace(
            /<meta property="og:image" content="[^"]*" \/>/i,
            `<meta property="og:image" content="${r.image}" />`
          )
          .replace(
            /<meta name="twitter:url" content="[^"]*" \/>/i,
            `<meta name="twitter:url" content="${url}" />`
          )
          .replace(
            /<meta name="twitter:title" content="[^"]*" \/>/i,
            `<meta name="twitter:title" content="${r.title}" />`
          )
          .replace(
            /<meta name="twitter:description" content="[^"]*" \/>/i,
            `<meta name="twitter:description" content="${r.description}" />`
          )
          .replace(
            /<meta name="twitter:image" content="[^"]*" \/>/i,
            `<meta name="twitter:image" content="${r.image}" />`
          );
        // Emit both `/<route>.html` and `/<route>/index.html` so the file is
        // found regardless of how the host resolves extensionless paths.
        fs.writeFileSync(path.join(outDir, `${r.path}.html`), html);
        fs.mkdirSync(path.join(outDir, r.path), { recursive: true });
        fs.writeFileSync(path.join(outDir, r.path, "index.html"), html);
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger(), metaPrerender()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
