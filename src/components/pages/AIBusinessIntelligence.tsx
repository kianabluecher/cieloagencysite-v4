import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import heroImage from 'figma:asset/cfa5608c81c67538c294839057cc09543749c6f7.png';

interface AIBusinessIntelligenceProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function AIBusinessIntelligence({ onNavigate }: AIBusinessIntelligenceProps) {
  return (
    <IndustrySubpageTemplate
      category="AI Operations & Analytics"
      headline="Business Intelligence That Actually Drives Decisions"
      subheadline="Turn data chaos into competitive advantage with AI-powered analytics, automated reporting, and real-time dashboards that your team will actually use."
      heroImage={heroImage}
      description="Your company generates mountains of data—sales metrics, customer behavior, operational KPIs, market trends—but it's scattered across 15 different platforms. Analysts spend 80% of their time pulling reports instead of finding insights. By the time dashboards are updated, the data is already outdated. Executives make decisions based on gut feeling because the numbers are too slow. CIELO builds AI-powered business intelligence systems that unify your data, automate analysis, and surface actionable insights in real-time—so you can move faster than competitors still stuck in spreadsheets."
      realityText="Your team wastes 20 hours/week pulling data from Salesforce, Google Analytics, Stripe, HubSpot, and custom databases into Excel. Reports are always outdated because updating dashboards is manual labor. Executives ask 'What's our CAC this month?' and it takes 3 days to answer. You've tried BI tools like Tableau or Looker, but they require SQL skills nobody has. Data sits in silos—marketing doesn't know what sales knows, finance doesn't know what ops knows. You're flying blind because insights arrive too late to matter. Competitors with real-time BI are outmaneuvering you while you're still formatting pivot tables."
      deliverables={[
        { title: "Data Integration & Unification", description: "Connect all your data sources into a single source of truth with automated pipelines that sync in real-time." },
        { title: "AI-Powered Analytics Engine", description: "Machine learning models that detect patterns, predict trends, and answer questions in plain English—no PhD required." },
        { title: "Real-Time Executive Dashboards", description: "Custom live dashboards showing your key metrics—revenue, CAC, churn, pipeline—optimized for any device." },
        { title: "Automated Reporting & Alerts", description: "Scheduled reports to Slack/email and smart alerts when metrics hit thresholds so you catch problems early." },
        { title: "Predictive Forecasting Models", description: "AI models that forecast revenue, churn risk, and demand based on historical patterns for better planning." },
        { title: "Custom BI Infrastructure", description: "Scalable modern data stack that handles millions of rows and grows with your business needs." }
      ]}
      whoThisIsFor="B2B SaaS companies tracking complex metrics across multiple tools, eCommerce brands drowning in Google Analytics data, enterprise teams spending too much time on manual reporting, executives who need real-time visibility into business performance, operations leaders tired of asking 'Why don't we have a dashboard for this?'"
      timeline="3–8 weeks for core BI infrastructure + dashboards"
      investment="$12K–$40K for initial build + data maintenance retainer"
      ctaHeadline="Ready to turn your data into your competitive advantage?"
      ctaButtonText="Let's Build Your BI System"
      faqs={[
        { question: "What data sources can you integrate into our BI system?", answer: "Reddit data engineering communities confirm: modern BI systems integrate virtually any data source via APIs, databases, or file exports. Common integrations we build: CRMs (Salesforce, HubSpot, Pipedrive), analytics (Google Analytics, Mixpanel, Amplitude), ad platforms (Google Ads, Meta, LinkedIn), payment processors (Stripe, PayPal), support tools (Zendesk, Intercom), databases (PostgreSQL, MySQL, MongoDB), spreadsheets (Google Sheets, Airtable). If it has an API or export function, we can connect it. The goal: one unified data warehouse where all your metrics live together." },
        { question: "How is AI-powered BI different from traditional BI tools like Tableau or Power BI?", answer: "Reddit BI practitioners emphasize: traditional tools require technical skills (SQL, data modeling) and manual dashboard building. AI-powered BI adds automation and intelligence: natural language queries ('What's our top-performing ad campaign this month?'), automated anomaly detection (alerts when metrics behave unusually), predictive analytics (forecasting future trends), and self-service insights (non-technical users can explore data without SQL). Traditional BI shows you what happened. AI BI tells you what's happening, why it matters, and what's likely to happen next." },
        { question: "How long does it take to see ROI from a BI system?", answer: "Reddit startup and operations threads suggest calculating: (analyst hours saved per week) × (hourly cost) × (52 weeks) + (revenue impact from faster decisions). Real examples: companies save 15–30 hours/week on manual reporting ($40K–$80K/year), increase revenue 10–20% by acting on insights faster (vs. competitors waiting weeks for data), reduce churn 15–25% by identifying at-risk customers early. Typical ROI timeline: 2–4 months for time savings, 6–12 months for revenue impact. The compounding effect: better data → better decisions → compounding advantage over time." },
        { question: "What if our data is messy or inconsistent?", answer: "Reddit data communities are clear: no company has perfect data—data cleaning is part of the process. Our approach: assess data quality upfront (identify duplicates, missing values, inconsistencies), implement data transformation pipelines (clean, normalize, enrich data automatically), establish data governance rules (prevent future mess), and build with tolerance for imperfection (systems that work with 80% clean data, not 100%). The mistake: waiting for 'perfect data' before building BI. Reality: you improve data quality by using it, not by procrastinating on infrastructure." },
        { question: "Can non-technical team members use the BI system?", answer: "Reddit BI discussions emphasize: the best BI systems are self-service for non-technical users. We design dashboards with intuitive interfaces (no SQL required), natural language query tools (ask questions in plain English), pre-built reports for common questions (CAC, MRR, churn), and role-based access (sales sees sales metrics, marketing sees marketing metrics). Technical users can still build custom queries, but the majority of daily usage should require zero coding. If your team avoids the dashboard because it's too complex, the BI system failed—we prioritize usability over feature bloat." }
      ]}
      strategist={{
        name: "Alex Rodriguez",
        title: "BI & Analytics Lead",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
        calloutText: "Let's build analytics infrastructure that actually gets used.",
        calloutDescription: "We'll audit your data sources, identify the metrics that matter most to your business, and build dashboards and automated reporting that save your team hours every week—while giving you real-time visibility into what's working and what's not."
      }}
      seoTitle="AI Business Intelligence & Analytics Systems | CIELO Agency"
      seoDescription="Build AI-powered business intelligence and analytics infrastructure. Real-time dashboards, automated reporting, and predictive analytics that turn data into competitive advantage."
      seoKeywords="business intelligence, AI analytics, BI dashboards, data analytics, automated reporting, predictive analytics, real-time dashboards, data integration"
      onNavigate={onNavigate}
    />
  );
}