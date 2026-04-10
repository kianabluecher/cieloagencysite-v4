# Brand Audit - Quick Start Guide

## 🚀 Setup (5 Minutes)

### Step 1: Add OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Create new API key
3. Copy the key
4. Upload to `OPENAI_API_KEY` environment variable in Supabase

**✅ That's it! The system is ready.**

---

## 🎯 How to Use

### **For Testing:**

1. Navigate to Footer → "5 Min Audit"
2. Choose a focus area (e.g., Brand & Positioning)
3. Fill in test data:
   - Company: "Test Company"
   - Industry: "SaaS"
   - Answer remaining questions
4. Enter your email
5. Click "Generate My Audit"
6. Wait 10-15 seconds
7. View results + check email

### **For Real Users:**

Share link: `/brand-audit` or Footer link

---

## 📧 What Happens

1. **User completes form** → 9 questions
2. **AI generates audit** → GPT-4o processes
3. **Results displayed** → On screen
4. **Email sent** → To user's inbox
5. **Admin notified** → New lead email
6. **Data stored** → In Supabase

---

## 💰 Cost

- **Per Audit:** ~$0.01 - $0.015
- **Model:** GPT-4o
- **Tokens:** ~2000 per audit

**Example:**
- 100 audits/month = ~$1.50
- 1000 audits/month = ~$15

**Extremely affordable for lead gen value.**

---

## 📊 Focus Areas

### 1. Brand & Positioning 🎯
**For:** Companies needing brand clarity  
**Output:** Brand strategy, positioning, content pillars

### 2. GTM Strategy & Funnel 🚀
**For:** Companies launching or scaling  
**Output:** Go-to-market plan, funnel optimization

### 3. Social Media Copy & Calendar 📱
**For:** Companies wanting social presence  
**Output:** Content strategy, posting schedule

### 4. Lead Generation 🎣
**For:** Companies needing more leads  
**Output:** Lead gen tactics, conversion optimization

---

## 🔍 Viewing Submissions

### In Code:
```typescript
import { getAllAuditSubmissions } from './utils/brand-audit-api';

const submissions = await getAllAuditSubmissions();
console.log(submissions);
```

### In Supabase:
1. Go to Supabase Dashboard
2. Table Editor → `kv_store_27c238f7`
3. Filter keys starting with `brand-audit:`
4. View submission data

---

## ✏️ Customization

### **Change Questions:**
Edit `/components/pages/BrandAudit.tsx` → Steps 2-9

### **Modify AI Prompts:**
Edit `/supabase/functions/server/index.tsx` → `systemPrompt` for each focus area

### **Update Emails:**
Edit `/supabase/functions/server/index.tsx` → `emailHtml` template

### **Add Focus Area:**
1. Add to step 1 selection cards
2. Add system prompt in server
3. Add user prompt template

---

## 🐛 Troubleshooting

**Issue:** "OpenAI API key not configured"  
**Fix:** Upload API key to environment variable

**Issue:** No email received  
**Fix:** Check spam folder, verify Resend is configured

**Issue:** Audit generation failed  
**Fix:** Check OpenAI API quota and billing

**Issue:** Results not showing  
**Fix:** Check browser console for errors

---

## 📈 Success Metrics

Track:
- ✅ Completion rate
- ✅ Most popular focus areas
- ✅ Email deliverability
- ✅ Follow-up response rate
- ✅ Conversion to discovery calls

---

## 💡 Tips

### **For Best Results:**

1. **Promote the audit** - Add to homepage, emails, social
2. **Follow up fast** - Contact within 24 hours
3. **Reference audit** - Mention their specific challenges
4. **A/B test prompts** - Improve AI output over time
5. **Monitor costs** - Track OpenAI usage

### **Marketing Copy:**

**Subject Lines:**
- "Get Your Free Brand Audit (5 Min)"
- "AI-Powered Strategy Analysis - Free"
- "Find Out What's Holding Your Brand Back"

**CTA Text:**
- "Get My Free Audit"
- "Analyze My Brand"
- "5 Min Audit →"

**Social Posts:**
- "Just launched: Free AI-powered brand audit. Takes 5 min, gives you a full strategy. Try it 👉 [link]"

---

## 🎁 Value Proposition

**For Users:**
- ✅ Free ($0 cost)
- ✅ Fast (5 minutes)
- ✅ Personalized (AI-generated)
- ✅ Actionable (specific recommendations)
- ✅ Professional (CIELO expertise)

**For You:**
- ✅ Qualified leads
- ✅ Detailed context
- ✅ Automated process
- ✅ Demonstrates value
- ✅ Scales infinitely

---

## 📞 Next Steps

After user completes audit:

1. **Immediate:** They receive email with full audit
2. **24 hours:** You send personalized follow-up
3. **3 days:** Share relevant case study
4. **7 days:** Invite to discovery call
5. **14 days:** Share additional resources

**Goal:** Convert audit → call → client

---

## ✅ Launch Checklist

- [ ] OpenAI API key uploaded
- [ ] Test all 4 focus areas
- [ ] Verify emails sending
- [ ] Check mobile responsiveness
- [ ] Review AI output quality
- [ ] Set up analytics tracking
- [ ] Create follow-up sequence
- [ ] Add to marketing materials
- [ ] Train team on follow-up
- [ ] Monitor first 10 submissions

---

**You're ready to launch! 🎉**

Start generating qualified leads with AI-powered brand audits.
