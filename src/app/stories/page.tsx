import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EDITORIAL_STORIES } from "@/lib/data/editorial";
import styles from "./Stories.module.css";

export const metadata: Metadata = {
  title: "Stories — CHAKSU",
  description:
    "Field notes on movement, material, and Chennai after dark from CHAKSU.",
};

export default function Stories() {
  const [leadStory, ...storyIndex] = EDITORIAL_STORIES;

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <Image
          src="/images/Visual Background UI Image.png"
          alt=""
          fill
          sizes="100vw"
          className={styles.heroImage}
          preload
        />
        <div className={styles.heroScrim} aria-hidden="true" />
        <div className={styles.heroTopline}>
          <span>CHAKSU FIELD NOTES</span>
          <span>ISSUE 001 / CHENNAI</span>
        </div>
        <div className={styles.heroCopy}>
          <h1>Stories from a city in motion.</h1>
          <p>
            People, garments, weather, and the systems between them. No trend
            report. No borrowed mythology. Just the conditions that shape the
            work.
          </p>
          <a href="#story-01" className={styles.scrollLink}>
            Enter issue 001 <span aria-hidden="true">↓</span>
          </a>
        </div>
      </header>

      <article id="story-01" className={styles.leadStory}>
        <div className={styles.leadCopy}>
          <p className={styles.storyMeta}>{leadStory.meta}</p>
          <h2>{leadStory.title}</h2>
          <p className={styles.dek}>{leadStory.dek}</p>
          {leadStory.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <Link href={leadStory.productHref} className={styles.textLink}>
            {leadStory.productLabel} <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <figure className={styles.leadMedia}>
          <Image
            src={leadStory.image}
            alt={leadStory.alt}
            fill
            sizes="(max-width: 899px) 100vw, 55vw"
            className={styles.storyImage}
          />
          <figcaption>{leadStory.caption}</figcaption>
        </figure>
      </article>

      <blockquote className={styles.pullQuote}>
        <span aria-hidden="true">“</span>
        <p>The day asks for shade. The night returns the city to motion.</p>
      </blockquote>

      <section className={styles.storyIndex} aria-labelledby="story-index-title">
        <div className={styles.indexHeader}>
          <p>STORY INDEX / 002—004</p>
          <h2 id="story-index-title">Read the construction.</h2>
        </div>
        <div className={styles.storyGrid}>
          {storyIndex.map((story, index) => (
            <article key={story.id} className={styles.storyCard}>
              <div className={styles.cardMedia}>
                <Image
                  src={story.image}
                  alt={story.alt}
                  fill
                  sizes="(max-width: 699px) 100vw, (max-width: 1099px) 50vw, 33vw"
                  className={styles.storyImage}
                />
              </div>
              <div className={styles.cardCopy}>
                <p className={styles.storyMeta}>
                  {String(index + 2).padStart(3, "0")} / {story.meta}
                </p>
                <h3>{story.title}</h3>
                <p>{story.dek}</p>
                <Link href={story.productHref} className={styles.textLink}>
                  {story.productLabel} <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.editorialCode} aria-labelledby="editorial-code-title">
        <p className={styles.storyMeta}>EDITORIAL CODE</p>
        <h2 id="editorial-code-title">What belongs in CHAKSU Stories.</h2>
        <dl className={styles.codeGrid}>
          <div>
            <dt>People</dt>
            <dd>Real participants, named and credited. Movement before posing.</dd>
          </div>
          <div>
            <dt>Process</dt>
            <dd>Decisions, prototypes, material proof, and what changed.</dd>
          </div>
          <div>
            <dt>Place</dt>
            <dd>Chennai as lived context—not a decorative moodboard.</dd>
          </div>
        </dl>
      </section>

      <section className={styles.closing} aria-labelledby="stories-cta-title">
        <div>
          <p className={styles.storyMeta}>CONTINUE</p>
          <h2 id="stories-cta-title">The story ends at the garment.</h2>
        </div>
        <div className={styles.closingLinks}>
          <Link href="/collections/new-release" className={styles.primaryLink}>
            Shop release 001 <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/about" className={styles.secondaryLink}>
            About CHAKSU
          </Link>
        </div>
      </section>
    </div>
  );
}
