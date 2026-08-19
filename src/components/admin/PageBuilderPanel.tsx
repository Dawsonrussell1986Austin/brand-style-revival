import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  ArrowDown, ArrowUp, Copy, Eye, EyeOff, Image as ImageIcon, LayoutGrid,
  Megaphone, Plus, RefreshCw, Save, Trash2, Type, X, Images,
} from "lucide-react";
import type { CardItem, PageBlock } from "@/hooks/usePageBlocks";

const BLOCK_TYPES = [
  { key: "hero", label: "Hero banner", icon: ImageIcon, hint: "Big headline with optional background photo" },
  { key: "text", label: "Text section", icon: Type, hint: "Heading and paragraphs" },
  { key: "image", label: "Single image", icon: ImageIcon, hint: "Full-width photo with caption" },
  { key: "cards", label: "Card grid", icon: LayoutGrid, hint: "Repeating cards with title, text, link" },
  { key: "gallery", label: "Photo gallery", icon: Images, hint: "Grid of photos" },
  { key: "cta", label: "Call to action", icon: Megaphone, hint: "Highlighted band with a button" },
] as const;

const blank = (slug: string, type: string, order: number) => ({
  page_slug: slug,
  block_type: type,
  display_order: order,
  is_published: true,
  heading: "",
  subheading: "",
  body: "",
  image_url: "",
  image_alt: "",
  cta_label: "",
  cta_url: "",
  items: [] as CardItem[],
  settings: {},
});

export function PageBuilderPanel({ slug, title, onClose }: { slug: string; title: string; onClose: () => void }) {
  const qc = useQueryClient();
  const [saving, setSaving] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, Partial<PageBlock>>>({});

  const { data: blocks = [], isLoading, refetch } = useQuery({
    queryKey: ["admin-page-blocks", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_blocks").select("*").eq("page_slug", slug)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return (data || []).map((b: any) => ({ ...b, items: Array.isArray(b.items) ? b.items : [], settings: b.settings || {} })) as PageBlock[];
    },
  });

  const invalidate = () => {
    refetch();
    qc.invalidateQueries({ queryKey: ["page-blocks", slug] });
  };

  const value = (b: PageBlock, key: keyof PageBlock) => {
    const d = drafts[b.id];
    return (d && key in d ? (d as any)[key] : (b as any)[key]) ?? "";
  };
  const setField = (id: string, key: string, val: any) =>
    setDrafts((d) => ({ ...d, [id]: { ...d[id], [key]: val } }));

  const addBlock = async (type: string) => {
    const { error } = await supabase.from("page_blocks").insert(blank(slug, type, blocks.length + 1) as any);
    if (error) return toast.error(error.message);
    toast.success("Section added");
    invalidate();
  };

  const saveBlock = async (b: PageBlock) => {
    const patch = drafts[b.id];
    if (!patch) return;
    setSaving(b.id);
    const { error } = await supabase.from("page_blocks").update(patch as any).eq("id", b.id);
    setSaving(null);
    if (error) return toast.error(error.message);
    setDrafts((d) => { const n = { ...d }; delete n[b.id]; return n; });
    toast.success("Section saved");
    invalidate();
  };

  const quickUpdate = async (id: string, patch: Record<string, any>) => {
    const { error } = await supabase.from("page_blocks").update(patch).eq("id", id);
    if (error) return toast.error(error.message);
    invalidate();
  };

  const move = async (index: number, dir: -1 | 1) => {
    const a = blocks[index], b = blocks[index + dir];
    if (!a || !b) return;
    await supabase.from("page_blocks").update({ display_order: b.display_order }).eq("id", a.id);
    await supabase.from("page_blocks").update({ display_order: a.display_order }).eq("id", b.id);
    invalidate();
  };

  const duplicate = async (b: PageBlock) => {
    const { id, created_at, updated_at, ...rest } = b as any;
    const { error } = await supabase.from("page_blocks").insert({ ...rest, display_order: b.display_order + 1, heading: `${b.heading || ""}` });
    if (error) return toast.error(error.message);
    invalidate();
  };

  const remove = async (b: PageBlock) => {
    if (!confirm("Delete this section? This cannot be undone.")) return;
    const { error } = await supabase.from("page_blocks").delete().eq("id", b.id);
    if (error) return toast.error(error.message);
    invalidate();
  };

  const items = (b: PageBlock): CardItem[] => (value(b, "items") as CardItem[]) || [];
  const setItems = (b: PageBlock, next: CardItem[]) => setField(b.id, "items", next);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Layout Builder — {title}</h2>
          <p className="text-sm text-slate-500">Build /{slug} from stackable sections. Changes go live on save.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8" onClick={() => window.open(`/${slug}`, "_blank")}>
            <Eye className="w-3.5 h-3.5 mr-1" /> Preview
          </Button>
          <Button variant="outline" size="sm" className="h-8" onClick={onClose}>
            <X className="w-3.5 h-3.5 mr-1" /> Close
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">Add a section</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {BLOCK_TYPES.map((t) => (
            <button
              key={t.key}
              onClick={() => addBlock(t.key)}
              className="flex items-start gap-2 rounded-lg border border-slate-200 p-3 text-left hover:border-blue-400 hover:bg-blue-50/50 transition-colors"
            >
              <t.icon className="w-4 h-4 mt-0.5 text-blue-600 shrink-0" />
              <span>
                <span className="block text-sm font-semibold text-slate-800">{t.label}</span>
                <span className="block text-[11px] text-slate-500">{t.hint}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16"><RefreshCw className="w-6 h-6 animate-spin text-slate-400" /></div>
      ) : blocks.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <LayoutGrid className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="font-medium text-slate-500">No sections yet</p>
          <p className="text-sm text-slate-400">Add a hero, text, cards, or image section above.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {blocks.map((b, i) => {
            const meta = BLOCK_TYPES.find((t) => t.key === b.block_type) || BLOCK_TYPES[1];
            const dirty = !!drafts[b.id];
            const isCards = b.block_type === "cards" || b.block_type === "gallery";
            return (
              <div key={b.id} className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <meta.icon className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-slate-900">{meta.label}</span>
                    <span className="text-xs text-slate-400">#{i + 1}</span>
                    {!b.is_published && <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">Hidden</span>}
                    {dirty && <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Unsaved</span>}
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => move(i, -1)} disabled={i === 0} className="p-1.5 rounded-md text-slate-400 hover:bg-slate-50 disabled:opacity-30" title="Move up"><ArrowUp className="w-3.5 h-3.5" /></button>
                    <button onClick={() => move(i, 1)} disabled={i === blocks.length - 1} className="p-1.5 rounded-md text-slate-400 hover:bg-slate-50 disabled:opacity-30" title="Move down"><ArrowDown className="w-3.5 h-3.5" /></button>
                    <button onClick={() => quickUpdate(b.id, { is_published: !b.is_published })} className="p-1.5 rounded-md text-slate-400 hover:bg-slate-50" title={b.is_published ? "Hide" : "Show"}>
                      {b.is_published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
                    <button onClick={() => duplicate(b)} className="p-1.5 rounded-md text-slate-400 hover:bg-slate-50" title="Duplicate"><Copy className="w-3.5 h-3.5" /></button>
                    <button onClick={() => remove(b)} className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-semibold text-slate-500">Heading</Label>
                    <Input className="h-9" value={value(b, "heading")} onChange={(e) => setField(b.id, "heading", e.target.value)} />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-slate-500">{b.block_type === "image" ? "Caption" : "Subheading"}</Label>
                    <Input className="h-9" value={value(b, "subheading")} onChange={(e) => setField(b.id, "subheading", e.target.value)} />
                  </div>

                  {!isCards && (
                    <div className="md:col-span-2">
                      <Label className="text-xs font-semibold text-slate-500">Body text</Label>
                      <Textarea rows={4} value={value(b, "body")} onChange={(e) => setField(b.id, "body", e.target.value)} placeholder="Leave a blank line between paragraphs" />
                    </div>
                  )}

                  {(b.block_type === "hero" || b.block_type === "image") && (
                    <>
                      <div>
                        <Label className="text-xs font-semibold text-slate-500">Image URL</Label>
                        <Input className="h-9" value={value(b, "image_url")} onChange={(e) => setField(b.id, "image_url", e.target.value)} placeholder="/redesign-assets/photo.jpg" />
                      </div>
                      <div>
                        <Label className="text-xs font-semibold text-slate-500">Image alt text (accessibility)</Label>
                        <Input className="h-9" value={value(b, "image_alt")} onChange={(e) => setField(b.id, "image_alt", e.target.value)} placeholder="Describe the photo" />
                      </div>
                    </>
                  )}

                  {b.block_type !== "gallery" && (
                    <>
                      <div>
                        <Label className="text-xs font-semibold text-slate-500">Button label</Label>
                        <Input className="h-9" value={value(b, "cta_label")} onChange={(e) => setField(b.id, "cta_label", e.target.value)} placeholder="Register now" />
                      </div>
                      <div>
                        <Label className="text-xs font-semibold text-slate-500">Button link</Label>
                        <Input className="h-9" value={value(b, "cta_url")} onChange={(e) => setField(b.id, "cta_url", e.target.value)} placeholder="https://…" />
                      </div>
                    </>
                  )}
                </div>

                {isCards && (
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {b.block_type === "gallery" ? "Photos" : "Cards"} ({items(b).length})
                      </p>
                      <Button size="sm" variant="outline" className="h-7" onClick={() => setItems(b, [...items(b), {}])}>
                        <Plus className="w-3 h-3 mr-1" /> Add {b.block_type === "gallery" ? "photo" : "card"}
                      </Button>
                    </div>
                    {items(b).map((it, idx) => (
                      <div key={idx} className="rounded-lg border border-slate-200 p-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="md:col-span-2 flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-600">#{idx + 1}</span>
                          <div className="flex gap-1">
                            <button className="p-1 text-slate-400 hover:bg-slate-50 rounded disabled:opacity-30" disabled={idx === 0}
                              onClick={() => { const n = [...items(b)]; [n[idx - 1], n[idx]] = [n[idx], n[idx - 1]]; setItems(b, n); }}><ArrowUp className="w-3 h-3" /></button>
                            <button className="p-1 text-slate-400 hover:bg-slate-50 rounded disabled:opacity-30" disabled={idx === items(b).length - 1}
                              onClick={() => { const n = [...items(b)]; [n[idx + 1], n[idx]] = [n[idx], n[idx + 1]]; setItems(b, n); }}><ArrowDown className="w-3 h-3" /></button>
                            <button className="p-1 text-slate-400 hover:text-red-500 rounded"
                              onClick={() => setItems(b, items(b).filter((_, k) => k !== idx))}><Trash2 className="w-3 h-3" /></button>
                          </div>
                        </div>
                        <Input className="h-9" placeholder={b.block_type === "gallery" ? "Alt text / caption title" : "Card title"} value={it.title || ""}
                          onChange={(e) => { const n = [...items(b)]; n[idx] = { ...it, title: e.target.value }; setItems(b, n); }} />
                        <Input className="h-9" placeholder="Image URL" value={it.image_url || ""}
                          onChange={(e) => { const n = [...items(b)]; n[idx] = { ...it, image_url: e.target.value }; setItems(b, n); }} />
                        <div className="md:col-span-2">
                          <Textarea rows={2} placeholder="Card text" value={it.text || ""}
                            onChange={(e) => { const n = [...items(b)]; n[idx] = { ...it, text: e.target.value }; setItems(b, n); }} />
                        </div>
                        {b.block_type === "cards" && (
                          <>
                            <Input className="h-9" placeholder="Link label" value={it.link_label || ""}
                              onChange={(e) => { const n = [...items(b)]; n[idx] = { ...it, link_label: e.target.value }; setItems(b, n); }} />
                            <Input className="h-9" placeholder="Link URL" value={it.link_url || ""}
                              onChange={(e) => { const n = [...items(b)]; n[idx] = { ...it, link_url: e.target.value }; setItems(b, n); }} />
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4 flex gap-2">
                  <Button size="sm" className="h-8 bg-blue-600 hover:bg-blue-700 text-white" disabled={!dirty || saving === b.id} onClick={() => saveBlock(b)}>
                    {saving === b.id ? <RefreshCw className="w-3.5 h-3.5 mr-1 animate-spin" /> : <Save className="w-3.5 h-3.5 mr-1" />} Save section
                  </Button>
                  {dirty && (
                    <Button size="sm" variant="outline" className="h-8" onClick={() => setDrafts((d) => { const n = { ...d }; delete n[b.id]; return n; })}>
                      Discard
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
