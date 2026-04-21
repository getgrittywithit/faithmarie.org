# Faith Marie Foundation Website Optimization Plan

## Executive Summary

This plan addresses four key areas: **Clarity**, **Professional Non-Profit Design**, **SEO**, and **Usability**. The site has a solid foundation with Next.js 16, clean code, and good functionality. The improvements below will elevate it to a polished, high-trust nonprofit presence.

---

## 1. CLARITY IMPROVEMENTS

### 1.1 Homepage Messaging
**Current Issue:** The homepage leads with "AI-powered mental health research" which may confuse visitors about what they'll actually get.

**Recommendations:**
- [ ] Lead with the *outcome* for visitors, not the technology
  - Current: "AI-powered mental health research, made accessible to everyone"
  - Suggested: "Understanding grief, trauma, and mental health — research translated into guidance you can use"
- [ ] Add a clear value proposition section: "What you'll find here"
- [ ] Simplify the two-pillar section — currently "Research" vs "Tools" distinction is unclear to newcomers

### 1.2 Navigation Clarity
**Current Issue:** Navigation has good structure but some labels are vague.

**Recommendations:**
- [ ] Rename "Tools" to "Support Tools" or "Get Support"
- [ ] Consider adding "Start Here" page for new visitors
- [ ] Add breadcrumbs on inner pages (research digests, topic pages)

### 1.3 Research Section
**Current Issue:** "Coming Soon" placeholders may erode trust.

**Recommendations:**
- [ ] Either hide unpublished sections or show realistic timeline
- [ ] Add sample content to demonstrate value before full launch
- [ ] Clarify what "AI Research Teams" means in plain language — many visitors won't understand autonomous agents

### 1.4 Call-to-Action Clarity
**Current Issue:** Multiple CTAs competing (Explore Research, Access Tools, Get Involved, Newsletter).

**Recommendations:**
- [ ] Establish clear primary CTA per page
- [ ] Reduce homepage CTAs to 2-3 maximum
- [ ] Make newsletter signup benefit clearer: "Get weekly research summaries" vs just "Stay Updated"

---

## 2. PROFESSIONAL NON-PROFIT DESIGN

### 2.1 Trust Indicators (Critical for Nonprofits)
**Missing Elements:**

- [ ] **501(c)(3) Status Badge** — Add to footer and donation pages
- [ ] **Financial Transparency** — Link to annual reports, Form 990 (when available)
- [ ] **Board of Directors** — Currently shows "seeking advisors" — either remove or add confirmed members
- [ ] **Partner/Funder Logos** — Add logo bar if you have institutional partners
- [ ] **Media/Press Section** — Even a placeholder shows legitimacy
- [ ] **Contact Information** — Physical address or PO Box, phone number
- [ ] **Privacy Policy & Terms** — Links exist in footer but pages may need content

### 2.2 Visual Polish
**Current State:** Clean and modern, but could feel more established.

**Recommendations:**
- [ ] Add a professional logo (currently text-only "Faith Marie Foundation")
- [ ] Create consistent imagery style — current photos are personal/family; consider adding some professional mental health imagery
- [ ] Standardize icon usage — mixing lucide-react + inline SVGs + emoji (💔, 🛡️, 🌧️, ⚡)
- [ ] Add subtle texture or depth to hero sections — current gradients feel slightly generic
- [ ] Consider a more distinctive color — teal is common in mental health space

### 2.3 Photo Gallery
**Current Issue:** 37 high-resolution photos (~60MB+) creates slow loading.

**Recommendations:**
- [ ] Compress and optimize images (WebP format)
- [ ] Use Next.js Image component with proper sizing
- [ ] Implement lazy loading
- [ ] Consider curating to 8-12 most impactful photos
- [ ] Add lightbox for full-size viewing

### 2.4 Donation Experience
**Current State:** Functional Stripe integration with good preset amounts.

**Recommendations:**
- [ ] Add impact statements with amounts ("$50 funds one week of research processing")
- [ ] Add recurring donation option
- [ ] Show donor count or total raised (social proof)
- [ ] Add employer matching prompt
- [ ] Streamline modal — currently requires extra click

### 2.5 Typography & Spacing
**Current State:** Good use of Geist font, but some inconsistencies.

**Recommendations:**
- [ ] Increase body text line-height for readability (currently adequate but could be more generous)
- [ ] Ensure consistent heading hierarchy across pages
- [ ] Add more whitespace between sections on content-heavy pages

---

## 3. SEO OPTIMIZATION

### 3.1 Technical SEO (High Priority)
**Missing/Incomplete:**

- [ ] **Add sitemap.xml** — Create dynamic sitemap for all pages
- [ ] **Add robots.txt** — Allow crawling, point to sitemap
- [ ] **Add canonical URLs** — Prevent duplicate content issues
- [ ] **Add structured data (JSON-LD):**
  - Organization schema (nonprofit)
  - Article schema (for research digests)
  - FAQ schema (for common questions)
  - BreadcrumbList schema

### 3.2 Meta Tags (High Priority)
**Current:** Basic title/description only.

**Add to all pages:**
- [ ] Open Graph tags (og:title, og:description, og:image, og:type, og:url)
- [ ] Twitter Card tags (twitter:card, twitter:title, twitter:description, twitter:image)
- [ ] Create OG images for social sharing (1200x630px)

### 3.3 Content SEO
**Recommendations:**

- [ ] Add H1 tags consistently (some pages may be missing proper hierarchy)
- [ ] Optimize page titles for search:
  - Current: "Our Story | Faith Marie Foundation"
  - Better: "Our Story: How Faith Marie Inspired a Mental Health Research Mission"
- [ ] Add alt text to all images (PhotoGallery currently has placeholders)
- [ ] Internal linking strategy — link between related research topics
- [ ] Add FAQ sections to key pages (good for featured snippets)

### 3.4 Performance SEO
**Current Issues:**

- [ ] Large unoptimized images in gallery
- [ ] No visible performance optimization (though Next.js handles much automatically)

**Recommendations:**
- [ ] Implement image optimization pipeline
- [ ] Add loading="lazy" to below-fold images
- [ ] Consider preloading critical fonts
- [ ] Run Lighthouse audit and address issues

### 3.5 Local/Niche SEO
**Recommendations:**

- [ ] Target long-tail keywords: "grief research explained," "PTSD studies simplified," "child loss support research"
- [ ] Create topic hub pages that aggregate related content
- [ ] Consider blog/news section for fresh content signals

---

## 4. USABILITY IMPROVEMENTS

### 4.1 Mobile Experience
**Current State:** Responsive design exists but needs testing.

**Recommendations:**
- [ ] Test all interactive elements on mobile (modals, dropdowns, chat)
- [ ] Ensure touch targets are 44px minimum
- [ ] Test donation flow on mobile
- [ ] Verify chat interface works well on small screens

### 4.2 Accessibility (A11y)
**Current Gaps:**

- [ ] Add skip-to-main-content link
- [ ] Add ARIA labels to icon-only buttons
- [ ] Ensure all form fields have associated labels (not just placeholders)
- [ ] Add aria-live regions for chat messages
- [ ] Add role="dialog" and aria-modal to modal components
- [ ] Test with screen reader (VoiceOver/NVDA)
- [ ] Ensure focus management in modals (trap focus, return focus on close)
- [ ] Add visible focus indicators (Tailwind focus:ring may not be enough)

### 4.3 Forms & Interactions
**Recommendations:**

- [ ] Add inline validation with clear error messages
- [ ] Show loading states during form submission
- [ ] Add success confirmations (toast notifications)
- [ ] Improve chat interface:
  - Add typing indicator
  - Show message timestamps
  - Allow message copying
  - Add conversation history persistence

### 4.4 Navigation & Wayfinding
**Recommendations:**

- [ ] Add breadcrumbs on research digest pages
- [ ] Add "Back to [section]" links on detail pages
- [ ] Consider sticky table of contents on long pages
- [ ] Add search functionality (especially for research content)
- [ ] Add "Related Topics" or "You might also like" sections

### 4.5 Error Handling
**Recommendations:**

- [ ] Create custom 404 page with helpful navigation
- [ ] Add error boundaries for chat failures
- [ ] Graceful fallbacks if APIs are unavailable
- [ ] Clear messaging when content is "coming soon"

---

## 5. IMPLEMENTATION PRIORITIES

### Phase 1: Trust & SEO Foundation (Do First)
1. Add sitemap.xml and robots.txt
2. Add Open Graph and Twitter meta tags
3. Add 501(c)(3) badge and contact info to footer
4. Optimize/compress photo gallery images
5. Add structured data (Organization schema)

### Phase 2: Clarity & Messaging
1. Revise homepage hero copy
2. Simplify navigation labels
3. Add breadcrumbs
4. Clarify CTAs

### Phase 3: Polish & Accessibility
1. Add skip link and improve ARIA
2. Create custom logo
3. Standardize iconography
4. Improve form validation and feedback

### Phase 4: Enhanced Features
1. Add site search
2. Improve chat interface
3. Add recurring donations
4. Build out research content

---

## 6. QUICK WINS (Can Do Today)

These require minimal effort but improve perception:

1. **Add 501(c)(3) text to footer** (if applicable)
2. **Add physical contact info** (PO Box at minimum)
3. **Replace emoji icons with consistent SVG icons**
4. **Add og:image meta tag** (even a simple branded image)
5. **Add robots.txt** (simple allow-all with sitemap reference)
6. **Compress gallery images** (use squoosh.app or similar)

---

## 7. METRICS TO TRACK

After implementation, monitor:

- **Google Search Console:** Impressions, clicks, indexed pages
- **Core Web Vitals:** LCP, FID, CLS scores
- **Donation conversion rate:** Visits to donation page vs completions
- **Newsletter signup rate:** Homepage visitors vs signups
- **Bounce rate:** Especially on homepage and research pages
- **Time on site:** Are people reading content?

---

## Notes

- Site is built on solid technical foundation (Next.js 16, TypeScript, Tailwind)
- Core functionality works (donations, newsletter, chat)
- Main gaps are trust signals, SEO basics, and content maturity
- Design is clean but could be more distinctive

This plan can be implemented incrementally. Start with Phase 1 for immediate credibility and search visibility gains.
