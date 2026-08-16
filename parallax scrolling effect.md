# CHAKSU Parallax Scrolling Effect Specification

## 1. Motion objective

CHAKSU motion should feel like fabric, bodies, and architecture moving at different speeds—not like a template demonstrating effects. The system uses parallax to create depth, crop typography, and connect editorial scenes to commerce.

**Core rule:** motion may intensify meaning, but it may not delay access to products, conceal essential content, trap scrolling, or become the only way a message appears.

## 2. What the reference video teaches

The supplied 181.53-second reference contains 5,446 frames at 30 fps. The full frame set was extracted and measured; one-second frames plus the highest-motion frames were visually reviewed.

| Reference time | Observed pattern | CHAKSU adaptation |
| --- | --- | --- |
| 0-15 s | Full-bleed cinematic hero with transparent navigation and rotating/editorial scenes. | One original CHAKSU campaign scene with restrained depth and an explicit pause; no overloaded carousel. |
| 15-30 s | Large white editorial mega-menu overlays the hero. | CHAKSU mega-menu shifts sharply from dark hero to bone surface, with two controlled image links. |
| 30-90 s | Sparse product grid with oversized product cutouts, asymmetrical editorial cells, and fast browsing. | Edited K-Line grid with gentle image drift and stable product information. |
| 90-119 s | Dark narrative interlude, large textured imagery, split copy/image compositions. | “Built in movement” story using South-Indian night imagery and construction proof. |
| 119-132 s | Editorial/store chapters before returning to products. | Creator chapters and city notes, each connected to a product or release. |
| 132-165 s | PDP with vertically scrolling media and a sticky purchase rail. | Sticky purchase rail with transform-safe media depth and stronger fit/service proof. |
| 165-181 s | Return to collections and loop to hero. | Intentional re-entry to related products/next release, not an automatic loop. |

## 3. Motion principles

1. **Depth before spectacle:** foreground moves more than architecture; type moves least.
2. **One dominant motion per viewport:** never combine pinned text, zoom, horizontal travel, and image drift at once.
3. **Abrupt transitions, smooth movement:** CHAKSU changes surfaces decisively; objects move with controlled easing.
4. **Transform only:** parallax animates `transform` and occasional `opacity`, not layout properties.
5. **Short travel:** most layers move 24-80 px; maximum 120 px or 12% of element height.
6. **Product stability:** names, prices, sizes, delivery, and calls to action do not drift.
7. **Input respect:** trackpad, wheel, keyboard, touch, and assistive scrolling remain native.
8. **Static completeness:** disabling JavaScript leaves a complete and correctly ordered page.

## 4. Motion tokens

```css
:root {
  --motion-instant: 120ms;
  --motion-fast: 180ms;
  --motion-base: 320ms;
  --motion-slow: 640ms;
  --motion-cinematic: 1100ms;

  --ease-cut: cubic-bezier(.2, .8, .2, 1);
  --ease-enter: cubic-bezier(.16, 1, .3, 1);
  --ease-exit: cubic-bezier(.7, 0, .84, 0);

  --parallax-near: 1;
  --parallax-mid: .55;
  --parallax-far: .24;
  --parallax-type: .12;
}
```

### Duration use

- 120-180 ms: focus, button, menu item, color/selection feedback.
- 320 ms: drawer, accordion, filter panel, cart entry.
- 640 ms: editorial reveal and media crop shift.
- 1100 ms: hero scene entrance only; never blocks interaction.

## 5. Scroll model

For each parallax section, compute normalized progress without modifying document flow:

```text
progress = clamp((viewportHeight - sectionTop) /
                 (viewportHeight + sectionHeight), 0, 1)

centered = progress * 2 - 1
translateY = centered * amplitude * depth
```

- `amplitude` is section-specific and capped.
- `depth` uses the motion tokens above.
- Read geometry on resize/observer events, not repeatedly during the same animation frame.
- Round to two decimals to reduce visual noise.

## 6. Scene specifications

### Scene A: Hero depth stack

**Route:** Home  
**Length:** 90-110svh; no scroll pin  
**Layers:** sky/architecture, campaign subject, foreground reflection, wordmark/copy

| Layer | Desktop travel | Mobile travel | Scale | Notes |
| --- | ---: | ---: | ---: | --- |
| Far architecture | -28 to +28 px | -12 to +12 px | 1.02 | Slowest visual plane. |
| Campaign subject | -56 to +56 px | -24 to +24 px | 1.035 | Preserve head/garment crop. |
| Foreground reflection | -80 to +80 px | -32 to +32 px | 1.05 | Masked; never covers CTA. |
| Wordmark/copy | -12 to +12 px | 0 | 1 | Legibility wins; static on mobile. |

At 55% progress, the navigation changes from transparent/white to bone/black. The transition occurs through an explicit state class; it does not sample image pixels at runtime.

**Reduced motion:** use the hero poster, no layer movement, simple 180 ms header state transition.

### Scene B: Cropped CHAKSU wordmark bridge

**Route:** Home between hero and product grid  
**Purpose:** Make the wordmark a memory asset.

- Oversized `CHAKSU` spans beyond the viewport.
- Scroll progress moves the wordmark horizontally by at most 8vw while the K crosses the visual center.
- A mask reveals a bone surface beneath; no text becomes unreadable because this is decorative duplicate text with `aria-hidden="true"`.
- The accessible heading exists as a normal static heading in source order.

**Do not:** rotate the page, use an endless marquee, or distress the live text with canvas noise.

### Scene C: Product-grid drift

**Route:** Home and editorial collection modules  
**Purpose:** Create the asymmetric reference rhythm without destabilizing commerce.

- Product cards stay in normal grid flow.
- Only editorial media inside selected spanning cards moves 20-48 px.
- Standard product cutouts may scale from 1.00 to 1.025 as they traverse the viewport.
- Product name, price, status, and hit target remain fixed.
- Hover swaps use a single alternate asset and 180 ms opacity; no cursor-follow effect.

On mobile, remove per-card parallax and retain only a small section-level reveal.

### Scene D: “Built in movement” narrative

**Route:** Home and story page  
**Surface:** Near-black  
**Structure:** 160-220vh desktop narrative section with three normal-flow chapters; no mandatory pin

- Background architectural image moves at far depth.
- Creator portrait or garment detail moves at mid depth.
- Text chapter enters with 24 px/opacity reveal and remains readable in normal flow.
- One construction fact or product proof accompanies each chapter.
- Each chapter ends with a product/story action.

Optional desktop enhancement: pin only the image column for the height of two adjacent text chapters. Disable below 1024 px and for reduced motion. The page scrollbar always reflects real content length.

### Scene E: Editorial wipe

**Route:** Story chapters  
**Purpose:** Recreate the reference’s decisive dark-to-light transitions.

- Use a pseudo-element surface wipe driven by section entry, not scroll hijacking.
- Wipe duration 640 ms; copy is present before, during, and after.
- Text color changes only after contrast is valid against the new surface.
- Wipe does not run again when the user scrolls a few pixels around the threshold.

### Scene F: PDP media depth

**Route:** Product detail  
**Purpose:** Make construction detail tactile without moving purchase controls.

- Media column remains normal scroll.
- Wide campaign frames use at most 36 px inner image drift.
- Macro detail may scale 1.00→1.04 while visible.
- Sticky purchase rail uses native `position: sticky`; no scroll-driven transform.
- Media lazy-loads below the first product image.
- On mobile, gallery uses static swipe/snap and click-to-play video; no parallax.

### Scene G: Footer re-entry image

**Route:** Home/story/PDP  
**Purpose:** A final brand beat before utility navigation.

- Shallow 35-45vh crop of the hero campaign or a distinct approved footer image.
- Slow 20 px background drift.
- Footer itself is static and fully visible; the image never pushes the footer away.

## 7. React implementation

Use one provider and one animation loop. Individual elements register configuration rather than adding scroll listeners.

```ts
type ParallaxRegistration = {
  element: HTMLElement;
  section: HTMLElement;
  amplitude: number;
  depth: number;
  axis: 'x' | 'y';
};

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

function computeProgress(rect: DOMRect, viewportHeight: number) {
  return clamp((viewportHeight - rect.top) / (viewportHeight + rect.height));
}
```

Controller outline:

```ts
function createParallaxController() {
  const registrations = new Set<ParallaxRegistration>();
  let scheduled = false;
  let reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const render = () => {
    scheduled = false;
    if (reduced) return;
    const viewportHeight = window.innerHeight;

    for (const item of registrations) {
      const rect = item.section.getBoundingClientRect();
      const progress = computeProgress(rect, viewportHeight);
      const centered = progress * 2 - 1;
      const travel = centered * item.amplitude * item.depth;
      const transform = item.axis === 'x'
        ? `translate3d(${travel.toFixed(2)}px,0,0)`
        : `translate3d(0,${travel.toFixed(2)}px,0)`;
      item.element.style.transform = transform;
    }
  };

  const schedule = () => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(render);
    }
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });

  return { registrations, schedule };
}
```

Production code must add:

- One `IntersectionObserver` to register only near-viewport sections.
- `ResizeObserver` for affected sections.
- Media-query change listener.
- Save-data/low-power behavior.
- Cleanup for route transitions.
- Server-safe hook guards.
- No inline style mutation during React render.

## 8. CSS contract

```css
.parallaxFrame {
  position: relative;
  overflow: clip;
  contain: paint;
}

.parallaxLayer {
  transform: translate3d(0, 0, 0);
  transform-origin: 50% 50%;
  backface-visibility: hidden;
}

.parallaxLayer[data-active='true'] {
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  .parallaxLayer,
  .reveal,
  .wordmarkBridge {
    transform: none !important;
    animation: none !important;
    transition-duration: 0.01ms !important;
  }
}
```

Only add `will-change` while an element is near the viewport; permanent promotion wastes memory.

## 9. Progressive enhancement levels

| Level | Conditions | Behavior |
| --- | --- | --- |
| 0 Static | Reduced motion, save-data, unsupported JS, very low capability | Responsive static images; all content visible. |
| 1 Essential | Mobile/default low-power | Header state, menu/cart transitions, simple section reveal. |
| 2 Depth | Modern mobile/tablet with acceptable runtime | Hero depth capped at 32 px, editorial section drift. |
| 3 Cinematic | Desktop ≥1024 px, capable device | Full scene spec, optional image-column sticky narrative. |

Do not use user-agent sniffing as the primary capability check. Use media features, viewport, save-data where available, and measured runtime degradation.

## 10. Asset preparation

### Hero background

- Master target: at least 3840×1756, approximately 2.18:1.
- Safe text area: upper-left through center-left.
- Subject safe area: center-right.
- Export derivatives for 1920, 1440, 1024, 768, and 480 widths.
- Store focal point and crop per breakpoint.
- Use the generated `Visual Background UI Image.png` as a concept/master reference.

### Layered parallax option

For a true multi-plane hero, commission/export separate background, subject, and foreground plates. Do not algorithmically cut the generated composite and treat edge artifacts as production-ready.

### Product media

- Plain product: 4:5, color-accurate, consistent scale.
- Campaign: 3:4 and 16:9 crops.
- Detail: 1:1 macro.
- Movement: 6-10 second muted loop with poster.

## 11. Accessibility requirements

- Decorative duplicate layers use empty alt text or `aria-hidden`.
- Semantic content exists once in the DOM, in reading order.
- Parallax never changes focus order or intercepts wheel/touch/keyboard scrolling.
- Pause control appears for autoplay or continuous animation.
- Reduced-motion mode is tested, not assumed.
- Text never sits on a moving crop without a stable contrast scrim.
- Motion amplitudes do not create rapid relative movement or flashing.

## 12. Performance gates

1. No long animation frame above 50 ms during a continuous five-second scroll on the reference mobile device.
2. Scroll handler does not force more than one style/layout cycle per frame.
3. Parallax adds no more than 15 KB gzip of custom client JavaScript.
4. Offscreen motion produces no continuous CPU activity.
5. Hero poster is the LCP candidate; video cannot replace or delay it.
6. CLS remains ≤0.1 with media blocked and slow-loaded.
7. Real-user INP remains ≤200 ms p75 on home, collection, and PDP.

## 13. QA matrix

Test at 360×800, 390×844, 768×1024, 1024×768, 1440×900, and 1920×1080 with:

- Mouse wheel, trackpad, touch, keyboard Page Down/Space, and screen reader.
- Standard and reduced motion.
- Save-data/slow 4G and cached repeat view.
- Safari iOS dynamic address bar and `svh` behavior.
- Browser zoom 200% and OS text enlargement.
- Hero video unavailable, blocked autoplay, and image failure.
- Back/forward navigation and restored scroll.
- Route transition while a parallax section is active.
- Cart/menu overlays opened during scroll.

## 14. Motion acceptance criteria

- The hero feels deeper, not busier.
- Product names and purchase controls remain completely stable.
- A reduced-motion user receives the same content and conversion path.
- No section requires the user to “scroll through an animation” before continuing.
- Mobile remains visually premium without desktop-level motion.
- CHAKSU’s K/wordmark is the dominant repeatable graphic device; no competitor-specific visual code is copied.
- Disabling the motion bundle leaves a finished website, not a broken fallback.
