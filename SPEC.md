# GrpTest — Build Plan & Prompts

*A throwaway validation app. Build it tonight (or whenever you're rested), use it once or twice, learn from it, throw it away.*

*Build time: 90 minutes with Claude Code.*

---

## What this is and isn't

**This is:** A simple web app that lets you prepare discussion material ahead of time, save it, then share it with participants via a QR code or link. Participants read paragraphs and questions on their phones at their own pace. That's the entire app.

**This isn't:** GrpLaunch. There's no relationship between this codebase and the eventual GrpLaunch build. Don't carry over decisions. Don't try to make this scale. Don't add features. The only purpose of this app is to answer one question:

> *Will participants in a small-group discussion engage with paragraphs and questions on their phones more readily than they would with paper handouts?*

If the answer is yes, build the full GrpLaunch with confidence. If no, rethink the premise. Either outcome is valuable signal.

---

## What you need before starting

**Already have or about to get (you mentioned the domain):**
- The `grplaunch.app` domain (you said you'd get this — once purchased, you can host GrpTest at a subdomain like `test.grplaunch.app`, or skip the domain entirely and use the free Vercel URL)

**Accounts (free):**
- GitHub
- Vercel (sign up via GitHub if you don't have it)

**Software locally:**
- Node.js 20+
- Git
- Claude Code
- VS Code or any editor

That's it. No Anthropic API, no Supabase, no Resend, no Stripe. Just GitHub + Vercel.

---

## The architecture in one paragraph

Single Next.js app deployed to Vercel. Vercel KV (a small key-value store, free tier) holds saved discussion content keyed by a random short ID. Your browser's localStorage holds the list of IDs you've created so you can find them later. No accounts, no auth, no database tables. Participants get a URL with the ID; the app fetches the content from KV and displays it. Done.

---

## How you'll actually use it

**Saturday evening (or whenever you prep):**
1. Open the app on your laptop
2. Click "New discussion"
3. Type a name like "April 27 — About His Business"
4. Paste your prepared content (sections with paragraphs and questions) in a simple format
5. Click "Save"
6. Content is saved to Vercel KV; ID is added to your browser's saved list

**Sunday morning (or whenever you use it):**
1. Open the app — see your saved discussions list
2. Click the one you want
3. Click "Get share link"
4. QR code and URL appear
5. Display the QR on a projector, or text the URL to your group

**During the discussion:**
1. Participants scan QR or tap link
2. They see the title and "Section 1 of N"
3. Read the paragraph, see the questions
4. Tap "Next →" to move forward, "← Previous" to go back
5. They control their own pace — you do the rest of the moderation verbally

That's the entire UX. No login, no accounts, no real-time, no notes (skipped to keep the build small), no recap.

---

## Visual style — make it feel like the GrpLaunch mockups

This test app should look like a quieter sibling of GrpLaunch — same visual world, less complexity. Here are the specific style decisions Claude Code should follow:

### Color palette (light mode only — no dark mode for the test)

```
--bg: #FBF6EC          /* cream page background */
--surface: #FFFCF5     /* slightly lighter cream for elevated areas */
--card: #FFFFFF        /* white cards */
--ink: #2A3F5C         /* deep blue, primary text */
--ink-soft: #5A6B82    /* secondary text */
--ink-faint: #8A9AB0   /* tertiary text, captions */
--line: #C9D5E4        /* dividers and subtle borders */
--accent: #2A3F5C      /* primary buttons, same as ink for simplicity */
--gold: #C9A856        /* warm gold for accents only — section indicators, highlights */
```

Add these as CSS custom properties in globals.css and reference via Tailwind's arbitrary value syntax: `bg-[var(--bg)]`, `text-[var(--ink)]`, etc. Or define them in tailwind.config.ts as theme extensions. Either works.

### Typography

- **Fraunces** (serif): used for the "GrpTest" wordmark, talk titles, paragraph display in participant view, section headers. Weights 400, 500, 600 (load only what's used).
- **Inter** (sans): used for everything else — UI labels, buttons, helper text, lists. Weights 400, 500, 600.

Specific typography moments:
- Wordmark "GrpTest": Fraunces 600, slightly negative letter-spacing
- Talk title in participant view: Fraunces 500, ~28-32px on mobile, line-height 1.2
- Paragraph display: Fraunces 400, ~17-18px, line-height 1.7, color var(--ink)
- Question text: Inter 500, ~15-16px, line-height 1.5
- Small UI labels: Inter 500, ~12-13px, color var(--ink-faint), letter-spacing 0.05em, sometimes uppercase

### Card aesthetic

Cards (the paragraph display, question cards, discussion list items) should:
- White background (var(--card))
- Subtle border: 1px solid var(--line) — NOT a heavy shadow
- Rounded corners: 12-16px (rounded-xl in Tailwind)
- Generous padding: 1.5rem (p-6) inside cards
- Optional very subtle shadow for elevation: shadow-sm only, not shadow-lg

Avoid:
- Heavy shadows
- Sharp/no corners
- Tight padding
- Black borders

### Spacing rhythm

- Page padding: 1rem on mobile, 1.5rem on tablet, 2rem on desktop
- Vertical spacing between major elements: 1.5-2rem
- Vertical spacing within cards (between title/paragraph/questions): 1rem
- Max content width: 640px (max-w-2xl) — comfortable reading width
- Center content horizontally on larger screens

### Button styles

Primary buttons:
- Background: var(--accent) — the deep blue
- Text: var(--card) — white
- Padding: 0.75rem 1.5rem (px-6 py-3)
- Rounded: 8-10px (rounded-lg)
- Font: Inter 500
- Hover: slightly darker, no major transformation

Secondary buttons:
- Background: transparent
- Text: var(--ink)
- Border: 1px solid var(--line)
- Same padding and rounding as primary

Destructive actions (delete):
- Smaller, less emphatic — text-only style with red-ish hover state
- Don't make destructive buttons large or prominent

### Section indicator pill (participant view)

The "Section 1 of 5" indicator:
- Inline-flex with subtle background: var(--surface)
- Small padding: 0.25rem 0.75rem
- Rounded full
- Inter 500, ~12px, var(--ink-faint)
- A small gold dot (var(--gold)) before the text adds warmth

### Bottom navigation bar (participant view)

The Previous/Next bar:
- Sticky to bottom on mobile
- White background with top border: 1px var(--line)
- Padding: 1rem
- Buttons spread space-between
- Disabled state: opacity 50%, no hover

### Footer

Small "GrpTest" footer on the moderator pages:
- Centered, var(--ink-faint), Inter 400, ~12px
- Optional: "test app · grplaunch.app coming soon"

### What NOT to do

- No emoji-heavy interfaces
- No bright accent colors beyond the gold
- No heavy gradients
- No animation flourishes (subtle fade-ins are fine; bounces and slides are not)
- No "modern SaaS" purple/teal palettes
- No glass-morphism or neumorphism

The vibe is calm, considered, slightly bookish. Like a quiet study app, not a productivity tool.

---

## Build sequence

Plan for 90 minutes, broken into focused pieces. Don't try to chain them in one Claude Code session — fresh sessions per piece keep Claude Code's context clean.

| Piece | Time | What gets done |
|-------|------|----------------|
| 1 | 15 min | Project scaffold, deployed to Vercel |
| 2 | 15 min | Vercel KV set up, content save endpoint working |
| 3 | 20 min | Moderator home + new/edit screens |
| 4 | 20 min | Participant view (read-only display) |
| 5 | 15 min | QR code, share link, mobile polish |
| 6 | 5 min | End-to-end test on real phone |

Hit a wall on any piece? Commit what works, take a 5-minute break, and come back. Don't push through frustration.

---

## Pre-build setup (do this before opening Claude Code)

1. Decide where you want it deployed:
   - **Option A**: `test.grplaunch.app` (subdomain of your purchased domain). Set up the DNS in Vercel after deploy.
   - **Option B**: Use the default Vercel URL (`grptest.vercel.app` or whatever you name it). Faster, totally fine for a test.

2. Create an empty folder on your machine:
   ```
   mkdir grptest && cd grptest
   ```

3. Open Claude Code in that folder:
   ```
   claude
   ```

You're ready. Use the prompts in `prompts/`.

---

(See `prompts/01-scaffold.md` through `prompts/06-final-test.md` for each build step.)

---

## Domain configuration (optional, do whenever)

If you bought `grplaunch.app` and want GrpTest at a subdomain:

1. In Vercel project settings → Domains
2. Add `test.grplaunch.app`
3. Vercel gives you DNS records to add at your domain registrar
4. Add the records (CNAME pointing to Vercel)
5. Wait 5-30 minutes for DNS propagation
6. URL is live at `test.grplaunch.app`

If you skip this, the default Vercel URL works fine for testing. The QR codes encode whatever URL is current.

---

## What to do during and after the test

When you actually run the discussion with your group:

**During:**
- Display the QR code on the projector or write the short URL on a whiteboard
- Tell brothers: "Read along on your phone. We'll discuss as a group, and you can move to the next section when I tell you."
- Manually break them into groups physically: "This side of the room, let's pair up..."
- Take notes during the discussion: what works, what's awkward, who engages

**Right after:**
- Capture immediate observations:
  - Did people actually look at their phones?
  - Did anyone struggle to scan the QR?
  - Did the paragraphs read well?
  - Did pacing feel right?
  - Did anyone request paper instead?

**Within 24 hours:**
- Write up your observations
- Decide whether the assumption was validated:
  - Yes → continue with full GrpLaunch build
  - No → rethink the premise
  - Mixed → identify what differentiated engagers from resisters

---

## What this doesn't do — be clear with yourself

To save your future self frustration when you notice these:

- No notes feature (you said skip if not super easy — and it's not super easy in 90 min)
- No real-time sync — moderator can't push everyone forward at once
- No moderator dashboard during the discussion
- No tracking of what participants did
- No saved insights per discussion
- No accounts, so the saved discussions are tied to your specific browser
- No security — anyone with a URL can see the content

These are intentional limitations of the test app. They are *features* of the full GrpLaunch. Don't add them here.

---

## When you're done with the test

After running with your group once or twice:

- The lessons inform the full GrpLaunch design
- The code itself is throwaway — don't migrate any of it
- You can leave the deployed app running indefinitely (Vercel free tier is generous, KV storage is tiny)
- Or delete the project from Vercel and the code from GitHub — clean slate

Go to bed. Build it tomorrow when you're rested. Run it Sunday with the brothers. Capture what you learn. Then bring it back to design conversation and we'll figure out what it means for the full GrpLaunch.

---

*End of GrpTest plan. Throw this away after the test.*
