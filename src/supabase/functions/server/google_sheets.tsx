/**
 * Google Sheets Integration
 * Handles appending form submissions to Google Sheets
 */

// Parse and validate Google credentials
function getGoogleCredentials() {
  const credsJson = Deno.env.get('GOOGLE_SHEETS_CREDENTIALS');
  
  if (!credsJson) {
    throw new Error('GOOGLE_SHEETS_CREDENTIALS not configured');
  }

  try {
    return JSON.parse(credsJson);
  } catch (error) {
    throw new Error('Invalid GOOGLE_SHEETS_CREDENTIALS JSON format');
  }
}

// Get Google OAuth token for service account
async function getAccessToken() {
  const credentials = getGoogleCredentials();
  
  const jwtHeader = {
    alg: 'RS256',
    typ: 'JWT',
  };

  const now = Math.floor(Date.now() / 1000);
  const jwtClaimSet = {
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  // Create JWT
  const encoder = new TextEncoder();
  const header = btoa(JSON.stringify(jwtHeader)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const payload = btoa(JSON.stringify(jwtClaimSet)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const unsignedToken = `${header}.${payload}`;

  // Import private key
  const pemHeader = '-----BEGIN PRIVATE KEY-----';
  const pemFooter = '-----END PRIVATE KEY-----';
  const pemContents = credentials.private_key
    .replace(pemHeader, '')
    .replace(pemFooter, '')
    .replace(/\s/g, '');
  
  const binaryDer = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));

  const key = await crypto.subtle.importKey(
    'pkcs8',
    binaryDer,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256',
    },
    false,
    ['sign']
  );

  // Sign the JWT
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    key,
    encoder.encode(unsignedToken)
  );

  const signatureBase64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const jwt = `${unsignedToken}.${signatureBase64}`;

  // Exchange JWT for access token
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to get access token: ${error}`);
  }

  const data = await response.json();
  return data.access_token;
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

// Helper to format submission for Job Applications
export function formatJobApplicationSubmission(data: any) {
  return [
    [
      data.submission_time ? new Date(data.submission_time).toLocaleString('en-US', { timeZone: 'America/New_York' }) : '',
      data.first_name || '',
      data.last_name || '',
      data.email || '',
      data.job_opening || '',
      data.linkedin || '',
      data.portfolio || '',
      data.additional_work_filename || '',
      data.cv_filename || '',
      data.experience || '',
      data.industry || '',
      data.skills || '',
      data.software_tools || '',
      data.languages || '',
      data.side_job || '',
      data.why_you || '',
      data.motivation || '',
      data.location || '',
      data.date_of_birth || '',
    ]
  ];
}