export type EditorialStory = {
  id: string;
  meta: string;
  title: string;
  dek: string;
  paragraphs: string[];
  image: string;
  alt: string;
  caption: string;
  productHref: string;
  productLabel: string;
};

export const EDITORIAL_STORIES: EditorialStory[] = [
  {
    id: "night-shift-001",
    meta: "NIGHT SHIFT / CITY STUDY",
    title: "When the heat releases the street.",
    dek: "A study of Chennai after dark—and why movement, not spectacle, is the starting point for CHAKSU.",
    paragraphs: [
      "By day, the city edits how you move. You look for shade, shorten the pause, and make every layer negotiate with heat. After dark, the pace changes. Concrete holds the memory of the day while roads, terraces, stations, and tea shops return to motion.",
      "CHAKSU treats those conditions as design inputs. A silhouette must read from a distance, then make sense up close. Volume must create movement, not drag. Details must have a job. The image can be dramatic; the garment still has to function when the camera leaves.",
    ],
    image: "/images/products/chennai-cargo-pant.png",
    alt: "Black articulated cargo trousers moving through a rain-lit transit space",
    caption: "FIELD NOTE 01 / TRANSIT, VOLUME, MOMENTUM",
    productHref: "/products/chennai-cargo-pant",
    productLabel: "View the Chennai Cargo",
  },
  {
    id: "weather-system",
    meta: "DESIGN STUDY / WEATHER",
    title: "Weather is not a moodboard.",
    dek: "Rain, humidity, and sudden transitions should change the garment—not just the campaign grade.",
    paragraphs: [
      "A shell built for Chennai cannot treat rain as a cinematic surface. It has to handle heat before the storm, air movement while the humidity rises, and sudden water without becoming a sealed plastic room.",
      "The useful decisions are quiet: vent placement, seam protection, a collar that closes without fighting the jaw, and enough room to move over a base layer. Weather becomes construction—not campaign decoration.",
    ],
    image: "/images/products/monsoon-jacket.png",
    alt: "Olive shell jacket photographed on a rain-dark rooftop",
    caption: "FIELD NOTE 02 / WEATHER STUDY",
    productHref: "/products/monsoon-jacket",
    productLabel: "Study the shell",
  },
  {
    id: "k-system",
    meta: "IDENTITY / FORM",
    title: "The K is a system, not a graphic.",
    dek: "One diagonal interruption becomes a cut, a crop, a panel, and a way to keep the brand recognisable without covering everything in logos.",
    paragraphs: [
      "The K begins as an interruption in an otherwise disciplined wordmark. That diagonal can become a seam path, a panel break, an image crop, or a moment of tension between two materials.",
      "A system earns repetition by changing with context while remaining recognisable. The garment never needs to become a billboard; proportion and construction can carry the identity at a quieter volume.",
    ],
    image: "/images/products/k-line-oversized-tee.png",
    alt: "Black K-Line oversized tee in a blue-lit architectural setting",
    caption: "FIELD NOTE 03 / THE K-LINE",
    productHref: "/products/k-line-oversized-tee",
    productLabel: "See the K-Line tee",
  },
  {
    id: "useful-volume",
    meta: "CONSTRUCTION / UTILITY",
    title: "Useful volume.",
    dek: "Utility is not the number of pockets. It is the relationship between access, balance, movement, and restraint.",
    paragraphs: [
      "Volume is useful only when it preserves access and balance. A pocket that looks technical but swings under weight is decoration. A tote that disappears into the body or blocks movement has missed its job.",
      "We study where the load sits, how the opening behaves in transit, and which attachments remain useful after the first photograph. Restraint is part of utility: every additional component must justify its weight.",
    ],
    image: "/images/products/tactical-tote-bag.png",
    alt: "Black architectural field tote photographed at night",
    caption: "FIELD NOTE 04 / CARRY SYSTEM",
    productHref: "/products/tactical-tote-bag",
    productLabel: "View the field tote",
  },
];

export const ABOUT_PRINCIPLES = [
  {
    title: "Movement before pose",
    body: "We begin with how a piece walks, sits, carries, and layers. The campaign follows the garment—not the reverse.",
  },
  {
    title: "Proof before adjectives",
    body: "Fit, material, construction, and care should explain value more clearly than the word premium ever could.",
  },
  {
    title: "Place without costume",
    body: "South India appears through lived conditions, collaborators, language, and authorship—not borrowed sacred or decorative symbols.",
  },
  {
    title: "Fewer, stronger signals",
    body: "A recognisable silhouette, a disciplined palette, and one repeatable K-device beat a pile of effects.",
  },
] as const;
