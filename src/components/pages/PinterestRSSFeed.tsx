import { useEffect, useState } from 'react';
import { projectId } from '../../utils/supabase/info';

/**
 * This component serves the Pinterest RSS feed from cielo.agency domain
 * It fetches the RSS XML from the Supabase backend and displays it
 */
export function PinterestRSSFeed() {
  const [xmlContent, setXmlContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRSSFeed();
  }, []);

  const fetchRSSFeed = async () => {
    try {
      const rssUrl = `https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/pins.xml`;
      const response = await fetch(rssUrl);
      
      if (response.ok) {
        const xml = await response.text();
        setXmlContent(xml);
      }
    } catch (error) {
      console.error('Error fetching RSS feed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Render XML content directly
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
          <p className="text-gray-600">Loading RSS feed...</p>
        </div>
      </div>
    );
  }

  return (
    <pre style={{ 
      fontFamily: 'monospace', 
      fontSize: '12px', 
      padding: '20px',
      backgroundColor: '#f5f5f5',
      overflow: 'auto'
    }}>
      {xmlContent}
    </pre>
  );
}
