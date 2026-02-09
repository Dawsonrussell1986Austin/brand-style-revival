import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  LogOut,
  Save,
  Image as ImageIcon,
  FileText,
  Plus,
  Trash2,
  Upload,
  Home,
  Check,
  X,
  ChevronDown,
  ChevronRight,
  Eye,
  PanelRightOpen,
  PanelRightClose,
  RefreshCw,
  Monitor,
  Smartphone,
  Inbox,
  Mail,
  Phone,
  Clock,
  Building,
  Users,
  UserPlus,
  Shield,
} from "lucide-react";
import {
  useAllContent,
  useAllImages,
  useUpdateContent,
  useUpdateImage,
  useUploadImage,
} from "@/hooks/useSiteContent";
import acesLogo from "@/assets/aces-logo.webp";

interface ContentItem {
  id: string;
  page: string;
  section: string;
  content_key: string;
  content_value: string;
  content_type: string;
  updated_at: string;
}

interface ImageItem {
  id: string;
  page: string;
  section: string;
  image_key: string;
  image_url: string;
  alt_text: string | null;
  updated_at: string;
}

const pageRoutes: Record<string, string> = {
  home: "/",
  about: "/about",
  contact: "/contact",
  services: "/services",
  events: "/events",
  resources: "/resources",
  "ai-center": "/ai-center",
};

const pageLabels: Record<string, string> = {
  home: "Home",
  about: "About",
  contact: "Contact",
  services: "Services",
  events: "Events",
  resources: "Resources",
  "ai-center": "AI Center",
};

const sectionLabels: Record<string, string> = {
  hero: "Hero Section",
  cta: "Call to Action",
  services: "Services",
  testimonials: "Testimonials",
  professional_learning: "Professional Learning",
  main: "Main Content",
  info: "Contact Info",
  pillars: "Three Pillars",
  workshops: "Workshops & Training",
  certifications: "Certification Programs",
  workbooks: "Premium Workbooks",
  free_tools: "Free Tools & Templates",
};

// Define display order for sections (lower = higher on page)
const sectionOrder: Record<string, number> = {
  hero: 0,
  partners: 1,
  professional_learning: 2,
  services: 3,
  news: 4,
  testimonials: 5,
  cta: 6,
  main: 1,
  info: 2,
  pillars: 1,
  workshops: 2,
  certifications: 3,
  workbooks: 1,
  free_tools: 2,
};

const keyLabels: Record<string, string> = {
  badge: "Badge Text",
  heading_line1: "Heading Line 1",
  heading_line2: "Heading Line 2",
  subtitle: "Subtitle",
  title: "Title",
  description: "Description",
  stat_years: "Years Stat",
  stat_districts: "Districts Stat",
  stat_educators: "Educators Stat",
  satisfaction_rate: "Satisfaction Rate",
  button_text: "Button Text",
  email: "Email",
  phone: "Phone",
  address: "Address",
  quote: "Quote",
  quote_1: "Quote 1",
  quote_2: "Quote 2",
  author_1: "Author 1",
  author_2: "Author 2",
  role_1: "Role 1",
  role_2: "Role 2",
  location_1: "Location 1",
  location_2: "Location 2",
  card1_title: "Card 1 Title",
  card1_description: "Card 1 Description",
  card2_title: "Card 2 Title",
  card2_description: "Card 2 Description",
  ai_center_description: "AI Center",
  collaborative_description: "Collaborative Partnership",
  mission_description: "Mission Statement",
};

function getLabel(map: Record<string, string>, key: string): string {
  return map[key] || key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// Inline content editor field
function ContentField({
  item,
  onSave,
  onDelete,
}: {
  item: ContentItem;
  onSave: (item: ContentItem, newValue: string) => Promise<void>;
  onDelete: (item: ContentItem) => void;
}) {
  const [value, setValue] = useState(item.content_value);
  const [saving, setSaving] = useState(false);
  const isDirty = value !== item.content_value;

  useEffect(() => {
    setValue(item.content_value);
  }, [item.content_value]);

  const handleSave = async () => {
    setSaving(true);
    await onSave(item, value);
    setSaving(false);
  };

  const isShort = item.content_value.length < 100;

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {getLabel(keyLabels, item.content_key)}
        </label>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onDelete(item)}
            className="p-1 rounded text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
      {isShort ? (
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="text-sm bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
        />
      ) : (
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={Math.min(6, Math.ceil(value.length / 80))}
          className="text-sm bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 resize-none"
        />
      )}
      {isDirty && (
        <div className="flex items-center gap-2 mt-2">
          <Button
            size="sm"
            onClick={handleSave}
            disabled={saving}
            className="h-7 px-3 text-xs bg-blue-600 hover:bg-blue-700 text-white"
          >
            {saving ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3 mr-1" />}
            Save
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setValue(item.content_value)}
            className="h-7 px-3 text-xs"
          >
            <X className="w-3 h-3 mr-1" />
            Reset
          </Button>
        </div>
      )}
    </div>
  );
}

// Image editor field
function ImageField({
  item,
  onUpload,
  onDelete,
}: {
  item: ImageItem;
  onUpload: (file: File, item: ImageItem) => Promise<void>;
  onDelete: (item: ImageItem) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    await onUpload(file, item);
    setUploading(false);
  };

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {getLabel(keyLabels, item.image_key)}
        </label>
        <button
          onClick={() => onDelete(item)}
          className="p-1 rounded text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
      <div
        className="relative rounded-lg overflow-hidden border border-slate-200 cursor-pointer group/img"
        onClick={() => fileInputRef.current?.click()}
      >
        <img
          src={item.image_url}
          alt={item.alt_text || item.image_key}
          className="w-full h-32 object-cover"
        />
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity ${
            uploading ? "bg-black/50 opacity-100" : "bg-black/40 opacity-0 group-hover/img:opacity-100"
          }`}
        >
          {uploading ? (
            <RefreshCw className="w-6 h-6 text-white animate-spin" />
          ) : (
            <div className="flex items-center gap-2 text-white text-sm font-medium">
              <Upload className="w-4 h-4" />
              Replace
            </div>
          )}
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      </div>
    </div>
  );
}

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [selectedPage, setSelectedPage] = useState<string>("home");
  const [activeView, setActiveView] = useState<"pages" | "submissions" | "team">("pages");
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [teamLoading, setTeamLoading] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"admin" | "editor">("editor");
  const [inviting, setInviting] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [showAddContent, setShowAddContent] = useState(false);
  const [showAddImage, setShowAddImage] = useState(false);
  const [newContent, setNewContent] = useState({ page: "", section: "", key: "", value: "" });
  const [newImage, setNewImage] = useState({ page: "", section: "", key: "", url: "", alt: "" });
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const navigate = useNavigate();

  const { data: allContent, isLoading: contentLoading, refetch: refetchContent } = useAllContent();
  const { data: allImages, isLoading: imagesLoading, refetch: refetchImages } = useAllImages();
  const updateContent = useUpdateContent();
  const updateImage = useUpdateImage();
  const uploadImage = useUploadImage();

  const [submissions, setSubmissions] = useState<any[]>([]);
  const [submissionsLoading, setSubmissionsLoading] = useState(false);

  const fetchSubmissions = async () => {
    setSubmissionsLoading(true);
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setSubmissions(data);
    setSubmissionsLoading(false);
  };

  const fetchTeamMembers = async () => {
    setTeamLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await supabase.functions.invoke("list-admins", {
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });
      if (res.data?.members) setTeamMembers(res.data.members);
    } catch (e: any) {
      toast.error(e.message);
    }
    setTeamLoading(false);
  };

  const handleInvite = async () => {
    if (!inviteEmail) { toast.error("Enter an email"); return; }
    setInviting(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await supabase.functions.invoke("invite-admin", {
        headers: { Authorization: `Bearer ${session?.access_token}` },
        body: { email: inviteEmail, role: inviteRole },
      });
      if (res.data?.error) { toast.error(res.data.error); }
      else { toast.success(res.data?.message || "Invited!"); setInviteEmail(""); fetchTeamMembers(); }
    } catch (e: any) {
      toast.error(e.message);
    }
    setInviting(false);
  };

  const handleRemoveMember = async (userId: string, role: string) => {
    if (!confirm(`Remove this user's ${role} role?`)) return;
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await supabase.functions.invoke("remove-admin", {
        headers: { Authorization: `Bearer ${session?.access_token}` },
        body: { user_id: userId, role },
      });
      if (res.data?.error) { toast.error(res.data.error); }
      else { toast.success("Role removed"); fetchTeamMembers(); }
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    if (activeView === "submissions") fetchSubmissions();
    if (activeView === "team") fetchTeamMembers();
  }, [activeView]);

  // Auth check
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) { navigate("/admin/auth"); return; }
      const { data: roles } = await supabase
        .from("user_roles").select("role")
        .eq("user_id", session.user.id).in("role", ["admin", "editor"]);
      if (!roles || roles.length === 0) {
        toast.error("You don't have admin access");
        await supabase.auth.signOut();
        navigate("/admin/auth");
        return;
      }
      setUser(session.user);
    };
    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event) => { if (event === "SIGNED_OUT") navigate("/admin/auth"); }
    );
    return () => subscription.unsubscribe();
  }, [navigate]);

  // Expand all sections for current page by default
  useEffect(() => {
    const pageContent = allContent?.filter((c) => c.page === selectedPage) || [];
    const pageImages = allImages?.filter((i) => i.page === selectedPage) || [];
    const sections = new Set([
      ...pageContent.map((c) => c.section),
      ...pageImages.map((i) => i.section),
    ]);
    setExpandedSections(sections);
  }, [selectedPage, allContent, allImages]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/auth");
  };

  const handleSaveContent = async (item: ContentItem, newValue: string) => {
    try {
      await updateContent.mutateAsync({ page: item.page, section: item.section, key: item.content_key, value: newValue });
      toast.success("Saved!");
      refetchContent();
      // Refresh preview
      setTimeout(() => iframeRef.current?.contentWindow?.location.reload(), 500);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDeleteContent = async (item: ContentItem) => {
    if (!confirm("Delete this content?")) return;
    try {
      const { error } = await supabase.from("site_content").delete().eq("id", item.id);
      if (error) throw error;
      toast.success("Deleted");
      refetchContent();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleImageUpload = async (file: File, imageItem: ImageItem) => {
    const path = `${Date.now()}-${file.name}`;
    try {
      const publicUrl = await uploadImage.mutateAsync({ file, path });
      await updateImage.mutateAsync({
        page: imageItem.page, section: imageItem.section, key: imageItem.image_key,
        url: publicUrl, altText: imageItem.alt_text || undefined,
      });
      toast.success("Image updated!");
      refetchImages();
      setTimeout(() => iframeRef.current?.contentWindow?.location.reload(), 500);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDeleteImage = async (item: ImageItem) => {
    if (!confirm("Delete this image?")) return;
    try {
      const { error } = await supabase.from("site_images").delete().eq("id", item.id);
      if (error) throw error;
      toast.success("Deleted");
      refetchImages();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleAddContent = async () => {
    if (!newContent.page || !newContent.section || !newContent.key || !newContent.value) {
      toast.error("Please fill all fields"); return;
    }
    try {
      await updateContent.mutateAsync({ page: newContent.page, section: newContent.section, key: newContent.key, value: newContent.value });
      toast.success("Content added!");
      setNewContent({ page: "", section: "", key: "", value: "" });
      setShowAddContent(false);
      refetchContent();
    } catch (error: any) { toast.error(error.message); }
  };

  const handleAddImage = async () => {
    if (!newImage.page || !newImage.section || !newImage.key || !newImage.url) {
      toast.error("Please fill all required fields"); return;
    }
    try {
      await updateImage.mutateAsync({ page: newImage.page, section: newImage.section, key: newImage.key, url: newImage.url, altText: newImage.alt });
      toast.success("Image added!");
      setNewImage({ page: "", section: "", key: "", url: "", alt: "" });
      setShowAddImage(false);
      refetchImages();
    } catch (error: any) { toast.error(error.message); }
  };

  const handleNewImageUpload = async (file: File) => {
    const path = `${Date.now()}-${file.name}`;
    try {
      const publicUrl = await uploadImage.mutateAsync({ file, path });
      setNewImage((prev) => ({ ...prev, url: publicUrl }));
    } catch (error: any) { toast.error(error.message); }
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  };

  // Get pages that have content
  const pages = Array.from(
    new Set([...(allContent?.map((c) => c.page) || []), ...(allImages?.map((i) => i.page) || [])])
  ).sort();

  // Content for selected page, grouped by section
  const pageContent = allContent?.filter((c) => c.page === selectedPage) || [];
  const pageImages = allImages?.filter((i) => i.page === selectedPage) || [];

  const sectionMap = new Map<string, { content: ContentItem[]; images: ImageItem[] }>();
  for (const item of pageContent) {
    if (!sectionMap.has(item.section)) sectionMap.set(item.section, { content: [], images: [] });
    sectionMap.get(item.section)!.content.push(item);
  }
  for (const item of pageImages) {
    if (!sectionMap.has(item.section)) sectionMap.set(item.section, { content: [], images: [] });
    sectionMap.get(item.section)!.images.push(item);
  }

  const previewUrl = pageRoutes[selectedPage] || "/";

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-slate-100 overflow-hidden">
      {/* Top Bar */}
      <header className="bg-white border-b border-slate-200 h-14 flex items-center px-4 gap-4 shrink-0 z-50">
        <img src={acesLogo} alt="ACES" className="h-8" />
        <div className="h-6 w-px bg-slate-200" />

        {/* View Toggle */}
        <div className="flex items-center gap-1 border border-slate-200 rounded-lg p-0.5">
          <button
            onClick={() => setActiveView("pages")}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
              activeView === "pages" ? "bg-blue-600 text-white" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Pages
          </button>
          <button
            onClick={() => setActiveView("submissions")}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors flex items-center gap-1 ${
              activeView === "submissions" ? "bg-blue-600 text-white" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Inbox className="w-3 h-3" />
            Submissions
          </button>
          <button
            onClick={() => setActiveView("team")}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors flex items-center gap-1 ${
              activeView === "team" ? "bg-blue-600 text-white" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Users className="w-3 h-3" />
            Team
          </button>
        </div>

        <div className="h-6 w-px bg-slate-200" />

        {/* Page Tabs */}
        {activeView === "pages" && (
          <nav className="flex items-center gap-1 overflow-x-auto flex-1">
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setSelectedPage(page)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedPage === page
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {getLabel(pageLabels, page)}
              </button>
            ))}
          </nav>
        )}
        {activeView !== "pages" && <div className="flex-1" />}

        <div className="h-6 w-px bg-slate-200" />

        {/* Preview controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPreviewMode("desktop")}
            className={`p-1.5 rounded-md transition-colors ${
              previewMode === "desktop" ? "bg-slate-200 text-slate-900" : "text-slate-400 hover:text-slate-600"
            }`}
            title="Desktop preview"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setPreviewMode("mobile")}
            className={`p-1.5 rounded-md transition-colors ${
              previewMode === "mobile" ? "bg-slate-200 text-slate-900" : "text-slate-400 hover:text-slate-600"
            }`}
            title="Mobile preview"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        <div className="h-6 w-px bg-slate-200" />

        <button
          onClick={() => setPanelOpen(!panelOpen)}
          className="p-1.5 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          title={panelOpen ? "Hide panel" : "Show panel"}
        >
          {panelOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
        </button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.open(previewUrl, "_blank")}
          className="text-slate-600 h-8"
        >
          <Eye className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">View Live</span>
        </Button>

        <div className="h-6 w-px bg-slate-200" />
        <span className="text-xs text-slate-400 hidden lg:inline">{user.email}</span>
        <button onClick={handleSignOut} className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100">
          <LogOut className="w-4 h-4" />
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {activeView === "submissions" ? (
          /* Submissions View */
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Contact Submissions</h2>
                  <p className="text-sm text-slate-500">{submissions.length} submission{submissions.length !== 1 ? "s" : ""}</p>
                </div>
                <Button size="sm" variant="outline" onClick={fetchSubmissions} disabled={submissionsLoading} className="h-8">
                  <RefreshCw className={`w-3.5 h-3.5 mr-1 ${submissionsLoading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </div>

              {submissionsLoading ? (
                <div className="flex items-center justify-center py-20">
                  <RefreshCw className="w-6 h-6 text-slate-400 animate-spin" />
                </div>
              ) : submissions.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                  <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="font-medium text-slate-500">No submissions yet</p>
                  <p className="text-sm text-slate-400">Contact form submissions will appear here.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {submissions.map((sub) => (
                    <div key={sub.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-slate-900">{sub.name}</h3>
                          {sub.organization && (
                            <div className="flex items-center gap-1 text-sm text-slate-500 mt-0.5">
                              <Building className="w-3.5 h-3.5" />
                              {sub.organization}
                              {sub.role && <span className="text-slate-400">• {sub.role}</span>}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Clock className="w-3 h-3" />
                          {new Date(sub.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}
                        </div>
                      </div>
                      <p className="text-sm text-slate-700 mb-3 leading-relaxed">{sub.message}</p>
                      <div className="flex flex-wrap gap-3">
                        <a href={`mailto:${sub.email}`} className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium">
                          <Mail className="w-3.5 h-3.5" />
                          {sub.email}
                        </a>
                        {sub.phone && (
                          <a href={`tel:${sub.phone}`} className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium">
                            <Phone className="w-3.5 h-3.5" />
                            {sub.phone}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : activeView === "team" ? (
          /* Team View */
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Team Members</h2>
                  <p className="text-sm text-slate-500">Manage who has access to this admin panel</p>
                </div>
                <Button size="sm" variant="outline" onClick={fetchTeamMembers} disabled={teamLoading} className="h-8">
                  <RefreshCw className={`w-3.5 h-3.5 mr-1 ${teamLoading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </div>

              {/* Invite Form */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
                <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Invite New Member
                </h3>
                <div className="flex gap-3">
                  <Input
                    placeholder="Email address"
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="flex-1 h-9"
                  />
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as "admin" | "editor")}
                    className="h-9 px-3 rounded-md border border-slate-200 text-sm bg-white"
                  >
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                  </select>
                  <Button onClick={handleInvite} disabled={inviting} className="h-9 bg-blue-600 hover:bg-blue-700 text-white">
                    {inviting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <UserPlus className="w-3.5 h-3.5 mr-1" />}
                    Invite
                  </Button>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  They'll be able to log in at the admin page. If they don't have an account, one will be created.
                </p>
              </div>

              {/* Members List */}
              {teamLoading ? (
                <div className="flex items-center justify-center py-20">
                  <RefreshCw className="w-6 h-6 text-slate-400 animate-spin" />
                </div>
              ) : teamMembers.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                  <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="font-medium text-slate-500">No team members found</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-600">
                            {member.email?.[0]?.toUpperCase() || "?"}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{member.email}</p>
                          <div className="flex gap-1.5 mt-1">
                            {member.roles?.map((role: string) => (
                              <span
                                key={role}
                                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                  role === "admin"
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-blue-100 text-blue-700"
                                }`}
                              >
                                <Shield className="w-3 h-3 inline mr-0.5" />
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {member.roles?.map((role: string) => (
                          member.id !== user?.id && (
                            <button
                              key={role}
                              onClick={() => handleRemoveMember(member.id, role)}
                              className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                              title={`Remove ${role} role`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
        {/* Preview Panel */}
        <div className="flex-1 flex items-start justify-center p-4 bg-slate-200/50 overflow-hidden">
          <div
            className={`bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 h-full ${
              previewMode === "mobile" ? "w-[390px]" : "w-full"
            }`}
          >
            <div className="bg-slate-100 border-b border-slate-200 px-3 py-1.5 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-white rounded-md border border-slate-200 px-3 py-0.5 text-xs text-slate-500 max-w-sm w-full text-center truncate">
                  {window.location.origin}{previewUrl}
                </div>
              </div>
              <button
                onClick={() => iframeRef.current?.contentWindow?.location.reload()}
                className="p-1 rounded text-slate-400 hover:text-slate-600"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
            <iframe
              ref={iframeRef}
              src={previewUrl}
              className="w-full h-[calc(100%-32px)] border-0"
              title="Site Preview"
            />
          </div>
        </div>

        {/* Edit Panel */}
        {panelOpen && (
          <div className="w-[380px] bg-white border-l border-slate-200 flex flex-col overflow-hidden shrink-0">
            {/* Panel header */}
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between shrink-0">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  {getLabel(pageLabels, selectedPage)}
                </h2>
                <p className="text-xs text-slate-400">
                  {sectionMap.size} section{sectionMap.size !== 1 ? "s" : ""} •{" "}
                  {pageContent.length + pageImages.length} items
                </p>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setShowAddContent(true)}
                  className="p-1.5 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  title="Add text"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Panel content */}
            <div className="flex-1 overflow-y-auto">
              {contentLoading || imagesLoading ? (
                <div className="flex items-center justify-center py-12">
                  <RefreshCw className="w-5 h-5 text-slate-400 animate-spin" />
                </div>
              ) : sectionMap.size === 0 ? (
                <div className="p-8 text-center">
                  <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm font-medium text-slate-500 mb-1">No content yet</p>
                  <p className="text-xs text-slate-400 mb-4">Add text or images for this page</p>
                  <div className="flex gap-2 justify-center">
                    <Button size="sm" variant="outline" onClick={() => { setNewContent(prev => ({...prev, page: selectedPage})); setShowAddContent(true); }} className="h-7 text-xs">
                      <FileText className="w-3 h-3 mr-1" /> Add Text
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => { setNewImage(prev => ({...prev, page: selectedPage})); setShowAddImage(true); }} className="h-7 text-xs">
                      <ImageIcon className="w-3 h-3 mr-1" /> Add Image
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {Array.from(sectionMap.entries())
                    .sort(([a], [b]) => (sectionOrder[a] ?? 99) - (sectionOrder[b] ?? 99))
                    .map(([sectionKey, { content, images }]) => {
                      const isExpanded = expandedSections.has(sectionKey);
                      const itemCount = content.length + images.length;

                      return (
                        <div key={sectionKey}>
                          <button
                            onClick={() => toggleSection(sectionKey)}
                            className="w-full flex items-center gap-2 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
                          >
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                            )}
                            <span className="text-sm font-semibold text-slate-700 flex-1">
                              {getLabel(sectionLabels, sectionKey)}
                            </span>
                            <span className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                              {itemCount}
                            </span>
                          </button>

                          {isExpanded && (
                            <div className="px-4 pb-4 space-y-4">
                              {content.map((item) => (
                                <ContentField
                                  key={item.id}
                                  item={item}
                                  onSave={handleSaveContent}
                                  onDelete={handleDeleteContent}
                                />
                              ))}
                              {images.map((item) => (
                                <ImageField
                                  key={item.id}
                                  item={item}
                                  onUpload={handleImageUpload}
                                  onDelete={handleDeleteImage}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            {/* Add content/image modals */}
            {showAddContent && (
              <div className="absolute inset-0 bg-black/20 z-50 flex items-end justify-end">
                <div className="w-[380px] bg-white border-l border-slate-200 h-full overflow-y-auto p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">Add Text Content</h3>
                    <button onClick={() => setShowAddContent(false)} className="p-1 rounded hover:bg-slate-100">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs">Page</Label>
                      <Input placeholder="e.g., home" value={newContent.page} onChange={(e) => setNewContent((p) => ({ ...p, page: e.target.value }))} className="h-9" />
                    </div>
                    <div>
                      <Label className="text-xs">Section</Label>
                      <Input placeholder="e.g., hero" value={newContent.section} onChange={(e) => setNewContent((p) => ({ ...p, section: e.target.value }))} className="h-9" />
                    </div>
                    <div>
                      <Label className="text-xs">Key</Label>
                      <Input placeholder="e.g., title" value={newContent.key} onChange={(e) => setNewContent((p) => ({ ...p, key: e.target.value }))} className="h-9" />
                    </div>
                    <div>
                      <Label className="text-xs">Content</Label>
                      <Textarea placeholder="Enter content..." value={newContent.value} onChange={(e) => setNewContent((p) => ({ ...p, value: e.target.value }))} rows={3} />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleAddContent} disabled={updateContent.isPending} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-9">
                        <Save className="w-3.5 h-3.5 mr-1" /> Save
                      </Button>
                      <Button variant="outline" onClick={() => setShowAddContent(false)} className="h-9">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showAddImage && (
              <div className="absolute inset-0 bg-black/20 z-50 flex items-end justify-end">
                <div className="w-[380px] bg-white border-l border-slate-200 h-full overflow-y-auto p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">Add Image</h3>
                    <button onClick={() => setShowAddImage(false)} className="p-1 rounded hover:bg-slate-100">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs">Page</Label>
                      <Input placeholder="e.g., home" value={newImage.page} onChange={(e) => setNewImage((p) => ({ ...p, page: e.target.value }))} className="h-9" />
                    </div>
                    <div>
                      <Label className="text-xs">Section</Label>
                      <Input placeholder="e.g., hero" value={newImage.section} onChange={(e) => setNewImage((p) => ({ ...p, section: e.target.value }))} className="h-9" />
                    </div>
                    <div>
                      <Label className="text-xs">Key</Label>
                      <Input placeholder="e.g., background" value={newImage.key} onChange={(e) => setNewImage((p) => ({ ...p, key: e.target.value }))} className="h-9" />
                    </div>
                    <div>
                      <Label className="text-xs">Upload</Label>
                      <Input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleNewImageUpload(f); }} className="h-9" />
                    </div>
                    <div>
                      <Label className="text-xs">Or URL</Label>
                      <Input placeholder="https://..." value={newImage.url} onChange={(e) => setNewImage((p) => ({ ...p, url: e.target.value }))} className="h-9" />
                    </div>
                    <div>
                      <Label className="text-xs">Alt Text</Label>
                      <Input placeholder="Describe the image" value={newImage.alt} onChange={(e) => setNewImage((p) => ({ ...p, alt: e.target.value }))} className="h-9" />
                    </div>
                    {newImage.url && <img src={newImage.url} alt="Preview" className="rounded-lg border max-h-32 w-full object-cover" />}
                    <div className="flex gap-2">
                      <Button onClick={handleAddImage} disabled={updateImage.isPending} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-9">
                        <Save className="w-3.5 h-3.5 mr-1" /> Save
                      </Button>
                      <Button variant="outline" onClick={() => setShowAddImage(false)} className="h-9">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
          </>
        )}
      </div>
    </div>
  );
}
