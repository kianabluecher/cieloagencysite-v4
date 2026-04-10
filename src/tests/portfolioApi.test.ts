import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  initializePortfolio,
} from '../utils/portfolio-api';

// Mock global fetch
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

beforeEach(() => {
  mockFetch.mockReset();
});

describe('getAllProjects', () => {
  it('returns projects on success', async () => {
    const mockProjects = [
      { id: '1', title: 'Project A' },
      { id: '2', title: 'Project B' },
    ];
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ projects: mockProjects }),
    });

    const result = await getAllProjects();
    expect(result).toEqual(mockProjects);
    expect(mockFetch).toHaveBeenCalledOnce();
  });

  it('appends limit query param when provided', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ projects: [] }),
    });

    await getAllProjects(5);
    const calledUrl = mockFetch.mock.calls[0][0] as string;
    expect(calledUrl).toContain('limit=5');
  });

  it('returns empty array on error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ details: 'Server error' }),
    });

    const result = await getAllProjects();
    expect(result).toEqual([]);
  });

  it('returns empty array on network failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await getAllProjects();
    expect(result).toEqual([]);
  });
});

describe('getProject', () => {
  it('returns the project on success', async () => {
    const mockProject = { id: '1', title: 'Project A' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ project: mockProject }),
    });

    const result = await getProject('1');
    expect(result).toEqual(mockProject);
  });

  it('returns null on 404', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ details: 'Not found' }),
    });

    const result = await getProject('nonexistent');
    expect(result).toBeNull();
  });

  it('returns null on network failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await getProject('1');
    expect(result).toBeNull();
  });
});

describe('createProject', () => {
  it('returns created project on success', async () => {
    const newProject = { title: 'New Project', description: 'A test project' };
    const createdProject = { id: 'new-id', ...newProject };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ project: createdProject }),
    });

    const result = await createProject(newProject as any);
    expect(result).toEqual(createdProject);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(newProject),
      })
    );
  });

  it('throws on failure', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ details: 'Validation error' }),
    });

    await expect(createProject({ title: '' } as any)).rejects.toThrow('Validation error');
  });
});

describe('updateProject', () => {
  it('returns updated project on success', async () => {
    const updates = { title: 'Updated Title' };
    const updatedProject = { id: '1', title: 'Updated Title' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ project: updatedProject }),
    });

    const result = await updateProject('1', updates);
    expect(result).toEqual(updatedProject);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/1'),
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify(updates),
      })
    );
  });

  it('throws on failure', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ details: 'Not found' }),
    });

    await expect(updateProject('bad-id', {})).rejects.toThrow('Not found');
  });
});

describe('deleteProject', () => {
  it('resolves on success', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });

    await expect(deleteProject('1')).resolves.toBeUndefined();
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/1'),
      expect.objectContaining({ method: 'DELETE' })
    );
  });

  it('throws on failure', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ details: 'Cannot delete' }),
    });

    await expect(deleteProject('1')).rejects.toThrow('Cannot delete');
  });
});

describe('initializePortfolio', () => {
  it('resolves on success', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ message: 'Portfolio initialized' }),
    });

    await expect(initializePortfolio()).resolves.toBeUndefined();
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/portfolio/init'),
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('throws on failure', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ details: 'Init failed' }),
    });

    await expect(initializePortfolio()).rejects.toThrow('Init failed');
  });
});
