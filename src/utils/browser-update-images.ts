/**
 * Simple browser console script to update portfolio images
 * 
 * Usage: Copy and paste this into your browser console while on your app
 */

// @ts-ignore - This is meant to be run in browser console
window.updatePortfolioImages = async function() {
  try {
    console.log('🔄 Starting portfolio images update...');
    
    const response = await fetch('/api/make-server-27c238f7/portfolio/update-images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ Update failed:', error);
      return;
    }

    const data = await response.json();
    console.log('✅ Portfolio images updated successfully!');
    console.log('Results:', data);
    
    // Clear the portfolio cache by reinitializing
    const initResponse = await fetch('/api/make-server-27c238f7/portfolio/init', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    console.log('🔄 Refreshing page to show updated images...');
    setTimeout(() => window.location.reload(), 1000);
    
  } catch (error) {
    console.error('❌ Error updating portfolio images:', error);
  }
}

console.log('✨ Portfolio image updater loaded!');
console.log('Run: updatePortfolioImages()');
