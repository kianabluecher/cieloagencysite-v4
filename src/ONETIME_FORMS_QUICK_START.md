# One-Time Submission Forms - Quick Start

## 🎯 What Was Built

**4 separate one-time submission forms**, each with its own Supabase table:

| Form Name | Table Name | Purpose |
|-----------|------------|---------|
| **DIY Brand → Credible Brand** | `diy_to_credible_brand_submissions` | Analyze brand identity and market differentiation |
| **GTM Strategy & Funnel** | `gtm_strategy_submissions` | Review go-to-market and conversion funnel |
| **Social Media Copy & Calendar** | `social_media_submissions` | Get insights on content strategy and posting schedule |
| **How to Sell & Offer** | `sales_offer_submissions` | Design market-ready offers, audit sales flow & build GTM packages |

---

## 🚀 Quick Setup (3 Steps)

### 1. Run SQL Migration
Open Supabase SQL Editor and run:
```
/sql_migrations/create_onetime_forms_tables.sql
```

### 2. Verify Tables Created
Go to Supabase Dashboard → Table Editor  
Check that these 4 tables exist:
- `diy_to_credible_brand_submissions`
- `gtm_strategy_submissions`
- `social_media_submissions`
- `sales_offer_submissions`

### 3. Test an Endpoint
```bash
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/make-server-27c238f7/forms/diy-brand/submit \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{
    "email": "test@company.com",
    "company_name": "Test Company",
    "industry": "SaaS",
    "timeline": "1 month"
  }'
```

---

## 📡 API Endpoints Summary

### Each form has 3 endpoints:

#### DIY Brand
- `POST /make-server-27c238f7/forms/diy-brand/submit` - Submit form (Public)
- `GET /make-server-27c238f7/forms/diy-brand/submissions` - Get all (Protected)
- `PUT /make-server-27c238f7/forms/diy-brand/submissions/:id` - Update (Protected)

#### GTM Strategy
- `POST /make-server-27c238f7/forms/gtm-strategy/submit`
- `GET /make-server-27c238f7/forms/gtm-strategy/submissions`
- `PUT /make-server-27c238f7/forms/gtm-strategy/submissions/:id`

#### Social Media
- `POST /make-server-27c238f7/forms/social-media/submit`
- `GET /make-server-27c238f7/forms/social-media/submissions`
- `PUT /make-server-27c238f7/forms/social-media/submissions/:id`

#### Sales Offer
- `POST /make-server-27c238f7/forms/sales-offer/submit`
- `GET /make-server-27c238f7/forms/sales-offer/submissions`
- `PUT /make-server-27c238f7/forms/sales-offer/submissions/:id`

---

## 🔒 Key Features

### One Submission Per Email
- Each table has `UNIQUE(email)` constraint
- Duplicate submissions return `409 Conflict` error
- Ensures exclusivity: "Only one submission per business"

### Status Workflow
All submissions start with `status: 'submitted'`  
Can be updated to:
- `analyzing` → `completed` → `contacted` → `converted` → `archived`

### Priority Levels
- `low` | `normal` (default) | `high` | `urgent`

### Security (RLS Policies)
- **Public**: Can submit forms
- **Authenticated**: Can view/update all submissions
- **Service Role**: Full access

---

## 📊 Database Schema Overview

### Common Fields (All Tables)
```sql
id                  uuid PRIMARY KEY
submission_id       text UNIQUE
email              text NOT NULL UNIQUE  -- One per business!
company_name       text NOT NULL
website            text
industry           text
status             text DEFAULT 'submitted'
priority           text DEFAULT 'normal'
assigned_to        uuid (references auth.users)
notes              text
submitted_at       timestamptz DEFAULT now()
created_at         timestamptz DEFAULT now()
updated_at         timestamptz DEFAULT now()
```

### Form-Specific Fields

**DIY Brand:**
- `current_brand_assessment`, `brand_challenges[]`, `target_audience`
- `competitors[]`, `unique_value_proposition`
- `analysis_result` (jsonb), `recommendations` (jsonb)

**GTM Strategy:**
- `business_stage`, `product_description`, `customer_segments` (jsonb)
- `current_channels[]`, `gtm_challenges[]`, `funnel_stage_focus[]`
- `strategy_analysis` (jsonb), `funnel_recommendations` (jsonb)

**Social Media:**
- `active_platforms[]`, `platform_handles` (jsonb), `follower_counts` (jsonb)
- `content_types[]`, `social_media_goals[]`, `content_challenges[]`
- `content_strategy` (jsonb), `copy_calendar` (jsonb)

**Sales Offer:**
- `business_model`, `pricing_structure`, `current_sales_volume`
- `sales_challenges[]`, `offer_goals[]`, `gtm_package_needs[]`
- `offer_analysis` (jsonb), `pricing_recommendations` (jsonb)

---

## 🎨 Frontend Integration Example

```typescript
const submitForm = async (formData: any) => {
  const response = await fetch(
    'https://PROJECT_ID.supabase.co/functions/v1/make-server-27c238f7/forms/diy-brand/submit',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ANON_KEY}`
      },
      body: JSON.stringify(formData)
    }
  );

  if (!response.ok) {
    const error = await response.json();
    if (response.status === 409) {
      // Duplicate submission
      alert('You already submitted this form!');
    }
    throw new Error(error.error);
  }

  return await response.json();
};
```

---

## 📋 Next Steps

### For Frontend Development:
1. Create form components for each submission type
2. Add client-side validation
3. Handle duplicate submission errors (409)
4. Show success/error states

### For Team Dashboard:
1. Add new submission types to dashboard view
2. Create filters for each form type
3. Add inline editing for status/priority
4. Display submission statistics

### For Automation:
1. Set up Slack/Discord webhooks for new submissions
2. Configure Make/Zapier for Google Sheets sync
3. Add email notifications for team assignments
4. Implement AI analysis for recommendations

---

## 📄 Files Created

1. **SQL Migration**: `/sql_migrations/create_onetime_forms_tables.sql`
   - Creates 4 tables with full schema
   - Sets up RLS policies
   - Creates indexes and triggers

2. **Server Endpoints**: `/supabase/functions/server/index.tsx`
   - Added 12 endpoints (3 per form)
   - Includes duplicate submission check
   - Proper error handling

3. **Documentation**: 
   - `/ONETIME_FORMS_GUIDE.md` - Comprehensive guide
   - `/ONETIME_FORMS_QUICK_START.md` - This file

---

## ✅ Checklist

- [ ] Run SQL migration in Supabase
- [ ] Verify tables exist in Table Editor
- [ ] Test POST endpoint with sample data
- [ ] Test GET endpoint (requires auth)
- [ ] Create frontend form components
- [ ] Add to Team Dashboard
- [ ] Set up Slack notifications
- [ ] Configure Make/Zapier sync
- [ ] Test duplicate submission prevention
- [ ] Update RLS policies if needed

---

## 🆘 Troubleshooting

**Error: "relation does not exist"**
→ Run the SQL migration

**Error: 409 Conflict**
→ Email already submitted. This is expected behavior for duplicate submissions.

**Error: 401 Unauthorized (on GET/PUT)**
→ These endpoints require authentication. Use Service Role Key or authenticated user token.

**No data returned from GET**
→ Check RLS policies. Ensure user is authenticated or using Service Role.

---

## 📞 Support

For detailed information, see: `/ONETIME_FORMS_GUIDE.md`

For server code, see: `/supabase/functions/server/index.tsx` (lines 1905+)

For SQL schema, see: `/sql_migrations/create_onetime_forms_tables.sql`
