import Head from 'next/head';
import React from 'react';
import { createPost } from './api/api';
import { Post } from '../interfaces/post';

const NewPostForm = (post: Post) => {
  const [title] = React.useState(post.title);
  const [content] = React.useState(post.content);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await createPost({
      title,
      content,
      author: 'default',
      id: 12,
      datePublished: new Date(),
    });
  };

  return (
    <div>
      <Head>
        <title>New Post | My Blog</title>
      </Head>
      <h1>New Post</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" />
        <br />
        <label htmlFor="content">Content:</label>
        <textarea id="content" name="content" />
        <br />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default NewPostForm;
