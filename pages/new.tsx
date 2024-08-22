import React from 'react';
import { createPost, formatDate } from './api/api';
import MainLayout from '../components/MainLayout';
import { Post } from '../interfaces/post';
import styles from '../styles/Home.module.scss';

const NewPostForm = (post: Post) => {
  const [title] = React.useState(post.title);
  const [content] = React.useState(post.content);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await createPost({
      title,
      slug: title.replace(' ', '-'),
      content,
      author: 'default',
      id: 12,
      datePublished: formatDate(new Date()),
    });
  };

  return (
    <MainLayout>
      <div className={styles.main}>
      <h1 className={styles.description}>New Post</h1>
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
    </MainLayout>
  );
};

export default NewPostForm;
