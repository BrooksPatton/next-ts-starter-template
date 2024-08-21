import Head from 'next/head';
import React from 'react';
import { getPostBySlug, updatePost } from './api/api';
import { Post } from '../interfaces/post';

const EditPostForm = (post: Post) => {
  const [title, setTitle] = React.useState(post.title);
  const [content, setContent] = React.useState(post.content);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await updatePost(post.id, {
      title,
      content,
      author: 'default',
      id: post.id,
      datePublished: new Date(),
    });
  };

  return (
    <div>
      <Head>
        <title>Edit Post | My Blog</title>
      </Head>
      <h1>Edit Post</h1>
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

export const getStaticProps = async (params: { slug: string }) => {
  const post = await getPostBySlug(params.slug);
  return { props: { post: { title: post.title, content: post.content } } };
};

export default EditPostForm;
