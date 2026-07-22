import Link from "next/link";

const linkClass =
  "font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary";

export function HomepageSeoContent() {
  return (
    <section className="border-y border-border/60 bg-background py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-16">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Technology Partner in the UAE
            </p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Odoo ERP, AI Automation and Web Development in Dubai
            </h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-muted-foreground">
              <p>
                Zavior Technologies helps businesses replace disconnected tools,
                repetitive work and difficult-to-maintain systems with practical
                digital solutions. Our team delivers projects across ERP, automation,
                web, mobile and IT, giving growing companies one partner for both
                business applications and the infrastructure behind them.
              </p>
              <p>
                Our {" "}
                <Link href="/services/erp-odoo-dubai" className={linkClass}>
                  Odoo ERP implementation services in Dubai
                </Link>{" "}
                connect functions such as CRM, sales, accounting, purchasing,
                inventory, projects and reporting in a unified platform. We begin by
                understanding the current workflow, then configure and customize the
                system around clear business requirements. When a standard module is
                not enough, we can develop integrations or tailored functionality
                without losing sight of maintainability and user adoption.
              </p>
              <p>
                Businesses that want to reduce manual follow-up can combine ERP with
                our {" "}
                <Link href="/services/ai-automation-dubai" className={linkClass}>
                  AI automation services
                </Link>. Chatbots, lead routing, document processing, internal
                assistants and workflow automation can help teams respond faster while
                keeping people in control of important decisions. Customer-facing
                experiences can then be delivered through {" "}
                <Link href="/services/web-development-dubai" className={linkClass}>
                  custom web development
                </Link>{" "}
                or secure {" "}
                <Link href="/services/mobile-apps-dubai" className={linkClass}>
                  mobile app development
                </Link>.
              </p>
              <p>
                Choosing a UAE technology partner makes discovery, delivery and
                ongoing support easier to coordinate. We work with stakeholders to
                define scope, milestones and acceptance criteria before launch, then
                provide training and technical support based on the needs of the
                engagement. Explore our {" "}
                <Link href="/portfolio" className={linkClass}>
                  project portfolio
                </Link>{" "}
                to see examples across ERP, automation, business platforms and IT.
              </p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-border/70 bg-card p-7 md:p-9">
              <h2 className="text-2xl font-bold">Why choose Zavior Technologies?</h2>
              <div className="mt-5 space-y-4 leading-7 text-muted-foreground">
                <p>
                  A useful business system should fit the way a team operates, not add
                  another layer of administration. We balance proven platforms with
                  custom engineering, recommending configuration where it is
                  sufficient and purpose-built development where it creates a clear
                  operational advantage.
                </p>
                <p>
                  Our end-to-end capability covers analysis, interface design,
                  development, integration, testing, deployment, training and ongoing
                  maintenance. It also extends to {" "}
                  <Link href="/services/it-solutions-dubai" className={linkClass}>
                    managed IT solutions
                  </Link>{" "}
                  and {" "}
                  <Link
                    href="/services/core-it-infrastructure-dubai"
                    className={linkClass}
                  >
                    core IT infrastructure
                  </Link>, helping clients align applications, access controls,
                  backups, networks and cloud environments.
                </p>
                <p>
                  Security and reliability are considered throughout delivery through
                  secure authentication, role-based access, backups, testing and
                  monitoring appropriate to the project. Our {" "}
                  <Link href="/privacy" className={linkClass}>
                    privacy policy
                  </Link>{" "}
                  explains how information submitted through this website is handled.
                </p>
              </div>
            </article>

            <article className="rounded-2xl border border-border/70 bg-card p-7 md:p-9">
              <h2 className="text-2xl font-bold">Services for every business need</h2>
              <div className="mt-5 space-y-4 leading-7 text-muted-foreground">
                <p>
                  Retailers and distributors can connect orders, stock and accounting
                  through Odoo. Service companies can organize leads, quotations,
                  projects and support. Manufacturers can improve visibility across
                  purchasing, production, inventory and reporting. Each engagement is
                  shaped around the organization’s actual process and priorities.
                </p>
                <p>
                  Our web and mobile teams build customer portals, booking platforms,
                  e-commerce experiences, dashboards and internal applications. The
                  AI automation practice adds intelligent search, conversational
                  support and data-driven workflows, while our IT specialists help
                  keep the underlying environment available, protected and ready to
                  scale.
                </p>
                <p>
                  Not sure which route fits your requirements? Browse all {" "}
                  <Link href="/services" className={linkClass}>
                    technology services
                  </Link>{" "}
                  or {" "}
                  <Link href="/contact" className={linkClass}>
                    request an initial consultation
                  </Link>{" "}
                  so we can map the problem, dependencies and practical next steps.
                </p>
              </div>
            </article>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <article>
              <h2 className="text-2xl font-bold">Custom solutions and integrations</h2>
              <div className="mt-5 space-y-4 leading-8 text-muted-foreground">
                <p>
                  Established businesses rarely start with a blank technology stack.
                  We can connect new solutions to existing ERP, CRM, accounting,
                  e-commerce, payment, cloud and third-party platforms through APIs
                  and controlled data flows. Typical work includes custom Odoo
                  modules, CRM integrations, management dashboards, AI-powered
                  internal tools and migration from legacy applications.
                </p>
                <p>
                  Integration planning includes data ownership, validation, access,
                  error handling and operational support—not only the initial transfer
                  of information. Before launch, we test important workflows and help
                  users understand the new process. After delivery, maintenance can
                  cover monitoring, security updates, performance improvements, bug
                  fixes and planned enhancements.
                </p>
                <p>
                  Read our {" "}
                  <Link href="/blog" className={linkClass}>
                    ERP, AI and digital transformation guides
                  </Link>{" "}
                  for practical implementation advice, or review our {" "}
                  <Link href="/terms" className={linkClass}>
                    website terms
                  </Link>{" "}
                  and service information before contacting the team.
                </p>
              </div>
            </article>

            <aside className="rounded-2xl bg-muted/40 p-7 md:p-9">
              <h2 className="text-2xl font-bold">Serving businesses across the UAE</h2>
              <div className="mt-5 space-y-4 leading-7 text-muted-foreground">
                <p>
                  Zavior Technologies supports organizations in Dubai, Sharjah, Abu
                  Dhabi, Ajman, Ras Al Khaimah, Fujairah and Umm Al Quwain, as well as
                  teams operating across multiple emirates.
                </p>
                <p>
                  For organizations in the capital, learn more about our {" "}
                  <Link href="/services/odoo-services-abu-dhabi" className={linkClass}>
                    Odoo services in Abu Dhabi
                  </Link>. For other locations, our UAE team can scope delivery,
                  training and support arrangements during consultation.
                </p>
                <Link
                  href="/contact"
                  className="mt-3 inline-flex rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Discuss your project
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
