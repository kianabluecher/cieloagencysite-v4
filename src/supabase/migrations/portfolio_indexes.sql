-- ============================================
-- PORTFOLIO PERFORMANCE: DATABASE INDEXES
-- ============================================
-- Run these in Supabase SQL Editor to improve query performance
-- Expected improvement: 30-50% faster queries
-- Safe to run: These are CREATE INDEX IF NOT EXISTS (idempotent)
-- ============================================

-- Index 1: Published status (most common filter)
-- Used in: SELECT ... WHERE published = true
CREATE INDEX IF NOT EXISTS idx_portfolio_published 
ON portfolio_projects(published);

-- Index 2: Featured flag (for sorting featured projects first)
-- Used in: ORDER BY featured DESC
CREATE INDEX IF NOT EXISTS idx_portfolio_featured 
ON portfolio_projects(featured);

-- Index 3: Completion date (for sorting by date)
-- Used in: ORDER BY completion_date DESC
CREATE INDEX IF NOT EXISTS idx_portfolio_completion 
ON portfolio_projects(completion_date DESC NULLS LAST);

-- Index 4: Slug (for fast project lookups by URL)
-- Used in: SELECT ... WHERE slug = 'project-name'
CREATE INDEX IF NOT EXISTS idx_portfolio_slug 
ON portfolio_projects(slug);

-- Index 5: Composite index for common query pattern
-- Optimizes: WHERE published = true ORDER BY featured DESC, completion_date DESC
CREATE INDEX IF NOT EXISTS idx_portfolio_list_query 
ON portfolio_projects(published, featured DESC, completion_date DESC NULLS LAST);

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check if indexes were created successfully
SELECT 
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename = 'portfolio_projects'
ORDER BY indexname;

-- Check index usage statistics (run after some time)
SELECT 
  schemaname,
  tablename,
  indexname,
  idx_scan as index_scans,
  idx_tup_read as tuples_read,
  idx_tup_fetch as tuples_fetched
FROM pg_stat_user_indexes
WHERE tablename = 'portfolio_projects'
ORDER BY idx_scan DESC;

-- ============================================
-- EXPLAIN ANALYZE (Performance Testing)
-- ============================================

-- Test query performance BEFORE indexes:
-- EXPLAIN ANALYZE 
-- SELECT id, slug, title, excerpt, category, project_type, featured_image, completion_date, featured, published
-- FROM portfolio_projects
-- WHERE published = true
-- ORDER BY featured DESC, completion_date DESC
-- LIMIT 12;

-- Test query performance AFTER indexes:
-- Should show "Index Scan" instead of "Seq Scan"
EXPLAIN ANALYZE 
SELECT id, slug, title, excerpt, category, project_type, featured_image, completion_date, featured, published
FROM portfolio_projects
WHERE published = true
ORDER BY featured DESC, completion_date DESC
LIMIT 12;

-- ============================================
-- INDEX MAINTENANCE (Optional)
-- ============================================

-- Reindex if performance degrades over time (rarely needed)
-- REINDEX TABLE portfolio_projects;

-- Analyze table statistics for query planner
ANALYZE portfolio_projects;

-- ============================================
-- NOTES
-- ============================================
-- 
-- Index Benefits:
-- - Faster WHERE clause filtering
-- - Faster ORDER BY sorting  
-- - Reduced disk I/O
-- - Better query planning
--
-- Index Costs:
-- - Slightly slower INSERT/UPDATE (minimal impact)
-- - Additional storage space (~10-20% of table size)
--
-- When to Use:
-- ✅ Columns frequently used in WHERE clauses
-- ✅ Columns used in ORDER BY
-- ✅ Foreign key columns
-- ✅ Columns used in JOIN operations
--
-- When NOT to Use:
-- ❌ Small tables (< 1000 rows) - sequential scan is faster
-- ❌ Columns with low cardinality (few unique values)
-- ❌ Columns that are rarely queried
--
-- ============================================
