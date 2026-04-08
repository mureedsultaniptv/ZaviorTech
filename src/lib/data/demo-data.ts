export const companies = [
  {
    id: "zavior-technologies",
    name: "Zavior Technologies",
    slug: "zavior-technologies",
    description:
      "The technology branch of Zavior Group delivering ERP, software engineering, AI automation, and digital transformation services through zavior.org.",
    shortDescription: "ERP, Software & AI Services",
    color: "#1d4ed8",
    sector: "Technology",
    headquarters: "Sharjah, United Arab Emirates",
    website: "https://zavior.org",
    websiteLabel: "zavior.org",
    href: "/services",
    isExternal: false,
    overview:
      "Zavior Technologies is the core services branch of Zavior Group. It helps organizations modernize operations through Odoo ERP, custom platforms, web and mobile delivery, and AI-powered process automation, with service discovery routed through the main services section on zavior.org.",
    relatedProjectSlugs: [
      "pharma-erp-system",
      "manufacturing-erp-crm",
      "ai-insights-dashboard",
    ],
    services: [
      "Odoo ERP Implementations",
      "AI Automation",
      "Custom Business Software",
      "Digital Transformation Consulting",
    ],
  },
  {
    id: "zavior-furniture",
    name: "Zavior Furniture",
    slug: "zavior-furniture",
    description:
      "The Dubai-based furniture branch of Zavior Group focused on sourcing, fit-out coordination, and furnishing solutions for commercial, hospitality, and residential projects.",
    shortDescription: "Dubai Furniture & Fit-Out Supply",
    color: "#b45309",
    sector: "Furniture",
    headquarters: "Dubai, United Arab Emirates",
    website: "https://zaviorfurniture.ae/",
    websiteLabel: "zaviorfurniture.ae",
    href: "https://zaviorfurniture.ae/",
    isExternal: true,
    overview:
      "Zavior Furniture supports turnkey furnishing requirements with an emphasis on procurement coordination, practical layouts, durable materials, and delivery readiness for project-driven environments across Dubai and the wider UAE.",
    relatedProjectSlugs: [],
    services: [
      "Commercial Furniture Supply",
      "Workspace Furnishing",
      "Project-Based Procurement",
      "Installation Coordination",
    ],
  },
  {
    id: "zavior-maintenance-services",
    name: "Zavior Maintenance Services",
    slug: "zavior-maintenance-services",
    description:
      "Building maintenance and facilities support brand focused on reliable scheduled, corrective, and emergency service delivery.",
    shortDescription: "Facilities & Maintenance Services",
    color: "#0f766e",
    sector: "Maintenance",
    headquarters: "United Arab Emirates",
    website: "https://services.zavior.org",
    websiteLabel: "services.zavior.org",
    href: "https://services.zavior.org",
    isExternal: true,
    overview:
      "Zavior Maintenance Services provides responsive maintenance support for property owners, operators, and facility teams, combining field execution with structured service communication through services.zavior.org.",
    relatedProjectSlugs: ["maintainit-dubai"],
    services: [
      "General Maintenance",
      "Preventive Maintenance",
      "MEP Support",
      "Facility Service Coordination",
    ],
  },
];

export const services = [
  {
    id: "erp-odoo",
    slug: "erp-odoo-dubai",
    title: "ERP & Odoo Solutions",
    description:
      "Comprehensive enterprise resource planning implementations tailored to streamline your business operations in Dubai.",
    longDescription: `
      <p>Our <strong>ERP & Odoo Solutions</strong> in Dubai are designed to help businesses of all sizes streamline operations, improve productivity, and enhance decision-making. 
      We specialize in full-cycle ERP implementation that covers everything from requirements analysis to deployment and training.</p>

      <p>We provide <strong>custom module development</strong> to tailor Odoo to your business processes, ensuring seamless integration with existing systems. 
      Our solutions support modules such as Finance, Inventory, HR, Manufacturing, CRM, and Sales, helping companies automate workflows efficiently.</p>

      <p>With <strong>integration services</strong>, we connect your ERP with third-party tools, e-commerce platforms, and payment gateways to create a cohesive ecosystem. 
      Our team also offers <strong>training and support</strong> to ensure that your employees can fully leverage the system from day one.</p>

      <p>Our <strong>ERP migration services</strong> help businesses move from legacy systems to modern Odoo platforms without downtime or data loss. 
      We focus on <strong>business process optimization</strong> to maximize ROI and streamline operations for companies operating in Dubai and across the UAE.</p>

      <ul>
        <li>Odoo Implementation tailored for Dubai businesses</li>
        <li>Custom Module Development to meet unique operational needs</li>
        <li>Business Process Optimization and workflow automation</li>
        <li>Integration with existing software and e-commerce platforms</li>
        <li>Training and continuous support for employees</li>
        <li>Secure and seamless migration from legacy ERP systems</li>
      </ul>
    `,
    icon: "Building",
    image: "/services/odoo-erp.png",
    features: [
      "Odoo Implementation",
      "Custom Module Development",
      "Business Process Optimization",
      "Integration Services",
      "Training & Support",
      "Migration Services",
    ],
    metaTitle:
      "ERP & Odoo Solutions Dubai | Zavior Technologies | Business Automation",
    metaDescription:
      "Zavior Technologies offers expert ERP and Odoo solutions in Dubai. Streamline business operations with custom modules, integrations, and training.",
    metaKeywords:
      "ERP Dubai, Odoo Dubai, Business Automation Dubai, ERP Implementation UAE, Zavior Technologies",
  },
  {
    id: "web-development",
    slug: "web-development-dubai",
    title: "Web Development",
    description:
      "Custom websites and web applications built with modern technologies for optimal performance and user experience in Dubai.",
    longDescription: `
      <p>Our <strong>web development services</strong> in Dubai focus on creating websites and web applications that are fast, responsive, and highly functional. 
      We specialize in developing <strong>custom web applications</strong>, <strong>e-commerce platforms</strong>, <strong>progressive web apps (PWAs)</strong>, and content management systems tailored to your business needs.</p>

      <p>We follow best practices for <strong>SEO optimization</strong>, performance, and user experience to ensure your website ranks high on Google Dubai searches. 
      Our team handles front-end and back-end development, API integrations, and database management for scalable and maintainable solutions.</p>

      <p>Whether you are a startup or an established enterprise, our web solutions help you reach your customers effectively while providing tools for analytics, reporting, and customer engagement. 
      We also offer <strong>ongoing support and performance optimization</strong> to maintain peak performance and security standards.</p>

      <ul>
        <li>Custom web applications for Dubai businesses</li>
        <li>E-commerce platforms with payment gateway integration</li>
        <li>Progressive web apps for mobile and desktop</li>
        <li>Content management systems for easy updates</li>
        <li>API development and integrations</li>
        <li>SEO, performance optimization, and analytics</li>
      </ul>
    `,
    icon: "Globe",
    image: "/services/website-dev.png",
    features: [
      "Custom Web Applications",
      "E-commerce Platforms",
      "Progressive Web Apps",
      "Content Management Systems",
      "API Development",
      "Performance Optimization",
    ],
    metaTitle:
      "Web Development Dubai | Zavior Technologies | Custom Websites & Apps",
    metaDescription:
      "Zavior Technologies provides professional web development services in Dubai. Build high-performing websites, e-commerce platforms, and custom web applications.",
    metaKeywords:
      "Web Development Dubai, E-commerce Dubai, Web Apps UAE, Website Design Dubai, Zavior Technologies",
  },
  {
    id: "mobile-apps",
    slug: "mobile-apps-dubai",
    title: "Mobile Applications",
    description:
      "Native and cross-platform mobile apps designed to engage users and extend your digital presence in Dubai.",
    longDescription: `
      <p>Our <strong>mobile application development services</strong> in Dubai deliver both native and cross-platform apps designed to engage users and enhance your digital presence. 
      We create iOS and Android apps tailored to your business requirements with intuitive user interfaces and seamless performance.</p>

      <p>We focus on <strong>App Store Optimization (ASO)</strong>, push notifications, and mobile analytics to ensure maximum reach and engagement. 
      Our solutions include integration with back-end systems, payment gateways, and APIs to create a cohesive mobile experience.</p>

      <p>Our team provides end-to-end support including app design, development, testing, and deployment. 
      We also assist in regular updates and maintenance, ensuring that your mobile applications remain secure, fast, and competitive in the Dubai marketplace.</p>

      <ul>
        <li>iOS and Android mobile application development</li>
        <li>Cross-platform apps with React Native or Flutter</li>
        <li>App Store Optimization for better discoverability</li>
        <li>Push notification setup for user engagement</li>
        <li>Integration with backend APIs and services</li>
        <li>Analytics and performance monitoring</li>
      </ul>
    `,
    icon: "Smartphone",
    image: "/services/hybridapp.png",
    features: [
      "iOS Development",
      "Android Development",
      "Cross-Platform Apps",
      "App Store Optimization",
      "Push Notifications",
      "Mobile Analytics",
    ],
    metaTitle:
      "Mobile App Development Dubai | Zavior Technologies | iOS & Android Apps",
    metaDescription:
      "Create engaging mobile applications in Dubai with Zavior Technologies. Native and cross-platform solutions including App Store optimization and analytics.",
    metaKeywords:
      "Mobile Apps Dubai, iOS App Dubai, Android App UAE, Cross-Platform Apps Dubai, Zavior Technologies",
  },
  {
    id: "it-solutions",
    slug: "it-solutions-dubai",
    title: "IT Solutions",
    description:
      "End-to-end IT consulting and infrastructure solutions to power your digital transformation journey in Dubai.",
    longDescription: `
      <p>Our <strong>IT solutions</strong> in Dubai cover a comprehensive range of services to enable your business digital transformation. 
      We provide IT strategy consulting, infrastructure setup, network solutions, system integration, and technical support for enterprises of all sizes.</p>

      <p>We focus on <strong>ensuring reliability, security, and scalability</strong> of your IT systems. 
      Our team of experts works closely with you to assess your current technology environment and design tailored solutions that optimize workflows and reduce operational risks.</p>

      <p>From deploying servers, networking equipment, and security solutions to ongoing maintenance and monitoring, we ensure your IT infrastructure is robust and capable of supporting your business goals in Dubai and the UAE.</p>

      <ul>
        <li>IT strategy consulting and assessment</li>
        <li>Infrastructure setup and optimization</li>
        <li>Network solutions and cybersecurity</li>
        <li>System integration and migration</li>
        <li>Technical support and managed services</li>
        <li>Continuous monitoring and performance tuning</li>
      </ul>
    `,
    icon: "Server",
    image: "/services/it-solution.png",
    features: [
      "IT Strategy Consulting",
      "Infrastructure Setup",
      "Network Solutions",
      "Technical Support",
      "System Integration",
      "IT Security",
    ],
    metaTitle:
      "IT Solutions Dubai | Zavior Technologies | Infrastructure & Consulting",
    metaDescription:
      "Zavior Technologies provides comprehensive IT solutions in Dubai, including consulting, infrastructure setup, network solutions, and technical support.",
    metaKeywords:
      "IT Solutions Dubai, IT Consulting UAE, Network Setup Dubai, IT Infrastructure Dubai, Zavior Technologies",
  },
  {
    id: "ai-automation",
    slug: "ai-automation-dubai",
    title: "AI Automation",
    description:
      "Leverage cutting-edge artificial intelligence to automate processes and drive efficiency across your organization in Dubai.",
    longDescription: `
      <p>Our <strong>AI automation services</strong> in Dubai help businesses adopt cutting-edge artificial intelligence to automate processes, enhance efficiency, and improve decision-making. 
      We design and implement solutions including machine learning models, natural language processing, computer vision, and predictive analytics tailored to your business needs.</p>

      <p>We develop <strong>intelligent chatbots</strong>, process automation pipelines, and AI-driven analytics platforms that enable you to streamline operations and gain actionable insights. 
      Our solutions are fully customized, scalable, and integrate with your existing infrastructure seamlessly.</p>

      <p>By leveraging AI automation, businesses in Dubai can reduce operational costs, improve accuracy, and accelerate growth. 
      Our team provides end-to-end implementation, monitoring, and support to ensure your AI systems deliver maximum value.</p>

      <ul>
        <li>Machine learning models for predictive analysis</li>
        <li>Natural language processing for intelligent chatbots</li>
        <li>Computer vision solutions for automation and monitoring</li>
        <li>End-to-end process automation systems</li>
        <li>AI analytics dashboards for actionable insights</li>
        <li>Integration with existing business systems</li>
      </ul>
    `,
    icon: "Brain",
    image: "/services/ai-automation.png",
    features: [
      "Machine Learning Models",
      "Natural Language Processing",
      "Computer Vision",
      "Predictive Analytics",
      "Process Automation",
      "Intelligent Chatbots",
    ],
    metaTitle:
      "AI & Automation Dubai | Zavior Technologies | Intelligent Solutions",
    metaDescription:
      "Implement AI and automation solutions in Dubai with Zavior Technologies to enhance efficiency using ML, NLP, predictive analytics, and chatbots.",
    metaKeywords:
      "AI Dubai, Automation Dubai, Machine Learning UAE, Intelligent Chatbots Dubai, Zavior Technologies",
  },
  {
    id: "coreit",
    slug: "core-it-infrastructure-dubai",
    title: "Core IT Infrastructure",
    description:
      "Delivering complete hardware and infrastructure solutions — from enterprise servers and networking to CCTV surveillance and workstation setup in Dubai.",
    longDescription: `
      <p>Our <strong>Core IT Infrastructure services</strong> in Dubai provide end-to-end hardware and network solutions to ensure your business operations run smoothly. 
      We specialize in server installation and maintenance, networking and structured cabling, CCTV surveillance systems, workstation setup, and data backup solutions.</p>

      <p>We focus on <strong>scalability, security, and reliability</strong> to create IT environments that can support growth and continuity. 
      Our team evaluates your existing infrastructure, identifies gaps, and delivers customized solutions aligned with your business goals.</p>

      <p>We provide ongoing support, hardware procurement assistance, and preventive maintenance to ensure minimal downtime. 
      Our solutions enable businesses in Dubai to have a secure, robust, and optimized IT infrastructure that meets international standards.</p>

      <ul>
        <li>Server installation, configuration, and maintenance</li>
        <li>CCTV and surveillance system deployment</li>
        <li>Networking solutions and structured cabling</li>
        <li>Workstation setup and configuration</li>
        <li>Hardware procurement and support</li>
        <li>Data backup and secure storage solutions</li>
      </ul>
    `,
    icon: "Server",
    image: "/services/core-it.png",
    features: [
      "Server Installation & Maintenance",
      "CCTV & Surveillance Systems",
      "Networking & Structured Cabling",
      "Workstation Setup & Configuration",
      "Hardware Procurement & Support",
      "Data Backup & Storage Solutions",
    ],
    metaTitle:
      "Core IT Infrastructure Dubai | Zavior Technologies | Servers & Networking",
    metaDescription:
      "Zavior Technologies provides comprehensive IT infrastructure services in Dubai, including servers, networking, CCTV, workstations, and data backup solutions.",
    metaKeywords:
      "IT Infrastructure Dubai, Server Installation UAE, CCTV Dubai, Networking Dubai, Zavior Technologies",
  },
];

export const projects = [
  {
    id: "pharma-erp-system",
    slug: "pharma-erp-system",
    metaTitle: "Pharmaceutical ERP System | Zavior Technologies",
    metaDescription:
      "Zavior Technologies developed a custom Pharmaceutical ERP for manufacturing & sales, integrating Odoo, Power BI dashboards, and compliance solutions for DRAP regulations.",
    canonical: "https://zaviortech.vercel.app/portfolio/pharma-erp-system",
    metaKeywords:
      "Pharmaceutical ERP, Odoo ERP, Pharma Manufacturing Software, Batch Tracking ERP, Power BI Dashboards, ERP Pakistan, Zavior Technologies",
    title: "Pharmaceutical ERP for Manufacturing & Sales",
    category: "ERP & Odoo Solutions",
    client: "Pharmaceutical Company (Karachi)",
    description:
      "A leading pharmaceutical manufacturer in Pakistan engaged us to replace their fragmented legacy systems with a unified Odoo ERP. The goal was to achieve full traceability of raw materials and finished goods, streamline multi-location inventory, and ensure compliance with DRAP regulations. We delivered a customized solution integrating manufacturing, batch tracking, sales, and CRM with real-time Power BI dashboards for management.",
    image: "/projects/platinum-pharma.png",
    technologies: ["Odoo", "Python", "PostgreSQL", "Power BI", "Docker"],
    year: 2025,
    featured: true,
    projectOverview: `
        <p>
          The client, a rapidly growing pharmaceutical group with multiple production lines and a nationwide distribution network, faced challenges in tracking batches, managing expiry dates, and maintaining audit trails for regulatory compliance. Their existing spreadsheets and standalone software led to data silos and manual errors.
        </p>
        <p>
          We implemented Odoo Enterprise with custom modules for pharmaceutical manufacturing, including:
        </p>
        <ul>
          <li><strong>Batch & Lot Traceability:</strong> Full lifecycle tracking from raw material receipt to finished goods dispatch, with expiry alerts and recall readiness.</li>
          <li><strong>Quality Control Integration:</strong> QC checks at each stage with automated pass/fail workflows and non-conformance reporting.</li>
          <li><strong>Sales & Distribution:</strong> Integrated CRM, quotation-to-invoice automation, and territory-wise sales team tracking.</li>
  <li><strong>Odoo Dashboards:</strong> Configured real-time dashboards within Odoo for monitoring production efficiency, inventory turnover, and sales performance, enabling executives to make informed operational and strategic decisions.</li>
          <li><strong>Audit Logs & User Roles:</strong> Granular access control and complete activity logs to meet DRAP audit requirements.</li>
        </ul>
        <p>
          The system now handles over 5,000 transactions daily, reduced batch traceability time from days to minutes, and improved inventory accuracy to 99%. The client successfully passed their first post-implementation regulatory audit with zero non-compliance findings.
        </p>
      `,
  },
  {
    id: "manufacturing-crm",
    slug: "manufacturing-erp-crm",
    metaTitle: "Manufacturing ERP & CRM Platform | Zavior Technologies",
    metaDescription:
      "Integrated Manufacturing ERP & CRM solution for industrial manufacturers. Streamline sales, production, and inventory with Odoo ERP and real-time reporting.",
    canonical: "https://zaviortech.vercel.app/portfolio/manufacturing-erp-crm",
    metaKeywords:
      "Manufacturing ERP, Odoo CRM, Industrial ERP, Production Management Software, Inventory Automation, ERP Solutions Pakistan",
    title: "Manufacturing ERP & CRM Platform",
    category: "ERP & Odoo Solutions",
    client: "Industrial Manufacturing Company (Punjab)",
    description:
      "A medium-sized industrial manufacturer needed to integrate their sales, production, and inventory operations. We deployed Odoo ERP with customizations for their specific workflows, enabling seamless data flow between departments and providing management with real-time reports. The project eliminated manual reconciliations and reduced order-to-delivery cycle time by 30%.",
    image: "/projects/manuf-erp.png",
    technologies: ["Odoo", "Python", "PostgreSQL", "Excel BI", "Docker"],
    year: 2025,
    featured: false,
    projectOverview: `
      <p>
        The client, producing industrial components for the automotive sector, struggled with disconnected systems: sales used spreadsheets, production relied on paper job cards, and inventory was tracked in a basic desktop application. This caused delays, stock discrepancies, and missed delivery deadlines.
      </p>
      <p>
        We implemented a unified Odoo solution covering:
      </p>
      <ul>
        <li><strong>CRM & Sales:</strong> Lead tracking, quotation generation, and order management with automated follow-ups.</li>
        <li><strong>Manufacturing:</strong> Bill of materials, work orders, and shop floor control with real-time consumption updates.</li>
        <li><strong>Inventory:</strong> Multi-warehouse management, reorder alerts, and cycle counting.</li>
        <li><strong>Custom Reporting:</strong> Excel BI integration for flexible, executive-friendly reports on profitability, production efficiency, and sales trends.</li>
        <li><strong>Automated Workflows:</strong> Approval chains for purchase orders, sales discounts, and production changes.</li>
      </ul>
      <p>
        Post-implementation, the company reduced order processing time from 3 days to 1 day, cut inventory holding costs by 18%, and gained complete visibility into production bottlenecks. The integrated CRM helped the sales team close 25% more leads through timely follow-ups.
      </p>
    `,
  },
  {
    id: "beauty-salon-erp",
    slug: "odoo-beauty-salon-erp",
    metaTitle: "Odoo ERP for Multi-Branch Beauty Salon | Zavior Technologies",
    metaDescription:
      "Centralize your multi-branch beauty salon operations with Odoo ERP. Manage appointments, POS, staff scheduling, inventory, and customer loyalty seamlessly.",
    canonical: "https://zaviortech.vercel.app/portfolio/odoo-beauty-salon-erp",
    metaKeywords:
      "Beauty Salon ERP, Odoo ERP Dubai, Multi-Branch Salon Software, POS Integration, Salon Appointment Management, Zavior Technologies",

    title: "Odoo ERP for Multi-Branch Beauty Salon",
    category: "ERP & Odoo Solutions",
    client: "Multi-Branch Beauty Salon (Dubai)",
    description:
      "A premium beauty salon chain with 8 branches in Dubai needed to centralize operations: point-of-sale, appointments, staff scheduling, inventory, and customer loyalty. We deployed Odoo with custom modules and integrated external APIs for SMS reminders and accounting. The result: real-time branch performance tracking, 40% faster appointment bookings, and unified customer experience.",
    image: "/projects/odoo-nbeauty-erp.png",
    technologies: [
      "Odoo",
      "Python",
      "PostgreSQL",
      "Docker",
      "Odoo.sh",
      "Twilio API",
    ],
    year: 2024,
    featured: true,
    projectOverview: `
      <p>
        The client operated multiple branches across Dubai, each using different POS systems and manual appointment books. Corporate management had no visibility into branch performance, stock levels, or customer retention. Staff scheduling was chaotic, and loyalty points were tracked on paper.
      </p>
      <p>
        We implemented Odoo ERP with a multi-company structure to manage each branch independently while providing consolidated reporting. Key features:
      </p>
      <ul>
        <li><strong>Centralized POS:</strong> All branches connected to a common Odoo POS with real-time inventory sync. Product transfers between branches are now traceable.</li>
        <li><strong>Appointment Scheduling:</strong> Online booking integrated with staff calendars, automated SMS/email confirmations via Twilio, and waitlist management.</li>
        <li><strong>HR & Payroll:</strong> Branch-wise attendance, commission-based payroll for stylists, and leave management.</li>
        <li><strong>CRM & Loyalty:</strong> Customer profiles with visit history, preferences, and a points-based loyalty program automatically applied at checkout.</li>
        <li><strong>Accounting Integration:</strong> Automated invoice posting to the general ledger and integration with regional tax reporting.</li>
        <li><strong>Odoo.sh Deployment:</strong> CI/CD pipelines with Docker for seamless updates and staging environments.</li>
      </ul>
      <p>
        The system now processes over 2,000 appointments weekly, with 99.9% uptime. Customer no-shows dropped by 25% due to automated reminders, and management gained a real-time dashboard showing revenue, top services, and staff performance per branch.
      </p>
    `,
  },
  {
    id: "zero-waste-erp",
    slug: "zero-waste-industrial-erp",
    metaTitle: "Zero Waste Industrial ERP | Zavior Technologies",
    metaDescription:
      "Odoo-based Zero Waste ERP for industrial sustainability organizations. Track waste lifecycle, integrate IoT weighbridges, and generate sustainability reports aligned with UN SDGs.",
    canonical:
      "https://zaviortech.vercel.app/portfolio/zero-waste-industrial-erp",
    metaKeywords:
      "Zero Waste ERP, Odoo Sustainability ERP, Industrial Waste Management Software, IoT ERP Integration, Sustainability Reporting, Circular Economy ERP",

    title: "Zero Waste Industrial ERP",
    category: "ERP & Odoo Solutions",
    client: "Industrial Sustainability Organization",
    description:
      "A non-profit organization focused on industrial waste management needed a system to track waste collection, processing, and resale of recycled materials. We built an Odoo-based ERP with custom modules for waste lifecycle management, integrating with IoT weighbridges and generating sustainability reports aligned with UN SDG goals. The platform now processes 500+ tons of waste monthly with full traceability.",
    image: "/projects/zero_waste.png",
    technologies: [
      "Odoo",
      "Python",
      "PostgreSQL",
      "Power BI",
      "IoT Integration",
    ],
    year: 2025,
    featured: true,
    projectOverview: `
      <p>
        The client manages a large recycling facility that collects industrial waste from factories, processes it, and sells recycled raw materials. They needed a system to track each batch from source to end customer, measure environmental impact, and provide auditable reports for donors and regulators.
      </p>
      <p>
        We extended Odoo with:
      </p>
      <ul>
        <li><strong>Waste Collection Module:</strong> Scheduled pickups, weighbridge integration (automatic weight capture), and digital receipts for suppliers.</li>
        <li><strong>Processing Workflow:</strong> Tracking of sorting, shredding, and refining stages with yield calculations and quality checks.</li>
        <li><strong>Inventory of Recycled Materials:</strong> Batch-level traceability with certificates of recycling.</li>
        <li><strong>Sales & Invoicing:</strong> Automated pricing based on market rates and customer contracts.</li>
        <li><strong>Sustainability Dashboards:</strong> Power BI reports showing CO2 savings, energy recovered, and waste diverted from landfill, aligned with UN SDG 12 (Responsible Consumption) and SDG 13 (Climate Action).</li>
      </ul>
      <p>
        The solution enabled the organization to provide transparent impact reports to their funding partners, leading to a 40% increase in grant funding. Operational efficiency improved through automated data capture, eliminating manual weighbridge logs and reducing administrative overhead by 30 hours per week.
      </p>
    `,
  },
  {
    id: "finance-automation",
    slug: "finance-automation-system",
    metaTitle: "Finance & Accounting Automation System | Zavior Technologies",
    metaDescription:
      "Automate financial reporting with Odoo Accounting. Multi-company consolidation, bank reconciliation, Excel BI integration, and faster month-end closing for enterprises.",
    canonical:
      "https://zaviortech.vercel.app/portfolio/finance-automation-system",
    metaKeywords:
      "Finance Automation, Accounting ERP, Odoo Accounting, Multi-Company ERP, Bank Reconciliation Automation, ERP Solutions Pakistan",
    title: "Finance & Accounting Automation System",
    category: "ERP & Odoo Solutions",
    client: "Regional Enterprise Clients",
    description:
      "A group of companies with diverse business lines needed to consolidate their financial reporting and automate manual accounting tasks. We customized Odoo Accounting to handle multi-company consolidation, automated bank reconciliation, and integrated with their existing Excel-based reporting. The project reduced month-end closing time from 15 days to 3 days.",
    image: "/projects/finance-automation.png",
    technologies: [
      "Odoo",
      "Python",
      "Excel BI",
      "PostgreSQL",
      "Bank Feeds API",
    ],
    year: 2023,
    featured: false,
    projectOverview: `
      <p>
        The client, a holding company with subsidiaries in trading, services, and manufacturing, struggled with disparate accounting systems. Consolidating financials for board reporting required manual Excel work that took two weeks each month and was prone to errors.
      </p>
      <p>
        We implemented a unified Odoo Accounting instance with multi-company support:
      </p>
      <ul>
        <li><strong>Centralized Chart of Accounts:</strong> Standardized account codes across all entities while maintaining local autonomy.</li>
        <li><strong>Automated Bank Reconciliation:</strong> Direct feeds from 5 banks with rule-based matching, reducing manual entry by 90%.</li>
        <li><strong>Inter-Company Transactions:</strong> Automated invoicing and settlement between subsidiaries.</li>
        <li><strong>Expense Management:</strong> Employee expense claims with approval workflows and direct posting to accounting.</li>
        <li><strong>Excel BI Integration:</strong> Real-time export to Excel-based dashboards for variance analysis and cash flow forecasting.</li>
        <li><strong>Tax Compliance:</strong> Customized tax reports for regional tax authorities and automated VAT return preparation.</li>
      </ul>
      <p>
        Month-end consolidation now takes three days instead of two weeks. The finance team shifted from data entry to strategic analysis, and the board receives accurate consolidated reports by the 5th of each month. The system handles 50,000+ transactions monthly with 100% audit trail.
      </p>
    `,
  },

  // ==============================
  // 2️⃣ WEB DEVELOPMENT
  // ==============================
  {
    id: "ecocycle-website",
    slug: "ecocycle-environmental-website",
    metaTitle: "EcoCycle Environmental Website | Zavior Technologies",
    metaDescription:
      "Responsive, SEO-optimized WordPress website for EcoCycle. Showcasing recycling services, generating leads, and increasing conversions with modern design and Cloudflare CDN.",
    canonical:
      "https://zaviortech.vercel.app/portfolio/ecocycle-environmental-website",
    metaKeywords:
      "EcoCycle Website, Environmental Website Design, WordPress SEO, Recycling Services Website, Lead Generation Website, Zavior Technologies",
    title: "EcoCycle Environmental Website",
    category: "Web Development",
    client: "EcoCycle Co.",
    description:
      "EcoCycle, a recycling startup, needed a professional website to showcase their services, attract corporate clients, and generate leads. We built a responsive WordPress site with a modern design, optimized for SEO, and integrated with Cloudflare CDN for fast global access. The site now ranks on first page for key environmental keywords and has increased inquiry conversions by 60%.",
    image: "/projects/eco-cycle-website.png",
    technologies: [
      "WordPress",
      "Elementor",
      "SEO Optimization",
      "Cloudflare CDN",
      "Google Analytics",
    ],
    year: 2024,
    featured: false,
    projectOverview: `
      <p>
        EcoCycle wanted to establish an online presence to compete in the growing sustainability market. Their previous site was outdated, slow, and not mobile-friendly, resulting in high bounce rates and few inquiries.
      </p>
      <p>
        We developed a new WordPress site with:
      </p>
      <ul>
        <li><strong>Custom Elementor Design:</strong> A clean, modern layout highlighting their services, impact metrics, and client testimonials.</li>
        <li><strong>Service Pages:</strong> Detailed descriptions of e-waste recycling, paper shredding, and secure data destruction, with clear calls-to-action.</li>
        <li><strong>Lead Generation Forms:</strong> Integrated with CRM for automatic follow-up, and Google Analytics for conversion tracking.</li>
        <li><strong>SEO Optimization:</strong> Keyword research, on-page optimization, and structured data to improve search rankings.</li>
        <li><strong>Performance:</strong> Cloudflare CDN and image optimization reduced load times from 5s to under 2s globally.</li>
      </ul>
      <p>
        Within six months, organic traffic increased by 150%, and the site started ranking in the top 3 for "recycling services [city]". Lead quality improved, and the company reported a 60% increase in qualified inquiries, directly contributing to new contracts with two major corporations.
      </p>
    `,
  },
  {
    id: "maintainit-dubai",
    slug: "maintainit-dubai",
    metaTitle:
      "Maintainit Dubai – Facility Services Website | Zavior Technologies",
    metaDescription:
      "Conversion-focused WordPress website for facility services. Local SEO, service quotation forms, Google My Business integration to drive 50+ qualified leads/month.",
    canonical: "https://zaviortech.vercel.app/portfolio/maintainit-dubai",
    metaKeywords:
      "Facility Services Website, WordPress Dubai, Local SEO Website, Maintenance Services Website, HVAC Website Design, Lead Generation Website",
    title: "Maintainit Dubai – Facility Services Website",
    category: "Web Development",
    client: "Maintainit Dubai",
    description:
      "Maintainit Dubai, a growing facilities management company, needed a website that would generate leads for their maintenance, cleaning, and HVAC services. We created a conversion-focused WordPress site with local SEO, service quotation forms, and integrated Google My Business. The site now drives 50+ qualified leads per month and has become their primary sales channel.",
    image: "/projects/maintainit-dubai.png",
    technologies: [
      "WordPress",
      "Elementor",
      "Google Analytics",
      "SEO",
      "Google My Business",
    ],
    year: 2025,
    featured: true,
    projectOverview: `
      <p>
        The client relied on word-of-mouth and cold calling but wanted to scale through digital channels. They needed a website that would rank for local searches like "AC repair Dubai" and convert visitors into service requests.
      </p>
      <p>
        We delivered:
      </p>
      <ul>
        <li><strong>Local SEO Foundation:</strong> Optimized for Dubai-specific keywords, integrated Google Maps, and set up Google My Business with consistent NAP citations.</li>
        <li><strong>Service Quotation Forms:</strong> Multi-step forms for different services (cleaning, maintenance, pest control) that pre-qualify leads and send notifications to the sales team.</li>
        <li><strong>Portfolio & Case Studies:</strong> Before/after photos and detailed project descriptions to build trust.</li>
        <li><strong>Blog & Resources:</strong> Regular articles on maintenance tips, improving SEO and establishing authority.</li>
        <li><strong>Conversion Tracking:</strong> Google Analytics and Tag Manager set up to track form submissions, phone calls, and chat interactions.</li>
      </ul>
      <p>
        The website now receives over 5,000 organic visitors monthly, with a 4% conversion rate on service forms. It has become the company's top lead source, reducing customer acquisition cost by 40% compared to traditional advertising.
      </p>
    `,
  },
  // {
  //   id: "defence-industry-site",
  //   title: "Government Information Portal (Drupal)",
  //   slug: "defence-industry-portal",
  //   category: "Web Development",
  //   client: "Government Organization (Australia)",
  //   description:
  //     "An Australian government agency required a secure, accessible information portal for defence industry partners. We developed a Drupal-based solution with strict security protocols, WCAG 2.1 AA compliance, and a content workflow for multiple editors. The portal now serves over 10,000 registered users and has passed rigorous security audits.",
  //   image: "/projects/defence_industry.png",
  //   technologies: [
  //     "Drupal",
  //     "Twig",
  //     "HTML5",
  //     "Accessibility Compliance",
  //     "CKAN Integration",
  //   ],
  //   year: 2024,
  //   featured: false,
  //   projectOverview: `
  //     <p>
  //       The agency needed to replace an aging portal with a modern, secure platform to share sensitive documents, procurement notices, and industry news with defence contractors. Key requirements: high security, accessibility for users with disabilities, and a scalable content management system.
  //     </p>
  //     <p>
  //       We built on Drupal 9 with:
  //     </p>
  //     <ul>
  //       <li><strong>Security Hardening:</strong> Role-based access control, two-factor authentication for editors, and regular security updates. Penetration testing passed with zero critical issues.</li>
  //       <li><strong>Accessibility Compliance:</strong> WCAG 2.1 AA standards implemented throughout, including keyboard navigation, screen reader support, and contrast ratios.</li>
  //       <li><strong>Content Workflow:</strong> Multi-stage editorial workflow with approval chains, versioning, and scheduled publishing.</li>
  //       <li><strong>Document Management:</strong> Integration with CKAN for open data publishing and secure document repositories.</li>
  //       <li><strong>Performance:</strong> Varnish cache and CDN to handle traffic spikes during major procurement announcements.</li>
  //     </ul>
  //     <p>
  //       The portal launched on schedule and has maintained 99.98% uptime. User satisfaction scores improved from 2.5 to 4.6 out of 5, and the agency has expanded the platform to host additional microsites.
  //     </p>
  //   `,
  // },
  // {
  //   id: "swim-productions",
  //   title: "Swim Productions – Creative Agency Portfolio",
  //   slug: "swim-productions",
  //   category: "Web Development",
  //   client: "Swim Productions",
  //   description:
  //     "Swim Productions, a creative agency specializing in photography and branding, wanted a portfolio website that would wow potential clients. We built a custom WordPress theme with a heavy focus on visuals: full-screen media galleries, smooth animations, and fast loading. The site has been featured in design blogs and helped the agency win three major accounts.",
  //   image: "/projects/swim_productions.png",
  //   technologies: [
  //     "WordPress",
  //     "Custom Theme",
  //     "GSAP",
  //     "Advanced Custom Fields",
  //     "SEO",
  //   ],
  //   year: 2024,
  //   featured: false,
  //   projectOverview: `
  //     <p>
  //       The agency's previous site was a generic template that didn't reflect their creative caliber. They needed a site that would serve as a gallery for their work and demonstrate their technical expertise.
  //     </p>
  //     <p>
  //       We developed a custom WordPress theme with:
  //     </p>
  //     <ul>
  //       <li><strong>Immersive Media Galleries:</strong> Full-screen image sliders, video backgrounds, and lightbox effects powered by GSAP animations for smooth transitions.</li>
  //       <li><strong>Project Showcase:</strong> Custom post types for projects with flexible layouts (images, videos, text) using Advanced Custom Fields.</li>
  //       <li><strong>Responsive Design:</strong> Pixel-perfect across devices, with touch-friendly gestures on mobile.</li>
  //       <li><strong>Performance Optimization:</strong> Lazy loading, image compression, and CDN to ensure fast load times despite heavy media.</li>
  //       <li><strong>SEO Foundation:</strong> Structured data for projects, optimized meta tags, and XML sitemaps.</li>
  //     </ul>
  //     <p>
  //       The new site received immediate positive feedback, leading to features on Awwwards and CSS Design Awards. Within three months, the agency reported a 200% increase in inquiries from high-profile clients, ultimately signing contracts with a luxury automotive brand and a international fashion label.
  //     </p>
  //   `,
  // },
  {
    id: "automobile-crm",
    slug: "automobile-crm-portal",
    metaTitle: "Automobile CRM & Sales Management Portal | Zavior Technologies",
    metaDescription:
      "Custom CRM for automobile distributors with lead management, sales workflow, real-time dashboards, and ERP integration. Improve lead response time and sales conversions.",
    canonical: "https://zaviortech.vercel.app/portfolio/automobile-crm-portal",
    metaKeywords:
      "Automobile CRM, Sales Management Software, Lead Management Portal, ERP Integration CRM, Automotive CRM System, Zavior Technologies",
    title: "Automobile CRM & Sales Management Portal",
    category: "ERP & Odoo Solutions",
    client: "Automobile Distribution Group",
    description:
      "A large automobile distributor needed a custom CRM to manage leads, track sales performance, and provide real-time dashboards to management. We built a Spring Boot and React application with role-based access, automated lead routing, and integration with their existing ERP. The system now handles 20,000+ leads annually and increased sales conversion by 15%.",
    image: "/projects/automobile_crm.png",
    technologies: ["Spring Boot", "Java", "MySQL", "React", "REST APIs", "JWT"],
    year: 2024,
    featured: true,
    projectOverview: `
      <p>
        The client, a distributor for multiple automotive brands, managed leads through spreadsheets and a basic CRM that couldn't scale. Sales reps wasted time on manual data entry, and management lacked visibility into the pipeline.
      </p>
      <p>
        We developed a custom CRM portal with:
      </p>
      <ul>
        <li><strong>Lead Management:</strong> Capture leads from website, showroom walk-ins, and call center. Automated lead scoring and assignment to sales reps based on territory and workload.</li>
        <li><strong>Sales Workflow:</strong> Track each lead from initial contact to test drive to sale, with automated follow-up reminders and email templates.</li>
        <li><strong>Performance Dashboards:</strong> Real-time charts for management showing conversion rates, sales by model, and individual rep performance.</li>
        <li><strong>Integration:</strong> REST APIs to sync with the existing ERP for inventory availability and invoicing.</li>
        <li><strong>Security:</strong> JWT-based authentication, role-based access (admin, manager, sales rep), and comprehensive audit logs.</li>
      </ul>
      <p>
        Post-deployment, lead response time dropped from 24 hours to under 1 hour. Sales conversion improved by 15%, and the company gained the ability to forecast sales with 90% accuracy. The system now handles peak loads of 500 concurrent users during promotional events.
      </p>
    `,
  },
  {
    id: "cabinminutes",
    slug: "cabinminutes-booking-system",
    metaTitle: "CabinMinutes – Cab Booking System | Zavior Technologies",
    metaDescription:
      "Mobile-friendly cab booking web app with Google Maps, fare estimation, and Stripe payments. Streamline dispatch, reduce errors, and improve customer experience.",
    canonical:
      "https://zaviortech.vercel.app/portfolio/cabinminutes-booking-system",
    metaKeywords:
      "Cab Booking App, PWA Taxi System, WordPress Booking Platform, Google Maps Integration, Stripe Payment Integration, Zavior Technologies",
    title: "CabinMinutes – Cab Booking System (Australia)",
    category: "Web Development",
    client: "CabinMinutes Australia",
    description:
      "CabinMinutes, an Australian taxi service, needed a mobile-friendly booking platform to replace their phone-based system. We developed a responsive web app (PWA) with Google Maps integration, fare estimation, and Stripe payments. The platform now processes over 1,000 bookings weekly with a 4.8-star user rating and has reduced dispatch errors to near zero.",
    image: "/projects/cabinmint.png",
    technologies: [
      "WordPress",
      "Booking Plugin",
      "Google Maps API",
      "Stripe Payments",
      "PWA",
    ],
    year: 2025,
    featured: true,
    projectOverview: `
      <p>
        The client relied on phone calls and a manual dispatch board, leading to missed bookings, long wait times, and customer dissatisfaction. They wanted a digital solution that would allow customers to book, track, and pay via their smartphones.
      </p>
      <p>
        We built a Progressive Web App (PWA) on WordPress with customizations:
      </p>
      <ul>
        <li><strong>Mobile-First UX:</strong> A streamlined booking flow optimized for touch, with auto-complete address fields and real-time fare estimates using Google Maps Distance Matrix API.</li>
        <li><strong>Driver Allocation:</strong> Admin panel to assign drivers, track vehicle availability, and send automatic SMS alerts to customers.</li>
        <li><strong>Stripe Integration:</strong> Secure online payments with support for credit cards and digital wallets, plus automatic invoicing.</li>
        <li><strong>Real-Time Tracking:</strong> Customers can see their driver's ETA on a map after booking.</li>
        <li><strong>Offline Capability:</strong> PWA features allow the app to work on flaky connections and send booking data when back online.</li>
      </ul>
      <p>
        The platform has transformed the business: bookings increased by 300% within six months, no-show rates dropped due to pre-payments, and driver utilization improved by 25%. The client has since expanded to two additional cities.
      </p>
    `,
  },

  // ==============================
  // 4️⃣ CORE IT INFRASTRUCTURE
  // ==============================
  {
    id: "it-hardware-services",
    slug: "core-it-infrastructure-services",
    metaTitle:
      "Enterprise IT & Hardware Infrastructure Services | Zavior Technologies",
    metaDescription:
      "Comprehensive IT infrastructure setup for corporate clients. Servers, networking, CCTV, and workstations with scalable design and zero downtime migration.",
    canonical:
      "https://zaviortech.vercel.app/portfolio/core-it-infrastructure-services",
    metaKeywords:
      "IT Infrastructure Services, Enterprise IT Setup, Networking Solutions, CCTV Installation, VMware Deployment, Zavior Technologies UAE",
    title: "Enterprise IT & Hardware Infrastructure Setup",
    category: "Core IT Infrastructure",
    client: "Corporate & Industrial Clients (UAE)",
    description:
      "A UAE-based group with offices across the region required a complete IT infrastructure overhaul: new servers, networking, CCTV surveillance, and workstation setup for 200+ employees. We designed and implemented a scalable solution with Dell servers, Meraki networking, and a centralized monitoring system. The project was completed on time and under budget, with zero downtime during migration.",
    image: "/projects/it-hardware.png",
    technologies: [
      "Dell PowerEdge",
      "Cisco Meraki",
      "CCTV Systems",
      "VMware",
      "Synology NAS",
    ],
    year: 2025,
    featured: false,
    projectOverview: `
      <p>
        The client, a fast-expanding conglomerate, had outgrown their existing IT setup. Frequent outages, slow network speeds, and lack of centralized security were hampering operations. They needed a future-proof infrastructure to support their growth.
      </p>
      <p>
        We delivered a turnkey solution:
      </p>
      <ul>
        <li><strong>Server Virtualization:</strong> Deployed Dell PowerEdge servers with VMware vSphere to consolidate workloads and enable high availability.</li>
        <li><strong>Networking:</strong> Installed Cisco Meraki switches and access points for centralized management, QoS for VoIP, and guest Wi-Fi portals.</li>
        <li><strong>Storage & Backup:</strong> Synology NAS with RAID configuration and off-site replication to ensure data safety.</li>
        <li><strong>CCTV Surveillance:</strong> IP cameras with 90-day retention, remote viewing, and motion detection alerts.</li>
        <li><strong>Workstation Setup:</strong> Standardized desktop and laptop configurations with Windows 11, Office 365, and endpoint protection.</li>
        <li><strong>Migration:</strong> Weekend cutover with zero data loss and minimal disruption; all users were operational by Monday morning.</li>
      </ul>
      <p>
        The new infrastructure reduced downtime by 99%, improved file access speeds by 300%, and provided management with a single dashboard to monitor network health. The client has since engaged us for two additional office expansions.
      </p>
    `,
  },

  // ==============================
  // 5️⃣ AI AUTOMATION
  // ==============================
  {
    id: "ai-insights-dashboard",
    slug: "ai-insights-dashboard",
    metaTitle: "AI Insights & Reporting Dashboard | Zavior Technologies",
    metaDescription:
      "AI-powered analytics dashboard for predictive insights. FastAPI backend, OpenAI summaries, and Power BI visualizations to automate reporting and reduce analyst workload.",
    canonical: "https://zaviortech.vercel.app/portfolio/ai-insights-dashboard",
    metaKeywords:
      "AI Dashboard, Predictive Analytics Platform, OpenAI Integration, Power BI Reporting, FastAPI Analytics, Zavior Technologies",
    title: "AI Insights & Reporting Dashboard",
    category: "AI Automation",
    client: "Data Analytics Firm",
    description:
      "A data analytics firm wanted to offer predictive insights to their clients but lacked the infrastructure. We built an AI-powered dashboard using Python/FastAPI backend, integrating OpenAI API for natural language summaries, and Power BI for visualizations. The platform now serves 50+ enterprise clients, automating weekly reports and reducing analysts' workload by 70%.",
    image: "/projects/ai-dashboard.png",
    technologies: [
      "Python",
      "FastAPI",
      "Power BI",
      "OpenAI API",
      "Docker",
      "AWS",
    ],
    year: 2025,
    featured: true,
    projectOverview: `
      <p>
        The client's team spent hours manually compiling data from various sources and writing narrative reports. They needed a way to scale their services without proportionally increasing headcount.
      </p>
      <p>
        We developed an AI Insights platform:
      </p>
      <ul>
        <li><strong>Data Ingestion:</strong> Automated ETL pipelines to pull data from client databases, spreadsheets, and APIs into a centralized data warehouse.</li>
        <li><strong>Predictive Modeling:</strong> Time-series forecasting using Prophet and scikit-learn to predict sales, churn, and inventory needs.</li>
        <li><strong>Natural Language Generation:</strong> OpenAI API generates executive summaries, highlighting key trends and anomalies.</li>
        <li><strong>Interactive Dashboards:</strong> Power BI embedded in a web portal, refreshed daily with the latest data.</li>
        <li><strong>Alerting:</strong> Custom rules to detect deviations and send Slack/email notifications.</li>
      </ul>
      <p>
        The system now produces weekly reports for 50+ clients, saving 200+ analyst hours per week. Clients praise the timely insights, and the firm has increased their average contract value by 40% by including AI-driven recommendations.
      </p>
    `,
  },
  {
    id: "linkedin-make-automation",
    slug: "linkedin-make-automation",
    metaTitle:
      "LinkedIn & Workflow Automation with Make.com | Zavior Technologies",
    metaDescription:
      "Automate LinkedIn lead generation and CRM integration with Make.com. Clearbit enrichment, automated follow-ups, and pipeline reporting to increase qualified leads.",
    canonical:
      "https://zaviortech.vercel.app/portfolio/linkedin-make-automation",
    metaKeywords:
      "LinkedIn Automation, Make.com Workflows, Odoo CRM Automation, Lead Enrichment, Marketing Automation, Zavior Technologies",
    title: "LinkedIn & Workflow Automation with Make.com",
    category: "AI Automation",
    client: "B2B Marketing Team",
    description:
      "A B2B marketing team needed to streamline lead generation from LinkedIn. We built an automation using Make.com to scrape profile data, enrich it with Clearbit, and sync to Odoo CRM with automated follow-up sequences. The system saves 30 hours weekly and has increased qualified leads by 50%.",
    image: "/projects/linedin-automation.png",
    technologies: [
      "Make.com",
      "LinkedIn API",
      "Odoo CRM",
      "Google Sheets",
      "Clearbit",
    ],
    year: 2025,
    featured: true,
    projectOverview: `
      <p>
        The marketing team manually searched LinkedIn for prospects, copied data into spreadsheets, and then imported into CRM. This process was slow and error-prone, limiting their outreach volume.
      </p>
      <p>
        We designed an automated workflow:
      </p>
      <ul>
        <li><strong>LinkedIn Scraper:</strong> A browser automation (via Make.com) that extracts profile data based on search criteria (title, industry, location).</li>
        <li><strong>Data Enrichment:</strong> Clearbit API adds company size, revenue, and tech stack information.</li>
        <li><strong>CRM Sync:</strong> New leads are automatically created in Odoo CRM with tags, notes, and assigned to the appropriate sales rep.</li>
        <li><strong>Follow-up Automation:</strong> If a lead reaches a certain score, an email sequence is triggered from Odoo.</li>
        <li><strong>Reporting:</strong> Google Sheets dashboard updated daily with pipeline metrics.</li>
      </ul>
      <p>
        The automation now runs 24/7, adding 500+ vetted leads per week to the CRM. The team has shifted from data entry to strategic outreach, resulting in a 50% increase in SQLs and a 20% boost in conversion rates.
      </p>
    `,
  },
  {
    id: "n8n-marketing-automation",
    slug: "n8n-marketing-automation",
    metaTitle: "Marketing Automation Pipelines using n8n | Zavior Technologies",
    metaDescription:
      "Automate reporting and lead nurturing across email, social media, and CRM using n8n. Consolidate data, generate dashboards, and trigger personalized email sequences.",
    canonical:
      "https://zaviortech.vercel.app/portfolio/n8n-marketing-automation",
    metaKeywords:
      "Marketing Automation, n8n Workflows, CRM Automation, Email Marketing Automation, Google Data Studio Dashboards, Zavior Technologies",
    title: "Marketing Automation Pipelines using n8n",
    category: "AI Automation",
    client: "Digital Agency (Remote)",
    description:
      "A digital agency managing multiple client campaigns needed to automate reporting and lead nurturing across email, social media, and CRM. We built custom n8n workflows that pull data from various platforms, consolidate into Google Data Studio dashboards, and trigger personalized email sequences. The agency now saves 40 hours per week and offers real-time reporting to clients.",
    image: "/projects/n8n-automation.png",
    technologies: [
      "n8n",
      "Odoo",
      "SMTP",
      "Google Drive API",
      "Google Data Studio",
      "Facebook Graph API",
    ],
    year: 2025,
    featured: false,
    projectOverview: `
      <p>
        The agency struggled with manual reporting for each client, pulling data from Facebook Ads, Google Analytics, and CRM into Excel. This consumed hours every week and delayed insights.
      </p>
      <p>
        We implemented n8n workflows:
      </p>
      <ul>
        <li><strong>Data Aggregation:</strong> Scheduled workflows fetch ad performance, website traffic, and lead data from APIs and store in Google Sheets.</li>
        <li><strong>CRM Integration:</strong> New leads from Facebook Lead Ads are automatically created in Odoo, tagged by campaign, and enrolled in email sequences.</li>
        <li><strong>Personalized Email:</strong> Based on lead behavior (e.g., visited pricing page), an n8n workflow triggers a tailored follow-up email via SMTP.</li>
        <li><strong>Client Dashboards:</strong> Google Data Studio pulls from the aggregated sheets to provide real-time, interactive dashboards that clients can access anytime.</li>
        <li><strong>Error Handling:</strong> Alerts sent to Slack if any data fetch fails.</li>
      </ul>
      <p>
        The agency now delivers daily updated dashboards to all clients, enhancing transparency and trust. Internal reporting time dropped by 80%, allowing the team to focus on strategy and campaign optimization.
      </p>
    `,
  },
  {
    id: "circular-intelligence-platform",
    slug: "circular-intelligence-platform",
    metaTitle:
      "Circular Intelligence & Traceability Platform | Zavior Technologies",
    metaDescription:
      "Odoo ERP integrated with AI for circular economy insights. Predict waste, optimize supply chains, and provide ESG reports for sustainability-focused enterprises.",
    canonical:
      "https://zaviortech.vercel.app/portfolio/circular-intelligence-platform",
    metaKeywords:
      "Circular Economy ERP, Odoo AI Platform, Sustainability Analytics, Waste Reduction Software, ESG Reporting Tool, Zavior Technologies",
    title: "Circular Intelligence & Traceability Platform",
    category: "AI Automation",
    client: "Sustainability Tech Firm",
    description:
      "A sustainability tech firm wanted to combine Odoo ERP with AI to provide circular economy insights to their clients. We developed a platform with a FastAPI AI layer that analyzes supply chain data from Odoo, predicts waste generation, and recommends optimization. The platform now serves 10 enterprise clients, helping them reduce waste by an average of 15%.",
    image: "/projects/circular_intelligence.png",
    technologies: ["Odoo", "React", "Python", "FastAPI", "Azure AI", "Docker"],
    year: 2025,
    featured: true,
    projectOverview: `
      <p>
        The client helps companies transition to circular economy models. They needed a way to ingest operational data from clients' ERPs and apply AI models to identify inefficiencies and opportunities.
      </p>
      <p>
        We built a two-layer solution:
      </p>
      <ul>
        <li><strong>Data Layer:</strong> Odoo instances for each client (or integration with their existing ERP) to collect production, inventory, and waste data.</li>
        <li><strong>AI Layer (FastAPI):</strong> Python microservices that run predictive models (Azure Machine Learning) to forecast waste generation, detect anomalies, and suggest process improvements.</li>
        <li><strong>React Dashboard:</strong> Interactive interface for clients to view their circularity metrics, compare against benchmarks, and receive AI-generated recommendations.</li>
        <li><strong>ESG Reporting:</strong> Automated generation of reports aligned with GRI and SASB standards.</li>
      </ul>
      <p>
        The platform has been adopted by 10 manufacturing clients. On average, they've reduced waste by 15% and improved material efficiency by 12%. The sustainability firm has used these results to secure additional funding and expand their team.
      </p>
    `,
  },
  {
    id: "crm-analytics-dashboard",
    slug: "crm-analytics-dashboard",
    metaTitle: "Enterprise CRM & Analytics Dashboard | Zavior Technologies",
    metaDescription:
      "Consolidate customer data from multiple touchpoints and provide real-time analytics using React, Node.js, and Power BI. Boost retention and personalized campaigns for enterprises.",
    canonical:
      "https://zaviortech.vercel.app/portfolio/crm-analytics-dashboard",
    metaKeywords:
      "Enterprise CRM, Analytics Dashboard, Customer Data Platform, React Node.js Dashboard, Power BI CRM Integration, Zavior Technologies",
    title: "Enterprise CRM & Analytics Dashboard",
    category: "AI Automation",
    client: "Corporate Clients (Confidential)",
    description:
      "A large enterprise needed to consolidate customer data from multiple touchpoints and provide real-time analytics to sales and marketing teams. We built a custom dashboard using React and Node.js, integrating with their existing CRM and data warehouse. The solution now processes millions of records daily, enabling personalized campaigns and increasing customer retention by 10%.",
    image: "/projects/crm_analytics.png",
    technologies: ["React", "Node.js", "MongoDB", "Power BI", "AWS", "Segment"],
    year: 2023,
    featured: false,
    projectOverview: `
      <p>
        The client had customer data scattered across Salesforce, support tickets, e-commerce platform, and email marketing tools. They wanted a unified view to understand customer behavior and identify churn risks.
      </p>
      <p>
        We created a centralized analytics platform:
      </p>
      <ul>
        <li><strong>Data Pipeline:</strong> Node.js microservices that pull data from various sources via APIs and store in MongoDB (for flexible schema) and a data warehouse for reporting.</li>
        <li><strong>Customer 360 View:</strong> React-based dashboard showing a single customer profile with all interactions, purchase history, and support tickets.</li>
        <li><strong>Predictive Churn Model:</strong> Machine learning model (scikit-learn) trained on historical data to flag at-risk customers.</li>
        <li><strong>Power BI Integration:</strong> Executive dashboards showing customer lifetime value, segment trends, and campaign performance.</li>
        <li><strong>Real-time Updates:</strong> WebSocket connections for live data during sales calls.</li>
      </ul>
      <p>
        The platform now serves 500+ internal users. The marketing team launched targeted retention campaigns that reduced churn by 10% in the first year. Sales reps can now access complete customer history before calls, improving win rates by 18%.
      </p>
    `,
  },

  // ==============================
  // 6️⃣ IT SOLUTIONS
  // ==============================
  {
    id: "logistics-it-strategy",
    slug: "logistics-it-strategy",
    metaTitle:
      "Digital Transformation & IT Strategy for Logistics | Zavior Technologies",
    metaDescription:
      "IT audit, cloud migration, and digital transformation roadmap for a global logistics provider. Reduce costs, integrate systems, and gain real-time visibility into shipments.",
    canonical: "https://zaviortech.vercel.app/portfolio/logistics-it-strategy",
    metaKeywords:
      "Logistics IT Strategy, Digital Transformation, Cloud Migration Logistics, IT Audit Services, System Integration Logistics, Zavior Technologies",
    title: "Digital Transformation & IT Strategy for Logistics Firm",
    category: "IT Solutions",
    client: "Global Logistics Provider (UAE)",
    description:
      "A global logistics company with operations in 15 countries engaged us to modernize their IT landscape. We conducted a comprehensive audit, developed a 3-year digital transformation roadmap, and led the implementation of cloud migration, system integration, and analytics. The project resulted in 30% lower IT costs, 99.9% system availability, and real-time visibility into global shipments.",
    image: "/projects/it_solutions_logistics.png",
    technologies: [
      "AWS",
      "Microsoft 365",
      "Salesforce",
      "Tableau",
      "Python",
      "MuleSoft",
    ],
    year: 2025,
    featured: true,
    projectOverview: `
      <p>
        The client's IT infrastructure had grown organically over two decades, resulting in siloed systems, manual processes, and high maintenance costs. They needed a strategic partner to guide them through digital transformation while ensuring business continuity.
      </p>
      <p>
        Our engagement included:
      </p>
      <ul>
        <li><strong>IT Audit & Assessment:</strong> Reviewed existing systems, identified redundancies, and benchmarked against industry best practices.</li>
        <li><strong>Strategic Roadmap:</strong> A phased 3-year plan covering cloud migration, ERP consolidation, and advanced analytics.</li>
        <li><strong>Cloud Migration:</strong> Moved 80% of on-premise workloads to AWS, leveraging EC2, RDS, and S3, with a hybrid model for legacy systems.</li>
        <li><strong>System Integration:</strong> Used MuleSoft to connect Salesforce CRM, their legacy TMS, and financial systems, enabling end-to-end shipment tracking.</li>
        <li><strong>Collaboration Suite:</strong> Deployed Microsoft 365 with Teams, SharePoint, and Power Automate to improve internal communication and automate approvals.</li>
        <li><strong>Analytics & BI:</strong> Tableau dashboards for real-time KPIs: on-time delivery, fleet utilization, and profitability by lane.</li>
      </ul>
      <p>
        Within 18 months, the company reduced IT operational costs by 30%, achieved 99.9% uptime for critical systems, and gained the ability to offer clients real-time tracking. The transformation has positioned them as a tech-forward leader in the logistics sector.
      </p>
    `,
  },
];

export const blogs = [
  // 1️⃣ AI Blog (already done)
  {
    id: "future-of-ai",
    title: "The Future of AI in Enterprise: Trends to Watch in 2026",
    slug: "future-of-ai-enterprise-2026",
    excerpt:
      "Discover key AI trends like autonomous agents, multimodal AI, and edge intelligence that will transform enterprise operations in 2026.",
    content: `
<p>Artificial Intelligence (AI) is rapidly transforming businesses worldwide, and enterprises in Dubai are no exception. As 2026 approaches, understanding emerging AI trends can give Dubai-based companies a competitive advantage in sectors like finance, logistics, healthcare, and e-commerce.</p>

<h2>The Rise of Autonomous AI Agents</h2>
<p>Autonomous AI agents are evolving beyond basic automation. These intelligent systems can handle complex, multi-step business workflows with minimal human intervention. In Dubai's fast-paced marketplaces, AI agents can manage tasks such as:</p>
<ul>
  <li>Customer support via chatbots and virtual assistants</li>
  <li>Supply chain automation and logistics optimization</li>
  <li>Financial forecasting and anomaly detection</li>
</ul>

<h2>Multimodal AI Integration</h2>
<p>Multimodal AI combines text, images, video, and audio processing to enable natural and intuitive human-computer interactions. Dubai enterprises can leverage multimodal AI to:</p>
<ul>
  <li>Analyze social media and customer feedback in real-time</li>
  <li>Generate AI-driven marketing content across multiple platforms</li>
  <li>Enhance e-commerce personalization for UAE customers</li>
</ul>

<h2>Edge AI and Decentralized Intelligence</h2>
<p>Edge AI processes data closer to the source, reducing latency, improving security, and enabling real-time analytics. Key benefits for Dubai enterprises include:</p>
<ul>
  <li>Faster decision-making for logistics and smart warehouses</li>
  <li>Enhanced data privacy compliance in sensitive sectors like healthcare and finance</li>
  <li>Reduced dependency on cloud infrastructure, optimizing operational costs</li>
</ul>

<h2>AI-Powered Decision Making for Dubai Enterprises</h2>
<p>AI adoption in Dubai’s marketplace is growing rapidly. Companies leveraging AI for predictive analytics, customer engagement, and operational automation are gaining a measurable competitive edge. Examples include:</p>
<ul>
  <li>AI-driven inventory management for retail chains</li>
  <li>Automated fraud detection in banking and finance</li>
  <li>Smart energy management solutions for real estate and manufacturing</li>
</ul>

<h2>Conclusion</h2>
<p>AI in 2026 is no longer experimental; it is a strategic driver of business value. Dubai enterprises embracing autonomous AI agents, multimodal integration, and edge intelligence will lead their industries in innovation, efficiency, and customer satisfaction.</p>

<p><strong>Looking to implement AI solutions for your Dubai enterprise?</strong> <a href="https://zaviortech.vercel.app/contact">Contact Zavior Technologies</a> to explore custom AI-driven solutions for your business growth.</p>
`,
    image: "/blog/ai-future.png",
    author: {
      name: "Sarah Chen",
      role: "Chief AI Officer",
      avatar: "/team/sarah-chen.jpg",
    },
    category: "Artificial Intelligence",
    readTime: "8 min read",
    publishedAt: "2026-01-15",
    featured: true,
    tags: [
      "AI",
      "Enterprise",
      "Autonomous Agents",
      "Edge AI",
      "Multimodal AI",
      "Dubai",
    ],
    metaTitle:
      "Future of AI in Enterprise 2026 | Dubai AI Trends | Zavior Technologies",
    metaDescription:
      "Explore key AI trends shaping enterprises in Dubai for 2026, including autonomous AI agents, multimodal AI, and edge intelligence. Stay ahead with Zavior Technologies.",
    keywords:
      "AI trends Dubai, Enterprise AI 2026, Autonomous Agents, Edge AI Dubai, Multimodal AI, AI Dubai businesses",
    canonical:
      "https://zaviortech.vercel.app/blog/future-of-ai-enterprise-2026",
  },

  // 2️⃣ Digital Transformation
  {
    id: "digital-transformation-guide",
    title: "A Complete Guide to Digital Transformation in 2026",
    slug: "digital-transformation-guide-2026",
    excerpt:
      "Learn how to drive successful digital transformation in 2026 with a holistic approach covering people, process, and technology.",
    content: `
<p>Digital transformation is essential for businesses in Dubai looking to remain competitive in 2026. It is not just about technology but about reimagining how your enterprise delivers value and engages with customers.</p>

<h2>Understanding Digital Transformation</h2>
<p>Digital transformation aligns people, processes, and technology. For Dubai-based organizations, this means:</p>
<ul>
  <li>Leveraging cloud and AI technologies to streamline operations</li>
  <li>Enhancing customer experience across digital platforms</li>
  <li>Driving agility and faster time-to-market for products</li>
</ul>

<h2>Key Pillars for Success</h2>
<ul>
  <li><strong>Leadership Commitment</strong>: Clear vision and investment from top management</li>
  <li><strong>Customer-Centric Approach</strong>: Focus on customer satisfaction and engagement</li>
  <li><strong>Agile Methodology</strong>: Iterative development for continuous improvement</li>
  <li><strong>Data-Driven Decision Making</strong>: Utilize analytics for informed business strategies</li>
</ul>

<h2>Impact on Dubai Enterprises</h2>
<p>Successful digital transformation helps Dubai businesses:</p>
<ul>
  <li>Accelerate revenue growth by improving operational efficiency</li>
  <li>Boost customer satisfaction with personalized digital experiences</li>
  <li>Enhance competitiveness in fast-moving industries like fintech, e-commerce, and logistics</li>
</ul>

<h2>Conclusion</h2>
<p>By adopting a holistic approach to digital transformation, Dubai companies can ensure sustainable growth and maintain a competitive edge.</p>

<p><strong>Ready to transform your Dubai enterprise?</strong> <a href="https://zaviortech.vercel.app/contact">Contact Zavior Technologies</a> for expert guidance.</p>
`,
    image: "/blog/digital-transformation.png",
    author: {
      name: "Mr  Mubeen Bahoo",
      role: "CEO",
      avatar: "/team/michael-roberts.jpg",
    },
    category: "IT Solutions",
    readTime: "12 min read",
    publishedAt: "2026-01-10",
    featured: true,
    tags: [
      "Digital Transformation",
      "Leadership",
      "Agile",
      "Customer Experience",
      "Data-Driven",
      "Dubai",
    ],
    metaTitle:
      "Digital Transformation Guide 2026 | Dubai Enterprises | Zavior Technologies",
    metaDescription:
      "Comprehensive guide for Dubai enterprises on successful digital transformation in 2026, covering people, processes, and technology. Zavior Technologies expertise included.",
    keywords:
      "Digital transformation Dubai, Enterprise digital strategy 2026, Agile Dubai, Customer Experience UAE, Technology adoption Dubai",
    canonical:
      "https://zaviortech.vercel.app/blog/digital-transformation-guide-2026",
  },

  // 3️⃣ Odoo Best Practices
  {
    id: "odoo-implementation-best-practices",
    title: "Odoo Implementation Best Practices: Lessons from 100+ Projects",
    slug: "odoo-implementation-best-practices",
    excerpt:
      "Learn best practices for Odoo ERP implementation to maximize efficiency, avoid pitfalls, and ensure successful adoption.",
    content: `
<p>Odoo ERP is a popular choice for Dubai enterprises looking to streamline operations and improve ROI. Having implemented 100+ projects, Zavior Technologies has gathered key best practices for success.</p>

<h2>1. Planning is Everything</h2>
<p>Requirements gathering, process mapping, and stakeholder alignment are essential. Dubai companies should also consider local compliance and VAT regulations.</p>

<h2>2. Standard Modules First</h2>
<p>Use Odoo’s standard modules (CRM, Sales, Inventory, Accounting) to leverage best practices. Customize only when business-critical requirements demand it.</p>

<h2>3. Change Management</h2>
<p>Train your teams thoroughly. User adoption drives ERP success. Provide user manuals, interactive workshops, and internal champions.</p>

<h2>4. Data Migration Strategy</h2>
<p>Clean and map your legacy data before migration. Accurate data ensures smooth transition and compliance with UAE business standards.</p>

<h2>5. Testing & Go-Live</h2>
<p>Use a staging environment, run UAT with key staff, and schedule go-live during low-activity periods.</p>

<h2>Conclusion</h2>
<p>Following these Odoo ERP best practices enables Dubai enterprises to achieve operational efficiency, improve reporting, and reduce errors.</p>

<p><strong>Want expert Odoo ERP implementation in Dubai?</strong> <a href="https://zaviortech.vercel.app/contact">Contact Zavior Technologies</a> today.</p>
`,
    image: "/blog/odoo-implementation.png",
    author: {
      name: "Ahmed Hassan",
      role: "Director of ERP Solutions",
      avatar: "/team/ahmed-hassan.jpg",
    },
    category: "ERP & Odoo Solutions",
    readTime: "10 min read",
    publishedAt: "2026-01-05",
    featured: false,
    tags: [
      "Odoo",
      "ERP",
      "Best Practices",
      "Implementation",
      "Change Management",
      "Dubai",
    ],
    metaTitle:
      "Odoo ERP Best Practices 2026 | Dubai Implementation | Zavior Technologies",
    metaDescription:
      "Discover proven Odoo ERP implementation best practices for Dubai enterprises. Maximize efficiency, compliance, and ROI with Zavior Technologies.",
    keywords:
      "Odoo ERP Dubai, ERP implementation UAE, Best practices Odoo, Dubai business ERP",
    canonical:
      "https://zaviortech.vercel.app/blog/odoo-implementation-best-practices",
  },

  // 4️⃣ Cybersecurity
  {
    id: "cybersecurity-trends",
    title: "Cybersecurity in 2026: Protecting Your Digital Assets in Dubai",
    slug: "cybersecurity-trends-2026",
    excerpt:
      "Understand the latest cybersecurity trends including AI-driven threats, zero trust models, and supply chain security in 2026.",
    content: `
<p>Cybersecurity is critical for Dubai enterprises in 2026. With increasing digitization, protecting data, customer information, and business operations has never been more important.</p>

<h2>AI-Powered Threats</h2>
<p>Cybercriminals use AI to automate attacks. Enterprises in Dubai must deploy AI-driven defense systems for real-time threat detection and prevention.</p>

<h2>Zero Trust Architecture</h2>
<p>Traditional perimeter-based security is obsolete. Zero Trust ensures no device or user is automatically trusted, enhancing security across networks and cloud platforms.</p>

<h2>Supply Chain Security</h2>
<p>Third-party vendors often introduce vulnerabilities. Dubai companies should monitor and vet partners, suppliers, and contractors to prevent breaches.</p>

<h2>Best Practices</h2>
<ul>
  <li>Regular audits and penetration testing</li>
  <li>Employee cybersecurity training</li>
  <li>Strong encryption for sensitive data</li>
  <li>Multi-factor authentication (MFA) across systems</li>
</ul>

<h2>Conclusion</h2>
<p>AI-driven security, zero trust, and robust monitoring help Dubai enterprises protect digital assets, ensure compliance, and maintain customer trust.</p>

<p><strong>Need cybersecurity solutions tailored for Dubai businesses?</strong> <a href="https://zaviortech.vercel.app/contact">Contact Zavior Technologies</a> for consultation.</p>
`,
    image: "/blog/cybersecurity.png",
    author: {
      name: "David Kim",
      role: "Chief Security Officer",
      avatar: "/team/david-kim.jpg",
    },
    category: "IT Solutions",
    readTime: "7 min read",
    publishedAt: "2025-12-20",
    featured: false,
    tags: [
      "Cybersecurity",
      "Zero Trust",
      "AI Security",
      "Supply Chain Security",
      "Dubai",
    ],
    metaTitle:
      "Cybersecurity Trends 2026 | Dubai Enterprise Security | Zavior Technologies",
    metaDescription:
      "Learn about cybersecurity trends for Dubai enterprises in 2026, including AI-driven threats, zero trust architecture, and supply chain protection. Zavior Technologies expertise included.",
    keywords:
      "Cybersecurity Dubai 2026, AI Security UAE, Zero Trust Dubai, Supply Chain Security Dubai",
    canonical: "https://zaviortech.vercel.app/blog/cybersecurity-trends-2026",
  },

  // 5️⃣ Mobile App Development
  {
    id: "mobile-app-development-trends",
    title: "Mobile App Development Trends Shaping 2026 in Dubai",
    slug: "mobile-app-development-trends-2026",
    excerpt:
      "Explore the latest trends in mobile app development including cross-platform frameworks, AI-first experiences, and super apps.",
    content: `
<p>Mobile applications are central to business growth in Dubai. In 2026, enterprises must adopt modern trends to engage customers effectively.</p>

<h2>Cross-Platform Development</h2>
<p>Frameworks like Flutter and React Native allow Dubai enterprises to build high-performance apps across Android and iOS with faster development cycles.</p>

<h2>AI-First Mobile Experiences</h2>
<p>On-device AI enables real-time translation, intelligent recommendations, and personalized experiences for UAE users.</p>

<h2>Super Apps and Mini Programs</h2>
<p>Super apps consolidate services like payments, e-commerce, booking, and messaging into a single platform, increasing user retention and engagement.</p>

<h2>Conclusion</h2>
<p>Cross-platform apps, AI-driven personalization, and super apps will define mobile development in Dubai, giving enterprises a competitive advantage.</p>

<p><strong>Ready to build a Dubai-focused mobile app?</strong> <a href="https://zaviortech.vercel.app/contact">Contact Zavior Technologies</a> today.</p>
`,
    image: "/blog/mobile-development.png",
    author: {
      name: "Lisa Wong",
      role: "Head of Mobile Development",
      avatar: "/team/lisa-wong.jpg",
    },
    category: "Mobile Applications",
    readTime: "6 min read",
    publishedAt: "2025-12-15",
    featured: false,
    tags: ["Mobile Apps", "Dubai", "AI Mobile", "Super Apps", "Cross-Platform"],
    metaTitle:
      "Mobile App Development Trends 2026 | Dubai Enterprises | Zavior Technologies",
    metaDescription:
      "Discover mobile app development trends for Dubai businesses in 2026, including cross-platform frameworks, AI-first apps, and super apps. Zavior Technologies expertise included.",
    keywords:
      "Mobile app Dubai, Cross-platform apps UAE, AI mobile apps Dubai, Super Apps Dubai",
    canonical:
      "https://zaviortech.vercel.app/blog/mobile-app-development-trends-2026",
  },

  // 6️⃣ Odoo Implementation Success (already updated previously)
  {
    id: "odoo-implementation-success",
    title:
      "Odoo Implementation Success: A Step-by-Step Guide for Growing Businesses",
    slug: "odoo-implementation-success-guide",
    excerpt:
      "Learn how to implement Odoo ERP effectively, avoid common pitfalls, and achieve rapid ROI with expert strategies from Zavior Technologies.",
    content: `<p>Implementing Odoo ERP can transform your Dubai business—but only if done right. Based on Zavior Technologies’ experience, here’s a step-by-step guide for success.</p>

<h2>1. Define Clear Objectives</h2>
<p>Identify goals like streamlining inventory, improving financial reporting, or automating sales processes.</p>

<h2>2. Choose the Right Modules</h2>
<p>Start with core modules: CRM, Sales, Inventory, Accounting. Customize only when needed.</p>

<h2>3. Data Migration Strategy</h2>
<p>Clean and map legacy data to ensure smooth transition and UAE compliance.</p>

<h2>4. User Training & Change Management</h2>
<p>Conduct hands-on sessions and appoint internal champions.</p>

<h2>5. Test Thoroughly</h2>
<p>Run UAT in a staging environment and fix issues pre-launch.</p>

<h2>6. Go Live & Support</h2>
<p>Schedule go-live at low-activity periods and provide on-hand support.</p>

<h2>7. Continuous Improvement</h2>
<p>Review processes regularly and leverage Odoo updates to maintain efficiency.</p>

<p><strong>Need expert Odoo ERP implementation in Dubai?</strong> <a href="https://zaviortech.vercel.app/contact">Contact Zavior Technologies</a>.</p>`,
    image: "/blog/odoo-implementation-guide.png",
    author: {
      name: "Aarav Mehta",
      role: "ERP Implementation Lead",
      avatar: "/team/aarav-mehta.jpg",
    },
    category: "ERP & Odoo Solutions",
    readTime: "9 min read",
    publishedAt: "2026-02-10",
    featured: true,
    tags: ["Odoo", "ERP Implementation", "Dubai", "Zavior Technologies"],
    metaTitle:
      "Odoo ERP Implementation Success 2026 | Dubai | Zavior Technologies",
    metaDescription:
      "Step-by-step guide for Odoo ERP success for Dubai businesses. Avoid pitfalls and maximize ROI with Zavior Technologies’ expertise.",
    keywords:
      "Odoo ERP Dubai, ERP Implementation UAE, ERP success Dubai, Zavior Technologies ERP",
    canonical:
      "https://zaviortech.vercel.app/blog/odoo-implementation-success-guide",
  },

  // 7️⃣ Custom ERP with Spring Boot
  {
    id: "custom-erp-spring-boot",
    title:
      "Building Custom ERPs with Spring Boot: Scalability, Security, and Speed",
    slug: "custom-erp-spring-boot",
    excerpt:
      "Discover why Spring Boot is the ideal framework for developing custom enterprise ERPs that can scale with your business and integrate seamlessly.",
    content: `<p>Dubai enterprises often need custom ERP solutions for unique workflows. Spring Boot allows building scalable, secure, and flexible ERPs.</p>

<h2>Why Spring Boot for ERP Development?</h2>
<ul>
<li>Microservices ready for modular deployment</li>
<li>Enterprise-grade security with Spring Security</li>
<li>Seamless database integration via Spring Data JPA</li>
<li>API-first design for future integrations</li>
</ul>

<h2>Key Considerations</h2>
<ul>
<li>Requirement analysis with stakeholder involvement</li>
<li>Scalable architecture from day one</li>
<li>Robust testing & CI/CD pipelines</li>
<li>Role-based security and encryption</li>
</ul>

<h2>Example</h2>
<p>A logistics company in Dubai saw 30% reduction in manual work after we implemented a Spring Boot ERP integrated with warehouse systems.</p>

<p><strong>Explore custom ERP solutions for your Dubai business.</strong> <a href="https://zaviortech.vercel.app/contact">Contact Zavior Technologies</a>.</p>`,
    image: "/blog/spring-boot-erp.png",
    author: {
      name: "Priya Sharma",
      role: "Senior Software Architect",
      avatar: "/team/priya-sharma.jpg",
    },
    category: "ERP & Odoo Solutions",
    readTime: "11 min read",
    publishedAt: "2026-02-05",
    featured: true,
    tags: ["Spring Boot", "Custom ERP", "Dubai", "Zavior Technologies"],
    metaTitle: "Custom ERP with Spring Boot | Dubai | Zavior Technologies",
    metaDescription:
      "Build scalable and secure custom ERPs for Dubai enterprises using Spring Boot. Learn best practices from Zavior Technologies.",
    keywords:
      "Custom ERP Dubai, Spring Boot ERP UAE, Enterprise ERP Dubai, Zavior Technologies",
    canonical: "https://zaviortech.vercel.app/blog/custom-erp-spring-boot",
  },

  // 8️⃣ Legacy ERP Modernization
  {
    id: "legacy-to-modern-erp",
    title:
      "From Legacy to Leading: Why Modernizing Your ERP Is No Longer Optional",
    slug: "legacy-to-modern-erp",
    excerpt:
      "Outdated ERP systems are holding businesses back. Learn the risks of sticking with legacy software and the benefits of moving to modern platforms like Odoo or custom-built solutions.",
    content: `<p>Many Dubai enterprises still run on legacy ERP systems—clunky, expensive, and inflexible. Modernization ensures competitiveness and efficiency.</p>

<h2>Risks of Legacy ERP</h2>
<ul>
<li>High maintenance costs and lack of skilled resources</li>
<li>Poor integration with modern tools (AI, IoT, e-commerce)</li>
<li>Subpar UX and employee frustration</li>
<li>Security vulnerabilities and compliance gaps</li>
</ul>

<h2>Benefits of Modern ERP</h2>
<ul>
<li>Real-time data insights for better decision-making</li>
<li>Scalable cloud or hybrid deployment</li>
<li>Mobility: Access anywhere, any device</li>
<li>Automation of workflows and AI integration</li>
<li>Regulatory compliance in UAE</li>
</ul>

<h2>Modernization Options</h2>
<ul>
<li>Migrate to Odoo for proven, cost-effective ERP</li>
<li>Custom ERP for complex workflows using frameworks like Spring Boot</li>
</ul>

<h2>Conclusion</h2>
<p>Modernizing ERP in Dubai is critical for efficiency, growth, and competitiveness.</p>

<p><strong>Start your ERP modernization journey.</strong> <a href="https://zaviortech.vercel.app/contact">Contact Zavior Technologies</a> today.</p>`,
    image: "/blog/legacy-modernization.png",
    author: {
      name: "Vikram Singh",
      role: "Director of Consulting",
      avatar: "/team/vikram-singh.jpg",
    },
    category: "ERP Strategy",
    readTime: "10 min read",
    publishedAt: "2026-01-28",
    featured: false,
    tags: [
      "Legacy Systems",
      "ERP Modernization",
      "Dubai",
      "Zavior Technologies",
    ],
    metaTitle:
      "ERP Modernization 2026 | Dubai Legacy Systems | Zavior Technologies",
    metaDescription:
      "Learn why modernizing legacy ERP systems is critical for Dubai enterprises. Explore Odoo and custom ERP solutions with Zavior Technologies.",
    keywords:
      "ERP modernization Dubai, Legacy ERP UAE, Odoo Dubai, Custom ERP Dubai",
    canonical: "https://zaviortech.vercel.app/blog/legacy-to-modern-erp",
  },

  // 9️⃣ New Blog: AI-Powered ERP
  {
    id: "ai-powered-erp",
    title: "AI-Powered ERP: Driving Intelligent Enterprise Operations in Dubai",
    slug: "ai-powered-erp-dubai",
    excerpt:
      "Discover how AI-integrated ERP systems optimize operations, improve insights, and accelerate growth for Dubai businesses in 2026.",
    content: `<p>AI is transforming ERP systems into intelligent platforms. Dubai enterprises can leverage AI-powered ERP to automate workflows, predict trends, and improve decision-making.</p>

<h2>Key Benefits</h2>
<ul>
<li>Automated financial reporting and predictive analytics</li>
<li>Smart inventory and demand forecasting</li>
<li>Enhanced customer engagement via AI-driven CRM</li>
<li>Optimized workforce and task allocation</li>
</ul>

<h2>Conclusion</h2>
<p>Dubai businesses adopting AI-powered ERP gain efficiency, agility, and competitive advantage.</p>

<p><strong>Explore AI-driven ERP solutions.</strong> <a href="https://zaviortech.vercel.app/contact">Contact Zavior Technologies</a>.</p>`,
    image: "/blog/ai-erp.png",
    author: {
      name: "Rashid Al Mansoori",
      role: "ERP AI Specialist",
      avatar: "/team/rashid-al-mansoori.jpg",
    },
    category: "AI ERP",
    readTime: "8 min read",
    publishedAt: "2026-02-18",
    featured: true,
    tags: ["AI ERP", "Dubai", "ERP Automation", "Zavior Technologies"],
    metaTitle: "AI-Powered ERP in Dubai 2026 | Zavior Technologies",
    metaDescription:
      "Discover AI-powered ERP solutions for Dubai enterprises. Automate workflows and gain predictive insights with Zavior Technologies.",
    keywords:
      "AI ERP Dubai, Intelligent ERP UAE, ERP automation Dubai, AI-driven ERP",
    canonical: "https://zaviortech.vercel.app/blog/ai-powered-erp-dubai",
  },

  // 10️⃣ New Blog: Cloud ERP Adoption Dubai
  {
    id: "cloud-erp-adoption",
    title:
      "Cloud ERP Adoption in Dubai: Benefits, Challenges, and Best Practices",
    slug: "cloud-erp-adoption-dubai",
    excerpt:
      "Learn why Dubai businesses are moving to cloud ERP solutions, how to overcome challenges, and best practices for successful adoption.",
    content: `<p>Cloud ERP adoption in Dubai is accelerating as enterprises seek scalable, cost-effective, and flexible systems. Cloud-based solutions provide real-time access, enhanced collaboration, and faster deployment.</p>

<h2>Benefits of Cloud ERP</h2>
<ul>
<li>Scalability for growing Dubai enterprises</li>
<li>Lower upfront costs and predictable subscriptions</li>
<li>Remote access from any device for a mobile workforce</li>
<li>Regular updates and AI-enhanced features</li>
</ul>

<h2>Challenges & Mitigation</h2>
<ul>
<li>Data privacy and UAE compliance — ensure secure cloud hosting</li>
<li>Change management — train staff and communicate benefits</li>
<li>Integration with legacy systems — plan phased migration</li>
</ul>

<h2>Conclusion</h2>
<p>Cloud ERP adoption enables Dubai businesses to improve agility, reduce costs, and drive digital transformation.</p>

<p><strong>Ready to migrate to Cloud ERP?</strong> <a href="https://zaviortech.vercel.app/contact">Contact Zavior Technologies</a> today.</p>`,
    image: "/blog/cloud-erp.png",
    author: {
      name: "Fatima Al Suwaidi",
      role: "Cloud ERP Consultant",
      avatar: "/team/fatima-al-suwaidi.jpg",
    },
    category: "Cloud ERP",
    readTime: "9 min read",
    publishedAt: "2026-02-20",
    featured: true,
    tags: ["Cloud ERP", "Dubai", "ERP Migration", "Zavior Technologies"],
    metaTitle: "Cloud ERP Adoption Dubai 2026 | Zavior Technologies",
    metaDescription:
      "Dubai businesses adopting cloud ERP gain flexibility, scalability, and real-time insights. Learn benefits and best practices with Zavior Technologies.",
    keywords:
      "Cloud ERP Dubai, ERP migration UAE, Cloud ERP adoption Dubai, Zavior Technologies",
    canonical: "https://zaviortech.vercel.app/blog/cloud-erp-adoption-dubai",
  },
  {
  id: "stop-spreadsheet-chaos",
  title: "Stop Spreadsheet Chaos: Why Dubai Businesses Are Moving to Odoo ERP",
  slug: "stop-spreadsheet-chaos-odoo-erp-dubai",
  excerpt:
    "Frustrated with endless spreadsheets? Discover how Dubai businesses streamline operations, improve accuracy, and gain insights with Odoo ERP in 2026.",
  content: `
<p>Spreadsheets were once the backbone of business operations—but for many Dubai enterprises in 2026, they have become a source of frustration, errors, and wasted time. Endless rows of data, missing formulas, and manual reconciliation slow down decision-making and make scaling almost impossible.</p>

<h2>The Spreadsheet Problem in Dubai Enterprises</h2>
<p>Dubai-based companies across retail, logistics, manufacturing, and services often rely on multiple spreadsheets for inventory, sales, finance, and HR. Common challenges include:</p>
<ul>
<li>Human errors in data entry leading to costly mistakes</li>
<li>Time-consuming reconciliation across departments</li>
<li>Lack of real-time insights for informed decisions</li>
<li>Difficulty in scaling operations as business grows</li>
<li>Poor compliance with UAE VAT and regulatory requirements</li>
</ul>

<h2>Why Odoo ERP Is the Solution</h2>
<p>Odoo ERP transforms fragmented spreadsheets into a single, integrated system. Benefits for Dubai enterprises include:</p>
<ul>
<li><strong>Centralized Data Management</strong>: All departments access real-time data from one platform</li>
<li><strong>Improved Accuracy</strong>: Reduce human error with automated calculations and validations</li>
<li><strong>Better Decision Making</strong>: Dashboards and analytics provide insights at a glance</li>
<li><strong>Scalable Operations</strong>: Easily add modules as your business grows</li>
<li><strong>Regulatory Compliance</strong>: Automated VAT handling and audit-ready reports for UAE laws</li>
</ul>

<h2>Real Dubai Use Cases</h2>
<p>Several Dubai enterprises have replaced spreadsheet chaos with Odoo ERP and experienced measurable results:</p>
<ul>
<li>A retail chain reduced stock discrepancies by 40% and improved order fulfillment speed</li>
<li>A logistics firm automated invoicing, saving 20 hours per week in manual work</li>
<li>A service company gained real-time project insights, allowing managers to allocate resources efficiently</li>
</ul>

<h2>Conclusion</h2>
<p>If your team is wasting hours navigating spreadsheets, it’s time to consider Odoo ERP. Centralize operations, improve accuracy, and make data-driven decisions that accelerate growth in Dubai’s competitive marketplace.</p>

<p><strong>Ready to leave spreadsheet chaos behind?</strong> <a href="https://zaviortech.vercel.app/contact">Contact Zavior Technologies</a> today for a free consultation and discover how Odoo ERP can transform your Dubai enterprise.</p>
`,
  image: "/blog/stop-spreadsheet-chaos.png",
  author: {
    name: "Mureed Sultan",
    role: "ERP Solutions Architect",
    avatar: "/team/mureed-sultan.jpg",
  },
  category: "ERP & Odoo Solutions",
  readTime: "10 min read",
  publishedAt: "2026-03-04",
  featured: true,
  tags: ["Odoo", "ERP Dubai", "Spreadsheet Alternatives", "Dubai Businesses", "ERP Solutions"],
  metaTitle:
    "Stop Spreadsheet Chaos | Odoo ERP Dubai 2026 | Zavior Technologies",
  metaDescription:
    "Dubai businesses frustrated with spreadsheets are moving to Odoo ERP. Centralize data, reduce errors, and make smarter decisions with Zavior Technologies.",
  keywords:
    "Odoo ERP Dubai, ERP Dubai 2026, Spreadsheet replacement Dubai, ERP implementation UAE, Dubai business solutions",
  canonical:
    "https://zaviortech.vercel.app/blog/stop-spreadsheet-chaos-odoo-erp-dubai",
},

// 14️⃣ Ditch Manual Processes – Odoo ERP Advantage
{
  id: "ditch-manual-processes-odoo",
  title: "Ditch Manual Processes: How Odoo ERP Transforms Dubai Enterprises",
  slug: "ditch-manual-processes-odoo-erp-dubai",
  excerpt:
    "Manual processes slow your Dubai business. Learn how Odoo ERP automates, streamlines, and provides insights for smarter decisions in 2026.",
  content: `
<p>Manual processes—copying data between spreadsheets, generating reports by hand, and reconciling accounts—are a major productivity killer for Dubai enterprises. In 2026, relying on these outdated methods can lead to errors, wasted hours, and missed business opportunities.</p>

<h2>The Cost of Manual Operations</h2>
<p>Dubai businesses relying on manual methods face challenges such as:</p>
<ul>
<li>Data duplication and inconsistent records</li>
<li>Slow financial closing and reporting cycles</li>
<li>Delayed decision-making due to fragmented information</li>
<li>Employee frustration and high turnover</li>
<li>Limited scalability as the company grows</li>
</ul>

<h2>Odoo ERP: Streamline and Scale</h2>
<p>Odoo ERP provides a single platform to manage all critical operations, replacing manual workflows with structured, automated processes. Key benefits include:</p>
<ul>
<li><strong>Integrated Modules</strong>: Finance, HR, Inventory, Sales, and CRM all in one system</li>
<li><strong>Real-Time Analytics</strong>: Make faster, smarter decisions with dashboards and live reports</li>
<li><strong>Regulatory Compliance</strong>: Automatic VAT calculation and audit-ready reporting for UAE businesses</li>
<li><strong>Collaboration Made Easy</strong>: Teams across departments work on shared, up-to-date information</li>
<li><strong>Scalable Growth</strong>: Add modules and features as business complexity increases</li>
</ul>

<h2>Dubai Success Stories</h2>
<p>Enterprises in Dubai that adopted Odoo ERP report significant improvements:</p>
<ul>
<li>A retail business reduced monthly reporting from 3 days to a few hours</li>
<li>A service provider improved client invoicing speed by 50%</li>
<li>HR teams automated leave and payroll processing, saving valuable time</li>
</ul>

<h2>Conclusion</h2>
<p>If your Dubai enterprise struggles with manual processes, Odoo ERP is the solution to centralize operations, eliminate errors, and unlock growth. Stop losing hours every week to repetitive tasks and focus on scaling your business.</p>

<p><strong>Ready to transform your operations?</strong> <a href="https://zaviortech.vercel.app/contact">Contact Zavior Technologies</a> to implement Odoo ERP tailored for Dubai businesses.</p>
`,
  image: "/blog/ditch-manual-processes.png",
  author: {
    name: "Mr. Mubeen Bahoo",
    role: "CEO & ERP Strategist",
    avatar: "/team/mubeen-bahoo.jpg",
  },
  category: "ERP & Odoo Solutions",
  readTime: "11 min read",
  publishedAt: "2026-03-05",
  featured: true,
  tags: ["Odoo", "ERP Dubai", "Manual Process Replacement", "Dubai Enterprises", "ERP Implementation"],
  metaTitle:
    "Ditch Manual Processes | Odoo ERP Dubai 2026 | Zavior Technologies",
  metaDescription:
    "Manual processes slow Dubai businesses. Discover how Odoo ERP streamlines operations, reduces errors, and provides actionable insights with Zavior Technologies.",
  keywords:
    "Odoo ERP Dubai, ERP implementation UAE, Replace manual processes Dubai, ERP Dubai businesses, Dubai ERP solution",
  canonical:
    "https://zaviortech.vercel.app/blog/ditch-manual-processes-odoo-erp-dubai",
},
];

export const team = [
  {
    id: "mubeen-bahuu",
    name: "Mr. Mubeen Bahuu",
    slug: "mubeen-bahuu",
    role: "Owner & CEO",
    bio: "Mr. Mubeen Bahuu is the visionary founder and CEO of the company, driving strategic growth and overseeing all operations to ensure excellence in every project.",
    image: "/team/mubeenbahuu.jpeg",
    experience: "15+ years",
    education: "MBA, [University Name]",
    social: {
      linkedin: "https://linkedin.com/in/mubeenbahuu",
      twitter: "https://twitter.com/mubeenbahuu",
      facebook: "https://facebook.com/mubeenbahuu",
    },
    featured: true,
    details: `
      <h2>Professional Journey</h2>
      <p>Mr. Mubeen Bahuu started his career in the tech industry over 15 years ago and quickly rose to leadership roles by demonstrating vision and execution excellence.</p>
      <h3>Achievements</h3>
      <ul>
        <li>Founded the company and grew it into a global enterprise</li>
        <li>Led multiple successful digital transformation projects</li>
        <li>Recognized as a thought leader in tech innovation</li>
      </ul>
      <h3>Philosophy</h3>
      <p>Believes in fostering innovation, teamwork, and a customer-first approach.</p>
    `,
  },
  {
    id: "muen-bahuu",
    name: "Mr. Muen Bahuu",
    slug: "muen-bahuu",
    role: "CEO & Head of Sales",
    bio: "Mr. Muen Bahuu leads the sales strategy of the company, combining leadership skills with market expertise to drive revenue and customer satisfaction.",
    image: "/team/muenbahuu.png",
    experience: "12+ years",
    education: "BBA, [University Name]",
    social: {
      linkedin: "https://linkedin.com/in/muenbahuu",
      twitter: "https://twitter.com/muenbahuu",
      instagram: "https://instagram.com/muenbahuu",
    },
    featured: true,
    details: `
      <h2>Sales Leadership</h2>
      <p>Mr. Muen Bahuu specializes in sales strategy and business growth. He has consistently exceeded targets and built high-performing sales teams.</p>
      <h3>Key Highlights</h3>
      <ul>
        <li>Expanded client base by 300% over 5 years</li>
        <li>Implemented data-driven sales processes</li>
        <li>Mentored multiple successful sales leaders</li>
      </ul>
    `,
  },
  {
    id: "manthar-awan",
    name: "Mr. Manthar Awan",
    slug: "manthar-awan",
    role: "Lead Graphic Designer",
    bio: "Mr. Manthar Awan heads the design team, creating visually stunning and user-centric graphics that define the company's brand identity.",
    image: "/team/manthar-awan.jpeg",
    experience: "10+ years",
    education: "BFA in Graphic Design, [University Name]",
    social: {
      linkedin: "https://linkedin.com/in/mantharawan",
      twitter: "https://twitter.com/mantharawan",
      dribbble: "https://dribbble.com/mantharawan",
    },
    featured: true,
    details: `
      <h2>Design Expertise</h2>
      <p>Mr. Manthar Awan specializes in branding, UI/UX, and graphic design for web and mobile platforms.</p>
      <h3>Portfolio Highlights</h3>
      <ul>
        <li>Designed award-winning mobile app interfaces</li>
        <li>Created brand identities for top-tier clients</li>
        <li>Expert in Adobe Creative Suite and Figma</li>
      </ul>
    `,
  },
  {
    id: "mureed-sultan",
    name: "Mr. Mureed Sultan",
    slug: "mureed-sultan",
    role: "Chief Technology Officer",
    bio: "Mr. Mureed Sultan leads the technology strategy and development operations, ensuring cutting-edge solutions and seamless digital experiences for clients.",
    image: "/placeholder-user.jpg",
    experience: "10+ years",
    education: "BSc in Computer Science, [University Name]",
    social: {
      linkedin: "https://linkedin.com/in/mureedsultan",
      github: "https://github.com/mureedsultan",
      twitter: "https://twitter.com/mureedsultan",
    },
    featured: true,
    details: `
      <h2>Technical Leadership</h2>
      <p>Mr. Mureed Sultan manages development operations and technology strategy across all company projects, specializing in scalable, secure solutions.</p>
      <h3>Technical Achievements</h3>
      <ul>
        <li>Implemented enterprise-grade solutions for multiple clients</li>
        <li>Specialist in cloud architecture and software development</li>
        <li>Leads internal technology mentorship programs</li>
      </ul>
    `,
  },
];

export const testimonials = [
  {
    id: 1,
    quote:
      "Zavior Technologies helped us completely automate our Odoo ERP workflows — from sales to accounting. Their Dubai-based team’s expertise and responsiveness made the entire transition seamless and efficient.",
    author: "Aamir Khan",
    role: "Managing Director",
    company: "Al Noor Trading LLC",
    avatar: "/testimonials/aamir-khan.jpg",
  },
  {
    id: 2,
    quote:
      "Thanks to Zavior Tech, our multi-branch retail business now runs smoothly under one unified Odoo system. Inventory, POS, and eCommerce are perfectly integrated, saving us countless hours every month.",
    author: "Fatima Al Mansoori",
    role: "Retail Operations Head",
    company: "StyleHub UAE",
    avatar: "/testimonials/fatima-al-mansoori.jpg",
  },
  {
    id: 3,
    quote:
      "Their Odoo customization and cloud deployment transformed how we manage clients and projects. Zavior’s team really understands business logic and delivered beyond expectations.",
    author: "Mohammed Saeed",
    role: "CEO",
    company: "SmartBuild Contracting",
    avatar: "/testimonials/mohammed-saeed.jpg",
  },
  {
    id: 4,
    quote:
      "Working with Zavior Technologies on our AI-powered reporting and HR automation was a game changer. Their innovative approach has enhanced both productivity and accuracy across departments.",
    author: "Sara Williams",
    role: "HR Director",
    company: "FutureEdge Technologies",
    avatar: "/testimonials/sara-williams.jpg",
  },
];

export const careers = [
  {
    id: "graphic-designer",
    title: "Part-time Graphic Designer",
    slug: "part-time-graphic-designer",
    department: "Creative & Marketing",
    location: "Remote",
    type: "Part-time",
    experience: "2+ years",
    description:
      "We’re looking for a talented Graphic Designer to create engaging visuals for digital and print media. You’ll collaborate with our marketing and product teams to bring creative ideas to life and maintain brand consistency across all platforms.",
    requirements: [
      "2+ years of experience in graphic design",
      "Proficiency in Adobe Creative Suite (Photoshop, Illustrator, InDesign)",
      "Experience with social media design and marketing materials",
      "Strong sense of layout, color, and typography",
      "Ability to work independently and meet deadlines",
    ],
    benefits: [
      "Flexible working hours",
      "Remote-friendly culture",
      "Creative and collaborative environment",
      "Opportunity to grow into a full-time role",
      "Performance-based bonuses",
    ],
    postedAt: "2026-02-17",
  },
  // {
  //   id: "odoo-developer",
  //   title: "Odoo Developer",
  //   slug: "odoo-developer",
  //   department: "ERP Solutions",
  //   location: "Remote",
  //   type: "Full-time",
  //   experience: "3+ years",
  //   description:
  //     "Join our ERP team to develop custom Odoo modules and implement solutions for clients across various industries.",
  //   requirements: [
  //     "3+ years of Odoo development experience",
  //     "Strong Python and PostgreSQL skills",
  //     "Experience with Odoo customization and integration",
  //     "Understanding of business processes and ERP concepts",
  //     "Odoo certification preferred",
  //   ],
  //   benefits: [
  //     "Competitive salary",
  //     "Remote-first culture",
  //     "Learning and certification support",
  //     "Health insurance",
  //     "Flexible hours",
  //   ],
  //   postedAt: "2026-01-08",
  // },
  // {
  //   id: "react-developer",
  //   title: "Senior React Developer",
  //   slug: "senior-react-developer",
  //   department: "Web Development",
  //   location: "Dubai, UAE (On-site)",
  //   type: "Full-time",
  //   experience: "4+ years",
  //   description:
  //     "We're seeking an experienced React developer to build cutting-edge web applications for our diverse client portfolio.",
  //   requirements: [
  //     "4+ years of React development experience",
  //     "Strong TypeScript and Next.js skills",
  //     "Experience with state management and testing",
  //     "Understanding of performance optimization",
  //     "Eye for detail and user experience",
  //   ],
  //   benefits: [
  //     "Competitive salary",
  //     "Relocation assistance",
  //     "Health and dental insurance",
  //     "Stock options",
  //     "Modern office with amenities",
  //   ],
  //   postedAt: "2026-01-05",
  // },
  // {
  //   id: "product-manager",
  //   title: "Product Manager",
  //   slug: "product-manager",
  //   department: "Product",
  //   location: "Dubai, UAE (Hybrid)",
  //   type: "Full-time",
  //   experience: "5+ years",
  //   description:
  //     "Lead product strategy and development for our suite of digital products serving enterprise clients globally.",
  //   requirements: [
  //     "5+ years of product management experience",
  //     "Background in B2B or enterprise software",
  //     "Strong analytical and communication skills",
  //     "Experience with agile methodologies",
  //     "Technical background preferred",
  //   ],
  //   benefits: [
  //     "Competitive salary and bonus",
  //     "Health insurance",
  //     "Flexible working",
  //     "Professional development",
  //     "Leadership opportunities",
  //   ],
  //   postedAt: "2026-01-03",
  // },
  // {
  //   id: "senior-ai-engineer",
  //   title: "Senior AI Engineer",
  //   slug: "senior-ai-engineer",
  //   department: "AI & Machine Learning",
  //   location: "Dubai, UAE (Hybrid)",
  //   type: "Full-time",
  //   experience: "5+ years",
  //   description:
  //     "We're looking for a Senior AI Engineer to join our growing AI team and help build next-generation intelligent solutions for our enterprise clients.",
  //   requirements: [
  //     "5+ years of experience in AI/ML development",
  //     "Strong proficiency in Python, TensorFlow, and PyTorch",
  //     "Experience with large language models and NLP",
  //     "Background in deploying ML models to production",
  //     "Excellent communication and collaboration skills",
  //   ],
  //   benefits: [
  //     "Competitive salary and equity",
  //     "Health and dental insurance",
  //     "Flexible working arrangements",
  //     "Professional development budget",
  //     "Annual team retreats",
  //   ],
  //   postedAt: "2026-01-10",
  // },
];

export const faqs = [
  {
    question: "What industries does Zavior serve?",
    answer:
      "We serve a wide range of industries including finance, healthcare, manufacturing, retail, logistics, and technology. Our solutions are adaptable to meet the specific needs of each sector.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on scope and complexity. A simple web application might take 2-3 months, while a comprehensive ERP implementation could take 6-12 months. We provide detailed timelines during our initial consultation.",
  },
  {
    question: "Do you offer ongoing support and maintenance?",
    answer:
      "Yes, we offer comprehensive support and maintenance packages for all our solutions. This includes 24/7 technical support, regular updates, performance monitoring, and continuous optimization.",
  },
  {
    question: "What is your approach to project management?",
    answer:
      "We follow agile methodology with regular sprints, client reviews, and iterative development. You'll have a dedicated project manager as your single point of contact throughout the engagement.",
  },
  {
    question: "Can you work with our existing systems?",
    answer:
      "Absolutely. We specialize in integration and can work with most existing systems. Our team will assess your current infrastructure and design solutions that complement and enhance your existing investments.",
  },
  {
    question: "What security measures do you implement?",
    answer:
      "Security is built into every solution we deliver. We follow industry best practices including encryption, secure coding standards, regular security audits, and compliance with relevant regulations like GDPR and HIPAA.",
  },
  {
    question: "Do you offer training for our team?",
    answer:
      "Yes, comprehensive training is included in all our implementations. We provide hands-on training sessions, documentation, and ongoing support to ensure your team can effectively use and maintain the solutions we deliver.",
  },
  {
    question: "What is your pricing model?",
    answer:
      "Our pricing varies based on project type and scope. We offer fixed-price projects for well-defined requirements, time and materials for flexible engagements, and retainer models for ongoing partnerships. Contact us for a customized quote.",
  },
];

export const stats = {
  projects: 100,
  clients: 50,
  countries: 4,
  team: 5,
};

export const milestones = [
  {
    year: 2012,
    title: "Founded as a Startup",
    description:
      "Started as a small remote-first team focused on building custom ERP systems and enterprise software for SMEs.",
  },
  {
    year: 2014,
    title: "Early Web & ERP Projects",
    description:
      "Delivered our first custom ERP and business management platforms — laying the foundation for scalable enterprise tools.",
  },
  {
    year: 2016,
    title: "Global Remote Team Setup",
    description:
      "Transitioned fully remote, expanding our development capabilities with expert engineers and designers working from multiple countries.",
  },
  {
    year: 2018,
    title: "Odoo Integration Services",
    description:
      "Introduced Odoo ERP customization and deployment services, helping clients streamline business operations and automation.",
  },
  {
    year: 2020,
    title: "50+ Global Clients",
    description:
      "Achieved a milestone of 50+ active clients across 4 countries, providing full-cycle ERP, CRM, and web solutions.",
  },
  {
    year: 2022,
    title: "100+ Projects Delivered",
    description:
      "Celebrated delivering over 100 successful digital projects — from ERP to websites and cloud integrations.",
  },
  {
    year: 2024,
    title: "Next-Gen ERP Development",
    description:
      "Began developing next-generation ERP and automation tools integrating AI-driven analytics for smarter decision-making.",
  },
  {
    year: 2026,
    title: "Expanding Global Partnerships",
    description:
      "Continuing remote-first operations with 5+ talented members, partnering with global firms to deliver Odoo, custom ERP, and digital transformation solutions.",
  },
];

// Aliases for backward compatibility
export const jobOpenings = careers.map((job) => ({
  ...job,
  skills: job.requirements.slice(0, 4),
  salary: "Competitive",
}));

export const teamMembers = team.map((member) => ({
  ...member,
  linkedin: member.social?.linkedin || "#",
  twitter: member.social?.twitter || "#",
  email: `${member.id}@zavior.com`,
}));
