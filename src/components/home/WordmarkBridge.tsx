import Link from "next/link";
import { ParallaxLayer } from "../motion/ParallaxLayer";
import styles from "./WordmarkBridge.module.css";

export function WordmarkBridge() {
  return (
    <section className={styles.bridgeSection} aria-labelledby="bridge-heading">
      <div className={styles.bridgeRail}>
        <span>Independent / Chennai</span>
        <span>System 001</span>
        <span>Est. 2026</span>
      </div>
      <ParallaxLayer 
        amplitude={54}
        depth={1} 
        axis="x"
        frameClassName={styles.bridgeFrame}
        layerClassName={styles.bridgeLayer}
      >
        <h2 id="bridge-heading" className={styles.wordmark}>CHAKSU</h2>
      </ParallaxLayer>
      <div className={styles.bridgeStatement}>
        <p>Streetwear engineered for heat, rain, concrete and momentum.</p>
        <Link href="/about">Read the system <span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  );
}
