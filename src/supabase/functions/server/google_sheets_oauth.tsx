/**
 * Google Sheets Integration (OAuth-based)
 * Uses OAuth tokens instead of service account
 */

import * as kv from "./kv_store.tsx";

// OAuth Token Interface
interface OAuthTokens {
  access_token: string;
  refresh_token: string;
  expires_at: number; // Unix timestamp
}

const GOOGLE_OAUTH_CLIENT_ID = Deno.env.get('GOOGLE_OAUTH_CLIENT_ID') || '';
const GOOGLE_OAUTH_CLIENT_SECRET = Deno.env.get('GOOGLE_OAUTH_CLIENT_SECRET') || '';

// Get stored OAuth tokens
async function getStoredTokens(): Promise<OAuthTokens | null> {
  try {
    const tokens = await kv.get('google_sheets_oauth_tokens');
    return tokens ? JSON.parse(tokens) : null;
  } catch (error) {
    console.error('Error getting stored tokens:', error);
    return null;
  }
}

// Store OAuth tokens
async function storeTokens(tokens: OAuthTokens): Promise<void> {
  try {
    await kv.set('google_sheets_oauth_tokens', JSON.stringify(tokens));
    console.log('✅ OAuth tokens stored successfully');
  } catch (error) {
    console.error('❌ Error storing tokens:', error);
    throw error;
  }
}

// Refresh access token if expired
async function refreshAccessToken(refreshToken: string): Promise<OAuthTokens> {
  console.log('🔄 Refreshing access token...');
  
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: GOOGLE_OAUTH_CLIENT_ID,
      client_secret: GOOGLE_OAUTH_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('❌ Token refresh failed:', error);
    throw new Error(`Failed to refresh token: ${error}`);
  }

  const data = await response.json();
  
  const newTokens: OAuthTokens = {
    access_token: data.access_token,
    refresh_token: refreshToken, // Refresh token stays the same
    expires_at: Date.now() + (data.expires_in * 1000),
  };

  await storeTokens(newTokens);
  console.log('✅ Access token refreshed');
  
  return newTokens;
}

// Get valid access token (refresh if needed)
export async function getAccessToken(): Promise<string> {
  const tokens = await getStoredTokens();
  
  if (!tokens) {
    throw new Error('Google Sheets not connected. Please authorize first.');
  }

  // Check if token is expired or about to expire (5 min buffer)
  const now = Date.now();
  const expiresIn = tokens.expires_at - now;
  
  if (expiresIn < 5 * 60 * 1000) {
    console.log('⏰ Token expiring soon, refreshing...');
    const newTokens = await refreshAccessToken(tokens.refresh_token);
    return newTokens.access_token;
  }

  return tokens.access_token;
}

// Check if Google Sheets is connected
export async function isConnected(): Promise<boolean> {
  const tokens = await getStoredTokens();
  return tokens !== null;
}

// Exchange authorization code for tokens
export async function exchangeCodeForTokens(code: string, redirectUri: string): Promise<OAuthTokens> {
  console.log('🔄 Exchanging authorization code for tokens...');
  
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: GOOGLE_OAUTH_CLIENT_ID,
      client_secret: GOOGLE_OAUTH_CLIENT_SECRET,
      code: code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('❌ Token exchange failed:', error);
    throw new Error(`Failed to exchange code for tokens: ${error}`);
  }

  const data = await response.json();
  
  const tokens: OAuthTokens = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: Date.now() + (data.expires_in * 1000),
  };

  await storeTokens(tokens);
  console.log('✅ Tokens obtained and stored');
  
  return tokens;
}

// Disconnect Google Sheets
export async function disconnect(): Promise<void> {
  try {
    await kv.del('google_sheets_oauth_tokens');
    console.log('✅ Google Sheets disconnected');
  } catch (error) {
    console.error('❌ Error disconnecting:', error);
    throw error;
  }
}

// Append row to Google Sheet
export async function appendToSheet(
  spreadsheetId: string,
  range: string,
  values: any[][]
) {
  try {
    const accessToken = await getAccessToken();

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: values,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Google Sheets API error:', error);
      throw new Error(`Failed to append to sheet: ${error}`);
    }

    const result = await response.json();
    console.log('✅ Successfully appended to Google Sheets');
    return result;
  } catch (error) {
    console.error('❌ Error appending to Google Sheets:', error);
    throw error;
  }
}

// Helper to format submission for Let's Talk form
export function formatLetsTalkSubmission(data: any) {
  return [
    [
      new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
      data.name || '',
      data.email || '',
      data.company_name || '',
      Array.isArray(data.services) ? data.services.join(', ') : (data.services || ''),
      "Let's Talk", // Form name in column F
    ]
  ];
}

// Helper to format submission for Rapid Delivery signup
export function formatRapidDeliverySubmission(data: any) {
  return [
    [
      new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
      data.email || '',
      data.company_name || '',
      data.moodboard_focus || '',
      data.goal || '',
      "Moodboard", // Form name in column F
    ]
  ];
}

// Helper to format submission for Brand & Web download
export function formatBrandWebSubmission(data: any) {
  return [
    [
      new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
      data.email || '',
      '', // Empty column C (no company name for this form)
      '', // Empty column D
      '', // Empty column E
      "Brand & Web Download", // Form name in column F
    ]
  ];
}

// Helper to format submission for Social Media download
export function formatSocialMediaSubmission(data: any) {
  return [
    [
      new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
      data.email || '',
      '', // Empty column C
      '', // Empty column D
      '', // Empty column E
      "Social Media Download", // Form name in column F
    ]
  ];
}
