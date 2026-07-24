export type ChatIntent =
  | "erp"
  | "website"
  | "mobile"
  | "ai_automation"
  | "it_infrastructure"
  | "pricing"
  | "technical_question"
  | "company_information"
  | "security_privacy"
  | "objection"
  | "impossible_guarantee"
  | "general_consultation"
  | "unclear";

export type MessageAnalysis = {
  intent: ChatIntent;
  intents: ChatIntent[];
  service: string;
  excludedServices: string[];
  excludedAreas: string[];
  positiveAreas: string[];
  employeeCount: string;
  activeUserCount: string;
  topicChanged: boolean;
  isCorrection: boolean;
  directQuestion: boolean;
  questions: string[];
  painPoints: string[];
  requirements: string[];
  integrations: string[];
  requestedActions: string[];
  buyingIntent: "low" | "medium" | "high";
  noMoreQuestions: boolean;
  recommendationConfidence: number;
  reasoningFactors: string[];
};

export type EnterpriseConversationState = {
  employeeCount: string;
  activeUserCount: string;
  selectedService: string;
  excludedSolutions: string[];
  excludedRequirements: string[];
  painPoints: string[];
  requirements: string[];
  integrations: string[];
  buyingIntent: "low" | "medium" | "high";
};

export function createEnterpriseConversationState(): EnterpriseConversationState {
  return {
    employeeCount: "",
    activeUserCount: "",
    selectedService: "",
    excludedSolutions: [],
    excludedRequirements: [],
    painPoints: [],
    requirements: [],
    integrations: [],
    buyingIntent: "low",
  };
}

export function applyMessageAnalysis(
  previous: EnterpriseConversationState,
  analysis: MessageAnalysis,
): EnterpriseConversationState {
  const excludedSolutions = unique([...previous.excludedSolutions, ...analysis.excludedServices]);
  const excludedRequirements = unique([...previous.excludedRequirements, ...analysis.excludedAreas]);
  const selectedService =
    analysis.service && !excludedSolutions.includes(analysis.service)
      ? analysis.service
      : analysis.topicChanged || excludedSolutions.includes(previous.selectedService)
        ? ""
        : previous.selectedService;
  const rank = { low: 0, medium: 1, high: 2 } as const;
  return {
    employeeCount: analysis.employeeCount || previous.employeeCount,
    activeUserCount: analysis.activeUserCount || previous.activeUserCount,
    selectedService,
    excludedSolutions,
    excludedRequirements,
    painPoints: unique([...(analysis.topicChanged ? [] : previous.painPoints), ...analysis.painPoints]),
    requirements: unique([
      ...(analysis.topicChanged ? [] : previous.requirements).filter((item) => !excludedRequirements.includes(item)),
      ...analysis.requirements,
    ]),
    integrations: unique([...(analysis.topicChanged ? [] : previous.integrations), ...analysis.integrations]),
    buyingIntent: rank[analysis.buyingIntent] > rank[previous.buyingIntent]
      ? analysis.buyingIntent
      : previous.buyingIntent,
  };
}

const SERVICE_PATTERNS: Array<[string, RegExp]> = [
  ["Odoo ERP", /\b(?:odoo|erp|enterprise resource planning)\b/i],
  ["Web development", /\b(?:website|web app|web application|laravel|next\.?js|react|e-?commerce|marketplace|customer portal|booking platform)\b/i],
  ["Mobile app development", /\b(?:mobile app(?:lication)?|android|ios|field staff app|delivery app|provider app)\b/i],
  ["AI automation", /\b(?:ai|artificial intelligence|automation|ai agent|voice agent|document processing|email automation|lead automation)\b/i],
  ["IT solutions", /\b(?:it infrastructure|hosting|cloud|server|network|cybersecurity|cctv|structured cabling|technical support)\b/i],
];

const AREA_PATTERNS: Array<[string, RegExp]> = [
  ["CRM", /\b(?:crm|customer information|customer records|lead tracking)\b/i],
  ["Sales", /\b(?:sales|quotation|quotations|orders?)\b/i],
  ["Inventory", /\b(?:inventory|stock)\b/i],
  ["Accounting", /\b(?:accounting|finance|expenses?|invoices?|quickbooks)\b/i],
  ["Purchase", /\b(?:purchase|purchasing|procurement)\b/i],
  ["Projects", /\b(?:projects?|project management)\b/i],
  ["HR", /\b(?:hr|payroll|attendance)\b/i],
  ["POS", /\b(?:pos|point of sale)\b/i],
  ["Warehouses", /\b(?:warehouse|warehouses)\b/i],
  ["E-commerce", /\b(?:e-?commerce|shopify|online store)\b/i],
];

function labelsIn(text: string, patterns: Array<[string, RegExp]>) {
  return patterns.filter(([, pattern]) => pattern.test(text)).map(([label]) => label);
}

function unique(values: string[]) {
  return [...new Set(values)];
}

const PAIN_POINT_PATTERNS: Array<[string, RegExp]> = [
  ["enquiries fragmented across WhatsApp", /\bwhatsapp (?:enquir|lead|message)/i],
  ["quotations managed in Excel", /\b(?:(?:excel|spreadsheet).{0,30}quot|quotations?.{0,30}(?:excel|spreadsheet))\b/i],
  ["jobs tracked in spreadsheets", /\b(?:job|work order).{0,25}(?:spreadsheet|excel)|(?:spreadsheet|excel).{0,25}(?:job|work order)/i],
  ["expense receipts shared manually", /\bexpense receipts?.{0,30}whatsapp|receipts?.{0,30}whatsapp/i],
  ["invoices prepared manually", /\bmanual(?:ly)? (?:invoice|invoicing)|invoices?.{0,20}manual/i],
  ["reports prepared manually", /\bmanual(?:ly)? (?:report|reporting)|reports?.{0,20}manual/i],
  ["sales follow-ups are missed", /\bmissed? follow(?:-| )?ups?|follow(?:-| )?ups?.{0,20}miss/i],
  ["repetitive manual work", /\b(?:manual work|repetitive|hours manually)\b/i],
  ["disconnected systems", /\b(?:disconnected|separate systems?|duplicate data|duplication)\b/i],
  ["limited operational control", /\b(?:difficult to control|lack of visibility|no visibility)\b/i],
];

const REQUIREMENT_PATTERNS: Array<[string, RegExp]> = [
  ["customer portal", /\bcustomer portal\b/i],
  ["admin portal", /\badmin (?:portal|dashboard)\b/i],
  ["iOS application", /\bios\b/i],
  ["Android application", /\bandroid\b/i],
  ["technician mobile application", /\btechnician.{0,20}(?:mobile|app)|(?:mobile|app).{0,20}technician\b/i],
  ["WhatsApp notifications", /\bwhatsapp (?:notification|message|integration)/i],
  ["online payments", /\b(?:online )?payments?|payment gateway\b/i],
  ["job tracking", /\b(?:job|work order) tracking\b/i],
  ["GPS tracking", /\bgps|geolocation|location tracking\b/i],
  ["digital signatures", /\b(?:digital |customer )?signatures?\b/i],
  ["before-and-after photos", /\bbefore.{0,10}after (?:images?|photos?)|photos?|images?\b/i],
  ["invoicing", /\binvoic(?:e|es|ing)\b/i],
  ["reporting", /\breports?|reporting|dashboard\b/i],
  ["appointment requests", /\bappointment (?:request|enquir|form)/i],
  ["CRM lead creation", /\bcreate.{0,20}crm leads?|crm lead creation\b/i],
  ["email processing", /\b(?:read|process|monitor).{0,20}(?:incoming )?emails?\b/i],
  ["data migration", /\bdata migration|migrate.{0,20}data\b/i],
];

function extractQuestions(message: string) {
  const questions = message
    .split(/(?<=[?])\s+|\b(?:also|and also)\b(?=\s+(?:tell|give|can|are|is|what|why|how|confirm))/i)
    .map((part) => part.trim())
    .filter((part) => part.includes("?") || /^(?:tell|give|confirm|list|show|explain)\b/i.test(part));
  return unique(questions);
}

function splitConstraints(message: string) {
  const negativeSegments: string[] = [];
  const pattern =
    /\b(?:(?:do not|don't|doesn't)\s+(?:need|want|use|recommend|require|have)|not interested in|never mentioned|never said|no longer|forget)\b[\s\S]*?(?=(?:\b(?:but|however|instead|only want|want to|need a|need an|let's|now I)\b|[.!?]|$))/gi;
  const positiveText = message.replace(pattern, (segment) => {
    negativeSegments.push(segment);
    return " ";
  });
  return { negativeText: negativeSegments.join(" "), positiveText };
}

function serviceScores(text: string) {
  const scores: Record<string, number> = {
    "Odoo ERP": 0,
    "Web development": 0,
    "Mobile app development": 0,
    "AI automation": 0,
    "IT solutions": 0,
  };
  const add = (service: keyof typeof scores, pattern: RegExp, points: number) => {
    if (pattern.test(text)) scores[service] += points;
  };
  add("Odoo ERP", /\b(?:odoo|erp)\b/i, 12);
  add("Odoo ERP", /\b(?:excel|spreadsheet|manual inventory|accounting|invoicing|purchasing|disconnected)\b/i, 3);
  add("Web development", /\b(?:website|web app|web application|laravel|next\.?js|react|marketplace|portal)\b/i, 12);
  add("Web development", /\b(?:treatments?|appointment request|service pages?|local seo)\b/i, 4);
  add("Mobile app development", /\b(?:mobile app(?:lication)?|android|ios)\b/i, 12);
  add("AI automation", /\b(?:ai|automation|ai agent|voice agent|document processing|incoming emails?)\b/i, 10);
  add("AI automation", /\b(?:create crm leads?|manual follow(?:ing)? up)\b/i, 5);
  add("IT solutions", /\b(?:it infrastructure|hosting|cloud|server|network|cybersecurity|cctv)\b/i, 10);
  return scores;
}

export function analyzeChatMessage(message: string): MessageAnalysis {
  const normalized = message.replace(/\s+/g, " ").trim();
  const { negativeText, positiveText } = splitConstraints(normalized);
  const explicitlyExcludedServices = labelsIn(negativeText, SERVICE_PATTERNS);
  if (
    /\b(?:hated?|dislike|reject).{0,20}\b(?:odoo|erp)\b/i.test(normalized) &&
    /\b(?:don't|do not|never)\s+recommend (?:it|that|odoo|erp)\b/i.test(normalized)
  ) {
    explicitlyExcludedServices.push("Odoo ERP");
  }
  const explicitlyExcludedAreas = labelsIn(negativeText, AREA_PATTERNS);
  const scores = serviceScores(positiveText);
  for (const service of explicitlyExcludedServices) scores[service] = 0;
  const uncertainSolution = /\b(?:not sure|don't know|do not know|unsure).{0,35}\b(?:erp|automation|software|solution)\b/i.test(normalized);
  const [scoredService, rawScore] = Object.entries(scores).sort((a, b) => b[1] - a[1])[0] || ["", 0];
  const service = uncertainSolution ? "" : scoredService;
  const score = uncertainSolution ? 0 : rawScore;

  const securityPrivacy = /\b(?:api keys?|database credentials?|system prompt|hidden instructions?|secrets?|private customer list|privacy|personal data)\b/i.test(normalized);
  const impossibleGuarantee = /\b(?:100%\s*uptime|zero downtime|guarantee(?:d)? forever|no possibility of data loss|all (?:our )?data in one night)\b/i.test(normalized);
  const pricing = /\b(?:price|pricing|cost|quote|quotation|budget|aed|usd|sar|pkr|eur|gbp)\b|[$€£]\s*\d/i.test(normalized);
  const companyInformation = /\b(?:official .*partner|gold partner|partner status|certifications?|awards?|how many implementations?|maintenance implementations?|developer count|how many developers?|largest|biggest|top (?:three|3) clients?|client names?|company information)\b/i.test(normalized);
  const objection = /\b(?:stop|wrong information|never said|never mentioned|why should I choose|instead of another|choose zavior|zoho|salesforce|dynamics|freelancer)\b/i.test(normalized);
  const technical = /\b(?:integrate|integration|migrate|migration|replace|api|laravel|shopify|quickbooks|uptime|data loss)\b/i.test(normalized);

  const serviceIntent: ChatIntent | null = score > 0
    ? (
      service === "Odoo ERP" ? "erp" :
      service === "Web development" ? "website" :
      service === "Mobile app development" ? "mobile" :
      service === "AI automation" ? "ai_automation" :
      "it_infrastructure"
    )
    : null;
  const intents = unique([
    securityPrivacy ? "security_privacy" : "",
    impossibleGuarantee ? "impossible_guarantee" : "",
    companyInformation ? "company_information" : "",
    pricing ? "pricing" : "",
    objection ? "objection" : "",
    serviceIntent || "",
    technical ? "technical_question" : "",
    (uncertainSolution || /\b(?:project|solution|consultation|recommend)\b/i.test(normalized)) ? "general_consultation" : "",
  ].filter(Boolean)) as ChatIntent[];
  const intent = intents[0] || "unclear";

  const employeeMatches = [...normalized.matchAll(/\b(\d{1,5})\s*(?:employees?|staff|people)\b/gi)];
  const userMatches = [...normalized.matchAll(/\b(\d{1,5})\s*(?:active\s+)?(?:software|odoo|system)?\s*users?\b/gi)];
  const correctedEmployeeCount = normalized.match(
    /\b(?:actually(?:\s+have)?|I\s+(?:actually\s+)?said|correction[:,]?\s*(?:we\s+(?:actually\s+)?have)?)\s+(\d{1,5})(?:\s+employees?)?\b/i,
  )?.[1];
  const buyingIntent: MessageAnalysis["buyingIntent"] =
    /\b(?:ready to proceed|let's proceed|send (?:me )?(?:a )?proposal|contact me|want to start|can we meet|where do I pay|let's sign|need (?:a )?quotation|book (?:a )?(?:meeting|consultation))\b/i.test(normalized)
      ? "high"
      : /\b(?:interested|considering|compare|evaluate|pricing|cost)\b/i.test(normalized)
        ? "medium"
        : "low";
  const requestedActions = unique([
    /\b(?:save|create|submit).{0,25}(?:lead|crm|enquiry)\b/i.test(normalized) ? "create_lead" : "",
    /\b(?:(?:assign|assigned).{0,20}(?:salesperson|sales rep|agent)|(?:salesperson|sales rep|agent).{0,20}assigned)\b/i.test(normalized) ? "assign_salesperson" : "",
    /\b(?:book|schedule).{0,20}(?:meeting|call|consultation)\b/i.test(normalized) ? "schedule_meeting" : "",
    /\b(?:contact me|reach out|call me)\b/i.test(normalized) ? "request_contact" : "",
    /\b(?:send|prepare).{0,20}(?:proposal|quotation|quote)\b/i.test(normalized) ? "request_proposal" : "",
  ].filter(Boolean));
  const painPoints = labelsIn(positiveText, PAIN_POINT_PATTERNS);
  const requirements = labelsIn(positiveText, REQUIREMENT_PATTERNS);
  const integrations = unique([
    /\bshopify\b/i.test(positiveText) ? "Shopify" : "",
    /\bquickbooks\b/i.test(positiveText) ? "QuickBooks" : "",
    /\bwhatsapp\b/i.test(positiveText) ? "WhatsApp" : "",
    /\b(?:crm|salesforce|zoho|dynamics)\b/i.test(positiveText) ? "CRM" : "",
    /\bpayment gateway|payments?\b/i.test(positiveText) ? "Payment gateway" : "",
  ].filter(Boolean));
  const reasoningFactors = unique([
    ...painPoints,
    ...requirements,
    ...explicitlyExcludedServices.map((item) => `${item} excluded`),
    service ? `${service} signals` : "",
  ].filter(Boolean));
  const recommendationConfidence = Math.min(
    0.95,
    score === 0 ? 0 : 0.35 + Math.min(0.35, score / 35) + Math.min(0.2, reasoningFactors.length * 0.04),
  );

  return {
    intent,
    intents,
    service: score > 0 ? service : "",
    excludedServices: unique(explicitlyExcludedServices),
    excludedAreas: unique(explicitlyExcludedAreas),
    positiveAreas: unique(labelsIn(positiveText, AREA_PATTERNS).filter((area) => !explicitlyExcludedAreas.includes(area))),
    employeeCount: correctedEmployeeCount || employeeMatches.at(-1)?.[1] || "",
    activeUserCount: userMatches.at(-1)?.[1] || "",
    topicChanged: /\b(?:forget|instead|for now|change (?:the )?topic|want to discuss)\b/i.test(normalized),
    isCorrection: /\b(?:correction|actually|rather|I said|never said|wrong information|never mentioned)\b/i.test(normalized),
    directQuestion: /\?|^(?:can|could|will|would|are|is|do|does|why|what|how)\b/i.test(normalized),
    questions: extractQuestions(normalized),
    painPoints,
    requirements,
    integrations,
    requestedActions,
    buyingIntent,
    noMoreQuestions: /\b(?:no more questions|don't ask (?:me )?(?:any )?more|do not ask (?:me )?(?:any )?more|stop asking|don't want more (?:technical )?questions|do not want more (?:technical )?questions)\b/i.test(normalized),
    recommendationConfidence,
    reasoningFactors,
  };
}
