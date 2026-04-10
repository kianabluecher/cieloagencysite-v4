import { projectId, publicAnonKey } from './supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7`;

export interface BrandAuditData {
  focusArea: 'brand-positioning' | 'gtm-strategy' | 'social-media' | 'lead-gen';
  companyName: string;
  industry: string;
  website?: string;
  targetAudience: string;
  currentChallenges: string;
  competitors: string;
  uniqueValue: string;
  goals: string;
  currentEfforts?: string;
  email: string;
}

export interface BrandAuditResult {
  success: boolean;
  audit: string;
  message: string;
}

export async function generateBrandAudit(data: BrandAuditData): Promise<BrandAuditResult> {
  try {
    const response = await fetch(`${BASE_URL}/brand-audit/generate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.details || 'Failed to generate audit');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error generating brand audit:', error);
    throw error;
  }
}

export async function getAllAuditSubmissions(): Promise<any[]> {
  try {
    const response = await fetch(`${BASE_URL}/brand-audit/submissions`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.details || 'Failed to fetch submissions');
    }

    const data = await response.json();
    return data.submissions || [];
  } catch (error) {
    console.error('Error fetching audit submissions:', error);
    return [];
  }
}
