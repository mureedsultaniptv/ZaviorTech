export type ConsultationQuestion = {
  id: string;
  label: string;
  type: "text" | "textarea" | "url" | "select" | "radio";
  required?: boolean;
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
  showWhen?: { questionId: string; equals: string };
};

export type ConsultationService = {
  value: string;
  label: string;
  questions: ConsultationQuestion[];
};

const yesNoOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

export const consultationServices: ConsultationService[] = [
  {
    value: "erp_odoo",
    label: "ERP / Odoo Solutions",
    questions: [
      { id: "business_type", label: "What type of business do you run?", type: "text", required: true, placeholder: "Retail, trading, manufacturing…" },
      { id: "modules", label: "Which areas should the ERP cover?", type: "textarea", required: true, placeholder: "Sales, inventory, accounting, CRM…" },
      { id: "users", label: "How many people will use the system?", type: "select", required: true, options: [{ value: "1-10", label: "1–10" }, { value: "11-50", label: "11–50" }, { value: "51-200", label: "51–200" }, { value: "200+", label: "200+" }] },
    ],
  },
  {
    value: "zoho",
    label: "Zoho Solutions",
    questions: [
      { id: "zoho_products", label: "Which Zoho products are you considering?", type: "text", required: true, placeholder: "CRM, Books, Zoho One…" },
      { id: "current_process", label: "How do you manage this process today?", type: "textarea", required: true, placeholder: "Tell us about your current tools or workflow" },
      { id: "users", label: "How many users do you expect?", type: "select", required: true, options: [{ value: "1-10", label: "1–10" }, { value: "11-50", label: "11–50" }, { value: "51+", label: "51+" }] },
    ],
  },
  {
    value: "ai_automation",
    label: "AI Automation",
    questions: [
      { id: "process", label: "Which process would you like to automate?", type: "text", required: true, placeholder: "Lead follow-up, support, reporting…" },
      { id: "tools", label: "Which tools need to connect?", type: "textarea", required: true, placeholder: "CRM, WhatsApp, email, spreadsheets…" },
      { id: "automation_goal", label: "What outcome would make this project successful?", type: "textarea", required: true, placeholder: "For example, reduce manual work or response times" },
    ],
  },
  {
    value: "web_development",
    label: "Website Development",
    questions: [
      { id: "has_website", label: "Do you already have a website?", type: "radio", required: true, options: yesNoOptions },
      { id: "current_website", label: "What is your current website URL?", type: "url", required: true, placeholder: "https://example.com", showWhen: { questionId: "has_website", equals: "yes" } },
      { id: "inspiration", label: "Are there websites you like for inspiration?", type: "text", placeholder: "Share a URL or describe what you like" },
      { id: "features", label: "What improvements or features do you need?", type: "textarea", required: true, placeholder: "Pages, integrations, booking, e-commerce…" },
    ],
  },
  {
    value: "mobile_apps",
    label: "Mobile Applications",
    questions: [
      { id: "app_type", label: "What should the app help users do?", type: "textarea", required: true, placeholder: "Describe the main use case" },
      { id: "platform", label: "Which platforms do you need?", type: "select", required: true, options: [{ value: "ios_android", label: "iOS and Android" }, { value: "ios", label: "iOS" }, { value: "android", label: "Android" }, { value: "not_sure", label: "Not sure yet" }] },
      { id: "existing_system", label: "Does it need to connect to an existing system?", type: "text", placeholder: "Website, ERP, CRM, payment gateway…" },
    ],
  },
  {
    value: "it_solutions",
    label: "IT Solutions",
    questions: [
      { id: "it_need", label: "What IT support or solution do you need?", type: "textarea", required: true, placeholder: "Infrastructure, security, support, cloud…" },
      { id: "location", label: "Where will the solution be delivered?", type: "text", required: true, placeholder: "City or office location" },
      { id: "team_size", label: "How many people or devices are involved?", type: "text", placeholder: "For example, 30 staff and 45 devices" },
    ],
  },
  {
    value: "core_it_infrastructure",
    label: "Core IT Infrastructure",
    questions: [
      { id: "infrastructure_scope", label: "What infrastructure needs attention?", type: "textarea", required: true, placeholder: "Network, servers, Wi-Fi, security, hardware…" },
      { id: "site_count", label: "How many locations need to be supported?", type: "text", required: true, placeholder: "For example, one office and two warehouses" },
      { id: "existing_setup", label: "What is your current setup or main challenge?", type: "textarea", placeholder: "Share any known issues or constraints" },
    ],
  },
];

export const otherServiceValue = "other";

export function getConsultationService(value: string) {
  return consultationServices.find((service) => service.value === value);
}
