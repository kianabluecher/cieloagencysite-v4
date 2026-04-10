/**
 * Date Range Filter Test Suite
 * ============================
 * Comprehensive test cases for blog date range filtering
 * 
 * Run these tests manually in the browser console or integrate with Jest/Vitest
 */

interface BlogPost {
  id: string;
  title: string;
  created_at: string;
}

/**
 * Test Utility: Create mock blog post
 */
function createMockPost(title: string, created_at: string): BlogPost {
  return {
    id: Math.random().toString(36).substr(2, 9),
    title,
    created_at
  };
}

/**
 * Test Utility: Filter function (copy from Blog.tsx)
 */
function filterBlogsByDateRange(
  blogs: BlogPost[],
  startDate: string,
  endDate: string
): BlogPost[] {
  if (!startDate && !endDate) {
    return blogs;
  }

  return blogs.filter((blog) => {
    const dateToUse = blog.created_at;
    
    if (!dateToUse) return false;

    // Extract date part (YYYY-MM-DD) from timestamp
    const blogDateStr = dateToUse.includes("T") 
      ? dateToUse.split("T")[0] 
      : dateToUse;

    // Convert to Date objects for proper comparison
    const blogDate = new Date(blogDateStr + "T00:00:00");
    const start = startDate ? new Date(startDate + "T00:00:00") : null;
    const end = endDate ? new Date(endDate + "T23:59:59") : null;

    // Compare using timestamps
    const afterStart = !start || blogDate >= start;
    const beforeEnd = !end || blogDate <= end;

    return afterStart && beforeEnd;
  });
}

/**
 * Test Runner
 */
function runTests() {
  console.log("🧪 Running Date Range Filter Tests...\n");
  
  let passedTests = 0;
  let failedTests = 0;

  // Helper function to assert
  function assert(testName: string, condition: boolean, expected: any, actual: any) {
    if (condition) {
      console.log(`✅ PASS: ${testName}`);
      passedTests++;
    } else {
      console.error(`❌ FAIL: ${testName}`);
      console.error(`   Expected: ${expected}`);
      console.error(`   Actual: ${actual}`);
      failedTests++;
    }
  }

  // Test Data Setup
  const mockBlogs: BlogPost[] = [
    createMockPost("Post 1", "2025-12-01T10:00:00.000Z"),
    createMockPost("Post 2", "2025-12-04T08:30:00.000Z"),
    createMockPost("Post 3", "2025-12-10T14:15:00.000Z"),
    createMockPost("Post 4", "2025-12-11T23:59:59.000Z"),
    createMockPost("Post 5", "2025-12-15T12:00:00.000Z"),
    createMockPost("Post 6", "2025-12-17T18:45:00.000Z"),
    createMockPost("Post 7", "2025-12-20T09:20:00.000Z"),
    createMockPost("Post 8", "2025-12-25T16:30:00.000Z"),
  ];

  console.log("📋 Mock Data Created:", mockBlogs.length, "blog posts\n");

  // ==========================================
  // TEST CASE 1: Both Dates Present (Standard Range)
  // ==========================================
  console.log("--- Test Case 1: Standard Date Range ---");
  const test1Result = filterBlogsByDateRange(mockBlogs, "2025-12-04", "2025-12-11");
  const test1Expected = 3; // Posts 2, 3, 4
  assert(
    "TC1: Standard range (Dec 4-11) should return 3 posts",
    test1Result.length === test1Expected,
    test1Expected,
    test1Result.length
  );
  assert(
    "TC1: Should include Dec 4 boundary post",
    test1Result.some(p => p.title === "Post 2"),
    true,
    test1Result.some(p => p.title === "Post 2")
  );
  assert(
    "TC1: Should include Dec 11 boundary post",
    test1Result.some(p => p.title === "Post 4"),
    true,
    test1Result.some(p => p.title === "Post 4")
  );
  assert(
    "TC1: Should exclude Dec 1 post",
    !test1Result.some(p => p.title === "Post 1"),
    true,
    !test1Result.some(p => p.title === "Post 1")
  );
  console.log("");

  // ==========================================
  // TEST CASE 2: Start Date Only
  // ==========================================
  console.log("--- Test Case 2: Start Date Only ---");
  const test2Result = filterBlogsByDateRange(mockBlogs, "2025-12-15", "");
  const test2Expected = 4; // Posts 5, 6, 7, 8
  assert(
    "TC2: Start date only (from Dec 15) should return 4 posts",
    test2Result.length === test2Expected,
    test2Expected,
    test2Result.length
  );
  assert(
    "TC2: Should include Dec 15 boundary post",
    test2Result.some(p => p.title === "Post 5"),
    true,
    test2Result.some(p => p.title === "Post 5")
  );
  assert(
    "TC2: Should exclude posts before Dec 15",
    !test2Result.some(p => p.title === "Post 4"),
    true,
    !test2Result.some(p => p.title === "Post 4")
  );
  console.log("");

  // ==========================================
  // TEST CASE 3: End Date Only
  // ==========================================
  console.log("--- Test Case 3: End Date Only ---");
  const test3Result = filterBlogsByDateRange(mockBlogs, "", "2025-12-10");
  const test3Expected = 3; // Posts 1, 2, 3
  assert(
    "TC3: End date only (until Dec 10) should return 3 posts",
    test3Result.length === test3Expected,
    test3Expected,
    test3Result.length
  );
  assert(
    "TC3: Should include Dec 10 boundary post",
    test3Result.some(p => p.title === "Post 3"),
    true,
    test3Result.some(p => p.title === "Post 3")
  );
  assert(
    "TC3: Should exclude posts after Dec 10",
    !test3Result.some(p => p.title === "Post 4"),
    true,
    !test3Result.some(p => p.title === "Post 4")
  );
  console.log("");

  // ==========================================
  // TEST CASE 4: Same-Day Range
  // ==========================================
  console.log("--- Test Case 4: Same-Day Range ---");
  const test4Result = filterBlogsByDateRange(mockBlogs, "2025-12-10", "2025-12-10");
  const test4Expected = 1; // Post 3 only
  assert(
    "TC4: Same-day range (Dec 10) should return 1 post",
    test4Result.length === test4Expected,
    test4Expected,
    test4Result.length
  );
  assert(
    "TC4: Should include only Dec 10 post",
    test4Result.some(p => p.title === "Post 3"),
    true,
    test4Result.some(p => p.title === "Post 3")
  );
  console.log("");

  // ==========================================
  // TEST CASE 5: Empty Range (No Filter)
  // ==========================================
  console.log("--- Test Case 5: Empty Range ---");
  const test5Result = filterBlogsByDateRange(mockBlogs, "", "");
  const test5Expected = mockBlogs.length;
  assert(
    "TC5: Empty range should return all posts",
    test5Result.length === test5Expected,
    test5Expected,
    test5Result.length
  );
  console.log("");

  // ==========================================
  // TEST CASE 6: Wide Range (All Posts)
  // ==========================================
  console.log("--- Test Case 6: Wide Range ---");
  const test6Result = filterBlogsByDateRange(mockBlogs, "2025-12-01", "2025-12-31");
  const test6Expected = mockBlogs.length;
  assert(
    "TC6: Wide range (all of December) should return all posts",
    test6Result.length === test6Expected,
    test6Expected,
    test6Result.length
  );
  console.log("");

  // ==========================================
  // TEST CASE 7: Narrow Range (No Matches)
  // ==========================================
  console.log("--- Test Case 7: Narrow Range with No Matches ---");
  const test7Result = filterBlogsByDateRange(mockBlogs, "2025-11-01", "2025-11-30");
  const test7Expected = 0;
  assert(
    "TC7: Range with no matching posts should return 0 posts",
    test7Result.length === test7Expected,
    test7Expected,
    test7Result.length
  );
  console.log("");

  // ==========================================
  // TEST CASE 8: Boundary Edge Case (End of Day)
  // ==========================================
  console.log("--- Test Case 8: Boundary Edge Case ---");
  const edgeCaseBlogs: BlogPost[] = [
    createMockPost("Edge 1", "2025-12-10T00:00:00.000Z"),
    createMockPost("Edge 2", "2025-12-10T23:59:59.000Z"),
    createMockPost("Edge 3", "2025-12-11T00:00:00.000Z"),
  ];
  const test8Result = filterBlogsByDateRange(edgeCaseBlogs, "2025-12-10", "2025-12-10");
  const test8Expected = 2; // Edge 1 and Edge 2
  assert(
    "TC8: Same-day should include midnight start",
    test8Result.some(p => p.title === "Edge 1"),
    true,
    test8Result.some(p => p.title === "Edge 1")
  );
  assert(
    "TC8: Same-day should include end of day",
    test8Result.some(p => p.title === "Edge 2"),
    true,
    test8Result.some(p => p.title === "Edge 2")
  );
  assert(
    "TC8: Should exclude next day midnight",
    !test8Result.some(p => p.title === "Edge 3"),
    true,
    !test8Result.some(p => p.title === "Edge 3")
  );
  console.log("");

  // ==========================================
  // TEST CASE 9: Posts Without Timestamps
  // ==========================================
  console.log("--- Test Case 9: Missing Timestamps ---");
  const missingTimestampBlogs: BlogPost[] = [
    createMockPost("Valid 1", "2025-12-10T12:00:00.000Z"),
    { ...createMockPost("Invalid 1", ""), created_at: "" },
    { ...createMockPost("Invalid 2", ""), created_at: null as any },
  ];
  const test9Result = filterBlogsByDateRange(missingTimestampBlogs, "2025-12-01", "2025-12-31");
  const test9Expected = 1; // Only Valid 1
  assert(
    "TC9: Should filter out posts without timestamps",
    test9Result.length === test9Expected,
    test9Expected,
    test9Result.length
  );
  console.log("");

  // ==========================================
  // TEST CASE 10: Different Date Formats
  // ==========================================
  console.log("--- Test Case 10: Date Format Handling ---");
  const formatTestBlogs: BlogPost[] = [
    createMockPost("ISO Full", "2025-12-10T14:30:00.000Z"),
    createMockPost("ISO Date Only", "2025-12-10"),
    createMockPost("Different Time", "2025-12-10T00:00:00Z"),
  ];
  const test10Result = filterBlogsByDateRange(formatTestBlogs, "2025-12-10", "2025-12-10");
  const test10Expected = 3; // All should match Dec 10
  assert(
    "TC10: Should handle different ISO formats",
    test10Result.length === test10Expected,
    test10Expected,
    test10Result.length
  );
  console.log("");

  // ==========================================
  // TEST SUMMARY
  // ==========================================
  console.log("========================================");
  console.log("📊 TEST SUMMARY");
  console.log("========================================");
  console.log(`✅ Passed: ${passedTests}`);
  console.log(`❌ Failed: ${failedTests}`);
  console.log(`📈 Success Rate: ${((passedTests / (passedTests + failedTests)) * 100).toFixed(1)}%`);
  console.log("========================================\n");

  if (failedTests === 0) {
    console.log("🎉 All tests passed! Date range filter is working correctly.");
  } else {
    console.error("⚠️ Some tests failed. Please review the implementation.");
  }

  return {
    passed: passedTests,
    failed: failedTests,
    total: passedTests + failedTests
  };
}

// Export for use in browser console or testing framework
if (typeof window !== 'undefined') {
  (window as any).runDateRangeFilterTests = runTests;
  console.log("💡 To run tests, type: runDateRangeFilterTests()");
}

export { runTests, filterBlogsByDateRange, createMockPost };
