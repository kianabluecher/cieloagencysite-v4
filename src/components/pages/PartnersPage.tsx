import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ExternalLink, Search, Loader2, Briefcase } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { createClient } from '../../utils/supabase/client';

interface PartnersPageProps {
  onNavigate: (page: string) => void;
}

interface Partner {
  id: string;
  name: string;
  category: string;
  description: string;
  link: string;
  logo_url?: string;
  contact_email?: string;
  hourly_pricing?: string;
  packages_pricing?: string;
  our_resell?: string;
  created_at: string;
}

export function PartnersPage({ onNavigate }: PartnersPageProps) {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);

  const [form, setForm] = useState({
    name: '',
    category: '',
    description: '',
    link: '',
    logo_url: '',
    contact_email: '',
    hourly_pricing: '',
    packages_pricing: '',
    our_resell: ''
  });

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = async () => {
    setLoading(true);
    try {
      const supabase = await createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error('Please log in');
        return;
      }

      const accessToken = session.access_token;
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/partners`,
        {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setPartners(data || []);
      }
    } catch (error) {
      console.error('Error loading partners:', error);
      toast.error('Failed to load partners');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const supabase = await createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error('Please log in');
        return;
      }

      const accessToken = session.access_token;
      const url = editingPartner
        ? `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/partners/${editingPartner.id}`
        : `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/partners`;

      const response = await fetch(url, {
        method: editingPartner ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        toast.success(editingPartner ? 'Partner updated' : 'Partner added');
        setShowModal(false);
        setEditingPartner(null);
        setForm({
          name: '',
          category: '',
          description: '',
          link: '',
          logo_url: '',
          contact_email: '',
          hourly_pricing: '',
          packages_pricing: '',
          our_resell: ''
        });
        loadPartners();
      } else {
        const error = await response.text();
        toast.error(`Failed to save partner: ${error}`);
      }
    } catch (error) {
      console.error('Error saving partner:', error);
      toast.error('Failed to save partner');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this partner?')) return;

    try {
      const supabase = await createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) return;

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/partners/${id}`,
        {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${session.access_token}` }
        }
      );

      if (response.ok) {
        toast.success('Partner deleted');
        loadPartners();
      }
    } catch (error) {
      console.error('Error deleting partner:', error);
      toast.error('Failed to delete partner');
    }
  };

  const openEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setForm({
      name: partner.name,
      category: partner.category,
      description: partner.description,
      link: partner.link,
      logo_url: partner.logo_url || '',
      contact_email: partner.contact_email || '',
      hourly_pricing: partner.hourly_pricing || '',
      packages_pricing: partner.packages_pricing || '',
      our_resell: partner.our_resell || ''
    });
    setShowModal(true);
  };

  const filteredPartners = partners.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get unique categories for stats
  const uniqueCategories = new Set(partners.map(p => p.category));

  return (
    <div className="p-6" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2 tracking-wide">Partners</h1>
          <p className="text-zinc-500">Manage your business partnerships and service providers</p>
        </div>
        <div className="bg-zinc-950 border border-zinc-800 p-4">
          <div className="flex items-center gap-3">
            <Briefcase size={16} className="text-zinc-500" strokeWidth={1.5} />
            <div>
              <p className="text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider">Total Partners</p>
              <p className="text-2xl font-light text-white">{partners.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <div className="flex-1 w-full">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Search partners by name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 pl-11 pr-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors"
              />
            </div>
          </div>
          <button
            onClick={() => {
              setEditingPartner(null);
              setForm({
                name: '',
                category: '',
                description: '',
                link: '',
                logo_url: '',
                contact_email: '',
                hourly_pricing: '',
                packages_pricing: '',
                our_resell: ''
              });
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-zinc-950 hover:bg-zinc-900 text-white border border-zinc-800 hover:border-zinc-700 transition-all text-sm whitespace-nowrap"
          >
            <Plus size={14} strokeWidth={1.5} />
            Add Partner
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-zinc-500" strokeWidth={1.5} />
        </div>
      ) : (
        <div className="bg-zinc-950 border border-zinc-800 overflow-hidden">
          {filteredPartners.length === 0 ? (
            <div className="p-12 text-center text-zinc-500">
              No partners found. Add your first partner to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800/50">
                    <th className="text-left px-6 py-4 text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider bg-zinc-950">Partner Name</th>
                    <th className="text-left px-6 py-4 text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider bg-zinc-950">Category</th>
                    <th className="text-left px-6 py-4 text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider bg-zinc-950">Description</th>
                    <th className="text-left px-6 py-4 text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider bg-zinc-950">Contact</th>
                    <th className="text-right px-6 py-4 text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider bg-zinc-950">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPartners.map((partner) => (
                    <tr key={partner.id} className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          {partner.logo_url ? (
                            <img src={partner.logo_url} alt={partner.name} className="w-8 h-8 rounded object-cover" />
                          ) : (
                            <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                              <Briefcase size={14} className="text-zinc-600" strokeWidth={1.5} />
                            </div>
                          )}
                          <div>
                            <div className="text-white text-sm font-medium">{partner.name}</div>
                            {partner.link && (
                              <a 
                                href={partner.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-white transition-colors mt-0.5"
                              >
                                <span>Visit website</span>
                                <ExternalLink size={10} strokeWidth={1.5} />
                              </a>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center px-3 py-1.5 border text-xs bg-zinc-900/50 text-zinc-400 border-zinc-800/50">
                          <span className="font-['Geist_Mono'] tracking-wide">{partner.category}</span>
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-zinc-400 text-sm max-w-md line-clamp-2">{partner.description}</span>
                      </td>
                      <td className="px-6 py-5">
                        {partner.contact_email ? (
                          <a 
                            href={`mailto:${partner.contact_email}`}
                            className="text-zinc-400 text-sm hover:text-white transition-colors"
                          >
                            {partner.contact_email}
                          </a>
                        ) : (
                          <span className="text-zinc-600 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEdit(partner)}
                            className="p-2 hover:bg-zinc-900/50 transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={14} className="text-zinc-500 hover:text-white" strokeWidth={1.5} />
                          </button>
                          <button
                            onClick={() => handleDelete(partner.id)}
                            className="p-2 hover:bg-zinc-900/50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={14} className="text-zinc-500 hover:text-red-400" strokeWidth={1.5} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-950 border border-zinc-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-zinc-800/50">
              <h2 className="text-xl text-white">
                {editingPartner ? 'Edit Partner' : 'Add Partner'}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-zinc-500 mb-2">Partner Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2 text-white focus:outline-none focus:border-zinc-700 transition-colors"
                  placeholder="e.g., Lead Generation Pro"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-500 mb-2">Category *</label>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2 text-white focus:outline-none focus:border-zinc-700 transition-colors"
                  placeholder="e.g., Lead Generation, Marketing Tools"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-500 mb-2">Description *</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2 text-white focus:outline-none focus:border-zinc-700 transition-colors min-h-[100px]"
                  placeholder="Describe the partnership and services offered..."
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-500 mb-2">Website Link *</label>
                <input
                  type="url"
                  value={form.link}
                  onChange={(e) => setForm({ ...form, link: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2 text-white focus:outline-none focus:border-zinc-700 transition-colors"
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-500 mb-2">Logo URL</label>
                <input
                  type="url"
                  value={form.logo_url}
                  onChange={(e) => setForm({ ...form, logo_url: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2 text-white focus:outline-none focus:border-zinc-700 transition-colors"
                  placeholder="https://example.com/logo.png"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-500 mb-2">Contact Email</label>
                <input
                  type="email"
                  value={form.contact_email}
                  onChange={(e) => setForm({ ...form, contact_email: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2 text-white focus:outline-none focus:border-zinc-700 transition-colors"
                  placeholder="partner@example.com"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-500 mb-2">Hourly Pricing</label>
                <input
                  type="text"
                  value={form.hourly_pricing}
                  onChange={(e) => setForm({ ...form, hourly_pricing: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2 text-white focus:outline-none focus:border-zinc-700 transition-colors"
                  placeholder="e.g., $50/hour"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-500 mb-2">Packages Pricing</label>
                <input
                  type="text"
                  value={form.packages_pricing}
                  onChange={(e) => setForm({ ...form, packages_pricing: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2 text-white focus:outline-none focus:border-zinc-700 transition-colors"
                  placeholder="e.g., $500/package"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-500 mb-2">Our Resell</label>
                <input
                  type="text"
                  value={form.our_resell}
                  onChange={(e) => setForm({ ...form, our_resell: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2 text-white focus:outline-none focus:border-zinc-700 transition-colors"
                  placeholder="e.g., Yes/No"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-zinc-800/50 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingPartner(null);
                }}
                className="px-4 py-2 text-zinc-500 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-white text-black hover:bg-zinc-200 transition-colors"
              >
                {editingPartner ? 'Update' : 'Add'} Partner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}