import React from 'react';
import { Post } from '../../interfaces/post';
import styles from '../../styles/Home.module.scss';
import { getPostBySlug, updatePost, formatDate } from '../api/api';

const EditPostForm = (post: Post) => {
  const [title, setTitle] = React.useState(post.title);
  const [content, setContent] = React.useState(post.content);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await updatePost(post.id, {
      title,
      slug: title.replace(' ', '-'),
      content,
      author: 'default',
      id: post.id,
      datePublished: formatDate(new Date()),
    });
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.description}>Edit Post</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <br />
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <br />
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export const getStaticProps = async (params: { params: { slug: string } }) => {
  const post = await getPostBySlug(params.params.slug);
  return { props: post };
};

export const getStaticPaths = () => {
  // Fetch the list of slugs from your data source
  const slugs = ['Post-One', 'Post-Two', 'Post-Three'];

  // Return an array of paths for each slug
  const paths = [
    { params: { slug: slugs[0] } },
    { params: { slug: slugs[1] } },
    { params: { slug: slugs[2] } },
  ];

  return { paths: paths, fallback: false };
};

export default EditPostForm;
