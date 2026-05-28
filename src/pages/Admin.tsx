import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
  CalendarDays,
  Edit,
  MapPin,
  Download,
  GripVertical,
  Copy,
  Key,
  Layout,
  Globe,
} from "lucide-react";
import {
  useAllContent,
  useAllImages,
  useUpdateContent,
  useUpdateImage,
  useUploadImage,
} from "@/hooks/useSiteContent";
import { useAllPages, type CmsPage } from "@/hooks/usePages";
import { useSiteSettings, useUpdateSiteSetting } from "@/hooks/useSiteSettings";
import { SeoAeoPanel } from "@/components/admin/SeoAeoPanel";
import acesLogo from "@/assets/aces-logo.webp";
import fallbackHero from "@/assets/home/hero-classroom.jpg";
import fallbackTeacher from "@/assets/teacher-classroom.jpg";
import fallbackTest1 from "@/assets/testimonial-1.jpg";
import fallbackTest2 from "@/assets/testimonial-2.jpg";
import fallbackBlog1 from "@/assets/blog-1.jpg";
import fallbackBlog2 from "@/assets/blog-2.jpg";
import fallbackBlog3 from "@/assets/blog-3.jpg";
import fallbackAirpods from "@/assets/airpods-giveaway.webp";
import fallbackAIHero from "@/assets/ai-center-hero.jpg";
import fallbackWorkshop from "@/assets/ai-workshop.jpg";
import fallbackCert from "@/assets/ai-certification.jpg";
import fallbackCTA from "@/assets/cta-banner.jpg";
import fallbackMichelle from "@/assets/team/michelle-gohagon.png";
import fallbackRosaria from "@/assets/team/rosaria-giannetti.png";
import fallbackJessica from "@/assets/team/jessica-white.png";
import fallbackLisa from "@/assets/team/lisa-seales.png";
import fallbackMary from "@/assets/team/mary-stone.png";
import fallbackJohn from "@/assets/team/john-gustafson.png";
import fallbackKim from "@/assets/team/kim-cellini.png";
import fallbackAlison from "@/assets/team/alison-zanardi.png";
import fallbackAIReadyHero from "@/assets/home/ai-hero-classroom.jpg";
import fallbackInnovativeHero from "@/assets/home/featured-ai.jpg";
import fallbackEthicsHero from "@/assets/home/hero-classroom.jpg";
import fallbackForumsHero from "@/assets/home/featured-rigor.jpg";
import fallbackForumsFlow from "@/assets/home/partner-ballroom.jpg";
import fallbackForumsPhoto1 from "@/assets/home/events-hero.jpg";
import fallbackForumsPhoto2 from "@/assets/home/hero-classroom.jpg";
import fallbackAboutHero from "@/assets/home/about-team.png";
import fallbackAboutPartner from "@/assets/home/partner-ballroom.jpg";
import fallbackArcHero from "@/assets/arc/arc-learning.jpg";
import fallbackArcExpect from "@/assets/arc/arc-team.jpg";
import fallbackEventsHero from "@/assets/home/events-hero.jpg";
import fallbackEventsCta from "@/assets/home/partner-ballroom.jpg";
import fallbackCFAIHero from "@/assets/home/ai-hero-classroom.jpg";
import fallbackCFAIPathway from "@/assets/home/hero-classroom.jpg";
import fallbackCurriculumLogo from "@/assets/aces-ai-logo.png";
import fallbackCurriculumSetup from "@/assets/curriculum-setup.png";
import fallbackCurriculumUnits from "@/assets/curriculum-units.png";
import fallbackCurriculumAudit from "@/assets/curriculum-audit.png";

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
  "center-for-ai-services": "/center-for-ai-services",
  "curriculum-creator": "/curriculum-creator",
  arc: "/arc",
  "ai-ready-schools": "/center-for-ai-services/ai-ready-schools",
  "innovative-tools": "/center-for-ai-services/innovative-tools",
  "research-ethics": "/center-for-ai-services/research-ethics",
  "regional-forums": "/pdsi-services/regional-forums",
};

const pageLabels: Record<string, string> = {
  home: "Home",
  about: "About",
  contact: "Contact",
  services: "Services",
  events: "Events",
  resources: "Resources",
  "ai-center": "AI Center",
  "center-for-ai-services": "Center for AI Services",
  "curriculum-creator": "Curriculum Creator",
  arc: "ARC (Alternate Routes)",
  "ai-ready-schools": "AI-Ready Schools",
  "innovative-tools": "Innovative Tools",
  "research-ethics": "Research & Ethics",
  "regional-forums": "Regional Forums",
};

const sectionLabels: Record<string, string> = {
  hero: "Hero Section",
  header: "Header / Logo",
  footer: "Footer / Logo",
  promo: "Promo Banner",
  news: "News & Insights",
  team: "Team Members",
  partner: "Partner Section",
  expect: "What to Expect",
  pathway: "Pathway Section",
  screens: "Product Screens",
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
  checklist: "Readiness Checklist",
  themes: "Themes",
  tools: "Tools",
  model: "Forum Model",
  flow: "Forum Flow",
  focus: "Focus Areas",
  network: "Regional Network",
  photos: "Photo Moments",
  seo: "SEO Metadata",
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

// Define display order for content keys within a section (lower = appears first)
const keyOrder: Record<string, number> = {
  badge: 0,
  title: 1,
  heading_line1: 1,
  heading_line2: 2,
  subtitle: 3,
  description: 4,
  button_text: 5,
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
// Fallback images map: page/section/key -> static asset path
const defaultImageMap: Record<string, string> = {
  "home/header/logo": acesLogo,
  "home/footer/logo": acesLogo,
  "home/hero/hero_image": fallbackHero,
  "home/professional_learning/teacher_classroom": fallbackTeacher,
  "home/testimonials/testimonial_1": fallbackTest1,
  "home/testimonials/testimonial_2": fallbackTest2,
  "home/news/blog_1": fallbackBlog1,
  "home/news/blog_2": fallbackBlog2,
  "home/news/blog_3": fallbackBlog3,
  "home/promo/airpods_giveaway": fallbackAirpods,
  "ai-center/hero/hero_image": fallbackAIHero,
  "ai-center/workshops/workshop_image": fallbackWorkshop,
  "ai-center/certifications/certification_image": fallbackCert,
  "services/hero/hero_image": fallbackCFAIHero,
  "contact/hero/hero_image": fallbackTeacher,
  "about/hero/hero_image": fallbackAboutHero,
  "about/partner/image": fallbackAboutPartner,
  "arc/hero/hero_image": fallbackArcHero,
  "arc/expect/image": fallbackArcExpect,
  "events/hero/hero_image": fallbackEventsHero,
  "events/cta/image": fallbackEventsCta,
  "center-for-ai-services/hero/hero_image": fallbackCFAIHero,
  "center-for-ai-services/pathway/image": fallbackCFAIPathway,
  "curriculum-creator/header/logo": fallbackCurriculumLogo,
  "curriculum-creator/hero/setup_image": fallbackCurriculumSetup,
  "curriculum-creator/screens/units_image": fallbackCurriculumUnits,
  "curriculum-creator/screens/audit_image": fallbackCurriculumAudit,
  "about/team/michelle_gohagon": fallbackMichelle,
  "about/team/rosaria_giannetti": fallbackRosaria,
  "about/team/jessica_white": fallbackJessica,
  "about/team/lisa_seales": fallbackLisa,
  "about/team/mary_stone": fallbackMary,
  "about/team/john_gustafson": fallbackJohn,
  "about/team/kim_cellini": fallbackKim,
  "about/team/alison_zanardi": fallbackAlison,
  "ai-ready-schools/hero/image": fallbackAIReadyHero,
  "innovative-tools/hero/image": fallbackInnovativeHero,
  "research-ethics/hero/image": fallbackEthicsHero,
  "regional-forums/hero/image": fallbackForumsHero,
  "regional-forums/flow/image": fallbackForumsFlow,
  "regional-forums/photos/photo_1_image": fallbackForumsPhoto1,
  "regional-forums/photos/photo_2_image": fallbackForumsPhoto2,
};

function getDefaultImage(item: ImageItem): string | null {
  const key = `${item.page}/${item.section}/${item.image_key}`;
  return defaultImageMap[key] || null;
}

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

  const displayUrl = item.image_url && item.image_url.length > 0 ? item.image_url : getDefaultImage(item);

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
        {displayUrl ? (
          <img
            src={displayUrl}
            alt={item.alt_text || item.image_key}
            className="w-full h-32 object-cover"
          />
        ) : (
          <div className="w-full h-32 bg-slate-100 flex flex-col items-center justify-center text-slate-400">
            <ImageIcon className="w-8 h-8 mb-1" />
            <span className="text-xs font-medium">No image uploaded</span>
            <span className="text-[10px] text-slate-300">Using default</span>
          </div>
        )}
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
  const [activeView, setActiveView] = useState<"pages" | "site-pages" | "submissions" | "team" | "events" | "downloads" | "seo">("pages");
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [teamLoading, setTeamLoading] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"admin" | "editor">("editor");
  const [inviting, setInviting] = useState(false);
  const [resendingInvite, setResendingInvite] = useState<string | null>(null);
  const [tempPasswordInfo, setTempPasswordInfo] = useState<{ email: string; password: string } | null>(null);
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

  // Events state
  interface EventRecord {
    id: string;
    slug: string;
    title: string;
    description: string;
    content: string;
    date: string;
    end_time: string;
    location: string;
    address: string | null;
    type: string;
    category: string | null;
    registration_url: string | null;
    image_url: string | null;
    is_published: boolean;
    created_at: string;
    updated_at: string;
  }

  const queryClient = useQueryClient();
  const [editingEvent, setEditingEvent] = useState<EventRecord | null>(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: "", slug: "", description: "", content: "", date: "", end_time: "",
    location: "", address: "", type: "virtual" as string, category: "AI & Technology",
    registration_url: "", is_published: true,
  });

  const { data: events = [], isLoading: eventsLoading } = useQuery({
    queryKey: ["admin-events"],
    queryFn: async () => {
      const { data, error } = await supabase.from("events").select("*").order("date", { ascending: false });
      if (error) throw error;
      return data as EventRecord[];
    },
    enabled: activeView === "events",
  });

  const saveEventMutation = useMutation({
    mutationFn: async (event: typeof eventForm & { id?: string }) => {
      const payload = {
        title: event.title,
        slug: event.slug,
        description: event.description,
        content: event.content,
        date: event.date,
        end_time: event.end_time,
        location: event.location,
        address: event.address || null,
        type: event.type,
        category: event.category,
        registration_url: event.registration_url || null,
        is_published: event.is_published,
      };
      if (event.id) {
        const { error } = await supabase.from("events").update(payload).eq("id", event.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("events").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
      toast.success(editingEvent ? "Event updated!" : "Event created!");
      resetEventForm();
      setTimeout(() => iframeRef.current?.contentWindow?.location.reload(), 500);
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteEventMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
      toast.success("Event deleted!");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const resetEventForm = () => {
    setEventForm({
      title: "", slug: "", description: "", content: "", date: "", end_time: "",
      location: "", address: "", type: "virtual", category: "AI & Technology",
      registration_url: "", is_published: true,
    });
    setEditingEvent(null);
    setShowEventForm(false);
  };

  const openEditEvent = (event: EventRecord) => {
    setEditingEvent(event);
    setEventForm({
      title: event.title,
      slug: event.slug,
      description: event.description,
      content: event.content,
      date: event.date ? new Date(event.date).toISOString().slice(0, 16) : "",
      end_time: event.end_time,
      location: event.location,
      address: event.address || "",
      type: event.type,
      category: event.category || "AI & Technology",
      registration_url: event.registration_url || "",
      is_published: event.is_published,
    });
    setShowEventForm(true);
  };

  const handleSaveEvent = () => {
    if (!eventForm.title || !eventForm.slug || !eventForm.date) {
      toast.error("Title, slug, and date are required");
      return;
    }
    saveEventMutation.mutate({ ...eventForm, id: editingEvent?.id });
  };

  // ============= CMS Pages state =============
  const { data: cmsPages = [], isLoading: cmsPagesLoading, refetch: refetchCmsPages } = useAllPages();
  const [showPageForm, setShowPageForm] = useState(false);
  const [editingPage, setEditingPage] = useState<CmsPage | null>(null);
  const [pageForm, setPageForm] = useState({
    slug: "",
    title: "",
    nav_label: "",
    meta_description: "",
    show_in_header: true,
    show_in_footer: true,
    display_order: 0,
    is_published: true,
  });

  const reservedSlugs = [
    "", "about", "ai-center", "services", "events", "resources", "contact",
    "thank-you", "blog", "admin", "center-for-a-i",
  ];

  const resetPageForm = () => {
    setPageForm({
      slug: "", title: "", nav_label: "", meta_description: "",
      show_in_header: true, show_in_footer: true, display_order: 0, is_published: true,
    });
    setEditingPage(null);
    setShowPageForm(false);
  };

  const openEditPage = (p: CmsPage) => {
    setEditingPage(p);
    setPageForm({
      slug: p.slug,
      title: p.title,
      nav_label: p.nav_label,
      meta_description: p.meta_description || "",
      show_in_header: p.show_in_header,
      show_in_footer: p.show_in_footer,
      display_order: p.display_order,
      is_published: p.is_published,
    });
    setShowPageForm(true);
  };

  const savePageMutation = useMutation({
    mutationFn: async (form: typeof pageForm & { id?: string }) => {
      const payload = {
        slug: form.slug,
        title: form.title,
        nav_label: form.nav_label || form.title,
        meta_description: form.meta_description,
        show_in_header: form.show_in_header,
        show_in_footer: form.show_in_footer,
        display_order: form.display_order,
        is_published: form.is_published,
      };
      if (form.id) {
        const { error } = await supabase.from("pages").update(payload).eq("id", form.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("pages").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cms-pages"] });
      refetchCmsPages();
      toast.success(editingPage ? "Page updated!" : "Page created!");
      resetPageForm();
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deletePageMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("pages").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cms-pages"] });
      refetchCmsPages();
      toast.success("Page deleted");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const handleSavePage = () => {
    if (!pageForm.slug || !pageForm.title) {
      toast.error("Slug and title are required");
      return;
    }
    const cleanSlug = pageForm.slug.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/^-|-$/g, "");
    if (reservedSlugs.includes(cleanSlug)) {
      toast.error(`"/${cleanSlug}" is reserved by an existing page`);
      return;
    }
    savePageMutation.mutate({ ...pageForm, slug: cleanSlug, id: editingPage?.id });
  };

  // Downloads state
  interface DownloadRecord {
    id: string;
    title: string;
    description: string;
    file_url: string;
    display_order: number;
    is_published: boolean;
  }

  const [showDownloadForm, setShowDownloadForm] = useState(false);
  const [editingDownload, setEditingDownload] = useState<DownloadRecord | null>(null);
  const [downloadForm, setDownloadForm] = useState({
    title: "", description: "", file_url: "", display_order: 0, is_published: true,
  });

  const { data: downloads = [], isLoading: downloadsLoading } = useQuery({
    queryKey: ["admin-downloads"],
    queryFn: async () => {
      const { data, error } = await supabase.from("free_resources").select("*").order("display_order", { ascending: true });
      if (error) throw error;
      return data as DownloadRecord[];
    },
    enabled: activeView === "downloads",
  });

  const saveDownloadMutation = useMutation({
    mutationFn: async (dl: typeof downloadForm & { id?: string }) => {
      const payload = { title: dl.title, description: dl.description, file_url: dl.file_url, display_order: dl.display_order, is_published: dl.is_published };
      if (dl.id) {
        const { error } = await supabase.from("free_resources").update(payload).eq("id", dl.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("free_resources").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-downloads"] });
      toast.success(editingDownload ? "Download updated!" : "Download created!");
      resetDownloadForm();
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteDownloadMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("free_resources").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-downloads"] });
      toast.success("Download deleted!");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const resetDownloadForm = () => {
    setDownloadForm({ title: "", description: "", file_url: "", display_order: 0, is_published: true });
    setEditingDownload(null);
    setShowDownloadForm(false);
  };

  const openEditDownload = (dl: DownloadRecord) => {
    setEditingDownload(dl);
    setDownloadForm({ title: dl.title, description: dl.description, file_url: dl.file_url, display_order: dl.display_order, is_published: dl.is_published });
    setShowDownloadForm(true);
  };

  const handleSaveDownload = () => {
    if (!downloadForm.title || !downloadForm.file_url) {
      toast.error("Title and file URL are required");
      return;
    }
    saveDownloadMutation.mutate({ ...downloadForm, id: editingDownload?.id });
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  };

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
      else {
        toast.success(res.data?.message || "Invited!");
        if (res.data?.tempPassword) {
          setTempPasswordInfo({ email: inviteEmail, password: res.data.tempPassword });
        }
        setInviteEmail("");
        fetchTeamMembers();
      }
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

  const handleResendInvite = async (email: string, roles: string[]) => {
    setResendingInvite(email);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await supabase.functions.invoke("resend-invite", {
        headers: { Authorization: `Bearer ${session?.access_token}` },
        body: { email, role: roles[0] || "editor" },
      });
      if (res.data?.error) { toast.error(res.data.error); }
      else { toast.success(res.data?.message || "Invite resent!"); }
    } catch (e: any) {
      toast.error(e.message);
    }
    setResendingInvite(null);
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

  // Get pages that have content, ordered to match site navigation
  const pageOrder = ["home", "ai-center", "services", "events", "resources", "about", "contact"];
  const allPages = new Set<string>([
    ...(allContent?.map((c) => c.page) || []),
    ...(allImages?.map((i) => i.page) || []),
    ...cmsPages.map((p) => p.slug),
  ]);
  const pages = pageOrder.filter((p) => allPages.has(p)).concat(
    [...allPages].filter((p) => !pageOrder.includes(p)).sort()
  );

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
      <div className="min-h-screen flex items-center justify-center bg-slate-50" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  const sidebarItems = [
    { key: "pages" as const, label: "Pages", icon: FileText },
    { key: "site-pages" as const, label: "Site Pages", icon: Layout },
    { key: "submissions" as const, label: "Submissions", icon: Inbox },
    { key: "team" as const, label: "Team", icon: Users },
    { key: "events" as const, label: "Events", icon: CalendarDays },
    { key: "downloads" as const, label: "Downloads", icon: Download },
    { key: "seo" as const, label: "SEO & AEO", icon: Globe },
  ];

  return (
    <div className="h-screen flex bg-slate-100 overflow-hidden" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-slate-200 flex flex-col shrink-0 z-50">
        <div className="h-14 flex items-center px-4 border-b border-slate-200 gap-2">
          <img src={acesLogo} alt="ACES" className="h-8" />
          <span className="text-xs font-bold text-slate-700 tracking-wide">CMS</span>
        </div>
        <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
          {sidebarItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveView(item.key)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeView === item.key
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-slate-200 p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-xs font-bold text-blue-600">{user.email?.[0]?.toUpperCase()}</span>
            </div>
            <span className="text-xs text-slate-500 truncate flex-1">{user.email}</span>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-xs text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 h-12 flex items-center px-4 gap-3 shrink-0">
          {/* Page Tabs (only in pages view) */}
          {activeView === "pages" ? (
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
          ) : (
            <div className="flex-1" />
          )}

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

          <div className="h-5 w-px bg-slate-200" />

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
        </header>

        {/* Content */}
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
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8"
                    disabled={submissions.length === 0}
                    onClick={() => {
                      const headers = ["Name", "Email", "Phone", "Organization", "Role", "Message", "Date"];
                      const escape = (v: string) => `"${(v || "").replace(/"/g, '""')}"`;
                      const rows = submissions.map(s => [s.name, s.email, s.phone, s.organization, s.role, s.message, new Date(s.created_at).toLocaleString()].map(escape).join(","));
                      const csv = [headers.join(","), ...rows].join("\n");
                      const blob = new Blob([csv], { type: "text/csv" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `submissions-${new Date().toISOString().slice(0, 10)}.csv`;
                      a.click();
                      URL.revokeObjectURL(url);
                      toast.success("CSV exported!");
                    }}
                  >
                    <Download className="w-3.5 h-3.5 mr-1" />
                    Export CSV
                  </Button>
                  <Button size="sm" variant="outline" onClick={fetchSubmissions} disabled={submissionsLoading} className="h-8">
                    <RefreshCw className={`w-3.5 h-3.5 mr-1 ${submissionsLoading ? "animate-spin" : ""}`} />
                    Refresh
                  </Button>
                </div>
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
                      <div className="flex flex-wrap items-center gap-3">
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
                        <a
                          href={`mailto:${sub.email}?subject=Re: Your inquiry to ACES PDSI&body=%0A%0A--- Original Message ---%0AFrom: ${encodeURIComponent(sub.name)}%0ADate: ${encodeURIComponent(new Date(sub.created_at).toLocaleString())}%0AMessage: ${encodeURIComponent(sub.message)}`}
                          className="ml-auto flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                        >
                          <Mail className="w-3 h-3" />
                          Reply
                        </a>
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
                    <div key={member.id} className="bg-white rounded-xl border border-slate-200 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-bold text-blue-600">
                              {member.email?.[0]?.toUpperCase() || "?"}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-slate-900">{member.email}</p>
                              {member.last_sign_in_at ? (
                                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-green-100 text-green-700">Active</span>
                              ) : (
                                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-yellow-100 text-yellow-700">Pending</span>
                              )}
                            </div>
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
                        <div className="flex gap-1 items-center">
                          {member.id !== user?.id && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 px-2.5 text-xs"
                              disabled={resendingInvite === member.email}
                              onClick={() => handleResendInvite(member.email, member.roles)}
                            >
                              {resendingInvite === member.email ? (
                                <RefreshCw className="w-3 h-3 animate-spin mr-1" />
                              ) : (
                                <Mail className="w-3 h-3 mr-1" />
                              )}
                              Resend Invite
                            </Button>
                          )}
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
                      <div className="mt-2.5 pl-[52px] flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-400">
                        {member.created_at && (
                          <span><Clock className="w-3 h-3 inline mr-0.5" /> Joined {new Date(member.created_at).toLocaleDateString()}</span>
                        )}
                        {member.last_sign_in_at ? (
                          <span><Check className="w-3 h-3 inline mr-0.5" /> Last login {new Date(member.last_sign_in_at).toLocaleDateString()}</span>
                        ) : (
                          <span className="text-yellow-500">Never signed in</span>
                        )}
                        {member.updated_at && member.updated_at !== member.created_at && (
                          <span><Edit className="w-3 h-3 inline mr-0.5" /> Updated {new Date(member.updated_at).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : activeView === "events" ? (
          /* Events View */
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Events</h2>
                  <p className="text-sm text-slate-500">{events.length} event{events.length !== 1 ? "s" : ""}</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => { resetEventForm(); setShowEventForm(true); }}
                  className="h-8 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  New Event
                </Button>
              </div>

              {/* Event Form */}
              {showEventForm && (
                <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">
                      {editingEvent ? "Edit Event" : "New Event"}
                    </h3>
                    <button onClick={resetEventForm} className="p-1 rounded hover:bg-slate-100">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label className="text-xs font-semibold text-slate-500">Title *</Label>
                      <Input
                        value={eventForm.title}
                        onChange={(e) => {
                          const title = e.target.value;
                          setEventForm(p => ({
                            ...p, title,
                            slug: editingEvent ? p.slug : generateSlug(title),
                          }));
                        }}
                        className="h-9"
                        placeholder="Event title"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label className="text-xs font-semibold text-slate-500">Slug *</Label>
                      <Input value={eventForm.slug} onChange={(e) => setEventForm(p => ({ ...p, slug: e.target.value }))} className="h-9" placeholder="url-friendly-slug" />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-slate-500">Date & Time *</Label>
                      <Input type="datetime-local" value={eventForm.date} onChange={(e) => setEventForm(p => ({ ...p, date: e.target.value }))} className="h-9" />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-slate-500">End Time</Label>
                      <Input value={eventForm.end_time} onChange={(e) => setEventForm(p => ({ ...p, end_time: e.target.value }))} className="h-9" placeholder="e.g., 12:00 pm" />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-slate-500">Type</Label>
                      <select
                        value={eventForm.type}
                        onChange={(e) => setEventForm(p => ({ ...p, type: e.target.value }))}
                        className="h-9 w-full px-3 rounded-md border border-slate-200 text-sm bg-white"
                      >
                        <option value="virtual">Virtual</option>
                        <option value="in-person">In-Person</option>
                      </select>
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-slate-500">Category</Label>
                      <select
                        value={eventForm.category}
                        onChange={(e) => setEventForm(p => ({ ...p, category: e.target.value }))}
                        className="h-9 w-full px-3 rounded-md border border-slate-200 text-sm bg-white"
                      >
                        <option value="AI & Technology">AI & Technology</option>
                        <option value="Leadership">Leadership</option>
                        <option value="Social-Emotional">Social-Emotional</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-xs font-semibold text-slate-500">Location</Label>
                      <Input value={eventForm.location} onChange={(e) => setEventForm(p => ({ ...p, location: e.target.value }))} className="h-9" placeholder="e.g., Virtual or venue name" />
                    </div>
                    {eventForm.type === "in-person" && (
                      <div className="col-span-2">
                        <Label className="text-xs font-semibold text-slate-500">Address</Label>
                        <Input value={eventForm.address} onChange={(e) => setEventForm(p => ({ ...p, address: e.target.value }))} className="h-9" placeholder="Street address" />
                      </div>
                    )}
                    <div className="col-span-2">
                      <Label className="text-xs font-semibold text-slate-500">Registration URL</Label>
                      <Input value={eventForm.registration_url} onChange={(e) => setEventForm(p => ({ ...p, registration_url: e.target.value }))} className="h-9" placeholder="https://..." />
                    </div>
                    <div className="col-span-2">
                      <Label className="text-xs font-semibold text-slate-500">Short Description</Label>
                      <Textarea value={eventForm.description} onChange={(e) => setEventForm(p => ({ ...p, description: e.target.value }))} rows={3} placeholder="Brief event description for listing cards..." />
                    </div>
                    <div className="col-span-2">
                      <Label className="text-xs font-semibold text-slate-500">Full Content (HTML)</Label>
                      <Textarea value={eventForm.content} onChange={(e) => setEventForm(p => ({ ...p, content: e.target.value }))} rows={8} placeholder="<p>Full event details...</p><h2>What You'll Learn</h2><ul><li>...</li></ul>" />
                      <p className="text-[10px] text-slate-400 mt-1">Supports HTML: &lt;p&gt;, &lt;h2&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, etc.</p>
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={eventForm.is_published}
                        onChange={(e) => setEventForm(p => ({ ...p, is_published: e.target.checked }))}
                        className="rounded"
                      />
                      <Label className="text-xs font-semibold text-slate-500">Published</Label>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={handleSaveEvent}
                      disabled={saveEventMutation.isPending}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-9"
                    >
                      {saveEventMutation.isPending ? <RefreshCw className="w-3.5 h-3.5 animate-spin mr-1" /> : <Save className="w-3.5 h-3.5 mr-1" />}
                      {editingEvent ? "Update Event" : "Create Event"}
                    </Button>
                    <Button variant="outline" onClick={resetEventForm} className="h-9">Cancel</Button>
                  </div>
                </div>
              )}

              {/* Events List */}
              {eventsLoading ? (
                <div className="flex items-center justify-center py-20">
                  <RefreshCw className="w-6 h-6 text-slate-400 animate-spin" />
                </div>
              ) : events.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                  <CalendarDays className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="font-medium text-slate-500">No events yet</p>
                  <p className="text-sm text-slate-400">Create your first event above.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {events.map((event) => {
                    const eventDate = new Date(event.date);
                    const isPast = eventDate < new Date();
                    return (
                      <div key={event.id} className={`bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow ${isPast ? "opacity-60" : ""}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                event.category === "AI & Technology" ? "bg-blue-100 text-blue-700" :
                                event.category === "Leadership" ? "bg-green-100 text-green-700" :
                                "bg-amber-100 text-amber-700"
                              }`}>
                                {event.category}
                              </span>
                              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                event.type === "virtual" ? "bg-blue-50 text-blue-600" : "bg-orange-50 text-orange-600"
                              }`}>
                                {event.type === "virtual" ? "Virtual" : "In-Person"}
                              </span>
                              {!event.is_published && (
                                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">Draft</span>
                              )}
                              {isPast && (
                                <span className="text-xs font-medium text-slate-400">Past</span>
                              )}
                            </div>
                            <h3 className="font-semibold text-slate-900 mb-1">{event.title}</h3>
                            <div className="flex items-center gap-3 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <CalendarDays className="w-3 h-3" />
                                {eventDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {eventDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })} - {event.end_time}
                              </span>
                              {event.type !== "virtual" && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {event.location}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-1 ml-4">
                            <button
                              onClick={() => openEditEvent(event)}
                              className="p-1.5 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => { if (confirm("Delete this event?")) deleteEventMutation.mutate(event.id); }}
                              className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : activeView === "site-pages" ? (
          /* Site Pages View — admin-managed dynamic pages */
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Site Pages</h2>
                  <p className="text-sm text-slate-500">
                    {cmsPages.length} custom page{cmsPages.length !== 1 ? "s" : ""}. Add new URLs (e.g. /our-impact) that admins can edit.
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => { resetPageForm(); setPageForm(p => ({ ...p, display_order: cmsPages.length + 1 })); setShowPageForm(true); }}
                  className="h-8 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> New Page
                </Button>
              </div>

              {showPageForm && (
                <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">{editingPage ? "Edit Page" : "New Page"}</h3>
                    <button onClick={resetPageForm} className="p-1 rounded hover:bg-slate-100"><X className="w-4 h-4" /></button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label className="text-xs font-semibold text-slate-500">Page Title *</Label>
                      <Input
                        value={pageForm.title}
                        onChange={(e) => {
                          const title = e.target.value;
                          setPageForm(p => ({
                            ...p,
                            title,
                            slug: editingPage ? p.slug : generateSlug(title),
                            nav_label: p.nav_label || title,
                          }));
                        }}
                        className="h-9"
                        placeholder="e.g., Our Impact"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-slate-500">URL Slug *</Label>
                      <Input
                        value={pageForm.slug}
                        onChange={(e) => setPageForm(p => ({ ...p, slug: e.target.value }))}
                        className="h-9"
                        placeholder="our-impact"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Will be: /{pageForm.slug || "your-slug"}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-slate-500">Navigation Label</Label>
                      <Input
                        value={pageForm.nav_label}
                        onChange={(e) => setPageForm(p => ({ ...p, nav_label: e.target.value }))}
                        className="h-9"
                        placeholder="Defaults to title"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label className="text-xs font-semibold text-slate-500">Meta Description</Label>
                      <Textarea
                        value={pageForm.meta_description}
                        onChange={(e) => setPageForm(p => ({ ...p, meta_description: e.target.value }))}
                        rows={2}
                        placeholder="Short SEO description (under 160 characters)"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-slate-500">Display Order</Label>
                      <Input
                        type="number"
                        value={pageForm.display_order}
                        onChange={(e) => setPageForm(p => ({ ...p, display_order: parseInt(e.target.value) || 0 }))}
                        className="h-9"
                      />
                    </div>
                    <div className="space-y-2 pt-5">
                      <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
                        <input type="checkbox" checked={pageForm.show_in_header} onChange={(e) => setPageForm(p => ({ ...p, show_in_header: e.target.checked }))} className="rounded" />
                        Show in header nav
                      </label>
                      <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
                        <input type="checkbox" checked={pageForm.show_in_footer} onChange={(e) => setPageForm(p => ({ ...p, show_in_footer: e.target.checked }))} className="rounded" />
                        Show in footer
                      </label>
                      <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
                        <input type="checkbox" checked={pageForm.is_published} onChange={(e) => setPageForm(p => ({ ...p, is_published: e.target.checked }))} className="rounded" />
                        Published
                      </label>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-xs text-blue-700">
                    💡 After creating, edit the page's text and images from the <strong>Pages</strong> tab. The new slug will appear there as a tab.
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button onClick={handleSavePage} disabled={savePageMutation.isPending} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-9">
                      {savePageMutation.isPending ? <RefreshCw className="w-3.5 h-3.5 animate-spin mr-1" /> : <Save className="w-3.5 h-3.5 mr-1" />}
                      {editingPage ? "Update Page" : "Create Page"}
                    </Button>
                    <Button variant="outline" onClick={resetPageForm} className="h-9">Cancel</Button>
                  </div>
                </div>
              )}

              {cmsPagesLoading ? (
                <div className="flex items-center justify-center py-20"><RefreshCw className="w-6 h-6 text-slate-400 animate-spin" /></div>
              ) : cmsPages.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                  <Layout className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="font-medium text-slate-500">No custom pages yet</p>
                  <p className="text-sm text-slate-400">Create a page to add a new URL like /our-impact.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cmsPages.map((p) => (
                    <div key={p.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Layout className="w-4 h-4 text-blue-600" />
                            <h3 className="font-semibold text-slate-900">{p.title}</h3>
                            {!p.is_published && <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">Draft</span>}
                            {p.show_in_header && <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600">Header</span>}
                            {p.show_in_footer && <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-green-50 text-green-600">Footer</span>}
                          </div>
                          <p className="text-xs text-slate-400 font-mono mb-1">/{p.slug}</p>
                          {p.meta_description && <p className="text-sm text-slate-500 line-clamp-2">{p.meta_description}</p>}
                        </div>
                        <div className="flex gap-1 ml-4">
                          <button onClick={() => window.open(`/${p.slug}`, "_blank")} className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors" title="View">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => openEditPage(p)} className="p-1.5 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="Edit">
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => { if (confirm(`Delete page /${p.slug}? Its content blocks will remain in the database.`)) deletePageMutation.mutate(p.id); }} className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Delete">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : activeView === "downloads" ? (
          /* Downloads View */
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Free Downloads</h2>
                  <p className="text-sm text-slate-500">{downloads.length} resource{downloads.length !== 1 ? "s" : ""}</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => { resetDownloadForm(); setDownloadForm(p => ({ ...p, display_order: downloads.length + 1 })); setShowDownloadForm(true); }}
                  className="h-8 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  New Download
                </Button>
              </div>

              {showDownloadForm && (
                <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">{editingDownload ? "Edit Download" : "New Download"}</h3>
                    <button onClick={resetDownloadForm} className="p-1 rounded hover:bg-slate-100"><X className="w-4 h-4" /></button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs font-semibold text-slate-500">Title *</Label>
                      <Input value={downloadForm.title} onChange={(e) => setDownloadForm(p => ({ ...p, title: e.target.value }))} className="h-9" placeholder="Resource title" />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-slate-500">Description</Label>
                      <Textarea value={downloadForm.description} onChange={(e) => setDownloadForm(p => ({ ...p, description: e.target.value }))} rows={3} placeholder="Brief description of the resource..." />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold text-slate-500">File URL / Path *</Label>
                      <Input value={downloadForm.file_url} onChange={(e) => setDownloadForm(p => ({ ...p, file_url: e.target.value }))} className="h-9" placeholder="/downloads/my-file.pdf or https://..." />
                      <p className="text-[10px] text-slate-400 mt-1">Local path (e.g. /downloads/file.pdf) or external URL</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs font-semibold text-slate-500">Display Order</Label>
                        <Input type="number" value={downloadForm.display_order} onChange={(e) => setDownloadForm(p => ({ ...p, display_order: parseInt(e.target.value) || 0 }))} className="h-9" />
                      </div>
                      <div className="flex items-end gap-2 pb-1">
                        <input type="checkbox" checked={downloadForm.is_published} onChange={(e) => setDownloadForm(p => ({ ...p, is_published: e.target.checked }))} className="rounded" />
                        <Label className="text-xs font-semibold text-slate-500">Published</Label>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button onClick={handleSaveDownload} disabled={saveDownloadMutation.isPending} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-9">
                      {saveDownloadMutation.isPending ? <RefreshCw className="w-3.5 h-3.5 animate-spin mr-1" /> : <Save className="w-3.5 h-3.5 mr-1" />}
                      {editingDownload ? "Update" : "Create"}
                    </Button>
                    <Button variant="outline" onClick={resetDownloadForm} className="h-9">Cancel</Button>
                  </div>
                </div>
              )}

              {downloadsLoading ? (
                <div className="flex items-center justify-center py-20"><RefreshCw className="w-6 h-6 text-slate-400 animate-spin" /></div>
              ) : downloads.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                  <Download className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="font-medium text-slate-500">No downloads yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {downloads.map((dl) => (
                    <div key={dl.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <FileText className="w-4 h-4 text-green-600" />
                            <h3 className="font-semibold text-slate-900">{dl.title}</h3>
                            {!dl.is_published && <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">Draft</span>}
                          </div>
                          <p className="text-sm text-slate-500 mb-1 line-clamp-2">{dl.description}</p>
                          <p className="text-xs text-slate-400 font-mono">{dl.file_url}</p>
                        </div>
                        <div className="flex gap-1 ml-4">
                          <button onClick={() => openEditDownload(dl)} className="p-1.5 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="Edit">
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => { if (confirm("Delete this download?")) deleteDownloadMutation.mutate(dl.id); }} className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Delete">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : activeView === "seo" ? (
          <SeoAeoPanel />
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
                          </button>

                          {isExpanded && (
                            <div className="px-4 pb-4 space-y-4">
                              {[...content].sort((a, b) => (keyOrder[a.content_key] ?? 50) - (keyOrder[b.content_key] ?? 50)).map((item) => (
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
      {/* Temp Password Dialog */}
      {tempPasswordInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-2 mb-4">
              <Key className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-bold text-slate-900">Temporary Password</h3>
            </div>
            <p className="text-sm text-slate-600 mb-3">
              A temporary password was created for <strong>{tempPasswordInfo.email}</strong>. Copy it and send it to them so they can log in.
            </p>
            <div className="flex items-center gap-2 mb-4">
              <code className="flex-1 bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono select-all">
                {tempPasswordInfo.password}
              </code>
              <Button
                size="sm"
                variant="outline"
                className="h-9"
                onClick={() => {
                  navigator.clipboard.writeText(tempPasswordInfo.password);
                  toast.success("Password copied!");
                }}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-amber-600 mb-4">⚠️ This password will not be shown again. They should change it after logging in.</p>
            <Button className="w-full" onClick={() => setTempPasswordInfo(null)}>Done</Button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
