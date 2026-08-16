import Image from "next/image";
import { ParallaxLayer } from "../motion/ParallaxLayer";
import { IntersectionReveal } from "../motion/IntersectionReveal";
import { WipeContainer } from "./WipeContainer";
import styles from "./NarrativeSection.module.css";
import { MOCK_STORIES } from "@/lib/data/fixtures";

export function NarrativeSection() {
  const story = MOCK_STORIES[0];
  
  return (
    <WipeContainer>
      <div className={styles.narrativeContent}>
        <div className={styles.narrativeHeader}>
          <IntersectionReveal>
            <h2 className={styles.narrativeTitle}>{story.title}</h2>
          </IntersectionReveal>
        </div>

        <div className={styles.chapters}>
          {story.chapters.map((chapter, index) => (
            <div key={chapter.id} className={styles.chapterBlock}>
              <div className={styles.chapterTextCol}>
                <IntersectionReveal>
                  <p className={styles.chapterText}>{chapter.text}</p>
                </IntersectionReveal>
              </div>
              
              <div className={styles.chapterImageCol}>
                <ParallaxLayer
                  amplitude={index % 2 === 0 ? 40 : 20}
                  depth={0.55} // Mid depth
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
