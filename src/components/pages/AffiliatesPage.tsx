import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Loader2, Link as LinkIcon, TrendingUp, Users, DollarSign } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { createClient } from '../../utils/supabase/client';

interface AffiliatesPageProps {
  onNavigate: (page: string) => void;
}

interface Affiliate {
  id: string;
  partner_name: string;
  affiliate_link: string;
  commission_rate: string;
  status: 'active' | 'inactive';
  clicks: number;
  conversions: number;
  revenue: number;
  notes?: string;
  created_at: string;
}

export function AffiliatesPage({ onNavigate }: AffiliatesPageProps) {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingAffiliate, setEditingAffiliate] = useState<Affiliate | null>(null);

  const [form, setForm] = useState({
    partner_name: '',
    affiliate_link: '',
    commission_rate: '',
    status: 'active' as 'active' | 'inactive',
    clicks: 0,
    conversions: 0,
    revenue: 0,
    notes: ''
  });

  useEffect(() => {
    loadAffiliates();
  }, []);

  const loadAffiliates = async () => {
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
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/affiliates`,
        {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setAffiliates(data || []);
      }
    } catch (error) {
      console.error('Error loading affiliates:', error);
      toast.error('Failed to load affiliates');
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
      const url = editingAffiliate
        ? `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/affiliates/${editingAffiliate.id}`
        : `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/affiliates`;

      const response = await fetch(url, {
        method: editingAffiliate ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        toast.success(editingAffiliate ? 'Affiliate updated' : 'Affiliate added');
        setShowModal(false);
        setEditingAffiliate(null);
        setForm({
          partner_name: '',
          affiliate_link: '',
          commission_rate: '',
          status: 'active',
          clicks: 0,
          conversions: 0,
          revenue: 0,
          notes: ''
        });
        loadAffiliates();
      } else {
        const error = await response.text();
        toast.error(`Failed to save affiliate: ${error}`);
      }
    } catch (error) {
      console.error('Error saving affiliate:', error);
      toast.error('Failed to save affiliate');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this affiliate?')) return;

    try {
      const supabase = await createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) return;

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/affiliates/${id}`,
        {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${session.access_token}` }
        }
      );

      if (response.ok) {
        toast.success('Affiliate deleted');
        loadAffiliates();
      }
    } catch (error) {
      console.error('Error deleting affiliate:', error);
      toast.error('Failed to delete affiliate');
    }
  };

  const openEdit = (affiliate: Affiliate) => {
    setEditingAffiliate(affiliate);
    setForm({
      partner_name: affiliate.partner_name,
      affiliate_link: affiliate.affiliate_link,
      commission_rate: affiliate.commission_rate,
      status: affiliate.status,
      clicks: affiliate.clicks,
      conversions: affiliate.conversions,
      revenue: affiliate.revenue,
      notes: affiliate.notes || ''
    });
    setShowModal(true);
  };

  const filteredAffiliates = affiliates.filter(a => 
    a.partner_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenue = affiliates.reduce((sum, a) => sum + (a.revenue || 0), 0);
  const totalClicks = affiliates.reduce((sum, a) => sum + (a.clicks || 0), 0);
  const totalConversions = affiliates.reduce((sum, a) => sum + (a.conversions || 0), 0);

  return (
    <div className="p-6" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-white mb-2 tracking-wide">Affiliates</h1>
        <p className="text-zinc-500">Track and manage your affiliate programs</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-zinc-950 border border-zinc-800 p-6 hover:border-zinc-700 transition-colors">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign size={14} className="text-zinc-500" strokeWidth={1.5} />
            <h3 className="text-[10px] font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider">Total Revenue</h3>
          </div>
          <p className="text-4xl font-light text-white mb-1">${totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-zinc-600">Total earnings</p>
        </div>
        
        <div className="bg-zinc-950 border border-zinc-800 p-6 hover:border-zinc-700 transition-colors">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={14} className="text-zinc-500" strokeWidth={1.5} />
            <h3 className="text-[10px] font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider">Total Clicks</h3>
          </div>
          <p className="text-4xl font-light text-white mb-1">{totalClicks.toLocaleString()}</p>
          <p className="text-xs text-zinc-600">Link clicks</p>
        </div>
        
        <div className="bg-zinc-950 border border-zinc-800 p-6 hover:border-zinc-700 transition-colors">
          <div className="flex items-center gap-2 mb-3">
            <Users size={14} className="text-zinc-500" strokeWidth={1.5} />
            <h3 className="text-[10px] font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider">Conversions</h3>
          </div>
          <p className="text-4xl font-light text-white mb-1">{totalConversions.toLocaleString()}</p>
          <p className="text-xs text-zinc-600">Successful conversions</p>
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
                placeholder="Search affiliates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 pl-11 pr-4 py-3 text-white text-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors"
              />
            </div>
          </div>
          <button
            onClick={() => {
              setEditingAffiliate(null);
              setForm({
                partner_name: '',
                affiliate_link: '',
                commission_rate: '',
                status: 'active',
                clicks: 0,
                conversions: 0,
                revenue: 0,
                notes: ''
              });
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-zinc-950 hover:bg-zinc-900 text-white border border-zinc-800 hover:border-zinc-700 transition-all text-sm whitespace-nowrap"
          >
            <Plus size={14} strokeWidth={1.5} />
            Add Affiliate
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
          {filteredAffiliates.length === 0 ? (
            <div className="p-12 text-center text-zinc-500">
              No affiliates found. Add your first affiliate to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800/50">
                    <th className="text-left px-6 py-4 text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider bg-zinc-950">Partner</th>
                    <th className="text-left px-6 py-4 text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider bg-zinc-950">Link</th>
                    <th className="text-left px-6 py-4 text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider bg-zinc-950">Commission</th>
                    <th className="text-left px-6 py-4 text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider bg-zinc-950">Status</th>
                    <th className="text-center px-6 py-4 text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider bg-zinc-950">Clicks</th>
                    <th className="text-center px-6 py-4 text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider bg-zinc-950">Conversions</th>
                    <th className="text-right px-6 py-4 text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider bg-zinc-950">Revenue</th>
                    <th className="text-right px-6 py-4 text-xs font-['Geist_Mono'] text-zinc-500 uppercase tracking-wider bg-zinc-950">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAffiliates.map((affiliate) => (
                    <tr key={affiliate.id} className="border-b border-zinc-800/50 hover:bg-zinc-900/30 transition-colors">
                      <td className="px-6 py-5">
                        <span className="text-white text-sm">{affiliate.partner_name}</span>
                      </td>
                      <td className="px-6 py-5">
                        <a 
                          href={affiliate.affiliate_link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs text-white hover:text-zinc-300 transition-colors"
                        >
                          <LinkIcon size={14} strokeWidth={1.5} />
                          <span>Open Link</span>
                        </a>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-zinc-400 text-sm">{affiliate.commission_rate}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center px-3 py-1.5 border text-xs ${
                          affiliate.status === 'active'
                            ? 'bg-green-500/10 text-green-400 border-green-500/20'
                            : 'bg-zinc-900/50 text-zinc-400 border-zinc-800/50'
                        }`}>
                          <span className="font-['Geist_Mono'] tracking-wide">{affiliate.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className="text-white text-sm">{affiliate.clicks}</span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className="text-white text-sm">{affiliate.conversions}</span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <span className="text-white text-sm font-medium">${affiliate.revenue.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEdit(affiliate)}
                            className="p-2 hover:bg-zinc-900/50 transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={14} className="text-zinc-500 hover:text-white" strokeWidth={1.5} />
                          </button>
                          <button
                            onClick={() => handleDelete(affiliate.id)}
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
                {editingAffiliate ? 'Edit Affiliate' : 'Add Affiliate'}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-zinc-500 mb-2">Partner Name *</label>
                <input
                  type="text"
                  value={form.partner_name}
                  onChange={(e) => setForm({ ...form, partner_name: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2 text-white focus:outline-none focus:border-zinc-700 transition-colors"
                  placeholder="e.g., Marketing Tool XYZ"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-500 mb-2">Affiliate Link *</label>
                <input
                  type="url"
                  value={form.affiliate_link}
                  onChange={(e) => setForm({ ...form, affiliate_link: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2 text-white focus:outline-none focus:border-zinc-700 transition-colors"
                  placeholder="https://partner.com/ref/your-code"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-500 mb-2">Commission Rate *</label>
                <input
                  type="text"
                  value={form.commission_rate}
                  onChange={(e) => setForm({ ...form, commission_rate: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2 text-white focus:outline-none focus:border-zinc-700 transition-colors"
                  placeholder="e.g., 20% or $50 per sale"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-500 mb-2">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as 'active' | 'inactive' })}
                  className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2 text-white focus:outline-none focus:border-zinc-700 transition-colors"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-zinc-500 mb-2">Clicks</label>
                  <input
                    type="number"
                    value={form.clicks}
                    onChange={(e) => setForm({ ...form, clicks: parseInt(e.target.value) || 0 })}
                    className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2 text-white focus:outline-none focus:border-zinc-700 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-500 mb-2">Conversions</label>
                  <input
                    type="number"
                    value={form.conversions}
                    onChange={(e) => setForm({ ...form, conversions: parseInt(e.target.value) || 0 })}
                    className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2 text-white focus:outline-none focus:border-zinc-700 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-500 mb-2">Revenue ($)</label>
                  <input
                    type="number"
                    value={form.revenue}
                    onChange={(e) => setForm({ ...form, revenue: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2 text-white focus:outline-none focus:border-zinc-700 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-zinc-500 mb-2">Notes</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 px-4 py-2 text-white focus:outline-none focus:border-zinc-700 transition-colors min-h-[80px]"
                  placeholder="Additional notes about this affiliate..."
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-zinc-800/50 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingAffiliate(null);
                }}
                className="px-4 py-2 text-zinc-500 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-white text-black hover:bg-zinc-200 transition-colors"
              >
                {editingAffiliate ? 'Update' : 'Add'} Affiliate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
