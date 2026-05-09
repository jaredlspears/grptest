# Prompt 2 — Vercel KV setup and content storage (15 min)

**Paste this into a fresh Claude Code session:**

---

I'm continuing GrpTest. The scaffold is deployed to Vercel. Now I need persistent storage for discussion content.

Goal for this prompt: Set up Vercel KV (the free key-value store), build save/load API routes, verify they work.

1. Walk me through enabling Vercel KV for my project:
   - Go to my Vercel project dashboard
   - Find Storage tab
   - Create a KV database named "grptest-content"
   - Connect it to the project
   - Pull the environment variables to .env.local using `vercel env pull`
   - Tell me what to do exactly, step by step

2. Install @vercel/kv:
   - npm install @vercel/kv

3. Create an API route at app/api/discussions/route.ts that handles:
   - POST: accepts JSON body with { name, content }, generates a random short ID (8-char nanoid or similar), saves to KV with key `discussion:<id>`, returns the ID
   - GET (with id query param): looks up the discussion by ID, returns the data or 404

4. Create another route at app/api/discussions/[id]/route.ts that handles:
   - PUT: updates an existing discussion
   - DELETE: removes it

5. Test the endpoints with curl or a simple fetch call:
   - POST a sample discussion, get an ID back
   - GET it back using the ID
   - Verify it works locally
   - Push to Vercel and verify it works in production too

The discussion content shape is:
```
{
  name: string,         // user-given name like "April 27 - About His Business"
  title: string,        // talk title from parsed content
  author: string,       // talk author from parsed content
  sections: [
    {
      paragraph: string,
      questions: string[]
    }
  ],
  created_at: string    // ISO timestamp
}
```

For now, the API routes just store and retrieve the JSON. Parsing the textarea into this shape happens in the next prompt.

Don't worry about authentication, rate limiting, or security. This is a test app with public-ish content.

---

**Done when:** API routes work locally and on Vercel. You can save and retrieve test content. Commit.
