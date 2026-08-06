"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, BarChart3, Bot, Boxes, BriefcaseBusiness, Building2,
  Check, CircleCheck, Code2, Construction, Factory, GraduationCap,
  Headphones, HeartPulse, Hotel, Lightbulb, Play, Rocket, Search,
  Settings2, ShoppingCart, Truck, Users, Workflow,
} from "lucide-react";

const coreServices = [
  [Boxes, "Odoo ERP Implementation", "End-to-end Odoo ERP implementation tailored to your business."],
  [BarChart3, "Zoho CRM", "Boost sales and build stronger customer relationships."],
  [Bot, "AI Automation", "Automate processes, predict trends and boost efficiency."],
  [Code2, "Custom Odoo Modules", "Purpose-built modules matched to your workflows."],
  [Workflow, "Integration Services", "Connect Odoo with third-party apps and systems."],
  [Settings2, "Zoho One Solutions", "A complete suite to manage your entire business."],
];

const benefits = [
  [CircleCheck, "Certified Experts", "Official Odoo and Zoho certified consultants with deep industry knowledge."],
  [BriefcaseBusiness, "Business First Approach", "We understand your business first, then suggest the right solution."],
  [Rocket, "Faster Implementation", "Agile delivery that gets you live faster and within budget."],
  [Bot, "AI-Powered Automation", "Smart automation that removes manual work and boosts productivity."],
  [Headphones, "Dedicated Support", "Reliable post-implementation support and continuous improvement."],
  [Lightbulb, "Scalable Solutions", "Solutions that grow with your business and adapt to future needs."],
];

const industries = [
  [Factory, "Manufacturing"], [ShoppingCart, "Retail & eCommerce"], [HeartPulse, "Healthcare"],
  [Construction, "Construction"], [Truck, "Logistics & Supply Chain"], [GraduationCap, "Education"],
  [Hotel, "Hospitality"], [Building2, "Professional Services"],
];

const process = [
  [Search, "Discover", "We study your business needs and challenges."],
  [Lightbulb, "Plan", "We map the best-fit solution and rollout."],
  [Settings2, "Customize", "We configure every workflow around you."],
  [Code2, "Develop", "We build, integrate and test the solution."],
  [Users, "Train", "Your team gets practical, focused training."],
  [Headphones, "Support", "We stay with you after go-live."],
];

const cases = [
  ["Manufacturing Company · UAE", "Odoo ERP Implementation", "/projects/manuf-erp.webp", "70%", "Faster operations", "98%", "Inventory accuracy"],
  ["Retail Business · Dubai", "Zoho CRM & Inventory", "/projects/crm_analytics.webp", "50%", "Sales increase", "99%", "Data accuracy"],
  ["Trading Company · Dubai", "Zoho One Automation", "/projects/finance-automation.webp", "60%", "Time saved", "45%", "Cost reduction"],
  ["Service Company · UAE", "Custom ERP Integration", "/projects/ai-dashboard.webp", "65%", "Efficiency gain", "90%", "Client retention"],
];

export function HomeV1() {
  return <div className="home-v1">
    <section className="v1-hero">
      <div className="v1-wrap v1-hero-grid">
        <div className="v1-copy">
          <span className="v1-pill"><i /> Dubai Odoo ERP, AI Automation & Web Systems</span>
          <h1>Odoo ERP, AI Automation & <em>Software Development</em> Company in Dubai</h1>
          <p>Zavior Technologies implements Odoo ERP, AI automation, custom web platforms, mobile apps, and IT infrastructure for UAE companies that need clearer operations, faster reporting, and reliable delivery.</p>
          <div className="v1-actions"><Link href="/contact" className="v1-btn">Book a Dubai Consultation <ArrowRight /></Link><Link href="/portfolio" className="v1-btn white"><Play /> View Case Studies</Link></div>
          <div className="v1-stats">{[["120+","Projects Delivered"],["100+","Happy Clients"],["20+","Industries Served"],["98%","Client Satisfaction"]].map(x=><div key={x[1]}><strong>{x[0]}</strong><span>{x[1]}</span></div>)}</div>
        </div>
        <Dashboard />
      </div>
    </section>

    <section className="v1-trust"><span>Trusted by 100+ businesses worldwide</span><div>{["PERFETTI","P&G","TOSHIBA","KAD","KEC","Transwilco","Grab","Dr. Reddy’s"].map(x=><b key={x}>{x}</b>)}</div></section>

    <section className="v1-section"><div className="v1-service-row">{coreServices.map(([Icon,title,copy])=><Link href="/services" key={title as string}><Icon /><h3>{title as string}</h3><p>{copy as string}</p><ArrowRight className="next" /></Link>)}</div></section>

    <section className="v1-benefit-band"><div>{benefits.map(([Icon,title,copy])=><article key={title as string}><Icon /><span><b>{title as string}</b><small>{copy as string}</small></span></article>)}</div></section>

    <section className="v1-section v1-industry"><Title tag="Industries we serve" title="Solutions for Every Industry" /><div>{industries.map(([Icon,title])=><article key={title as string}><Icon /><b>{title as string}</b></article>)}</div></section>

    <section className="v1-section v1-solutions">
      <Solution image="/services/odoo-erp.webp" tag="Odoo ERP solutions" title="Odoo ERP Implementation That Transforms Businesses" bullets={["Certified Odoo ERP implementation","Sales, CRM and inventory modules","Custom Odoo development","Data migration and integrations"]} href="/services/erp-odoo-dubai" />
      <Solution image="/projects/finance-automation.webp" tag="Zoho solutions" title="Zoho CRM & Zoho One Solutions That Drive Growth" bullets={["Zoho CRM setup and customization","Zoho One implementation","Books and workflow automation","API integrations and optimization"]} href="/services" reverse />
    </section>

    <section className="v1-process"><Title tag="Our approach" title="Our Proven Implementation Process" /><div>{process.map(([Icon,title,copy],i)=><article key={title as string}><span><Icon /></span><i>0{i+1}</i><b>{title as string}</b><small>{copy as string}</small></article>)}</div></section>

    <section className="v1-section"><Title tag="Case studies" title="Real Results for Real Businesses" /><div className="v1-cases">{cases.map(c=><article key={c[0]}><Image src={c[2]} alt={c[1]} width={600} height={340}/><div><small>{c[0]}</small><h3>{c[1]}</h3><p>Connected teams, simplified reporting and measurable operational improvements.</p><footer><b>{c[3]}<i>{c[4]}</i></b><b>{c[5]}<i>{c[6]}</i></b></footer></div></article>)}</div></section>

    <section className="v1-section v1-bottom-grid"><div><Title tag="Technology stack" title="Technologies We Work With" align="left"/><div className="v1-tech">{["Odoo","Zoho","React","Laravel","Flutter","Python","Node.js","Docker","AWS","OpenAI"].map(x=><span key={x}>{x}</span>)}</div><Title tag="Frequently asked questions" title="Answers Before You Start" align="left"/><div className="v1-faq">{["What is Odoo ERP implementation?","What is the cost of Odoo ERP implementation?","Can Zoho integrate with my existing systems?","How long does implementation take?"].map((x,i)=><details open={i===0} key={x}><summary>{x}<b>+</b></summary><p>Every project is scoped around your users, workflows, integrations and business goals. Our consultants provide a clear plan after discovery.</p></details>)}</div></div><div className="v1-cta"><span>Ready to transform your business?</span><h2>Let’s Build Something Amazing Together</h2><p>Book a free consultation and discover the right ERP, CRM, automation or custom software path for your business.</p><div className="v1-actions"><Link href="/contact" className="v1-btn white">Schedule Consultation <ArrowRight /></Link><a href="https://wa.me/971508185948" className="v1-btn outline">Chat on WhatsApp</a></div><footer><span><Check /> No commitment</span><span><Check /> Expert consultation</span><span><Check /> Quick response</span></footer></div></section>
  </div>;
}

function Title({tag,title,align="center"}:{tag:string;title:string;align?:"left"|"center"}) { return <header className={`v1-title ${align}`}><span>{tag}</span><h2>{title}</h2></header>; }

function Solution({image,tag,title,bullets,href,reverse=false}:{image:string;tag:string;title:string;bullets:string[];href:string;reverse?:boolean}) { return <article className={reverse?"reverse":""}><Image src={image} alt={title} width={650} height={450}/><div><span>{tag}</span><h2>{title}</h2><p>Transform day-to-day work with a practical platform configured for your processes, teams and growth plans.</p><ul>{bullets.map(x=><li key={x}><Check />{x}</li>)}</ul><Link href={href} className="v1-btn">Explore Solutions <ArrowRight /></Link></div></article>; }

function Dashboard(){return <div className="v1-dashboard"><aside><b>odoo</b>{["Dashboard","Sales","Purchase","Inventory","Accounting","Employees","Reports"].map((x,i)=><span className={i===0?"active":""} key={x}>{x}</span>)}</aside><main><header><b>Overview</b><small>Search anything...</small></header><div className="v1-kpis">{[["AED 8.64M","Revenue"],["1,820","Orders"],["980","Customers"]].map(x=><div key={x[1]}><small>{x[1]}</small><b>{x[0]}</b><i>+12.5%</i></div>)}</div><div className="v1-visual"><div className="v1-line"><i/><i/><i/><i/><i/><i/><i/></div><div className="v1-ring"><span>68%</span></div></div></main><div className="v1-float crm"><b>Zoho CRM</b><span>Deal pipeline</span><div><i/><i/><i/><i/></div></div><div className="v1-float auto"><Bot/><b>AI Automation</b><span>Efficiency +22.6%</span></div></div>}
