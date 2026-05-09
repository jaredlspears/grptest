# Prompt 5 — QR code, share link UI, mobile polish (15 min)

**Paste this into a fresh Claude Code session:**

---

I'm continuing GrpTest. Moderator and participant views work. Final polish: QR code generation, share link UI, mobile testing.

Goal for this prompt: Make the share experience smooth, add QR codes, polish anything that feels rough on mobile.

1. Install qrcode package:
   - npm install qrcode
   - npm install --save-dev @types/qrcode

2. On the moderator detail view (/m/[id]), enhance the "Get share link" experience:
   - Click "Get share link" → reveals a card below with:
     - The full share URL (e.g., "test.grplaunch.app/abc123" or "grptest.vercel.app/abc123")
     - "Copy link" button (uses navigator.clipboard.writeText)
     - QR code generated client-side (use qrcode.toDataURL on the URL, display as img)
     - "Open participant view" link that opens /[id] in a new tab
     - "Share via..." button using navigator.share if available (mobile only) — falls back to copy link otherwise

3. Quick polish pass:
   - Verify the participant view looks good on iPhone Safari and Android Chrome
   - Make sure tap targets are at least 44x44px
   - Verify no horizontal scroll anywhere
   - Make sure font sizes are readable without zoom (16px minimum on body text, larger on paragraph display)
   - Test the entire flow on a real phone if you haven't yet

4. Add a small "About this app" footer link on the moderator home page that opens a modal explaining:
   - "GrpTest is a quick experimental tool for sharing discussion material on phones."
   - "No accounts, no tracking. Discussion content is stored briefly and accessible by URL."
   - "If you want a permanent solution, check out grplaunch.app."

5. (If time): Add a delete confirmation modal so accidental deletes don't lose work.

That's the full polish. We're done after this.

Test the complete flow:
- Create a new discussion
- Save it
- Get the share link
- Scan QR with phone
- Tap through sections on phone
- Verify it all feels right

---

**Done when:** The full flow is smooth on a real phone. Commit. Push to Vercel for the final deployed version.
