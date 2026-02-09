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
    id: "cybersecurity",
    title: "Cybersecurity",
    description:
      "Protect your digital assets with our comprehensive security assessments and implementation services.",
    icon: "Shield",
    image: "/services/cyber-security.png",
    features: [
      "Security Audits",
      "Penetration Testing",
      "Compliance Management",
      "Incident Response",
      "Security Training",
      "Threat Monitoring",
    ],
  },
];

export const projects = [
  {
    id: "beauty-salon-erp",
    title: "Odoo ERP for Multi-Branch Beauty Salon",
    slug: "odoo-beauty-salon-erp",
    category: "ERP & POS Solutions",
    client: "Multi-Branch Beauty Salon (Dubai)",
    description:
      "Implemented a full Odoo ERP solution for a multi-branch beauty salon network in Dubai, covering POS, appointment scheduling, HR, CRM, inventory, finance, and API integrations. The system streamlined operations and provided real-time performance analytics across all locations.",
    image: "/projects/odoo_beauty_salon.png",
    technologies: ["Odoo", "Python", "PostgreSQL", "Docker", "Odoo.sh"],
    year: 2024,
    featured: true,
    projectOverview: `
      <p>
        This project focused on building a complete digital backbone for a chain of beauty salons in Dubai. 
        The system unified all key operations — from customer bookings to finance — within a single Odoo environment.
      </p>
      <ul>
        <li>Implemented <strong>Point of Sale</strong> with real-time stock updates across multiple branches.</li>
        <li>Integrated <strong>HR, Payroll, and Attendance</strong> modules for branch-level staff management.</li>
        <li>Developed <strong>CRM workflows</strong> to manage leads, memberships, and loyalty programs.</li>
        <li>Connected with <strong>external APIs</strong> for SMS notifications and accounting exports.</li>
        <li>Deployed on <strong>Odoo.sh</strong> with Docker-based CI/CD automation.</li>
      </ul>
    `,
  },
  {
    id: "automobile-crm",
    title: "Automobile CRM & Sales Management Portal",
    slug: "automobile-crm-portal",
    category: "Enterprise Web Systems",
    client: "Automobile Distribution Group",
    description:
      "Developed a custom CRM and sales management portal for a large automobile distributor, integrating lead management, workflow automation, performance dashboards, and reporting tools for enhanced sales visibility.",
    image: "/projects/automobile_crm.png",
    technologies: ["Spring Boot", "Java", "MySQL", "React", "REST APIs"],
    year: 2024,
    featured: true,
    projectOverview: `
      <p>
        A robust enterprise-grade CRM tailored for an automobile sales organization. The portal automated the complete sales lifecycle, 
        from inquiry to delivery, with integrated reporting and team performance metrics.
      </p>
      <ul>
        <li>Built using <strong>Spring Boot</strong> backend with <strong>React</strong> front-end components.</li>
        <li>Automated lead routing and follow-up tracking using custom workflows.</li>
        <li>Integrated <strong>sales dashboards</strong> with real-time KPIs and performance charts.</li>
        <li>Implemented role-based authentication and audit logging for enterprise compliance.</li>
        <li>Optimized for scalability with modular architecture and REST APIs.</li>
      </ul>
    `,
  },
  {
    id: "zero-waste-erp",
    title: "Recycl Wasteing Industrial ERP",
    slug: "zero-waste-industrial-erp",
    category: "Sustainability & Industrial ERP",
    client: "Industrial Sustainability Organization",
    description:
      "Implemented an Odoo-based ERP system for waste management and recycling operations, enabling material traceability, process automation, and financial governance aligned with circular economy objectives.",
    image: "/projects/zero_waste.png",
    technologies: ["Odoo", "Python", "PostgreSQL", "Power BI"],
    year: 2025,
    featured: true,
    projectOverview: `
      <p>
        A sustainability-focused ERP solution to digitize industrial recycling workflows and enhance traceability.
        The project aligned with <strong>UN SDG goals</strong> and introduced data-driven decision-making.
      </p>
      <ul>
        <li>Configured <strong>Manufacturing & Inventory modules</strong> for material flow tracking.</li>
        <li>Built <strong>financial governance reports</strong> for transparency in waste-to-value operations.</li>
        <li>Integrated <strong>Power BI</strong> dashboards for performance and sustainability metrics.</li>
        <li>Custom Odoo apps for waste lifecycle management and reporting automation.</li>
      </ul>
    `,
  },
  {
    id: "circular-intelligence-platform",
    title: "Circular Intelligence & Traceability Platform",
    slug: "circular-intelligence-platform",
    category: "AI & Circular Intelligence",
    client: "Sustainability Tech Firm",
    description:
      "Developed an integrated circular intelligence platform combining Odoo ERP with AI-driven supply chain insights for sustainability governance, ESG monitoring, and traceability across production systems.",
    image: "/projects/circular_intelligence.png",
    technologies: ["Odoo", "React", "Python", "FastAPI", "Azure AI"],
    year: 2025,
    featured: true,
    projectOverview: `
      <p>
        This project connected enterprise resource planning with AI analytics to achieve full lifecycle visibility. 
        It empowered sustainability teams with actionable intelligence and smart traceability features.
      </p>
      <ul>
        <li>Developed a <strong>FastAPI-based AI layer</strong> integrated with Odoo core modules.</li>
        <li>Implemented <strong>data pipelines</strong> for supply chain and ESG metrics.</li>
        <li>Designed <strong>interactive dashboards</strong> in React for visualization and alerts.</li>
        <li>Deployed AI models on <strong>Azure AI</strong> for predictive sustainability analytics.</li>
      </ul>
    `,
  },
  {
    id: "finance-automation",
    title: "Finance & Accounting Automation System",
    slug: "finance-automation-system",
    category: "Financial Systems",
    client: "Regional Enterprise Clients",
    description:
      "Automated multi-company accounting workflows, tax compliance, expense management, and analytics through customized Odoo Finance modules and advanced reporting dashboards.",
    image: "/projects/finance-automation.png",
    technologies: ["Odoo", "Python", "Excel BI", "PostgreSQL"],
    year: 2023,
    featured: false,
    projectOverview: `
      <p>
        The project introduced automation into core accounting and finance operations, removing manual reconciliation 
        and providing visibility into multi-company financial structures.
      </p>
      <ul>
        <li>Customized <strong>Odoo Accounting</strong> for regional tax and reporting standards.</li>
        <li>Integrated <strong>expense, bank sync, and reconciliation</strong> workflows.</li>
        <li>Built <strong>Excel BI dashboards</strong> for real-time performance insights.</li>
        <li>Optimized posting and audit processes to ensure compliance.</li>
      </ul>
    `,
  },
  {
    id: "crm-analytics-dashboard",
    title: "Enterprise CRM & Analytics Dashboard",
    slug: "crm-analytics-dashboard",
    category: "Business Intelligence",
    client: "Corporate Clients (Confidential)",
    description:
      "Delivered a modular CRM analytics dashboard integrating customer journey data, sales forecasting, and KPI visualizations to support management decision-making and business growth.",
    image: "/projects/crm_analytics.png",
    technologies: ["React", "Node.js", "MongoDB", "Power BI", "AWS"],
    year: 2023,
    featured: false,
    projectOverview: `
      <p>
        A data-driven CRM enhancement project focused on actionable analytics and interactive visualizations for enterprise decision-makers.
      </p>
      <ul>
        <li>Integrated <strong>sales funnel analytics</strong> with customer journey visualization.</li>
        <li>Developed <strong>forecasting modules</strong> using Node.js APIs and MongoDB data models.</li>
        <li>Embedded <strong>Power BI reports</strong> for KPI tracking and performance benchmarking.</li>
        <li>Deployed on <strong>AWS</strong> with CI/CD pipeline for continuous updates.</li>
      </ul>
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
    id: "senior-ai-engineer",
    title: "Senior AI Engineer",
    slug: "senior-ai-engineer",
    department: "AI & Machine Learning",
    location: "Dubai, UAE (Hybrid)",
    type: "Full-time",
    experience: "5+ years",
    description:
      "We're looking for a Senior AI Engineer to join our growing AI team and help build next-generation intelligent solutions for our enterprise clients.",
    requirements: [
      "5+ years of experience in AI/ML development",
      "Strong proficiency in Python, TensorFlow, and PyTorch",
      "Experience with large language models and NLP",
      "Background in deploying ML models to production",
      "Excellent communication and collaboration skills",
    ],
    benefits: [
      "Competitive salary and equity",
      "Health and dental insurance",
      "Flexible working arrangements",
      "Professional development budget",
      "Annual team retreats",
    ],
    postedAt: "2026-01-10",
  },
  {
    id: "odoo-developer",
    title: "Odoo Developer",
    slug: "odoo-developer",
    department: "ERP Solutions",
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
    description:
      "Join our ERP team to develop custom Odoo modules and implement solutions for clients across various industries.",
    requirements: [
      "3+ years of Odoo development experience",
      "Strong Python and PostgreSQL skills",
      "Experience with Odoo customization and integration",
      "Understanding of business processes and ERP concepts",
      "Odoo certification preferred",
    ],
    benefits: [
      "Competitive salary",
      "Remote-first culture",
      "Learning and certification support",
      "Health insurance",
      "Flexible hours",
    ],
    postedAt: "2026-01-08",
  },
  {
    id: "react-developer",
    title: "Senior React Developer",
    slug: "senior-react-developer",
    department: "Web Development",
    location: "Dubai, UAE (On-site)",
    type: "Full-time",
    experience: "4+ years",
    description:
      "We're seeking an experienced React developer to build cutting-edge web applications for our diverse client portfolio.",
    requirements: [
      "4+ years of React development experience",
      "Strong TypeScript and Next.js skills",
      "Experience with state management and testing",
      "Understanding of performance optimization",
      "Eye for detail and user experience",
    ],
    benefits: [
      "Competitive salary",
      "Relocation assistance",
      "Health and dental insurance",
      "Stock options",
      "Modern office with amenities",
    ],
    postedAt: "2026-01-05",
  },
  {
    id: "product-manager",
    title: "Product Manager",
    slug: "product-manager",
    department: "Product",
    location: "Dubai, UAE (Hybrid)",
    type: "Full-time",
    experience: "5+ years",
    description:
      "Lead product strategy and development for our suite of digital products serving enterprise clients globally.",
    requirements: [
      "5+ years of product management experience",
      "Background in B2B or enterprise software",
      "Strong analytical and communication skills",
      "Experience with agile methodologies",
      "Technical background preferred",
    ],
    benefits: [
      "Competitive salary and bonus",
      "Health insurance",
      "Flexible working",
      "Professional development",
      "Leadership opportunities",
    ],
    postedAt: "2026-01-03",
  },
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
  projects: 500,
  clients: 200,
  countries: 35,
  team: 750,
};

export const milestones = [
  {
    year: 2015,
    title: "Founded",
    description:
      "Zavior was established in Dubai with a vision to transform digital landscapes.",
  },
  {
    year: 2016,
    title: "First Major Client",
    description:
      "Secured our first Fortune 500 client, setting the stage for enterprise growth.",
  },
  {
    year: 2018,
    title: "AI Division Launch",
    description:
      "Launched dedicated AI and machine learning division to meet growing demand.",
  },
  {
    year: 2019,
    title: "Global Expansion",
    description:
      "Opened offices in London and Singapore to serve international clients.",
  },
  {
    year: 2021,
    title: "500+ Projects",
    description:
      "Celebrated the milestone of delivering over 500 successful projects.",
  },
  {
    year: 2023,
    title: "Cloud Division",
    description:
      "Established cloud services division to offer comprehensive infrastructure solutions.",
  },
  {
    year: 2025,
    title: "Industry Recognition",
    description:
      "Recognized as a top digital transformation partner by leading industry analysts.",
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
