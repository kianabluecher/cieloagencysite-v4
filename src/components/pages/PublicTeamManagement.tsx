import { useState, useEffect } from "react";
import {
  Users,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  Image as ImageIcon,
  ExternalLink,
  GripVertical
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  type TeamMember
} from "../../utils/team-api";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function PublicTeamManagement() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<TeamMember>>({
    name: "",
    role: "",
    bio: "",
    short_bio: "",
    image: "",
    slug: "",
    order: 0,
    social_links: {
      linkedin: "",
      twitter: "",
      website: ""
    }
  });

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    setLoading(true);
    const data = await getTeamMembers();
    setMembers(data);
    setLoading(false);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setFormData({
      name: "",
      role: "",
      bio: "",
      short_bio: "",
      image: "",
      slug: "",
      order: members.length,
      social_links: {
        linkedin: "",
        twitter: "",
        website: ""
      }
    });
  };

  const handleEdit = (member: TeamMember) => {
    setEditingId(member.id);
    setFormData({ ...member });
    setIsCreating(false);
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
    setFormData({});
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleSave = async () => {
    try {
      if (!formData.name || !formData.role) {
        toast.error("Name and Role are required");
        return;
      }

      // Auto-generate slug if missing
      const memberData = {
        ...formData,
        slug: formData.slug || generateSlug(formData.name || ""),
      } as TeamMember;

      if (isCreating) {
        await createTeamMember(memberData);
        toast.success("Team member created");
      } else if (editingId) {
        await updateTeamMember(editingId, memberData);
        toast.success("Team member updated");
      }

      setEditingId(null);
      setIsCreating(false);
      loadMembers();
    } catch (error) {
      console.error("Error saving team member:", error);
      toast.error("Failed to save team member");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    try {
      await deleteTeamMember(id);
      toast.success("Team member deleted");
      loadMembers();
    } catch (error) {
      console.error("Error deleting team member:", error);
      toast.error("Failed to delete team member");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-white mb-1">Public Team Page</h1>
          <p className="text-zinc-400 text-sm">
            Manage the team members displayed on the About page.
          </p>
        </div>
        <button
          onClick={handleCreate}
          disabled={isCreating || editingId !== null}
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          Add Member
        </button>
      </div>

      {/* List / Form */}
      <div className="space-y-4">
        {/* Create/Edit Form */}
        {(isCreating || editingId) && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-6 animate-in fade-in slide-in-from-top-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h3 className="text-lg text-white font-medium">
                {isCreating ? "Add New Member" : "Edit Member"}
              </h3>
              <button
                onClick={handleCancel}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white focus:border-white focus:outline-none"
                    placeholder="e.g. Jane Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Role</label>
                  <input
                    type="text"
                    value={formData.role || ""}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white focus:border-white focus:outline-none"
                    placeholder="e.g. Head of Design"
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Slug (URL)</label>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500 text-sm">/about/</span>
                    <input
                      type="text"
                      value={formData.slug || ""}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="flex-1 bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white focus:border-white focus:outline-none"
                      placeholder="jane-doe"
                    />
                  </div>
                </div>

                 <div>
                  <label className="block text-sm text-zinc-400 mb-1">Order</label>
                  <input
                    type="number"
                    value={formData.order || 0}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white focus:border-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Profile Image URL</label>
                  <input
                    type="text"
                    value={formData.image || ""}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white focus:border-white focus:outline-none"
                    placeholder="https://..."
                  />
                  {formData.image && (
                    <div className="mt-2 w-24 h-24 rounded-lg overflow-hidden bg-zinc-800 border border-zinc-700">
                      <ImageWithFallback
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                 <div>
                  <label className="block text-sm text-zinc-400 mb-1">Short Bio (Card)</label>
                  <textarea
                    value={formData.short_bio || ""}
                    onChange={(e) => setFormData({ ...formData, short_bio: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white focus:border-white focus:outline-none h-20 resize-none"
                    placeholder="Brief description for the team card..."
                  />
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Full Bio (Detail Page)</label>
                  <textarea
                    value={formData.bio || ""}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white focus:border-white focus:outline-none h-40 font-mono text-sm"
                    placeholder="Full biography using Markdown..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">LinkedIn URL</label>
                    <input
                      type="text"
                      value={formData.social_links?.linkedin || ""}
                      onChange={(e) => setFormData({
                        ...formData,
                        social_links: { ...formData.social_links, linkedin: e.target.value }
                      })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white focus:border-white focus:outline-none"
                    />
                  </div>
                   <div>
                    <label className="block text-sm text-zinc-400 mb-1">Twitter URL</label>
                    <input
                      type="text"
                      value={formData.social_links?.twitter || ""}
                      onChange={(e) => setFormData({
                        ...formData,
                        social_links: { ...formData.social_links, twitter: e.target.value }
                      })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white focus:border-white focus:outline-none"
                    />
                  </div>
                   <div>
                    <label className="block text-sm text-zinc-400 mb-1">Website URL</label>
                    <input
                      type="text"
                      value={formData.social_links?.website || ""}
                      onChange={(e) => setFormData({
                        ...formData,
                        social_links: { ...formData.social_links, website: e.target.value }
                      })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white focus:border-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-lg hover:bg-zinc-200 transition-colors font-medium"
              >
                <Save className="w-4 h-4" />
                Save Member
              </button>
            </div>
          </div>
        )}

        {/* Member List */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin w-8 h-8 border-2 border-white/20 border-t-white rounded-full"></div>
          </div>
        ) : members.length === 0 ? (
          <div className="text-center py-12 bg-zinc-900 border border-zinc-800 rounded-lg">
            <Users className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-lg text-white font-medium mb-2">No team members yet</h3>
            <p className="text-zinc-400 mb-6">Add your first team member to get started.</p>
            <button
              onClick={handleCreate}
              className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg hover:bg-zinc-200 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Member
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-lg p-4 group hover:border-zinc-700 transition-colors"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-zinc-800 rounded-full overflow-hidden">
                  {member.image ? (
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium truncate">{member.name}</h4>
                  <p className="text-zinc-400 text-sm truncate">{member.role}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-600 px-2">Order: {member.order}</span>
                  <button
                    onClick={() => handleEdit(member)}
                    className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
