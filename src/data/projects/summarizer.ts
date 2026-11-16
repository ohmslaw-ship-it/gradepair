import type { Project } from "@/lib/types";

/** SAMPLE DATA — document summariser */
export const SUMMARIZER_PROJECT: Project = {
  id: "sample-summarizer",
  name: "Document summariser",
  description: "One-paragraph summaries for legal and policy PDFs.",
  promptA: {
    version: "v1",
    body: `Summarise the document in one paragraph for a busy PM.\nInclude parties, dates, and obligations.`,
  },
  promptB: {
    version: "v2",
    body: `Summarise in one paragraph (≤120 words) for a PM.\nLead with decision or risk. Include dates and obligations.\nNo legal advice disclaimer needed.`,
  },
  model: "gpt-4.1-mini",
  lastRunLabel: "14 Nov, 09:12 · demo mode, saved results",
  cases: [
    {
      id: "sum-01",
      input: "MSA excerpt: 12-month term, auto-renew, 30-day termination notice.",
      passRule: "Mentions term, auto-renew, notice period.",
      outputA:
        "This is a standard contract between the parties covering software services.",
      outputB:
        "12-month MSA auto-renews unless either party gives 30 days' notice before term end; obligations continue through notice period.",
      gradeA: "fail",
      gradeB: "pass",
      noteA: "Too vague.",
      noteB: "",
    },
    {
      id: "sum-02",
      input: "DPA: data stored in EU only, subprocessors listed in Annex B.",
      passRule: "EU storage + subprocessors.",
      outputA:
        "Customer data may be processed globally for performance. Subprocessors apply.",
      outputB:
        "Personal data stays in the EU; Annex B lists approved subprocessors and change-notification rules.",
      gradeA: "fail",
      gradeB: "pass",
      noteA: "Wrong on EU-only.",
      noteB: "",
    },
    {
      id: "sum-03",
      input: "Security addendum: SOC 2 Type II, annual pen test.",
      passRule: "Names both controls.",
      outputA: "Vendor maintains reasonable security measures.",
      outputB:
        "Vendor holds SOC 2 Type II and runs annual third-party penetration tests with summary available under NDA.",
      gradeA: "fail",
      gradeB: "pass",
      noteA: "",
      noteB: "",
    },
    {
      id: "sum-04",
      input: "Pilot agreement: 90-day pilot, convert to annual at list price.",
      passRule: "90 days + conversion terms.",
      outputA: "Pilot lasts three months then becomes paid.",
      outputB:
        "90-day pilot converts to a 12-month subscription at then-current list price unless cancelled 5 days before pilot end.",
      gradeA: "pass",
      gradeB: "pass",
      noteA: "Missing list-price detail.",
      noteB: "",
    },
    {
      id: "sum-05",
      input: "SOW: deliverables due 15 Dec, acceptance within 10 business days.",
      passRule: "Dates + acceptance window.",
      outputA: "Deliverables are due mid-December with a short review window.",
      outputB:
        "All SOW deliverables due 15 Dec; customer has 10 business days to accept or send a written rejection list.",
      gradeA: "pass",
      gradeB: "pass",
      noteA: "",
      noteB: "Precise dates.",
    },
    {
      id: "sum-06",
      input: "Privacy policy update: new analytics cookie, opt-out in footer.",
      passRule: "Cookie change + opt-out.",
      outputA: "We updated cookies for a better experience.",
      outputB:
        "Adds an analytics cookie (Nov 2026); users can opt out via the footer 'Cookie preferences' link—no change to core product data use.",
      gradeA: "fail",
      gradeB: "pass",
      noteA: "No opt-out.",
      noteB: "",
    },
    {
      id: "sum-07",
      input: "Intern NDA: 2-year confidentiality post-internship.",
      passRule: "2-year survival called out.",
      outputA: "Intern must keep secrets confidential.",
      outputB:
        "Intern NDA survives 2 years after the internship ends for all non-public company information.",
      gradeA: "fail",
      gradeB: "pass",
      noteA: "No duration.",
      noteB: "",
    },
    {
      id: "sum-08",
      input: "Vendor SLA: 99.5% uptime, credits cap at 10% MRR.",
      passRule: "Uptime % and credit cap.",
      outputA: "SLA promises high availability with service credits.",
      outputB:
        "99.5% monthly uptime target; service credits capped at 10% of that month's fees if SLA is missed.",
      gradeA: "fail",
      gradeB: "pass",
      noteA: "",
      noteB: "",
    },
    {
      id: "sum-09",
      input: "Board memo: approve ₹2Cr marketing spend for Q4 festive.",
      passRule: "Amount + quarter + decision ask.",
      outputA: "Marketing wants more budget for the holidays.",
      outputB:
        "Board asked to approve ₹2Cr incremental Q4 festive marketing (Oct–Dec), primarily digital and influencer, with weekly burn reporting.",
      gradeA: "fail",
      gradeB: "pass",
      noteA: "Missing amount.",
      noteB: "",
    },
    {
      id: "sum-10",
      input: "RFP response deadline: 28 Nov 5pm IST, questions due 20 Nov.",
      passRule: "Both deadlines with timezone.",
      outputA: "Submit proposals by end of November.",
      outputB:
        "Clarification questions due 20 Nov; final proposals due 28 Nov, 5:00pm IST via the procurement portal.",
      gradeA: "fail",
      gradeB: "pass",
      noteA: "Vague.",
      noteB: "",
    },
  ],
};