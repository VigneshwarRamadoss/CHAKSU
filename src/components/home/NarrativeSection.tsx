import Image from "next/image";
import { ParallaxLayer } from "../motion/ParallaxLayer";
import { IntersectionReveal } from "../motion/IntersectionReveal";
import { WipeContainer } from "./WipeContainer";
import styles from "./NarrativeSection.module.css";
import Link from "next/link";

const chapters = [
  {
    id: "movement",
    index: "01",
    signal: "Climate / Transit",
    title: "Movement is the first measurement.",
    text: "South Indian nights demand breathability, structure and complete freedom. The silhouette begins with the body in motion—not a static reference image.",
    image: "/images/editorial/homepage-monsoon-transit.png",
    altText: "Model in black technical streetwear crossing a rain-wet Chennai underpass at night",
  },
  {
    id: "construction",
    index: "02",
    signal: "Construction / Proof",
    title: "Every detail must earn its place.",
    text: "Pockets follow reach. Panels follow pressure. Hardware follows use. Controlled aggression is not decoration; it is the result of disciplined construction.",
    image: "/images/editorial/homepage-construction-detail.png",
    altText: "Hands adjusting the modular construction of a black technical vest in a garment workshop",
  },
];

export function NarrativeSection() {
  return (
    <WipeContainer>
      <div className={styles.narrativeContent}>
        <div className={styles.narrativeHeader}>
          <IntersectionReveal>
            <p className={styles.sectionIndex}>Field Note / 001</p>
            <h2 className={styles.narrativeTitle}>Built in <span>movement.</span></h2>
            <div className={styles.headerFooter}>
              <p>Garments as systems for a city that never holds still.</p>
              <Link href="/stories/night-shift-001">Read field note <span aria-hidden="true">↗</span></Link>
            </div>
          </IntersectionReveal>
        </div>

        <div className={styles.chapters}>
          {chapters.map((chapter, index) => (
            <div key={chapter.id} className={styles.chapterBlock}>
              <div className={styles.chapterTextCol}>
                <IntersectionReveal>
                  <div className={styles.chapterMeta}>
                    <span>{chapter.index}</span>
                    <span>{chapter.signal}</span>
                  </div>
                  <h3 className={styles.chapterTitle}>{chapter.title}</h3>
                  <p className={styles.chapterText}>{chapter.text}</p>
                </IntersectionReveal>
              </div>
              
              <div className={styles.chapterImageCol}>
                <ParallaxLayer
                  amplitude={index % 2 === 0 ? 40 : 20}
                  depth={0.55}
                  frameClassName={styles.chapterImageFrame}
                  layerClassName={styles.chapterImageLayer}
                >
                  <Image
                    src={chapter.image}
                    alt={chapter.altText}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    className={styles.chapterImage}
                  />
                </ParallaxLayer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WipeContainer>
  );
}
