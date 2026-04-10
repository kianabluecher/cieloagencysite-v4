/**
 * CIELO Agency - Careers API Utility
 * Clean interface for all career/job-related API calls
 */

import { projectId, publicAnonKey } from './supabase/info';

export interface Job {
  id: string;
  title: string;
  department: string;
  description: string;
  requirements: string[];
  responsibilities?: string[];
  qualifications?: string[];
  niceToHave?: string[];
  whatWeOffer?: string[];
  aboutRole?: string;
  aboutCielo?: string;
  location: string;
  type: string;
  status: string;
  featured: boolean;
  url?: string;
  posted_date: string;
  updated_at?: string;
}

export interface CreateJobData {
  title: string;
  department: string;
  description: string;
  requirements?: string[];
  responsibilities?: string[];
  qualifications?: string[];
  niceToHave?: string[];
  whatWeOffer?: string[];
  aboutRole?: string;
  aboutCielo?: string;
  location: string;
  type: string;
  featured?: boolean;
  url?: string;
}

export interface UpdateJobData extends Partial<CreateJobData> {
  status?: string;
}

/**
 * Fetch all open jobs (public)
 */
export async function fetchJobs(): Promise<Job[]> {
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/jobs`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }

    const data = await response.json();
    return data.jobs || [];
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}

/**
 * Fetch a single job by ID (public)
 */
export async function fetchJobById(id: string): Promise<Job | null> {
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/jobs/${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.job;
  } catch (error) {
    console.error('Error fetching job:', error);
    return null;
  }
}

/**
 * Search jobs with filters
 */
export async function searchJobs(params: {
  department?: string;
  location?: string;
  type?: string;
  query?: string;
}): Promise<Job[]> {
  try {
    // Get all jobs first
    const allJobs = await fetchJobs();
    
    // Apply filters client-side
    let filtered = allJobs.filter(job => job.status === 'open');
    
    if (params.department) {
      filtered = filtered.filter(job => job.department === params.department);
    }
    
    if (params.location) {
      filtered = filtered.filter(job => job.location === params.location);
    }
    
    if (params.type) {
      filtered = filtered.filter(job => job.type === params.type);
    }
    
    if (params.query) {
      const query = params.query.toLowerCase();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  } catch (error) {
    console.error('Error searching jobs:', error);
    return [];
  }
}

/**
 * Track a job view for analytics
 */
export async function trackJobView(jobId: string): Promise<void> {
  try {
    console.log('Job view tracked:', jobId);
    // Could implement view tracking in KV store if needed
  } catch (error) {
    console.log('Analytics tracking failed:', error);
  }
}
