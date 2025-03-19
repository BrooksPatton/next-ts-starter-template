import React from 'react';
import { getPostList } from './api/api';
import PostList from '../components/PostList';
import { Post } from '../interfaces/post';
import styles from '../styles/Home.module.scss';

interface HomePageProps {
  posts: Post[];
}

const HomePage = ({ posts }: HomePageProps) => {
  return (
    <div className={styles.main}>
      <h1>Welcome to My Blog</h1>
      <p>These are the most recent blog posts</p>
      <PostList posts={posts} />
    </div>
  );
};

export async function getStaticProps() {
  const posts = await getPostList();
  return {
    props: {
      posts
    }
  };
}

export default HomePage;

