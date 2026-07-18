# AI Automation Portfolio — Development Plan

## 🎯 Project Vision
A modern, minimalistic portfolio for an AI Automation & Integration Specialist. The site should feel like a **design studio + AI infrastructure consultant** — communicating systems thinking, automation-first mindset, and senior-level engineering maturity.

---

## ✅ COMPLETED (Phase 1)

### Design System
- [x] Dark Supabase-inspired color palette (#0B0F14, #111827, #3ECF8E)
- [x] Typography setup (Inter for body, JetBrains Mono for code)
- [x] Subtle grain texture overlay (3% opacity)
- [x] Ambient green glow effects
- [x] CSS custom properties for all tokens
- [x] Tailwind config with semantic colors

### Core Components
- [x] Navigation — Fullscreen animated overlay (Awwwards-style)
- [x] Hero — Asymmetrical layout with workflow node animation
- [x] Automation Section — Trigger → Logic → Outcome cards
- [x] Newsletter Section — Email form with workflow visualization demo
- [x] Projects Section — Grid layout with featured badges
- [x] ARTICLES Section — Clean article list
- [x] About Section — Philosophy + skill tags
- [x] Footer — Full-screen cinematic with CTA

### Animations
- [x] Framer Motion for scroll-triggered animations
- [x] Staggered menu item reveals
- [x] Workflow node pulse animation
- [x] Scroll indicator animation

---

## 🚧 IN PROGRESS (Phase 2)

### Horizontal Scrolling with GSAP
- [x] Install GSAP + ScrollTrigger
- [x] Convert vertical layout to horizontal scroll panels
- [x] Pin sections during horizontal scroll
- [x] Smooth scrubbing between sections
- [x] Mobile fallback to vertical scroll

---

## 📋 TODO (Phase 3) — Backend & Data

### Supabase Setup (Requires Lovable Cloud)
### Supabase Setup (Reused N8N Project)
- [x] Enable Lovable Cloud (Skipped, using custom setup)
- [x] Create `projects` table
  ```sql
  - id, title, category, description, tags[], featured, slug, created_at
  ```
- [x] Create `articles` table
  ```sql
  - id, title, excerpt, content (markdown), published, slug, read_time, created_at
  ```
- [x] Create `subscribers` table
  ```sql
  - id, email, confirmed, subscribed_at
  ```
- [x] Enable RLS policies for public read access
- [x] Create admin-only write policies

### Webhook Endpoints (n8n-Ready)
- [x] `POST /api/webhooks/newsletter` — New subscriber trigger
- [x] `POST /api/webhooks/blog-published` — New article notification
- [x] `POST /api/webhooks/project-updated` — Project change trigger
- [x] `POST /api/webhooks/contact` — Contact form submission
- [x] Implement request signing validation (`x-webhook-secret` header)
- [x] Add rate limiting (DB-based, 60 req/min)
- [x] Log all webhook calls (`webhook_logs` table)

### Newsletter Automation
- [x] Connect email input to Supabase insert
- [ ] Trigger n8n webhook on new subscriber (Moved to Phase 6)
- [ ] Email confirmation flow (optional) (Moved to Phase 6)
- [ ] Real workflow visualization from actual data (Moved to Phase 6)

---

## 📋 TODO (Phase 4) — Content & Features

### Dynamic Content
- [x] Fetch projects from Supabase
- [x] Fetch articles from Supabase
- [x] Individual project detail pages (`/work/[slug]`)
- [x] Individual article pages (`/articles/[slug]`)
- [x] Markdown rendering with syntax highlighting
- [x] Reading time calculation (Stored in DB via Webhook)

---


### Phase 5: Polish & Refinement
- [x] Fix horizontal scrolling overlap in Projects section
- [x] Ensure all sections utilize full screen height
- [x] Implement smooth scrolling for navigation links
- [x] Add loading animations for data fetching
- [x] Improve text sizing and centering
- [x] Magnetic buttons
- [x] Image reveal animations (Component created)
- [x] Text scramble effects on hover
- [x] Review mobile responsiveness
- [x] Conduct accessibility audit (ARIA labels, keyboard navigation)
- [ ] Fix Select component native scrolling (currently using arrow-based navigation due to Radix/Tailwind conflict)

---

## 🔮 Phase 6: Future Enhancements / Backlog

### Newsletter Automation
- [ ] Trigger n8n webhook on new subscriber (To be done in n8n)
- [ ] Email confirmation flow (optional) (To be done in n8n)
- [ ] Real workflow visualization from actual data (To be done in n8n)

### RSS Feed
- [x] Generate RSS XML from published articles (`src/lib/rss.ts` implemented)
- [ ] Auto-update on new article publish (Note: Can be handled via a build hook or edge function)
- [x] Add RSS link to footer

### SEO & Meta
- [x] Dynamic OG images per page (Metadata support in `src/components/SEO.tsx`)
- [x] JSON-LD structured data (`src/components/SEO.tsx` implemented)
- [x] Sitemap generation (`src/lib/sitemap.ts` implemented)
- [x] Analytics integration (`src/hooks/useAnalytics.ts` implemented)

---

## 🎨 Design Tokens Reference

### Colors (HSL)
```css
--background: 214 33% 6%        /* #0B0F14 */
--background-deep: 214 40% 4%   /* #070B0F */
--card: 217 33% 11%             /* #111827 */
--border: 215 19% 15%           /* #1F2937 */
--primary: 156 64% 52%          /* #3ECF8E */
--foreground: 220 13% 91%       /* #E5E7EB */
--muted-foreground: 218 11% 65% /* #9CA3AF */
```

### Typography
- Display: Inter 700, -0.03em tracking
- Headings: Inter 600, -0.02em tracking
- Body: Inter 400, 1.6 line-height
- Mono: JetBrains Mono 400

### Animation Timing
- Fast: 200ms
- Medium: 400ms
- Slow: 600ms
- Easing: cubic-bezier(0.16, 1, 0.3, 1) (Expo out)

---

## 📁 File Structure

```
src/
├── components/
│   ├── Navigation.tsx       ✅
│   ├── Hero.tsx             ✅
│   ├── WorkflowAnimation.tsx ✅
│   ├── AutomationSection.tsx ✅
│   ├── NewsletterSection.tsx ✅
│   ├── ProjectsSection.tsx  ✅
│   ├── ARTICLESSection.tsx   ✅
│   ├── AboutSection.tsx     ✅
│   ├── Footer.tsx           ✅
│   ├── HorizontalScroll.tsx 🚧
│   └── ui/                  (shadcn components)
├── pages/
│   ├── Index.tsx            ✅
│   ├── Work.tsx             📋
│   ├── ARTICLES.tsx          📋
│   └── NotFound.tsx         ✅
├── hooks/
│   ├── useGSAP.ts           🚧
│   └── useSupabase.ts       📋
├── lib/
│   ├── utils.ts             ✅
│   └── supabase.ts          📋
└── index.css                ✅

supabase/
├── functions/
│   ├── newsletter-webhook/  📋
│   ├── blog-webhook/        📋
│   └── contact-webhook/     📋
└── migrations/
    └── 001_initial_schema.sql 📋
```

---

## 🔗 Webhook Contract (n8n Integration)

### Newsletter Webhook
```json
POST /api/webhooks/newsletter
{
  "event": "subscriber.created",
  "data": {
    "email": "user@example.com",
    "subscribed_at": "2024-01-01T00:00:00Z"
  },
  "signature": "sha256=..."
}
```

### Blog Published Webhook
```json
POST /api/webhooks/blog-published
{
  "event": "article.published",
  "data": {
    "id": "uuid",
    "title": "Article Title",
    "slug": "article-slug",
    "excerpt": "...",
    "url": "https://..."
  }
}
```

---

## 🚀 Deployment Checklist

- [ ] Connect custom domain
- [ ] Configure DNS
- [ ] SSL certificate
- [ ] Environment variables
- [ ] Supabase production config
- [ ] n8n webhook URLs updated
- [ ] Analytics enabled
- [ ] Error monitoring (Sentry)

---

## 💡 Future Ideas

- [ ] Dark/light mode toggle (low priority per brief)
- [ ] Case study pages with detailed breakdowns
- [ ] Interactive workflow builder demo
- [ ] Live automation status dashboard
- [ ] AI chatbot for visitor questions
- [ ] Experiment/lab section for side projects

---
