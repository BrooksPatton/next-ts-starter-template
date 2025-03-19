import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from '../styles/PostCard.module.scss';

interface PostCardProps {
  title: string;
  excerpt: string;
  slug: string;
  coverImage?: {
    url: string;
    alt: string;
  };
  date?: string;
  author?: string;
}

export default function PostCard({
  title,
  excerpt,
  slug,
  coverImage,
  date,
  author,
}: PostCardProps) {
  return (
    <article className={styles.postCard}>
      <div className={styles.postImage}>
        <Image
          src={coverImage?.url || '/images/default-cover.jpg'}
          alt={coverImage?.alt || title}
          width={400}
          height={200}
          className={styles.image}
        />
      </div>
      <div className={styles.postContent}>
        <Link href={`/blog/${slug}`} className={styles.postTitle}>
          {title}
        </Link>
        <p className={styles.postExcerpt}>
          {excerpt || (title.length > 150 ? `${title.substring(0, 150)}...` : title)}
        </p>
        {(date || author) && (
          <div className={styles.postMeta}>
            {date && <span className={styles.postDate}>{date}</span>}
            {author && <span className={styles.postAuthor}>{author}</span>}
          </div>
        )}
      </div>
    </article>
  );
}