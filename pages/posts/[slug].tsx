import Link from 'next/link';
import React from 'react';
import { Post } from '../../interfaces/post';
import { getPostBySlug } from '../api/api';
import MainLayout from '../../components/MainLayout';
import styles from '../../styles/Home.module.scss';


const PostTemplate = (post: Post) => {
  return (
    <MainLayout>
      <div className={styles.main}>
        <h1 className={styles.description}></h1>
      <h1>{post.title}</h1>
      <i>{post.author}  {post.datePublished}</i>
      <p>{post.content}</p>
      <Link href={`/edit/${post.slug.replace(' ', '-')}`}>
         Edit
      </Link>
    </div>
       
    </MainLayout>
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

export default PostTemplate;
