import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Post } from '../interfaces/post';
import styles from '../styles/PostList.module.scss';

interface PostListProps {
  posts: Post[] | null;
}

export default function PostList({ posts }: PostListProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <ul className={styles.postList}>
      {posts.map((post) => (
        <li key={post.id} className={styles.postCard}>
          <div className={styles.postImage}>
            <Image
              src={post.coverImage?.url || '/images/default-cover.jpg'}
              alt={post.coverImage?.alt || post.title}
              width={400}
              height={200}
              className={styles.image}
            />
          </div>
          <div className={styles.postContent}>
            <Link
              href={`/posts/${post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
              className={styles.postTitle}
            >
              {post.title}
            </Link>
            <p className={styles.postExcerpt}>
              {post.excerpt || (post.content.length > 150
                ? `${post.content.substring(0, 150)}...`
                : post.content)}
            </p>
            <div className={styles.postMeta}>
              <span className={styles.postDate}>
                {new Date(post.datePublished).toLocaleDateString()}
              </span>
              <span className={styles.postAuthor}>{post.author}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

