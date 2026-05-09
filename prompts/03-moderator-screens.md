# Prompt 3 — Moderator home and new/edit screens (20 min)

**Paste this into a fresh Claude Code session:**

---

I'm continuing GrpTest. Scaffold is deployed, KV storage works, save/load API routes are live.

Goal for this prompt: Build the moderator-facing UI — home page listing saved discussions, new discussion editor with content parsing, edit functionality.

1. The moderator home page (app/page.tsx) should:
   - Show "GrpTest" header
   - List all saved discussions from the user's localStorage (stored as an array of {id, name})
   - Each discussion shown as a card with name, "Open" button, "Delete" button
   - "+ New discussion" button at top
   - Empty state: "No discussions yet. Click '+ New discussion' to prepare one."

2. New discussion screen at /new:
   - Field: "Name this discussion" (text input, required, e.g., "April 27 - About His Business")
   - Big textarea for content paste, with placeholder text showing the expected format:
     ```
     Title: About His Business
     Author: Patrick Kearon

     ## Section 1
     [paragraph text]

     - First question
     - Second question
     - Third question

     ## Section 2
     [paragraph text]

     - Question
     - Question
     ```
   - "Save" button that:
     a. Parses the textarea content (split on `## Section`, extract Title/Author from header, parse `- ` bullets as questions)
     b. POSTs to /api/discussions with the parsed structure
     c. Receives the ID back
     d. Adds {id, name} to the user's localStorage saved-discussions list
     e. Redirects to /m/[id] (the moderator detail view)
   - Validation: name required, must have Title, Author, at least one section. Show clear error messages if parsing fails.

3. Moderator detail view at /m/[id]:
   - Fetches the discussion from /api/discussions?id=[id]
   - Shows: name, title, author, parsed section preview (collapsed by default)
   - "Edit" button (opens content textarea pre-filled, save updates via PUT)
   - "Get share link" button (links to /[id] which is the participant view, opens it in new tab)
   - "Back to list" link
   - "Delete this discussion" small destructive action at bottom

4. Style with the brand visual system per the "Visual style" section of SPEC.md:
   - Cream background (var(--bg)), white cards (var(--card)) with subtle 1px var(--line) borders
   - Rounded corners (12-16px, rounded-xl) on all cards
   - Fraunces for the GrpTest wordmark, talk titles, and section headers
   - Inter for everything else (UI labels, buttons, helper text)
   - Generous padding inside cards (1.5rem / p-6)
   - Primary buttons: var(--accent) background, white text, rounded-lg, Inter 500
   - Secondary buttons: transparent with var(--line) border
   - Max content width 640px (max-w-2xl) centered on larger screens
   - Page padding: 1rem mobile, 1.5rem tablet, 2rem desktop
   - This should feel calm and considered, not generic Tailwind

5. The localStorage storage of saved-discussions list:
   - Key: 'grptest-saved-discussions'
   - Value: JSON array of {id, name}
   - Helper functions: addDiscussion(id, name), removeDiscussion(id), getDiscussions()
   - Put these in a small lib/storage.ts module

Test the full flow: create a new discussion, save it, see it on the home list, click into it, edit it, delete it.

---

**Done when:** You can create discussions, see them in your list, edit them, delete them. Test with one real piece of prepared content. Commit.
