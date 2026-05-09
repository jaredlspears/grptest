# CLAUDE.md — GrpTest

This file is automatically loaded by Claude Code on every session in this folder. Read it first.

## What this project is

GrpTest is a **throwaway validation app**. It exists to answer one question: *will participants in a small-group discussion engage with paragraphs and questions on their phones more readily than with paper handouts?*

Build it, use it once or twice, throw it away. The full plan is in `SPEC.md`. Build prompts are in `prompts/01-scaffold.md` through `prompts/06-final-test.md`.

## What this project is NOT

- **Not GrpLaunch.** There is a separate, real product called GrpLaunch in a sibling folder (`~/Documents/Claude/Projects/GrpLaunch`). Do not reference its codebase, patterns, planning docs, or design decisions. GrpTest is intentionally disposable.
- **Not a scalable system.** No accounts, no auth, no rate limiting, no real-time sync, no notes feature, no recap, no security. These are deliberate omissions.
- **Not a place to add features.** If you notice a missing feature, that's the point — it's listed under "What this doesn't do" in `SPEC.md`. Resist the instinct to fill it in.

## Hard rules

1. **Stay inside the spec.** Each build prompt has a defined scope. Do that and stop. If you finish early, double-check brand fidelity rather than expanding scope.
2. **Brand visual rules are not optional.** See `SPEC.md` "Visual style" section. Specifically:
   - Color palette: `--bg: #FBF6EC` cream, `--ink: #2A3F5C` deep blue, `--gold: #C9A856` warm gold accent only
   - Fraunces serif for wordmark + titles + paragraph display; Inter sans for everything else
   - White cards, 1px `var(--line)` borders, `rounded-xl`, generous `p-6` padding
   - Max content width 640px (`max-w-2xl`), centered on larger screens
   - **Avoid:** heavy shadows, bright accents beyond the gold, gradients, animation flourishes, modern-SaaS purple/teal, glass/neumorphism, emoji-heavy UI
   - **Vibe:** calm, considered, slightly bookish — quiet study app, not productivity tool
3. **Fresh Claude Code session per build prompt.** Each prompt in `prompts/` is meant to be pasted into a clean session. Don't chain them in one long thread.
4. **Commit after every prompt.** End each build piece with a git commit so you can roll back if a later piece breaks something.
5. **Don't migrate this code.** When the test is done, the codebase is thrown away. Don't introduce abstractions intended to "make porting easier later."

## Architecture (one paragraph)

Single Next.js 15 app on Vercel. Vercel KV (free tier) holds discussion content keyed by random short ID. Browser localStorage tracks the moderator's list of saved discussion IDs. No accounts, no DB tables. Participants get a URL with the ID; app fetches and displays.

## Coordination with Cowork

Jared has a separate Cowork chat where Claude (in Cowork mode) is acting as a checkpoint reviewer. After each build prompt completes and Jared commits, he'll bring the diff back to Cowork for a brand/spec/edge-case review before moving to the next prompt. You don't need to coordinate directly — just commit cleanly with descriptive messages so the diffs are easy to review.

## When in doubt

Re-read `SPEC.md`. If the spec doesn't cover something, choose the simpler option. This app has a 90-minute build budget and a one-or-two-use lifespan.
