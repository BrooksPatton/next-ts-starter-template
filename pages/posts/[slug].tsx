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

export const getStaticProps = async (params: { params: { slug: string } }) => {
  const post = await getPostBySlug(params.params.slug);
  return { props: { title: post.title, content: post.content } };
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

export default PostTemplate;
