import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getTeamMembers,
  getTeamMember,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from '../utils/team-api';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

beforeEach(() => {
  mockFetch.mockReset();
});

const mockMember = {
  id: '1',
  name: 'Jane Doe',
  role: 'Designer',
  bio: 'Experienced designer',
  image: '/images/jane.jpg',
  slug: 'jane-doe',
  order: 1,
};

describe('getTeamMembers', () => {
  it('returns team members on success', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ members: [mockMember] }),
    });

    const result = await getTeamMembers();
    expect(result).toEqual([mockMember]);
  });

  it('returns empty array on API error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    const result = await getTeamMembers();
    expect(result).toEqual([]);
  });

  it('returns empty array on network error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await getTeamMembers();
    expect(result).toEqual([]);
  });
});

describe('getTeamMember', () => {
  it('returns the member on success', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ member: mockMember }),
    });

    const result = await getTeamMember('1');
    expect(result).toEqual(mockMember);
  });

  it('returns null on 404', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const result = await getTeamMember('nonexistent');
    expect(result).toBeNull();
  });

  it('returns null on network error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await getTeamMember('1');
    expect(result).toBeNull();
  });
});

describe('createTeamMember', () => {
  it('returns created member on success', async () => {
    const newMember = {
      name: 'John Smith',
      role: 'Developer',
      bio: 'Full-stack dev',
      image: '/images/john.jpg',
      slug: 'john-smith',
      order: 2,
    };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ member: { id: '2', ...newMember } }),
    });

    const result = await createTeamMember(newMember);
    expect(result).toEqual({ id: '2', ...newMember });
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(newMember),
      })
    );
  });

  it('throws on failure', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });

    await expect(createTeamMember({ name: '' } as any)).rejects.toThrow('Failed to create team member');
  });
});

describe('updateTeamMember', () => {
  it('returns updated member on success', async () => {
    const updates = { role: 'Senior Designer' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ member: { ...mockMember, ...updates } }),
    });

    const result = await updateTeamMember('1', updates);
    expect(result.role).toBe('Senior Designer');
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/1'),
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify(updates),
      })
    );
  });

  it('throws on failure', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });

    await expect(updateTeamMember('bad-id', {})).rejects.toThrow('Failed to update team member');
  });
});

describe('deleteTeamMember', () => {
  it('resolves on success', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });

    await expect(deleteTeamMember('1')).resolves.toBeUndefined();
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/1'),
      expect.objectContaining({ method: 'DELETE' })
    );
  });

  it('throws on failure', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });

    await expect(deleteTeamMember('bad-id')).rejects.toThrow('Failed to delete team member');
  });
});
