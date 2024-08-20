import Head from 'next/head';
import React from 'react';

const HomePage = () => {
  return (
    <div>
      <Head>
        <title>Home | My Blog</title>
      </Head>
      <h1>Welcome to My Blog</h1>
      <p>This is the homepage of my blog.</p>
    </div>
  );
};

export default HomePage;
