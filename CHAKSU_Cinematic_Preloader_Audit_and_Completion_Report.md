# CHAKSU Cinematic Preloader — Audit and Completion Report

**Date:** 17 August 2026  
**System:** K-CUT / NIGHT SHIFT  
**Decision:** PASS — production build verified

## Outcome

The CHAKSU cinematic entry has been independently audited, corrected, and validated. It is now a lightweight first-visit brand transition rather than a blocking loader. It reveals the already-rendered homepage, respects the session and accessibility contract, and removes itself within the approved 1.5-second ceiling.

## Material defects found and corrected

| Defect found | User impact | Correction |
| --- | --- | --- |
| The root overlay had an opaque Ink background. | Moving the clipped panels exposed more black instead of the live hero. | Made the overlay transparent while keeping the two Ink panels opaque, so the K-cut genuinely reveals the hero. |
| Exit began at 720 ms and removal occurred at 1,050 ms. | The split never completed its 670 ms travel and did not match the approved storyboard. | Corrected milestones to 120 ms laser, 380 ms split, 1,050 ms exit, and 1,350 ms removal. |
| The laser angle used a fixed CSS rotation while panel geometry changed with viewport ratio. | The registration edge and cut did not align consistently across mobile and desktop. | Replaced it with an inline SVG line whose endpoints exactly match the panel masks at every aspect ratio. |
| The SVG line rendered as repeated dash segments. | The edge looked noisy instead of precise. | Removed normalized dash rendering and retained a single solid sodium edge with an opacity activation. |
| Skip occupied the same top-right area as Search and Bag. | Controls collided during the reveal. | Moved Skip to the safe-area-aware bottom-right corner. |
| Keyboard users could Tab into controls hidden behind the overlay. | Focus could disappear behind the cinematic surface. | Intercepted Tab only while active and retained focus on the one visible Skip control. No automatic focus is taken on entry. |
| Escape removed the overlay without an explicit focus destination. | Keyboard context could be lost. | Escape now dismisses and restores focus to the focusable `#main-content` landmark. |
| Scroll remained available under the fixed overlay. | Wheel/touch scrolling could move the page beneath the intro. | Added reversible body and overscroll locking, with restoration on completion, Skip, Escape, interruption, preference change, and unmount. |
| Reduced-motion/Save-Data held a static overlay for 180 ms and then unmounted without the claimed fade. | The fallback created an invisible interaction delay and did not match its description. | Those users now receive the complete homepage immediately with no cinematic travel or artificial wait. |
| Timers remained scheduled after dismissal because returning `null` did not unmount the component. | Redundant callbacks could continue after the intro was gone. | Centralized timer tracking and cancellation on every dismissal and cleanup path. |
| The hero appeared briefly before hydration mounted the client overlay. | First visits could flash the live page before the cinematic opening. | Added a synchronous route-aware bootstrap surface following the local Next.js flash-prevention guidance. It checks session, reduced motion, Save-Data, and development QA state before paint. |
| A client-bundle failure could have left a bootstrap surface visible. | A failed hydration path might trap the customer. | Added independent 1,600 ms CSS/script safety release. JavaScript-disabled visits never activate the surface. |

## Final behavior contract

- Full motion plays only on the first eligible homepage visit in a browser session.
- Internal navigation and refresh after completion skip the opening.
- Reduced motion, Save-Data, 2G, and slow-2G receive the homepage immediately.
- Storage read/write exceptions never break navigation.
- Skip is a native button, immediately operable after hydration, at least 44 px high, and visibly focusable.
- Escape dismisses the sequence and places focus on the main content.
- Decorative motion is excluded from the accessibility tree; the real page remains in semantic source order.
- Changing the OS motion preference to Reduce during playback dismisses the intro.
- Moving the tab to the background dismisses the intro instead of resuming stale motion later.
- No autoplay sound, fake progress, video, WebGL runtime, or new dependency was introduced.
- The live hero, H1, proposition, and CTA remain server-rendered underneath.

## Timing evidence

Observed state changes from the browser QA run, normalized to the client intro mount:

| State | Target | Observed |
| --- | ---: | ---: |
| Laser | 120 ms | approximately 104 ms |
| Split | 380 ms | approximately 406 ms |
| Exit | 1,050 ms | approximately 1,051 ms |
| Removed | 1,350 ms | approximately 1,369 ms |

The browser polling interval was 35 ms, so the observed values include sampling error. Completion remained within the 1,500 ms budget. Before hydration, the Ink bootstrap surface was confirmed visible and scroll-locked, eliminating the hero flash.

## Responsive browser QA

The held split frame was checked at:

- 320 × 568
- 375 × 812
- 390 × 844
- 768 × 1024
- 844 × 390 landscape
- 1280 × 800
- 1440 × 900
- 1920 × 1080

Every tested viewport reported zero horizontal overflow. The Skip control remained 44 px high, stayed inside a 16 px safe inset, and did not collide with the header, hero CTA, or bottom-left site indicator. Portrait, short landscape, mobile, tablet, laptop, and large desktop compositions were visually inspected.

## Interaction and resilience QA

| Scenario | Result |
| --- | --- |
| First-paint bootstrap | PASS — Ink/wordmark frame visible before hydration; no scrollbar |
| Live split reveal | PASS — hero visible through the moving diagonal opening |
| Tab once and repeatedly | PASS — focus remains on Skip, never behind the overlay |
| Escape | PASS — overlay removed, body unlocked, focus restored to `MAIN#main-content` |
| Pointer activation of Skip | PASS — overlay removed and live H1 remains available |
| Repeat visit / refresh | PASS — no overlay replay |
| Static accessibility/data path | PASS — immediate hero, no overlay or scroll lock |
| Horizontal overflow matrix | PASS — 0 px at all eight sizes |
| Component interruption/unmount | PASS by cleanup contract — timers, listeners, data attribute, and scroll state are cleared |
| Storage unavailable | PASS by guarded read/write contract |
| Client bundle failure | PASS by independent 1,600 ms bootstrap release contract |

The in-app browser does not expose OS media-feature emulation. The shared reduced-motion/Save-Data branch was therefore exercised through the development-only `?intro=static` QA mode, and its actual media/connection detection was reviewed in code. Physical-device reduced-motion and throttled-network checks remain sensible release-candidate smoke tests, not implementation blockers.

## Verification commands

- `npm run lint` — PASS, 0 errors
- `npx tsc --noEmit` — PASS, 0 type errors
- `npm run build` — PASS, Next.js 16.3.1 production build generated all 10 routes

## Files changed

- `src/components/home/CinematicPreloader.tsx`
- `src/components/home/CinematicPreloader.module.css`
- `src/lib/motion/preloaderTokens.ts`
- `src/app/layout.tsx`
- `docs/chaksu/PROJECT_STATE.md`

## Final recommendation

Proceed. The preloader now expresses the approved K-CUT / NIGHT SHIFT concept without making the commerce experience pay a performance or accessibility penalty. Keep the sequence first-visit-only, silent, and under 1.5 seconds. Do not expand it into a compulsory video or route-transition effect.
