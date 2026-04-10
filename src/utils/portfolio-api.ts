import { projectId, publicAnonKey } from './supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7`;

export interface MediaItem {
  url: string;
  alt: string;
}

export interface Project {
  id: string;
  slug?: string;
  title: string;
  subtitle?: string;
  description?: string;
  excerpt?: string;
  
  // Client & Category
  client?: string;
  client_name?: string;
  category?: string;
  project_type?: string;
  industry?: string;
  
  // Media - support both old and new format
  featured_image?: string;
  featured_image_alt?: string;
  thumbnail?: string;
  gallery_images?: string[];
  video_url?: string;
  images?: string[]; // Legacy support
  media?: MediaItem[]; // Legacy support
  cover?: string; // Legacy support
  
  // Project details
  challenge?: string;
  solution?: string;
  results?: string;
  what_we_did?: string;  // New field for "What We've Done" content
  technologies?: string[];
  tags?: string[];
  
  // Links
  live_url?: string;
  case_study_url?: string;
  github_url?: string;
  link?: string; // Legacy support
  custom_link_label?: string;
  custom_link_url?: string;
  
  // Metrics
  completion_date?: string;
  duration_weeks?: number;
  team_size?: number;
  
  // Status & visibility
  published?: boolean;
  featured?: boolean;
  status?: string;
  
  // SEO
  meta_title?: string;
  meta_description?: string;
  
  // Stats
  view_count?: number;
  like_count?: number;
  
  // Timestamps
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  
  // Legacy fields for backward compatibility
  date?: string;
  projectType?: string;
  clientType?: string;
  whatWeDid?: string[];
  result?: string;
  createdAt?: string;
  updatedAt?: string;
}

export async function initializePortfolio(): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/portfolio/init`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.details || 'Failed to initialize portfolio');
    }

    const data = await response.json();
    console.log('Portfolio initialized:', data.message);
  } catch (error) {
    console.error('Error initializing portfolio:', error);
    throw error;
  }
}

export async function getAllProjects(limit?: number): Promise<Project[]> {
  try {
    const url = limit 
      ? `${BASE_URL}/portfolio/projects?limit=${limit}`
      : `${BASE_URL}/portfolio/projects`;
      
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.details || 'Failed to fetch projects');
    }

    const data = await response.json();
    return data.projects || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function getProject(id: string): Promise<Project | null> {
  try {
    const response = await fetch(`${BASE_URL}/portfolio/projects/${id}`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      const error = await response.json();
      throw new Error(error.details || 'Failed to fetch project');
    }

    const data = await response.json();
    return data.project;
  } catch (error) {
    console.error(`Error fetching project ${id}:`, error);
    return null;
  }
}

export async function createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): Promise<Project> {
  try {
    const response = await fetch(`${BASE_URL}/portfolio/projects`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.details || 'Failed to create project');
    }

    const data = await response.json();
    return data.project;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<Project> {
  try {
    const response = await fetch(`${BASE_URL}/portfolio/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.details || 'Failed to update project');
    }

    const data = await response.json();
    return data.project;
  } catch (error) {
    console.error(`Error updating project ${id}:`, error);
    throw error;
  }
}

export async function deleteProject(id: string): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/portfolio/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.details || 'Failed to delete project');
    }
  } catch (error) {
    console.error(`Error deleting project ${id}:`, error);
    throw error;
  }
}

export async function syncFromNotion(notionData: any): Promise<Project> {
  try {
    const response = await fetch(`${BASE_URL}/portfolio/sync-notion`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notionData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.details || 'Failed to sync from Notion');
    }

    const data = await response.json();
    return data.project;
  } catch (error) {
    console.error('Error syncing from Notion:', error);
    throw error;
  }
}