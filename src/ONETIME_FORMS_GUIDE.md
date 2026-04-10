# CIELO Agency - One-Time Submission Forms Guide

## Overview
This system implements **4 separate one-time submission forms**, each storing data in its own dedicated Supabase table. Each form is limited to **one submission per business/email** to ensure exclusivity and prevent duplicate submissions.

---

## 📋 The Four Forms

### 1. **DIY Brand → Credible Brand**
**Purpose:** Analyze brand identity and market differentiation  
**Table:** `diy_to_credible_brand_submissions`  
**Endpoint:** `POST /make-server-27c238f7/forms/diy-brand/submit`

#### Form Fields:
- **Business Info**: email, company_name, website, industry
- **Brand Assessment**: current_brand_assessment, brand_challenges, brand_personality, visual_preferences
- **Market Position**: target_audience, competitors, unique_value_proposition
- **Goals**: primary_goals, timeline, budget_range

#### Analysis Results (stored after processing):
- `analysis_result` (jsonb) - AI-generated brand analysis
- `recommendations` (jsonb) - Specific improvement recommendations

---

### 2. **GTM Strategy & Funnel**
**Purpose:** Review go-to-market and conversion funnel  
**Table:** `gtm_strategy_submissions`  
**Endpoint:** `POST /make-server-27c238f7/forms/gtm-strategy/submit`

#### Form Fields:
- **Business Info**: email, company_name, website, industry, business_stage
- **Product**: product_description, target_market, customer_segments, pricing_model
- **Current GTM**: current_channels, monthly_revenue, customer_acquisition_cost, current_conversion_rate
- **Challenges**: gtm_challenges, funnel_stage_focus, competitor_analysis
- **Goals**: primary_objectives, target_metrics, marketing_budget, timeline

#### Analysis Results (stored after processing):
- `strategy_analysis` (jsonb) - GTM strategy analysis
- `funnel_recommendations` (jsonb) - Funnel optimization recommendations
- `channel_recommendations` (jsonb) - Recommended marketing channels

---

### 3. **Social Media Copy & Calendar**
**Purpose:** Get insights on content strategy and posting schedule  
**Table:** `social_media_submissions`  
**Endpoint:** `POST /make-server-27c238f7/forms/social-media/submit`

#### Form Fields:
- **Business Info**: email, company_name, website, industry
- **Current Presence**: active_platforms, platform_handles, current_posting_frequency, content_types
- **Performance**: follower_counts, engagement_rate, best_performing_content
- **Strategy**: social_media_goals, target_audience_social, content_challenges, brand_voice
- **Preferences**: content_pillars, competitor_examples, avoided_topics
- **Resources**: budget_range, timeline, internal_resources

#### Analysis Results (stored after processing):
- `content_strategy` (jsonb) - AI-generated content strategy
- `copy_calendar` (jsonb) - 30-day social media calendar with copy suggestions
- `content_ideas` (jsonb) - Specific content ideas and formats

---

### 4. **How to Sell & Offer**
**Purpose:** Design market-ready offers, audit sales flow & build GTM packages  
**Table:** `sales_offer_submissions`  
**Endpoint:** `POST /make-server-27c238f7/forms/sales-offer/submit`

#### Form Fields:
- **Business Info**: email, company_name, website, industry, business_model
- **Current Offer**: product_service_description, current_price_point, pricing_structure, target_customer
- **Sales Performance**: current_sales_volume, conversion_rate, average_deal_size, sales_cycle_length
- **Challenges**: sales_challenges, current_sales_materials, competitor_offers
- **Goals**: offer_goals, target_customer_segments, desired_pricing_model
- **Process**: current_sales_process, lead_sources, sales_team_size, gtm_package_needs
- **Resources**: budget_range, timeline

#### Analysis Results (stored after processing):
- `offer_analysis` (jsonb) - AI-generated offer analysis
- `pricing_recommendations` (jsonb) - Pricing strategy recommendations
- `sales_package` (jsonb) - Design recommendations for GTM package
- `positioning_strategy` (jsonb) - How to position and communicate value

---

## 🚀 Setup Instructions

### Step 1: Run SQL Migration
Run the migration file in Supabase SQL Editor:
```bash
/sql_migrations/create_onetime_forms_tables.sql
```

This will create:
- ✅ 4 separate tables with proper schema
- ✅ Indexes for performance
- ✅ Row Level Security (RLS) policies
- ✅ Auto-update triggers for `updated_at` fields
- ✅ One submission per email constraint

### Step 2: Verify Tables
In Supabase Dashboard → Table Editor, verify these tables exist:
- `diy_to_credible_brand_submissions`
- `gtm_strategy_submissions`
- `social_media_submissions`
- `sales_offer_submissions`

### Step 3: Test API Endpoints
The server endpoints are already configured in `/supabase/functions/server/index.tsx`

---

## 📡 API Endpoints Reference

### DIY Brand → Credible Brand

**Submit Form (Public)**
```bash
POST /make-server-27c238f7/forms/diy-brand/submit
Content-Type: application/json

{
  "email": "founder@startup.com",
  "company_name": "Startup Inc",
  "website": "https://startup.com",
  "industry": "SaaS",
  "current_brand_assessment": "DIY",
  "brand_challenges": ["Inconsistent visuals", "No clear positioning"],
  "target_audience": "B2B SMBs",
  "competitors": ["Competitor A", "Competitor B"],
  "unique_value_proposition": "Our unique approach...",
  "primary_goals": ["Increase brand credibility", "Professional appearance"],
  "timeline": "1 month",
  "budget_range": "$5,000-$10,000"
}
```

**Get All Submissions (Protected)**
```bash
GET /make-server-27c238f7/forms/diy-brand/submissions
Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>
```

**Update Submission (Protected)**
```bash
PUT /make-server-27c238f7/forms/diy-brand/submissions/:id
Content-Type: application/json
Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>

{
  "status": "completed",
  "analysis_result": { ... },
  "priority": "high",
  "notes": "Great candidate for full brand package"
}
```

---

### GTM Strategy & Funnel

**Submit Form (Public)**
```bash
POST /make-server-27c238f7/forms/gtm-strategy/submit
Content-Type: application/json

{
  "email": "founder@startup.com",
  "company_name": "Startup Inc",
  "business_stage": "Growing",
  "product_description": "B2B SaaS platform for...",
  "target_market": "SMBs in healthcare",
  "pricing_model": "Subscription",
  "current_channels": ["LinkedIn", "Google Ads"],
  "monthly_revenue": "$10k-$50k",
  "gtm_challenges": ["Low conversion rate", "High CAC"],
  "funnel_stage_focus": ["awareness", "conversion"],
  "primary_objectives": ["Increase conversions", "Reduce CAC"],
  "timeline": "2-3 months"
}
```

**Get All Submissions (Protected)**
```bash
GET /make-server-27c238f7/forms/gtm-strategy/submissions
```

**Update Submission (Protected)**
```bash
PUT /make-server-27c238f7/forms/gtm-strategy/submissions/:id
```

---

### Social Media Copy & Calendar

**Submit Form (Public)**
```bash
POST /make-server-27c238f7/forms/social-media/submit
Content-Type: application/json

{
  "email": "founder@startup.com",
  "company_name": "Startup Inc",
  "active_platforms": ["Instagram", "LinkedIn", "Twitter"],
  "platform_handles": {
    "instagram": "@startup",
    "linkedin": "startup-inc",
    "twitter": "@startup"
  },
  "current_posting_frequency": "Weekly",
  "content_types": ["Images", "Carousels", "Text posts"],
  "follower_counts": {
    "instagram": 1500,
    "linkedin": 800,
    "twitter": 600
  },
  "engagement_rate": "Average (1-3%)",
  "social_media_goals": ["Brand awareness", "Lead generation"],
  "content_challenges": ["Consistency", "Ideas", "Copywriting"],
  "brand_voice": "Professional, helpful, approachable",
  "content_pillars": ["Industry insights", "Product tips", "Customer stories"],
  "timeline": "1 month"
}
```

**Get All Submissions (Protected)**
```bash
GET /make-server-27c238f7/forms/social-media/submissions
```

**Update Submission (Protected)**
```bash
PUT /make-server-27c238f7/forms/social-media/submissions/:id
```

---

### How to Sell & Offer

**Submit Form (Public)**
```bash
POST /make-server-27c238f7/forms/sales-offer/submit
Content-Type: application/json

{
  "email": "founder@startup.com",
  "company_name": "Startup Inc",
  "business_model": "B2B",
  "product_service_description": "SaaS platform that...",
  "current_price_point": "$99/month",
  "pricing_structure": "Tiered",
  "current_sales_volume": "10-50/month",
  "conversion_rate": "2-5%",
  "average_deal_size": "$1,200",
  "sales_cycle_length": "1 month",
  "sales_challenges": ["Pricing objections", "Value communication"],
  "offer_goals": ["Increase price point", "Package better"],
  "current_sales_process": "Demo → Proposal → Close",
  "lead_sources": ["Inbound website", "LinkedIn outbound"],
  "sales_team_size": "Solo",
  "gtm_package_needs": ["Sales deck", "One-pager", "Pricing calculator"],
  "timeline": "1-2 months"
}
```

**Get All Submissions (Protected)**
```bash
GET /make-server-27c238f7/forms/sales-offer/submissions
```

**Update Submission (Protected)**
```bash
PUT /make-server-27c238f7/forms/sales-offer/submissions/:id
```

---

## 🔐 Security Features

### One Submission Per Email
Each table has a `UNIQUE` constraint on the `email` field:
- Attempting to submit twice with the same email returns a **409 Conflict** error
- Error message: *"A submission already exists for this email. Only one submission per business is allowed."*

### Row Level Security (RLS)
- **Public**: Can only submit forms (POST)
- **Authenticated Users**: Can view and update all submissions
- **Service Role**: Full access to all operations

### Status Workflow
All submissions start with `status: 'submitted'` and can be updated to:
- `analyzing` - Processing the submission
- `completed` - Analysis completed
- `contacted` - Team reached out
- `converted` - Client converted
- `archived` - No longer active

### Priority Levels
- `low` - Standard priority
- `normal` - Default priority
- `high` - Needs attention
- `urgent` - Immediate action required

---

## 📊 Integration with Team Dashboard

### Adding to Unified Dashboard
Update `/components/pages/TeamDashboard.tsx` or `/components/TeamDashboardUnified.tsx` to include these new submission types:

```typescript
// Fetch one-time form submissions
const fetchOneTimeForms = async () => {
  const [diyBrand, gtmStrategy, socialMedia, salesOffer] = await Promise.all([
    fetch(`${API_URL}/forms/diy-brand/submissions`, { headers: authHeaders }),
    fetch(`${API_URL}/forms/gtm-strategy/submissions`, { headers: authHeaders }),
    fetch(`${API_URL}/forms/social-media/submissions`, { headers: authHeaders }),
    fetch(`${API_URL}/forms/sales-offer/submissions`, { headers: authHeaders }),
  ]);

  // Process and display...
};
```

### Statistics Display
```typescript
const stats = {
  diy_brand: submissions.diy_brand.length,
  gtm_strategy: submissions.gtm_strategy.length,
  social_media: submissions.social_media.length,
  sales_offer: submissions.sales_offer.length,
  total: /* sum of all */
};
```

---

## 🔄 Automation & Webhooks

### Slack Notifications
Add webhook triggers for new submissions:

```typescript
// Example: Notify Slack when new form submitted
app.post("/make-server-27c238f7/forms/diy-brand/submit", async (c) => {
  // ... existing code ...
  
  // Send Slack notification
  const slackWebhookUrl = Deno.env.get("SLACK_WEBHOOK_URL");
  if (slackWebhookUrl) {
    await fetch(slackWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `🎨 New DIY Brand submission from ${company_name}!`,
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*New DIY Brand → Credible Brand Submission*\n*Company:* ${company_name}\n*Email:* ${email}\n*Timeline:* ${timeline}`
            }
          }
        ]
      })
    });
  }
  
  // ... rest of code ...
});
```

### Google Sheets / Notion Sync
Use Make.com or Zapier to sync submissions:
1. **Trigger**: New row in Supabase table
2. **Action**: Add row to Google Sheets or Notion database

---

## 🎨 Frontend Form Examples

### Example React Form Component

```tsx
import { useState } from 'react';

export function DiyBrandForm() {
  const [formData, setFormData] = useState({
    email: '',
    company_name: '',
    website: '',
    industry: '',
    current_brand_assessment: '',
    brand_challenges: [],
    target_audience: '',
    competitors: [],
    unique_value_proposition: '',
    primary_goals: [],
    timeline: '',
    budget_range: '',
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        'https://<PROJECT_ID>.supabase.co/functions/v1/make-server-27c238f7/forms/diy-brand/submit',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer <ANON_KEY>'
          },
          body: JSON.stringify(formData)
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 bg-green-50 border border-green-200 rounded-lg">
        <h2 className="text-2xl font-bold text-green-800 mb-2">
          Thank You!
        </h2>
        <p className="text-green-700">
          Your submission has been received. We'll analyze your brand and get back to you soon!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">DIY Brand → Credible Brand</h1>
      
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Email *</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Company Name *</label>
        <input
          type="text"
          required
          value={formData.company_name}
          onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Add more form fields... */}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

---

## 📈 Next Steps

1. **Run the SQL migration** in Supabase
2. **Test the API endpoints** using cURL or Postman
3. **Create frontend forms** for each submission type
4. **Add to Team Dashboard** for viewing and managing submissions
5. **Set up Slack/Discord webhooks** for notifications
6. **Configure Make/Zapier** for Google Sheets/Notion sync
7. **Implement AI analysis** for generating recommendations (optional)

---

## ✅ Summary

You now have:
- ✅ **4 separate Supabase tables** for one-time submissions
- ✅ **12 API endpoints** (3 per form: submit, get all, update)
- ✅ **One submission per email** constraint enforcement
- ✅ **RLS policies** for security
- ✅ **Auto-update triggers** for timestamps
- ✅ **Comprehensive field schemas** for detailed data collection
- ✅ **Status and priority** workflow management

Each form is completely independent with its own table, endpoints, and data structure!
