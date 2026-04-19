# Musical Portfolio Redesign — Design Spec
**Date:** 2026-04-19  
**Status:** Approved for implementation

---

## 1. Overview

Full visual and UX redesign of ujjwalnepal.dev. Primary theme: **velvet nightclub / musical night**. Secondary layer: **Fedora Linux terminal** for search and navigation only. Music theme is primary — Linux is a functional tool, not a visual theme.

---

## 2. Visual Theme

### 2.1 Palette — Velvet Nightclub
| Role | Color | Hex |
|---|---|---|
| Background | Deep indigo-black | `#0c0a18` |
| Surface (cards) | Dark indigo | `#14102a` |
| Primary accent | Muted amethyst | `#7c58d4` |
| Gold accent | Antique gold | `#c9963f` |
| Gold light | Warm gold | `#e8c97a` |
| Mauve | Soft mauve | `#b06ab3` |
| Crystal | Light amethyst | `#c4b5fd` |
| Text primary | Lavender white | `#ede0ff` |
| Text muted | Muted lavender | `#7a6899` |
| Border | — | `rgba(124,88,212,0.20)` |

No hot neons. No eye-burning saturation. Rich, deep, luxurious.

### 2.2 Typography
- **Display / headings:** Bebas Neue (Google Fonts)
- **Body / code / terminal:** Space Mono (Google Fonts)
- **Terminal only:** Ubuntu Mono (Google Fonts)

---

## 3. Page Sections (top → bottom)

### 3.1 Crystal Ball Chandelier — Hero Header
- Full-width scene, height ~280px
- **SVG chandelier:** spherical / ball shape — 16 crystal arms radiating outward at 22.5° intervals from a central orb, creating a round silhouette
- Crystal types: amethyst, gold, rose — alternating, varied sizes
- Frame ring with pulsing gem dots at each arm tip
- Central glowing orb with gold core + glossy highlight
- Bottom pendant is the longest (most dramatic drape)
- Soft halo glow circle behind — reads as a sphere
- Whole chandelier sways on a gentle CSS animation (rotate ±1.5°, 7s loop)
- Crystal shimmer: brightness pulse animation, staggered delays per crystal
- Ceiling bar with mount plate, hanging rod
- Scattered crystal reflection dots on ceiling/walls (pink, gold, amethyst)
- Floor cone light below chandelier

### 3.2 Navbar
- Logo: `UJJWAL.DEV` — antique gold gradient, Bebas Neue
- Links: Home, Projects, Skills, Blogs, Contact
- **Terminal search button** (right side): `$_ search` + `Ctrl+K` hint badge
- Sticky, semi-transparent blur background

### 3.3 Hero Section
**Left column — text:**
- H1: `FULL / STACK / DEV` — amethyst gradient, "DEV" in gold
- Tagline: `▸ Ujjwal Nepal — Crafting Digital Grooves`
- "Now Playing" pill: spinning disc + `portfolio.js — 2026 Edition` + animated EQ bars

**Right column — headphones + cassette illustration (SVG):**
- Large over-ear headphones — purple/gold palette
  - 3D band with shine highlight + gold edge trim + padding seam details
  - Ear cups: outer shell gradient, bezel ring, cushion texture ring, speaker mesh lines, gold logo dot, glossy highlight
  - Hinge pieces at band-cup joints
- Coiled cable descends from both cups, meets center
- **Cassette tape** hanging from cable junction:
  - Corner screws, guide pins, tape path arc
  - Two spinning reels (SVG `animateTransform`, reliable cross-browser)
  - Gold hub centers
  - Label strip: `UJJWAL.DEV / SIDE A — PROJECTS`
- Floating music notes (♪ ♫ ♩ ♬) around headphones, slow float animation
- Sound wave rings pulsing from ear cups
- Whole unit bobs gently (translateY + slight rotate, 4s loop)

### 3.4 Waveform Divider
- 52 bars, colors cycling through palette, randomized heights + animation speeds

### 3.5 Projects Section — "Side A: Featured Tracks"
- Section label: `▸ SIDE A — Featured Tracks`
- Each project = cassette track card:
  - Track number (01, 02, …)
  - Emoji icon
  - Title + description
  - Technology tags (pill style)
  - GitHub link
- Hover: slide right + gold border glow
- "View All" link → `/projects` page

### 3.6 Skills Section
- Standard card grid layout matching the velvet theme (no terminal here)
- Grouped: Frontend / Backend / DevOps
- Tag pills styled consistently with project tags

### 3.7 Footer / Contact CTA
- "Let's Work Together" section
- Social links (LinkedIn, GitHub, Twitter)
- Email button

---

## 4. Terminal Search & Navigation

### 4.1 Trigger
- Navbar `$_ search` button click
- `Ctrl+K` keyboard shortcut (global)
- `Esc` closes

### 4.2 Appearance — Fedora GNOME Terminal Style
- Backdrop overlay: `rgba(6,4,15,0.75)` + `backdrop-filter: blur(6px)`
- Palette window: centered, max-width 560px, border-radius 10px
- **GNOME headerbar:** gradient `#3c3c3c → #2d2d2d`, macOS-style traffic light buttons (red/yellow/green), title `ujjwal@fedora: ~/portfolio — search`
- Prompt format: `[ujjwal@fedora ~/portfolio]$` — green username+host, blue directory
- Input: monospace, cursor blink animation

### 4.3 Navigation Targets (what appears in results)
**Sections (cd-style navigation):**
- `cd home/` → scroll to hero
- `cd projects/` → scroll to projects section
- `cd skills/` → scroll to skills section
- `cd blogs/` → scroll to blogs page
- `cd contact/` → scroll to contact section

**Page headers (auto-discovered):**
- All `h1`, `h2`, `h3` elements on the current page are indexed
- Listed under "Headers" group in results
- Clicking navigates (smooth scroll) to that element

**Projects (searchable):**
- All projects from `public/data.ts` are indexed by title + tags
- Appear under "Projects" group

**Blogs (navigation only, not searchable):**
- Blogs come from external GraphQL — not indexed for search
- `cd blogs/` navigates to the `/blogs` page
- Blog content search is out of scope

### 4.4 Interaction
- Typing filters all groups in real time (fuzzy match on title/tags)
- `↑` / `↓` keyboard navigation through results
- `Enter` navigates to selected item
- `Tab` autocompletes the command
- Footer shows keyboard hints

### 4.5 Commands (typed exactly)
| Command | Action |
|---|---|
| `ls` | Shows all sections |
| `cd <section>` | Navigates to section |
| `search <query>` | Filters all content |
| `open <project>` | Opens project GitHub link |
| `clear` | Clears terminal history |

---

## 5. Adding & Editing Projects — Developer Guide

### 5.1 Data file
All project data lives in **one file**: `/public/data.ts`

### 5.2 Featured projects (shown on homepage)
Add a new object to the `featuredprojects` array:

```ts
// /public/data.ts — featuredprojects array
{
  title: "Your Project Name",
  description: "One sentence description of what it does",
  tags: ["Next.js", "TypeScript", "YourTech"],
  github: "https://github.com/ujjwal-207/your-repo",
  demo: "https://your-demo-url.com",  // optional, use "#" if none
  video: "data/your-video.mp4",       // optional, place in /public/data/
}
```

### 5.3 All projects (shown on /projects page)
Add to the `projects` array:

```ts
// /public/data.ts — projects array
{
  title: "Your Project Name",
  description: "What it does, one or two sentences",
  github: "https://github.com/ujjwal-207/your-repo",
  demo: "https://your-demo-url.com",  // optional
  tags: ["React", "Node.js"],          // optional
}
```

### 5.4 Rules
- `featuredprojects` = max 4 items (homepage grid)
- `projects` = unlimited (all projects page)
- Tags appear as pill labels — keep them short (1–2 words)
- No code change needed anywhere else — components read directly from this file
- Video files: place in `/public/data/` folder, reference as `"data/filename.mp4"`

---

## 6. Component Architecture

```
components/
  chandelier/
    CrystalBallChandelier.tsx   — SVG chandelier, standalone
  hero/
    HeroSection.tsx             — grid layout, text + headphones
    HeadphonesCassette.tsx      — SVG illustration
    NowPlaying.tsx              — spinning disc + EQ bars
  navigation/
    Navbar.tsx                  — logo + links + search button
    TerminalPalette.tsx         — command palette overlay (Ctrl+K)
    useTerminalSearch.ts        — search/filter hook
  projects/
    FeaturedProjects.tsx        — "Side A" track cards (homepage)
    ProjectCard.tsx             — single track card
    AllProjects.tsx             — full grid (/projects page)
  shared/
    WaveformDivider.tsx         — animated bar divider
    TagPill.tsx                 — tech tag pill
  skills/
    SkillsSection.tsx           — grouped skill cards
  Footer.tsx

public/
  data.ts                       — ALL project/skill data lives here
```

---

## 7. Data Structure (final)

```ts
// public/data.ts

export type FeaturedProject = {
  title: string
  description: string
  tags: string[]
  github: string
  demo?: string
  video?: string
}

export type Project = {
  title: string
  description: string
  github: string
  demo?: string
  tags?: string[]
}

export type Skill = {
  category: string
  items: string[]
}

export const featuredprojects: FeaturedProject[] = [ ... ]
export const projects: Project[] = [ ... ]
export const skills: Skill[] = [ ... ]
```

---

## 8. Animations Summary

| Element | Animation | Duration |
|---|---|---|
| Chandelier | Sway rotate ±1.5° | 7s loop |
| Crystal shimmer | Brightness + scaleX pulse | 3.5s staggered |
| Gem dots on ring | Scale pulse (0.65→1.15) | 1.8s staggered |
| Headphone unit | Bob (translateY + rotate) | 4s loop |
| Cassette reels | Full rotation (SVG animateTransform) | 2.2s loop |
| Floating notes | Float up + rotate | 3.5s staggered |
| Sound wave rings | Expand + fade | 2.4s staggered |
| Now Playing disc | Continuous spin | 4s loop |
| EQ bars | ScaleY pulse | 0.5s staggered |
| Waveform divider | ScaleY pulse | 0.4–0.9s random |
| Terminal cursor | Blink step | 0.9s loop |

---

## 9. Out of Scope
- Dark/light mode toggle (keep existing theme system, default dark)
- CMS or database for projects (flat file in `data.ts` is sufficient)
- Blog writing UI (blogs remain as-is)
- Mobile-specific animations (CSS `prefers-reduced-motion` respected)
