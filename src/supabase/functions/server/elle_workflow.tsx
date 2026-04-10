import OpenAI from "npm:openai";
import { Resend } from "npm:resend";
import { createClient } from "npm:@supabase/supabase-js@2";

// Initialize clients
const openai = new OpenAI({ apiKey: Deno.env.get("OPENAI_API_KEY") });
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

// Constants
const ADMIN_EMAIL = "admin@cielo.marketing";
const ANKIT_EMAIL = "ankit@cielo.marketing";
const KIM_EMAIL = "kim@cielo.marketing";

// Types
interface EmailPayload {
  id: string;
  from: string;
  to: string;
  cc?: string[] | null;
  subject: string;
  body_text: string;
  body_html?: string | null;
  received_at: string;
  headers?: Record<string, any>;
}

// Helper: Check Knowledge Base (Simulated)
async function checkKnowledgeBase(email: EmailPayload): Promise<string> {
  // In a real implementation, this would search vector DB or files.
  // For now, we return general context about CIELO.
  return `
    CIELO Agency Knowledge Context:
    - Creative agency focused on brand clarity, content velocity, and scaling systems.
    - Offers: Content Management ($1,800/mo), Social Growth ($2,500/mo), Brand & Market Growth ($5,000/mo).
    - Team: Kiana (Manager, ELLE persona), Kim (Scheduling), Ankit (Technical).
    - Style: "Onyx" aesthetic, sharp, square-cornered, dark backgrounds.
    - Values: Authenticity, speed, strategic execution.
  `;
}

// Helper: Primary Reply Agent (Kiana)
async function runPrimaryReplyAgent(email: EmailPayload, kbContext: string): Promise<string> {
  const systemPrompt = `
    Objective: Respond to inbound messages with warmth, clarity, and realness. You are Kiana, Manager at CIELO Agency.
    Format: Text — 1 to 3 short, casual sentences. Feel like you're texting a peer you respect.
    
    Voice Rules:
    - Brevity: 30 to 80 words max.
    - Structure: Front-load the ask, add context after. Use contractions.
    - Allowed: "Hope you're doing well", "Quick 15-minute call?", "Let's do that".
    - Blocked: "I trust this finds you well", "Per my previous", "Please advise".
    - Signoff: "Best,\nKiana"
    
    Constraints:
    - Tone: Warm, friendly, grounded. Real human energy.
    - No pitching unless asked.
    - If unclear, ask kindly for info.
    - Loop in Kim (kim@cielo.marketing) for scheduling if needed.
    
    Context:
    ${kbContext}
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `From: ${email.from}\nSubject: ${email.subject}\nBody: ${email.body_text}` }
    ],
    temperature: 0.7,
  });

  return response.choices[0].message.content || "";
}

// Helper: Proposal Generator Agent
async function runProposalGeneratorAgent(email: EmailPayload, kbContext: string): Promise<string> {
  const systemPrompt = `
    Role: Proposal Generator and Sales Strategist for CIELO Agency.
    Context: CIELO is a creative growth partner. Core offers: Content Management ($1,800), Social Growth ($2,500), Brand & Market Growth ($5,000).
    
    Goal: Generate a strategy-first proposal text based on the email request.
    
    Output Structure:
    1. Introduction: State key problem and urgency.
    2. Goals: 3 specific outcomes.
    3. Strategy: 3 bold moves.
    4. Execution Timeline: 5 steps (Moodboard -> Reporting).
    5. Content Pillars: 4 directions.
    6. Packages: Starter ($1,800), Growth ($2,500), Full Brand Engine ($5,000).
    7. Closing: Bold statement + Next step CTA.
    
    Rules:
    - Tone: Bold, clear, strategic, professional.
    - Tie strategy to pain points.
    - No generic agency language.
    
    Context:
    ${kbContext}
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `From: ${email.from}\nSubject: ${email.subject}\nBody: ${email.body_text}` }
    ],
    temperature: 0.7,
  });

  return response.choices[0].message.content || "";
}

// Helper: Ad Hoc Quote Agent
async function runAdHocQuoteAgent(email: EmailPayload, kbContext: string): Promise<string> {
  const systemPrompt = `
    Objective: Clarify ad hoc quote needs friendly, check calendar, provide ballpark if possible.
    Format: 1-3 short sentences. Conversational.
    Signoff: "Best,\nKiana"
    
    Context:
    ${kbContext}
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `From: ${email.from}\nSubject: ${email.subject}\nBody: ${email.body_text}` }
    ],
    temperature: 0.7,
  });

  return response.choices[0].message.content || "";
}

// Main Webhook Handler
export async function elleEmailWebhook(c: any) {
  try {
    const payload: EmailPayload = await c.req.json();
    
    // 1. Trigger Check: Verify recipient contains @cielo.marketing
    // (Assuming the upstream provider filters this, but good to check)
    if (!payload.to.includes("@cielo.marketing") && !JSON.stringify(payload).includes("@cielo.marketing")) {
        // Allow if it's in the payload somewhere, strict check might fail if 'to' is rewritten
        console.log("Email not addressed to cielo.marketing, proceeding anyway based on webhook config");
    }

    // 2. Check Knowledge Base
    const kbContext = await checkKnowledgeBase(payload);
    
    // 3. Router Node
    const subject = payload.subject.toLowerCase();
    const body = payload.body_text.toLowerCase();
    
    let route = "default_reply";
    
    if (body.includes("proposal") || body.includes("scope") || body.includes("packages") || body.includes("strategy")) {
      route = "needs_proposal";
    } else if (body.includes("quote") || body.includes("estimate") || body.includes("pricing for") || body.includes("how much")) {
      route = "needs_quote";
    } else if ((subject.includes("urgent") || body.includes("technical") || body.includes("implementation question"))) {
      // Assuming cannot_answer_from_kb is true for technical stuff for now
      route = "needs_forward_ankit";
    }
    
    console.log(`Routing email from ${payload.from} to: ${route}`);
    
    // 4. Execution Steps
    if (route === "needs_forward_ankit") {
      // ForwardToAnkitStep
      const forwardBody = `Forwarding this email for review.\n\n--- Original ---\nFrom: ${payload.from}\nTo: ${payload.to}\nSubject: ${payload.subject}\n\n${payload.body_text}`;
      
      await resend.emails.send({
        from: "ELLE System <system@cielo.marketing>", // Using a system alias if possible, or verify domain
        to: ANKIT_EMAIL,
        cc: [ADMIN_EMAIL],
        subject: `FWD: ${payload.subject}`,
        text: forwardBody,
      });
      
      return c.json({ status: "ok", action: "forwarded_to_ankit" });
      
    } else if (route === "needs_proposal") {
      // ProposalGeneratorStep
      const proposalText = await runProposalGeneratorAgent(payload, kbContext);
      
      // SendProposalEmail
      await resend.emails.send({
        from: "Kiana at CIELO <kiana@cielo.marketing>", // Verify this sender signature exists in Resend
        to: payload.from,
        cc: [ADMIN_EMAIL],
        subject: `Proposal: ${payload.subject}`,
        text: proposalText,
      });
      
      return c.json({ status: "ok", action: "proposal_sent" });
      
    } else if (route === "needs_quote") {
      // AdHocQuoteStep
      const quoteReply = await runAdHocQuoteAgent(payload, kbContext);
      
      // SendAdHocQuoteReply
      await resend.emails.send({
        from: "Kiana at CIELO <kiana@cielo.marketing>",
        to: payload.from,
        cc: [ADMIN_EMAIL],
        subject: `Re: ${payload.subject}`,
        text: quoteReply,
      });
      
      return c.json({ status: "ok", action: "quote_reply_sent" });
      
    } else {
      // Default: PrimaryReplyAgentStep
      const replyBody = await runPrimaryReplyAgent(payload, kbContext);
      
      // ApplyLabelRepliedByAgent (Send Reply)
      await resend.emails.send({
        from: "Kiana at CIELO <kiana@cielo.marketing>",
        to: payload.from,
        cc: [ADMIN_EMAIL],
        subject: `Re: ${payload.subject}`,
        text: replyBody,
      });
      
      return c.json({ status: "ok", action: "primary_reply_sent" });
    }
    
  } catch (error) {
    console.error("ELLE Workflow Error:", error);
    return c.json({ error: "ELLE workflow execution failed", details: error.message }, 500);
  }
}
