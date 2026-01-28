import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Users,
  Settings
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

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPage, setSelectedPage] = useState<string>("all");
  const [newContent, setNewContent] = useState({ page: "", section: "", key: "", value: "" });
  const [newImage, setNewImage] = useState({ page: "", section: "", key: "", url: "", alt: "" });
  const [editingContent, setEditingContent] = useState<Record<string, string>>({});
  const [showAddContent, setShowAddContent] = useState(false);
  const [showAddImage, setShowAddImage] = useState(false);
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

      // Check if user is admin
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
      async (event, session) => {
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

  const handleSaveContent = async (item: ContentItem) => {
    const newValue = editingContent[item.id];
    if (newValue === undefined || newValue === item.content_value) return;

    try {
      await updateContent.mutateAsync({
        page: item.page,
        section: item.section,
        key: item.content_key,
        value: newValue,
      });
      toast.success("Content saved!");
      refetchContent();
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

  const handleImageUpload = async (file: File, imageItem?: ImageItem) => {
    const path = `${Date.now()}-${file.name}`;
    
    try {
      const publicUrl = await uploadImage.mutateAsync({ file, path });
      
      if (imageItem) {
        await updateImage.mutateAsync({
          page: imageItem.page,
          section: imageItem.section,
          key: imageItem.image_key,
          url: publicUrl,
          altText: imageItem.alt_text || undefined,
        });
        toast.success("Image updated!");
        refetchImages();
      } else {
        setNewImage(prev => ({ ...prev, url: publicUrl }));
      }
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

  const handleDeleteContent = async (item: ContentItem) => {
    if (!confirm("Are you sure you want to delete this content?")) return;
    
    try {
      const { error } = await supabase
        .from("site_content")
        .delete()
        .eq("id", item.id);
      
      if (error) throw error;
      toast.success("Content deleted");
      refetchContent();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDeleteImage = async (item: ImageItem) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    
    try {
      const { error } = await supabase
        .from("site_images")
        .delete()
        .eq("id", item.id);
      
      if (error) throw error;
      toast.success("Image deleted");
      refetchImages();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // Get unique pages for filtering
  const pages = Array.from(new Set([
    ...(allContent?.map(c => c.page) || []),
    ...(allImages?.map(i => i.page) || [])
  ])).sort();

  // Filter content based on search and page
  const filteredContent = allContent?.filter(item => {
    const matchesSearch = searchTerm === "" || 
      item.page.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content_key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content_value.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPage = selectedPage === "all" || item.page === selectedPage;
    return matchesSearch && matchesPage;
  });

  const filteredImages = allImages?.filter(item => {
    const matchesSearch = searchTerm === "" || 
      item.page.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.image_key.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPage = selectedPage === "all" || item.page === selectedPage;
    return matchesSearch && matchesPage;
  });

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
              <p className="text-sm text-muted-foreground">Edit your website content</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              <Home className="w-4 h-4 mr-2" />
              View Site
            </Button>
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedPage === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPage("all")}
              >
                All Pages
              </Button>
              {pages.map(page => (
                <Button
                  key={page}
                  variant={selectedPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPage(page)}
                >
                  {page}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="text" className="space-y-6">
          <TabsList className="bg-white border border-gray-200">
            <TabsTrigger value="text" className="gap-2">
              <FileText className="w-4 h-4" />
              Text Content ({filteredContent?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="images" className="gap-2">
              <ImageIcon className="w-4 h-4" />
              Images ({filteredImages?.length || 0})
            </TabsTrigger>
          </TabsList>

          {/* Text Content Tab */}
          <TabsContent value="text" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-aces-navy">Text Content</h2>
              <Button onClick={() => setShowAddContent(true)} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Content
              </Button>
            </div>

            {showAddContent && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold mb-4">Add New Content</h3>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label>Page</Label>
                    <Input
                      placeholder="e.g., home, about, services"
                      value={newContent.page}
                      onChange={(e) => setNewContent(prev => ({ ...prev, page: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Section</Label>
                    <Input
                      placeholder="e.g., hero, cta, features"
                      value={newContent.section}
                      onChange={(e) => setNewContent(prev => ({ ...prev, section: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Key</Label>
                    <Input
                      placeholder="e.g., title, description, button"
                      value={newContent.key}
                      onChange={(e) => setNewContent(prev => ({ ...prev, key: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <Label>Content</Label>
                  <Textarea
                    placeholder="Enter the content..."
                    value={newContent.value}
                    onChange={(e) => setNewContent(prev => ({ ...prev, value: e.target.value }))}
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddContent} disabled={updateContent.isPending}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddContent(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {contentLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-aces-blue mx-auto" />
              </div>
            ) : filteredContent?.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-aces-navy mb-2">No Content Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start by adding your first piece of content
                </p>
                <Button onClick={() => setShowAddContent(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Content
                </Button>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredContent?.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-aces-blue/10 text-aces-blue text-xs font-semibold rounded">
                          {item.page}
                        </span>
                        <span className="px-2 py-1 bg-aces-green/10 text-aces-green text-xs font-semibold rounded">
                          {item.section}
                        </span>
                        <span className="text-sm font-medium text-aces-navy">{item.content_key}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDeleteContent(item)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <Textarea
                      value={editingContent[item.id] ?? item.content_value}
                      onChange={(e) => setEditingContent(prev => ({ ...prev, [item.id]: e.target.value }))}
                      rows={3}
                      className="mb-3"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Updated: {new Date(item.updated_at).toLocaleDateString()}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => handleSaveContent(item)}
                        disabled={
                          updateContent.isPending || 
                          editingContent[item.id] === undefined ||
                          editingContent[item.id] === item.content_value
                        }
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Images Tab */}
          <TabsContent value="images" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-aces-navy">Images</h2>
              <Button onClick={() => setShowAddImage(true)} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Image
              </Button>
            </div>

            {showAddImage && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold mb-4">Add New Image</h3>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label>Page</Label>
                    <Input
                      placeholder="e.g., home, about, services"
                      value={newImage.page}
                      onChange={(e) => setNewImage(prev => ({ ...prev, page: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Section</Label>
                    <Input
                      placeholder="e.g., hero, team, gallery"
                      value={newImage.section}
                      onChange={(e) => setNewImage(prev => ({ ...prev, section: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Key</Label>
                    <Input
                      placeholder="e.g., background, profile, logo"
                      value={newImage.key}
                      onChange={(e) => setNewImage(prev => ({ ...prev, key: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label>Upload Image</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file);
                      }}
                    />
                  </div>
                  <div>
                    <Label>Or Enter URL</Label>
                    <Input
                      placeholder="https://..."
                      value={newImage.url}
                      onChange={(e) => setNewImage(prev => ({ ...prev, url: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <Label>Alt Text (for accessibility)</Label>
                  <Input
                    placeholder="Describe the image..."
                    value={newImage.alt}
                    onChange={(e) => setNewImage(prev => ({ ...prev, alt: e.target.value }))}
                  />
                </div>
                {newImage.url && (
                  <div className="mb-4">
                    <Label>Preview</Label>
                    <img src={newImage.url} alt="Preview" className="max-h-40 rounded-lg border" />
                  </div>
                )}
                <div className="flex gap-2">
                  <Button onClick={handleAddImage} disabled={updateImage.isPending}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddImage(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {imagesLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-aces-blue mx-auto" />
              </div>
            ) : filteredImages?.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-aces-navy mb-2">No Images Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start by adding your first image
                </p>
                <Button onClick={() => setShowAddImage(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Image
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredImages?.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="aspect-video bg-gray-100 relative group">
                      <img
                        src={item.image_url}
                        alt={item.alt_text || item.image_key}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleImageUpload(file, item);
                            }}
                          />
                          <div className="bg-white text-aces-blue px-3 py-2 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-gray-100">
                            <Upload className="w-4 h-4" />
                            Replace
                          </div>
                        </label>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-aces-blue/10 text-aces-blue text-xs font-semibold rounded">
                          {item.page}
                        </span>
                        <span className="px-2 py-1 bg-aces-green/10 text-aces-green text-xs font-semibold rounded">
                          {item.section}
                        </span>
                      </div>
                      <p className="font-medium text-aces-navy text-sm">{item.image_key}</p>
                      {item.alt_text && (
                        <p className="text-xs text-muted-foreground mt-1 truncate">{item.alt_text}</p>
                      )}
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-muted-foreground">
                          {new Date(item.updated_at).toLocaleDateString()}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                          onClick={() => handleDeleteImage(item)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
