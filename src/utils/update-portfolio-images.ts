import { projectId, publicAnonKey } from './supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7`;

/**
 * Updates all portfolio projects to use Supabase Storage image URLs
 * instead of figma:asset URLs
 */
export async function updatePortfolioImages(): Promise<void> {
  try {
    console.log('🔄 Updating portfolio images to use Supabase Storage URLs...');
    
    const response = await fetch(`${BASE_URL}/portfolio/update-images`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.details || 'Failed to update images');
    }

    const data = await response.json();
    console.log('✅ Portfolio images updated successfully:', data);
    return data;
  } catch (error) {
    console.error('❌ Error updating portfolio images:', error);
    throw error;
  }
}
