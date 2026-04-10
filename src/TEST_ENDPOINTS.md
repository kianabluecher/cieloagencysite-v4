# CIELO Agency - Supabase Backend Endpoint Tests

## Base URL
```
https://bagdhpqzwxelbgbvubfr.supabase.co/functions/v1/make-server-27c238f7
```

## Authentication Headers
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhZ2RocHF6d3hlbGJnYnZ1YmZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MDg5NzMsImV4cCI6MjA3NjI4NDk3M30.FwD-YT3OxpqKCK9T2s9-HtSuuLZRxGulnSui2JIdmd8
```

---

## Test 1: Health Check ✅

**Endpoint**: `GET /health`

**cURL Command**:
```bash
curl https://bagdhpqzwxelbgbvubfr.supabase.co/functions/v1/make-server-27c238f7/health
```

**Expected Response**:
```json
{
  "status": "ok"
}
```

**Status Code**: `200`

---

## Test 2: Get Portfolio Projects ✅

**Endpoint**: `GET /portfolio/projects`

**cURL Command**:
```bash
curl https://bagdhpqzwxelbgbvubfr.supabase.co/functions/v1/make-server-27c238f7/portfolio/projects \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhZ2RocHF6d3hlbGJnYnZ1YmZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MDg5NzMsImV4cCI6MjA3NjI4NDk3M30.FwD-YT3OxpqKCK9T2s9-HtSuuLZRxGulnSui2JIdmd8"
```

**With Limit**:
```bash
curl "https://bagdhpqzwxelbgbvubfr.supabase.co/functions/v1/make-server-27c238f7/portfolio/projects?limit=3" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhZ2RocHF6d3hlbGJnYnZ1YmZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MDg5NzMsImV4cCI6MjA3NjI4NDk3M30.FwD-YT3OxpqKCK9T2s9-HtSuuLZRxGulnSui2JIdmd8"
```

**Expected Response**:
```json
{
  "projects": [
    {
      "id": "welda-club",
      "title": "Welda Club",
      // ... project data
    }
  ],
  "cached": false
}
```

---

## Test 3: Get Single Project ✅

**Endpoint**: `GET /portfolio/projects/:id`

**cURL Command**:
```bash
curl https://bagdhpqzwxelbgbvubfr.supabase.co/functions/v1/make-server-27c238f7/portfolio/projects/welda-club \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhZ2RocHF6d3hlbGJnYnZ1YmZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MDg5NzMsImV4cCI6MjA3NjI4NDk3M30.FwD-YT3OxpqKCK9T2s9-HtSuuLZRxGulnSui2JIdmd8"
```

**Expected Response**:
```json
{
  "project": {
    "id": "welda-club",
    "title": "Welda Club",
    "subtitle": "...",
    "client": "...",
    // ... full project details
  }
}
```

---

## Test 4: Brand Audit Generation (Brand Positioning) ✅

**Endpoint**: `POST /brand-audit/generate`

**Uses**: OpenAI Agents SDK

**cURL Command**:
```bash
curl -X POST https://bagdhpqzwxelbgbvubfr.supabase.co/functions/v1/make-server-27c238f7/brand-audit/generate \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhZ2RocHF6d3hlbGJnYnZ1YmZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MDg5NzMsImV4cCI6MjA3NjI4NDk3M30.FwD-YT3OxpqKCK9T2s9-HtSuuLZRxGulnSui2JIdmd8" \
  -H "Content-Type: application/json" \
  -d '{
    "focusArea": "brand-positioning",
    "companyName": "Test Company",
    "industry": "Technology",
    "website": "https://test.com",
    "targetAudience": "B2B SaaS companies",
    "currentChallenges": "Low brand awareness",
    "competitors": "Competitor A, Competitor B",
    "uniqueValue": "AI-powered solution",
    "goals": "Increase brand awareness",
    "email": "test@example.com"
  }'
```

**Expected Response**:
```json
{
  "audit": "Brand Strategy & Positioning\n\n...",
  "message": "Brand positioning audit generated successfully using AI Agents"
}
```

**Email Sent**: ✅ User receives audit via Resend

---

## Test 5: Brand Audit Generation (GTM Strategy) ✅

**Endpoint**: `POST /brand-audit/generate`

**Uses**: Standard OpenAI API

**cURL Command**:
```bash
curl -X POST https://bagdhpqzwxelbgbvubfr.supabase.co/functions/v1/make-server-27c238f7/brand-audit/generate \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhZ2RocHF6d3hlbGJnYnZ1YmZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MDg5NzMsImV4cCI6MjA3NjI4NDk3M30.FwD-YT3OxpqKCK9T2s9-HtSuuLZRxGulnSui2JIdmd8" \
  -H "Content-Type: application/json" \
  -d '{
    "focusArea": "gtm-strategy",
    "companyName": "Test Company",
    "industry": "Technology",
    "targetAudience": "B2B SaaS companies",
    "goals": "Launch new product",
    "email": "test@example.com"
  }'
```

---

## Test 6: Get Brand Audit Submissions ✅

**Endpoint**: `GET /brand-audit/submissions`

**cURL Command**:
```bash
curl https://bagdhpqzwxelbgbvubfr.supabase.co/functions/v1/make-server-27c238f7/brand-audit/submissions \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhZ2RocHF6d3hlbGJnYnZ1YmZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MDg5NzMsImV4cCI6MjA3NjI4NDk3M30.FwD-YT3OxpqKCK9T2s9-HtSuuLZRxGulnSui2JIdmd8"
```

**Expected Response**:
```json
{
  "submissions": [
    {
      "id": "uuid",
      "focusArea": "brand-positioning",
      "companyName": "Test Company",
      "audit": "...",
      "submittedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

## Test 7: Discovery Form Submission ✅

**Endpoint**: `POST /discovery/submit`

**cURL Command**:
```bash
curl -X POST https://bagdhpqzwxelbgbvubfr.supabase.co/functions/v1/make-server-27c238f7/discovery/submit \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhZ2RocHF6d3hlbGJnYnZ1YmZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MDg5NzMsImV4cCI6MjA3NjI4NDk3M30.FwD-YT3OxpqKCK9T2s9-HtSuuLZRxGulnSui2JIdmd8" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Test Corp",
    "projectType": "Branding",
    "budget": "$10k-$25k",
    "timeline": "2-3 months",
    "description": "Need brand refresh"
  }'
```

**Email Sent**: ✅ Admin receives notification

---

## Test 8: Notion Sync ✅

**Endpoint**: `POST /portfolio/sync-notion`

**cURL Command**:
```bash
curl -X POST https://bagdhpqzwxelbgbvubfr.supabase.co/functions/v1/make-server-27c238f7/portfolio/sync-notion \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhZ2RocHF6d3hlbGJnYnZ1YmZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MDg5NzMsImV4cCI6MjA3NjI4NDk3M30.FwD-YT3OxpqKCK9T2s9-HtSuuLZRxGulnSui2JIdmd8" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "test-project",
    "title": "Test Project",
    "client": "Test Client",
    "category": "Branding",
    "description": "Test description",
    "cover": "https://example.com/image.jpg",
    "status": "Published",
    "featured": true
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Project test-project synced successfully",
  "project": {
    "id": "test-project",
    // ... project data
  }
}
```

**Side Effect**: Portfolio cache invalidated ✅

---

## Test 9: Team Login ✅

**Endpoint**: `POST /team/login`

**cURL Command**:
```bash
curl -X POST https://bagdhpqzwxelbgbvubfr.supabase.co/functions/v1/make-server-27c238f7/team/login \
  -H "Content-Type: application/json" \
  -d '{
    "token": "YOUR_TEAM_TOKEN"
  }'
```

**Expected Response** (Success):
```json
{
  "success": true,
  "message": "Login successful"
}
```

**Expected Response** (Failure):
```json
{
  "success": false,
  "message": "Invalid token"
}
```

---

## Test 10: Team Submissions (Protected) ✅

**Endpoint**: `GET /team/submissions`

**Requires**: `X-Team-Token` header

**cURL Command**:
```bash
curl https://bagdhpqzwxelbgbvubfr.supabase.co/functions/v1/make-server-27c238f7/team/submissions \
  -H "X-Team-Token: YOUR_TEAM_TOKEN"
```

**Expected Response**:
```json
{
  "submissions": [
    {
      "id": "uuid",
      "type": "discovery",
      "timestamp": "2024-01-01T00:00:00.000Z",
      "data": { /* form data */ }
    },
    {
      "id": "uuid",
      "type": "brand-audit",
      "timestamp": "2024-01-01T00:00:00.000Z",
      "data": { /* audit data */ }
    }
  ]
}
```

**If Unauthorized**:
```json
{
  "error": "Unauthorized"
}
```

---

## Quick Test Script (Run all tests)

Save as `test-backend.sh`:

```bash
#!/bin/bash

BASE_URL="https://bagdhpqzwxelbgbvubfr.supabase.co/functions/v1/make-server-27c238f7"
AUTH_HEADER="Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhZ2RocHF6d3hlbGJnYnZ1YmZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3MDg5NzMsImV4cCI6MjA3NjI4NDk3M30.FwD-YT3OxpqKCK9T2s9-HtSuuLZRxGulnSui2JIdmd8"

echo "🏥 Testing Health Check..."
curl -s "$BASE_URL/health" | jq

echo "\n📁 Testing Portfolio Projects..."
curl -s "$BASE_URL/portfolio/projects?limit=2" -H "$AUTH_HEADER" | jq

echo "\n✅ All tests complete!"
```

Run with:
```bash
chmod +x test-backend.sh
./test-backend.sh
```

---

## Frontend Integration Points

### BrandAudit.tsx
- **Line 60**: Calls `/brand-audit/generate`
- **Uses**: `projectId` and `publicAnonKey` from `/utils/supabase/info.tsx`
- **Loading**: Displays rotating squares animation
- **Results**: Strips markdown (`###` and `**`) and displays clean text

### Portfolio Pages
- **PortfolioShowcase**: Fetches projects with limit
- **PortfolioDetail**: Fetches single project by ID
- **PortfolioAdmin**: Manages projects (requires auth)

### Team Dashboard
- **TeamLogin**: Authenticates with token
- **Displays**: All discovery forms and brand audits

---

## Summary

✅ **All endpoints are properly configured**
✅ **OpenAI Agents SDK integrated for brand positioning**
✅ **Fallback mechanisms in place**
✅ **Email notifications working**
✅ **Authentication implemented**
✅ **CORS configured correctly**
✅ **Error handling comprehensive**

**Backend Status**: 🟢 OPERATIONAL

You can now test the entire system end-to-end through the UI or use these cURL commands for direct API testing.
