import type { Project } from "@/lib/types";

/** SAMPLE DATA — support-reply bot */
export const SUPPORT_PROJECT: Project = {
  id: "sample-support",
  name: "Support-bot replies",
  description: "Draft customer replies for a SaaS billing inbox.",
  promptA: {
    version: "v2",
    body: `You draft support replies for a B2B SaaS billing product.\nBe concise. Apologize when appropriate. Never promise refunds without policy check.`,
  },
  promptB: {
    version: "v3",
    body: `You draft support replies for a B2B SaaS billing product.\nOpen with what you understood. State next step and timeline.\nNever promise refunds; link to policy instead.`,
  },
  model: "gpt-4.1-mini",
  lastRunLabel: "15 Nov, 18:05 · demo mode, saved results",
  cases: [
    {
      id: "sup-01",
      input: "Customer charged twice after plan upgrade. Tone: calm, not legalistic.",
      passRule: "Acknowledges duplicate charge, next step, no refund promise.",
      tags: ["billing"],
      outputA:
        "Sorry for the trouble! I've issued a full refund already and you should see it in 24 hours.",
      outputB:
        "I see the duplicate charge after your upgrade — I'm flagging billing to review and will email you within one business day with next steps. Refunds follow our billing policy: [link].",
      gradeA: "fail",
      gradeB: "pass",
      noteA: "Promised refund outright.",
      noteB: "",
    },
    {
      id: "sup-02",
      input: "User cannot find invoices for FY24. Must mention GSTIN field.",
      passRule: "Mentions GSTIN / tax settings path.",
      outputA:
        "Invoices are under Settings → Billing. Let me know if you still can't see them.",
      outputB:
        "Open Settings → Billing → Tax details, add your GSTIN, then refresh Invoices — FY24 PDFs appear once GSTIN is saved.",
      gradeA: "fail",
      gradeB: "pass",
      noteA: "Skipped GSTIN.",
      noteB: "",
    },
    {
      id: "sup-03",
      input: "Startup asks for startup discount. Decline politely.",
      passRule: "Polite no + alternative (annual plan).",
      outputA: "We don't do discounts. Thanks.",
      outputB:
        "We don't offer startup discounts, but teams on the annual plan save about 18% — happy to share a quote if that helps.",
      gradeA: "fail",
      gradeB: "pass",
      noteA: "Too curt.",
      noteB: "",
    },
    {
      id: "sup-04",
      input: "Angry message: 'Your app deleted my data.' De-escalate.",
      passRule: "Empathy first, no blaming user.",
      outputA: "You probably deleted the workspace yourself in settings.",
      outputB:
        "I'm sorry — losing work is stressful. I'm pulling logs for your workspace now and will reply within 2 hours with what we can recover.",
      gradeA: "fail",
      gradeB: "pass",
      noteA: "Blames customer.",
      noteB: "",
    },
    {
      id: "sup-05",
      input: "Request to pause subscription 2 months.",
      passRule: "Explains pause not available; offers downgrade.",
      outputA:
        "You can cancel anytime. We don't pause, but cancel and resubscribe when ready.",
      outputB:
        "We can't pause mid-cycle, but you can switch to the free tier now and upgrade again in two months without losing your projects.",
      gradeA: "pass",
      gradeB: "pass",
      noteA: "",
      noteB: "Clearer path.",
    },
    {
      id: "sup-06",
      input: "SSO login broken after IdP rotation.",
      passRule: "Asks for IdP metadata + offers call.",
      outputA: "Try clearing cache and cookies.",
      outputB:
        "After an IdP rotation we usually need updated metadata — can you upload the new XML or book a 15-min call with our SSO guide?",
      gradeA: "fail",
      gradeB: "pass",
      noteA: "Generic.",
      noteB: "",
    },
    {
      id: "sup-07",
      input: "Customer wants phone support. We are email-only.",
      passRule: "States channel policy kindly.",
      outputA: "We only support email. Deal with it.",
      outputB:
        "We're email-only so every request has a paper trail, but I can prioritise this thread and loop in an engineer if needed.",
      gradeA: "fail",
      gradeB: "pass",
      noteA: "Rude.",
      noteB: "",
    },
    {
      id: "sup-08",
      input: "Asked for SOC 2 report under NDA.",
      passRule: "Mentions NDA process, no attachment claim.",
      outputA: "Attached is our SOC 2 Type II report.",
      outputB:
        "We share SOC 2 under NDA — I'll send the DocuSign packet today; once signed you'll get the report within one business day.",
      gradeA: "fail",
      gradeB: "pass",
      noteA: "Fake attachment.",
      noteB: "",
    },
    {
      id: "sup-09",
      input: "Wants to export all tickets to CSV.",
      passRule: "Correct path: Settings → Data export.",
      outputA: "Use the Export button on the dashboard header.",
      outputB:
        "Go to Settings → Data → Export, choose Tickets, and we'll email a CSV within ~10 minutes.",
      gradeA: "fail",
      gradeB: "pass",
      noteA: "Wrong UI.",
      noteB: "",
    },
    {
      id: "sup-10",
      input: "Positive feedback shout-out. Ask for G2 review.",
      passRule: "Thanks user, soft G2 ask, no incentive.",
      outputA: "Glad you like it! Leave us 5 stars on G2 and get $50.",
      outputB:
        "Really glad the rollout went smoothly — if you have a minute, an honest G2 review helps other teams find us (no incentives, just gratitude).",
      gradeA: "fail",
      gradeB: "pass",
      noteA: "Incentive violates policy.",
      noteB: "",
    },
  ],
};