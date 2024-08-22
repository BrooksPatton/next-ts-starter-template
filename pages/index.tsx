import React from 'react';
import MainLayout from '../components/MainLayout';
import PostList from '../components/PostList';
import { formatDate } from './api/api';
import styles from '../styles/Home.module.scss';

const HomePage = () => {
  const posts = [
    {
      id: 1,
      slug: 'Post-One',
      title: 'Post One',
      content: 'content',
      author: 'default',
      datePublished: formatDate(new Date()),
    },
    {
      id: 2,
      slug: 'Post-Two',
      title: 'Post Two',
      content: 'content',
      author: 'default',
      datePublished: formatDate(new Date()),
    },
    {
      id: 3,
      slug: 'Post-Three',
      title: 'Post Three',
      content: 'content',
      author: 'default',
      datePublished: formatDate(new Date()),
    },
  ];

  return (
    <MainLayout>
      <div className={styles.main}>
        <h1>Welcome to My Blog</h1>
        <p>These are the most recent blog posts</p>
        <PostList posts={posts} />
      </div>
    </MainLayout>
  );
};

export default HomePage;
