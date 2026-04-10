import { projectId, publicAnonKey } from './supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7`;

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string; // Long text
  short_bio?: string; // For the card
  image: string;
  slug: string;
  order: number;
  social_links?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  created_at?: string;
  updated_at?: string;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const response = await fetch(`${BASE_URL}/public/team`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch team members');
    }

    const data = await response.json();
    return data.members || [];
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}

export async function getTeamMember(idOrSlug: string): Promise<TeamMember | null> {
  try {
    const response = await fetch(`${BASE_URL}/public/team/${idOrSlug}`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to fetch team member');
    }

    const data = await response.json();
    return data.member;
  } catch (error) {
    console.error('Error fetching team member:', error);
    return null;
  }
}

export async function createTeamMember(member: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>): Promise<TeamMember> {
  const response = await fetch(`${BASE_URL}/public/team`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(member),
  });

  if (!response.ok) {
    throw new Error('Failed to create team member');
  }

  const data = await response.json();
  return data.member;
}

export async function updateTeamMember(id: string, updates: Partial<TeamMember>): Promise<TeamMember> {
  const response = await fetch(`${BASE_URL}/public/team/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error('Failed to update team member');
  }

  const data = await response.json();
  return data.member;
}

export async function deleteTeamMember(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/public/team/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete team member');
  }
}
