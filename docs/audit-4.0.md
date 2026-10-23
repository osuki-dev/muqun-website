# muqun.dev audit for App 4.0 — 2026-10-23

Scope: the site at `main` (`82be9c0`, the version deployed at muqun.dev today)
against App `4.0.0` (`app/release-notes/v4.0.0.md`, app `main` `b38fd730`) and
Gateway `v0.14.1-preview.4` (`gateway/README.md`, `src/platform/routes.rs`).
Checked: every page in every locale as built (`bun run build`, 61 pages),
`scripts/verify-site.mjs`, `bun run check`, Lighthouse desktop on `/`,
`/support/`, `/themes/`, headless renders at 1440×900 and 390×844 in light and
dark, and the app source for every feature the site claims.

Ranking: **M** must fix before the 4.0 store submission this week; **S** should
fix soon after; **L** later.

## 1. Claims and copy

### Home (`/`, `src/pages/[...lang]/index.astro`)

| # | Where | Finding | Rank |
|---|---|---|---|
| 1.1 | `#film` | Eyebrow reads `MUQUN / 3.0`, `aria-label="Muqun 3.0"`, alt `Muqun 3.0`, directly under a `MUQUN / 4.0.0` hero. The film itself is the 3.0 promo: a Home with a `Continue` list (`claude · ~/project · OpenCode session`), a "Claude Code" approval card drawn as a native conversation (no such view exists in 4.0; the read-only Claude view was removed in app #135), themes Cyber Miko and Eclipse Archivist, and a pixel-mascot end card. Nothing in it shows Stage Home, the Home composer, Codex conversations or the Neon icon. | M (relabel), owner decision (replace) |
| 1.2 | hero `.hero-agents-strip` | The "Native" label is a hard-coded ternary in the template (`zh` → 原生助手, `ja` → ネイティブ, `ko` → 네이티브, everything else English). de, fr, es, pt, ru, vi, th readers get an English word in a localized hero. Belongs in `src/i18n/world.ts`. | S |
| 1.3 | features (22 tiles) | No tile for what 4.0 is visibly about: Stage Home (theme artwork as a 3D world with agent status below it), the 3D computer map, the 4.0 intro. Checked against the app: `src/lib/home-layout.ts` (`classic | editorial | stage`), `src/components/home-stage/gpu-stage.native.tsx`, `src/components/computer-map/scene.tsx`. Every existing tile's claim was verified in the app source (away digest, web service, simfarm, SSH, ripple reskin transition, voice modes, worktrees, storage, update dialog all exist). | M |
| 1.4 | features | 22 text-only tiles in three groups read as a changelog, not a product page. `simulator` (status `source`, the simfarm spotlight) is a niche developer feature on the same footing as approvals. | S (IA) |
| 1.5 | `#agents` cards | Card copy is developer shorthand: "Auto-discovers PATH codex & adopts shared daemon, inheriting ~/.codex credentials." / "Pairs once to save credentials. Supports permission approvals and whole-turn rollbacks." True, but not what a visitor needs to decide. The facts list below the cards is fine. | S |
| 1.6 | `#agents` | Claude Code is correctly absent from the native list; the support guide says it runs in a terminal. Keep it that way. Consider one sentence on Home: "Claude Code and any other CLI agent run in the terminal, as they do on your desk." | S |
| 1.7 | `#connect` requirements | "tmux, or Herdr 0.7.5 or newer" — still what the Gateway README requires. Android 8.0+ / iOS 16.4+ present. Install one-liner, `muqun-gateway manage`, agent command: all current. | ok |
| 1.8 | privacy strip | On `main` the third line is "No ads, no analytics, no third-party tracking SDKs." 4.0 sends audio to the user's configured transcription endpoint and agents talk to model providers; the owner's uncommitted edit (working tree of `/home/ryu/Work/muqun/website`, branch `docs/privacy-4-agent-data`, 2026-10-18) already changes it to "No ads or advertising tracking. AI and voice use your configured services." in all 12 locales. Not in `main`, not in this branch. | M (owner: commit it with 1.13) |
| 1.9 | `src/i18n/muqun/*.ts` | About 150 strings per locale are no longer rendered by any page: `hero.*` (except three labels), `pillars`, `craft`, `delight` ("Thirty-two of them ship" — the app ships one built-in theme, Cover Courier; the catalogue has 97), `setup.inspect*`, `setup.panel*`, `setup.qrPanelAlt` and friends, `support.*` (the support page uses `user-guide/*.ts`). Dead copy in 12 languages that a translator will keep maintaining. | L |
| 1.10 | `<title>` / description | "Muqun — Your agents, anywhere" + `release.intro`. Fine. The privacy page reuses `copy.meta.description`, the 1.x pitch ("…straight to your own Mac or Linux machine"). | L |
| 1.11 | `world.ts` | `featureIntro` "SSH, simulators, themes — and the tools you use every day." is unused; `appStoreTip`/`playStoreTip` promo strings are gated off (`PUBLIC_MUQUN_STORE_PROMO`). | L |

### Support / user guide (`/support/`, `src/i18n/user-guide/*.ts`)

| # | Finding | Rank |
|---|---|---|
| 1.12 | Nothing wrong, much missing. Chapters: get started, terminal, agents, OpenCode, Gateway config, themes, troubleshooting, contact. 4.0 features with no guide text: the Home composer (computer, agent, model, mode, folder), task activity on computer cards, voice dictation (the two endpoint modes, the two-minute limit, "Insert text automatically"), audio/PDF previews, the Git workspace and linked worktrees (`git_worktrees`), Storage cleanup, the update dialog, Stage Home and the layout picker, the computer map, the icon picker (Neon, Mecha). Codex has no chapter of its own while OpenCode has ten entries. Capability names a reader will see in the app (`multi_agent`, `ws_events`, `agent_collaboration`, `git_worktrees`) appear only in passing. | S |
| 1.13 | Privacy (`/privacy/`): `main` says "no account, advertising, analytics, or tracking SDKs", lists only Gateway data, camera, App Lock and notifications; last updated August 4, 2026. It does not mention: voice recordings sent to the user's configured endpoint and its API key in SecureStore, attachments uploaded to the Gateway before send, agents forwarding prompts and files to model providers, SSH credentials, agent account usage snapshots, PDF/audio temporary files, theme and font downloads, caches. The owner's 842-line rewrite on `docs/privacy-4-agent-data` covers exactly this in every locale and tightens the route (`Record<SiteLocale, Policy>`, no English fallback). The store listings link this page. | M (owner: finish and merge that branch; bump `lastUpdated`) |
| 1.14 | Themes (`/themes/`): copy is current. The device mock offers Home layout "Classic / Editorial" only; Stage cannot be mocked in CSS and is not mentioned. | L |
| 1.15 | 404: English only by design, states it. Fine. | ok |

## 2. Screenshots and media

| # | Finding | Rank |
|---|---|---|
| 2.1 | `public/shots/` (24 AVIF/WebP, 1.9 MB) is referenced only by `src/components/ui/muqun-shot.astro`, which no page imports. Nothing on the site shows them. They are 1.x captures ("Pair your first server", a Claude Code pane dated Aug 7). `src/lib/muqun-shots.ts` is their manifest; `package.json` `shots:generate` points at a `scripts/shots.ts` that does not exist. | S (delete) |
| 2.2 | `public/video/muqun-intro*.mp4` (11 MB, loaded on play only) and posters: the 3.0 film, see 1.1. | owner decision |
| 2.3 | `public/og-muqun.png`: cream card, the Classic M mascot, "VERSION 3.0", "AI assistants. Anywhere.", "OpenCode · Terminal · SSH". This is what every shared link unfurls into. | M |
| 2.4 | `public/social/v3/*.png` (2.4 MB): same artwork and claims as 2.3, not referenced by any page, kept for posts that linked them. | L (new 4.0 social art) |
| 2.5 | `public/images/terminal-screen*.{webp,png}` (1.1 MB): texture on the 3D phone in the hero world (`remote-earth.ts`). Shows a generic terminal; not wrong. | ok |
| 2.6 | There is no picture of the 4.0 app anywhere on the site. The only product imagery is the 3.0 film and the CSS device mock on the themes page. | owner decision (see 4) |
| 2.7 | Fresh captures were not taken: both QA emulators were running the e2e gate for the whole session (`scripts/e2e.sh --tag full` on emulator-5560 and emulator-5580). Demo-mode captures of Stage Home, the composer and a Codex conversation on phone and tablet are the first thing to do once they are free. | S |

## 3. The app icon

- 4.0 default: `assets/icons/catalog.json` entry `default` → directory `mint`,
  which holds the **Neon** artwork (cyan and coral ribbon M on ink `#0C101E`);
  `assets/icons/README.md` says Neon kept Mint's native identifier so existing
  selections stay valid, and the picker shows it as Neon. `app.json` `icon` and
  `expo.ios.icon` are `./assets/icons/mint/icon.png` (1024×1024, opaque RGB);
  Android adaptive foreground `mint/android-foreground.png`, background
  `#0C101E`. Light and dark appearances are the same artwork. No ambiguity.
- Where the site shows an icon today, all of them the old Pocket mascot or the
  Classic M:
  - `BaseLayout.astro`: `<link rel=icon>` 16/32/48 → `pocket-icon-light-*.png`
    (light) and `pocket-icon-transparent-*.png` (dark, swapped by the theme
    script); `apple-touch-icon` → `pocket-icon-180.png`.
  - `public/favicon.ico` (16/32/48 PNG entries), requested by browsers that ignore `<link>`.
  - `public/muqun-icon.png`, `muqun-icon-dark.png` (512, Classic M) via
    `AppIcon.astro`, which no page uses.
  - `public/muqun-mark.png` (128): the brand mark inside the themes page device
    mock (`device-mock.tsx`, `BRAND_MARK`), where the app shows the mark of the
    launcher icon in effect.
  - `public/og-muqun.png` and `public/social/v3/*` (Classic M).
  - Unreferenced leftovers: `favicon-32.png`, `favicon-32-dark.png`,
    `apple-touch-icon.png` (Classic).
  - Not an icon but the same question: the hero's 3D companion
    (`public/models/pocket-muqun.glb`) and the `MiniPet` are the Pocket mascot.
    The 4.0 app's identity is the Neon ribbon; the site's is the coral blob.
- No generator existed in git history (the Pocket PNGs were committed by hand
  in `cc1b08e`, `e90468b`, `d2feb21`). `sharp` is already a devDependency.
  Rank: M for favicons, touch icon, `favicon.ico`, `muqun-mark.png`, OG card;
  owner decision for the mascot.

## 4. Structure and clarity

The ten-second test fails. The first screen is the mascot, "Your agents,
within reach." and "Native sessions for Codex, OpenCode, DeepSeek Harness and
T3 Code. Approve permissions, follow tasks and review diffs from your pocket —
straight to your own computer." A newcomer is not told that this is a phone and
tablet app, that it drives both coding agents and terminals, that it runs on
their own computers through a Gateway they host, or that there is no account.
"Native sessions" is our vocabulary, not theirs. On a phone the copy starts
below the fold; the mascot owns the first 420 px.

Current order: hero → 3.0 film → chapter 01 (the release heading again, plus a
fake terminal) → 22 feature tiles in 3 groups → agents → setup → privacy →
download. Setup, the thing a convinced visitor needs, is the sixth screen,
roughly 6000 px down on desktop.

Proposed order (cuts in brackets):

1. **Hero** — one sentence that says what it is: "The phone and tablet app for
   the coding agents and terminals on your own computers." Store buttons, and
   the Gateway one-liner right there, since it is the half of the setup people
   do not expect. 4.0 app imagery (Stage Home on a phone, the tablet workspace)
   instead of, or next to, the mascot.
2. **How it works** — three steps: install the app, run one command on your
   computer, scan. Everything else about setup moves to the guide. [Cuts the
   `details` block of Gateway commands from the home page.]
3. **New in 4.0** — at most six tiles, each with a capture: Stage Home,
   start work from the Home composer, several agents per computer and Codex
   conversations, dictation, the Git workspace, read the update before you
   download it.
4. **Agents** — the four cards, rewritten for readers, with the Claude Code
   sentence (1.6).
5. **Everyday workspace** — one compact list: real terminal, tablet keyboard,
   files, open your dev server, SSH, themes. [Cuts the 22-tile wall to ~10 and
   drops `simulator` from the home page.]
6. **Themes** — one line and a link to the catalogue (97 themes).
7. **The deal** — the five promise lines; privacy link.
8. **Download** — buttons, support link.
[Cut the chapter-01 duplicate heading and the fake terminal. The 3.0 film goes
unless a 4.0 cut replaces it.]

## 5. Visual quality

- Dark mode home is the site's best state: the stage, the copy, the pills all
  read. Light mode washes the mascot into a pastel blob on cream and the stage
  disappears; the first screen is mostly empty cream.
- Two visual voices: the home page (dark world, Plex Sans display, GSAP
  entrances) and the design-system pages (cream bands, mono display headings,
  tmux-style status line). The themes and support pages look like a different
  product from the home page, and neither looks like App 4.0 (Neon, Stage,
  Cover Courier).
- The hero copy and buttons fade in over ~1.5 s after the 3D model walks in;
  on a slow connection the first screen is a mascot and nothing to click.
  Reduced motion is honoured (`matchMedia` in `PocketWorld.tsx`).
- Feature tiles: uniform text cards, no media, the same weight for "Start from
  Home" and "Your simulator. On your phone." Three `spotlight` tiles carry CSS
  mock-ups (SSH window, theme phone, simfarm) that look like 2.x.
- Support hero: the heading, lead and the two CTAs are GSAP-revealed; the
  headless render shows a 600 px empty band under the badge. Verify in a real
  browser that the reveal fires without scrolling; if it needs an intersection
  it should not.
- Mobile 390 px: hero copy below the fold, agent pills wrap to two rows, store
  buttons at ~750 px; themes gallery band shifts layout when the list arrives
  (CLS 0.18).
- The film frame is 16:9 inside a 72 rem rounded panel on desktop and 9:16 on
  phones (separate portrait encode) — the mechanics are good; the content is 3.0.
- What makes it look worse than the app: the identity gap. The app is Neon,
  Stage artwork, Cover Courier, Skia Graphite; the site is the coral Pocket
  mascot, a 3.0 film, Classic-era icons and a 1.x OG card.

## 6. Technical

- `bun install --frozen-lockfile`: clean. `bun run build`: 61 pages in 2.2 s.
  Warnings: one chunk over 500 kB (`three.module` 719 kB minified, 368 kB of
  it unused on first paint per Lighthouse) and an upstream
  `const THREE = require("three")` deprecation from Three's CommonJS build
  pulled in by `@react-three/fiber`. `astro check`: 0 errors, 0 warnings,
  0 hints. `tsc` tests: clean. `verify-site.mjs`: 60 routes, 12 registries pass.
- Lighthouse desktop (local static server, no CDN cache headers):
  home 86 / 92 / 100 / 100 (LCP 1.7 s, TBT 190 ms, 3.5 MB transferred:
  three.js, the 556 kB GLB, 204 kB React client); support 100 / 94 / 100 / 100;
  themes 91 / 96 / 96 / 100 (CLS 0.18 from the gallery band; the console error
  is the local `/api/themes/` 404, which the Worker serves in production).
- Accessibility flags on every page: `.mq-code__label` (the mono label on
  code blocks) fails contrast; `<summary aria-label="Language">` and the play
  button's visible text do not match their labels; `<a class="mq-wordmark"
  aria-label tabindex=-1>` without `href` is a generic element and may not carry
  `aria-label`; an `h4` card title follows an `h2` on support. Rank S.
- Fonts: 10 self-hosted Plex woff2 (196 kB), two preloaded. Fine.
- Links: App Store, Play, `osuki-dev/muqun-app`, `muqun-gateway`,
  `muqun-theme-cli` all answer; `https://muqun.dev/gateway.sh` 302s. Internal
  language links verified for all 60 routes. `https://osuki.dev/muqun/gateway.sh`,
  which `muqun-links.ts` describes as a still-working mirror, now answers 404 —
  comment only, not a published link. Rank L (fix the comment or the mirror).
- Dead code: 23 components under `src/components/` are imported by nothing
  (`Aperture`, `AwayDigest`, `BlockedPrompt`, `ComposerStrip`, `LiveActivity`,
  `PairPanel`, `Pane`, `PushNotice`, `ServerCard`, `TaskSheet`,
  `WebServiceSheet`, `Wordmark`, `ThemeMenu`, `ThemeToggle`, `Ledger`,
  `LedgerRow`, `StoreButton`, `Container`, `AppIcon`, `ui/muqun-shot`,
  `ui/muqun-pending`, `aperture/ThemeRail`, `aperture/TerminalStream`), plus
  `public/shots/`, `muqun-shots.ts`, the `shots:generate` script. Rank S.
- `.gitignore` ignores `/docs`; `docs/3d-world-plan.md` and `docs/qa/*` on
  disk are untracked. This audit is added with `git add -f`.

## 7. Ranked list

**Must fix this week (done on `feat/website-4.0` unless marked owner)**

1. Neon as the site icon: favicons (light tile, dark transparent ribbon),
   touch icon, `favicon.ico`, `muqun-mark.png`, generated by a script from the
   app's icon source. (3)
2. New OG card: 4.0, Neon, current tagline. (2.3)
3. Film section no longer labelled 3.0. (1.1)
4. A Stage Home / 3D feature tile in all 12 locales. (1.3)
5. Owner: merge the privacy rewrite and the promise-line change
   (`docs/privacy-4-agent-data`, uncommitted), bump `lastUpdated`. (1.8, 1.13)

**Should fix (after submission, before the launch post)**

6. Hero "Native" label into `world.ts`. (1.2) — done on the branch.
7. Fresh demo-mode captures from the QA emulators; a "New in 4.0" group with
   media; trim the feature wall. (2.7, 1.4)
8. Agent card copy for readers; the Claude Code sentence. (1.5, 1.6)
9. Guide chapters for the composer, voice, Git workspace, storage, updates,
   Stage, Codex. (1.12)
10. Accessibility flags; themes CLS. (6)
11. Delete dead components, shots, manifest, script entry. (2.1, 6)

**Later**

12. Restructure per section 4; decide the mascot; a 4.0 film or a 30 s screen
    capture; new social art; themes mock Stage; dead copy in `muqun/*.ts`;
    `osuki.dev` mirror comment. (4, 5, 2.4, 1.14, 1.9)

## 8. Status after the owner's decision (2026-10-23)

The owner chose the information-architecture restructure only, with the
Pocket mascot, the relabelled film and the existing design system kept. It is
on `feat/website-4.0`: hero (one-line definition), film, how it works (three
steps), New in 4.0 (six tiles), agents, everyday workspace (ten rows),
themes, the deal, download. Cut: the chapter-01 repeat with the illustrative
terminal, the Gateway command reference, the requirements list, and the
simulator, transitions, renderer, tablet-spread, away and themes tiles. The
privacy rewrite is merged. Lighthouse desktop on the home page after: 84–86 /
96 / 100 / 100 over three runs (baseline 86 / 92 / 100 / 100, one run).

## 9. Decisions for the owner (as of the audit)

- **Mascot vs Neon.** Keep the Pocket companion as the site's character while
  the app icon is the Neon ribbon, or rebuild the hero around Neon and the Stage
  artwork. The must-fix items make the tab, the home-screen icon and the share
  card Neon; the hero stays Pocket until this is decided.
- **Hero media.** (a) Keep the 3.0 film, relabelled (done); (b) replace with
  a 20–30 s screen capture of 4.0 on the QA emulators (Stage Home → composer →
  Codex conversation → theme change), roughly a day with captions; (c) a new
  edited film, several days.
- **IA.** Section 4 as proposed. Estimate: copy and layout for the eight
  sections with the existing design system, two days; with new captures and
  the hero rebuilt around Neon/Stage, four to five days; translations for the
  new copy in 11 locales, one more day with native review pending.
