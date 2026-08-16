import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ABOUT_PRINCIPLES } from "@/lib/data/editorial";
import { TheDotLogo } from "@/components/common/TheDotLogo";
import styles from "./About.module.css";

export const metadata: Metadata = {
  title: "About CHAKSU",
  description:
    "CHAKSU is a Chennai streetwear project shaped by movement, material clarity, and controlled aggression.",
};

export default function About() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="about-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>CHENNAI / INDIA / CHAKSU</p>
          <h1 id="about-title" className={styles.heroTitle}>
            Built from
            <span>movement.</span>
          </h1>
          <p className={styles.heroLead}>
            CHAKSU is a Chennai streetwear project built around controlled
            aggression: strong silhouettes, exact decisions, and details that
            earn their place.
          </p>
        </div>

        <figure className={styles.heroMedia}>
          <Image
            src="/images/products/signature-hoodie.png"
            alt="Bone structured CHAKSU hoodie in warm architectural light"
            fill
            sizes="(max-width: 899px) 100vw, 52vw"
            className={styles.image}
            preload
          />
          <figcaption className={styles.mediaCaption}>
            Form / function / tension
          </figcaption>
        </figure>
      </section>

      <section className={styles.origin} aria-labelledby="origin-title">
        <p className={styles.sectionIndex}>01 / ORIGIN</p>
        <div className={styles.originCopy}>
          <h2 id="origin-title" className={styles.sectionTitle}>
            The city is not a backdrop.
          </h2>
          <div className={styles.proseColumns}>
            <p>
              Chennai sets the conditions: heat held in concrete, sudden rain,
              long crossings, crowded rooms, and nights that move differently
              from the day. CHAKSU starts there—not with a borrowed symbol, but
              with the way a garment has to behave.
            </p>
            <p>
              That means room where the body needs it, structure where the
              silhouette demands it, and visual impact that survives beyond a
              campaign image. Place appears through people, climate, material,
              and movement—not costume.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.principles} aria-labelledby="principles-title">
        <div className={styles.principlesHeader}>
          <p className={styles.sectionIndex}>02 / OPERATING CODE</p>
          <h2 id="principles-title" className={styles.sectionTitle}>
            Four rules. No filler.
          </h2>
        </div>

        <ol className={styles.principleGrid}>
          {ABOUT_PRINCIPLES.map((principle, index) => (
            <li key={principle.title} className={styles.principleCard}>
              <span className={styles.principleNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{principle.title}</h3>
              <p>{principle.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.designCode} aria-labelledby="code-title">
        <div className={styles.codeMedia}>
          <Image
            src="/images/products/k-line-oversized-tee.png"
            alt="Black K-Line oversized tee in a blue-lit concrete setting"
            fill
            sizes="(max-width: 899px) 100vw, 48vw"
            className={styles.image}
          />
        </div>
        <div className={styles.codeCopy}>
          <p className={styles.sectionIndex}>03 / DESIGN LANGUAGE</p>
          <h2 id="code-title" className={styles.sectionTitle}>
            80% discipline.
            <br />
            20% damage.
          </h2>
          <p>
            The master CHAKSU wordmark stays clean. The central K supplies the
            cut, crop, and forward tension. Xerox grain, registration shifts,
            and abrasion belong to campaigns—not to the core mark.
          </p>
          <p>
            Black, bone, deep indigo, and sodium light form the base. Type is
            compressed and decisive. Commerce stays calm enough to trust.
          </p>
        </div>
      </section>

      <section className={styles.truth} aria-labelledby="truth-title">
        <p className={styles.sectionIndex}>04 / THE STANDARD</p>
        <div>
          <h2 id="truth-title" className={styles.truthTitle}>
            Proof before adjectives.
          </h2>
          <p className={styles.truthBody}>
            Materials, origins, methods, availability, and performance claims
            belong on the page only when they can be verified. We would rather
            leave space than fill it with mythology.
          </p>
        </div>
      </section>

      <section className={styles.truth} aria-labelledby="rights-title">
        <p className={styles.sectionIndex}>05 / DESIGN RIGHTS</p>
        <div>
          <h2 id="rights-title" className={styles.truthTitle}>
            Art Direction & Ownership
          </h2>
          <div className={styles.truthBody} style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <TheDotLogo size={36} color="var(--color-ink)" />
            <span>
              All design rights, visual identity systems, and brand direction for CHAKSU belong exclusively to <strong>The Dot</strong>.
            </span>
          </div>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="about-cta-title">
        <p className={styles.eyebrow}>THE WORK CONTINUES</p>
        <h2 id="about-cta-title">See the idea in motion.</h2>
        <div className={styles.ctaLinks}>
          <Link href="/stories" className={styles.primaryLink}>
            Read the stories <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/collections/new-release" className={styles.secondaryLink}>
            Explore the release
          </Link>
        </div>
      </section>
    </div>
  );
}
