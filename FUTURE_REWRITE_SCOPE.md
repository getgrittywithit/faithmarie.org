# Future Rewrite Scope
## AI Language & Architecture Rewrite — Decisions Locked In

*Created: April 2026*
*Status: NOT YET EXECUTED — context for next session*

---

## Context

The Faith Marie Foundation has completed a positioning pivot:
- The foundation is **not** faith-first — it serves every family navigating grief and mental health, regardless of belief
- The name "Faith Marie" is the founder's daughter's name, not a mission statement
- AI is a **tool** we use, not our identity — it should be methodology in the background, not marketing in the foreground

The mission statement has been updated in key locations (layout.tsx, homepage hero, footer). The sections below the hero still read AI-forward. That dissonance is intentional — it signals this rewrite is the next project.

---

## Decisions Locked In

### A. /about/ai-transparency Page

**Current:** Standalone page at `/about/ai-transparency` that positions AI agents as central to identity.

**Change:**
- Fold INTO `/about` as a section
- Retire the `/ai-transparency` URL (301 redirect to `/about`)
- The methodology content becomes a section titled "How We Work" or "Our Methodology"
- Demoted from hero treatment to a paragraph or two
- Framing: "We use AI research tools to help scan and summarize studies; our team reviews what gets published."
- Honest but not central

---

### B. Chatbot Positioning

**Current:** Positioned with AI-forward language ("AI-powered tools," "empathetic chatbot").

**Change:**
- Position as a **research guide / librarian** — NOT a companion, therapist, or friend
- User-facing framing: "Tell me what you're going through and I'll help you find trusted resources."
- Name TBD (candidates: Ask Faith Marie, Guide, Finder)
- The tool points users to vetted existing resources
- It does NOT generate medical advice

---

### C. /research Section Retirement

**Current:** `/research` as a top-level section with "AI teams," "autonomous agents," etc.

**Change:**
- Retire `/research` as a top-level section
- Replace with: "Topics" or "Library" section organized by **user need**:
  - Conditions
  - Medications
  - Grief
  - Supporting someone
  - Crisis

**Each topic page structure:**
1. Plain-language explainer
2. "If you need help right now" crisis callout
3. Curated links to trusted professional resources
4. FMF-made practical tools (worksheets, question lists, safety-plan templates)
5. Related topics

---

### D. Homepage Reframe

**Current:** Marketing-first with AI-forward language prominent.

**Change:**
- Hero becomes **utility-first**: "What do you need right now?" chooser
  - In crisis
  - Learning about a condition
  - Supporting someone
  - Just looking
- No "autonomous AI teams" language anywhere above the fold
- Librarian chatbot is the always-available second entry point

---

### E. Remaining AI Language Cleanup

**Files requiring rewrite:**
- `/research` (entire section)
- `/research/topics` and `/research/topics/[slug]`
- `/get-involved` (references to "AI research teams," "AI infrastructure")
- `/about/team` (Levi's bio mentions "autonomous AI agents")
- `/our-story` (mentions "autonomous AI agent teams")
- Homepage sections below the hero
- `DonateButton.tsx` ("powers our AI research teams")
- `Footer.tsx` (already updated in this pass)

**New framing across all:**
- Library / curator / methodology-in-the-background model
- "We read the research so you don't have to"
- "Our team reviews thousands of studies and translates them into guidance you can use"
- AI mentioned only when specifically relevant (e.g., transparency section)

---

## What NOT to Change

- **Organization name:** Faith Marie Foundation (stays)
- **Faith content in /learn:** Prayer & Contemplation section, scripture quotes, pastoral counseling listed as therapy option — this is inclusive (one option among many), not faith-first
- **Crisis resources:** Leave as-is
- **/learn page structure:** Separate project for URL restructure and SEO optimization

---

## Execution Notes

- This is a significant rewrite affecting multiple pages
- Should be done in a single coordinated session
- Requires redirect setup for retired URLs
- Consider staging/preview before going live
- Update any external links (social bios, directory listings) after launch

---

*This document captures decisions made in April 2026. Execute when ready for the AI/architecture rewrite session.*
