import { ParallaxLayer } from "../motion/ParallaxLayer";
import styles from "./WordmarkBridge.module.css";

export function WordmarkBridge() {
  return (
    <section className={styles.bridgeSection} aria-hidden="true">
      <ParallaxLayer 
        amplitude={80} 
        depth={1} 
        axis="x"
        frameClassName={styles.bridgeFrame}
        layerClassName={styles.bridgeLayer}
      >
        <div className={styles.wordmark}>CHAKSU</div>
      </ParallaxLayer>
    </section>
  );
}
