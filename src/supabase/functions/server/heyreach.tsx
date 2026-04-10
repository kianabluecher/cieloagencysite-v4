
import * as kv from "./kv_store.tsx";

// HeyReach API Integration
// Base URL: https://api.heyreach.io/api/public/

const BASE_URL = "https://api.heyreach.io/api/public";

// Helper for making HeyReach API calls
async function callHeyReach(endpoint: string, method: string = "POST", body?: any) {
  const apiKey = Deno.env.get("HEYREACH_API_KEY");
  
  if (!apiKey) {
    throw new Error("HEYREACH_API_KEY is not configured");
  }

  const headers = {
    "x-api-key": apiKey,
    "Content-Type": "application/json",
    "Accept": "application/json"
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HeyReach API Error (${response.status}): ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`HeyReach API call failed for ${endpoint}:`, error);
    throw error;
  }
}

export async function handleWebhook(c: any) {
  try {
    const payload = await c.req.json();
    console.log("HeyReach Webhook Payload:", JSON.stringify(payload, null, 2));

    // Generate a unique ID for the event
    const eventId = crypto.randomUUID();
    const timestamp = new Date().toISOString();

    // Store the event in KV store
    await kv.set(`heyreach:event:${eventId}`, {
      id: eventId,
      timestamp,
      payload
    });

    return c.json({ success: true, message: "Webhook received" });
  } catch (error) {
    console.error("Error processing HeyReach webhook:", error);
    return c.json({ error: "Failed to process webhook" }, 500);
  }
}

export async function getWebhookEvents(c: any) {
  try {
    const events = await kv.getByPrefix("heyreach:event:");
    // Sort by timestamp descending
    events.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return c.json({ success: true, events });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
}

export async function getCampaigns(c: any) {
  try {
    const { offset = 0, limit = 50 } = c.req.query();
    
    const data = await callHeyReach("/campaign/GetAll", "POST", {
      offset: parseInt(offset as string),
      limit: parseInt(limit as string)
    });

    return c.json({ success: true, data });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
}

export async function getCampaignLeads(c: any) {
  try {
    const campaignId = c.req.param("id");
    const { offset = 0, limit = 50, status } = c.req.query();

    const body: any = {
      campaign_id: parseInt(campaignId),
      offset: parseInt(offset as string),
      limit: parseInt(limit as string)
    };
    
    if (status) {
        body.status = status;
    }

    // endpoint: /lead/GetLeadsForACampaign
    // Note: The user prompt said "/lead/GetLeadsForACampaign Filters for leads by campaign".
    // I need to confirm the body structure. Assuming 'campaign_id' is the field.
    // The user example didn't show the request body for leads, but it's standard.
    
    // Correction: The user prompt says "Get Campaign Leads - /lead/GetLeadsForACampaign".
    // I'll assume the body takes campaign_id or similar.
    // If exact param name is unknown, I'll try 'campaignId' or 'campaign_id'.
    // Let's guess 'campaignId' based on camelCase vs snake_case inconsistency in user prompt (campaignAccountIds is camel).
    // But usually APIs use consistent casing. 'campaignAccountIds' suggests camelCase.
    // However, I'll send both or check docs if I could. I can't check external docs.
    // I'll try sending `campaignId` and `id` to be safe? No, that might error.
    // I'll assume `campaignId`.
    
    const data = await callHeyReach("/lead/GetLeadsForACampaign", "POST", {
        campaignId: parseInt(campaignId),
        offset: parseInt(offset as string),
        limit: parseInt(limit as string),
        // Add filters if any
        ...(status ? { status } : {})
    });

    return c.json({ success: true, data });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
}

export async function getLinkedInAccounts(c: any) {
  try {
    const { offset = 0, limit = 50 } = c.req.query();

    const data = await callHeyReach("/li_account/GetAll", "POST", {
      offset: parseInt(offset as string),
      limit: parseInt(limit as string)
    });

    return c.json({ success: true, data });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
}

export async function getLists(c: any) {
  try {
    const { offset = 0, limit = 50 } = c.req.query();

    const data = await callHeyReach("/list/GetAll", "POST", {
        offset: parseInt(offset as string),
        limit: parseInt(limit as string)
    });

    return c.json({ success: true, data });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
}
