import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EDITORIAL_STORIES } from "@/lib/data/editorial";
import styles from "./StoryDetail.module.css";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return EDITORIAL_STORIES.map(story => ({ slug: story.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = EDITORIAL_STORIES.find(item => item.id === slug);
  if (!story) return { title: "Story Not Found — CHAKSU" };

  return {
    title: `${story.title} — CHAKSU Stories`,
    description: story.dek,
    openGraph: { title: story.title, description: story.dek, images: [{ url: story.image }] },
  };
}

export default async function StoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const story = EDITORIAL_STORIES.find(item => item.id === slug);
  if (!story) notFound();

  return (
    <article className={styles.page}>
      <header className={styles.hero}>
        <Image src={story.image} alt={story.alt} fill sizes="100vw" className={styles.heroImage} preload />
        <div className={styles.scrim} aria-hidden="true" />
        <div className={styles.heroCopy}>
          <p className={styles.meta}>{story.meta}</p>
          <h1 className={styles.title}>{story.title}</h1>
        </div>
      </header>
      <div className={styles.article}>
        <p className={styles.dek}>{story.dek}</p>
        <div className={styles.body}>
          {story.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className={styles.actions}>
          <Link href={story.productHref} className={styles.primary}>{story.productLabel}</Link>
          <Link href="/stories" className={styles.secondary}>Back to Stories</Link>
        </div>
      </div>
    </article>
  );
}
