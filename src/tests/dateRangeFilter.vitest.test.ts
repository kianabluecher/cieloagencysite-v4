import { describe, it, expect } from 'vitest';
import { filterBlogsByDateRange, createMockPost } from './dateRangeFilter.manual';

describe('filterBlogsByDateRange', () => {
  const mockBlogs = [
    createMockPost('Post 1', '2025-12-01T10:00:00.000Z'),
    createMockPost('Post 2', '2025-12-04T08:30:00.000Z'),
    createMockPost('Post 3', '2025-12-10T14:15:00.000Z'),
    createMockPost('Post 4', '2025-12-11T23:59:59.000Z'),
    createMockPost('Post 5', '2025-12-15T12:00:00.000Z'),
    createMockPost('Post 6', '2025-12-17T18:45:00.000Z'),
    createMockPost('Post 7', '2025-12-20T09:20:00.000Z'),
    createMockPost('Post 8', '2025-12-25T16:30:00.000Z'),
  ];

  describe('standard date range (both dates)', () => {
    it('returns posts within the range (Dec 4-11)', () => {
      const result = filterBlogsByDateRange(mockBlogs, '2025-12-04', '2025-12-11');
      expect(result).toHaveLength(3);
    });

    it('includes start boundary post', () => {
      const result = filterBlogsByDateRange(mockBlogs, '2025-12-04', '2025-12-11');
      expect(result.some(p => p.title === 'Post 2')).toBe(true);
    });

    it('includes end boundary post', () => {
      const result = filterBlogsByDateRange(mockBlogs, '2025-12-04', '2025-12-11');
      expect(result.some(p => p.title === 'Post 4')).toBe(true);
    });

    it('excludes posts outside range', () => {
      const result = filterBlogsByDateRange(mockBlogs, '2025-12-04', '2025-12-11');
      expect(result.some(p => p.title === 'Post 1')).toBe(false);
      expect(result.some(p => p.title === 'Post 5')).toBe(false);
    });
  });

  describe('start date only', () => {
    it('returns all posts from start date onward', () => {
      const result = filterBlogsByDateRange(mockBlogs, '2025-12-15', '');
      expect(result).toHaveLength(4);
    });

    it('includes start boundary post', () => {
      const result = filterBlogsByDateRange(mockBlogs, '2025-12-15', '');
      expect(result.some(p => p.title === 'Post 5')).toBe(true);
    });

    it('excludes posts before start date', () => {
      const result = filterBlogsByDateRange(mockBlogs, '2025-12-15', '');
      expect(result.some(p => p.title === 'Post 4')).toBe(false);
    });
  });

  describe('end date only', () => {
    it('returns all posts up to end date', () => {
      const result = filterBlogsByDateRange(mockBlogs, '', '2025-12-10');
      expect(result).toHaveLength(3);
    });

    it('includes end boundary post', () => {
      const result = filterBlogsByDateRange(mockBlogs, '', '2025-12-10');
      expect(result.some(p => p.title === 'Post 3')).toBe(true);
    });

    it('excludes posts after end date', () => {
      const result = filterBlogsByDateRange(mockBlogs, '', '2025-12-10');
      expect(result.some(p => p.title === 'Post 4')).toBe(false);
    });
  });

  describe('same-day range', () => {
    it('returns only posts on that day', () => {
      const result = filterBlogsByDateRange(mockBlogs, '2025-12-10', '2025-12-10');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Post 3');
    });
  });

  describe('empty range (no filter)', () => {
    it('returns all posts when both dates empty', () => {
      const result = filterBlogsByDateRange(mockBlogs, '', '');
      expect(result).toHaveLength(mockBlogs.length);
    });
  });

  describe('wide range covering all posts', () => {
    it('returns all posts', () => {
      const result = filterBlogsByDateRange(mockBlogs, '2025-12-01', '2025-12-31');
      expect(result).toHaveLength(mockBlogs.length);
    });
  });

  describe('range with no matches', () => {
    it('returns empty array', () => {
      const result = filterBlogsByDateRange(mockBlogs, '2025-11-01', '2025-11-30');
      expect(result).toHaveLength(0);
    });
  });

  describe('boundary edge cases', () => {
    const edgeCaseBlogs = [
      createMockPost('Edge 1', '2025-12-10T00:00:00.000Z'),
      createMockPost('Edge 2', '2025-12-10T23:59:59.000Z'),
      createMockPost('Edge 3', '2025-12-11T00:00:00.000Z'),
    ];

    it('includes midnight start of day', () => {
      const result = filterBlogsByDateRange(edgeCaseBlogs, '2025-12-10', '2025-12-10');
      expect(result.some(p => p.title === 'Edge 1')).toBe(true);
    });

    it('includes end of day', () => {
      const result = filterBlogsByDateRange(edgeCaseBlogs, '2025-12-10', '2025-12-10');
      expect(result.some(p => p.title === 'Edge 2')).toBe(true);
    });

    it('excludes next day midnight', () => {
      const result = filterBlogsByDateRange(edgeCaseBlogs, '2025-12-10', '2025-12-10');
      expect(result.some(p => p.title === 'Edge 3')).toBe(false);
    });
  });

  describe('missing timestamps', () => {
    it('filters out posts without timestamps', () => {
      const blogs = [
        createMockPost('Valid 1', '2025-12-10T12:00:00.000Z'),
        { ...createMockPost('Invalid 1', ''), created_at: '' },
        { ...createMockPost('Invalid 2', ''), created_at: null as any },
      ];
      const result = filterBlogsByDateRange(blogs, '2025-12-01', '2025-12-31');
      expect(result).toHaveLength(1);
    });
  });

  describe('different date formats', () => {
    it('handles various ISO formats on the same day', () => {
      const blogs = [
        createMockPost('ISO Full', '2025-12-10T14:30:00.000Z'),
        createMockPost('ISO Date Only', '2025-12-10'),
        createMockPost('Different Time', '2025-12-10T00:00:00Z'),
      ];
      const result = filterBlogsByDateRange(blogs, '2025-12-10', '2025-12-10');
      expect(result).toHaveLength(3);
    });
  });
});
