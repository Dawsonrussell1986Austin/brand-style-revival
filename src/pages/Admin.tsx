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
  Search,
  Trash2,
  Upload,
  Home,
  Check,
  X,
  Pencil,
  ChevronDown,
  ChevronRight,
  Type,
  LayoutGrid
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

// Friendly labels for pages and sections
const pageLabels: Record<string, string> = {
  home: "Home Page",
  about: "About Page",
  contact: "Contact Page",
  services: "Services Page",
  events: "Events Page",
  resources: "Resources Page",
  "ai-center": "AI Center Page",
};

const sectionLabels: Record<string, string> = {
  hero: "Hero Section",
  cta: "Call to Action",
  services: "Services",
  testimonials: "Testimonials",
  professional_learning: "Professional Learning",
  main: "Main Content",
  info: "Contact Info",
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
  email: "Email Address",
  phone: "Phone Number",
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
  ai_center_description: "AI Center Description",
  collaborative_description: "Collaborative Partnership",
  mission_description: "Mission Statement",
};

function getLabel(map: Record<string, string>, key: string): string {
  return map[key] || key.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

// Inline editable text block
function EditableTextBlock({ item, onSave, onDelete }: { 
  item: ContentItem; 
  onSave: (item: ContentItem, newValue: string) => Promise<void>;
  onDelete: (item: ContentItem) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(item.content_value);
  const [saving, setSaving] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setValue(item.content_value);
  }, [item.content_value]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (value === item.content_value) {
      setIsEditing(false);
      return;
    }
    setSaving(true);
    await onSave(item, value);
    setSaving(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setValue(item.content_value);
    setIsEditing(false);
  };

  const isShortText = item.content_value.length < 80;

  return (
    <div 
      className={`group relative rounded-xl border transition-all duration-200 ${
        isEditing 
          ? "border-aces-blue bg-white shadow-lg ring-2 ring-aces-blue/20" 
          : "border-gray-200 bg-white hover:border-aces-blue/40 hover:shadow-md cursor-pointer"
      }`}
      onClick={() => !isEditing && setIsEditing(true)}
    >
      {/* Label bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Type className="w-3.5 h-3.5 text-aces-blue/60" />
          <span className="text-xs font-semibold text-aces-blue/70 uppercase tracking-wide">
            {getLabel(keyLabels, item.content_key)}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {!isEditing && (
            <Pencil className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
          {isEditing && (
            <>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0 text-red-400 hover:text-red-600 hover:bg-red-50"
                onClick={(e) => { e.stopPropagation(); onDelete(item); }}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-3">
        {isEditing ? (
          <div onClick={(e) => e.stopPropagation()}>
            {isShortText ? (
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="text-base font-medium border-0 shadow-none p-0 h-auto focus-visible:ring-0"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSave();
                  if (e.key === "Escape") handleCancel();
                }}
              />
            ) : (
              <Textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
                className="text-base font-medium border-0 shadow-none p-0 resize-none focus-visible:ring-0 min-h-[60px]"
                onKeyDown={(e) => {
                  if (e.key === "Escape") handleCancel();
                }}
              />
            )}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
              <Button 
                size="sm" 
                onClick={handleSave} 
                disabled={saving || value === item.content_value}
                className="bg-aces-blue hover:bg-aces-blue/90 text-white h-8 px-4 text-xs"
              >
                {saving ? (
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white" />
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5 mr-1" />
                    Save
                  </>
                )}
              </Button>
              <Button size="sm" variant="ghost" onClick={handleCancel} className="h-8 px-3 text-xs">
                <X className="w-3.5 h-3.5 mr-1" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <p className={`text-foreground leading-relaxed ${isShortText ? "text-lg font-semibold" : "text-base font-medium"}`}>
            {item.content_value}
          </p>
        )}
      </div>
    </div>
  );
}

// Image block with click to replace
function EditableImageBlock({ item, onUpload, onDelete }: {
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
    <div className="group relative rounded-xl border border-gray-200 bg-white hover:border-aces-blue/40 hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Label bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-3.5 h-3.5 text-aces-green/60" />
          <span className="text-xs font-semibold text-aces-green/70 uppercase tracking-wide">
            {getLabel(keyLabels, item.image_key)}
          </span>
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="h-7 w-7 p-0 text-red-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => onDelete(item)}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* Image */}
      <div 
        className="relative aspect-video cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <img
          src={item.image_url}
          alt={item.alt_text || item.image_key}
          className="w-full h-full object-cover"
        />
        
        {/* Hover overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${
          uploading ? "bg-black/60 opacity-100" : "bg-black/40 opacity-0 group-hover:opacity-100"
        }`}>
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
              <span className="text-white text-sm font-medium">Uploading...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-white">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Upload className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium">Click to replace</span>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Alt text */}
      {item.alt_text && (
        <div className="px-4 py-2 border-t border-gray-100">
          <p className="text-xs text-muted-foreground truncate">Alt: {item.alt_text}</p>
        </div>
      )}
    </div>
  );
}

// Section group component
function SectionGroup({ 
  sectionKey, 
  contentItems, 
  imageItems,
  onSaveContent,
  onDeleteContent,
  onUploadImage,
  onDeleteImage,
}: {
  sectionKey: string;
  contentItems: ContentItem[];
  imageItems: ImageItem[];
  onSaveContent: (item: ContentItem, newValue: string) => Promise<void>;
  onDeleteContent: (item: ContentItem) => void;
  onUploadImage: (file: File, item: ImageItem) => Promise<void>;
  onDeleteImage: (item: ImageItem) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const totalItems = contentItems.length + imageItems.length;

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50/50 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-100/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {isOpen ? (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          )}
          <h3 className="text-base font-bold text-aces-navy">
            {getLabel(sectionLabels, sectionKey)}
          </h3>
          <span className="text-xs font-medium text-muted-foreground bg-gray-200 px-2 py-0.5 rounded-full">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 space-y-3">
          {/* Text content */}
          {contentItems.map((item) => (
            <EditableTextBlock
              key={item.id}
              item={item}
              onSave={onSaveContent}
              onDelete={onDeleteContent}
            />
          ))}

          {/* Images */}
          {imageItems.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-3">
              {imageItems.map((item) => (
                <EditableImageBlock
                  key={item.id}
                  item={item}
                  onUpload={onUploadImage}
                  onDelete={onDeleteImage}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPage, setSelectedPage] = useState<string>("all");
  const [showAddContent, setShowAddContent] = useState(false);
  const [showAddImage, setShowAddImage] = useState(false);
  const [newContent, setNewContent] = useState({ page: "", section: "", key: "", value: "" });
  const [newImage, setNewImage] = useState({ page: "", section: "", key: "", url: "", alt: "" });
  const navigate = useNavigate();

  const { data: allContent, isLoading: contentLoading, refetch: refetchContent } = useAllContent();
  const { data: allImages, isLoading: imagesLoading, refetch: refetchImages } = useAllImages();
  const updateContent = useUpdateContent();
  const updateImage = useUpdateImage();
  const uploadImage = useUploadImage();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        navigate("/admin/auth");
        return;
      }

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .in("role", ["admin", "editor"]);

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
      async (event) => {
        if (event === "SIGNED_OUT") {
          navigate("/admin/auth");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/auth");
  };

  const handleSaveContent = async (item: ContentItem, newValue: string) => {
    try {
      await updateContent.mutateAsync({
        page: item.page,
        section: item.section,
        key: item.content_key,
        value: newValue,
      });
      toast.success("Saved!");
      refetchContent();
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
        page: imageItem.page,
        section: imageItem.section,
        key: imageItem.image_key,
        url: publicUrl,
        altText: imageItem.alt_text || undefined,
      });
      toast.success("Image updated!");
      refetchImages();
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
      toast.error("Please fill all fields");
      return;
    }
    try {
      await updateContent.mutateAsync({
        page: newContent.page,
        section: newContent.section,
        key: newContent.key,
        value: newContent.value,
      });
      toast.success("Content added!");
      setNewContent({ page: "", section: "", key: "", value: "" });
      setShowAddContent(false);
      refetchContent();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleAddImage = async () => {
    if (!newImage.page || !newImage.section || !newImage.key || !newImage.url) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      await updateImage.mutateAsync({
        page: newImage.page,
        section: newImage.section,
        key: newImage.key,
        url: newImage.url,
        altText: newImage.alt,
      });
      toast.success("Image added!");
      setNewImage({ page: "", section: "", key: "", url: "", alt: "" });
      setShowAddImage(false);
      refetchImages();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleNewImageUpload = async (file: File) => {
    const path = `${Date.now()}-${file.name}`;
    try {
      const publicUrl = await uploadImage.mutateAsync({ file, path });
      setNewImage(prev => ({ ...prev, url: publicUrl }));
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // Get unique pages
  const pages = Array.from(new Set([
    ...(allContent?.map(c => c.page) || []),
    ...(allImages?.map(i => i.page) || [])
  ])).sort();

  // Filter
  const filteredContent = allContent?.filter(item => {
    const matchesSearch = searchTerm === "" || 
      item.content_value.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content_key.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPage = selectedPage === "all" || item.page === selectedPage;
    return matchesSearch && matchesPage;
  }) || [];

  const filteredImages = allImages?.filter(item => {
    const matchesSearch = searchTerm === "" || 
      item.image_key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.alt_text || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPage = selectedPage === "all" || item.page === selectedPage;
    return matchesSearch && matchesPage;
  }) || [];

  // Group by page, then by section
  const groupedByPage = new Map<string, Map<string, { content: ContentItem[]; images: ImageItem[] }>>();

  for (const item of filteredContent) {
    if (!groupedByPage.has(item.page)) groupedByPage.set(item.page, new Map());
    const sections = groupedByPage.get(item.page)!;
    if (!sections.has(item.section)) sections.set(item.section, { content: [], images: [] });
    sections.get(item.section)!.content.push(item);
  }

  for (const item of filteredImages) {
    if (!groupedByPage.has(item.page)) groupedByPage.set(item.page, new Map());
    const sections = groupedByPage.get(item.page)!;
    if (!sections.has(item.section)) sections.set(item.section, { content: [], images: [] });
    sections.get(item.section)!.images.push(item);
  }

  const isLoading = contentLoading || imagesLoading;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-aces-blue" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={acesLogo} alt="ACES" className="h-10" />
            <div>
              <h1 className="font-bold text-xl text-aces-navy">Content Manager</h1>
              <p className="text-sm text-muted-foreground">Click any text or image to edit</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              <Home className="w-4 h-4 mr-2" />
              View Site
            </Button>
            <span className="text-sm text-muted-foreground hidden md:inline">{user.email}</span>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto p-6">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedPage === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPage("all")}
              className={selectedPage === "all" ? "bg-aces-blue hover:bg-aces-blue/90" : ""}
            >
              All Pages
            </Button>
            {pages.map(page => (
              <Button
                key={page}
                variant={selectedPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPage(page)}
                className={selectedPage === page ? "bg-aces-blue hover:bg-aces-blue/90" : ""}
              >
                {getLabel(pageLabels, page)}
              </Button>
            ))}
          </div>
        </div>

        {/* Add buttons */}
        <div className="flex gap-2 mb-6">
          <Button size="sm" variant="outline" onClick={() => setShowAddContent(true)}>
            <Plus className="w-4 h-4 mr-1" />
            Add Text
          </Button>
          <Button size="sm" variant="outline" onClick={() => setShowAddImage(true)}>
            <Plus className="w-4 h-4 mr-1" />
            Add Image
          </Button>
        </div>

        {/* Add Content Form */}
        {showAddContent && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
            <h3 className="font-semibold text-aces-navy mb-4">Add New Text Content</h3>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label>Page</Label>
                <Input placeholder="e.g., home, about" value={newContent.page} onChange={(e) => setNewContent(prev => ({ ...prev, page: e.target.value }))} />
              </div>
              <div>
                <Label>Section</Label>
                <Input placeholder="e.g., hero, cta" value={newContent.section} onChange={(e) => setNewContent(prev => ({ ...prev, section: e.target.value }))} />
              </div>
              <div>
                <Label>Key</Label>
                <Input placeholder="e.g., title, subtitle" value={newContent.key} onChange={(e) => setNewContent(prev => ({ ...prev, key: e.target.value }))} />
              </div>
            </div>
            <div className="mb-4">
              <Label>Content</Label>
              <Textarea placeholder="Enter the content..." value={newContent.value} onChange={(e) => setNewContent(prev => ({ ...prev, value: e.target.value }))} rows={3} />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddContent} disabled={updateContent.isPending} className="bg-aces-blue hover:bg-aces-blue/90">
                <Save className="w-4 h-4 mr-2" /> Save
              </Button>
              <Button variant="outline" onClick={() => setShowAddContent(false)}>Cancel</Button>
            </div>
          </div>
        )}

        {/* Add Image Form */}
        {showAddImage && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
            <h3 className="font-semibold text-aces-navy mb-4">Add New Image</h3>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label>Page</Label>
                <Input placeholder="e.g., home, about" value={newImage.page} onChange={(e) => setNewImage(prev => ({ ...prev, page: e.target.value }))} />
              </div>
              <div>
                <Label>Section</Label>
                <Input placeholder="e.g., hero, team" value={newImage.section} onChange={(e) => setNewImage(prev => ({ ...prev, section: e.target.value }))} />
              </div>
              <div>
                <Label>Key</Label>
                <Input placeholder="e.g., background, logo" value={newImage.key} onChange={(e) => setNewImage(prev => ({ ...prev, key: e.target.value }))} />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label>Upload Image</Label>
                <Input type="file" accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleNewImageUpload(file); }} />
              </div>
              <div>
                <Label>Or Enter URL</Label>
                <Input placeholder="https://..." value={newImage.url} onChange={(e) => setNewImage(prev => ({ ...prev, url: e.target.value }))} />
              </div>
            </div>
            <div className="mb-4">
              <Label>Alt Text</Label>
              <Input placeholder="Describe the image..." value={newImage.alt} onChange={(e) => setNewImage(prev => ({ ...prev, alt: e.target.value }))} />
            </div>
            {newImage.url && (
              <div className="mb-4">
                <img src={newImage.url} alt="Preview" className="max-h-40 rounded-lg border" />
              </div>
            )}
            <div className="flex gap-2">
              <Button onClick={handleAddImage} disabled={updateImage.isPending} className="bg-aces-blue hover:bg-aces-blue/90">
                <Save className="w-4 h-4 mr-2" /> Save
              </Button>
              <Button variant="outline" onClick={() => setShowAddImage(false)}>Cancel</Button>
            </div>
          </div>
        )}

        {/* Content Grid - Grouped by Page > Section */}
        {isLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-aces-blue mx-auto mb-4" />
            <p className="text-muted-foreground">Loading content...</p>
          </div>
        ) : groupedByPage.size === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
            <LayoutGrid className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-bold text-xl text-aces-navy mb-2">No Content Yet</h3>
            <p className="text-muted-foreground mb-6">Start adding text and images to manage your site content</p>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => setShowAddContent(true)} className="bg-aces-blue hover:bg-aces-blue/90">
                <FileText className="w-4 h-4 mr-2" /> Add Text
              </Button>
              <Button variant="outline" onClick={() => setShowAddImage(true)}>
                <ImageIcon className="w-4 h-4 mr-2" /> Add Image
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {Array.from(groupedByPage.entries())
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([pageKey, sections]) => (
                <div key={pageKey}>
                  {/* Page Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-aces-blue flex items-center justify-center">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-aces-navy">
                      {getLabel(pageLabels, pageKey)}
                    </h2>
                    <div className="flex-1 border-t border-gray-200" />
                  </div>

                  {/* Sections */}
                  <div className="space-y-4 ml-4">
                    {Array.from(sections.entries())
                      .sort(([a], [b]) => a.localeCompare(b))
                      .map(([sectionKey, { content, images }]) => (
                        <SectionGroup
                          key={sectionKey}
                          sectionKey={sectionKey}
                          contentItems={content}
                          imageItems={images}
                          onSaveContent={handleSaveContent}
                          onDeleteContent={handleDeleteContent}
                          onUploadImage={handleImageUpload}
                          onDeleteImage={handleDeleteImage}
                        />
                      ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
