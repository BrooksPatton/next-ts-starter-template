import React from 'react';
import { useRouter } from 'next/router';
import { Post } from '../../interfaces/post';
import styles from '../../styles/NewPost.module.scss';
import { getPostBySlug, updatePost, formatDate, getPostList } from '../api/api';

interface EditPostFormProps {
  post: Post;
}

const EditPostForm = ({ post }: EditPostFormProps) => {
  const router = useRouter();
  const [title, setTitle] = React.useState(post.title);
  const [content, setContent] = React.useState(post.content);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!post.id) {
      console.error('Post ID is missing');
      return;
    }
    try {
      await updatePost(post.id, {
        title,
        slug: title.toLowerCase().replace(/\s+/g, '-'),
        content,
        author: post.author,
        id: post.id,
        datePublished: post.datePublished,
        excerpt: content.substring(0, 150) + '...',
        coverImage: post.coverImage
      });
      router.push(`/posts/${title.toLowerCase().replace(/\s+/g, '-')}`);
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Edit Post</h1>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Update Post
        </button>
      </form>
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

export default EditPostForm;
