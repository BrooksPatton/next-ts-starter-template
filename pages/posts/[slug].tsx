import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Post } from '../../interfaces/post';
import styles from '../../styles/Post.module.scss';
import { getPostBySlug, getPostList } from '../api/api';

interface PostTemplateProps {
  post: Post;
}

const PostTemplate = ({ post }: PostTemplateProps) => {
  return (
    <div className={styles.postContainer}>
      <div className={styles.postHeader}>
        <Link href="/" className={styles.backLink}>
          ← Back to Home
        </Link>
        <Link href={`/edit/${post.slug}`} className={styles.editLink}>
          Edit Post
        </Link>
      </div>
      <article className={styles.post}>
        {post.coverImage && (
          <div className={styles.coverImageContainer}>
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt || post.title}
              width={1200}
              height={600}
              className={styles.coverImage}
              priority
            />
          </div>
        )}
        <h1>{post.title}</h1>
        <div className={styles.postMeta}>
          <span className={styles.postDate}>
            {new Date(post.datePublished).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
          <span className={styles.postAuthor}>by {post.author}</span>
        </div>
        <div className={styles.postContent}>
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
};

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return {
      notFound: true
    };
  }
  return {
    props: {
      post
    }
  };
}

export async function getStaticPaths() {
  const posts = await getPostList();
  const paths = posts.map(post => ({
    params: { slug: post.slug }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
}

export default PostTemplate;
