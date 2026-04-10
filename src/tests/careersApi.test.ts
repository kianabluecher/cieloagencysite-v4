import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchJobs, fetchJobById, searchJobs, trackJobView } from '../utils/careers-api';
import type { Job } from '../utils/careers-api';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

beforeEach(() => {
  mockFetch.mockReset();
});

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    department: 'Engineering',
    description: 'Build amazing UIs',
    requirements: ['React', 'TypeScript'],
    location: 'Remote',
    type: 'Full-time',
    status: 'open',
    featured: true,
    posted_date: '2025-12-01',
  },
  {
    id: '2',
    title: 'UX Designer',
    department: 'Design',
    description: 'Design user experiences',
    requirements: ['Figma', 'UX Research'],
    location: 'New York',
    type: 'Full-time',
    status: 'open',
    featured: false,
    posted_date: '2025-12-05',
  },
  {
    id: '3',
    title: 'Backend Developer',
    department: 'Engineering',
    description: 'Build scalable APIs',
    requirements: ['Node.js', 'PostgreSQL'],
    location: 'Remote',
    type: 'Part-time',
    status: 'closed',
    featured: false,
    posted_date: '2025-11-15',
  },
];

describe('fetchJobs', () => {
  it('returns jobs on success', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ jobs: mockJobs }),
    });

    const result = await fetchJobs();
    expect(result).toEqual(mockJobs);
  });

  it('returns empty array on API error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    const result = await fetchJobs();
    expect(result).toEqual([]);
  });

  it('returns empty array on network error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await fetchJobs();
    expect(result).toEqual([]);
  });
});

describe('fetchJobById', () => {
  it('returns the job on success', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ job: mockJobs[0] }),
    });

    const result = await fetchJobById('1');
    expect(result).toEqual(mockJobs[0]);
  });

  it('returns null on failure', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });

    const result = await fetchJobById('nonexistent');
    expect(result).toBeNull();
  });

  it('returns null on network error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await fetchJobById('1');
    expect(result).toBeNull();
  });
});

describe('searchJobs', () => {
  // searchJobs internally calls fetchJobs, so we mock fetch to return mockJobs
  beforeEach(() => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ jobs: mockJobs }),
    });
  });

  it('filters by status (only open jobs)', async () => {
    const result = await searchJobs({});
    // Job 3 is closed, so only 2 jobs returned
    expect(result).toHaveLength(2);
    expect(result.every(j => j.status === 'open')).toBe(true);
  });

  it('filters by department', async () => {
    const result = await searchJobs({ department: 'Engineering' });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Frontend Developer');
  });

  it('filters by location', async () => {
    const result = await searchJobs({ location: 'New York' });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('UX Designer');
  });

  it('filters by type', async () => {
    const result = await searchJobs({ type: 'Full-time' });
    expect(result).toHaveLength(2);
  });

  it('filters by query (title match)', async () => {
    const result = await searchJobs({ query: 'frontend' });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Frontend Developer');
  });

  it('filters by query (description match)', async () => {
    const result = await searchJobs({ query: 'user experiences' });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('UX Designer');
  });

  it('combines multiple filters', async () => {
    const result = await searchJobs({ department: 'Engineering', location: 'Remote' });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Frontend Developer');
  });

  it('returns empty when no matches', async () => {
    const result = await searchJobs({ department: 'Marketing' });
    expect(result).toHaveLength(0);
  });

  it('returns empty array on network error', async () => {
    mockFetch.mockReset();
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await searchJobs({});
    expect(result).toEqual([]);
  });
});

describe('trackJobView', () => {
  it('resolves without error', async () => {
    await expect(trackJobView('1')).resolves.toBeUndefined();
  });
});
