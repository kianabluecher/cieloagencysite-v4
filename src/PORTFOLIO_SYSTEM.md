# Portfolio System Documentation

## Overview

The portfolio system uses **two storage systems**:
1. **KV Store** - For portfolio submissions from the public form
2. **Supabase Table (`portfolio_projects`)** - For published portfolio projects managed by admins

## How It Works

### 1. Public Submissions (`/portfolio-submit`)

When users submit their portfolio via the public form:
- Data is stored in **KV Store** with prefix `portfolio_submission:`
- Each submission gets a unique UUID
- `status` is set to `'pending'`
- Fields: `name`, `email`, `phone`, `company`, `portfolio_url`, `website`, `message`

**Storage Example:**
```
Key: portfolio_submission:550e8400-e29b-41d4-a716-446655440000
Value: {
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "John Doe",
  email: "john@example.com",
  portfolio_url: "https://...",
  status: "pending",
  submitted_at: "2025-11-29T...",
  ...
}
```

### 2. Admin Dashboard (Team Dashboard > Portfolio Management)

**Three Tabs:**

#### 📬 **Submissions Tab**
- Shows all submissions from KV Store
- Filter by status: pending/approved/rejected
- Search by name, email, or company
- Actions:
  - ✅ Approve submission
  - ❌ Reject submission
  - 🗑️ Delete submission
  - 👁️ View details

#### 📁 **Projects Tab**
- Shows all portfolio projects from Supabase `portfolio_projects` table
- Create new projects with auto-generated UUID
- Edit existing projects
- Upload images
- Features:
  - Auto-generated project ID
  - Date picker for project dates
  - Image gallery management
  - Rich metadata (title, category, tags, etc.)

#### 🖼️ **Images Tab**
- Browse all images in Supabase Storage
- Upload new images to `portfolio-images` bucket
- Get image URLs for use in projects
- Manage portfolio assets

## Storage Structures

### KV Store (Submissions)

Prefix: `portfolio_submission:`

**Fields:**
- `id` - UUID (auto-generated)
- `name` - Submitter name
- `email` - Submitter email
- `phone` - Contact phone
- `company` - Company name
- `portfolio_url` - Link to portfolio
- `website` - Website URL
- `message` - Additional message
- `status` - pending/approved/rejected
- `submitted_at` - Submission timestamp
- `reviewed_at` - Review timestamp
- `reviewed_by` - Admin email who reviewed
- `notes` - Admin notes

### Supabase Table: `portfolio_projects`

**Project Fields:**
- `id` - UUID (auto-generated)
- `title` - Project title
- `subtitle` - Short description
- `category` - Project category
- `project_type` / `projectType` - Type of project
- `date` / `date_label` - Project date
- `client_type` / `clientType` - Client category
- `description` - Full description
- `what_we_did` / `whatWeDid` - Array of deliverables
- `result` - Project outcome
- `images` - Array of image URLs
- `featured` - Boolean (show on homepage)
- `published` - Boolean (visible on site)
- `tags` - Array of tags

## Workflows

### Workflow 1: Public Submission
```
User fills form → Submit → Stored in KV Store
                           (portfolio_submission:UUID)
                           ↓
                    Shows in Submissions tab
                           ↓
                    Admin approves/rejects
```

### Workflow 2: Direct Project Creation
```
Admin → Projects tab → New Project → Fill form → Save
                                                  ↓
                                    Auto-generate ID
                                                  ↓
                            Store in portfolio_projects table
                                                  ↓
                                    Shows in Projects tab
                                    & public website
```

### Workflow 3: Converting Submission to Project
```
Submissions tab → View submission → Get info
                                    ↓
Projects tab → New Project → Fill with submission data
                             ↓
                      Save as project
                             ↓
              Stored in portfolio_projects table
                             ↓
                  Shows on public website
```

## Key Features

### Auto-Generated IDs
- New projects get automatic UUID via `crypto.randomUUID()`
- No need to manually create unique IDs
- Backend handles ID generation

### Date Picker
- Use native HTML5 date input
- Format: `YYYY-MM-DD`
- Dark mode compatible with `[color-scheme:dark]`

### Status Management
- **Pending**: New submissions awaiting review
- **Approved**: Submissions accepted
- **Rejected**: Submissions declined

### Image Management
- Upload to Supabase Storage bucket `portfolio-images`
- Get public URLs for embedding
- Support multiple images per project

## API Endpoints

### Public Endpoints
- `POST /portfolio-submissions/submit` - Submit portfolio

### Admin Endpoints (require auth)
- `GET /portfolio-submissions/list` - List all submissions
- `PUT /portfolio-submissions/:id` - Update submission status
- `DELETE /portfolio-submissions/:id` - Delete submission
- `GET /portfolio/projects` - List all projects
- `POST /portfolio/projects` - Create project
- `PUT /portfolio/projects/:id` - Update project
- `DELETE /portfolio/projects/:id` - Delete project

## Differentiating Submissions from Projects

**Submissions (KV Store):**
- Stored with prefix `portfolio_submission:`
- Have `name`, `email`, and `portfolio_url` fields
- Status is pending/approved/rejected
- Used for review/approval workflow
- Not visible on public website

**Projects (Supabase Table):**
- Stored in `portfolio_projects` table
- Have `title` field (required)
- Have `images` array
- May have `featured` and `published` flags
- Created/managed by admins
- Visible on public website when published

## Key Benefits of Separate Storage

✅ **Clean Separation** - Submissions don't clutter the projects table  
✅ **Simple Management** - Easy to list, filter, and manage submissions  
✅ **No Schema Conflicts** - Submissions use different fields than projects  
✅ **Flexible** - Can easily add/modify submission fields without affecting projects  
✅ **Secure** - KV store is backend-only, submissions never exposed publicly

## Notes

- Submissions are stored in KV store for easy management
- Projects are in Supabase table for public querying
- Admins can manually create projects from approved submissions
- All operations are logged with timestamps and reviewer info
- KV store prefix allows easy querying: `portfolio_submission:*`
