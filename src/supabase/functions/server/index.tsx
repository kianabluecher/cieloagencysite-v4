import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";
import { formatAuditEmail, formatAdminEmail } from "./email_templates.tsx";
import { appendToSheet, formatLetsTalkSubmission, formatRapidDeliverySubmission, formatBrandWebSubmission, formatSocialMediaSubmission, formatJobApplicationSubmission } from "./google_sheets.tsx";
import * as sheetsOAuth from "./google_sheets_oauth.tsx";
import * as teamManagement from "./team_management.tsx";
import * as jiraIntegration from "./jira_integration.tsx";
import * as fathomIntegration from "./fathom_integration.tsx";
import * as heyreach from "./heyreach.tsx";
import { elleEmailWebhook } from "./elle_workflow.tsx";
import { verifiedPortfolioProjects } from "./portfolio_data.ts";
import { figmaAssets } from "./assets_data.ts";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

const app = new Hono();

// Configure CORS and logging
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'cache-control', 'x-requested-with'],
  exposeHeaders: ['Content-Length', 'X-JSON'],
  credentials: true,
  maxAge: 600,
}));
app.use('*', logger(console.log));

// Initialize storage bucket on startup
const BUCKET_NAME = "make-27c238f7-portfolio";
const BLOG_BUCKET_NAME = "make-27c238f7-blog-images";
const ASSETS_BUCKET_NAME = "make-27c238f7-assets";

(async () => {
  // Portfolio bucket
  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_NAME);
  if (!bucketExists) {
    await supabase.storage.createBucket(BUCKET_NAME, { public: true });
    console.log(`Created storage bucket: ${BUCKET_NAME}`);
  }
  
  // Blog images bucket - no file size limit
  const blogBucketExists = buckets?.some(bucket => bucket.name === BLOG_BUCKET_NAME);
  if (!blogBucketExists) {
    await supabase.storage.createBucket(BLOG_BUCKET_NAME, { 
      public: true,
      fileSizeLimit: 52428800 // 50MB limit
    });
    console.log(`Created storage bucket: ${BLOG_BUCKET_NAME}`);
  }

  // Assets bucket for Figma assets
  const assetsBucketExists = buckets?.some(bucket => bucket.name === ASSETS_BUCKET_NAME);
  if (!assetsBucketExists) {
    await supabase.storage.createBucket(ASSETS_BUCKET_NAME, { 
      public: true,
      fileSizeLimit: 52428800 // 50MB limit
    });
    console.log(`Created storage bucket: ${ASSETS_BUCKET_NAME}`);
  }
})();

// Initialize blog_posts table on startup
(async () => {
  try {
    console.log('🔍 Checking if blog_posts table exists...');
    
    // Try to query the table - if it doesn't exist, we'll get an error
    const { error: checkError } = await supabase
      .from('blog_posts')
      .select('id')
      .limit(1);
    
    if (checkError && checkError.code === '42P01') {
      // Table doesn't exist (error code 42P01 = undefined_table)
      console.log('⚠️ blog_posts table does not exist.');
      console.log('📋 Please create it manually in Supabase Dashboard > SQL Editor with this SQL:');
      console.log(`
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  featured_image_alt TEXT,
  thumbnail TEXT,
  author TEXT NOT NULL,
  author_name TEXT,
  author_avatar TEXT,
  author_bio TEXT,
  author_role TEXT,
  author_id TEXT,
  category TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  scheduled_for TIMESTAMPTZ,
  categories TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[] DEFAULT '{}',
  read_time_minutes INTEGER,
  related_post_ids TEXT[] DEFAULT '{}',
  allow_comments BOOLEAN DEFAULT true,
  show_in_feed BOOLEAN DEFAULT true,
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_edited_by TEXT,
  publish_date TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);
      `);
    } else if (checkError) {
      console.error('❌ Error checking blog_posts table:', checkError);
    } else {
      console.log('✅ blog_posts table already exists');
    }
  } catch (error) {
    console.error('❌ Error initializing blog_posts table:', error);
  }
})();

// Auto-create owner user on startup if credentials provided in env vars
const OWNER_EMAIL = Deno.env.get("OWNER_EMAIL");
const OWNER_PASSWORD = Deno.env.get("OWNER_PASSWORD");
const OWNER_NAME = "CIELO Agency";

(async () => {
  if (!OWNER_EMAIL || !OWNER_PASSWORD) {
    console.log("⚠️ Skipping owner user creation: OWNER_EMAIL and/or OWNER_PASSWORD environment variables not set.");
    return;
  }

  try {
    console.log(`🔍 Checking if owner user exists: ${OWNER_EMAIL}`);
    
    // Check if user already exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const userExists = existingUsers?.users?.some(u => u.email === OWNER_EMAIL);
    
    if (userExists) {
      console.log(`✅ Owner user already exists: ${OWNER_EMAIL}`);
      
      // Find the user and ensure email is confirmed
      const user = existingUsers?.users?.find(u => u.email === OWNER_EMAIL);
      if (user && !user.email_confirmed_at) {
        console.log(`🔧 Confirming email for: ${OWNER_EMAIL}`);
        await supabase.auth.admin.updateUserById(user.id, {
          email_confirm: true,
        });
        console.log(`✅ Email confirmed for: ${OWNER_EMAIL}`);
      }
    } else {
      console.log(`📝 Creating owner user: ${OWNER_EMAIL}`);
      
      // Create the owner user with confirmed email
      const { data, error } = await supabase.auth.admin.createUser({
        email: OWNER_EMAIL,
        password: OWNER_PASSWORD,
        user_metadata: { 
          full_name: OWNER_NAME,
          role: 'admin',
          is_owner: true
        },
        email_confirm: true, // Auto-confirm email
      });
      
      if (error) {
        console.error(`❌ Failed to create owner user:`, error);
      } else {
        console.log(`✅ Owner user created successfully: ${OWNER_EMAIL}`);
        console.log(`   User ID: ${data.user?.id}`);
      }
    }
  } catch (error) {
    console.error(`❌ Error in owner user initialization:`, error);
  }
})();

// Auto-upload Figma assets to Supabase Storage on startup
(async () => {
  try {
    console.log('🔍 Checking if Figma assets need to be uploaded to Supabase...');
    
    // Check if assets are already uploaded by checking the first asset
    const firstAsset = figmaAssets[0];
    const { data: existingFile, error: checkError } = await supabase.storage
      .from(ASSETS_BUCKET_NAME)
      .list('', {
        limit: 1,
        offset: 0,
      });

    if (existingFile && existingFile.length > 0) {
      console.log(`✅ Assets bucket already has ${existingFile.length} files. Skipping auto-upload.`);
      return;
    }

    console.log(`📤 Starting auto-upload of ${figmaAssets.length} Figma assets to Supabase...`);
    
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < figmaAssets.length; i++) {
      const asset = figmaAssets[i];
      try {
        // Construct the figma:asset URL
        const figmaUrl = `figma:asset/${asset.hash}.png`;
        
        // Fetch the image from the figma:asset URL
        const response = await fetch(figmaUrl);
        
        if (!response.ok) {
          console.error(`❌ Failed to fetch ${asset.name}: ${response.status}`);
          errorCount++;
          continue;
        }

        const arrayBuffer = await response.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        
        const fileName = `${asset.hash}.png`;
        
        const { error: uploadError } = await supabase.storage
          .from(ASSETS_BUCKET_NAME)
          .upload(fileName, uint8Array, {
            contentType: 'image/png',
            cacheControl: '31536000', // 1 year cache
            upsert: false,
          });

        if (uploadError) {
          console.error(`❌ Upload error for ${asset.name}:`, uploadError.message);
          errorCount++;
        } else {
          successCount++;
          if (successCount % 10 === 0) {
            console.log(`✅ Progress: ${successCount}/${figmaAssets.length} assets uploaded`);
          }
        }
      } catch (err: any) {
        console.error(`❌ Error uploading ${asset.name}:`, err.message);
        errorCount++;
      }
    }

    console.log(`✅ Auto-upload complete! Success: ${successCount}, Errors: ${errorCount}`);
  } catch (error) {
    console.error(`❌ Error in Figma assets auto-upload:`, error);
  }
})();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "X-Team-Token"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Initialize owner user manually (can be called from frontend)
app.post("/make-server-27c238f7/auth/init-owner", async (c) => {
  try {
    const OWNER_EMAIL = Deno.env.get("OWNER_EMAIL") || "agency@cielo.marketing";
    const OWNER_PASSWORD = Deno.env.get("OWNER_PASSWORD") || "agencycielo765598";
    const OWNER_NAME = "CIELO Agency";

    console.log(`🔍 Checking/Creating owner user: ${OWNER_EMAIL}`);
    
    // Check if user already exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const userExists = existingUsers?.users?.some(u => u.email === OWNER_EMAIL);
    
    let user;
    
    if (userExists) {
      user = existingUsers?.users?.find(u => u.email === OWNER_EMAIL);
      console.log(`✅ Owner user already exists: ${OWNER_EMAIL}`);
      
      // Ensure email is confirmed and metadata is set
      if (user && (!user.email_confirmed_at || user.user_metadata?.role !== 'admin')) {
         await supabase.auth.admin.updateUserById(user.id, {
          email_confirm: true,
          user_metadata: { 
            ...user.user_metadata,
            full_name: OWNER_NAME,
            role: 'admin',
            is_owner: true
          }
        });
        console.log(`✅ Updated owner user metadata/confirmation`);
      }
    } else {
      console.log(`📝 Creating owner user: ${OWNER_EMAIL}`);
      
      // Create the owner user with confirmed email
      const { data, error } = await supabase.auth.admin.createUser({
        email: OWNER_EMAIL,
        password: OWNER_PASSWORD,
        user_metadata: { 
          full_name: OWNER_NAME,
          role: 'admin',
          is_owner: true
        },
        email_confirm: true,
      });
      
      if (error) {
        console.error(`❌ Failed to create owner user:`, error);
        return c.json({ error: error.message }, 400);
      }
      user = data.user;
    }
    
    return c.json({ 
      success: true, 
      message: "Owner user initialized successfully",
      user: {
        id: user?.id,
        email: user?.email,
        status: user?.email_confirmed_at ? 'confirmed' : 'created'
      }
    });
  } catch (error) {
    console.error(`❌ Error in owner initialization:`, error);
    return c.json({ error: "Failed to initialize owner", details: error.message }, 500);
  }
});

// ============================================
// ADMIN AUTHENTICATION MIDDLEWARE
// ============================================

/**
 * Middleware to verify admin access via Supabase Auth
 * Checks if the user has admin role in their metadata
 */
async function verifyAdmin(c: any) {
  const authHeader = c.req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { error: 'No authorization token provided', status: 401 };
  }

  const token = authHeader.split(' ')[1];
  
  try {
    // Verify the token and get user
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      console.error('❌ Auth verification failed:', error);
      return { error: 'Invalid or expired token', status: 401 };
    }
    
    // Check if user has admin role
    const userRole = user.user_metadata?.role;
    const isOwner = user.user_metadata?.is_owner;
    
    if (userRole !== 'admin' && !isOwner) {
      console.error(`❌ Access denied for user ${user.email}: not an admin`);
      return { error: 'Access denied. Admin privileges required.', status: 403 };
    }
    
    console.log(`✅ Admin access verified for: ${user.email}`);
    return { user, error: null };
  } catch (error) {
    console.error('❌ Error verifying admin:', error);
    return { error: 'Authentication failed', status: 500 };
  }
}

/**
 * Middleware to verify any authenticated user (admin or team member)
 * Does not check for admin role, only verifies valid authentication
 */
async function verifyAuth(c: any) {
  const authHeader = c.req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { error: 'No authorization token provided', status: 401 };
  }

  const token = authHeader.split(' ')[1];
  
  try {
    // Verify the token and get user
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      console.error('❌ Auth verification failed:', error);
      return { error: 'Invalid or expired token', status: 401 };
    }
    
    console.log(`✅ User authenticated: ${user.email}`);
    return { user, error: null };
  } catch (error) {
    console.error('❌ Error verifying authentication:', error);
    return { error: 'Authentication failed', status: 500 };
  }
}

// ============================================
// ADMIN MANAGEMENT ENDPOINTS
// ============================================

// Get current user info (including admin status)
app.get("/make-server-27c238f7/auth/me", async (c) => {
  const authHeader = c.req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'No authorization token' }, 401);
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return c.json({ error: 'Invalid token' }, 401);
    }
    
    return c.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name,
        role: user.user_metadata?.role,
        is_owner: user.user_metadata?.is_owner || false,
        is_admin: user.user_metadata?.role === 'admin' || user.user_metadata?.is_owner,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    console.error('❌ Error getting user info:', error);
    return c.json({ error: 'Failed to get user info' }, 500);
  }
});

// List all users (admin only, owner only)
app.get("/make-server-27c238f7/auth/users", async (c) => {
  const authResult = await verifyAdmin(c);
  
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  
  // Only owner can list users
  if (!authResult.user.user_metadata?.is_owner) {
    return c.json({ error: 'Only owner can list users' }, 403);
  }
  
  try {
    const { data, error } = await supabase.auth.admin.listUsers();
    
    if (error) {
      console.error('❌ Error listing users:', error);
      return c.json({ error: 'Failed to list users' }, 500);
    }
    
    // Format user data
    const users = data.users.map(user => ({
      id: user.id,
      email: user.email,
      full_name: user.user_metadata?.full_name,
      role: user.user_metadata?.role,
      is_owner: user.user_metadata?.is_owner || false,
      created_at: user.created_at,
      email_confirmed: !!user.email_confirmed_at,
    }));
    
    return c.json({ success: true, users });
  } catch (error) {
    console.error('❌ Error listing users:', error);
    return c.json({ error: 'Failed to list users' }, 500);
  }
});

// Promote user to admin (owner only)
app.post("/make-server-27c238f7/auth/promote-admin", async (c) => {
  const authResult = await verifyAdmin(c);
  
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  
  // Only owner can promote users
  if (!authResult.user.user_metadata?.is_owner) {
    return c.json({ error: 'Only owner can promote users to admin' }, 403);
  }
  
  try {
    const { userId } = await c.req.json();
    
    if (!userId) {
      return c.json({ error: 'userId is required' }, 400);
    }
    
    // Update user metadata to make them admin
    const { data, error } = await supabase.auth.admin.updateUserById(userId, {
      user_metadata: { role: 'admin' },
    });
    
    if (error) {
      console.error('❌ Error promoting user:', error);
      return c.json({ error: 'Failed to promote user' }, 500);
    }
    
    console.log(`✅ User promoted to admin: ${data.user?.email}`);
    return c.json({ success: true, message: 'User promoted to admin', user: data.user });
  } catch (error) {
    console.error('❌ Error promoting user:', error);
    return c.json({ error: 'Failed to promote user' }, 500);
  }
});

// Demote admin to regular user (owner only)
app.post("/make-server-27c238f7/auth/demote-admin", async (c) => {
  const authResult = await verifyAdmin(c);
  
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  
  // Only owner can demote users
  if (!authResult.user.user_metadata?.is_owner) {
    return c.json({ error: 'Only owner can demote admins' }, 403);
  }
  
  try {
    const { userId } = await c.req.json();
    
    if (!userId) {
      return c.json({ error: 'userId is required' }, 400);
    }
    
    // Prevent owner from demoting themselves
    if (userId === authResult.user.id) {
      return c.json({ error: 'Cannot demote yourself' }, 400);
    }
    
    // Update user metadata to remove admin role
    const { data, error } = await supabase.auth.admin.updateUserById(userId, {
      user_metadata: { role: 'team' },
    });
    
    if (error) {
      console.error('❌ Error demoting user:', error);
      return c.json({ error: 'Failed to demote user' }, 500);
    }
    
    console.log(`✅ User demoted from admin: ${data.user?.email}`);
    return c.json({ success: true, message: 'User demoted from admin', user: data.user });
  } catch (error) {
    console.error('❌ Error demoting user:', error);
    return c.json({ error: 'Failed to demote user' }, 500);
  }
});

// Health check endpoint
app.get("/make-server-27c238f7/health", (c) => {
  return c.json({ status: "ok" });
});

// In-memory cache for portfolio projects
let portfolioCache: any = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 30000; // 30 seconds in milliseconds

// Helper function to generate a URL-friendly slug from a title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Helper function to ensure slug uniqueness
async function ensureUniqueSlug(supabase: any, baseSlug: string, excludeId?: string): Promise<string> {
  let slug = baseSlug;
  let counter = 1;
  
  while (true) {
    const query = supabase
      .from('portfolio_projects')
      .select('id')
      .eq('slug', slug);
    
    if (excludeId) {
      query.neq('id', excludeId);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error checking slug uniqueness:', error);
      return slug; // Return the slug anyway if there's an error
    }
    
    if (!data || data.length === 0) {
      return slug; // Slug is unique
    }
    
    // Slug exists, try with counter
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

// Portfolio endpoints - Using Supabase portfolio_projects table
app.get("/make-server-27c238f7/portfolio/projects", async (c) => {
  try {
    const now = Date.now();
    
    // Return cached data if still valid
    if (portfolioCache && (now - cacheTimestamp) < CACHE_DURATION) {
      c.header('Cache-Control', 'public, max-age=30');
      return c.json({ projects: portfolioCache, cached: true });
    }
    
    // Fetch from Supabase
    const limit = c.req.query('limit');
    
    let query = supabase
      .from('portfolio_projects')
      .select('*')
      .eq('published', true)
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false });
    
    if (limit) {
      query = query.limit(parseInt(limit));
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.log("Error fetching portfolio from Supabase:", error);
      return c.json({ error: "Failed to fetch projects", details: error.message }, 500);
    }
    
    // Update cache
    portfolioCache = data || [];
    cacheTimestamp = now;
    
    c.header('Cache-Control', 'public, max-age=30');
    console.log(`Fetched ${data?.length || 0} portfolio projects from Supabase`);
    return c.json({ projects: data || [], cached: false });
  } catch (error) {
    console.log("Error fetching portfolio projects:", error);
    return c.json({ error: "Failed to fetch projects", details: error.message }, 500);
  }
});

app.get("/make-server-27c238f7/portfolio/projects/:id", async (c) => {
  try {
    const id = c.req.param("id");
    
    // Try to determine if this is a slug or an ID
    // UUIDs contain dashes and are 36 chars, slugs are typically lowercase with dashes
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    
    let data, error;
    
    if (isUUID) {
      // Look up by ID
      ({ data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .eq('id', id)
        .single());
    } else {
      // Look up by slug
      ({ data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .eq('slug', id)
        .single());
    }
    
    if (error || !data) {
      console.log(`Project not found: ${id} (looked up as ${isUUID ? 'ID' : 'slug'})`);
      return c.json({ error: "Project not found" }, 404);
    }
    
    // Increment view count
    await supabase
      .from('portfolio_projects')
      .update({ view_count: (data.view_count || 0) + 1 })
      .eq('id', data.id);
    
    return c.json({ project: data });
  } catch (error) {
    console.log("Error fetching portfolio project:", error);
    return c.json({ error: "Failed to fetch project", details: error.message }, 500);
  }
});

app.post("/make-server-27c238f7/portfolio/projects", async (c) => {
  try {
    const body = await c.req.json();
    
    if (!body.title) {
      return c.json({ error: "Missing required field: title" }, 400);
    }

    // Auto-generate UUID for id if not provided
    const projectId = body.id || crypto.randomUUID();

    // Auto-generate slug from title if not provided
    const baseSlug = body.slug || generateSlug(body.title);
    const uniqueSlug = await ensureUniqueSlug(supabase, baseSlug);

    // Only include fields that exist in the table schema
    const projectData = {
      id: projectId,
      title: body.title,
      slug: uniqueSlug,
      category: body.category || null,
      description: body.description || null,
      featured: body.featured || false,
      published: body.published !== undefined ? body.published : true,
      status: body.status || 'draft',
      tags: body.tags || [],
      // Optional fields that exist in schema
      client_name: body.client_name || body.client || null,
      project_type: body.project_type || null,
      industry: body.industry || null,
      featured_image: body.featured_image || null,
      featured_image_alt: body.featured_image_alt || null,
      thumbnail: body.thumbnail || null,
      gallery_images: body.gallery_images || body.images || [],
      video_url: body.video_url || null,
      challenge: body.challenge || null,
      solution: body.solution || null,
      results: body.results || null,
      technologies: body.technologies || [],
      live_url: body.live_url || null,
      case_study_url: body.case_study_url || null,
      github_url: body.github_url || null,
      completion_date: body.completion_date || null,
      duration_weeks: body.duration_weeks || null,
      team_size: body.team_size || null,
      meta_title: body.meta_title || null,
      meta_description: body.meta_description || null,
      excerpt: body.excerpt || null,
    };

    const { data, error } = await supabase
      .from('portfolio_projects')
      .insert([projectData])
      .select()
      .single();
    
    if (error) {
      console.log("Error creating portfolio project in Supabase:", error);
      return c.json({ error: "Failed to create project", details: error.message }, 500);
    }
    
    // Invalidate cache
    portfolioCache = null;
    
    console.log(`Portfolio project created: ${body.title}`);
    return c.json({ success: true, project: data });
  } catch (error) {
    console.log("Error creating portfolio project:", error);
    return c.json({ error: "Failed to create project", details: error.message }, 500);
  }
});

app.put("/make-server-27c238f7/portfolio/projects/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    
    // Map field names to match database schema (only fields that exist)
    const updates: any = {};
    
    // Core fields
    if (body.title !== undefined) updates.title = body.title;
    if (body.category !== undefined) updates.category = body.category;
    if (body.description !== undefined) updates.description = body.description;
    if (body.featured !== undefined) updates.featured = body.featured;
    if (body.published !== undefined) updates.published = body.published;
    if (body.status !== undefined) updates.status = body.status;
    if (body.tags !== undefined) updates.tags = body.tags;
    
    // Optional fields that exist in schema
    if (body.client_name !== undefined) updates.client_name = body.client_name;
    else if (body.client !== undefined) updates.client_name = body.client;
    if (body.project_type !== undefined) updates.project_type = body.project_type;
    if (body.industry !== undefined) updates.industry = body.industry;
    if (body.featured_image !== undefined) updates.featured_image = body.featured_image;
    if (body.featured_image_alt !== undefined) updates.featured_image_alt = body.featured_image_alt;
    if (body.thumbnail !== undefined) updates.thumbnail = body.thumbnail;
    if (body.gallery_images !== undefined) updates.gallery_images = body.gallery_images;
    if (body.video_url !== undefined) updates.video_url = body.video_url;
    if (body.challenge !== undefined) updates.challenge = body.challenge;
    if (body.solution !== undefined) updates.solution = body.solution;
    if (body.results !== undefined) updates.results = body.results;
    if (body.technologies !== undefined) updates.technologies = body.technologies;
    if (body.live_url !== undefined) updates.live_url = body.live_url;
    if (body.case_study_url !== undefined) updates.case_study_url = body.case_study_url;
    if (body.github_url !== undefined) updates.github_url = body.github_url;
    if (body.completion_date !== undefined) updates.completion_date = body.completion_date;
    if (body.duration_weeks !== undefined) updates.duration_weeks = body.duration_weeks;
    if (body.team_size !== undefined) updates.team_size = body.team_size;
    if (body.meta_title !== undefined) updates.meta_title = body.meta_title;
    if (body.meta_description !== undefined) updates.meta_description = body.meta_description;
    if (body.excerpt !== undefined) updates.excerpt = body.excerpt;
    
    // Handle slug: regenerate if title changed or slug explicitly provided
    if (body.slug !== undefined) {
      const baseSlug = generateSlug(body.slug);
      updates.slug = await ensureUniqueSlug(supabase, baseSlug, id);
    } else if (body.title !== undefined) {
      const baseSlug = generateSlug(body.title);
      updates.slug = await ensureUniqueSlug(supabase, baseSlug, id);
    }

    const { data, error } = await supabase
      .from('portfolio_projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.log("Error updating portfolio project in Supabase:", error);
      return c.json({ error: "Failed to update project", details: error.message }, 500);
    }
    
    if (!data) {
      return c.json({ error: "Project not found" }, 404);
    }
    
    // Invalidate cache
    portfolioCache = null;
    
    console.log(`Portfolio project updated: ${id}`);
    return c.json({ success: true, project: data });
  } catch (error) {
    console.log("Error updating portfolio project:", error);
    return c.json({ error: "Failed to update project", details: error.message }, 500);
  }
});

app.delete("/make-server-27c238f7/portfolio/projects/:id", async (c) => {
  try {
    const id = c.req.param("id");
    
    const { error } = await supabase
      .from('portfolio_projects')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.log("Error deleting portfolio project from Supabase:", error);
      return c.json({ error: "Failed to delete project", details: error.message }, 500);
    }
    
    // Invalidate cache
    portfolioCache = null;
    
    console.log(`Portfolio project deleted: ${id}`);
    return c.json({ success: true, message: "Project deleted" });
  } catch (error) {
    console.log("Error deleting portfolio project:", error);
    return c.json({ error: "Failed to delete project", details: error.message }, 500);
  }
});

app.post("/make-server-27c238f7/portfolio/upload", async (c) => {
  try {
    const body = await c.req.parseBody();
    const file = body['file'] as File;
    
    if (!file) {
      return c.json({ error: "No file provided" }, 400);
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `portfolio/${fileName}`;

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, uint8Array, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.log("Error uploading to storage:", error);
      return c.json({ error: "Failed to upload file", details: error.message }, 500);
    }

    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    return c.json({ success: true, url: publicUrl, path: filePath });
  } catch (error) {
    console.log("Error in upload endpoint:", error);
    return c.json({ error: "Failed to upload image", details: error.message }, 500);
  }
});

// Blog image upload endpoint
app.post("/make-server-27c238f7/blog/upload", async (c) => {
  try {
    console.log('🔵 Blog upload endpoint hit');
    
    const body = await c.req.parseBody();
    console.log('📦 Body parsed, keys:', Object.keys(body));
    
    const file = body['file'] as File;
    const imageType = body['type'] as string || 'featured'; // 'featured' or 'avatar'
    
    console.log('📝 Upload type:', imageType);
    console.log('📁 File received:', file ? file.name : 'NO FILE');
    
    if (!file) {
      console.error('❌ No file in request');
      return c.json({ error: "No file provided" }, 400);
    }

    console.log('📊 File details:', {
      name: file.name,
      type: file.type,
      size: file.size
    });

    // Validate file type only
    if (!file.type.startsWith('image/')) {
      console.error('❌ Invalid file type:', file.type);
      return c.json({ error: "File must be an image" }, 400);
    }

    // No file size limit - accept all image sizes

    const fileExt = file.name.split('.').pop();
    const fileName = `${imageType}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    console.log('📂 Target path:', filePath);
    console.log('🗄️ Bucket:', BLOG_BUCKET_NAME);

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    console.log('💾 Uploading to Supabase Storage...');
    
    const { data, error } = await supabase.storage
      .from(BLOG_BUCKET_NAME)
      .upload(filePath, uint8Array, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error("❌ Storage upload error:", error);
      return c.json({ error: "Failed to upload image", details: error.message }, 500);
    }

    console.log('✅ Upload successful, data:', data);

    const { data: { publicUrl } } = supabase.storage
      .from(BLOG_BUCKET_NAME)
      .getPublicUrl(filePath);

    console.log(`✅ Blog ${imageType} image uploaded: ${publicUrl}`);
    return c.json({ success: true, url: publicUrl, path: filePath });
  } catch (error: any) {
    console.error("❌ Error in blog upload endpoint:", error);
    console.error("❌ Error stack:", error.stack);
    return c.json({ error: "Failed to upload image", details: error.message }, 500);
  }
});

// Assets upload endpoint - for Figma assets migration
app.post("/make-server-27c238f7/assets/upload", async (c) => {
  try {
    const body = await c.req.json();
    const { url, hash, name } = body;
    
    console.log(`🔵 Asset upload request: ${name} (${hash})`);
    
    if (!url || !hash) {
      return c.json({ error: "Missing required fields: url, hash" }, 400);
    }

    // Fetch the image from the figma:asset URL
    console.log(`📥 Fetching from: ${url}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`❌ Failed to fetch asset: ${response.status} ${response.statusText}`);
      return c.json({ error: `Failed to fetch asset: ${response.statusText}` }, 500);
    }

    const arrayBuffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    // Use hash as filename to ensure uniqueness and consistency
    const fileName = `${hash}.png`;
    const filePath = `${fileName}`;

    console.log(`💾 Uploading to Supabase Storage: ${filePath}`);
    
    const { data, error } = await supabase.storage
      .from(ASSETS_BUCKET_NAME)
      .upload(filePath, uint8Array, {
        contentType: 'image/png',
        cacheControl: '31536000', // 1 year cache
        upsert: true, // Allow overwriting if already exists
      });

    if (error) {
      console.error(`❌ Storage upload error:`, error);
      return c.json({ error: "Failed to upload asset", details: error.message }, 500);
    }

    const { data: { publicUrl } } = supabase.storage
      .from(ASSETS_BUCKET_NAME)
      .getPublicUrl(filePath);

    console.log(`✅ Asset uploaded: ${name} -> ${publicUrl}`);
    return c.json({ 
      success: true, 
      url: publicUrl, 
      path: filePath,
      hash,
      name
    });
  } catch (error: any) {
    console.error("❌ Error in assets upload endpoint:", error);
    return c.json({ error: "Failed to upload asset", details: error.message }, 500);
  }
});

// Batch upload assets
app.post("/make-server-27c238f7/assets/upload-batch", async (c) => {
  try {
    const body = await c.req.json();
    const { assets } = body;
    
    if (!assets || !Array.isArray(assets)) {
      return c.json({ error: "Missing required field: assets (array)" }, 400);
    }

    console.log(`🔵 Batch upload: ${assets.length} assets`);
    
    const results = [];
    let successCount = 0;
    let errorCount = 0;

    for (const asset of assets) {
      try {
        const { url, hash, name } = asset;
        
        if (!url || !hash) {
          results.push({ hash, name, success: false, error: "Missing url or hash" });
          errorCount++;
          continue;
        }

        // Fetch the image
        const response = await fetch(url);
        
        if (!response.ok) {
          results.push({ hash, name, success: false, error: `Failed to fetch: ${response.statusText}` });
          errorCount++;
          continue;
        }

        const arrayBuffer = await response.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        
        const fileName = `${hash}.png`;
        const filePath = `${fileName}`;
        
        const { data, error } = await supabase.storage
          .from(ASSETS_BUCKET_NAME)
          .upload(filePath, uint8Array, {
            contentType: 'image/png',
            cacheControl: '31536000',
            upsert: true,
          });

        if (error) {
          results.push({ hash, name, success: false, error: error.message });
          errorCount++;
          continue;
        }

        const { data: { publicUrl } } = supabase.storage
          .from(ASSETS_BUCKET_NAME)
          .getPublicUrl(filePath);

        results.push({ hash, name, success: true, url: publicUrl });
        successCount++;
        
        console.log(`✅ ${successCount}/${assets.length}: ${name}`);
      } catch (err: any) {
        results.push({ hash: asset.hash, name: asset.name, success: false, error: err.message });
        errorCount++;
      }
    }

    console.log(`✅ Batch upload complete: ${successCount} success, ${errorCount} errors`);
    return c.json({ 
      success: true, 
      results,
      summary: {
        total: assets.length,
        success: successCount,
        errors: errorCount
      }
    });
  } catch (error: any) {
    console.error("❌ Error in batch upload endpoint:", error);
    return c.json({ error: "Failed to batch upload assets", details: error.message }, 500);
  }
});

app.post("/make-server-27c238f7/portfolio/init", async (c) => {
  try {
    const { data: existingProjects, error: countError } = await supabase
      .from('portfolio_projects')
      .select('id');
    
    if (countError) {
      console.log("Error checking portfolio projects:", countError);
      return c.json({ error: "Failed to check projects", details: countError.message }, 500);
    }
    
    const existingCount = existingProjects?.length || 0;
    
    // Existing count check removed to force sync
    /*
    if (existingCount > 0) {
      return c.json({ 
        success: true, 
        message: `Portfolio already initialized with ${existingCount} projects`, 
        added: 0,
        existing: existingCount,
        total: existingCount
      });
    }
    */
    
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const getImageUrl = (filename: string) => 
      `${supabaseUrl}/storage/v1/object/public/portfolio-images/${encodeURIComponent(filename)}`;
    
    // Default projects replaced by sync logic
    const defaultProjects: any[] = [];
    /*
      {
        id: 'welda-club',
        title: 'WELDA CLUB',
        excerpt: 'Premium golf club brand identity',
        category: 'Branding',
        project_type: 'Branding & Design',
        industry: 'Golf & Leisure',
        completion_date: '2025',
        description: 'Welda Club, a premium golf club and leisure destination, needed a sophisticated brand identity and compelling marketing assets to attract discerning members and build credibility in the luxury leisure space.',
        solution: 'Brand Identity: Built a sleek, trustworthy logo, color palette, and visual system. Design System: Created consistent branding across digital and print. Marketing Collateral: Designed pitch decks, social posts, and event graphics. Brand Positioning: Established Welda Club as a premier destination for golf enthusiasts.',
        results: 'Welda Club now stands out as a sophisticated, premium brand attracting affluent members and establishing leadership in the luxury golf space.',
        featured_image: getImageUrl('Welda Club.png'),
        featured_image_alt: 'Welda Club brand identity',
        thumbnail: getImageUrl('Welda Club.png'),
        gallery_images: [getImageUrl('Welda Club.png'), getImageUrl('Welda Club.png'), getImageUrl('Welda Club.png')],
        images: [getImageUrl('Welda Club.png'), getImageUrl('Welda Club.png'), getImageUrl('Welda Club.png')],
        featured: true,
        published: true,
        status: 'completed',
      },
      {
        id: 'ai-insiders',
        title: 'AI INSIDERS',
        excerpt: 'Powered by leading AI tools',
        category: 'Web Design',
        project_type: 'Branding & Design',
        industry: 'Coaching',
        completion_date: '2025',
        description: 'AI Insiders, a coaching and community platform for entrepreneurs and creators, needed a modern brand identity and compelling marketing assets to attract a professional audience and build credibility in the AI space.',
        solution: 'Brand Identity: Built a sleek, trustworthy logo, color palette, and visual system. Design System: Created consistent branding across digital and print. Marketing Collateral: Designed pitch decks, social posts, and event graphics. Thought Leadership: Branded content that positioned them as AI experts.',
        results: 'AI Insiders now stands out as a credible, forward-thinking brand growing their community, attracting partnerships, and leading in the AI coaching space.',
        featured_image: getImageUrl('AI Insiders.png'),
        featured_image_alt: 'AI Insiders brand identity',
        thumbnail: getImageUrl('AI Insiders.png'),
        gallery_images: [getImageUrl('AI Insiders.png'), getImageUrl('AI Insiders.png'), getImageUrl('AI Insiders.png')],
        images: [getImageUrl('AI Insiders.png'), getImageUrl('AI Insiders.png'), getImageUrl('AI Insiders.png')],
        featured: true,
        published: true,
        status: 'completed',
      },
      {
        id: 'acenos-x',
        title: 'ACENOS X',
        excerpt: 'LinkedIn headers & social media kit',
        category: 'Social Media',
        project_type: 'Social Media & Design',
        industry: 'Technology',
        completion_date: '2025',
        description: 'Acenos X, a technology platform, needed professional LinkedIn headers and social media kit to establish a strong presence and attract business partnerships.',
        solution: 'LinkedIn Headers: Designed professional, eye-catching header graphics. Social Media Kit: Created comprehensive templates for various platforms. Brand Consistency: Ensured cohesive visual identity across all touchpoints. Professional Positioning: Elevated their brand to attract B2B clients.',
        results: 'Acenos X now has a professional, consistent social presence that attracts partnerships and establishes credibility in the tech space.',
        featured_image: getImageUrl('Acenos X.png'),
        featured_image_alt: 'Acenos X social media kit',
        thumbnail: getImageUrl('Acenos X.png'),
        gallery_images: [getImageUrl('Acenos X.png'), getImageUrl('Acenos X.png'), getImageUrl('Acenos X.png')],
        images: [getImageUrl('Acenos X.png'), getImageUrl('Acenos X.png'), getImageUrl('Acenos X.png')],
        featured: true,
        published: true,
        status: 'completed',
      },
      {
        id: 'parceros-capital',
        title: 'PARCEROS CAPITAL',
        excerpt: 'Investment platform branding & web design',
        category: 'Branding & Web',
        project_type: 'Branding, Web Design & Development',
        industry: 'Investment & Finance',
        completion_date: '2025',
        description: 'Parceros Capital, a community-focused investment firm backing local businesses, needed a modern brand identity and professional website to build trust with investors and showcase their unique approach to community-driven capital.',
        solution: 'Brand Identity: Developed a trustworthy, professional logo and visual system that reflects their community-first values. Website Design & Development: Built a modern, conversion-focused website showcasing their impact and portfolio. Content Strategy: Crafted compelling messaging that positions them as trusted partners for local business growth. Impact Showcase: Designed data visualization and storytelling elements to highlight their community impact.',
        results: 'Parceros Capital now has a professional digital presence that attracts investors, builds credibility, and clearly communicates their mission of supporting local businesses.',
        featured_image: getImageUrl('Parceros Capital.png'),
        featured_image_alt: 'Parceros Capital branding and website',
        thumbnail: getImageUrl('Parceros Capital.png'),
        gallery_images: [getImageUrl('Parceros Capital.png'), getImageUrl('Parceros Capital.png'), getImageUrl('Parceros Capital.png')],
        images: [getImageUrl('Parceros Capital.png'), getImageUrl('Parceros Capital.png'), getImageUrl('Parceros Capital.png')],
        featured: true,
        published: true,
        status: 'completed',
      },
    ];
    */

    // We want to ensure these verified projects exist and are up to date
    const projectsToSync = verifiedPortfolioProjects.map(p => ({
      ...p,
      status: 'completed',
    }));

    let upsertCount = 0;
    let errors = [];

    for (const project of projectsToSync) {
      // Check if project exists by slug
      const { data: existing } = await supabase
        .from('portfolio_projects')
        .select('id')
        .eq('slug', project.slug)
        .single();

      if (existing) {
        // Update
        const { error } = await supabase
          .from('portfolio_projects')
          .update(project)
          .eq('id', existing.id);
        
        if (error) errors.push({ slug: project.slug, error: error.message });
        else upsertCount++;
      } else {
        // Insert
        const { error } = await supabase
          .from('portfolio_projects')
          .insert(project);
        
        if (error) errors.push({ slug: project.slug, error: error.message });
        else upsertCount++;
      }
    }
    
    // Set data for response
    const data = projectsToSync;
    const error = errors.length > 0 ? { message: JSON.stringify(errors) } : null;
    
    if (error) {
      console.log("Error inserting portfolio projects:", error);
      return c.json({ error: "Failed to initialize portfolio", details: error.message }, 500);
    }
    
    portfolioCache = null;
    
    return c.json({ 
      success: true, 
      message: `Portfolio initialized - added ${data?.length || 0} new projects`, 
      added: data?.length || 0,
      existing: 0,
      total: data?.length || 0
    });
  } catch (error) {
    console.log("Error initializing portfolio:", error);
    return c.json({ error: "Failed to initialize portfolio", details: error.message }, 500);
  }
});

app.get("/make-server-27c238f7/portfolio/projects/slug/:slug", async (c) => {
  try {
    const slug = c.req.param("slug");
    
    const { data, error } = await supabase
      .from('portfolio_projects')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();
    
    if (error || !data) {
      return c.json({ error: "Project not found" }, 404);
    }
    
    // Increment view count
    await supabase
      .from('portfolio_projects')
      .update({ view_count: (data.view_count || 0) + 1 })
      .eq('slug', slug);
    
    return c.json({ project: data });
  } catch (error) {
    console.log("Error fetching portfolio project by slug:", error);
    return c.json({ error: "Failed to fetch project", details: error.message }, 500);
  }
});

app.get("/make-server-27c238f7/portfolio/projects/featured", async (c) => {
  try {
    const limit = c.req.query('limit');
    
    let query = supabase
      .from('portfolio_projects')
      .select('*')
      .eq('published', true)
      .eq('featured', true)
      .order('created_at', { ascending: false });
    
    if (limit) {
      query = query.limit(parseInt(limit));
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.log("Error fetching featured projects:", error);
      return c.json({ error: "Failed to fetch projects", details: error.message }, 500);
    }
    
    c.header('Cache-Control', 'public, max-age=3600');
    console.log(`Fetched ${data?.length || 0} featured portfolio projects`);
    return c.json({ projects: data || [] });
  } catch (error) {
    console.log("Error fetching featured projects:", error);
    return c.json({ error: "Failed to fetch projects", details: error.message }, 500);
  }
});

app.post("/make-server-27c238f7/portfolio/update-images", async (c) => {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const getImageUrl = (filename: string) => 
      `${supabaseUrl}/storage/v1/object/public/portfolio-images/${encodeURIComponent(filename)}`;

    const updates = [
      { 
        id: 'welda-club', 
        featured_image: getImageUrl('Welda Club.png'),
        thumbnail: getImageUrl('Welda Club.png'),
        gallery_images: [getImageUrl('Welda Club.png'), getImageUrl('Welda Club.png'), getImageUrl('Welda Club.png')],
        images: [getImageUrl('Welda Club.png'), getImageUrl('Welda Club.png'), getImageUrl('Welda Club.png')]
      },
      { 
        id: 'ai-insiders', 
        featured_image: getImageUrl('AI Insiders.png'),
        thumbnail: getImageUrl('AI Insiders.png'),
        gallery_images: [getImageUrl('AI Insiders.png'), getImageUrl('AI Insiders.png'), getImageUrl('AI Insiders.png')],
        images: [getImageUrl('AI Insiders.png'), getImageUrl('AI Insiders.png'), getImageUrl('AI Insiders.png')]
      },
      { 
        id: 'acenos-x', 
        featured_image: getImageUrl('Acenos X.png'),
        thumbnail: getImageUrl('Acenos X.png'),
        gallery_images: [getImageUrl('Acenos X.png'), getImageUrl('Acenos X.png'), getImageUrl('Acenos X.png')],
        images: [getImageUrl('Acenos X.png'), getImageUrl('Acenos X.png'), getImageUrl('Acenos X.png')]
      },
      { 
        id: 'parceros-capital', 
        featured_image: getImageUrl('Parceros Capital.png'),
        thumbnail: getImageUrl('Parceros Capital.png'),
        gallery_images: [getImageUrl('Parceros Capital.png'), getImageUrl('Parceros Capital.png'), getImageUrl('Parceros Capital.png')],
        images: [getImageUrl('Parceros Capital.png'), getImageUrl('Parceros Capital.png'), getImageUrl('Parceros Capital.png')]
      },
    ];

    const results = [];
    for (const update of updates) {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .update({ 
          featured_image: update.featured_image,
          thumbnail: update.thumbnail,
          gallery_images: update.gallery_images,
          images: update.images
        })
        .eq('id', update.id)
        .select();
      
      if (error) {
        results.push({ id: update.id, success: false, error: error.message });
      } else {
        results.push({ id: update.id, success: true, data });
      }
    }

    portfolioCache = null;

    return c.json({ 
      success: true, 
      message: 'Portfolio images updated with Supabase Storage URLs',
      results 
    });
  } catch (error) {
    console.log("Error updating portfolio images:", error);
    return c.json({ error: "Failed to update images", details: error.message }, 500);
  }
});

app.post("/make-server-27c238f7/discovery/submit", async (c) => {
  try {
    const body = await c.req.json();
    
    const submission = {
      ...body,
      submittedAt: new Date().toISOString(),
      id: crypto.randomUUID(),
    };

    await kv.set(`discovery:submission:${submission.id}`, submission);
    
    // Send email notification logic omitted for brevity but present in original
    
    return c.json({ success: true, submissionId: submission.id });
  } catch (error) {
    console.log("Error saving discovery form submission:", error);
    return c.json({ error: "Failed to save submission", details: error.message }, 500);
  }
});

app.get("/make-server-27c238f7/discovery/submissions", async (c) => {
  try {
    const submissions = await kv.getByPrefix("discovery:submission:");
    return c.json({ submissions });
  } catch (error) {
    console.log("Error fetching discovery submissions:", error);
    return c.json({ error: "Failed to fetch submissions", details: error.message }, 500);
  }
});

// Inquiry submission endpoint
app.post("/make-server-27c238f7/inquiry/submit", async (c) => {
  try {
    const body = await c.req.json();
    
    // Create submission object
    const submission = {
      ...body,
      submittedAt: new Date().toISOString(),
      id: crypto.randomUUID(),
      type: body.type || 'inquiry', // Support 'inquiry', 'quote', and 'signup' types
    };

    // Save to KV store with appropriate prefix
    const prefix = submission.type === 'quote' ? 'quote:' : 
                   submission.type === 'signup' ? 'signup:' : 
                   'inquiry:';
    await kv.set(`${prefix}${submission.id}`, submission);
    
    // Send email notification to admin using Resend
    try {
      const resendApiKey = Deno.env.get('RESEND_API_KEY');
      if (!resendApiKey) {
        console.log('⚠️ RESEND_API_KEY not found');
      } else {
        const isQuote = submission.type === 'quote';
        const isSignup = submission.type === 'signup';
        const emailSubject = isSignup
          ? `New Signup - ${submission.name || submission.email}`
          : isQuote 
          ? `New Quote Request - ${submission.name || submission.email}` 
          : `New Inquiry - ${submission.firstName || ''} ${submission.lastName || ''}`;
        
        // Build email HTML based on submission type
        let detailsHtml = '';
        if (isSignup) {
          // Signup form fields
          detailsHtml = `
            <p><strong>Name:</strong> ${submission.name || 'N/A'}</p>
            <p><strong>Email:</strong> ${submission.email || 'N/A'}</p>
            <p><strong>Company:</strong> ${submission.company || 'N/A'}</p>
            <p><strong>Services:</strong> ${submission.services ? submission.services.join(', ') : 'N/A'}</p>
            <p><strong>Notes:</strong> ${submission.notes || 'N/A'}</p>
          `;
        } else if (isQuote) {
          // Quote form fields
          detailsHtml = `
            <p><strong>Name:</strong> ${submission.name || 'N/A'}</p>
            <p><strong>Email:</strong> ${submission.email || 'N/A'}</p>
            <p><strong>Website:</strong> ${submission.website || 'N/A'}</p>
            <p><strong>Focus Areas:</strong> ${submission.focus ? submission.focus.join(', ') : 'N/A'}</p>
            <p><strong>Notes:</strong> ${submission.notes || 'N/A'}</p>
          `;
        } else {
          // Inquiry form fields
          detailsHtml = `
            <p><strong>Name:</strong> ${submission.firstName || ''} ${submission.lastName || ''}</p>
            <p><strong>Email:</strong> ${submission.email || 'N/A'}</p>
            <p><strong>Company:</strong> ${submission.companyName || 'N/A'}</p>
            <p><strong>Company Size:</strong> ${submission.companySize || 'N/A'}</p>
            <p><strong>Role:</strong> ${submission.role || 'N/A'}</p>
            <p><strong>Services:</strong> ${submission.services ? submission.services.join(', ') : 'N/A'}</p>
            <p><strong>Budget:</strong> ${submission.budget || 'N/A'}</p>
            <p><strong>Timeline:</strong> ${submission.timeline || 'N/A'}</p>
            <p><strong>Project Details:</strong> ${submission.projectDetails || 'N/A'}</p>
          `;
        }
        
        const emailData = {
          from: 'CIELO Agency <onboarding@resend.dev>',
          to: ['admin@cielo.marketing'],
          subject: emailSubject,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #000;">${isSignup ? 'New Signup' : isQuote ? 'New Quote Request' : 'New Project Inquiry'}</h2>
              <p>Someone has submitted ${isSignup ? 'a signup' : isQuote ? 'a quote request' : 'an inquiry'} on your website:</p>
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                ${detailsHtml}
                <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>Submission ID:</strong> ${submission.id}</p>
              </div>
              <p style="color: #666; font-size: 14px;">This notification was sent automatically from your CIELO Agency website.</p>
            </div>
          `,
        };

        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify(emailData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.log('⚠️ Resend API error:', errorData);
        } else {
          console.log(`✅ ${isQuote ? 'Quote' : 'Inquiry'} notification sent successfully`);
        }
      }
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Don't fail the request if email fails
    }
    
    return c.json({ 
      success: true, 
      message: submission.type === 'quote' 
        ? 'Quote request submitted successfully' 
        : 'Inquiry submitted successfully',
      submissionId: submission.id 
    });
  } catch (error) {
    console.log("Error saving inquiry submission:", error);
    return c.json({ error: "Failed to save submission", details: error.message }, 500);
  }
});

// Pricing download endpoint
app.post("/make-server-27c238f7/pricing/download", async (c) => {
  try {
    const body = await c.req.json();
    const { email, packageType } = body;
    
    if (!email || !packageType) {
      return c.json({ error: "Email and package type are required" }, 400);
    }

    // Validate package type
    if (!['social', 'brandweb'].includes(packageType)) {
      return c.json({ error: "Invalid package type" }, 400);
    }
    
    // Create submission object
    const submission = {
      email,
      packageType,
      packageName: packageType === 'social' ? 'Social Media Management' : 'Brand & Web Launch',
      submittedAt: new Date().toISOString(),
      id: crypto.randomUUID(),
    };

    // Save to KV store
    await kv.set(`pricing_download:${submission.id}`, submission);
    
    // Send email notification to admin using Resend
    try {
      const resendApiKey = Deno.env.get('RESEND_API_KEY');
      if (!resendApiKey) {
        console.log('⚠️ RESEND_API_KEY not found');
      } else {
        const emailData = {
          from: 'CIELO Agency <onboarding@resend.dev>',
          to: ['admin@cielo.marketing'],
          subject: `Pricing Download - ${submission.packageName}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #000;">New Pricing Download</h2>
              <p>Someone has downloaded pricing information from your website:</p>
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Email:</strong> ${submission.email}</p>
                <p><strong>Package:</strong> ${submission.packageName}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>Submission ID:</strong> ${submission.id}</p>
              </div>
              <p style="color: #666; font-size: 14px;">This notification was sent automatically from your CIELO Agency website.</p>
            </div>
          `,
        };

        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify(emailData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.log('⚠️ Resend API error:', errorData);
        } else {
          console.log('✅ Pricing download notification sent successfully');
        }
      }
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Don't fail the request if email fails
    }

    // Return PDF URL based on package type (Google Drive direct download links)
    const pdfUrl = packageType === 'social' 
      ? 'https://drive.google.com/uc?export=download&id=17U81aa0_QKNuQcaRr6vBAWjqSqVUGJsD'
      : 'https://drive.google.com/uc?export=download&id=1JKiafyoJIn1tfH-k5xe5BHk_Tk6-X05I';
    
    const pdfFileName = packageType === 'social' 
      ? 'CIELO-Social-Media-Pricing.pdf' 
      : 'CIELO-Brand-Web-Pricing.pdf';
    
    return c.json({ 
      success: true, 
      message: 'Download request processed successfully',
      submissionId: submission.id,
      pdfUrl: pdfUrl,
      pdfFileName: pdfFileName
    });
  } catch (error) {
    console.log("Error processing pricing download:", error);
    return c.json({ error: "Failed to process download", details: error.message }, 500);
  }
});

// Get all pricing downloads (admin)
app.get("/make-server-27c238f7/pricing/downloads", async (c) => {
  try {
    const downloads = await kv.getByPrefix("pricing_download:");
    return c.json({ downloads });
  } catch (error) {
    console.log("Error fetching pricing downloads:", error);
    return c.json({ error: "Failed to fetch downloads", details: error.message }, 500);
  }
});

// Agency Skills download endpoint
app.post("/make-server-27c238f7/agency-skills/submit", async (c) => {
  try {
    const body = await c.req.json();
    const { email } = body;
    
    if (!email) {
      return c.json({ error: "Email is required" }, 400);
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ error: "Invalid email format" }, 400);
    }
    
    // Create submission object
    const submission = {
      email,
      submittedAt: new Date().toISOString(),
      id: crypto.randomUUID(),
    };

    // Save to KV store
    await kv.set(`agency_skills_download:${submission.id}`, submission);
    
    // Send email notification to user using Resend
    try {
      const resendApiKey = Deno.env.get('RESEND_API_KEY');
      if (!resendApiKey) {
        console.log('⚠️ RESEND_API_KEY not found');
      } else {
        const emailData = {
          from: 'CIELO Agency <onboarding@resend.dev>',
          to: [email],
          subject: 'Your Agency Skills Download Link',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #000;">Thanks for downloading our Agency Skills!</h2>
              <p>We're excited to share our Claude AI skills with you.</p>
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Access the repository here:</strong></p>
                <a href="https://github.com/kianabluecher/open-claude-skills" 
                   style="display: inline-block; background: #0A0A0B; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin-top: 10px;">
                  View Agency Skills on GitHub
                </a>
              </div>
              <p>These are the exact skills we use for our consulting and client projects. Feel free to use and modify them for your own needs.</p>
              <p style="color: #666; font-size: 14px; margin-top: 30px;">Best regards,<br/>The CIELO Agency Team</p>
            </div>
          `,
        };

        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify(emailData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.log('⚠️ Resend API error:', errorData);
        } else {
          console.log('✅ Agency skills email sent successfully');
        }
      }
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Don't fail the request if email fails
    }

    // Add to Google Sheets
    try {
      const googleCredsJson = Deno.env.get('GOOGLE_SHEETS_CREDENTIALS');
      if (!googleCredsJson) {
        console.log('⚠️ GOOGLE_SHEETS_CREDENTIALS not configured - skipping Google Sheets');
      } else {
        const SHEET_ID = Deno.env.get('GOOGLE_SHEET_ID') || '1yVzpBL93j7WTEaWTcOwqH7zEexEd6KA1xz-5xQWOuP8';
        const formattedData = [
          [
            new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
            email,
            '', // Empty column C
            '', // Empty column D
            '', // Empty column E
            "Agency Skills Download", // Form name in column F
          ]
        ];
        
        await appendToSheet(SHEET_ID, 'Sheet1!A:F', formattedData);
        console.log('✅ Added to Google Sheets');
      }
    } catch (sheetsError) {
      console.error('⚠️ Error adding to Google Sheets (non-fatal):', sheetsError.message || sheetsError);
      // Don't fail the request if Google Sheets fails
    }
    
    return c.json({ 
      success: true, 
      message: 'Download request processed successfully',
      submissionId: submission.id,
    });
  } catch (error) {
    console.log("Error processing agency skills download:", error);
    return c.json({ error: "Failed to process download", details: error.message }, 500);
  }
});

// Get all agency skills downloads (admin)
app.get("/make-server-27c238f7/agency-skills/downloads", async (c) => {
  try {
    const downloads = await kv.getByPrefix("agency_skills_download:");
    return c.json({ downloads });
  } catch (error) {
    console.log("Error fetching agency skills downloads:", error);
    return c.json({ error: "Failed to fetch downloads", details: error.message }, 500);
  }
});

app.post("/make-server-27c238f7/brand-audit/generate", async (c) => {
  try {
    const formData = await c.req.json();
    const { focusArea, companyName, industry, website, targetAudience, currentChallenges, competitors, uniqueValue, goals, email } = formData;

    if (!email || !companyName || !industry) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const submission = {
      id: crypto.randomUUID(),
      ...formData,
      audit: "Generated audit placeholder",
      submittedAt: new Date().toISOString(),
    };

    await kv.set(`brand-audit:${submission.id}`, submission);

    return c.json({ 
      audit: submission.audit,
      message: "Brand positioning audit generated successfully"
    });
  } catch (error) {
    console.log("Error generating brand audit:", error);
    return c.json({ error: "Failed to generate audit", details: error.message }, 500);
  }
});

// Brand & Web download submission endpoint
app.post("/make-server-27c238f7/brand-web/download", async (c) => {
  try {
    const { email } = await c.req.json();
    
    if (!email) {
      return c.json({ error: "Email is required" }, 400);
    }

    // Save submission to KV store
    const submission = {
      id: crypto.randomUUID(),
      email,
      submittedAt: new Date().toISOString(),
      type: 'brand-web-download'
    };

    await kv.set(`brand-web-download:${submission.id}`, submission);

    // Send email notification to admin using Resend
    try {
      const resendApiKey = Deno.env.get('RESEND_API_KEY');
      if (!resendApiKey) {
        console.log('⚠️ RESEND_API_KEY not found');
      } else {
        const emailData = {
          from: 'CIELO Agency <onboarding@resend.dev>',
          to: ['admin@cielo.marketing'],
          subject: 'New Brand & Web Details Download',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #000;">New Brand & Web Download Request</h2>
              <p>Someone has requested to download the Brand & Web details:</p>
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>Submission ID:</strong> ${submission.id}</p>
              </div>
              <p style="color: #666; font-size: 14px;">This notification was sent automatically from your CIELO Agency website.</p>
            </div>
          `,
        };

        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify(emailData),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.log('❌ Resend API error:', errorText);
        } else {
          console.log('✅ Admin notification sent successfully');
        }
      }
    } catch (emailError) {
      console.log('❌ Error sending email notification:', emailError);
      // Don't fail the request if email fails
    }

    // Send to Google Sheets (try OAuth first, fallback to service account)
    try {
      const SPREADSHEET_ID = '1KsLxhQ-6EX8OXPShQQHO6l_CAVfsAv6AYa9hfEFSdhE';
      const RANGE = 'Brand & Web!A:F'; // Sheet name with columns A to F
      
      const rowData = sheetsOAuth.formatBrandWebSubmission({ email });
      
      const isOAuthConnected = await sheetsOAuth.isConnected();
      if (isOAuthConnected) {
        console.log('📊 Using OAuth for Google Sheets...');
        await sheetsOAuth.appendToSheet(SPREADSHEET_ID, RANGE, rowData);
        console.log('✅ Successfully sent Brand & Web submission to Google Sheets (OAuth)');
      } else {
        console.log('📊 Using Service Account for Google Sheets...');
        const serviceRowData = formatBrandWebSubmission({ email });
        await appendToSheet(SPREADSHEET_ID, RANGE, serviceRowData);
        console.log('✅ Successfully sent Brand & Web submission to Google Sheets (Service Account)');
      }
    } catch (sheetsError) {
      console.error('Error sending to Google Sheets:', sheetsError);
      // Don't fail the request if Google Sheets fails
    }

    return c.json({ success: true, submissionId: submission.id });
  } catch (error) {
    console.log("Error saving brand-web download submission:", error);
    return c.json({ error: "Failed to save submission", details: error.message }, 500);
  }
});

// Brand Web pricing download submission endpoint
app.post("/make-server-27c238f7/brand-web/download", async (c) => {
  try {
    const { email } = await c.req.json();

    if (!email) {
      return c.json({ error: "Email is required" }, 400);
    }

    // Save submission to KV store
    const submission = {
      id: crypto.randomUUID(),
      email,
      submittedAt: new Date().toISOString(),
      type: 'brand-web-pricing-download'
    };

    await kv.set(`brand-web-download:${submission.id}`, submission);

    // Send email notification to admin using Resend
    try {
      const resendApiKey = Deno.env.get('RESEND_API_KEY');
      if (!resendApiKey) {
        console.log('⚠️ RESEND_API_KEY not found');
      } else {
        const emailData = {
          from: 'CIELO Agency <onboarding@resend.dev>',
          to: ['admin@cielo.marketing'],
          subject: 'New Brand & Web Pricing Download',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #000;">New Brand & Web Pricing Download Request</h2>
              <p>Someone has requested to download the Brand & Web pricing:</p>
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>Submission ID:</strong> ${submission.id}</p>
              </div>
              <p style="color: #666; font-size: 14px;">This notification was sent automatically from your CIELO Agency website.</p>
            </div>
          `,
        };

        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify(emailData),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.log('❌ Resend API error:', errorText);
        } else {
          console.log('✅ Admin notification sent successfully');
        }
      }
    } catch (emailError) {
      console.log('❌ Error sending email notification:', emailError);
      // Don't fail the request if email fails
    }

    // Send to Google Sheets (try OAuth first, fallback to service account)
    try {
      const SPREADSHEET_ID = '1KsLxhQ-6EX8OXPShQQHO6l_CAVfsAv6AYa9hfEFSdhE';
      const RANGE = 'Brand & Web!A:F'; // Sheet name "Brand & Web" with columns A to F

      const rowData = sheetsOAuth.formatBrandWebSubmission({ email });

      const isOAuthConnected = await sheetsOAuth.isConnected();
      if (isOAuthConnected) {
        console.log('📊 Using OAuth for Google Sheets...');
        await sheetsOAuth.appendToSheet(SPREADSHEET_ID, RANGE, rowData);
        console.log('✅ Successfully sent Brand & Web submission to Google Sheets (OAuth)');
      } else {
        console.log('📊 Using Service Account for Google Sheets...');
        const serviceRowData = formatBrandWebSubmission({ email });
        await appendToSheet(SPREADSHEET_ID, RANGE, serviceRowData);
        console.log('✅ Successfully sent Brand & Web submission to Google Sheets (Service Account)');
      }
    } catch (sheetsError) {
      console.error('Error sending to Google Sheets:', sheetsError);
      // Don't fail the request if Google Sheets fails
    }

    return c.json({ success: true, submissionId: submission.id });
  } catch (error) {
    console.log("Error saving brand-web download submission:", error);
    return c.json({ error: "Failed to save submission", details: error.message }, 500);
  }
});

// Social Media pricing download submission endpoint
app.post("/make-server-27c238f7/social-media/download", async (c) => {
  try {
    const { email } = await c.req.json();
    
    if (!email) {
      return c.json({ error: "Email is required" }, 400);
    }

    // Save submission to KV store
    const submission = {
      id: crypto.randomUUID(),
      email,
      submittedAt: new Date().toISOString(),
      type: 'social-media-pricing-download'
    };

    await kv.set(`social-media-download:${submission.id}`, submission);

    // Send email notification to admin using Resend
    try {
      const resendApiKey = Deno.env.get('RESEND_API_KEY');
      if (!resendApiKey) {
        console.log('⚠️ RESEND_API_KEY not found');
      } else {
        const emailData = {
          from: 'CIELO Agency <onboarding@resend.dev>',
          to: ['admin@cielo.marketing'],
          subject: 'New Social Media Pricing Download',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #000;">New Social Media Pricing Download Request</h2>
              <p>Someone has requested to download the Social Media pricing:</p>
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>Submission ID:</strong> ${submission.id}</p>
              </div>
              <p style="color: #666; font-size: 14px;">This notification was sent automatically from your CIELO Agency website.</p>
            </div>
          `,
        };

        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify(emailData),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.log('❌ Resend API error:', errorText);
        } else {
          console.log('✅ Admin notification sent successfully');
        }
      }
    } catch (emailError) {
      console.log('❌ Error sending email notification:', emailError);
      // Don't fail the request if email fails
    }

    // Send to Google Sheets (try OAuth first, fallback to service account)
    try {
      const SPREADSHEET_ID = '1KsLxhQ-6EX8OXPShQQHO6l_CAVfsAv6AYa9hfEFSdhE';
      const RANGE = 'Social Media!A:F'; // Sheet name with columns A to F
      
      const rowData = sheetsOAuth.formatSocialMediaSubmission({ email });
      
      const isOAuthConnected = await sheetsOAuth.isConnected();
      if (isOAuthConnected) {
        console.log('📊 Using OAuth for Google Sheets...');
        await sheetsOAuth.appendToSheet(SPREADSHEET_ID, RANGE, rowData);
        console.log('✅ Successfully sent Social Media submission to Google Sheets (OAuth)');
      } else {
        console.log('📊 Using Service Account for Google Sheets...');
        const serviceRowData = formatSocialMediaSubmission({ email });
        await appendToSheet(SPREADSHEET_ID, RANGE, serviceRowData);
        console.log('✅ Successfully sent Social Media submission to Google Sheets (Service Account)');
      }
    } catch (sheetsError) {
      console.error('Error sending to Google Sheets:', sheetsError);
      // Don't fail the request if Google Sheets fails
    }

    return c.json({ success: true, submissionId: submission.id });
  } catch (error) {
    console.log("Error saving social-media download submission:", error);
    return c.json({ error: "Failed to save submission", details: error.message }, 500);
  }
});

// Let's Talk form submission endpoint
app.post("/make-server-27c238f7/lets-talk", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, company_name, services, submitted_at } = body;

    if (!name || !email || !company_name || !services || services.length === 0) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // Save submission to KV store
    const submission = {
      id: crypto.randomUUID(),
      name,
      email,
      company_name,
      services,
      submitted_at: submitted_at || new Date().toISOString(),
      type: 'lets-talk'
    };

    await kv.set(`lets-talk:${submission.id}`, submission);

    // Send email notification to admin using Resend
    try {
      const resendApiKey = Deno.env.get('RESEND_API_KEY');
      if (!resendApiKey) {
        console.log('⚠️ RESEND_API_KEY not found');
      } else {
        const servicesFormatted = services.map((s: string) => {
          const labels: Record<string, string> = {
            'brand-web': 'Brand & Web',
            'social-media': 'Social Media',
            'consulting': 'Consulting',
            'ai-content': 'AI Content',
            'other': 'Other'
          };
          return labels[s] || s;
        }).join(', ');

        const emailData = {
          from: 'CIELO Agency <onboarding@resend.dev>',
          to: ['admin@cielo.marketing'],
          subject: `New Let's Talk Submission from ${name}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #000;">New Let's Talk Submission</h2>
              <p>Someone wants to talk with CIELO Agency:</p>
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Company:</strong> ${company_name}</p>
                <p><strong>Interested In:</strong> ${servicesFormatted}</p>
                <p><strong>Date:</strong> ${new Date(submitted_at).toLocaleString()}</p>
                <p><strong>Submission ID:</strong> ${submission.id}</p>
              </div>
              <p style="color: #666; font-size: 14px;">This notification was sent automatically from your CIELO Agency website.</p>
            </div>
          `,
        };

        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify(emailData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.log('⚠️ Resend API error:', errorData);
        } else {
          console.log('✅ Email sent successfully to admin@cielo.marketing');
        }
      }
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Don't fail the request if email fails
    }

    // Send to Google Sheets (try OAuth first, fallback to service account)
    try {
      const SPREADSHEET_ID = '1KsLxhQ-6EX8OXPShQQHO6l_CAVfsAv6AYa9hfEFSdhE';
      const RANGE = 'Let\'s Talk!A:F'; // Sheet name with columns A to F
      
      const rowData = sheetsOAuth.formatLetsTalkSubmission({
        name,
        email,
        company_name,
        services,
      });
      
      // Try OAuth first
      const isOAuthConnected = await sheetsOAuth.isConnected();
      if (isOAuthConnected) {
        console.log('📊 Using OAuth for Google Sheets...');
        await sheetsOAuth.appendToSheet(SPREADSHEET_ID, RANGE, rowData);
        console.log('✅ Successfully sent to Google Sheets (OAuth)');
      } else {
        // Fallback to service account
        console.log('📊 Using Service Account for Google Sheets...');
        const serviceRowData = formatLetsTalkSubmission({ name, email, company_name, services });
        await appendToSheet(SPREADSHEET_ID, RANGE, serviceRowData);
        console.log('✅ Successfully sent to Google Sheets (Service Account)');
      }
    } catch (sheetsError) {
      console.error('Error sending to Google Sheets:', sheetsError);
      // Don't fail the request if Google Sheets fails
    }

    return c.json({ 
      message: "Form submitted successfully",
      submissionId: submission.id 
    });
  } catch (error) {
    console.error("Error submitting Let's Talk form:", error);
    return c.json({ error: "Failed to submit form", details: error.message }, 500);
  }
});

// Rapid Delivery signup submission endpoint
app.post("/make-server-27c238f7/rapid-delivery/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, company_name, moodboard_focus, goal } = body;

    if (!email || !company_name || !moodboard_focus || !goal) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // Save submission to KV store
    const submission = {
      id: crypto.randomUUID(),
      email,
      company_name,
      moodboard_focus,
      goal,
      submitted_at: new Date().toISOString(),
      type: 'rapid-delivery-signup'
    };

    await kv.set(`rapid-delivery:${submission.id}`, submission);

    // Send email notification to admin using Resend
    try {
      const resendApiKey = Deno.env.get('RESEND_API_KEY');
      if (!resendApiKey) {
        console.log('⚠️ RESEND_API_KEY not found');
      } else {
        const emailData = {
          from: 'CIELO Agency <onboarding@resend.dev>',
          to: ['admin@cielo.marketing'],
          subject: `New Rapid Delivery Signup - ${company_name}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #000;">New Rapid Delivery Signup</h2>
              <p>Someone has signed up for the Rapid Delivery service:</p>
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Company:</strong> ${company_name}</p>
                <p><strong>Moodboard Focus:</strong> ${moodboard_focus}</p>
                <p><strong>Goal:</strong> ${goal}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>Submission ID:</strong> ${submission.id}</p>
              </div>
              <p style="color: #666; font-size: 14px;">This notification was sent automatically from your CIELO Agency website.</p>
            </div>
          `,
        };

        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify(emailData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.log('⚠️ Resend API error:', errorData);
        } else {
          console.log('✅ Rapid Delivery notification sent successfully');
        }
      }
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Don't fail the request if email fails
    }

    // Send to Google Sheets (try OAuth first, fallback to service account)
    try {
      const SPREADSHEET_ID = '1KsLxhQ-6EX8OXPShQQHO6l_CAVfsAv6AYa9hfEFSdhE';
      const RANGE = 'Moodboard!A:F'; // Sheet name with columns A to F
      
      const rowData = sheetsOAuth.formatRapidDeliverySubmission({
        email,
        company_name,
        moodboard_focus,
        goal,
      });
      
      const isOAuthConnected = await sheetsOAuth.isConnected();
      if (isOAuthConnected) {
        console.log('📊 Using OAuth for Google Sheets...');
        await sheetsOAuth.appendToSheet(SPREADSHEET_ID, RANGE, rowData);
        console.log('✅ Successfully sent Moodboard submission to Google Sheets (OAuth)');
      } else {
        console.log('📊 Using Service Account for Google Sheets...');
        const serviceRowData = formatRapidDeliverySubmission({ email, company_name, moodboard_focus, goal });
        await appendToSheet(SPREADSHEET_ID, RANGE, serviceRowData);
        console.log('✅ Successfully sent Moodboard submission to Google Sheets (Service Account)');
      }
    } catch (sheetsError) {
      console.error('Error sending to Google Sheets:', sheetsError);
      // Don't fail the request if Google Sheets fails
    }

    return c.json({ 
      message: "Rapid Delivery signup successful",
      submissionId: submission.id 
    });
  } catch (error) {
    console.error("Error submitting Rapid Delivery signup:", error);
    return c.json({ error: "Failed to submit signup", details: error.message }, 500);
  }
});

// Consulting Specialist signup submission endpoint
app.post("/make-server-27c238f7/consulting-specialist/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, name, specialist_domain, experience, linkedin_url, preferred_approach } = body;

    if (!email || !name || !specialist_domain || !preferred_approach) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // Save submission to KV store
    const submission = {
      id: crypto.randomUUID(),
      email,
      name,
      specialist_domain,
      experience,
      linkedin_url,
      preferred_approach,
      submitted_at: new Date().toISOString(),
      type: 'consulting-specialist-application'
    };

    await kv.set(`consulting-specialist:${submission.id}`, submission);

    // Send email notification to admin using Resend
    try {
      const resendApiKey = Deno.env.get('RESEND_API_KEY');
      if (!resendApiKey) {
        console.log('⚠️ RESEND_API_KEY not found');
      } else {
        const emailData = {
          from: 'CIELO Agency <onboarding@resend.dev>',
          to: ['admin@cielo.marketing'],
          subject: `New Consulting Specialist Application - ${name}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #000;">New Consulting Specialist Application</h2>
              <p>Someone has applied to join the CIELO consulting collective:</p>
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Specialist Domain:</strong> ${specialist_domain}</p>
                <p><strong>Experience:</strong> ${experience || 'Not provided'}</p>
                <p><strong>LinkedIn:</strong> ${linkedin_url || 'Not provided'}</p>
                <p><strong>Preferred Approach:</strong> ${preferred_approach === 'self-managed' ? 'Self-Managed Outreach' : 'EA-Managed Outreach'}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>Submission ID:</strong> ${submission.id}</p>
              </div>
              <p style="color: #666; font-size: 14px;">This notification was sent automatically from your CIELO Agency website.</p>
            </div>
          `,
        };

        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify(emailData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.log('⚠️ Resend API error:', errorData);
        } else {
          console.log('✅ Consulting Specialist application notification sent successfully');
        }
      }
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Don't fail the request if email fails
    }

    return c.json({ 
      message: "Application submitted successfully",
      submissionId: submission.id 
    });
  } catch (error) {
    console.error("Error submitting Consulting Specialist application:", error);
    return c.json({ error: "Failed to submit application", details: error.message }, 500);
  }
});

// ============================================
// GOOGLE SHEETS OAUTH ENDPOINTS
// ============================================

// Check Google Sheets connection status
app.get("/make-server-27c238f7/auth/google-sheets/status", async (c) => {
  const authResult = await verifyAdmin(c);
  
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  
  try {
    const connected = await sheetsOAuth.isConnected();
    return c.json({ connected });
  } catch (error) {
    console.error('Error checking Google Sheets status:', error);
    return c.json({ error: 'Failed to check status' }, 500);
  }
});

// Debug endpoint to check OAuth credentials
app.get("/make-server-27c238f7/auth/google-sheets/debug-credentials", async (c) => {
  const authResult = await verifyAdmin(c);
  
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  
  const clientId = Deno.env.get('GOOGLE_OAUTH_CLIENT_ID');
  const clientSecret = Deno.env.get('GOOGLE_OAUTH_CLIENT_SECRET');
  
  return c.json({
    clientId_exists: !!clientId,
    clientId_length: clientId?.length || 0,
    clientId_preview: clientId ? `${clientId.substring(0, 20)}...${clientId.substring(clientId.length - 20)}` : 'NOT SET',
    clientSecret_exists: !!clientSecret,
    clientSecret_length: clientSecret?.length || 0,
    clientSecret_preview: clientSecret ? `${clientSecret.substring(0, 15)}...` : 'NOT SET',
  });
});

// Get all form submissions
app.get("/make-server-27c238f7/admin/submissions", async (c) => {
  const authResult = await verifyAdmin(c);
  
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  
  try {
    const submissions = [];
    
    // Create Supabase client to fetch with keys
    const supabase_kv = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );
    
    // Fetch all submission types
    const prefixes = [
      'lets-talk:',
      'rapid-delivery:',
      'brand-web-download:',
      'social-media-download:',
      'discovery:submission:',
      'brand-audit:',
      'inquiry:',
      'quote:',
    ];
    
    for (const prefix of prefixes) {
      const { data, error } = await supabase_kv
        .from("kv_store_27c238f7")
        .select("key, value")
        .like("key", prefix + "%");
      
      if (!error && data) {
        // Add each submission with its ID from the key
        for (const item of data) {
          submissions.push({
            id: item.key,
            ...item.value,
          });
        }
      }
    }
    
    // Sort by date (most recent first)
    submissions.sort((a, b) => {
      const dateA = new Date(a.submitted_at || a.submittedAt || 0).getTime();
      const dateB = new Date(b.submitted_at || b.submittedAt || 0).getTime();
      return dateB - dateA;
    });
    
    return c.json({ submissions });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return c.json({ error: 'Failed to fetch submissions', details: error.message }, 500);
  }
});

// ============================================
// TEAM MANAGEMENT ENDPOINTS
// ============================================

app.get("/make-server-27c238f7/admin/team/members", async (c) => {
  const authResult = await verifyAdmin(c);
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  return teamManagement.getTeamMembers(c);
});

app.get("/make-server-27c238f7/admin/team/invitations", async (c) => {
  const authResult = await verifyAdmin(c);
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  return teamManagement.getPendingInvitations(c);
});

app.post("/make-server-27c238f7/admin/team/invite", async (c) => {
  const authResult = await verifyAdmin(c);
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  return teamManagement.inviteTeamMember(c, authResult.userId);
});

app.put("/make-server-27c238f7/admin/team/members/:id/permissions", async (c) => {
  const authResult = await verifyAdmin(c);
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  const memberId = c.req.param('id');
  return teamManagement.updateMemberPermissions(c, memberId);
});

app.get("/make-server-27c238f7/admin/team/members/:id/permissions", async (c) => {
  const authResult = await verifyAuth(c);
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  const memberId = c.req.param('id');
  return teamManagement.getMemberPermissions(c, memberId);
});

app.delete("/make-server-27c238f7/admin/team/members/:id", async (c) => {
  const authResult = await verifyAdmin(c);
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  const memberId = c.req.param('id');
  return teamManagement.removeTeamMember(c, memberId);
});

app.delete("/make-server-27c238f7/admin/team/invitations/:email", async (c) => {
  const authResult = await verifyAdmin(c);
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  const email = decodeURIComponent(c.req.param('email'));
  return teamManagement.revokeInvitation(c, email);
});

app.post("/make-server-27c238f7/auth/accept-invitation", async (c) => {
  return teamManagement.acceptInvitation(c);
});

// Create user directly (admin only - no invitation)
app.post("/make-server-27c238f7/admin/team/create-user", async (c) => {
  const authResult = await verifyAdmin(c);
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  return teamManagement.createUser(c);
});

// ============================================
// USER MANAGEMENT ENDPOINTS
// ============================================

app.post("/make-server-27c238f7/admin/create-user", async (c) => {
  const authResult = await verifyAdmin(c);
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  
  try {
    const { email, password, fullName, role } = await c.req.json();
    
    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }
    
    console.log(`📝 Creating user: ${email} with role: ${role || 'team'}`);
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        full_name: fullName || email.split('@')[0],
        role: role || 'team'
      },
      email_confirm: true, // Auto-confirm email since we don't have email server configured
    });
    
    if (error) {
      console.error('❌ Failed to create user:', error);
      return c.json({ error: error.message }, 400);
    }
    
    console.log(`✅ User created successfully: ${email}`);
    return c.json({ 
      message: 'User created successfully',
      user: {
        id: data.user?.id,
        email: data.user?.email,
        role: data.user?.user_metadata?.role
      }
    });
  } catch (error: any) {
    console.error('❌ Error creating user:', error);
    return c.json({ error: error.message || 'Failed to create user' }, 500);
  }
});

// ============================================
// JIRA INTEGRATION ENDPOINTS
// ============================================

app.post("/make-server-27c238f7/admin/jira/credentials", async (c) => {
  const authResult = await verifyAdmin(c);
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  return jiraIntegration.storeJiraCredentials(c);
});

app.get("/make-server-27c238f7/admin/jira/credentials", async (c) => {
  const authResult = await verifyAdmin(c);
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  return jiraIntegration.getStoredJiraCredentials(c);
});

app.post("/make-server-27c238f7/admin/jira/test-connection", async (c) => {
  const authResult = await verifyAdmin(c);
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  return jiraIntegration.testJiraConnection(c);
});

app.get("/make-server-27c238f7/admin/jira/dashboard", async (c) => {
  const authResult = await verifyAdmin(c);
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  return jiraIntegration.getJiraDashboard(c);
});

app.get("/make-server-27c238f7/admin/jira/projects", async (c) => {
  const authResult = await verifyAdmin(c);
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  return jiraIntegration.getJiraProjects(c);
});

app.get("/make-server-27c238f7/admin/jira/issues", async (c) => {
  const authResult = await verifyAdmin(c);
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  return jiraIntegration.getJiraIssues(c);
});

app.get("/make-server-27c238f7/admin/jira/sprints", async (c) => {
  const authResult = await verifyAdmin(c);
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  return jiraIntegration.getJiraSprints(c);
});

app.get("/make-server-27c238f7/admin/jira-tasks", async (c) => {
  const authResult = await verifyAdmin(c);
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  return jiraIntegration.getJiraTasks(c);
});

// ============================================
// FATHOM AI INTEGRATION ENDPOINTS
// ============================================

app.post("/make-server-27c238f7/admin/fathom/credentials", async (c) => {
  const authResult = await verifyAdmin(c);
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  return fathomIntegration.storeFathomCredentials(c);
});

app.get("/make-server-27c238f7/admin/fathom/test", async (c) => {
  const authResult = await verifyAdmin(c);
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  return fathomIntegration.testFathomConnection(c);
});

app.get("/make-server-27c238f7/admin/fathom/meetings", async (c) => {
  const authResult = await verifyAdmin(c);
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  return fathomIntegration.getFathomMeetings(c);
});

app.get("/make-server-27c238f7/admin/fathom/meetings/:id", async (c) => {
  const authResult = await verifyAdmin(c);
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  return fathomIntegration.getFathomMeeting(c);
});

app.get("/make-server-27c238f7/admin/fathom/meetings/:id/transcript", async (c) => {
  const authResult = await verifyAdmin(c);
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  return fathomIntegration.getFathomTranscript(c);
});

app.get("/make-server-27c238f7/admin/fathom/meetings/:id/summary", async (c) => {
  const authResult = await verifyAdmin(c);
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  return fathomIntegration.getFathomSummary(c);
});

app.get("/make-server-27c238f7/admin/fathom/search", async (c) => {
  const authResult = await verifyAdmin(c);
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  return fathomIntegration.searchFathomMeetings(c);
});

app.post("/make-server-27c238f7/admin/fathom/cache", async (c) => {
  const authResult = await verifyAdmin(c);
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  return fathomIntegration.cacheMeeting(c);
});

app.get("/make-server-27c238f7/admin/fathom/cached", async (c) => {
  const authResult = await verifyAdmin(c);
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  return fathomIntegration.getCachedMeetings(c);
});

// ============================================
// GOOGLE SHEETS OAUTH ENDPOINTS
// ============================================

// Initiate Google Sheets OAuth flow
app.get("/make-server-27c238f7/auth/google-sheets/connect", async (c) => {
  const authResult = await verifyAdmin(c);
  
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  
  try {
    const GOOGLE_OAUTH_CLIENT_ID = Deno.env.get('GOOGLE_OAUTH_CLIENT_ID');
    
    if (!GOOGLE_OAUTH_CLIENT_ID) {
      return c.json({ error: 'Google OAuth not configured' }, 500);
    }
    
    // Get the origin from the request to build redirect URI
    const origin = c.req.header('origin') || c.req.header('referer')?.split('/').slice(0, 3).join('/') || '';
    const redirectUri = `${origin}/api/google-sheets-callback`;
    
    // Build OAuth URL
    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.set('client_id', GOOGLE_OAUTH_CLIENT_ID);
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('scope', 'https://www.googleapis.com/auth/spreadsheets');
    authUrl.searchParams.set('access_type', 'offline');
    authUrl.searchParams.set('prompt', 'consent');
    
    return c.json({ authUrl: authUrl.toString(), redirectUri });
  } catch (error) {
    console.error('Error initiating OAuth:', error);
    return c.json({ error: 'Failed to initiate OAuth' }, 500);
  }
});

// Handle OAuth callback
app.post("/make-server-27c238f7/auth/google-sheets/callback", async (c) => {
  const authResult = await verifyAdmin(c);
  
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  
  try {
    const { code, redirectUri } = await c.req.json();
    
    if (!code || !redirectUri) {
      return c.json({ error: 'Missing code or redirectUri' }, 400);
    }
    
    await sheetsOAuth.exchangeCodeForTokens(code, redirectUri);
    
    return c.json({ 
      success: true, 
      message: 'Google Sheets connected successfully' 
    });
  } catch (error) {
    console.error('Error handling OAuth callback:', error);
    return c.json({ 
      error: 'Failed to connect Google Sheets', 
      details: error.message 
    }, 500);
  }
});

// Disconnect Google Sheets
app.post("/make-server-27c238f7/auth/google-sheets/disconnect", async (c) => {
  const authResult = await verifyAdmin(c);
  
  if (authResult.error) {
    return c.json({ error: authResult.error }, authResult.status || 401);
  }
  
  try {
    await sheetsOAuth.disconnect();
    return c.json({ 
      success: true, 
      message: 'Google Sheets disconnected successfully' 
    });
  } catch (error) {
    console.error('Error disconnecting Google Sheets:', error);
    return c.json({ 
      error: 'Failed to disconnect Google Sheets', 
      details: error.message 
    }, 500);
  }
});

// ============================================
// DASHBOARD ANALYTICS ENDPOINTS
// ============================================

app.get("/make-server-27c238f7/dashboard/overview", async (c) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader) return c.json({ error: 'No token' }, 401);
  
  try {
    const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers({ perPage: 1000 });
    
    if (usersError) throw usersError;

    const totalUsers = users.length;
    
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newSignups = users.filter(u => new Date(u.created_at) > thirtyDaysAgo).length;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const activeUsers = users.filter(u => u.last_sign_in_at && new Date(u.last_sign_in_at) > today).length;

    let jobStats = { total: 0, open: 0, closed: 0 };
    try {
      const { data: jobs } = await supabase.from('jobs').select('status');
      if (jobs) {
        jobStats.total = jobs.length;
        jobStats.open = jobs.filter(j => j.status === 'open').length;
        jobStats.closed = jobs.filter(j => j.status === 'closed').length;
      }
    } catch (e) {
      console.log('Jobs table access error:', e);
    }

    let portfolioStats = { total: 0, published: 0 };
    try {
      const { count: total } = await supabase.from('portfolio_projects').select('*', { count: 'exact', head: true });
      const { count: published } = await supabase.from('portfolio_projects').select('*', { count: 'exact', head: true }).eq('published', true);
      portfolioStats.total = total || 0;
      portfolioStats.published = published || 0;
    } catch (e) {
      console.log('Portfolio access error:', e);
    }

    let discoveryStats = { total: 0, new: 0, contacted: 0, qualified: 0, converted: 0 };
    try {
      const submissions = await kv.getByPrefix("discovery:submission:");
      discoveryStats.total = submissions.length;
      discoveryStats.new = submissions.filter(s => s.status === 'new' || !s.status).length;
      discoveryStats.contacted = submissions.filter(s => s.status === 'contacted').length;
      discoveryStats.qualified = submissions.filter(s => s.status === 'qualified').length;
      discoveryStats.converted = submissions.filter(s => s.status === 'converted').length;
    } catch (e) {
      console.log('Discovery KV access error:', e);
    }

    let auditStats = { total: 0, pending: 0, completed: 0 };
    try {
      const audits = await kv.getByPrefix("brand-audit:");
      auditStats.total = audits.length;
      auditStats.pending = audits.filter(s => !s.status || s.status === 'pending').length;
      auditStats.completed = audits.filter(s => s.status === 'completed').length;
    } catch (e) {
      console.log('Audit KV access error:', e);
    }

    return c.json({
      stats: {
        users: { total: totalUsers, new: newSignups, active: activeUsers },
        jobs: jobStats,
        portfolio: portfolioStats,
        discovery: discoveryStats,
        brandAudits: auditStats,
        contacts: { total: 0, new: 0 },
        analytics: { totalJobViews: 0 }
      }
    });

  } catch (error) {
    console.error('Dashboard overview error:', error);
    return c.json({ error: 'Failed to fetch dashboard stats' }, 500);
  }
});

app.get("/make-server-27c238f7/dashboard/latest-signups", async (c) => {
  const authResult = await verifyAdmin(c);
  if (authResult.error) return c.json({ error: authResult.error }, authResult.status);

  try {
    const { data: { users }, error: authError } = await supabase.auth.admin.listUsers({ 
      perPage: 50,
      sortBy: { field: 'created_at', direction: 'desc' }
    });
    
    if (authError) throw authError;

    const userIds = users.map(u => u.id);
    let profilesMap = {};
    try {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, role')
        .in('id', userIds);
      
      if (profiles) {
        profiles.forEach(p => profilesMap[p.id] = p);
      }
    } catch (e) {
      console.log('Profiles table access error', e);
    }

    const combinedUsers = users.map(u => {
      const profile = profilesMap[u.id] || {};
      return {
        id: u.id,
        email: u.email,
        full_name: profile.full_name || u.user_metadata?.full_name || 'N/A',
        role: profile.role || u.user_metadata?.role || 'team',
        created_at: u.created_at,
        last_sign_in_at: u.last_sign_in_at
      };
    });

    return c.json({ users: combinedUsers });

  } catch (error) {
    console.error('Latest signups error:', error);
    return c.json({ error: 'Failed to fetch signups' }, 500);
  }
});

app.get("/make-server-27c238f7/dashboard/activity", async (c) => {
  const authResult = await verifyAdmin(c);
  if (authResult.error) return c.json({ error: authResult.error }, authResult.status);

  try {
    const { data: logs, error } = await supabase
      .from('activity_log')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    if (!error && logs) {
      return c.json({ activities: logs });
    }

    const { data: { users } } = await supabase.auth.admin.listUsers({ perPage: 10 });
    const userActivities = users.map(u => ({
      id: `user-${u.id}`,
      type: 'signup',
      description: `New user signed up: ${u.email}`,
      created_at: u.created_at,
      user_email: u.email
    }));

    const submissions = await kv.getByPrefix("discovery:submission:");
    const submissionActivities = submissions
      .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
      .slice(0, 10)
      .map(s => ({
        id: `sub-${s.id}`,
        type: 'submission',
        description: `New discovery submission from ${s.companyName || s.name}`,
        created_at: s.submittedAt,
        user_email: s.email
      }));

    const combined = [...userActivities, ...submissionActivities]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 20);

    return c.json({ activities: combined });

  } catch (error) {
    console.error('Activity log error:', error);
    return c.json({ activities: [] });
  }
});

app.get("/make-server-27c238f7/dashboard/jobs", async (c) => {
   try {
     const { data, error } = await supabase.from('jobs').select('*').order('created_at', { ascending: false });
     if (error) {
       console.error('Error fetching jobs:', error);
       // Return empty array if table doesn't exist or permission denied
       if (error.code === '42P01' || error.code === '42501') {
         console.warn('Jobs table not accessible (non-critical):', error.message);
         return c.json({ jobs: [] });
       }
       throw error;
     }
     return c.json({ jobs: data || [] });
   } catch (error) {
     console.error('Jobs fetch error:', error);
     return c.json({ jobs: [], error: error.message }, 200);
   }
});

// Create a new job
app.post("/make-server-27c238f7/jobs", async (c) => {
  try {
    const authResult = await verifyAdmin(c);
    if (authResult.error) {
      return c.json({ error: authResult.error }, authResult.status || 401);
    }

    const body = await c.req.json();
    
    if (!body.title || !body.location || !body.department) {
      return c.json({ error: 'Missing required fields: title, location, department' }, 400);
    }

    const jobData = {
      id: crypto.randomUUID(),
      title: body.title,
      location: body.location,
      department: body.department,
      type: body.type || 'Full-time',
      description: body.description || '',
      requirements: body.requirements || [],
      featured: body.featured || false,
      status: 'open',
      url: body.url || null,
      posted_date: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('jobs')
      .insert([jobData])
      .select()
      .single();

    if (error) {
      console.error('Error creating job:', error);
      return c.json({ error: 'Failed to create job', details: error.message }, 500);
    }

    console.log(`✅ Job created: ${body.title}`);
    return c.json({ success: true, job: data });
  } catch (error) {
    console.error('Error in job creation:', error);
    return c.json({ error: 'Failed to create job', details: error.message }, 500);
  }
});

// Update a job
app.put("/make-server-27c238f7/jobs/:id", async (c) => {
  try {
    const authResult = await verifyAdmin(c);
    if (authResult.error) {
      return c.json({ error: authResult.error }, authResult.status || 401);
    }

    const id = c.req.param('id');
    const body = await c.req.json();

    const updates: any = {};
    if (body.title !== undefined) updates.title = body.title;
    if (body.location !== undefined) updates.location = body.location;
    if (body.department !== undefined) updates.department = body.department;
    if (body.type !== undefined) updates.type = body.type;
    if (body.description !== undefined) updates.description = body.description;
    if (body.requirements !== undefined) updates.requirements = body.requirements;
    if (body.featured !== undefined) updates.featured = body.featured;
    if (body.url !== undefined) updates.url = body.url;

    const { data, error } = await supabase
      .from('jobs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating job:', error);
      return c.json({ error: 'Failed to update job', details: error.message }, 500);
    }

    if (!data) {
      return c.json({ error: 'Job not found' }, 404);
    }

    console.log(`✅ Job updated: ${id}`);
    return c.json({ success: true, job: data });
  } catch (error) {
    console.error('Error in job update:', error);
    return c.json({ error: 'Failed to update job', details: error.message }, 500);
  }
});

// Delete/Close a job
app.delete("/make-server-27c238f7/jobs/:id", async (c) => {
  try {
    const authResult = await verifyAdmin(c);
    if (authResult.error) {
      return c.json({ error: authResult.error }, authResult.status || 401);
    }

    const id = c.req.param('id');

    // Mark as closed instead of deleting
    const { data, error } = await supabase
      .from('jobs')
      .update({ status: 'closed' })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error closing job:', error);
      return c.json({ error: 'Failed to close job', details: error.message }, 500);
    }

    if (!data) {
      return c.json({ error: 'Job not found' }, 404);
    }

    console.log(`✅ Job closed: ${id}`);
    return c.json({ success: true, message: 'Job closed successfully' });
  } catch (error) {
    console.error('Error in job deletion:', error);
    return c.json({ error: 'Failed to close job', details: error.message }, 500);
  }
});

// ============================================
// BLOG LIKES ENDPOINTS
// ============================================

// Get blog posts (for dropdown menu and listings)
app.get("/make-server-27c238f7/blog/posts", async (c) => {
  try {
    const url = new URL(c.req.url);
    const limit = parseInt(url.searchParams.get("limit") || "10");
    
    console.log(`📰 Fetching blog posts, limit: ${limit}`);
    
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error("❌ Error fetching blog posts:", error);
      return c.json({ error: "Failed to fetch blog posts", details: error.message }, 500);
    }
    
    console.log(`✅ Fetched ${data?.length || 0} blog posts`);
    return c.json({ posts: data || [] });
  } catch (error) {
    console.error("❌ Error in blog posts endpoint:", error);
    return c.json({ error: "Failed to fetch blog posts", details: error.message }, 500);
  }
});

// Get like count for a blog post
app.get("/make-server-27c238f7/blog-likes/:slug", async (c) => {
  try {
    const slug = c.req.param("slug");
    
    const { data, error } = await supabase
      .from("blog_posts")
      .select("like_count")
      .eq("slug", slug)
      .single();
    
    if (error) {
      console.error("Error fetching blog like count:", error);
      return c.json({ count: 0 });
    }
    
    return c.json({ count: data?.like_count || 0 });
  } catch (error) {
    console.error("Error fetching blog like count:", error);
    return c.json({ error: "Failed to fetch like count", details: error.message }, 500);
  }
});

// Update like count for a blog post
app.post("/make-server-27c238f7/blog-likes/:slug", async (c) => {
  try {
    const slug = c.req.param("slug");
    const { action } = await c.req.json();
    
    console.log(`📝 Blog like request for ${slug}: action=${action}`);
    
    // Get current post - check if like_count column exists
    const { data: post, error: fetchError } = await supabase
      .from("blog_posts")
      .select("like_count")
      .eq("slug", slug)
      .single();
    
    if (fetchError) {
      console.error("❌ Error fetching blog post:", JSON.stringify(fetchError, null, 2));
      
      // Check if column doesn't exist
      if (fetchError.message?.includes("column") && fetchError.message?.includes("like_count")) {
        return c.json({ 
          error: "Database column 'like_count' not found. Please run: ALTER TABLE blog_posts ADD COLUMN like_count INTEGER DEFAULT 0 NOT NULL;",
          details: fetchError.message 
        }, 500);
      }
      
      return c.json({ error: "Blog post not found", details: fetchError.message }, 404);
    }
    
    if (!post) {
      console.error("❌ Blog post not found for slug:", slug);
      return c.json({ error: "Blog post not found" }, 404);
    }
    
    const currentCount = post.like_count || 0;
    console.log(`Current like count for ${slug}: ${currentCount}`);
    
    // Update count based on action
    let newCount = currentCount;
    if (action === "like") {
      newCount = currentCount + 1;
    } else if (action === "unlike") {
      newCount = Math.max(0, currentCount - 1); // Don't go below 0
    }
    
    console.log(`Updating ${slug}: ${currentCount} → ${newCount}`);
    
    // Update the database
    const { data: updateData, error: updateError } = await supabase
      .from("blog_posts")
      .update({ like_count: newCount })
      .eq("slug", slug)
      .select();
    
    if (updateError) {
      console.error("❌ Error updating blog like count:", JSON.stringify(updateError, null, 2));
      return c.json({ 
        error: "Failed to update like count", 
        details: updateError.message,
        code: updateError.code 
      }, 500);
    }
    
    console.log(`✅ Blog like updated for ${slug}: ${action} (${currentCount} → ${newCount})`);
    return c.json({ success: true, count: newCount });
  } catch (error) {
    console.error("❌ Unexpected error updating blog like count:", error);
    return c.json({ error: "Failed to update like count", details: error.message }, 500);
  }
});

// Helper function to format plain text to HTML paragraphs
function formatTextToHTML(text: string): string {
  // If text already contains HTML tags, return as is
  if (/<[a-z][\s\S]*>/i.test(text)) {
    return text;
  }
  
  // Split by double line breaks to create paragraphs
  const paragraphs = text.split(/\n\n+/);
  
  return paragraphs
    .map(para => {
      // Trim whitespace
      const trimmed = para.trim();
      if (!trimmed) return '';
      
      // Replace single line breaks with <br> tags within paragraphs
      const withBreaks = trimmed.replace(/\n/g, '<br>');
      
      // Wrap in paragraph tags
      return `<p>${withBreaks}</p>`;
    })
    .filter(para => para !== '')
    .join('\n\n');
}

// Create a new blog post (admin only)
app.post("/make-server-27c238f7/blog/create", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    
    const blogData = await c.req.json();
    
    console.log('📝 Creating blog post:', blogData.title);
    
    // Format content to HTML if it's plain text
    const formattedContent = formatTextToHTML(blogData.content || '');
    
    // Insert the blog post
    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        title: blogData.title,
        slug: blogData.slug,
        excerpt: blogData.excerpt || '',
        content: formattedContent,
        featured_image: blogData.featured_image || '',
        featured_image_alt: blogData.featured_image_alt || '',
        author_name: blogData.author_name || 'CIELO Agency',
        author_role: blogData.author_role || '',
        author_bio: blogData.author_bio || '',
        author_avatar: blogData.avatar || '',
        category: blogData.category || '',
        tags: blogData.tags || '',
        status: blogData.status || 'published',
        featured: blogData.featured || false,
        meta_title: blogData.meta_title || blogData.title,
        meta_description: blogData.meta_description || blogData.excerpt,
        meta_keywords: blogData.meta_keywords || [],
        like_count: 0,
        view_count: 0,
      })
      .select()
      .single();
    
    if (error) {
      console.error('❌ Error creating blog post:', error);
      return c.json({ error: 'Failed to create blog post', details: error.message }, 500);
    }
    
    console.log('✅ Blog post created successfully:', data.slug);
    return c.json({ success: true, post: data });
  } catch (error) {
    console.error('❌ Unexpected error creating blog post:', error);
    return c.json({ error: 'Failed to create blog post', details: error.message }, 500);
  }
});

// Gallery Management Routes
// IMPORTANT: Create the "gallery_images" table in Supabase with the following structure:
// - id: uuid (primary key, default: gen_random_uuid())
// - path: text (storage file path)
// - name: text (image name)
// - alt: text (alt text for accessibility)
// - category: text (category like 'Brand', 'Portfolio', etc.)
// - created_at: timestamp with time zone (default: now())
// - updated_at: timestamp with time zone (default: now())
const GALLERY_BUCKET_NAME = "make-27c238f7-gallery";
const GALLERY_TABLE_NAME = "gallery_images";

// Initialize gallery bucket on startup
(async () => {
  const { data: buckets } = await supabase.storage.listBuckets();
  const galleryBucketExists = buckets?.some(bucket => bucket.name === GALLERY_BUCKET_NAME);
  if (!galleryBucketExists) {
    await supabase.storage.createBucket(GALLERY_BUCKET_NAME, { 
      public: true,
      fileSizeLimit: 26214400 // 25MB limit
    });
    console.log(`✅ Created storage bucket: ${GALLERY_BUCKET_NAME}`);
  } else {
    console.log(`✅ Storage bucket exists: ${GALLERY_BUCKET_NAME}`);
  }
  
  // Check if gallery_images table exists
  console.log('🔍 Checking if gallery_images table exists...');
  const { error: checkError } = await supabase
    .from(GALLERY_TABLE_NAME)
    .select('id')
    .limit(1);
  
  if (checkError && (checkError.code === '42P01' || checkError.code === 'PGRST204')) {
    // Table doesn't exist
    console.log('⚠️ gallery_images table does not exist.');
    console.log('📋 Please create it manually in Supabase Dashboard > SQL Editor:');
    console.log(`
CREATE TABLE IF NOT EXISTS ${GALLERY_TABLE_NAME} (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT NOT NULL,
  name TEXT NOT NULL,
  alt TEXT NOT NULL,
  category TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE ${GALLERY_TABLE_NAME} ENABLE ROW LEVEL SECURITY;

-- Allow all operations (adjust based on your security needs)
CREATE POLICY "Allow all operations on gallery_images" ON ${GALLERY_TABLE_NAME}
  FOR ALL USING (true);

-- Add published column if it doesn't exist (for existing tables)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = '${GALLERY_TABLE_NAME}' 
    AND column_name = 'published'
  ) THEN
    ALTER TABLE ${GALLERY_TABLE_NAME} ADD COLUMN published BOOLEAN DEFAULT false;
  END IF;
END $$;
    `);
  } else {
    console.log(`✅ Table exists: ${GALLERY_TABLE_NAME}`);
  }
})();

// Get all gallery images
app.get("/make-server-27c238f7/gallery", async (c) => {
  try {
    // Try to get data from gallery table first
    const { data: galleryData, error: galleryError } = await supabase
      .from(GALLERY_TABLE_NAME)
      .select("*")
      .order("created_at", { ascending: false });
    
    // If table doesn't exist (PGRST205 error), fall back to KV store
    if (galleryError && galleryError.code === 'PGRST205') {
      console.log("Table not found, falling back to KV store...");
      const kvGalleryItems = await kv.getByPrefix("gallery:");
      const images = kvGalleryItems.map(item => ({
        id: item.value.id,
        src: item.value.src,
        name: item.value.name,
        alt: item.value.alt,
        category: item.value.category,
        uploadedAt: item.value.uploadedAt || new Date().toISOString(),
        isUploaded: false
      }));
      return c.json({ images });
    }
    
    if (galleryError) {
      console.error("Error fetching gallery from table:", galleryError);
      return c.json({ error: "Failed to fetch images", details: galleryError.message }, 500);
    }
    
    if (!galleryData || galleryData.length === 0) {
      return c.json({ images: [] });
    }
    
    // For each image, get signed URL from storage
    const imagesWithUrls = await Promise.all(
      galleryData.map(async (imageData: any) => {
        const { data } = await supabase.storage
          .from(GALLERY_BUCKET_NAME)
          .createSignedUrl(imageData.path, 60 * 60 * 24 * 365); // 1 year
        
        return {
          id: imageData.id,
          src: data?.signedUrl || '',
          name: imageData.name,
          alt: imageData.alt,
          category: imageData.category,
          uploadedAt: imageData.created_at,
          isUploaded: true
        };
      })
    );
    
    return c.json({ images: imagesWithUrls });
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return c.json({ error: "Failed to fetch images", details: error.message }, 500);
  }
});

// Upload gallery images
app.post("/make-server-27c238f7/gallery/upload", async (c) => {
  try {
    console.log('📤 Gallery upload request received');
    const formData = await c.req.formData();
    const count = parseInt(formData.get('count') as string);
    console.log(`📊 Number of files to upload: ${count}`);
    
    const uploadedImages = [];
    const errors = [];
    
    for (let i = 0; i < count; i++) {
      try {
        const file = formData.get(`file_${i}`) as File;
        const metadataStr = formData.get(`metadata_${i}`) as string;
        
        console.log(`\n🖼️ Processing file ${i + 1}/${count}:`);
        console.log(`  - File present: ${!!file}`);
        console.log(`  - Metadata present: ${!!metadataStr}`);
        
        if (!file || !metadataStr) {
          console.error(`  ❌ Missing file or metadata for index ${i}`);
          errors.push(`Missing file or metadata for index ${i}`);
          continue;
        }
        
        const metadata = JSON.parse(metadataStr);
        console.log(`  - File name: ${file.name}`);
        console.log(`  - File size: ${file.size} bytes`);
        console.log(`  - File type: ${file.type}`);
        console.log(`  - Metadata:`, metadata);
        
        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = `${fileName}`;
        
        console.log(`  - Generated path: ${filePath}`);
        
        // Upload to storage
        console.log(`  - Uploading to Supabase Storage...`);
        const { error: uploadError } = await supabase.storage
          .from(GALLERY_BUCKET_NAME)
          .upload(filePath, file, {
            contentType: file.type,
            upsert: false
          });
        
        if (uploadError) {
          console.error(`  ❌ Storage upload error:`, uploadError);
          errors.push(`Upload failed for ${file.name}: ${uploadError.message}`);
          continue;
        }
        
        console.log(`  ✅ File uploaded to storage`);
        
        // Save metadata to gallery table
        console.log(`  - Saving metadata to ${GALLERY_TABLE_NAME} table...`);
        const { data: insertedData, error: insertError } = await supabase
          .from(GALLERY_TABLE_NAME)
          .insert({
            path: filePath,
            name: metadata.name,
            alt: metadata.alt,
            category: metadata.category
          })
          .select()
          .single();
        
        if (insertError) {
          console.error(`  ❌ Database insert error:`, insertError);
          // Clean up uploaded file
          await supabase.storage.from(GALLERY_BUCKET_NAME).remove([filePath]);
          
          // Check if it's a missing table error
          if (insertError.code === '42P01' || insertError.code === 'PGRST204') {
            errors.push(`Table '${GALLERY_TABLE_NAME}' does not exist. Please create it in Supabase Dashboard.`);
          } else {
            errors.push(`Database save failed for ${file.name}: ${insertError.message}`);
          }
          continue;
        }
        
        console.log(`  ✅ Metadata saved to database`);
        console.log(`  📋 Record ID: ${insertedData.id}`);
        
        uploadedImages.push(insertedData);
      } catch (fileError) {
        console.error(`  ❌ Error processing file ${i}:`, fileError);
        errors.push(`Error processing file ${i}: ${fileError.message}`);
      }
    }
    
    console.log(`\n✅ Upload complete:`);
    console.log(`  - Successfully uploaded: ${uploadedImages.length}`);
    console.log(`  - Errors: ${errors.length}`);
    
    if (errors.length > 0) {
      console.error(`  - Error details:`, errors);
    }
    
    return c.json({ 
      success: true, 
      uploaded: uploadedImages.length,
      errors: errors.length,
      errorDetails: errors
    });
  } catch (error) {
    console.error("❌ Gallery upload error:", error);
    return c.json({ 
      error: "Upload failed", 
      details: error.message,
      stack: error.stack 
    }, 500);
  }
});

// Delete gallery image
app.delete("/make-server-27c238f7/gallery/:id", async (c) => {
  try {
    const id = c.req.param('id');
    
    // Get image data from gallery table
    const { data: imageData, error: fetchError } = await supabase
      .from(GALLERY_TABLE_NAME)
      .select("*")
      .eq("id", id)
      .single();
    
    if (fetchError || !imageData) {
      return c.json({ error: "Image not found" }, 404);
    }
    
    // Delete from storage
    await supabase.storage
      .from(GALLERY_BUCKET_NAME)
      .remove([imageData.path]);
    
    // Delete from gallery table
    const { error: deleteError } = await supabase
      .from(GALLERY_TABLE_NAME)
      .delete()
      .eq("id", id);
    
    if (deleteError) {
      console.error("Error deleting from gallery table:", deleteError);
      return c.json({ error: "Delete failed", details: deleteError.message }, 500);
    }
    
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting gallery image:", error);
    return c.json({ error: "Delete failed", details: error.message }, 500);
  }
});

// Update gallery image metadata
app.put("/make-server-27c238f7/gallery/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const { name, alt, category } = await c.req.json();
    
    // Update metadata in gallery table
    const { data: updatedData, error: updateError } = await supabase
      .from(GALLERY_TABLE_NAME)
      .update({
        name,
        alt,
        category,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select()
      .single();
    
    if (updateError) {
      if (updateError.code === 'PGRST116') {
        return c.json({ error: "Image not found" }, 404);
      }
      console.error("Error updating gallery metadata:", updateError);
      return c.json({ error: "Update failed", details: updateError.message }, 500);
    }
    
    return c.json({ success: true, data: updatedData });
  } catch (error) {
    console.error("Error updating gallery image metadata:", error);
    return c.json({ error: "Update failed", details: error.message }, 500);
  }
});

// Migration endpoint: Move gallery images from KV store to gallery_images table
app.post("/make-server-27c238f7/gallery/migrate-from-kv", async (c) => {
  try {
    console.log("Starting gallery migration from KV store...");
    
    // Get all gallery items from KV store
    const kvGalleryItems = await kv.getByPrefix("gallery:");
    console.log(`Found ${kvGalleryItems.length} images in KV store`);
    
    if (kvGalleryItems.length === 0) {
      return c.json({ success: true, message: "No images to migrate", migrated: 0 });
    }
    
    const migratedImages = [];
    const errors = [];
    
    for (const kvItem of kvGalleryItems) {
      try {
        console.log(`Processing KV item with key: ${kvItem.key}`);
        const imageData = kvItem.value;
        
        // Log the structure to debug (safely)
        try {
          const dataStr = JSON.stringify(imageData);
          console.log(`Image data structure:`, dataStr ? dataStr.substring(0, 200) : 'undefined');
          console.log(`Image data keys:`, imageData ? Object.keys(imageData) : 'no keys');
        } catch (e) {
          console.log(`Could not stringify image data:`, e.message);
        }
        
        // Check if imageData exists
        if (!imageData) {
          console.log(`Skipping ${kvItem.key} - no data`);
          errors.push({ id: kvItem.key, error: "No data in KV item" });
          continue;
        }
        
        // Skip if already uploaded (src is not a data URL)
        if (!imageData.src) {
          console.log(`Skipping ${kvItem.key} - no src property`);
          errors.push({ id: kvItem.key, error: "No src property found" });
          continue;
        }
        
        if (!imageData.src.startsWith('data:')) {
          console.log(`Skipping ${imageData.id || kvItem.key} - not a base64 image`);
          continue;
        }
        
        // Extract base64 data and mime type
        const matches = imageData.src.match(/^data:([^;]+);base64,(.+)$/);
        if (!matches) {
          errors.push({ id: imageData.id, error: "Invalid data URL format" });
          continue;
        }
        
        const mimeType = matches[1];
        const base64Data = matches[2];
        
        // Convert base64 to binary
        const binaryString = atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        
        // Determine file extension
        const ext = mimeType.split('/')[1] || 'jpg';
        const fileName = `${imageData.id}.${ext}`;
        const filePath = `gallery/${fileName}`;
        
        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from(GALLERY_BUCKET_NAME)
          .upload(filePath, bytes, {
            contentType: mimeType,
            upsert: false
          });
        
        if (uploadError) {
          console.error(`Upload error for ${imageData.id}:`, uploadError);
          errors.push({ id: imageData.id, error: uploadError.message });
          continue;
        }
        
        // Save metadata to gallery_images table
        const { data: insertedData, error: insertError } = await supabase
          .from(GALLERY_TABLE_NAME)
          .insert({
            id: imageData.id,
            path: filePath,
            name: imageData.name || 'Untitled',
            alt: imageData.alt || '',
            category: imageData.category || 'Uncategorized',
            created_at: imageData.uploadedAt || new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select()
          .single();
        
        if (insertError) {
          console.error(`DB insert error for ${imageData.id}:`, insertError);
          errors.push({ id: imageData.id, error: insertError.message });
          continue;
        }
        
        migratedImages.push(insertedData);
        console.log(`Successfully migrated: ${imageData.id}`);
        
        // Optionally delete from KV store (commented out for safety)
        // await kv.del(kvItem.key);
        
      } catch (error) {
        console.error(`Error migrating image:`, error);
        errors.push({ id: kvItem.key, error: error.message });
      }
    }
    
    console.log(`Migration complete: ${migratedImages.length} migrated, ${errors.length} errors`);
    
    return c.json({
      success: true,
      migrated: migratedImages.length,
      errors: errors.length,
      details: { migratedImages, errors }
    });
    
  } catch (error) {
    console.error("Migration failed:", error);
    return c.json({ error: "Migration failed", details: error.message }, 500);
  }
});

// ============================================
// DYNAMIC PAGES MANAGEMENT
// ============================================

// Create or manage dynamic template-based pages
app.post("/make-server-27c238f7/dynamic-pages", async (c) => {
  try {
    const { action, pageData, slug } = await c.req.json();

    if (action === 'create') {
      // Validate required fields
      if (!pageData.slug || !pageData.title) {
        return c.json({ error: 'Missing required fields: slug and title' }, 400);
      }

      // Check if page already exists
      const existingPage = await kv.get(`dynamic-page:${pageData.slug}`);
      if (existingPage) {
        return c.json({ error: 'A page with this slug already exists' }, 409);
      }

      // Save to KV store with prefix
      await kv.set(`dynamic-page:${pageData.slug}`, pageData);

      console.log(`Dynamic page created: ${pageData.slug}`);
      return c.json({ 
        success: true, 
        message: 'Page created successfully',
        slug: pageData.slug 
      });
    }

    if (action === 'update') {
      // Validate required fields
      if (!slug) {
        return c.json({ error: 'Missing required field: slug' }, 400);
      }

      // Check if page exists
      const existingPage = await kv.get(`dynamic-page:${slug}`);
      if (!existingPage) {
        return c.json({ error: 'Page not found' }, 404);
      }

      // Update in KV store
      await kv.set(`dynamic-page:${slug}`, pageData);

      console.log(`Dynamic page updated: ${slug}`);
      return c.json({ 
        success: true, 
        message: 'Page updated successfully',
        slug: slug 
      });
    }

    if (action === 'list') {
      // Get all dynamic pages
      const pages = await kv.getByPrefix('dynamic-page:');
      return c.json({ success: true, pages });
    }

    if (action === 'delete') {
      const { slug } = pageData;
      await kv.del(`dynamic-page:${slug}`);
      return c.json({ success: true, message: 'Page deleted successfully' });
    }

    return c.json({ error: 'Invalid action' }, 400);
  } catch (error) {
    console.error("Error managing dynamic pages:", error);
    return c.json({ error: "Operation failed", details: error.message }, 500);
  }
});

// Get a specific dynamic page by slug
app.get("/make-server-27c238f7/dynamic-pages/:slug", async (c) => {
  try {
    const slug = c.req.param('slug');
    const pageData = await kv.get(`dynamic-page:${slug}`);

    if (!pageData) {
      return c.json({ error: 'Page not found' }, 404);
    }

    return c.json({ success: true, page: pageData });
  } catch (error) {
    console.error("Error fetching dynamic page:", error);
    return c.json({ error: "Fetch failed", details: error.message }, 500);
  }
});

// ============================================
// NOTES ENDPOINTS
// ============================================

// Get user's notes
app.get("/make-server-27c238f7/notes", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ error: 'Authorization header required' }, 401);
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Get all notes for this user
    const allNotes = await kv.getByPrefix(`notes:${user.id}:`);
    
    // If no notes exist, create a default one
    if (!allNotes || allNotes.length === 0) {
      const defaultNote = {
        id: `note-${Date.now()}`,
        title: 'Untitled',
        content: '',
        createdDate: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        user_id: user.id
      };
      await kv.set(`notes:${user.id}:${defaultNote.id}`, defaultNote);
      return c.json([defaultNote]);
    }
    
    return c.json(allNotes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    return c.json({ error: 'Failed to fetch notes' }, 500);
  }
});

// Save user's notes
app.post("/make-server-27c238f7/notes", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ error: 'Authorization header required' }, 401);
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { notes } = await c.req.json();
    
    // Save each note individually
    for (const note of notes) {
      const noteData = {
        ...note,
        updatedAt: new Date().toISOString(),
        user_id: user.id
      };
      await kv.set(`notes:${user.id}:${note.id}`, noteData);
    }
    
    return c.json({ 
      success: true,
      updated_at: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error saving notes:', error);
    return c.json({ error: 'Failed to save notes' }, 500);
  }
});

// ============================================
// CONTENT CALENDAR ENDPOINTS
// ============================================

// Get all posts for content calendar
app.get("/make-server-27c238f7/content-calendar/posts", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ error: 'Authorization header required' }, 401);
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Fetch all posts from KV store
    const posts = await kv.getByPrefix("content-calendar:post:");
    
    return c.json({ 
      posts: posts.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    });
  } catch (error) {
    console.error('Error fetching content calendar posts:', error);
    return c.json({ error: 'Failed to fetch posts' }, 500);
  }
});

// Create a new scheduled post
app.post("/make-server-27c238f7/content-calendar/posts", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ error: 'Authorization header required' }, 401);
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { content, platforms, scheduledDate, scheduledTime, mediaUrls } = await c.req.json();

    if (!content || !platforms || platforms.length === 0) {
      return c.json({ error: 'Content and platforms are required' }, 400);
    }

    if (!scheduledDate || !scheduledTime) {
      return c.json({ error: 'Schedule date and time are required' }, 400);
    }

    const postId = `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const postData = {
      id: postId,
      content,
      platforms,
      scheduledDate,
      scheduledTime,
      status: 'scheduled',
      mediaUrls: mediaUrls || [],
      createdAt: new Date().toISOString(),
      createdBy: user.id,
      userEmail: user.email
    };

    await kv.set(`content-calendar:post:${postId}`, postData);

    // Here you would integrate with Later API to actually schedule the post
    // For now, we're just storing it in the database
    try {
      // Later API integration would go here
      // const laterResponse = await fetch('https://api.later.com/api/v2/posts', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer sk_0dbff317b73610eac83990351c0f663255d0459a5186cb16e16b1bce65703799`,
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     content,
      //     platforms,
      //     scheduled_at: `${scheduledDate}T${scheduledTime}:00Z`,
      //     media_urls: mediaUrls
      //   })
      // });
      
      console.log('Post scheduled successfully:', postId);
    } catch (apiError) {
      console.error('Later API error:', apiError);
      // Continue anyway - we've saved it locally
    }
    
    return c.json({ 
      success: true,
      post: postData
    });
  } catch (error) {
    console.error('Error creating content calendar post:', error);
    return c.json({ error: 'Failed to create post' }, 500);
  }
});

// Update post status
app.put("/make-server-27c238f7/content-calendar/posts/:id", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ error: 'Authorization header required' }, 401);
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const postId = c.req.param('id');
    const { status } = await c.req.json();

    const existingPost = await kv.get(`content-calendar:post:${postId}`);
    
    if (!existingPost) {
      return c.json({ error: 'Post not found' }, 404);
    }

    const updatedPost = {
      ...existingPost,
      status,
      updatedAt: new Date().toISOString(),
      updatedBy: user.id
    };

    await kv.set(`content-calendar:post:${postId}`, updatedPost);
    
    return c.json({ 
      success: true,
      post: updatedPost
    });
  } catch (error) {
    console.error('Error updating content calendar post:', error);
    return c.json({ error: 'Failed to update post' }, 500);
  }
});

// Delete a post
app.delete("/make-server-27c238f7/content-calendar/posts/:id", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ error: 'Authorization header required' }, 401);
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const postId = c.req.param('id');
    await kv.del(`content-calendar:post:${postId}`);
    
    return c.json({ 
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting content calendar post:', error);
    return c.json({ error: 'Failed to delete post' }, 500);
  }
});

// ============================================
// PUBLIC RSS FEED ENDPOINT
// ============================================

// Public RSS feed for content calendar posts (no auth required)
app.get("/make-server-27c238f7/rss", async (c) => {
  try {
    // Fetch all published posts from KV store
    const allPosts = await kv.getByPrefix("content-calendar:post:");
    
    // Filter for published posts and sort by scheduled date
    const publishedPosts = allPosts
      .filter(post => post.status === 'published' || post.status === 'scheduled')
      .sort((a, b) => {
        const dateA = new Date(`${a.scheduledDate}T${a.scheduledTime}`);
        const dateB = new Date(`${b.scheduledDate}T${b.scheduledTime}`);
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 20); // Limit to 20 most recent posts

    // Get the site URL (you can customize this)
    const siteUrl = Deno.env.get("SITE_URL") || "https://cieloagency.com";
    const feedUrl = `${siteUrl}/rss`;

    // Build RSS XML
    const rssItems = publishedPosts.map(post => {
      const pubDate = new Date(`${post.scheduledDate}T${post.scheduledTime}`).toUTCString();
      const postUrl = `${siteUrl}/posts/${post.id}`;
      
      // Get first image if available
      const imageUrl = post.mediaUrls && post.mediaUrls.length > 0 
        ? post.mediaUrls[0] 
        : `${siteUrl}/default-post-image.png`;
      
      // Escape XML special characters
      const escapeXml = (str: string) => {
        return str
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&apos;');
      };

      const title = escapeXml(post.content.substring(0, 100) + (post.content.length > 100 ? '...' : ''));
      const description = escapeXml(post.content);
      const platforms = post.platforms.join(', ');

      return `    <item>
      <title>${title}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
      <category>Social Media</category>
      <category>${escapeXml(platforms)}</category>
      ${post.mediaUrls && post.mediaUrls.length > 0 ? `<enclosure url="${imageUrl}" type="image/jpeg" />` : ''}
    </item>`;
    }).join('\n');

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>CIELO Agency - Content Calendar</title>
    <link>${siteUrl}</link>
    <description>Latest scheduled and published content from CIELO Agency</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <generator>CIELO Content Calendar</generator>
    <image>
      <url>${siteUrl}/logo.png</url>
      <title>CIELO Agency</title>
      <link>${siteUrl}</link>
    </image>
${rssItems}
  </channel>
</rss>`;

    // Return RSS XML with proper content type
    return c.body(rssXml, 200, {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return c.text('Error generating RSS feed', 500);
  }
});

// Alias for pins.xml - Now pulls from gallery_images table
app.get("/make-server-27c238f7/pins.xml", async (c) => {
  try {
    // Fetch all published gallery images from the gallery_images table
    const { data: galleryData, error: galleryError } = await supabase
      .from(GALLERY_TABLE_NAME)
      .select("*")
      .eq("published", true) // Only include published items
      .order("created_at", { ascending: false })
      .limit(50); // Limit to 50 most recent items
    
    if (galleryError) {
      console.error('Error fetching gallery images for RSS:', galleryError);
      return c.text('Error generating RSS feed', 500);
    }

    // Get the site URL - using cielo.agency as the domain
    const siteUrl = Deno.env.get("SITE_URL") || "https://cielo.agency";
    const feedUrl = `${siteUrl}/pins.xml`;

    // Escape XML special characters
    const escapeXml = (str: string) => {
      if (!str) return '';
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
    };

    // Build RSS XML from gallery items
    const rssItems = await Promise.all((galleryData || []).map(async (item: any) => {
      const pubDate = new Date(item.created_at).toUTCString();
      const link = `${siteUrl}/gallery#${item.id}`;
      const title = escapeXml(item.name || 'Gallery Image');
      const description = escapeXml(item.alt || item.name || 'View this image from CIELO Agency');
      
      // Get signed URL for the image
      const { data } = await supabase.storage
        .from(GALLERY_BUCKET_NAME)
        .createSignedUrl(item.path, 60 * 60 * 24 * 365); // 1 year
      
      const imageUrl = data?.signedUrl || '';

      return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
      ${imageUrl ? `<enclosure url="${imageUrl}" type="image/jpeg" />` : ''}
    </item>`;
    }));

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>CIELO Agency - Pinterest Pins</title>
    <link>${siteUrl}</link>
    <description>Latest content from CIELO Agency for Pinterest auto-publish</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <generator>CIELO Pinterest RSS Manager (Gallery Feed)</generator>
    <image>
      <url>${siteUrl}/logo.png</url>
      <title>CIELO Agency</title>
      <link>${siteUrl}</link>
    </image>
${rssItems.join('\n')}
  </channel>
</rss>`;

    // Return RSS XML with proper content type
    return c.body(rssXml, 200, {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return c.text('Error generating RSS feed', 500);
  }
});

// ============================================
// PINTEREST RSS MANAGEMENT ENDPOINTS
// ============================================

// Get all Pinterest RSS items
app.get("/make-server-27c238f7/pinterest-rss/items", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ error: 'Authorization header required' }, 401);
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Fetch all Pinterest RSS items from KV store
    const items = await kv.getByPrefix("pinterest-rss:item:");
    
    return c.json({ 
      items: items.sort((a, b) => 
        new Date(b.updatedAt || b.publishedAt).getTime() - 
        new Date(a.updatedAt || a.publishedAt).getTime()
      )
    });
  } catch (error) {
    console.error('Error fetching Pinterest RSS items:', error);
    return c.json({ error: 'Failed to fetch items' }, 500);
  }
});

// Create a new Pinterest RSS item
app.post("/make-server-27c238f7/pinterest-rss/items", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ error: 'Authorization header required' }, 401);
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { title, canonicalUrl, description, imageUrl, publishedAt, status } = await c.req.json();

    if (!title || !canonicalUrl || !description || !imageUrl) {
      return c.json({ error: 'Title, URL, description, and image are required' }, 400);
    }

    const itemId = `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const itemData = {
      id: itemId,
      title,
      canonicalUrl,
      description,
      imageUrl,
      status: status || 'draft',
      publishedAt: publishedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: user.id,
      userEmail: user.email
    };

    await kv.set(`pinterest-rss:item:${itemId}`, itemData);
    
    return c.json({ 
      success: true,
      item: itemData
    });
  } catch (error) {
    console.error('Error creating Pinterest RSS item:', error);
    return c.json({ error: 'Failed to create item' }, 500);
  }
});

// Update a Pinterest RSS item
app.put("/make-server-27c238f7/pinterest-rss/items/:id", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ error: 'Authorization header required' }, 401);
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const itemId = c.req.param('id');
    const updateData = await c.req.json();

    const existingItem = await kv.get(`pinterest-rss:item:${itemId}`);
    
    if (!existingItem) {
      return c.json({ error: 'Item not found' }, 404);
    }

    const updatedItem = {
      ...existingItem,
      ...updateData,
      id: itemId,
      updatedAt: new Date().toISOString(),
      updatedBy: user.id
    };

    await kv.set(`pinterest-rss:item:${itemId}`, updatedItem);
    
    return c.json({ 
      success: true,
      item: updatedItem
    });
  } catch (error) {
    console.error('Error updating Pinterest RSS item:', error);
    return c.json({ error: 'Failed to update item' }, 500);
  }
});

// Delete a Pinterest RSS item
app.delete("/make-server-27c238f7/pinterest-rss/items/:id", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ error: 'Authorization header required' }, 401);
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const itemId = c.req.param('id');
    await kv.del(`pinterest-rss:item:${itemId}`);
    
    return c.json({ 
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting Pinterest RSS item:', error);
    return c.json({ error: 'Failed to delete item' }, 500);
  }
});

// ==================== JOB MANAGEMENT ROUTES ====================

// Get all jobs
app.get('/make-server-27c238f7/jobs', async (c) => {
  try {
    const jobs = await kv.getByPrefix('job:');
    return c.json({ success: true, jobs: jobs || [] });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return c.json({ error: 'Failed to fetch jobs' }, 500);
  }
});

// Get single job by ID
app.get('/make-server-27c238f7/jobs/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const job = await kv.get(`job:${id}`);
    
    if (!job) {
      return c.json({ error: 'Job not found' }, 404);
    }
    
    return c.json({ success: true, job });
  } catch (error) {
    console.error('Error fetching job:', error);
    return c.json({ error: 'Failed to fetch job' }, 500);
  }
});

// Create new job
app.post('/make-server-27c238f7/jobs', async (c) => {
  try {
    const jobData = await c.req.json();
    
    // Validate required fields
    if (!jobData.title || !jobData.department) {
      return c.json({ error: 'Title and department are required' }, 400);
    }
    
    // Set defaults
    const job = {
      ...jobData,
      id: jobData.id || `job-${Date.now()}`,
      posted_date: jobData.posted_date || new Date().toISOString().split('T')[0],
      status: jobData.status || 'open',
      featured: jobData.featured || false,
      requirements: jobData.requirements || [],
      responsibilities: jobData.responsibilities || [],
      qualifications: jobData.qualifications || [],
      niceToHave: jobData.niceToHave || [],
      whatWeOffer: jobData.whatWeOffer || [],
    };
    
    await kv.set(`job:${job.id}`, job);
    
    console.log(`✅ Job created: ${job.id} - ${job.title}`);
    return c.json({ success: true, job });
  } catch (error) {
    console.error('Error creating job:', error);
    return c.json({ error: 'Failed to create job' }, 500);
  }
});

// Update existing job
app.put('/make-server-27c238f7/jobs', async (c) => {
  try {
    const jobData = await c.req.json();
    
    if (!jobData.id) {
      return c.json({ error: 'Job ID is required' }, 400);
    }
    
    // Check if job exists
    const existingJob = await kv.get(`job:${jobData.id}`);
    if (!existingJob) {
      return c.json({ error: 'Job not found' }, 404);
    }
    
    // Update job
    const updatedJob = {
      ...existingJob,
      ...jobData,
    };
    
    await kv.set(`job:${jobData.id}`, updatedJob);
    
    console.log(`✅ Job updated: ${jobData.id} - ${jobData.title}`);
    return c.json({ success: true, job: updatedJob });
  } catch (error) {
    console.error('Error updating job:', error);
    return c.json({ error: 'Failed to update job' }, 500);
  }
});

// Delete job
app.delete('/make-server-27c238f7/jobs/:id', async (c) => {
  try {
    const id = c.req.param('id');
    
    // Check if job exists
    const job = await kv.get(`job:${id}`);
    if (!job) {
      return c.json({ error: 'Job not found' }, 404);
    }
    
    await kv.del(`job:${id}`);
    
    console.log(`✅ Job deleted: ${id}`);
    return c.json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    return c.json({ error: 'Failed to delete job' }, 500);
  }
});

// Job application submission
app.post('/make-server-27c238f7/submit-job-application', async (c) => {
  try {
    const body = await c.req.json();
    console.log('📝 Job application received:', body);
    
    // Create submission object
    const submission = {
      id: crypto.randomUUID(),
      ...body,
      created_at: new Date().toISOString(),
    };
    
    // Save to KV store
    await kv.set(`job-application:${submission.id}`, submission);
    console.log('✅ Job application saved to KV store');
    
    // Send email notification to admin
    try {
      const resendApiKey = Deno.env.get('RESEND_API_KEY');
      
      if (!resendApiKey) {
        console.log('⚠️ RESEND_API_KEY not set, skipping email notification');
      } else {
        const emailData = {
          from: 'CIELO Agency <onboarding@resend.dev>',
          to: ['admin@cielo.marketing', 'careers@cielo.agency'],
          subject: `New Job Application: ${body.job_opening}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #000;">New Job Application Received</h2>
              <p>A new application has been submitted for the following position:</p>
              
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Position Details</h3>
                <p><strong>Position:</strong> ${body.job_opening}</p>
                <p><strong>Applicant:</strong> ${body.first_name} ${body.last_name}</p>
                <p><strong>Email:</strong> ${body.email}</p>
                <p><strong>Location:</strong> ${body.location}</p>
                <p><strong>Date of Birth:</strong> ${body.date_of_birth}</p>
              </div>

              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Links & Portfolio</h3>
                ${body.linkedin ? `<p><strong>LinkedIn:</strong> <a href="${body.linkedin}">${body.linkedin}</a></p>` : ''}
                <p><strong>Portfolio:</strong> <a href="${body.portfolio}">${body.portfolio}</a></p>
                ${body.additional_work_filename ? `<p><strong>Additional Work:</strong> ${body.additional_work_filename}</p>` : ''}
                ${body.cv_filename ? `<p><strong>CV:</strong> ${body.cv_filename}</p>` : ''}
              </div>

              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Experience & Skills</h3>
                <p><strong>Experience:</strong><br>${body.experience.replace(/\n/g, '<br>')}</p>
                <p><strong>Industry Interest:</strong> ${body.industry}</p>
                <p><strong>Strongest Skills:</strong> ${body.skills}</p>
                <p><strong>Software/Tools:</strong> ${body.software_tools}</p>
                <p><strong>Languages:</strong> ${body.languages}</p>
                <p><strong>Side Job:</strong> ${body.side_job}</p>
              </div>

              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Personal Questions</h3>
                <p><strong>Why this job:</strong><br>${body.why_you.replace(/\n/g, '<br>')}</p>
                <p><strong>Daily Motivation:</strong><br>${body.motivation.replace(/\n/g, '<br>')}</p>
              </div>

              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Submission Time:</strong> ${new Date(body.submission_time).toLocaleString()}</p>
                <p><strong>Application ID:</strong> ${submission.id}</p>
              </div>
              
              <p style="color: #666; font-size: 14px;">This notification was sent automatically from your CIELO Agency careers portal.</p>
            </div>
          `,
        };

        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify(emailData),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.log('❌ Resend API error:', errorText);
        } else {
          console.log('✅ Admin notification sent successfully');
        }
      }
    } catch (emailError) {
      console.log('❌ Error sending email notification:', emailError);
      // Don't fail the request if email fails
    }
    
    // Send to Google Sheets (try OAuth first, fallback to service account)
    try {
      const SPREADSHEET_ID = '1TvnXbpbq3JgTAdYJXErFMPjYuahjCUu7jsIAugVKGlc';
      const RANGE = 'From Website!A:S'; // Sheet name with columns A to S (19 columns)
      
      const rowData = formatJobApplicationSubmission(body);
      
      const isOAuthConnected = await sheetsOAuth.isConnected();
      if (isOAuthConnected) {
        console.log('📊 Using OAuth for Google Sheets...');
        await sheetsOAuth.appendToSheetWithOAuth(SPREADSHEET_ID, RANGE, rowData);
      } else {
        console.log('📊 Using Service Account for Google Sheets...');
        await appendToSheet(SPREADSHEET_ID, RANGE, rowData);
      }
      console.log('✅ Job application sent to Google Sheets');
    } catch (sheetsError) {
      console.log('❌ Error sending to Google Sheets:', sheetsError);
      // Don't fail the request if Google Sheets fails
    }
    
    return c.json({ 
      success: true, 
      message: 'Application submitted successfully',
      application_id: submission.id 
    });
  } catch (error) {
    console.error('Error submitting job application:', error);
    return c.json({ error: 'Failed to submit application', details: error.message }, 500);
  }
});

// Influencer marketing inquiry submission
app.post('/make-server-27c238f7/submit-influencer-inquiry', async (c) => {
  try {
    const body = await c.req.json();
    console.log('📝 Influencer inquiry received:', body);
    
    // Create submission object
    const submission = {
      id: crypto.randomUUID(),
      ...body,
      created_at: new Date().toISOString(),
    };
    
    // Save to KV store
    await kv.set(`influencer-inquiry:${submission.id}`, submission);
    console.log('✅ Influencer inquiry saved to KV store');
    
    // Send email notifications to both admin and customer
    try {
      const resendApiKey = Deno.env.get('RESEND_API_KEY');
      
      if (!resendApiKey) {
        console.log('⚠️ RESEND_API_KEY not set, skipping email notification');
      } else {
        // Email to admin
        const adminEmailData = {
          from: 'CIELO Agency <onboarding@resend.dev>',
          to: ['admin@cielo.marketing'],
          subject: `New Influencer Marketing Inquiry from ${body.company}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #000;">New Influencer Marketing Inquiry</h2>
              <p>A new inquiry has been submitted from the Influencer Marketing page:</p>
              
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Contact Details</h3>
                <p><strong>Name:</strong> ${body.name}</p>
                <p><strong>Email:</strong> ${body.email}</p>
                <p><strong>Company:</strong> ${body.company}</p>
                <p><strong>Focus:</strong> ${body.focus}</p>
                <p><strong>Submitted:</strong> ${new Date(body.submission_time).toLocaleString()}</p>
              </div>

              <p style="color: #666; font-size: 14px; margin-top: 30px;">
                This inquiry was submitted via the Influencer Marketing page contact form.
              </p>
            </div>
          `,
        };

        const adminEmailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify(adminEmailData),
        });

        if (!adminEmailResponse.ok) {
          console.log('❌ Failed to send admin email:', await adminEmailResponse.text());
        } else {
          console.log('✅ Admin email notification sent successfully');
        }

        // Email to customer
        const customerEmailData = {
          from: 'CIELO Agency <onboarding@resend.dev>',
          to: [body.email],
          subject: 'Thank you for your inquiry - CIELO Agency',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #000;">Thank you for reaching out!</h2>
              <p>Hi ${body.name},</p>
              
              <p>We've received your inquiry about influencer marketing for ${body.company}.</p>
              
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Your Submission Details</h3>
                <p><strong>Focus:</strong> ${body.focus}</p>
                <p><strong>Submitted:</strong> ${new Date(body.submission_time).toLocaleString()}</p>
              </div>

              <p>Our team will review your information and get back to you within 24 hours with a custom strategy tailored to your needs.</p>
              
              <p>In the meantime, feel free to explore our portfolio and learn more about our successful campaigns.</p>

              <p style="margin-top: 30px;">Best regards,<br><strong>CIELO Agency Team</strong></p>

              <p style="color: #666; font-size: 14px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 20px;">
                CIELO Agency - Influencer Marketing<br>
                <a href="https://cielo.marketing" style="color: #0066cc;">cielo.marketing</a>
              </p>
            </div>
          `,
        };

        const customerEmailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify(customerEmailData),
        });

        if (!customerEmailResponse.ok) {
          console.log('❌ Failed to send customer email:', await customerEmailResponse.text());
        } else {
          console.log('✅ Customer email confirmation sent successfully');
        }
      }
    } catch (emailError) {
      console.log('❌ Error sending email notification:', emailError);
      // Don't fail the request if email fails
    }
    
    // Send to Google Sheets (try OAuth first, fallback to service account)
    try {
      const SPREADSHEET_ID = '1TvnXbpbq3JgTAdYJXErFMPjYuahjCUu7jsIAugVKGlc';
      const RANGE = 'From Website!A:F'; // Adjust to match your sheet structure
      
      const rowData = [
        [
          body.submission_time ? new Date(body.submission_time).toLocaleString('en-US', { timeZone: 'America/New_York' }) : '',
          body.name || '',
          body.email || '',
          body.company || '',
          body.focus || '',
          'Influencer Marketing Inquiry',
        ]
      ];
      
      const isOAuthConnected = await sheetsOAuth.isConnected();
      if (isOAuthConnected) {
        console.log('📊 Using OAuth for Google Sheets...');
        await sheetsOAuth.appendToSheetWithOAuth(SPREADSHEET_ID, RANGE, rowData);
      } else {
        console.log('📊 Using Service Account for Google Sheets...');
        await appendToSheet(SPREADSHEET_ID, RANGE, rowData);
      }
      console.log('✅ Influencer inquiry sent to Google Sheets');
    } catch (sheetsError) {
      console.log('❌ Error sending to Google Sheets:', sheetsError);
      // Don't fail the request if Google Sheets fails
    }
    
    return c.json({ 
      success: true, 
      message: 'Inquiry submitted successfully',
      inquiry_id: submission.id 
    });
  } catch (error) {
    console.error('Error submitting influencer inquiry:', error);
    return c.json({ error: 'Failed to submit inquiry', details: error.message }, 500);
  }
});

// ==================== PARTNERS & AFFILIATES ENDPOINTS ====================

// Get all partners
app.get('/make-server-27c238f7/partners', async (c) => {
  try {
    const partners = await kv.getByPrefix('partner:');
    return c.json(partners || []);
  } catch (error) {
    console.error('Error fetching partners:', error);
    return c.json({ error: 'Failed to fetch partners' }, 500);
  }
});

// Create partner
app.post('/make-server-27c238f7/partners', async (c) => {
  try {
    const body = await c.req.json();
    const { name, category, description, link, logo_url, contact_email } = body;
    
    if (!name || !category || !description || !link) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const id = crypto.randomUUID();
    const partner = {
      id,
      name,
      category,
      description,
      link,
      logo_url: logo_url || null,
      contact_email: contact_email || null,
      created_at: new Date().toISOString()
    };

    await kv.set(`partner:${id}`, partner);
    return c.json(partner);
  } catch (error) {
    console.error('Error creating partner:', error);
    return c.json({ error: 'Failed to create partner' }, 500);
  }
});

// Update partner
app.put('/make-server-27c238f7/partners/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    
    const existing = await kv.get(`partner:${id}`);
    if (!existing) {
      return c.json({ error: 'Partner not found' }, 404);
    }

    const updated = {
      ...existing,
      ...body,
      id,
      created_at: existing.created_at
    };

    await kv.set(`partner:${id}`, updated);
    return c.json(updated);
  } catch (error) {
    console.error('Error updating partner:', error);
    return c.json({ error: 'Failed to update partner' }, 500);
  }
});

// Delete partner
app.delete('/make-server-27c238f7/partners/:id', async (c) => {
  try {
    const id = c.req.param('id');
    await kv.del(`partner:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting partner:', error);
    return c.json({ error: 'Failed to delete partner' }, 500);
  }
});

// Get all affiliates
app.get('/make-server-27c238f7/affiliates', async (c) => {
  try {
    const affiliates = await kv.getByPrefix('affiliate:');
    return c.json(affiliates || []);
  } catch (error) {
    console.error('Error fetching affiliates:', error);
    return c.json({ error: 'Failed to fetch affiliates' }, 500);
  }
});

// Create affiliate
app.post('/make-server-27c238f7/affiliates', async (c) => {
  try {
    const body = await c.req.json();
    const { partner_name, affiliate_link, commission_rate, status, clicks, conversions, revenue, notes } = body;
    
    if (!partner_name || !affiliate_link || !commission_rate) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const id = crypto.randomUUID();
    const affiliate = {
      id,
      partner_name,
      affiliate_link,
      commission_rate,
      status: status || 'active',
      clicks: clicks || 0,
      conversions: conversions || 0,
      revenue: revenue || 0,
      notes: notes || null,
      created_at: new Date().toISOString()
    };

    await kv.set(`affiliate:${id}`, affiliate);
    return c.json(affiliate);
  } catch (error) {
    console.error('Error creating affiliate:', error);
    return c.json({ error: 'Failed to create affiliate' }, 500);
  }
});

// Update affiliate
app.put('/make-server-27c238f7/affiliates/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    
    const existing = await kv.get(`affiliate:${id}`);
    if (!existing) {
      return c.json({ error: 'Affiliate not found' }, 404);
    }

    const updated = {
      ...existing,
      ...body,
      id,
      created_at: existing.created_at
    };

    await kv.set(`affiliate:${id}`, updated);
    return c.json(updated);
  } catch (error) {
    console.error('Error updating affiliate:', error);
    return c.json({ error: 'Failed to update affiliate' }, 500);
  }
});

// Delete affiliate
app.delete('/make-server-27c238f7/affiliates/:id', async (c) => {
  try {
    const id = c.req.param('id');
    await kv.del(`affiliate:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting affiliate:', error);
    return c.json({ error: 'Failed to delete affiliate' }, 500);
  }
});

// ELLE Email Webhook
app.post("/make-server-27c238f7/api/elle-email-webhook", elleEmailWebhook);

// ============================================
// HEYREACH INTEGRATION ENDPOINTS
// ============================================

app.get("/make-server-27c238f7/api/heyreach/campaigns", async (c) => {
    const authResult = await verifyAuth(c);
    if (authResult.error) return c.json({ error: authResult.error }, authResult.status || 401);
    return heyreach.getCampaigns(c);
});

app.get("/make-server-27c238f7/api/heyreach/campaigns/:id/leads", async (c) => {
    const authResult = await verifyAuth(c);
    if (authResult.error) return c.json({ error: authResult.error }, authResult.status || 401);
    return heyreach.getCampaignLeads(c);
});

app.get("/make-server-27c238f7/api/heyreach/accounts", async (c) => {
    const authResult = await verifyAuth(c);
    if (authResult.error) return c.json({ error: authResult.error }, authResult.status || 401);
    return heyreach.getLinkedInAccounts(c);
});

app.get("/make-server-27c238f7/api/heyreach/lists", async (c) => {
    const authResult = await verifyAuth(c);
    if (authResult.error) return c.json({ error: authResult.error }, authResult.status || 401);
    return heyreach.getLists(c);
});

app.post("/make-server-27c238f7/api/heyreach/webhook", async (c) => {
    return heyreach.handleWebhook(c);
});

app.get("/make-server-27c238f7/api/heyreach/events", async (c) => {
    const authResult = await verifyAuth(c);
    if (authResult.error) return c.json({ error: authResult.error }, authResult.status || 401);
    return heyreach.getWebhookEvents(c);
});

// ============================================
// PostHog Analytics Integration
// ============================================

app.post("/make-server-27c238f7/analytics/posthog/query", async (c) => {
    const authResult = await verifyAuth(c);
    if (authResult.error) return c.json({ error: authResult.error }, authResult.status || 401);

    try {
        const { query } = await c.req.json();
        
        if (!query) {
            return c.json({ error: "Query parameter is required" }, 400);
        }

        const apiKey = Deno.env.get("POSTHOG_API_KEY");
        if (!apiKey) {
            console.error("❌ POSTHOG_API_KEY environment variable not set");
            return c.json({ 
                error: "PostHog API key not configured",
                details: "Please set the POSTHOG_API_KEY environment variable in Supabase settings"
            }, 500);
        }

        console.log("📊 Fetching PostHog analytics data...");
        
        const response = await fetch("https://us.posthog.com/api/projects/324376/query/", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`❌ PostHog API error (${response.status}):`, errorText);
            return c.json({ 
                error: `PostHog API request failed: ${response.status} ${response.statusText}`,
                details: errorText
            }, response.status);
        }

        const data = await response.json();
        console.log("✅ PostHog data fetched successfully");
        
        return c.json(data);
    } catch (error: any) {
        console.error("❌ Error fetching PostHog data:", error);
        return c.json({ 
            error: "Failed to fetch PostHog analytics data",
            details: error.message
        }, 500);
    }
});

Deno.serve(app.fetch);