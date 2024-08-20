import Head from 'next/head';
import React from 'react';
import { Post } from '../../interfaces/post';
import { getPostBySlug } from '../api/api';

const PostTemplate = (post: Post) => {
  return (
    <div>
      <Head>
        <title>{post.title} | My Blog</title>
      </Head>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export const getStaticProps = async (params: { slug: number }) => {
  const post = await getPostBySlug(params.slug);
  return { props: { post: { title: post.title, content: post.content } } };
};

export default PostTemplate;
