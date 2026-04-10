/**
 * Jira Integration
 * Fetches tasks, projects, and sprint data from Jira
 */

import { Context } from "npm:hono";
import { createClient } from "npm:@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

interface JiraCredentials {
  domain: string;
  email: string;
  apiToken: string;
}

// Hardcoded credentials (pre-configured fallback)
const DEFAULT_JIRA_CREDENTIALS = {
  domain: 'cieloagency',
  email: 'agency@cielo.marketing',
  apiToken: 'ATATT3xFfGF0ZoOuwKPW_rjBrh-tU0y_jURJbypl75E-mTfeBABLMHJyiZ6i_OvNEULYUvrSncCd6Zw5f8CAj56oBx6VjsLuC5kpp4xJfiZV8ZnyEHw0Dl_C9IKG9bBV_AzlkqX94tIdnenXsGl26sXYwqzAv3_kH4sxivz3zSEHzvBSNQvldyU=F0A03DBF'
};

// Get stored Jira credentials from database
async function getJiraCredentials(): Promise<JiraCredentials | null> {
  try {
    // Query the jira_credentials table
    const { data, error } = await supabase
      .from('jira_credentials')
      .select('domain, email, api_token')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
    if (error) {
      console.log('⚠️ No credentials found in database, using defaults:', error.message);
      return DEFAULT_JIRA_CREDENTIALS;
    }
    
    if (data && data.domain && data.email && data.api_token) {
      console.log('✅ Using Jira credentials from database for domain:', data.domain);
      return {
        domain: data.domain,
        email: data.email,
        apiToken: data.api_token
      };
    }
    
    console.log('⚠️ No valid credentials in database, using defaults');
    return DEFAULT_JIRA_CREDENTIALS;
  } catch (error) {
    console.error('❌ Error getting Jira credentials from database:', error);
    console.log('⚠️ Falling back to hardcoded default credentials');
    return DEFAULT_JIRA_CREDENTIALS;
  }
}

// Store Jira credentials
export async function storeJiraCredentials(c: Context) {
  try {
    const { domain, email, apiToken } = await c.req.json();
    
    if (!domain || !email || !apiToken) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    // Normalize domain - extract just the subdomain from various formats
    // Handles: "cieloagency", "cieloagency.atlassian.net", "https://cieloagency.atlassian.net", "https://cieloagency.atlassian.net/"
    let normalizedDomain = domain.trim();
    
    // Remove protocol if present
    normalizedDomain = normalizedDomain.replace(/^https?:\/\//, '');
    
    // Remove trailing slash
    normalizedDomain = normalizedDomain.replace(/\/$/, '');
    
    // If it includes .atlassian.net, extract just the subdomain
    if (normalizedDomain.includes('.atlassian.net')) {
      normalizedDomain = normalizedDomain.split('.atlassian.net')[0];
    }
    
    console.log(`📝 Normalizing Jira domain: "${domain}" -> "${normalizedDomain}"`);

    // Insert or update the jira_credentials table
    const { data, error } = await supabase
      .from('jira_credentials')
      .upsert({
        domain: normalizedDomain,
        email,
        api_token: apiToken,
      })
      .select()
      .single();
    
    if (error) {
      console.error('❌ Error storing Jira credentials:', error);
      return c.json({ error: 'Failed to store credentials' }, 500);
    }

    return c.json({ 
      message: 'Jira credentials saved successfully',
      normalizedDomain,
      credentials: {
        domain: data.domain,
        email: data.email,
        apiToken: data.api_token
      }
    });
  } catch (error) {
    console.error('Error storing Jira credentials:', error);
    return c.json({ error: 'Failed to store credentials' }, 500);
  }
}

// Get stored Jira credentials (for UI display)
export async function getStoredJiraCredentials(c: Context) {
  try {
    // Query the jira_credentials table
    const { data, error } = await supabase
      .from('jira_credentials')
      .select('domain, email, api_token')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
    if (error) {
      console.log('⚠️ No credentials found in database');
      return c.json({ 
        credentials: null,
        message: 'No credentials stored'
      });
    }
    
    if (data && data.domain && data.email && data.api_token) {
      console.log('✅ Retrieved Jira credentials for domain:', data.domain);
      return c.json({
        credentials: {
          domain: data.domain,
          email: data.email,
          apiToken: data.api_token
        }
      });
    }
    
    return c.json({ 
      credentials: null,
      message: 'No valid credentials found'
    });
  } catch (error) {
    console.error('❌ Error getting stored Jira credentials:', error);
    return c.json({ error: 'Failed to retrieve credentials' }, 500);
  }
}

// Make authenticated Jira API request
async function jiraRequest(endpoint: string, method = 'GET', body?: any) {
  const creds = await getJiraCredentials();
  
  if (!creds) {
    throw new Error('Jira credentials not configured');
  }

  const auth = btoa(`${creds.email}:${creds.apiToken}`);
  const url = `https://${creds.domain}.atlassian.net/rest/api/3${endpoint}`;

  console.log(`🔵 Jira API Request: ${method} ${url}`);

  const options: any = {
    method,
    headers: {
      'Authorization': `Basic ${auth}`,
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
      console.error(`❌ Jira API error (${response.status}):`, errorText);
      throw new Error(`Jira API error: ${response.status} ${errorText}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error('❌ Jira request failed:', error);
    throw error;
  }
}

// Get all projects
export async function getJiraProjects(c: Context) {
  try {
    const projects = await jiraRequest('/project');
    
    return c.json({
      projects: projects.map((p: any) => ({
        id: p.id,
        key: p.key,
        name: p.name,
        projectTypeKey: p.projectTypeKey,
        lead: p.lead?.displayName,
        avatarUrl: p.avatarUrls?.['48x48'],
      })),
    });
  } catch (error: any) {
    console.error('Error fetching Jira projects:', error);
    return c.json({ error: error.message || 'Failed to fetch projects' }, 500);
  }
}

// Get issues/tasks for a project
export async function getJiraIssues(c: Context) {
  try {
    const projectKey = c.req.query('project');
    const status = c.req.query('status');
    
    // Add date restriction to avoid unrestricted JQL queries
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    const dateFilter = threeMonthsAgo.toISOString().split('T')[0];
    
    let jql = projectKey 
      ? `project = ${projectKey} AND updated >= "${dateFilter}"` 
      : `updated >= "${dateFilter}"`;
    
    if (status) {
      jql += ` AND status = "${status}"`;
    }
    
    jql += ' ORDER BY updated DESC';

    const response = await jiraRequest(
      `/search/jql?jql=${encodeURIComponent(jql)}&maxResults=100&fields=summary,status,assignee,priority,created,updated,duedate,issuetype,parent`
    );

    return c.json({
      issues: response.issues.map((issue: any) => ({
        id: issue.id,
        key: issue.key,
        summary: issue.fields.summary,
        status: issue.fields.status?.name,
        statusCategory: issue.fields.status?.statusCategory?.key,
        assignee: issue.fields.assignee?.displayName,
        assigneeAvatar: issue.fields.assignee?.avatarUrls?.['48x48'],
        priority: issue.fields.priority?.name,
        priorityIcon: issue.fields.priority?.iconUrl,
        issueType: issue.fields.issuetype?.name,
        issueTypeIcon: issue.fields.issuetype?.iconUrl,
        created: issue.fields.created,
        updated: issue.fields.updated,
        dueDate: issue.fields.duedate,
        parentKey: issue.fields.parent?.key,
      })),
      total: response.total,
    });
  } catch (error: any) {
    console.error('Error fetching Jira issues:', error);
    return c.json({ error: error.message || 'Failed to fetch issues' }, 500);
  }
}

// Get active sprints
export async function getJiraSprints(c: Context) {
  try {
    const boardId = c.req.query('boardId');
    
    if (!boardId) {
      return c.json({ error: 'Board ID is required' }, 400);
    }

    const sprints = await jiraRequest(`/board/${boardId}/sprint?state=active,future`);

    return c.json({
      sprints: sprints.values.map((sprint: any) => ({
        id: sprint.id,
        name: sprint.name,
        state: sprint.state,
        startDate: sprint.startDate,
        endDate: sprint.endDate,
        goal: sprint.goal,
      })),
    });
  } catch (error: any) {
    console.error('Error fetching Jira sprints:', error);
    return c.json({ error: error.message || 'Failed to fetch sprints' }, 500);
  }
}

// Get dashboard summary
export async function getJiraDashboard(c: Context) {
  try {
    // Add date restriction to avoid unrestricted JQL queries
    // Fetch issues updated in the last 12 months
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
    const dateFilter = twelveMonthsAgo.toISOString().split('T')[0];
    
    const jql = `updated >= "${dateFilter}" ORDER BY updated DESC`;
    
    console.log(`🔍 Fetching Jira dashboard with JQL: ${jql}`);
    
    const allIssuesResponse = await jiraRequest(
      `/search/jql?jql=${encodeURIComponent(jql)}&maxResults=1000&fields=summary,status,assignee,priority,created,updated,duedate,issuetype`
    );

    const issues = allIssuesResponse.issues;
    const total = allIssuesResponse.total;

    console.log(`✅ Found ${issues.length} issues (total: ${total})`);

    // Calculate statistics
    const statusCounts = issues.reduce((acc: any, issue: any) => {
      const status = issue.fields.status?.statusCategory?.key || 'undefined';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    const priorityCounts = issues.reduce((acc: any, issue: any) => {
      const priority = issue.fields.priority?.name || 'None';
      acc[priority] = (acc[priority] || 0) + 1;
      return acc;
    }, {});

    // Get overdue tasks
    const today = new Date().toISOString().split('T')[0];
    const overdue = issues.filter((issue: any) => {
      const dueDate = issue.fields.duedate;
      return dueDate && dueDate < today && issue.fields.status?.statusCategory?.key !== 'done';
    });

    // Get recently updated
    const recentlyUpdated = issues.slice(0, 10).map((issue: any) => ({
      key: issue.key,
      summary: issue.fields.summary,
      status: issue.fields.status?.name,
      assignee: issue.fields.assignee?.displayName,
      updated: issue.fields.updated,
      issueType: issue.fields.issuetype?.name,
    }));

    return c.json({
      summary: {
        total,
        todo: statusCounts['new'] || 0,
        inProgress: statusCounts['indeterminate'] || 0,
        done: statusCounts['done'] || 0,
        overdue: overdue.length,
      },
      priorityCounts,
      statusCounts,
      recentlyUpdated,
      overdueIssues: overdue.slice(0, 5).map((issue: any) => ({
        key: issue.key,
        summary: issue.fields.summary,
        dueDate: issue.fields.duedate,
        assignee: issue.fields.assignee?.displayName,
      })),
    });
  } catch (error: any) {
    console.error('Error fetching Jira dashboard:', error);
    return c.json({ error: error.message || 'Failed to fetch dashboard data' }, 500);
  }
}

// Get Jira tasks for Main Dashboard
export async function getJiraTasks(c: Context) {
  try {
    // Add date restriction to avoid unrestricted JQL queries
    // Fetch issues updated in the last 12 months
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
    const dateFilter = twelveMonthsAgo.toISOString().split('T')[0];
    
    const jql = `updated >= "${dateFilter}" ORDER BY updated DESC`;
    
    console.log(`🔍 Fetching Jira tasks with JQL: ${jql}`);
    
    const allIssuesResponse = await jiraRequest(
      `/search/jql?jql=${encodeURIComponent(jql)}&maxResults=1000&fields=summary,status,assignee,priority,created,updated,duedate,issuetype`
    );

    const issues = allIssuesResponse.issues;
    const total = allIssuesResponse.total;

    console.log(`✅ Found ${issues.length} issues (total: ${total})`);

    // Transform to simple task format
    const tasks = issues.map((issue: any) => ({
      key: issue.key,
      summary: issue.fields.summary,
      status: issue.fields.status?.name || 'Unknown',
      statusCategory: issue.fields.status?.statusCategory?.key || 'undefined',
      assignee: issue.fields.assignee?.displayName || 'Unassigned',
      priority: issue.fields.priority?.name || 'None',
      issueType: issue.fields.issuetype?.name || 'Task',
      updated: issue.fields.updated,
      created: issue.fields.created,
      dueDate: issue.fields.duedate,
    }));

    return c.json({
      tasks,
      total: tasks.length,
    });
  } catch (error: any) {
    console.error('❌ Error fetching Jira tasks:', error);
    return c.json({ error: error.message || 'Failed to fetch tasks', tasks: [], total: 0 }, 500);
  }
}

// Test Jira connection
export async function testJiraConnection(c: Context) {
  try {
    const { domain, email, apiToken } = await c.req.json();
    
    if (!domain || !email || !apiToken) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    // Normalize domain - extract just the subdomain from various formats
    let normalizedDomain = domain.trim();
    normalizedDomain = normalizedDomain.replace(/^https?:\/\//, '');
    normalizedDomain = normalizedDomain.replace(/\/$/, '');
    if (normalizedDomain.includes('.atlassian.net')) {
      normalizedDomain = normalizedDomain.split('.atlassian.net')[0];
    }

    console.log(`🧪 Testing Jira connection: "${domain}" -> "${normalizedDomain}"`);

    const auth = btoa(`${email}:${apiToken}`);
    const url = `https://${normalizedDomain}.atlassian.net/rest/api/3/myself`;

    console.log(`🔗 Connecting to: ${url}`);

    const response = await fetch(url, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Test failed (${response.status}):`, errorText);
      return c.json({ 
        error: `Connection failed: ${response.status}`,
        details: errorText 
      }, response.status);
    }

    const user = await response.json();

    return c.json({
      success: true,
      message: 'Connection successful!',
      user: {
        displayName: user.displayName,
        emailAddress: user.emailAddress,
        accountId: user.accountId,
      },
    });
  } catch (error: any) {
    console.error('Error testing Jira connection:', error);
    return c.json({ error: error.message || 'Failed to test connection' }, 500);
  }
}