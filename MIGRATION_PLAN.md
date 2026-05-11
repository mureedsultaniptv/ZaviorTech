# Next.js to Laravel Blade Migration Plan

## Source Audit Summary

This plan is based on the existing Next.js source, especially `src/lib/data/demo-data.ts` which is the canonical content source for the Laravel migration.

### Discovered Next.js Pages

Static public pages:

- `/` from `src/pages/index.tsx`
- `/about` from `src/pages/about/index.tsx`
- `/services` from `src/pages/services/index.tsx`
- `/companies` from `src/pages/companies/index.tsx`
- `/portfolio` from `src/pages/portfolio/index.tsx`
- `/blog` from `src/pages/blog/index.tsx`
- `/careers` from `src/pages/careers/index.tsx`
- `/contact` from `src/pages/contact/index.tsx`
- `/faq` from `src/pages/faq/index.tsx`
- `/cookies` from `src/pages/cookies/index.tsx`
- `/privacy` from `src/pages/privacy/index.tsx`
- `/terms` from `src/pages/terms/index.tsx`
- `/chat` from `src/pages/chat/index.jsx`
- `/robots.txt` from `src/pages/robots.txt.ts`
- `/sitemap.xml` from `src/pages/sitemap.xml.ts`

Dynamic public pages:

- `/services/{slug}` from `src/pages/services/[slug].tsx`
- `/portfolio/{slug}` from `src/pages/portfolio/[slug].tsx`
- `/blog/{slug}` from `src/pages/blog/[slug].tsx`
- `/careers/{slug}` from `src/pages/careers/[slug].tsx`
- `/team/{slug}` from `src/pages/team/[slug].tsx`
- `/companies/{slug}` from `src/pages/companies/[slug].tsx`

API routes:

- `/api/leadform` stores/queues contact form submissions, sends mail, and currently writes to Sanity.
- `/api/applyJob` parses multipart resume uploads, stores/queues job applications, sends mail, and currently writes to Sanity.

### Discovered Components

Layout and global components:

- `src/components/layout/navigation.tsx`
- `src/components/layout/footer.tsx`
- `src/components/theme-provider.tsx`
- `src/components/seo/seo-head.tsx`

Homepage/section components:

- `src/components/sections/hero-section.tsx`
- `src/components/sections/services-section.tsx`
- `src/components/sections/companies-section.tsx`
- `src/components/sections/stats-section.tsx`
- `src/components/sections/portfolio-section.tsx`
- `src/components/sections/testimonials-section.tsx`
- `src/components/sections/blog-section.tsx`
- `src/components/sections/cta-section.tsx`
- `src/components/sections/team-section.tsx`

UI components:

- `accordion`, `animated-counter`, `badge`, `button`, `card`, `input`, `label`, `safe-rich-text`, `section-heading`, `select`, `textarea`

Visual effects:

- `src/components/3d/hero-scene.tsx` renders a decorative particle/mesh background.

Server utilities:

- `src/lib/server/form-validation.ts`
- `src/lib/server/request-security.ts`
- `src/lib/server/submission-processors.ts`
- `src/lib/server/submission-queue.ts`

Localization:

- `src/lib/i18n/translations.ts`
- `src/lib/i18n/language-context.tsx`

### Data Objects Found in `demo-data.ts`

`demo-data.ts` exports:

- `companies`: 3 records
- `services`: 6 records
- `projects`: 16 records
- `blogs`: 17 records
- `sortedBlogs`: derived from `blogs`
- `team`: 4 records
- `testimonials`: 4 records
- `careers`: 1 record
- `faqs`: 8 records
- `stats`: object with `projects`, `clients`, `countries`, `team`
- `milestones`: 8 records
- `jobOpenings`: derived from `careers`
- `teamMembers`: derived from `team`

Important field shapes:

- `companies`: `id`, `name`, `slug`, `description`, `shortDescription`, `color`, `sector`, `headquarters`, `website`, `websiteLabel`, `href`, `isExternal`, `overview`, `relatedProjectSlugs[]`, `services[]`
- `services`: `id`, `slug`, `title`, `description`, `longDescription`, `icon`, `image`, `features[]`, `metaTitle`, `metaDescription`, `metaKeywords`
- `projects`: `id`, `slug`, `metaTitle`, `metaDescription`, `canonical`, `metaKeywords`, `title`, `category`, `client`, `description`, `image`, `technologies[]`, `year`, `featured`, `projectOverview`
- `blogs`: `id`, `title`, `slug`, `excerpt`, `content`, `image`, `author{name,role}`, `category`, `readTime`, `publishedAt`, `featured`, `tags[]`, `metaTitle`, `metaDescription`, `keywords`, `canonical`
- `team`: `id`, `name`, `slug`, `role`, `bio`, `image`, `experience`, `education`, `social{...}`, `featured`, `details`
- `testimonials`: `id`, `quote`, `author`, `role`, `company`, `avatar`
- `careers`: `id`, `title`, `slug`, `department`, `location`, `type`, `experience`, `description`, `requirements[]`, `benefits[]`, `postedAt`
- `faqs`: `question`, `answer`
- `milestones`: `year`, `title`, `description`

## Database Mapping Plan

The Laravel database must be seeded from the actual `demo-data.ts` content. Arrays that are primarily display/editable lists will be stored as JSON. Important first-class content with public routes gets dedicated tables.

### `pages`

For static pages and editable page-level SEO/content.

Fields:

- `id`
- `title`
- `slug` unique nullable for homepage
- `page_type` indexed
- `short_description`
- `content` long text nullable
- `sections` JSON nullable
- `featured_image`
- `banner_image`
- `meta_title`
- `meta_description`
- `meta_keywords`
- `canonical_url`
- `og_title`
- `og_description`
- `og_image`
- `schema_json` JSON nullable
- `status` indexed
- `sort_order` indexed
- `created_by`, `updated_by`
- timestamps

### `companies`

Mapped from `companies`.

Fields:

- `source_id` from `id`
- `name`, `slug`, `description`, `short_description`
- `color`, `sector`, `headquarters`
- `website_url`, `website_label`, `href`, `is_external`
- `overview`
- `services` JSON from `services[]`
- `related_project_slugs` JSON from `relatedProjectSlugs[]`
- SEO fields
- `status`, `sort_order`, timestamps

### `services`

Mapped from `services`.

Fields:

- `source_id`
- `company_id` nullable
- `title`, `slug`, `short_description`, `description`
- `icon`, `image`, `banner_image`
- `features` JSON
- `meta_title`, `meta_description`, `meta_keywords`, `canonical_url`, `schema_json`
- `status`, `sort_order`, timestamps

`longDescription` maps to `description`. `description` maps to `short_description`.

### `project_categories`

Derived from unique `projects[].category`.

Fields:

- `name`, `slug`, `description`, `status`, timestamps

### `projects`

Mapped from `projects`.

Fields:

- `source_id`
- `project_category_id`
- `title`, `slug`, `client`, `short_description`, `content`
- `image`, `technologies` JSON, `year`, `featured`
- `meta_title`, `meta_description`, `meta_keywords`, `canonical_url`, `og_image`, `schema_json`
- `status`, `sort_order`, timestamps

`description` maps to `short_description`; `projectOverview` maps to `content`.

### `blog_categories`

Derived from unique `blogs[].category`.

Fields:

- `name`, `slug`, `description`, `status`, timestamps

### `blog_posts`

Mapped from `blogs`.

Fields:

- `source_id`
- `blog_category_id`
- `title`, `slug`, `excerpt`, `content`, `featured_image`
- `author_name`, `author_role`, `author_image`
- `reading_time`
- `tags` JSON
- `published_at`, `featured`
- `meta_title`, `meta_description`, `meta_keywords`, `canonical_url`, `og_title`, `og_description`, `og_image`, `schema_json`
- `status`, timestamps

### `team_members`

Mapped from `team` and derived `teamMembers`.

Fields:

- `source_id`
- `name`, `slug`, `role`, `bio`, `details`, `image`
- `experience`, `education`
- `social_links` JSON
- `featured`, `status`, `sort_order`, timestamps

### `testimonials`

Mapped from `testimonials`.

Fields:

- `name` from `author`
- `designation` from `role`
- `company`
- `message` from `quote`
- `image` from `avatar`
- `rating` nullable default 5
- `status`, `sort_order`, timestamps

### `careers`

Mapped from `careers` and derived `jobOpenings`.

Fields:

- `source_id`
- `title`, `slug`, `department`, `location`, `employment_type`
- `experience`, `description`
- `requirements` JSON, `benefits` JSON, `skills` JSON nullable
- `salary` nullable
- `posted_at`
- SEO fields
- `status`, `sort_order`, timestamps

### `faqs`

Mapped from `faqs`.

Fields:

- `question`, `answer`
- `page_type` nullable default `faq`
- `page_id` nullable
- `category` nullable
- `status`, `sort_order`, timestamps

### `statistics`

Mapped from `stats`.

Fields:

- `label`, `value`, `suffix`, `icon`, `description`, `section_key`
- `status`, `sort_order`, timestamps

Stats become:

- `projects = 100`
- `clients = 50`
- `countries = 4`
- `team = 5`

### `milestones`

Mapped from `milestones`.

Fields:

- `year`, `title`, `description`, `status`, `sort_order`, timestamps

### `navigation_items`

Seeded from Next navigation/footer links.

Fields:

- `parent_id`, `title`, `url`, `route_name`, `icon`, `target`, `location`
- `status`, `sort_order`, timestamps

### `ctas`

Seeded from CTA components/static content.

Fields:

- `title`, `subtitle`, `description`
- `button_text`, `button_url`
- `secondary_button_text`, `secondary_button_url`
- `image`, `section_key`
- `status`, `sort_order`, timestamps

### Form, Admin, Media, Settings, Logs

Additional Laravel-managed tables:

- `contact_submissions`
- `job_applications`
- `newsletter_subscribers`
- `media_library`
- `activity_logs`
- `settings`
- default `users` table with admin fields: `role`, `status`, `last_login_at`

## Public Route Mapping

Preserve existing URLs:

- `/` -> `HomeController@index`
- `/about` -> `PageController@about`
- `/companies` -> `CompanyController@index`
- `/companies/{slug}` -> `CompanyController@show`
- `/services` -> `ServiceController@index`
- `/services/{slug}` -> `ServiceController@show`
- `/portfolio` -> `ProjectController@index`
- `/portfolio/{slug}` -> `ProjectController@show`
- `/blog` -> `BlogController@index`
- `/blog/{slug}` -> `BlogController@show`
- `/careers` -> `CareerController@index`
- `/careers/{slug}` -> `CareerController@show`
- `/team` -> `TeamController@index`
- `/team/{slug}` -> `TeamController@show`
- `/faq` -> `FaqController@index`
- `/contact` -> `ContactController@index`
- `/privacy`, `/terms`, `/cookies` -> database-backed pages
- `/sitemap.xml`, `/sitemap-pages.xml`, `/sitemap-companies.xml`, `/sitemap-services.xml`, `/sitemap-blogs.xml`
- `/robots.txt`

Dynamic page fallback should be added after explicit routes to avoid conflicts.

## Admin Module Plan

Admin routes live under `/admin` and require auth, throttle, verified active admin status, and noindex headers.

Modules:

- Dashboard
- Pages CRUD
- Companies CRUD
- Services CRUD
- Project Categories CRUD
- Projects CRUD
- Blog Categories CRUD
- Blog Posts CRUD
- FAQs CRUD
- Team Members CRUD
- Testimonials CRUD
- Careers CRUD
- Statistics CRUD
- Milestones CRUD
- Navigation CRUD
- CTA Sections CRUD
- Contact Submissions
- Job Applications
- Newsletter Subscribers
- Media Library
- Activity Logs
- Settings

Admin UI style:

- Odoo-inspired left sidebar
- Topbar
- Metric cards
- Dense tables with filters
- Form views
- Kanban cards for content where useful
- Responsive table wrappers for mobile

## SEO Migration Plan

Existing SEO:

- `SeoHead` outputs title, description, keywords, robots, canonical, OpenGraph, Twitter tags, and optional JSON-LD.
- Blog detail uses `BlogPosting` schema.
- Service detail uses `Service` schema.
- Portfolio detail uses `CreativeWork` schema.
- Career detail uses `JobPosting` schema.
- Companies page uses `Organization` style schema.

Laravel plan:

- Create `SeoService` and `x-seo` Blade component.
- Store SEO fields on route-backed content tables.
- Generate canonical URLs server-side.
- Normalize legacy `zaviortech.vercel.app` canonicals to `APP_URL`.
- Render schema JSON-LD in initial HTML.
- Add Organization, WebSite, BreadcrumbList, BlogPosting, Service, FAQPage, ContactPage, and JobPosting schemas.
- Generate split sitemaps from database.
- Set admin routes to `noindex,nofollow`.

## Image and Media Migration Plan

Existing images are under `public/`.

Laravel plan:

- Copy assets into `public/assets` or keep compatible paths via `public/services`, `public/projects`, `public/blog`, `public/team`, and logo files.
- Preserve image paths in seeded data where possible.
- Add `media_library` records for known public assets.
- Use lazy loading for below-fold images.
- Use explicit width/height or responsive CSS aspect ratios.
- Add editable alt/title fields in admin media library.
- Optionally add WebP conversions later through queued jobs.

## Form and Email Migration Plan

Existing forms:

- Contact form posts JSON to `/api/leadform`.
- Career application posts multipart data to `/api/applyJob`.
- Both use honeypot fields and rate limits.
- Current processing uses Sanity and nodemailer.

Laravel plan:

- Remove Sanity completely.
- POST `/contact` stores `contact_submissions`.
- POST `/careers/{slug}/apply` stores `job_applications` and resume file.
- POST `/newsletter` stores `newsletter_subscribers`.
- Use Form Request validation.
- Add honeypot fields.
- Add route throttles.
- Send admin and user confirmation emails with Laravel Mail.
- Queue mail if queue is configured; otherwise send synchronously.
- Log email success/failure in `activity_logs`.

## SPA-Like Navigation Plan

Use progressive enhancement:

- Every route returns complete server-rendered Blade HTML.
- Internal links work normally without JavaScript.
- Add lightweight `resources/js/spa-nav.js` to fetch full pages, replace `<main data-page-root>`, update `<title>` and meta tags, push History API, and show a top progress bar.
- Skip AJAX for forms, downloads, external links, admin, and non-GET actions.
- Reinitialize animations and Three.js when navigating.
- Fall back to normal navigation on errors.

Livewire can be introduced later for admin forms, but public SEO pages should remain plain Blade plus lightweight progressive JS.

## Loading Screen Plan

- Add `x-loader` Blade component rendered over normal HTML content.
- First-load full overlay with logo, progress bar, and reduced-motion support.
- Use `sessionStorage` so the large loader appears once per session.
- Add compact top progress bar during enhanced navigation.
- Never replace server HTML content with JavaScript-only content.
- Add `<noscript>` style fallback that disables the loader overlay.

## Security Hardening Plan

- CSRF on all forms.
- Form Requests for validation.
- Admin auth with active user middleware.
- Role checks/policies for admin actions.
- Rate limits for login, contact, newsletter, and applications.
- Honeypot fields on public forms.
- Sanitized rich text rendering through a server-side purifier service.
- MIME and size validation for uploads.
- Store uploads under `storage/app/public` with safe filenames.
- Prevent executable uploads.
- Security headers middleware: CSP baseline, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS when HTTPS is enabled.
- Request id and duration tracking.
- Activity logs for admin auth, CRUD, form submissions, email events, upload events, and settings changes.
- Admin pages `noindex,nofollow`.
- No Sanity secrets or frontend-sensitive credentials.

## Performance Optimization Plan

- Database indexes on slugs, statuses, sort orders, published dates, foreign keys, email, and created dates.
- Eager-load categories and relationships.
- Cache site settings/navigation.
- Cache public page query bundles where safe.
- Vite-built minified CSS/JS.
- Minimal public JavaScript.
- Lazy-load Three.js only when canvas enters viewport.
- Use CSS transitions where possible instead of heavy animation libraries.
- Lazy load below-fold images.
- Preload key logo/hero assets.
- Support `php artisan config:cache`, `route:cache`, `view:cache`, and `optimize`.
- Provide deployment notes for gzip/Brotli and browser caching headers.

## Sanity Removal Plan

Remove all Sanity behavior:

- Delete `@sanity/client` usage.
- Remove Sanity env vars from required deployment.
- Replace Sanity writes with database writes and activity logs.
- Replace Sanity asset upload with Laravel filesystem/media library.

