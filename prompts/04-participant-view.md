# Prompt 4 — Participant view (20 min)

**Paste this into a fresh Claude Code session:**

---

I'm continuing GrpTest. Moderator side is built — I can save and edit discussions. Now I need the participant view.

Goal for this prompt: Build the read-only participant view at /[id] that displays a discussion section by section on phones.

1. Create the participant route at app/[id]/page.tsx:
   - Fetches /api/discussions?id=[id]
   - If 404, shows "Discussion not found" with a friendly message
   - Otherwise renders the discussion view

2. Layout for the participant view (follow the "Visual style" section of SPEC.md):
   - Top: small "GrpTest" wordmark in Fraunces 600, var(--ink-faint)
   - Talk title in Fraunces 500, ~28-32px on mobile, line-height 1.2, var(--ink)
   - Author subtitle in Inter 400, var(--ink-soft)
   - Section indicator pill: inline-flex, var(--surface) background, rounded-full, ~12px Inter 500, var(--ink-faint), small gold dot (var(--gold)) before the text
   - Paragraph displayed in a card:
     - White background (var(--card)), 1px var(--line) border, rounded-xl
     - Padding 1.5rem (p-6)
     - Fraunces 400, ~17-18px, line-height 1.7, color var(--ink)
     - Comfortable reading width (max-w-2xl on larger screens, full width on mobile)
   - Questions stacked below in their own subtle cards:
     - Background var(--surface), border var(--line), rounded-lg
     - "Question 1" small label in Inter 500 ~12px var(--ink-faint) uppercase
     - Question text in Inter 500 ~15-16px, line-height 1.5, var(--ink)
     - 1rem spacing between question cards
   - Sticky bottom bar:
     - White background, top border 1px var(--line)
     - "← Previous" button on left (disabled on section 1)
     - "Next section →" button on right (disabled on last section)
     - Section dot indicators between them showing position
     - Buttons in Inter 500, comfortable padding, primary style for active

3. State management:
   - useState for currentSection (0-indexed)
   - Previous/Next buttons increment/decrement
   - On section change, scroll to top smoothly

4. Mobile-first styling:
   - Test on iPhone-sized viewport (375px wide)
   - Padding: 1rem on mobile, 2rem on tablet+
   - Max width 640px on tablet+, centered
   - Font sizes that are comfortable to read on phones

5. Empty/edge cases:
   - Discussion has 0 sections: show "This discussion has no content yet."
   - Discussion has 1 section: hide the navigation
   - Network error fetching: show "Could not load discussion. Try refreshing."

Test by:
- Opening a saved discussion in moderator view
- Clicking "Get share link"
- Scrolling through sections in the new tab
- Open the same URL on your actual phone (deploy to Vercel first if needed)
- Verify it reads well on a phone screen

---

**Done when:** Participant view works on a real phone with real content. Commit.
