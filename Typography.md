# CHAKSU Typography System

## 1. Direction

CHAKSU should not look like generic luxury minimalism or a distressed streetwear preset. Its typography should behave with **controlled aggression**: compressed, oversized, occasionally cropped, but highly disciplined.

> Keep the master wordmark clean. Apply xerox damage, halftone, abrasion, ink bleed, and registration error as campaign layers—not permanent logo construction.

## 2. Typeface decision

### Production recommendation

| Role | Typeface | Weight/style | Use |
| --- | --- | --- | --- |
| Master wordmark and campaign display | PP Formula Condensed | Black; selected Extended/Italic campaign cuts | CHAKSU wordmark, release titles, large editorial statements |
| Interface and reading | PP Neue Montreal Text | Regular, Medium, Semibold | Navigation, body, forms, price, product information, policy |
| Technical metadata | Space Mono | Regular, Bold | Style numbers, size/GSM, dates, drop metadata, small labels |
| Tamil editorial support | Noto Sans Tamil | Regular, Medium, Bold | Native-script Tamil copy and credits |
| Devanagari support if needed | Noto Sans Devanagari | Regular, Medium, Bold | Native-script Hindi copy |

PP Formula and PP Neue Montreal require commercial webfont and brand-use licenses. Confirm scope, traffic, environments, and redistribution rights before production. Never commit licensed binaries to a public repository without permission.

### Free prototype stack

| Production role | Prototype alternative |
| --- | --- |
| PP Formula Condensed | League Gothic or Big Shoulders Condensed |
| PP Neue Montreal Text | Inter |
| Space Mono | Space Mono |

The free stack is for prototyping and testing hierarchy. It is not a claim that the final wordmark will look identical.

## 3. Why PP Formula works for CHAKSU

The word has a useful internal rhythm:

```text
C H A  [K]  S U
open → build → attack → resolve
```

- **C:** must stay recognizably open at profile-icon and woven-label sizes.
- **K:** the central memory letter and controlled interruption.
- **U:** retains a clear lower curve to resolve the compressed word.
- **Overall:** tall, compact letterforms create poster energy without requiring permanent distress.

Formula is preferred because it can carry motorsport/editorial energy without locking CHAKSU into varsity, death-metal, or generic luxury codes.

## 4. Master wordmark specification

### Base construction

- All caps: `CHAKSU`.
- PP Formula Condensed Black as the starting construction, then converted into a custom vector wordmark.
- Visual tracking target: approximately -2% to -4%; final spacing is optical, not a font setting delivered unchanged.
- Straight baseline.
- No outline, shadow, bevel, gradient, or permanent distress.
- Custom refinements focus on C aperture, K diagonal, and U width.

### K refinement

- Extend the upper K diagonal by approximately 3-5% as an initial prototype.
- Test projection at 16 px, 24 px, 30 mm embroidery, 20 mm woven label, and 1.5 m signage.
- The extension may become a secondary crop/line device.
- It must not create a weapon-like symbol or hurt legibility.

### C refinement

- Slightly enlarge the aperture if it closes at small sizes.
- Verify that the C does not read as O in a circular avatar.
- Preserve outer vertical rhythm with H/A.

### U refinement

- Do not over-condense.
- Retain the lower bowl to close the open/attack/resolve sequence.

### Clear space

Use the width of the wordmark's vertical H stem as minimum clear space on all sides. Campaign crops may intentionally violate clear space only when an intact wordmark appears elsewhere in the same composition.

### Minimum size

- Digital full wordmark: 80 CSS px wide recommended; 64 px absolute minimum after testing.
- Print: 20 mm wide for high-quality print; larger for textured print.
- Embroidery: 30 mm wide initial minimum; confirm with stitch test.
- Favicon/avatar: use a custom K mark or tested compact mark, not the full six-letter word.

## 5. Secondary wordmark treatments

### Editorial spaced

`C H A K S U` at +8% to +12% optical tracking.

Use for packaging tape, back prints, waistbands, lookbooks, and large-format editorial. Do not use in the compact global header.

### Shallow arch

- Visual rise: approximately 5-8 degrees.
- Secondary application only: caps, patches, stickers, community graphics.
- Avoid collegiate rainbow-arch proportions.

### Lowercase voice

`chaksu` may appear in captions or editorial annotations, never as the primary brand identifier. The uppercase K is too valuable to discard.

## 6. Web type scale

The scale uses fluid values, but every role has limits.

```css
:root {
  --font-display: "PP Formula Condensed", "League Gothic", sans-serif;
  --font-body: "PP Neue Montreal Text", Inter, Arial, sans-serif;
  --font-mono: "Space Mono", ui-monospace, monospace;

  --text-display-hero: clamp(4.5rem, 13vw, 11rem);
  --text-display-xl: clamp(3.5rem, 9vw, 8rem);
  --text-display-lg: clamp(2.75rem, 6vw, 5.5rem);
  --text-h1: clamp(2.5rem, 5vw, 4.5rem);
  --text-h2: clamp(2rem, 3.8vw, 3.5rem);
  --text-h3: clamp(1.5rem, 2.2vw, 2.25rem);
  --text-body-lg: clamp(1.0625rem, 1.2vw, 1.25rem);
  --text-body: 1rem;
  --text-small: .875rem;
  --text-meta: .75rem;
}
```

### Role matrix

| Role | Typeface | Size | Line height | Tracking | Case |
| --- | --- | --- | --- | --- | --- |
| Hero display | Formula Condensed Black | 72-176 px fluid | 0.82-0.9 | -0.02em to -0.04em | Uppercase |
| Section display | Formula Condensed Black | 56-128 px fluid | 0.86-0.94 | -0.02em | Uppercase or short title case |
| H1 | Formula Condensed Black | 40-72 px | 0.92-1 | -0.015em | Short |
| H2 | Formula Condensed Black | 32-56 px | 0.95-1.02 | -0.01em | Short |
| H3 | Neue Montreal Semibold | 24-36 px | 1.1-1.25 | -0.01em | Sentence case |
| Lead | Neue Montreal Regular | 17-20 px | 1.45 | 0 | Sentence case |
| Body | Neue Montreal Regular | 16-18 px | 1.5-1.65 | 0 | Sentence case |
| Product title | Neue Montreal Medium | 14-16 px | 1.35 | 0 | Sentence case |
| Navigation | Neue Montreal Medium | 12-14 px | 1.2 | 0.04em-0.08em | Uppercase |
| Metadata | Space Mono Regular | 12-14 px | 1.4 | 0.02em | Uppercase selectively |
| Button | Neue Montreal Medium | 14-16 px | 1 | 0.02em | Sentence or uppercase by context |

Do not repeat the reference design's 10 px body copy. Twelve pixels is reserved for non-critical metadata with sufficient contrast.

## 7. Hierarchy rules

1. Use Formula for statements, not paragraphs.
2. One display statement per viewport is usually enough.
3. Use no more than three type roles in a component or one editorial scene.
4. Body width: 45-75 characters; target 60-68.
5. Prices, size, delivery, and policy information use the calm utility face.
6. Never justify body text.
7. Do not use all caps for sentences longer than roughly eight words.
8. Use weight, scale, and space before adding color.
9. Underline inline links; navigation may use position/state instead.
10. Italics are editorial accent, not a substitute for hierarchy.

## 8. Cropping system

CHAKSU's display type may extend beyond the viewport to create an ownable graphic code.

### Allowed

- Crop up to 12% of a decorative duplicate wordmark.
- Crop the top or sides while retaining enough letter evidence to identify the word.
- Use the K intersection as a mask, divider, or motion anchor.
- Pair a cropped decorative instance with an intact accessible heading/wordmark.

### Not allowed

- Crop product name, price, CTA, policy, or navigation.
- Use cropped text as the only brand identification.
- Put essential text in an image.
- Use visual order that contradicts DOM order.

Decorative duplicate typography must be `aria-hidden="true"`.

## 9. Texture and damage

### Campaign treatments

- Xerox grain.
- Halftone screen.
- Slight registration error.
- Photocopier edge shadow.
- Marker underline/annotation.
- Sticker residue.

### Constraints

- Keep the live type layer readable; apply texture as a separate image/mask/pseudo-element.
- Texture opacity generally 4-14% on web.
- Do not distress body copy, prices, sizes, forms, or policy text.
- Do not stack grain + blur + chromatic aberration + roughen + shadow.
- Export a clean master for every textured campaign execution.

## 10. Typography by page

### Home

- Wordmark: clean in header.
- Hero: release title or CHAKSU crop; one concise sentence in body face.
- Wordmark bridge: largest typographic moment.
- Product grid: quiet utility typography.
- Story: Formula statements paired with 17-18 px body.

### Collection

- Collection H1: 40-72 px, compact.
- Category/filter/navigation: utility face.
- Product cards: product title 14-16 px; price 14-16 px; status 12 px mono.
- Do not turn every product name into a display headline.

### PDP

- Product name: 22-32 px utility semibold or calm display depending naming length.
- Price: 16-18 px.
- Proof headings: 12-14 px mono/utility label.
- Description: 16-18 px; short paragraphs.
- Measurements: mono for values, body face for labels.

### Story

- Hero title: 56-128 px Formula.
- Dek: 18-22 px utility.
- Body: 17-19 px at 1.6 line height.
- Pull quote: 40-72 px Formula, fewer than 16 words.
- Credits/footnotes: 12-14 px mono/utility.

### Forms/help

- Label 14-16 px.
- Input value 16 px minimum to avoid mobile zoom.
- Hint/error 14 px; error includes icon and exact action.
- Policy body 16-18 px; never compressed display.

## 11. Multilingual typography

CHAKSU may publish Tamil or Hindi editorial content, but the Latin display face does not automatically support those scripts.

- Use Noto Sans Tamil/Devanagari or a properly licensed native-script typeface with matching weight and proportion.
- Do not transliterate merely to preserve visual consistency.
- Test native-script line height, conjuncts, punctuation, numerals, and mixed Latin/product-code strings.
- Keep CHAKSU wordmark Latin unless a professionally designed alternate mark is commissioned.
- Human review is required for copy, line breaks, and cultural meaning.

## 12. Webfont implementation

```css
@font-face {
  font-family: "PP Formula Condensed";
  src: url("/fonts/pp-formula-condensed-black.woff2") format("woff2");
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "PP Neue Montreal Text";
  src: url("/fonts/pp-neue-montreal-text-regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

Only include these paths after license approval. Otherwise use the prototype stack.

### Loading rules

- Self-host approved WOFF2 assets when the license allows.
- Subset by script and use `unicode-range` only with a tested toolchain.
- Preload only the font files needed above the fold.
- Keep critical initial font payload ≤120 KB total.
- Use metric-compatible fallbacks or font metric overrides to limit layout shift.
- `font-display: swap` is required; the page must remain usable during load.
- Do not load unused weights/styles.

## 13. Fallback behavior

- Display fallback: League Gothic, then a condensed system sans if available.
- Body fallback: Inter, Arial, sans-serif.
- Mono fallback: `ui-monospace`, Consolas, monospace.
- Test the hero and header with fonts blocked; no overlap or CTA displacement.
- Reserve width/height for the wordmark SVG rather than relying on font rendering.

## 14. Packaging and garment typography

### Woven label

- Clean wordmark.
- High contrast, no halftone.
- Minimum tested stroke and aperture.
- Utility face for size/origin/care.

### Hangtag

Front: clean CHAKSU or controlled crop.  
Back: utility/mono product facts, QR with human-readable fallback URL, price and compliance information.

### Care label

Use the utility face or an industrial sans with proven small-size print. Compliance and care symbols take priority over aesthetic compression.

### Packaging

- Spaced wordmark is allowed on tape and tissue.
- Metadata grid may use Space Mono.
- Keep essential delivery/return information highly legible.
- Texture can appear on removable outer collateral, not over regulatory copy.

## 15. Typography QA

### Required specimens

- Full wordmark at 16, 24, 32, 64, 128 px.
- Circular avatar and favicon K mark.
- 20-30 mm woven label and embroidery stitch-out.
- Hero at 320, 390, 768, 1440, and 1920 widths.
- Long product names, ₹ prices, discounted/undiscounted states.
- XS-XXXL, garment measurements, and numeric tables.
- Tamil/Hindi mixed-script sample if those languages launch.
- 200% zoom and increased text size.
- Font-blocked and slow-font states.

### Acceptance criteria

- C remains open and does not read as O.
- K is distinctive without breaking rhythm.
- U remains legible at minimum size.
- No header/hero wrap at supported widths.
- Body never falls below 16 px.
- Focus, error, availability, and price states remain clear.
- Font loading does not produce visible layout shift beyond the CLS budget.
- Campaign texture can be removed without weakening the identity.

## 16. Final rule

CHAKSU does not need ten rebellious fonts. It needs one ownable word shape, one calm information system, and enough discipline to make every controlled break feel intentional.
