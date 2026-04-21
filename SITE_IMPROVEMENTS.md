# Faith Marie Foundation - Site Improvement Roadmap

This document outlines recommended improvements based on research of successful nonprofits with similar missions: grief support, mental health accessibility, and research translation.

---

## Comparable Organizations Researched

| Organization | Focus Area | Key Strength |
|-------------|-----------|--------------|
| [The Compassionate Friends](https://www.compassionatefriends.org/) | Child loss grief support | 500+ chapters, 50 years of trust |
| [NAMI](https://www.nami.org/) | Mental health accessibility | Grassroots scale, condition-specific resources |
| [The Jed Foundation](https://jedfoundation.org/) | Youth mental health | Clean UX, persistent crisis widget |
| [MISS Foundation](https://www.missfoundation.org/) | Child loss + research | Academic credibility, trauma-informed language |
| [TWLOHA](https://twloha.com/) | Mental health storytelling | Emotional branding, community building |
| [Judi's House](https://judishouse.org/) | Childhood grief research | Research-backed, free services model |

---

## High Priority Improvements

### 1. Add Persistent Crisis Support Widget

**Why:** Both NAMI and The Jed Foundation feature floating "Get Help" buttons that remain visible as users scroll. Mental health sites should make crisis resources immediately accessible.

**Current State:** Crisis support page exists at `/crisis-support` but requires navigation to find.

**Recommendation:**
- Add a fixed-position button in the bottom-right corner
- Display "Get Help" or "Crisis Support" with 988 visible
- Link directly to `/crisis-support`
- Ensure it's visible but not intrusive

---

### 2. Add Impact Metrics to Homepage

**Why:** The Compassionate Friends displays "500+ chapters" and "50 years of service." TWLOHA shows specific donation impacts. Trust signals help visitors understand organizational credibility.

**Current State:** No quantified impact metrics on homepage.

**Recommendation:**
- Add a metrics section showing real data only:
  - Number of research digests published
  - Number of newsletter subscribers
  - Number of research topics covered
- Update these numbers as they grow (do not fabricate)
- Consider an automated counter tied to actual data

---

### 3. Add Specific Donation Impact Statements

**Why:** TWLOHA uses messaging like "$45 provides someone with one hour of mental health support." Specific impact statements increase donor confidence.

**Current State:** Donation page exists but lacks impact framing.

**Recommendation:**
- Add statements tied to real operational costs:
  - "$20 covers one day of AI research infrastructure"
  - "$50 supports one week of database scanning"
  - "$150 funds one month of research operations"
- Base amounts on actual monthly operating costs documented in AI transparency page

---

### 4. Create Dedicated Faith Marie Story Page

**Why:** MISS Foundation prominently features founder Dr. Joanne Cacciatore's story. Personal narratives build emotional connection and trust.

**Current State:** Faith Marie's story is mentioned on the homepage and "Our Story" page but could be more prominent and detailed.

**Recommendation:**
- Create `/faiths-story` or enhance `/our-story` with:
  - Faith Marie's full story with timeline
  - Photos (if family is comfortable sharing)
  - How the foundation honors her memory
  - Connection to the mission
- Link prominently from homepage and navigation

---

## Medium Priority Improvements

### 5. Add Testimonials / Voices Section

**Why:** The Compassionate Friends and MISS Foundation use quotes from families they've served. Human voices add credibility and emotional resonance.

**Current State:** No testimonials or user stories on the site.

**Recommendation:**
- Create a "Voices" or "Community Stories" section
- Collect feedback from:
  - Newsletter subscribers (with permission)
  - Chatbot users (with permission)
  - Email series participants
- Start with founder reflections until external testimonials are available
- Never fabricate testimonials

---

### 6. Add Audience-Based Navigation

**Why:** NAMI segments resources by audience (teens, veterans, caregivers). This helps visitors find relevant content faster.

**Current State:** Navigation is feature-organized (Research, Tools, About).

**Recommendation:**
- Consider adding secondary entry points:
  - "I'm grieving" → grief resources, chatbot, crisis support
  - "I'm supporting someone" → how to help guides, resources to share
  - "I'm a professional" → research methodology, partnership info
- Could be implemented as a "How can we help?" section on homepage

---

### 7. Strengthen Mobile Crisis Access

**Why:** Research indicates 50-80% of nonprofit traffic comes from mobile devices. Crisis resources must be thumb-accessible.

**Current State:** Site is responsive but crisis access requires scrolling/navigation on mobile.

**Recommendation:**
- Ensure crisis information appears above the fold on mobile
- Add tap-to-call links for 988 and other hotlines
- Test mobile user flow for someone in crisis

---

### 8. Add Charity Transparency Badges

**Why:** The Compassionate Friends displays BBB Accredited Charity and other badges. These signal legitimacy to donors.

**Current State:** No third-party charity ratings displayed.

**Recommendation:**
- Apply for ratings as organization grows:
  - [GuideStar/Candid](https://www.guidestar.org/) - Free nonprofit profile
  - [Charity Navigator](https://www.charitynavigator.org/) - Requires 7 years + $1M revenue
  - [BBB Wise Giving Alliance](https://give.org/) - Standards-based evaluation
- Display badges once earned
- Start with GuideStar profile (free, immediate)

---

## Future Improvements

### 9. Local Resource Directory

**Why:** The Compassionate Friends has a chapter locator. NAMI has local affiliate search. Connecting people to local support is valuable.

**Current State:** Resource finder concept mentioned but not fully built.

**Recommendation:**
- Partner with existing organizations rather than building from scratch
- Link to:
  - The Compassionate Friends chapter finder
  - NAMI local affiliate search
  - Psychology Today therapist finder
- Consider curated directory by state/region over time

---

### 10. Professional Resources Section

**Why:** MISS Foundation offers CE credits for professionals. Therapists and counselors are key distribution channels for mental health resources.

**Current State:** No dedicated professional section.

**Recommendation:**
- Create "For Professionals" section with:
  - Shareable research digests
  - Methodology documentation
  - Partnership inquiry form
- Consider future CE credit partnerships as research library grows

---

### 11. Welcome Email Series for Subscribers

**Why:** TWLOHA and other nonprofits use automated email sequences to build engagement after signup.

**Current State:** Newsletter with topic preferences exists; grief series email program exists.

**Recommendation:**
- Create welcome sequence for general subscribers:
  - Email 1: Welcome + mission overview
  - Email 2: How to use research digests
  - Email 3: Invitation to explore chatbot/tools
  - Email 4: Ways to get involved
- Track engagement to refine over time

---

## Implementation Priority

### Quick Wins (Can implement now)
1. Persistent crisis support widget
2. Donation impact statements based on real costs
3. GuideStar profile registration
4. Mobile crisis access improvements

### Short-Term (Next quarter)
5. Impact metrics section (once data exists to display)
6. Enhanced Faith Marie story page
7. Audience-based navigation exploration

### Long-Term (As organization grows)
8. Testimonials section (needs user feedback first)
9. Local resource directory partnerships
10. Professional resources section
11. Additional charity badges (require scale)

---

## Key Principle

**Do not fabricate data.** All metrics, testimonials, and impact statements must be based on real, verifiable information. It's better to show no numbers than fake numbers. As the foundation grows, these sections can be populated with authentic data.

---

## Sources

- [The Compassionate Friends](https://www.compassionatefriends.org/)
- [NAMI](https://www.nami.org/)
- [The Jed Foundation](https://jedfoundation.org/)
- [MISS Foundation](https://www.missfoundation.org/)
- [To Write Love On Her Arms](https://twloha.com/)
- [Judi's House](https://judishouse.org/)
- [National Alliance for Children's Grief](https://nacg.org/)
- [Best Nonprofit Websites 2026 - Kanopi](https://kanopi.com/blog/best-nonprofit-websites/)
- [WHO - Responsible AI for Mental Health](https://www.who.int/news/item/20-03-2026-towards-responsible-ai-for-mental-health-and-well-being--experts-chart-a-way-forward)
