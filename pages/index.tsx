import React from 'react';
import MainLayout from '../components/MainLayout';
import PostList from '../components/PostList';
import styles from '../styles/Home.module.scss';

const HomePage = () => {
  const posts = [
    {
      id: 1,
      title: 'Post 1',
      content: 'content',
      author: 'default',
      datePublished: new Date(),
    },
    {
      id: 2,
      title: 'Post 2',
      content: 'content',
      author: 'default',
      datePublished: new Date(),
    },
    {
      id: 3,
      title: 'Post 3',
      content: 'content',
      author: 'default',
      datePublished: new Date(),
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
