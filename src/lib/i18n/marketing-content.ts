import type { Language } from "./translations";

type LabelValue = {
  value: string;
  label: string;
};

type MarketingService = {
  title: string;
  text: string;
};

type MarketingSolution = {
  label: string;
  eyebrow: string;
  title: string;
  copy: [string, string];
  items: string[];
  explore: string;
};

type MarketingFaq = {
  question: string;
  answer: string;
};

export type MarketingContent = {
  home: {
    hero: {
      eyebrow: string;
      heading: [string, string, string];
      description: string;
      primaryCta: string;
      secondaryCta: string;
      stats: LabelValue[];
      productGroupLabel: string;
      odooDashboardLabel: string;
      zohoPipelineLabel: string;
      productUiLabel: string;
    };
    partners: {
      eyebrow: string;
      statement: string;
      officialPartner: string;
    };
    services: {
      eyebrow: string;
      title: string;
      description: string;
      learnMore: string;
      showMore: string;
      showFewer: string;
      items: MarketingService[];
    };
    industries: {
      eyebrow: string;
      title: string;
      description: string;
      items: string[];
    };
    benefits: {
      eyebrow: string;
      title: string;
      description: string;
      items: MarketingService[];
    };
    platforms: {
      eyebrow: string;
      title: string;
      description: string;
      odoo: MarketingSolution;
      zoho: MarketingSolution;
    };
    process: {
      eyebrow: string;
      title: string;
      items: MarketingService[];
    };
    cases: {
      eyebrow: string;
      title: string;
      description: string;
      previous: string;
      next: string;
      items: Array<{
        category: string;
        title: string;
        description: string;
        results: [LabelValue, LabelValue];
      }>;
    };
    stats: Array<{
      value: number;
      suffix: string;
      label: string;
    }>;
    technologies: {
      eyebrow: string;
      title: string;
    };
    testimonials: {
      eyebrow: string;
      title: string;
      description: string;
      previous: string;
      next: string;
      items: Array<{
        quote: string;
        author: string;
        role: string;
        company: string;
      }>;
    };
    faq: {
      eyebrow: string;
      title: string;
      description: string;
      odooTitle: string;
      zohoTitle: string;
      odooItems: MarketingFaq[];
      zohoItems: MarketingFaq[];
    };
    cta: {
      eyebrow: string;
      title: string;
      description: string;
      primaryCta: string;
      whatsapp: string;
      call: string;
      promises: string[];
    };
  };
  footer: {
    description: string;
    officialPartner: string;
    quickLinksTitle: string;
    serviceLinksTitle: string;
    industryLinksTitle: string;
    contactTitle: string;
    contactDescription: string;
    quickLinks: string[];
    serviceLinks: string[];
    industryLinks: string[];
    proof: MarketingService[];
    privacy: string;
    terms: string;
    sitemap: string;
    madeIn: string;
  };
};

/**
 * Full copy for the active marketing surface. Keeping this separate from the
 * smaller UI dictionary makes page-level translation explicit and reviewable.
 */
export const marketingContent: Record<Language, MarketingContent> = {
  en: {
    home: {
      hero: {
        eyebrow: "Official Odoo & Zoho Partner · Dubai, UAE",
        heading: [
          "Odoo ERP, Zoho CRM &",
          "AI Automation Solutions",
          "for Growing Businesses",
        ],
        description:
          "Helping businesses across Dubai, UAE and the GCC streamline operations with Odoo ERP Implementation, Zoho CRM, Custom Software Development, AI Automation and Business Process Optimization.",
        primaryCta: "Book Free Consultation",
        secondaryCta: "View Case Studies",
        stats: [
          { value: "120+", label: "Successful Projects" },
          { value: "5+", label: "Years of Excellence" },
          { value: "50+", label: "Happy Clients" },
          { value: "UAE · GCC", label: "Regional Delivery" },
        ],
        productGroupLabel: "Authentic Odoo and Zoho CRM product screens",
        odooDashboardLabel: "ERP dashboard",
        zohoPipelineLabel: "Kanban pipeline",
        productUiLabel: "Official product UI",
      },
      partners: {
        eyebrow: "Official partnerships",
        statement: "Two leading platforms. One accountable implementation team.",
        officialPartner: "Official Partner",
      },
      services: {
        eyebrow: "Our services",
        title: "Comprehensive Solutions for Your Business Growth",
        description:
          "One experienced team for ERP, CRM, automation and custom product delivery.",
        learnMore: "Learn more",
        showMore: "Show 7 more services",
        showFewer: "Show fewer services",
        items: [
          { title: "Odoo ERP Implementation", text: "End-to-end Odoo ERP implementation tailored to your operations." },
          { title: "Odoo CRM", text: "Connect sales, marketing and customer follow-up in one system." },
          { title: "Custom Odoo Modules", text: "Purpose-built modules that match your workflows and controls." },
          { title: "Odoo Consultation & Discovery", text: "Clarify requirements, scope and the right Odoo rollout plan." },
          { title: "Odoo Integration Services", text: "Connect Odoo with commerce, payments and business systems." },
          { title: "Zoho CRM", text: "Build a clearer sales pipeline and more consistent customer engagement." },
          { title: "Zoho One Setup & Deployment", text: "Deploy the right Zoho applications through a phased plan." },
          { title: "Zoho Books Automation", text: "Streamline finance workflows, approvals and recurring processes." },
          { title: "Zoho Consultation & Optimization", text: "Improve adoption, reporting and performance across your Zoho setup." },
          { title: "Zoho Workflow Automation", text: "Create blueprints, custom functions and reliable API connections." },
          { title: "AI Automation", text: "Automate repetitive processes and accelerate decision-making." },
          { title: "Custom Software Development", text: "Secure software designed around your operating model." },
          { title: "Web Applications", text: "Modern, scalable web platforms built for real business use." },
          { title: "Mobile Apps", text: "Native and cross-platform experiences for teams and customers." },
          { title: "API Development", text: "Move data safely between ERP, CRM and third-party platforms." },
        ],
      },
      industries: {
        eyebrow: "Industries we serve",
        title: "Solutions for Every Industry",
        description: "Focused business systems for the operating realities of each sector.",
        items: ["Manufacturing", "Retail", "Healthcare", "Construction", "Education", "Hospitality", "Logistics", "Automotive", "Professional Services"],
      },
      benefits: {
        eyebrow: "Why choose Zavior",
        title: "Your Success is Our Mission",
        description: "Official partnerships, accountable delivery and support beyond go-live.",
        items: [
          { title: "Official Partnerships", text: "Official Odoo and Zoho partner delivery." },
          { title: "Business First", text: "We solve business problems—not just software." },
          { title: "Custom Development", text: "Business-specific modules and integrations." },
          { title: "Dedicated Support", text: "Implementation, training and maintenance." },
          { title: "Faster Delivery", text: "Agile implementation with measurable outcomes." },
          { title: "AI Automation", text: "Modern workflows powered by practical AI." },
        ],
      },
      platforms: {
        eyebrow: "Platform expertise",
        title: "Official Partner Delivery Across Odoo and Zoho",
        description: "Choose a platform to explore the implementation scope.",
        odoo: {
          label: "Odoo ERP",
          eyebrow: "Odoo ERP solutions",
          title: "Odoo ERP Implementation Services",
          copy: [
            "Zavior plans and delivers Odoo ERP Implementation around the way your teams actually work. We begin with Odoo Consultation & Discovery, map the processes that affect revenue, cost and service, then configure the right applications before introducing custom development.",
            "Our delivery covers Odoo CRM, finance, inventory, purchasing, manufacturing and reporting. Where standard workflows stop short, we build Custom Odoo Modules and Odoo Integration Services that connect commerce, payments, logistics and existing business systems. Migration, testing, user training and post-launch support are part of the same accountable rollout.",
          ],
          items: ["Odoo ERP Implementation", "Odoo CRM", "Custom Odoo Modules", "Odoo Consultation & Discovery", "Odoo Integration Services"],
          explore: "Explore Odoo ERP Services",
        },
        zoho: {
          label: "Zoho",
          eyebrow: "Zoho solutions",
          title: "Zoho CRM & Zoho One Experts",
          copy: [
            "As an official Zoho partner, Zavior helps businesses turn Zoho CRM into a dependable system for lead capture, qualification, pipeline management, forecasting and customer follow-up. We also plan Zoho One Setup & Deployment so each application supports a clear operating need.",
            "Our consultants configure Zoho Books & Financial Automation, blueprints, approval rules, dashboards and custom functions. Through Zoho Consultation & Optimization and Zoho Custom Workflows & API Integration, we connect Zoho with Odoo, websites, payment services and existing databases—then train users and improve the system after go-live.",
          ],
          items: ["Zoho CRM", "Zoho One Setup & Deployment", "Zoho Books & Financial Automation", "Zoho Consultation & Optimization", "Zoho Custom Workflows & API Integration"],
          explore: "Explore Zoho Services",
        },
      },
      process: {
        eyebrow: "Our process",
        title: "A Proven Implementation Process",
        items: [
          { title: "Discover", text: "Understand your goals" },
          { title: "Consult", text: "Define scope and priorities" },
          { title: "Design", text: "Map the right solution" },
          { title: "Develop", text: "Configure and integrate" },
          { title: "Deploy", text: "Test, train and launch" },
          { title: "Support", text: "Continuously improve" },
        ],
      },
      cases: {
        eyebrow: "Case studies",
        title: "Real Results for Real Businesses",
        description: "Challenge, solution and measurable outcomes from focused delivery.",
        previous: "Previous case studies",
        next: "Next case studies",
        items: [
          { category: "Dubai · Odoo ERP", title: "Multi-Branch Beauty Salon ERP", description: "Connected appointments, POS, inventory, staff scheduling and customer loyalty across eight branches.", results: [{ value: "40%", label: "Faster bookings" }, { value: "25%", label: "Fewer no-shows" }] },
          { category: "Manufacturing · Odoo ERP", title: "Manufacturing ERP & CRM Platform", description: "Unified sales, production and inventory with real-time reporting and controlled approvals.", results: [{ value: "30%", label: "Faster order cycle" }, { value: "18%", label: "Lower holding cost" }] },
          { category: "Finance · Automation", title: "Finance & Accounting Automation", description: "Consolidated multi-company reporting, reconciliation and repeatable month-end workflows.", results: [{ value: "15 → 3", label: "Days to close" }, { value: "One view", label: "Group reporting" }] },
          { category: "UAE · AI Automation", title: "AI Lead Management & CRM", description: "Connected lead capture, prioritization, follow-up and pipeline reporting for a B2B sales team.", results: [{ value: "AI", label: "Lead scoring" }, { value: "Always-on", label: "Follow-up" }] },
        ],
      },
      stats: [
        { value: 120, suffix: "+", label: "Projects" },
        { value: 98, suffix: "%", label: "Client Satisfaction" },
        { value: 20, suffix: "+", label: "Industries" },
        { value: 5, suffix: "+", label: "Countries" },
        { value: 10, suffix: "+", label: "Experts" },
      ],
      technologies: {
        eyebrow: "Technology stack",
        title: "Technologies We Work With",
      },
      testimonials: {
        eyebrow: "Testimonials",
        title: "What Our Clients Say",
        description: "Perspectives from teams we have helped transform.",
        previous: "Previous testimonials",
        next: "Next testimonials",
        items: [
          { quote: "Zavior implemented our Odoo ERP seamlessly. Their expertise and support made the process smooth and efficient.", author: "Operations Manager", role: "Operations", company: "Manufacturing Company, UAE" },
          { quote: "The Zoho CRM implementation improved pipeline visibility and customer engagement significantly.", author: "Chief Executive Officer", role: "Executive Leadership", company: "Trading Company, Dubai" },
          { quote: "Their custom modules and integration services perfectly fit our business requirements.", author: "Finance Manager", role: "Finance", company: "Retail Company, UAE" },
        ],
      },
      faq: {
        eyebrow: "FAQ",
        title: "Frequently Asked Questions",
        description: "Clear answers for teams planning Odoo, Zoho and connected automation.",
        odooTitle: "Odoo ERP Questions",
        zohoTitle: "Zoho & Platform Questions",
        odooItems: [
          { question: "What is Odoo ERP Implementation?", answer: "Odoo ERP Implementation is the process of mapping requirements, configuring applications, migrating data, integrating systems, testing workflows and training users around one operating model." },
          { question: "Why choose Odoo ERP?", answer: "Odoo brings CRM, sales, accounting, inventory, manufacturing, projects and other core operations into one flexible platform that can expand in phases." },
          { question: "How long does Odoo implementation take?", answer: "A focused rollout can take several weeks. Larger multi-team implementations are delivered in phases based on modules, migration, integrations, testing and training." },
          { question: "Can Odoo integrate with Shopify?", answer: "Yes. Odoo can connect with Shopify and other commerce, payment, logistics and business platforms through appropriate connectors or custom APIs." },
        ],
        zohoItems: [
          { question: "What is Zoho CRM?", answer: "Zoho CRM is a customer relationship platform for managing leads, deals, communications, follow-up, forecasts and sales reporting." },
          { question: "Why use Zoho One?", answer: "Zoho One combines applications for sales, finance, marketing, service, HR and operations with shared data and cross-team automation." },
          { question: "Can Zoho integrate with ERP?", answer: "Yes. Zoho Custom Workflows & API Integration can connect Zoho with Odoo and other ERP systems through controlled data flows." },
          { question: "How much does ERP implementation cost?", answer: "Cost depends on users, applications, customization, data migration, integrations, training and support. A discovery session is the right first step for an accurate scope." },
        ],
      },
      cta: {
        eyebrow: "Ready to transform your business?",
        title: "Let’s Build Something Amazing Together",
        description: "Whether you’re implementing Odoo ERP, optimizing Zoho CRM or building custom business software, our consultants are ready to help.",
        primaryCta: "Book Free Consultation",
        whatsapp: "WhatsApp",
        call: "Call Now",
        promises: ["No commitment", "Expert consultation", "Quick response"],
      },
    },
    footer: {
      description: "Official Odoo and Zoho partner delivering connected ERP, CRM and automation solutions across the UAE and beyond.",
      officialPartner: "Official Partner",
      quickLinksTitle: "Quick links",
      serviceLinksTitle: "Our services",
      industryLinksTitle: "Industries",
      contactTitle: "Contact Zavior",
      contactDescription: "Tell us what needs to work better. We’ll help define a practical next step.",
      quickLinks: ["Home", "About", "Companies", "Case Studies", "Blog", "Contact"],
      serviceLinks: ["Odoo ERP Implementation", "Zoho CRM & Zoho One", "AI Automation", "Web Development", "Mobile Apps", "IT Solutions", "Core IT Infrastructure"],
      industryLinks: ["Manufacturing", "Retail & Commerce", "Healthcare", "Construction", "Logistics", "Professional Services"],
      proof: [
        { title: "Business-first delivery", text: "Solutions aligned to outcomes" },
        { title: "Data security", text: "Reliable systems and practices" },
        { title: "Dedicated support", text: "Help beyond go-live" },
      ],
      privacy: "Privacy",
      terms: "Terms",
      sitemap: "Sitemap",
      madeIn: "Made with care in the UAE",
    },
  },
  ar: {
    home: {
      hero: {
        eyebrow: "شريك رسمي لـ Odoo و Zoho · دبي، الإمارات",
        heading: ["حلول Odoo ERP و Zoho CRM", "والأتمتة بالذكاء الاصطناعي", "للشركات الطموحة"],
        description: "نساعد الشركات في دبي والإمارات ومنطقة الخليج على تبسيط العمليات من خلال تنفيذ Odoo ERP وZoho CRM وتطوير البرمجيات المخصصة والأتمتة بالذكاء الاصطناعي وتحسين العمليات التجارية.",
        primaryCta: "احجز استشارة مجانية",
        secondaryCta: "عرض دراسات الحالة",
        stats: [
          { value: "+120", label: "مشروع ناجح" },
          { value: "+5", label: "سنوات من التميز" },
          { value: "+50", label: "عميل سعيد" },
          { value: "الإمارات · الخليج", label: "تنفيذ إقليمي" },
        ],
        productGroupLabel: "شاشات منتجات Odoo وZoho CRM الأصلية",
        odooDashboardLabel: "لوحة ERP",
        zohoPipelineLabel: "مسار كانبان",
        productUiLabel: "واجهة المنتج الرسمية",
      },
      partners: {
        eyebrow: "شراكات رسمية",
        statement: "منصتان رائدتان. فريق تنفيذ واحد مسؤول.",
        officialPartner: "شريك رسمي",
      },
      services: {
        eyebrow: "خدماتنا",
        title: "حلول متكاملة لنمو أعمالك",
        description: "فريق واحد خبير لتنفيذ ERP وCRM والأتمتة والمنتجات الرقمية المخصصة.",
        learnMore: "اعرف المزيد",
        showMore: "عرض 7 خدمات إضافية",
        showFewer: "عرض خدمات أقل",
        items: [
          { title: "تنفيذ Odoo ERP", text: "تنفيذ متكامل لنظام Odoo ERP مصمم لعملياتك." },
          { title: "Odoo CRM", text: "اربط المبيعات والتسويق ومتابعة العملاء في نظام واحد." },
          { title: "وحدات Odoo مخصصة", text: "وحدات مصممة خصيصًا لتناسب إجراءاتك وضوابطك." },
          { title: "استشارات واكتشاف Odoo", text: "وضّح المتطلبات والنطاق وخطة إطلاق Odoo المناسبة." },
          { title: "خدمات تكامل Odoo", text: "اربط Odoo بالتجارة والمدفوعات وأنظمة الأعمال." },
          { title: "Zoho CRM", text: "أنشئ مسار مبيعات أوضح وتفاعلًا أكثر اتساقًا مع العملاء." },
          { title: "إعداد ونشر Zoho One", text: "انشر تطبيقات Zoho المناسبة عبر خطة مرحلية." },
          { title: "أتمتة Zoho Books", text: "بسّط إجراءات المالية والموافقات والعمليات المتكررة." },
          { title: "استشارات وتحسين Zoho", text: "حسّن التبني والتقارير والأداء عبر Zoho." },
          { title: "أتمتة إجراءات Zoho", text: "أنشئ مخططات ووظائف مخصصة وربط API موثوقًا." },
          { title: "الأتمتة بالذكاء الاصطناعي", text: "أتمت المهام المتكررة وسرّع اتخاذ القرار." },
          { title: "تطوير البرمجيات المخصصة", text: "برمجيات آمنة مصممة حول نموذج تشغيلك." },
          { title: "تطبيقات الويب", text: "منصات ويب حديثة وقابلة للتوسع للاستخدام التجاري الحقيقي." },
          { title: "تطبيقات الجوال", text: "تجارب أصلية ومتعددة المنصات للفرق والعملاء." },
          { title: "تطوير API", text: "انقل البيانات بأمان بين ERP وCRM والمنصات الخارجية." },
        ],
      },
      industries: {
        eyebrow: "القطاعات التي نخدمها",
        title: "حلول لكل قطاع",
        description: "أنظمة أعمال مركزة على واقع التشغيل في كل قطاع.",
        items: ["التصنيع", "التجزئة", "الرعاية الصحية", "الإنشاءات", "التعليم", "الضيافة", "اللوجستيات", "السيارات", "الخدمات المهنية"],
      },
      benefits: {
        eyebrow: "لماذا زافيور",
        title: "نجاحك هو مهمتنا",
        description: "شراكات رسمية وتنفيذ مسؤول ودعم مستمر بعد الإطلاق.",
        items: [
          { title: "شراكات رسمية", text: "تنفيذ بصفتنا شريكًا رسميًا لـ Odoo وZoho." },
          { title: "الأعمال أولًا", text: "نحل مشكلات الأعمال، وليس البرمجيات فقط." },
          { title: "تطوير مخصص", text: "وحدات وتكاملات تناسب أعمالك." },
          { title: "دعم مخصص", text: "تنفيذ وتدريب وصيانة مستمرة." },
          { title: "تنفيذ أسرع", text: "تنفيذ مرن بنتائج قابلة للقياس." },
          { title: "الأتمتة بالذكاء الاصطناعي", text: "إجراءات حديثة مدعومة بذكاء اصطناعي عملي." },
        ],
      },
      platforms: {
        eyebrow: "خبرة المنصات",
        title: "تنفيذ رسمي عبر Odoo وZoho",
        description: "اختر منصة لاستكشاف نطاق التنفيذ.",
        odoo: {
          label: "Odoo ERP",
          eyebrow: "حلول Odoo ERP",
          title: "خدمات تنفيذ Odoo ERP",
          copy: [
            "تخطط زافيور وتنفذ Odoo ERP وفق طريقة عمل فرقك الفعلية. نبدأ باستشارات واكتشاف Odoo، ونرسم العمليات المؤثرة في الإيرادات والتكلفة والخدمة، ثم نضبط التطبيقات المناسبة قبل البدء في التطوير المخصص.",
            "يشمل تنفيذنا Odoo CRM والمالية والمخزون والمشتريات والتصنيع والتقارير. وعندما لا تكفي الإجراءات القياسية، نبني وحدات Odoo مخصصة وخدمات تكامل تربط التجارة والمدفوعات واللوجستيات والأنظمة الحالية. كما يشمل الإطلاق ترحيل البيانات والاختبار وتدريب المستخدمين والدعم بعد الإطلاق.",
          ],
          items: ["تنفيذ Odoo ERP", "Odoo CRM", "وحدات Odoo مخصصة", "استشارات واكتشاف Odoo", "خدمات تكامل Odoo"],
          explore: "استكشف خدمات Odoo ERP",
        },
        zoho: {
          label: "Zoho",
          eyebrow: "حلول Zoho",
          title: "خبراء Zoho CRM وZoho One",
          copy: [
            "بصفتها شريكًا رسميًا لـ Zoho، تساعد زافيور الشركات على تحويل Zoho CRM إلى نظام موثوق لجمع العملاء المحتملين وتأهيلهم وإدارة المسار والتنبؤ والملاحقة. كما نخطط لإعداد ونشر Zoho One حتى يخدم كل تطبيق حاجة تشغيلية واضحة.",
            "يضبط مستشارونا Zoho Books والأتمتة المالية والمخططات وقواعد الموافقة ولوحات المعلومات والوظائف المخصصة. ومن خلال استشارات وتحسين Zoho وتكامل الإجراءات وواجهات API، نربط Zoho مع Odoo والمواقع وخدمات الدفع وقواعد البيانات الحالية، ثم ندرب المستخدمين ونحسن النظام بعد الإطلاق.",
          ],
          items: ["Zoho CRM", "إعداد ونشر Zoho One", "الأتمتة المالية في Zoho Books", "استشارات وتحسين Zoho", "تكامل إجراءات Zoho وAPI"],
          explore: "استكشف خدمات Zoho",
        },
      },
      process: {
        eyebrow: "منهجيتنا",
        title: "عملية تنفيذ مثبتة",
        items: [
          { title: "اكتشاف", text: "نفهم أهدافك" },
          { title: "استشارة", text: "نحدد النطاق والأولويات" },
          { title: "تصميم", text: "نرسم الحل المناسب" },
          { title: "تطوير", text: "نضبط ونكامل" },
          { title: "إطلاق", text: "نختبر وندرب ونطلق" },
          { title: "دعم", text: "نحسن باستمرار" },
        ],
      },
      cases: {
        eyebrow: "دراسات الحالة",
        title: "نتائج حقيقية لأعمال حقيقية",
        description: "تحديات وحلول ونتائج قابلة للقياس من تنفيذ مركز.",
        previous: "دراسات الحالة السابقة",
        next: "دراسات الحالة التالية",
        items: [
          { category: "دبي · Odoo ERP", title: "نظام ERP لصالون تجميل متعدد الفروع", description: "ربط المواعيد ونقاط البيع والمخزون وجداول الموظفين وولاء العملاء عبر ثمانية فروع.", results: [{ value: "40%", label: "حجوزات أسرع" }, { value: "25%", label: "غياب أقل" }] },
          { category: "التصنيع · Odoo ERP", title: "منصة ERP وCRM للتصنيع", description: "توحيد المبيعات والإنتاج والمخزون مع تقارير فورية وموافقات محكومة.", results: [{ value: "30%", label: "دورة طلب أسرع" }, { value: "18%", label: "تكلفة احتفاظ أقل" }] },
          { category: "المالية · أتمتة", title: "أتمتة المالية والمحاسبة", description: "توحيد تقارير الشركات المتعددة والمطابقة وإجراءات الإغلاق الشهرية المتكررة.", results: [{ value: "15 ← 3", label: "أيام للإغلاق" }, { value: "رؤية واحدة", label: "تقارير المجموعة" }] },
          { category: "الإمارات · الذكاء الاصطناعي", title: "إدارة العملاء المحتملين وCRM بالذكاء الاصطناعي", description: "ربط جمع العملاء المحتملين وتحديد الأولويات والمتابعة وتقارير المسار لفريق مبيعات B2B.", results: [{ value: "AI", label: "تقييم العملاء" }, { value: "دائم", label: "متابعة" }] },
        ],
      },
      stats: [
        { value: 120, suffix: "+", label: "مشروع" },
        { value: 98, suffix: "%", label: "رضا العملاء" },
        { value: 20, suffix: "+", label: "قطاعًا" },
        { value: 5, suffix: "+", label: "دول" },
        { value: 10, suffix: "+", label: "خبراء" },
      ],
      technologies: {
        eyebrow: "المكدس التقني",
        title: "التقنيات التي نعمل بها",
      },
      testimonials: {
        eyebrow: "آراء العملاء",
        title: "ماذا يقول عملاؤنا",
        description: "آراء من فرق ساعدناها على التحول.",
        previous: "الآراء السابقة",
        next: "الآراء التالية",
        items: [
          { quote: "نفذت زافيور نظام Odoo ERP لدينا بسلاسة. جعلت خبرتهم ودعمهم العملية سهلة وفعالة.", author: "مدير العمليات", role: "العمليات", company: "شركة تصنيع، الإمارات" },
          { quote: "أدى تنفيذ Zoho CRM إلى تحسين وضوح مسار المبيعات وتفاعل العملاء بشكل ملحوظ.", author: "الرئيس التنفيذي", role: "الإدارة التنفيذية", company: "شركة تجارية، دبي" },
          { quote: "تطابقت الوحدات المخصصة وخدمات التكامل لديهم تمامًا مع متطلبات أعمالنا.", author: "مدير المالية", role: "المالية", company: "شركة تجزئة، الإمارات" },
        ],
      },
      faq: {
        eyebrow: "الأسئلة الشائعة",
        title: "الأسئلة المتكررة",
        description: "إجابات واضحة للفرق التي تخطط لـ Odoo وZoho والأتمتة المتصلة.",
        odooTitle: "أسئلة Odoo ERP",
        zohoTitle: "أسئلة Zoho والمنصات",
        odooItems: [
          { question: "ما هو تنفيذ Odoo ERP؟", answer: "تنفيذ Odoo ERP هو عملية رسم المتطلبات وضبط التطبيقات وترحيل البيانات وتكامل الأنظمة واختبار الإجراءات وتدريب المستخدمين حول نموذج تشغيل واحد." },
          { question: "لماذا نختار Odoo ERP؟", answer: "يجمع Odoo CRM والمبيعات والمحاسبة والمخزون والتصنيع والمشاريع والعمليات الأساسية الأخرى في منصة مرنة واحدة يمكن توسيعها على مراحل." },
          { question: "كم يستغرق تنفيذ Odoo؟", answer: "قد يستغرق الإطلاق المركز عدة أسابيع. أما التطبيقات الكبيرة متعددة الفرق فتنفذ على مراحل وفق التطبيقات وترحيل البيانات والتكاملات والاختبار والتدريب." },
          { question: "هل يمكن لـ Odoo التكامل مع Shopify؟", answer: "نعم. يمكن ربط Odoo مع Shopify وغيرها من منصات التجارة والمدفوعات واللوجستيات والأعمال عبر موصلات مناسبة أو واجهات API مخصصة." },
        ],
        zohoItems: [
          { question: "ما هو Zoho CRM؟", answer: "Zoho CRM منصة لإدارة علاقات العملاء والعملاء المحتملين والصفقات والاتصالات والمتابعة والتنبؤات وتقارير المبيعات." },
          { question: "لماذا نستخدم Zoho One؟", answer: "يجمع Zoho One تطبيقات للمبيعات والمالية والتسويق والخدمة والموارد البشرية والعمليات ببيانات مشتركة وأتمتة عبر الفرق." },
          { question: "هل يمكن لـ Zoho التكامل مع ERP؟", answer: "نعم. يمكن لتكامل إجراءات Zoho وAPI ربط Zoho مع Odoo وأنظمة ERP أخرى عبر تدفقات بيانات محكومة." },
          { question: "كم تبلغ تكلفة تنفيذ ERP؟", answer: "تعتمد التكلفة على المستخدمين والتطبيقات والتخصيص وترحيل البيانات والتكاملات والتدريب والدعم. جلسة الاكتشاف هي الخطوة الصحيحة لتحديد نطاق دقيق." },
        ],
      },
      cta: {
        eyebrow: "هل أنت مستعد لتحويل أعمالك؟",
        title: "لنصنع شيئًا استثنائيًا معًا",
        description: "سواء كنت تنفذ Odoo ERP أو تحسن Zoho CRM أو تبني برمجيات أعمال مخصصة، فمستشارونا جاهزون للمساعدة.",
        primaryCta: "احجز استشارة مجانية",
        whatsapp: "واتساب",
        call: "اتصل الآن",
        promises: ["دون التزام", "استشارة من خبراء", "استجابة سريعة"],
      },
    },
    footer: {
      description: "شريك رسمي لـ Odoo وZoho يقدم حلول ERP وCRM والأتمتة المتصلة عبر الإمارات وما بعدها.",
      officialPartner: "شريك رسمي",
      quickLinksTitle: "روابط سريعة",
      serviceLinksTitle: "خدماتنا",
      industryLinksTitle: "القطاعات",
      contactTitle: "تواصل مع زافيور",
      contactDescription: "أخبرنا بما يحتاج إلى تحسين. سنساعدك على تحديد خطوة عملية تالية.",
      quickLinks: ["الرئيسية", "عن الشركة", "الشركات", "دراسات الحالة", "المدونة", "اتصل بنا"],
      serviceLinks: ["تنفيذ Odoo ERP", "Zoho CRM وZoho One", "الأتمتة بالذكاء الاصطناعي", "تطوير الويب", "تطبيقات الجوال", "حلول تقنية المعلومات", "البنية التحتية الأساسية لتقنية المعلومات"],
      industryLinks: ["التصنيع", "التجزئة والتجارة", "الرعاية الصحية", "الإنشاءات", "اللوجستيات", "الخدمات المهنية"],
      proof: [
        { title: "تنفيذ يركز على الأعمال", text: "حلول مرتبطة بالنتائج" },
        { title: "أمن البيانات", text: "أنظمة وممارسات موثوقة" },
        { title: "دعم مخصص", text: "مساندة تتجاوز الإطلاق" },
      ],
      privacy: "الخصوصية",
      terms: "الشروط",
      sitemap: "خريطة الموقع",
      madeIn: "صُنع بعناية في الإمارات",
    },
  },
};

export function getMarketingContent(language: Language) {
  return marketingContent[language];
}
