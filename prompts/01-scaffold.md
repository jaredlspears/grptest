# Prompt 1 — Project scaffold and deploy (15 min)

**Paste this into a fresh Claude Code session:**

---

I'm building a quick test app called GrpTest. It's a throwaway validation tool — not a real product. Goal: in about 90 minutes, build a Next.js app that lets a moderator paste pre-prepared discussion material, save it, and share it with participants via a URL/QR code. Participants read the material on their phones at their own pace.

This app has nothing to do with any other project. Don't reference patterns from other codebases. Keep it simple.

For this first prompt, just get the foundation deployed:

1. Initialize a new Next.js 15 project with TypeScript and Tailwind in the current directory:
   - npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --use-npm
   - Use defaults for any other prompts

2. Edit the home page (app/page.tsx) to display a simple placeholder:
   - "GrpTest" in large Fraunces serif (weight 600, slightly negative letter-spacing)
   - "Quick discussion sharing" as subtitle in Inter
   - Use the brand colors per the "Visual style" section of SPEC.md
   - Set up the full color palette as CSS custom properties in app/globals.css:
     - --bg: #FBF6EC, --surface: #FFFCF5, --card: #FFFFFF
     - --ink: #2A3F5C, --ink-soft: #5A6B82, --ink-faint: #8A9AB0
     - --line: #C9D5E4, --accent: #2A3F5C, --gold: #C9A856
   - Add Google Fonts for Fraunces (weights 400, 500, 600) and Inter (weights 400, 500, 600) via the standard next/font/google approach
   - Apply Inter as the default body font, Fraunces as the heading font
   - Make sure the placeholder homepage already feels like the brand: cream background, deep blue ink, generous padding, centered content with comfortable max-width

3. Verify it runs locally:
   - npm run dev
   - Show me the placeholder homepage at localhost:3000

4. Initialize git, create a .gitignore (Next.js default), commit with message "initial scaffold"

5. Walk me through:
   - Creating a new GitHub repo named "grptest"
   - Pushing the code
   - Connecting to Vercel and deploying
   - Confirming the deployed URL works

When you need me to do something on a dashboard, give clear step-by-step instructions and tell me what info you need back.

---

**Done when:** Vercel URL is live and shows the placeholder homepage. Commit if you haven't already.
