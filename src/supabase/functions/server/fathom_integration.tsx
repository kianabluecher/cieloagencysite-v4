/**
 * Fathom AI Integration
 * Fetches meetings, transcripts, and summaries from Fathom
 */

import { Context } from "npm:hono";
import * as kv from "./kv_store.tsx";

// Default hardcoded API key
const DEFAULT_FATHOM_API_KEY = 'LUTA79XhT5qOz61HprU-IA.UldVawlCfBrDMBroNrZfv7UqyoSsozMBQzQqU0LywcY';
const FATHOM_API_BASE = 'https://us.fathom.video/api/v1';

// Get stored Fathom API key
async function getFathomApiKey(): Promise<string> {
  try {
    const storedKey = await kv.get('fathom_api_key');
    if (storedKey && typeof storedKey === 'string') {
      console.log('✅ Using stored Fathom API key from KV');
      return storedKey;
    }
    
    console.log('✅ Using default Fathom API key');
    return DEFAULT_FATHOM_API_KEY;
  } catch (error) {
    console.error('❌ Error getting Fathom API key:', error);
    console.log('⚠️ Falling back to hardcoded default API key');
    return DEFAULT_FATHOM_API_KEY;
  }
}

// Store Fathom API key
export async function storeFathomCredentials(c: Context) {
  try {
    const { apiKey } = await c.req.json();
    
    if (!apiKey) {
      return c.json({ error: 'API key is required' }, 400);
    }

    await kv.set('fathom_api_key', apiKey);

    return c.json({ message: 'Fathom API key saved successfully' });
  } catch (error) {
    console.error('Error storing Fathom API key:', error);
    return c.json({ error: 'Failed to store API key' }, 500);
  }
}

// Make authenticated Fathom API request
async function fathomRequest(endpoint: string, method = 'GET', body?: any) {
  const apiKey = await getFathomApiKey();
  const url = `${FATHOM_API_BASE}${endpoint}`;

  const options: any = {
    method,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Fathom API error:', errorText);
      throw new Error(`Fathom API error: ${response.status} ${errorText}`);
    }

    return await response.json();
  } catch (error: any) {
    // Suppress DNS/network errors from console (expected when Fathom is unreachable)
    if (error.message.includes('dns') || error.message.includes('lookup') || error.message.includes('Name or service not known')) {
      // Silently fail - this is expected in development/testing
      throw new Error('FATHOM_UNREACHABLE');
    }
    console.error('❌ Fathom API request failed:', error);
    throw error;
  }
}

// Get all meetings
export async function getFathomMeetings(c: Context) {
  try {
    const limit = c.req.query('limit') || '50';
    const offset = c.req.query('offset') || '0';
    
    const response = await fathomRequest(`/calls?limit=${limit}&offset=${offset}`);

    return c.json({
      meetings: response.calls?.map((call: any) => ({
        id: call.call_id,
        title: call.title || 'Untitled Meeting',
        startTime: call.start_time,
        endTime: call.end_time,
        duration: call.duration,
        participantCount: call.participants?.length || 0,
        participants: call.participants || [],
        recordingUrl: call.recording_url,
        transcriptUrl: call.transcript_url,
        summaryUrl: call.summary_url,
        platform: call.platform,
        status: call.status,
        createdAt: call.created_at,
      })) || [],
      total: response.total || 0,
      hasMore: response.has_more || false,
    });
  } catch (error: any) {
    // If it's a DNS/network error, silently return empty data
    if (error.message === 'FATHOM_UNREACHABLE') {
      return c.json({
        meetings: [],
        total: 0,
        hasMore: false,
        warning: 'Fathom API currently unreachable.'
      });
    }
    
    console.error('Error fetching Fathom meetings:', error);
    return c.json({ error: error.message || 'Failed to fetch meetings' }, 500);
  }
}

// Get a specific meeting by ID
export async function getFathomMeeting(c: Context) {
  try {
    const callId = c.req.param('id');
    
    if (!callId) {
      return c.json({ error: 'Meeting ID is required' }, 400);
    }

    const response = await fathomRequest(`/calls/${callId}`);

    return c.json({
      meeting: {
        id: response.call_id,
        title: response.title || 'Untitled Meeting',
        startTime: response.start_time,
        endTime: response.end_time,
        duration: response.duration,
        participants: response.participants || [],
        recordingUrl: response.recording_url,
        transcriptUrl: response.transcript_url,
        summaryUrl: response.summary_url,
        summary: response.summary,
        transcript: response.transcript,
        actionItems: response.action_items || [],
        highlights: response.highlights || [],
        platform: response.platform,
        status: response.status,
        createdAt: response.created_at,
      },
    });
  } catch (error: any) {
    console.error('Error fetching Fathom meeting:', error);
    return c.json({ error: error.message || 'Failed to fetch meeting' }, 500);
  }
}

// Get meeting transcript
export async function getFathomTranscript(c: Context) {
  try {
    const callId = c.req.param('id');
    
    if (!callId) {
      return c.json({ error: 'Meeting ID is required' }, 400);
    }

    const response = await fathomRequest(`/calls/${callId}/transcript`);

    return c.json({
      transcript: response.transcript || [],
      text: response.text || '',
    });
  } catch (error: any) {
    console.error('Error fetching transcript:', error);
    return c.json({ error: error.message || 'Failed to fetch transcript' }, 500);
  }
}

// Get meeting summary
export async function getFathomSummary(c: Context) {
  try {
    const callId = c.req.param('id');
    
    if (!callId) {
      return c.json({ error: 'Meeting ID is required' }, 400);
    }

    const response = await fathomRequest(`/calls/${callId}/summary`);

    return c.json({
      summary: response.summary || '',
      actionItems: response.action_items || [],
      keyPoints: response.key_points || [],
      highlights: response.highlights || [],
    });
  } catch (error: any) {
    console.error('Error fetching summary:', error);
    return c.json({ error: error.message || 'Failed to fetch summary' }, 500);
  }
}

// Search meetings
export async function searchFathomMeetings(c: Context) {
  try {
    const query = c.req.query('q');
    const limit = c.req.query('limit') || '20';
    
    if (!query) {
      return c.json({ error: 'Search query is required' }, 400);
    }

    const response = await fathomRequest(`/calls/search?q=${encodeURIComponent(query)}&limit=${limit}`);

    return c.json({
      meetings: response.calls?.map((call: any) => ({
        id: call.call_id,
        title: call.title || 'Untitled Meeting',
        startTime: call.start_time,
        duration: call.duration,
        participants: call.participants || [],
        snippet: call.snippet || '',
      })) || [],
      total: response.total || 0,
    });
  } catch (error: any) {
    console.error('Error searching meetings:', error);
    return c.json({ error: error.message || 'Failed to search meetings' }, 500);
  }
}

// Store meeting data to KV (for offline access/caching)
export async function cacheMeeting(c: Context) {
  try {
    const { meetingId, data } = await c.req.json();
    
    if (!meetingId || !data) {
      return c.json({ error: 'Meeting ID and data are required' }, 400);
    }

    await kv.set(`fathom_meeting_${meetingId}`, data);

    return c.json({ message: 'Meeting cached successfully' });
  } catch (error: any) {
    console.error('Error caching meeting:', error);
    return c.json({ error: error.message || 'Failed to cache meeting' }, 500);
  }
}

// Get cached meetings from KV
export async function getCachedMeetings(c: Context) {
  try {
    const meetings = await kv.getByPrefix('fathom_meeting_');
    
    return c.json({
      meetings: meetings || [],
      total: meetings?.length || 0,
    });
  } catch (error: any) {
    console.error('Error getting cached meetings:', error);
    return c.json({ error: error.message || 'Failed to get cached meetings' }, 500);
  }
}

// Test Fathom API connection
export async function testFathomConnection(c: Context) {
  try {
    // Try to fetch user info or recent calls to test connection
    const response = await fathomRequest('/calls?limit=1');
    
    return c.json({
      success: true,
      message: 'Successfully connected to Fathom API',
      apiVersion: 'v1',
      callsAvailable: response.total || 0,
    });
  } catch (error: any) {
    console.error('Error testing Fathom connection:', error);
    return c.json({ 
      success: false,
      error: error.message || 'Failed to connect to Fathom API' 
    }, 500);
  }
}