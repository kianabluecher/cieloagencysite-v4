import { useState, useEffect, useRef, useCallback } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  ArrowLeft,
  Upload,
  Plus,
  Trash2,
  Edit,
  Loader2,
  Save,
  X,
  GripVertical
} from "lucide-react";
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
  type Project,
} from "../../utils/portfolio-api";
import {
  projectId,
  publicAnonKey,
} from "../../utils/supabase/info";
import { toast } from "sonner@2.0.3";

interface PortfolioAdminProps {
  onNavigate?: (page: string) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const ItemType = {
  IMAGE: 'image',
};

const SortableImage = ({ 
  url, 
  index, 
  moveImage, 
  removeImage,
  isCover,
  setCover
}: { 
  url: string; 
  index: number; 
  moveImage: (dragIndex: number, hoverIndex: number) => void;
  removeImage: (index: number) => void;
  isCover: boolean;
  setCover: (url: string) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const [{ handlerId }, drop] = useDrop({
    accept: ItemType.IMAGE,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      
      // Get horizontal middle
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      
      // Get pixels to the left
      const hoverClientX = clientOffset!.x - hoverBoundingRect.left;

      // Only perform the move when the mouse has crossed half of the items height or width
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      
      // Note: This is a simplified check, for a grid it might be jumpy without more complex logic,
      // but standard list logic often suffices if items are uniform.
      
      moveImage(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType.IMAGE,
    item: () => {
      return { id: url, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      className={`relative group bg-[#1a1a1a] rounded-lg border overflow-hidden ${isCover ? 'border-yellow-500 ring-1 ring-yellow-500' : 'border-[#2a2a2a]'} ${isDragging ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
        <button
          type="button"
          onClick={() => setCover(url)}
          className={`p-1 rounded transition-colors ${isCover ? 'bg-yellow-500 text-black' : 'bg-black/80 text-white hover:bg-yellow-500 hover:text-black'}`}
          title="Set as Cover Image"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={isCover ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </button>
        <button
          type="button"
          onClick={() => removeImage(index)}
          className="p-1 bg-black/80 text-white rounded hover:bg-red-500/80 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
      <div className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
         <div className="p-1 bg-black/50 text-white rounded">
            <GripVertical size={16} />
         </div>
      </div>
      {isCover && (
        <div className="absolute bottom-0 left-0 right-0 bg-yellow-500/90 text-black text-xs font-bold px-2 py-1 text-center">
          COVER IMAGE
        </div>
      )}
      <img
        src={url}
        alt={`Gallery image ${index + 1}`}
        className="w-full h-32 object-cover"
      />
    </div>
  );
};

export function PortfolioAdmin({
  onNavigate,
}: PortfolioAdminProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] =
    useState<Partial<Project> | null>(null);
  const [uploadingImages, setUploadingImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (editingProject?.title && !editingProject.slug) {
      const slug = editingProject.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setEditingProject(prev => prev ? ({ ...prev, slug }) : null);
    }
  }, [editingProject?.title]);

  async function loadProjects() {
    try {
      setLoading(true);
      const fetchedProjects = await getAllProjects();
      setProjects(fetchedProjects);
    } catch (error) {
      console.error("Error loading projects:", error);
    } finally {
      setLoading(false);
    }
  }

  async function uploadFiles(files: FileList | File[]) {
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      const uploadedUrls: string[] = [];

      for (const file of Array.from(files)) {
        // Basic validation
        if (!file.type.startsWith('image/')) {
            toast.error(`File ${file.name} is not an image`);
            continue;
        }

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/portfolio/upload`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${publicAnonKey}`,
            },
            body: formData,
          },
        );

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const data = await response.json();
        uploadedUrls.push(data.url);
      }

      setUploadingImages((prev) => [...prev, ...uploadedUrls]);
      if (uploadedUrls.length > 0) {
        toast.success(`Successfully uploaded ${uploadedUrls.length} image(s)!`);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload one or more images");
    } finally {
      setUploading(false);
    }
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
        uploadFiles(e.target.files);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        uploadFiles(e.dataTransfer.files);
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(false);
  }

  const moveImage = useCallback((dragIndex: number, hoverIndex: number) => {
    setUploadingImages((prevImages) => {
      const newImages = [...prevImages];
      const [draggedImage] = newImages.splice(dragIndex, 1);
      newImages.splice(hoverIndex, 0, draggedImage);
      return newImages;
    });
  }, []);

  const removeImage = useCallback((index: number) => {
    setUploadingImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }, []);

  async function handleSaveProject(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      // Check featured limit before saving
      if (editingProject?.featured) {
        const currentFeaturedCount = projects.filter(p => 
          p.featured && p.id !== editingProject.id
        ).length;
        
        if (currentFeaturedCount >= 4) {
          toast.error("Maximum 4 featured projects allowed", {
            description: "Please unfeature another project first"
          });
          setSaving(false);
          return;
        }
      }

      const projectData = {
        ...editingProject,
        gallery_images: uploadingImages,
        featured_image:
          (editingProject?.featured_image && uploadingImages.includes(editingProject.featured_image))
            ? editingProject.featured_image
            : uploadingImages[0] || editingProject!.featured_image,
        thumbnail:
          (editingProject?.featured_image && uploadingImages.includes(editingProject.featured_image))
            ? editingProject.featured_image
            : uploadingImages[0] || editingProject!.thumbnail,
      } as Project;

      const isUpdate = projects.find(
        (p) => p.id === editingProject!.id,
      );

      if (isUpdate) {
        await updateProject(editingProject!.id!, projectData);
        toast.success("Project updated successfully!");
      } else {
        await createProject(projectData);
        toast.success("Project created successfully!");
      }

      await loadProjects();
      setEditingProject(null);
      setUploadingImages([]);
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error("Failed to save project", {
        description:
          "Check the browser console (F12) for details",
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteProject(id: string) {
    if (
      !confirm("Are you sure you want to delete this project?")
    )
      return;

    try {
      await deleteProject(id);
      await loadProjects();
      toast.success("Project deleted successfully!");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    }
  }

  function startEditProject(project: Project) {
    setEditingProject(project);
    setUploadingImages(project.gallery_images || project.images || []);
  }

  function startNewProject() {
    setEditingProject({
      id: crypto.randomUUID(),
      slug: "",
      title: "",
      excerpt: "",
      description: "",
      client_name: "",
      category: "",
      project_type: "",
      industry: "",
      featured_image: "",
      featured_image_alt: "",
      thumbnail: "",
      gallery_images: [],
      video_url: "",
      challenge: "",
      solution: "",
      results: "",
      technologies: [],
      tags: [],
      live_url: "",
      case_study_url: "",
      github_url: "",
      completion_date: "",
      duration_weeks: 0,
      team_size: 0,
      published: false,
      featured: false,
      status: "draft",
      custom_link_label: "",
      custom_link_url: "",
    });
    setUploadingImages([]);
  }

  return (
    <DndProvider backend={HTML5Backend}>
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="px-6 py-32">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate?.("portfolio")}
                className="flex items-center gap-2 text-[#7d8187] hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-4xl text-white">
                Portfolio Admin
              </h1>
            </div>
            <button
              onClick={startNewProject}
              className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Portfolio
            </button>
          </div>

          {/* Project List */}
          {!editingProject && (
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-16 text-[#7d8187]">
                  Loading Portfolio...
                </div>
              ) : projects.length === 0 ? (
                <div className="text-center py-16 text-[#7d8187]">
                  No Portfolio found
                </div>
              ) : (
                projects.map((project) => (
                  <div
                    key={project.id}
                    className="p-6 border border-[#2a2a2a] rounded-lg flex items-center justify-between hover:border-[#3a3a3a] transition-colors"
                  >
                    <div className="flex items-center gap-6">
                      {(project.featured_image ||
                        project.thumbnail) && (
                        <img
                          src={
                            project.featured_image ||
                            project.thumbnail ||
                            ""
                          }
                          alt={
                            project.featured_image_alt ||
                            project.title
                          }
                          className="w-24 h-24 object-cover rounded"
                        />
                      )}
                      <div>
                        <h3 className="text-xl text-white mb-1">
                          {project.title}
                        </h3>
                        <p className="text-[#7d8187]">
                          {project.excerpt}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <p className="text-[#7d8187] text-sm">
                            {project.category}
                          </p>
                          {project.published && (
                            <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded">
                              Published
                            </span>
                          )}
                          {project.featured && (
                            <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 text-xs rounded">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          startEditProject(project)
                        }
                        className="p-2 text-[#7d8187] hover:text-white transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteProject(project.id)
                        }
                        className="p-2 text-[#7d8187] hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Edit Form */}
          {editingProject && (
            <form
              onSubmit={handleSaveProject}
              className="space-y-8"
            >
              {/* Basic Information */}
              <div>
                <h2 className="text-2xl text-white mb-4">
                  Basic Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-[#7d8187] mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editingProject.title || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          title: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded focus:border-white focus:outline-none transition-colors"
                      placeholder="Project Title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#7d8187] mb-2">
                      Slug
                    </label>
                    <input
                      type="text"
                      value={editingProject.slug || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          slug: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded focus:border-white focus:outline-none transition-colors"
                      placeholder="url-friendly-slug"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-[#7d8187] mb-2">
                      Excerpt
                    </label>
                    <input
                      type="text"
                      value={editingProject.excerpt || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          excerpt: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded focus:border-white focus:outline-none transition-colors"
                      placeholder="Short description for listings"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-[#7d8187] mb-2">
                      Description
                    </label>
                    <textarea
                      value={editingProject.description || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded focus:border-white focus:outline-none transition-colors resize-none"
                      rows={4}
                      placeholder="Full project description"
                    />
                  </div>
                </div>
              </div>

              {/* Client & Classification */}
              <div>
                <h2 className="text-2xl text-white mb-4">
                  Client & Classification
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-[#7d8187] mb-2">
                      Client Name
                    </label>
                    <input
                      type="text"
                      value={editingProject.client_name || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          client_name: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded focus:border-white focus:outline-none transition-colors"
                      placeholder="Client Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#7d8187] mb-2">
                      Category
                    </label>
                    <input
                      type="text"
                      value={editingProject.category || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded focus:border-white focus:outline-none transition-colors"
                      placeholder="e.g. Branding, Web Design"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#7d8187] mb-2">
                      Project Type
                    </label>
                    <input
                      type="text"
                      value={editingProject.project_type || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          project_type: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded focus:border-white focus:outline-none transition-colors"
                      placeholder="e.g. Website, Identity"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#7d8187] mb-2">
                      Industry
                    </label>
                    <input
                      type="text"
                      value={editingProject.industry || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          industry: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded focus:border-white focus:outline-none transition-colors"
                      placeholder="e.g. Technology, Finance"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-[#7d8187] mb-2">
                      Technologies (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={
                        editingProject.technologies?.join(", ") || ""
                      }
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          technologies: e.target.value
                            .split(",")
                            .map((t) => t.trim())
                            .filter(Boolean),
                        })
                      }
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded focus:border-white focus:outline-none transition-colors"
                      placeholder="React, Tailwind, Node.js"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#7d8187] mb-2">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={
                        editingProject.tags?.join(", ") || ""
                      }
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          tags: e.target.value
                            .split(",")
                            .map((t) => t.trim())
                            .filter(Boolean),
                        })
                      }
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded focus:border-white focus:outline-none transition-colors"
                      placeholder="branding, web design, e-commerce"
                    />
                  </div>
                </div>
              </div>

              {/* Links & Actions */}
              <div>
                <h2 className="text-2xl text-white mb-4">
                  Links & Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-[#7d8187] mb-2">
                      Live Site URL
                    </label>
                    <input
                      type="text"
                      value={editingProject.live_url || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          live_url: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded focus:border-white focus:outline-none transition-colors"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#7d8187] mb-2">
                      Case Study URL
                    </label>
                    <input
                      type="text"
                      value={editingProject.case_study_url || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          case_study_url: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded focus:border-white focus:outline-none transition-colors"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#7d8187] mb-2">
                      Custom Button Label (Optional)
                    </label>
                    <input
                      type="text"
                      value={editingProject.custom_link_label || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          custom_link_label: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded focus:border-white focus:outline-none transition-colors"
                      placeholder="e.g. Download PDF"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#7d8187] mb-2">
                      Custom Button URL
                    </label>
                    <input
                      type="text"
                      value={editingProject.custom_link_url || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          custom_link_url: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded focus:border-white focus:outline-none transition-colors"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>

              {/* Status & Visibility */}
              <div className="py-6 border-y border-[#2a2a2a] my-8">
                <div className="flex items-center gap-12">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${editingProject.published ? 'bg-white border-white' : 'border-[#2a2a2a] group-hover:border-white'}`}>
                      {editingProject.published && <span className="text-black text-xs font-bold">✓</span>}
                    </div>
                    <input
                      type="checkbox"
                      checked={editingProject.published || false}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          published: e.target.checked,
                        })
                      }
                      className="hidden"
                    />
                    <span className="text-white font-medium group-hover:text-white/80 transition-colors">Publish to Website</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${editingProject.featured ? 'bg-yellow-500 border-yellow-500' : 'border-[#2a2a2a] group-hover:border-white'}`}>
                      {editingProject.featured && <span className="text-black text-xs font-bold">✓</span>}
                    </div>
                    <input
                      type="checkbox"
                      checked={editingProject.featured || false}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          featured: e.target.checked,
                        })
                      }
                      className="hidden"
                    />
                    <span className="text-white font-medium group-hover:text-white/80 transition-colors">Highlight on Home Page (Max 4)</span>
                  </label>
                </div>
              </div>

              {/* Media */}
              <div>
                <h2 className="text-2xl text-white mb-4">
                  Media
                </h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-[#7d8187] mb-2">
                        Featured Image URL
                      </label>
                      <input
                        type="text"
                        value={
                          editingProject.featured_image || ""
                        }
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            featured_image: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded focus:border-white focus:outline-none transition-colors"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#7d8187] mb-2">
                        Featured Image Alt Text
                      </label>
                      <input
                        type="text"
                        value={
                          editingProject.featured_image_alt ||
                          ""
                        }
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            featured_image_alt: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded focus:border-white focus:outline-none transition-colors"
                        placeholder="Description for accessibility"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#7d8187] mb-2">
                        Thumbnail URL
                      </label>
                      <input
                        type="text"
                        value={editingProject.thumbnail || ""}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            thumbnail: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded focus:border-white focus:outline-none transition-colors"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#7d8187] mb-2">
                        Video URL
                      </label>
                      <input
                        type="text"
                        value={editingProject.video_url || ""}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            video_url: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded focus:border-white focus:outline-none transition-colors"
                        placeholder="https://youtube.com/..."
                      />
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm text-[#7d8187] mb-2">
                      Gallery Images (Drag to reorder, Drop to upload)
                    </label>
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      className={`
                        w-full px-4 py-8 border-2 border-dashed rounded transition-colors
                        ${isDragOver ? 'border-white bg-[#1a1a1a]' : 'border-[#2a2a2a] hover:border-[#3a3a3a]'}
                        ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                    >
                      <div className="flex flex-col items-center justify-center gap-2 cursor-pointer">
                        {uploading ? (
                          <>
                            <Loader2 size={20} className="animate-spin" />
                            <span>Uploading...</span>
                          </>
                        ) : (
                          <label className="flex flex-col items-center cursor-pointer w-full h-full">
                            <Upload size={20} className="mb-2" />
                            <span>Click or Drag to upload images</span>
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleImageUpload}
                              disabled={uploading}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                    </div>
                    
                    {/* Draggable Image Grid */}
                    {uploadingImages.length > 0 && (
                      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {uploadingImages.map((url, idx) => (
                          <SortableImage 
                            key={`${url}-${idx}`} 
                            url={url} 
                            index={idx} 
                            moveImage={moveImage}
                            removeImage={removeImage}
                            isCover={url === editingProject.featured_image}
                            setCover={(coverUrl) => setEditingProject({ ...editingProject, featured_image: coverUrl })}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Metrics */}
              <div>
                <h2 className="text-2xl text-white mb-4">
                  Project Metrics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm text-[#7d8187] mb-2">
                      Completion Date
                    </label>
                    <input
                      type="date"
                      value={editingProject.completion_date || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          completion_date: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded focus:border-white focus:outline-none transition-colors [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#7d8187] mb-2">
                      Duration (weeks)
                    </label>
                    <input
                      type="number"
                      value={editingProject.duration_weeks || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          duration_weeks: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded focus:border-white focus:outline-none transition-colors"
                      placeholder="12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#7d8187] mb-2">
                      Team Size
                    </label>
                    <input
                      type="number"
                      value={editingProject.team_size || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          team_size: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded focus:border-white focus:outline-none transition-colors"
                      placeholder="5"
                    />
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <h2 className="text-2xl text-white mb-4">
                  Status
                </h2>
                <div className="flex items-center gap-8">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingProject.published || false}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          published: e.target.checked,
                        })
                      }
                      className="w-5 h-5 bg-[#0a0a0a] border border-[#2a2a2a] rounded cursor-pointer"
                    />
                    <span className="text-[#7d8187]">Published</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingProject.featured || false}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          featured: e.target.checked,
                        })
                      }
                      className="w-5 h-5 bg-[#0a0a0a] border border-[#2a2a2a] rounded cursor-pointer"
                    />
                    <span className="text-[#7d8187]">Featured</span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-8 py-3 bg-white text-black hover:bg-gray-200 transition-colors rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      {projects.find(p => p.id === editingProject.id) ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      {projects.find(p => p.id === editingProject.id) ? 'Update Project' : 'Create Project'}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingProject(null);
                    setUploadingImages([]);
                  }}
                  disabled={saving}
                  className="px-8 py-3 bg-[#2a2a2a] hover:bg-[#3a3a3a] transition-colors rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
    </DndProvider>
  );
}