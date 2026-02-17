export const companies = [
  {
    id: "zavior-tech",
    name: "Zavior Tech",
    slug: "zavior-tech",
    description:
      "Leading provider of AI and machine learning solutions for enterprise clients.",
    shortDescription: "AI & Machine Learning",
    logo: "/companies/zavior-tech.svg",
    color: "#6366f1",
    services: [
      "AI Consulting",
      "ML Model Development",
      "Data Analytics",
      "Predictive Solutions",
    ],
    founded: 2018,
    employees: 150,
    website: "https://tech.zavior.com",
  },
  {
    id: "zavior-erp",
    name: "Zavior ERP Solutions",
    slug: "zavior-erp",
    description: "Specialized Odoo implementation and ERP consulting services.",
    shortDescription: "ERP & Business Solutions",
    logo: "/companies/zavior-erp.svg",
    color: "#22d3ee",
    services: [
      "Odoo Implementation",
      "ERP Consulting",
      "Business Process Optimization",
      "Custom Modules",
    ],
    founded: 2016,
    employees: 200,
    website: "https://erp.zavior.com",
  },
  {
    id: "zavior-digital",
    name: "Zavior Digital",
    slug: "zavior-digital",
    description:
      "Full-service digital agency specializing in web and mobile development.",
    shortDescription: "Web & Mobile Development",
    logo: "/companies/zavior-digital.svg",
    color: "#818cf8",
    services: [
      "Web Development",
      "Mobile Apps",
      "UI/UX Design",
      "E-commerce Solutions",
    ],
    founded: 2015,
    employees: 300,
    website: "https://digital.zavior.com",
  },
  {
    id: "zavior-cloud",
    name: "Zavior Cloud",
    slug: "zavior-cloud",
    description:
      "Cloud infrastructure and DevOps solutions for modern enterprises.",
    shortDescription: "Cloud & Infrastructure",
    logo: "/companies/zavior-cloud.svg",
    color: "#10b981",
    services: [
      "Cloud Migration",
      "DevOps",
      "Infrastructure Management",
      "Security Solutions",
    ],
    founded: 2019,
    employees: 80,
    website: "https://cloud.zavior.com",
  },
];

export const services = [
  {
    id: "erp-odoo",
    title: "ERP & Odoo Solutions",
    description:
      "Comprehensive enterprise resource planning implementations tailored to streamline your business operations.",
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
  },
  {
    id: "web-development",
    title: "Web Development",
    description:
      "Custom websites and web applications built with modern technologies for optimal performance and user experience.",
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
  },
  {
    id: "mobile-apps",
    title: "Mobile Applications",
    description:
      "Native and cross-platform mobile apps designed to engage users and extend your digital presence.",
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
  },
  {
    id: "it-solutions",
    title: "IT Solutions",
    description:
      "End-to-end IT consulting and infrastructure solutions to power your digital transformation journey.",
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
  },
  {
    id: "ai-automation",
    title: "AI Automation",
    description:
      "Leverage cutting-edge artificial intelligence to automate processes and drive efficiency across your organization.",
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
  },
  {
    id: "coreit",
    title: "Core IT Infrastructure",
    description:
      "Delivering complete hardware and infrastructure solutions — from enterprise servers and networking to CCTV surveillance and workstation setup.",
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
  },
];

export const projects = [
  // ==============================
  // 1️⃣ ERP & ODOO SOLUTIONS
  // ==============================
  {
    id: "pharma-erp-system",
    title: "Pharmaceutical ERP for Manufacturing & Sales",
    slug: "pharma-erp-system",
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
    title: "Manufacturing ERP & CRM Platform",
    slug: "manufacturing-erp-crm",
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
    title: "Odoo ERP for Multi-Branch Beauty Salon",
    slug: "odoo-beauty-salon-erp",
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
    title: "Zero Waste Industrial ERP",
    slug: "zero-waste-industrial-erp",
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
    title: "Finance & Accounting Automation System",
    slug: "finance-automation-system",
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
    title: "EcoCycle Environmental Website",
    slug: "ecocycle-environmental-website",
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
    title: "Maintainit Dubai – Facility Services Website",
    slug: "maintainit-dubai",
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
    title: "Automobile CRM & Sales Management Portal",
    slug: "automobile-crm-portal",
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
    title: "CabinMinutes – Cab Booking System (Australia)",
    slug: "cabinminutes-booking-system",
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
    title: "Enterprise IT & Hardware Infrastructure Setup",
    slug: "core-it-infrastructure-services",
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
    title: "AI Insights & Reporting Dashboard",
    slug: "ai-insights-dashboard",
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
    id: "make-linkedin-automation",
    title: "LinkedIn & Workflow Automation with Make.com",
    slug: "linkedin-make-automation",
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
    id: "n8n-marketing-workflows",
    title: "Marketing Automation Pipelines using n8n",
    slug: "n8n-marketing-automation",
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
    title: "Circular Intelligence & Traceability Platform",
    slug: "circular-intelligence-platform",
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
    title: "Enterprise CRM & Analytics Dashboard",
    slug: "crm-analytics-dashboard",
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
    id: "logistics-it-consulting",
    title: "Digital Transformation & IT Strategy for Logistics Firm",
    slug: "logistics-it-strategy",
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
  {
    id: "future-of-ai",
    title: "The Future of AI in Enterprise: Trends to Watch in 2026",
    slug: "future-of-ai-enterprise-2026",
    excerpt:
      "Discover key AI trends like autonomous agents, multimodal AI, and edge intelligence that will transform enterprise operations in 2026.",
    content: `
Artificial Intelligence continues to evolve at a rapid pace, transforming how businesses operate globally. In this analysis, we explore key AI trends enterprise leaders should watch in 2026 and beyond.

## The Rise of Autonomous AI Agents

AI agents are moving beyond simple automation. They can now handle complex, multi-step tasks with minimal human supervision, acting as digital workers capable of reasoning, planning, and executing workflows.

## Multimodal AI Integration

Combining text, image, video, and audio processing creates new enterprise applications. This enables more natural and intuitive human-AI interactions across different formats.

## Edge AI and Decentralized Intelligence

Edge AI brings processing closer to the data source, reducing latency and improving security. It's critical for sensitive, real-time enterprise applications.

## Conclusion

AI in 2026 will shift from experimental to a measurable business value driver. Companies that adopt these trends will gain competitive advantage.

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
    tags: ["AI", "Enterprise", "Autonomous Agents", "Edge AI", "Multimodal AI"],
  },
  {
    id: "digital-transformation-guide",
    title: "A Complete Guide to Digital Transformation in 2026",
    slug: "digital-transformation-guide-2026",
    excerpt:
      "Learn how to drive successful digital transformation in 2026 with a holistic approach covering people, process, and technology.",
    content: `
Digital transformation is a business imperative. Organizations that fail to adapt risk obsolescence. This guide provides a roadmap for success.

## Understanding Digital Transformation

It's not just about technology. Digital transformation reimagines how organizations create value, engage with customers, and operate internally.

## Key Pillars

1. **Leadership Commitment:** Drive change from the top with clear vision and investment.
2. **Customer-Centric Approach:** Every initiative should improve customer experience.
3. **Agile Methodology:** Adopt iterative development and continuous improvement.
4. **Data-Driven Decision Making:** Build the infrastructure and culture to leverage data effectively.

## Conclusion

Successful transformation aligns people, process, and technology to achieve sustainable growth.

    `,
    image: "/blog/digital-transformation.png",
    author: {
      name: "Michael Roberts",
      role: "CEO",
      avatar: "/team/michael-roberts.jpg",
    },
    category: "Digital Transformation",
    readTime: "12 min read",
    publishedAt: "2026-01-10",
    featured: true,
    tags: [
      "Digital Transformation",
      "Leadership",
      "Agile",
      "Customer Experience",
      "Data-Driven",
    ],
  },
  {
    id: "odoo-implementation-best-practices",
    title: "Odoo Implementation Best Practices: Lessons from 100+ Projects",
    slug: "odoo-implementation-best-practices",
    excerpt:
      "Learn best practices for Odoo ERP implementation to maximize efficiency, avoid pitfalls, and ensure successful adoption.",
    content: `
Over 100 Odoo implementations taught us the critical factors for success.

## Planning is Everything

Requirements gathering, process mapping, and stakeholder alignment are essential before coding begins.

## Start with Standard, Customize Wisely

Odoo's standard modules incorporate best practices. Customize only when clearly justified.

## Change Management Matters

Train and support teams for smooth adoption. Communication is key.

## Conclusion

Combining planning, smart customization, and change management ensures ERP success.

    `,
    image: "/blog/odoo-implementation.png",
    author: {
      name: "Ahmed Hassan",
      role: "Director of ERP Solutions",
      avatar: "/team/ahmed-hassan.jpg",
    },
    category: "ERP Solutions",
    readTime: "10 min read",
    publishedAt: "2026-01-05",
    featured: false,
    tags: [
      "Odoo",
      "ERP",
      "Best Practices",
      "Implementation",
      "Change Management",
    ],
  },
  {
    id: "cybersecurity-trends",
    title: "Cybersecurity in 2026: Protecting Your Digital Assets",
    slug: "cybersecurity-trends-2026",
    excerpt:
      "Understand the latest cybersecurity trends including AI-driven threats, zero trust models, and supply chain security in 2026.",
    content: `
Cybersecurity is evolving rapidly. Protecting digital assets requires awareness of emerging trends.

## AI-Powered Threats and Defenses

Cybercriminals use AI to automate attacks. Enterprises need defensive AI for real-time detection.

## Zero Trust Architecture

Perimeter-based security is obsolete. Zero Trust ensures no user or system is automatically trusted.

## Supply Chain Security

Third-party vulnerabilities require strict vetting and monitoring.

## Conclusion

Adopting AI defenses, zero trust, and supply chain monitoring strengthens cybersecurity posture in 2026.

    `,
    image: "/blog/cybersecurity.png",
    author: {
      name: "David Kim",
      role: "Chief Security Officer",
      avatar: "/team/david-kim.jpg",
    },
    category: "Cybersecurity",
    readTime: "7 min read",
    publishedAt: "2025-12-20",
    featured: false,
    tags: [
      "Cybersecurity",
      "Zero Trust",
      "AI Security",
      "Supply Chain Security",
      "Digital Assets",
    ],
  },
  {
    id: "mobile-app-development-trends",
    title: "Mobile App Development Trends Shaping 2026",
    slug: "mobile-app-development-trends-2026",
    excerpt:
      "Explore the latest trends in mobile app development including cross-platform frameworks, AI-first experiences, and super apps.",
    content: `
Mobile apps remain central to digital engagement.

## Cross-Platform Dominance

Flutter and React Native now enable high-performance apps across platforms.

## AI-First Mobile Experiences

On-device AI enables real-time translation, intelligent photo editing, and more.

## Super Apps and Mini Programs

Super apps allow mini-program ecosystems, increasing engagement and retention.

## Conclusion

Cross-platform, AI-first, and super apps will define mobile development in 2026.

    `,
    image: "/blog/mobile-development.png",
    author: {
      name: "Lisa Wong",
      role: "Head of Mobile Development",
      avatar: "/team/lisa-wong.jpg",
    },
    category: "Mobile Development",
    readTime: "6 min read",
    publishedAt: "2025-12-15",
    featured: false,
    tags: [
      "Mobile App Development",
      "Cross-Platform",
      "AI",
      "Super Apps",
      "Innovation",
    ],
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
    image: "/team/mureed-sultan.jpg",
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
      "Zavior transformed our entire digital infrastructure. Their AI solutions have increased our operational efficiency by 40% and opened new revenue streams we never thought possible.",
    author: "Jennifer Walsh",
    role: "CTO",
    company: "Global Finance Corp",
    avatar: "/testimonials/jennifer-walsh.jpg",
  },
  {
    id: 2,
    quote:
      "The Odoo implementation by Zavior was flawless. They understood our complex manufacturing needs and delivered a solution that has streamlined our entire operation.",
    author: "Robert Martinez",
    role: "Operations Director",
    company: "Industrial Manufacturing Inc",
    avatar: "/testimonials/robert-martinez.jpg",
  },
  {
    id: 3,
    quote:
      "Working with Zavior on our mobile app was an exceptional experience. They delivered a world-class product that our customers love and has significantly boosted engagement.",
    author: "Emma Thompson",
    role: "Product Manager",
    company: "TechStart Solutions",
    avatar: "/testimonials/emma-thompson.jpg",
  },
  {
    id: 4,
    quote:
      "Zavior's cybersecurity team helped us achieve compliance and significantly improve our security posture. Their expertise and professionalism are unmatched.",
    author: "Daniel Park",
    role: "CISO",
    company: "Healthcare Systems Ltd",
    avatar: "/testimonials/daniel-park.jpg",
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
  },  // {
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
