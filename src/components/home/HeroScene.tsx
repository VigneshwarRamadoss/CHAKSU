import Image from "next/image";
import Link from "next/link";
import styles from "./HeroScene.module.css";
import { ParallaxLayer } from "../motion/ParallaxLayer";

export function HeroScene() {
  return (
    <section className={styles.heroSection}>
      <ParallaxLayer 
        amplitude={28} 
        depth={1.02} 
        frameClassName={styles.heroBackgroundFrame}
        layerClassName={styles.heroBackgroundLayer}
      >
        <Image
          src="/images/Visual Background UI Image.png"
          alt="CHAKSU Hero Background"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
      </ParallaxLayer>

      <ParallaxLayer 
        amplitude={12} 
        depth={1} 
        frameClassName={styles.heroWordmarkFrame}
        layerClassName={styles.heroWordmarkLayer}
      >
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Controlled Aggression</h1>
          <p className={styles.heroSubtitle}>New Arrivals</p>
          <div className={styles.ctaWrapper}>
            <Link 
              href="/collections/new-release" 
              className={styles.heroCtaBtn}
              aria-label="Explore Drop 01 New Release Collection"
            >
              Explore Drop 01 ↓
            </Link>
          </div>
        </div>
      </ParallaxLayer>
    </section>
  );
}
