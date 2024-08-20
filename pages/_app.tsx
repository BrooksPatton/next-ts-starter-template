import App from 'next/app';
import Head from 'next/head';
import React from 'react';

class MyApp extends App {

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Head>
        <title>My Blog</title>
        <Component {...pageProps} />
      </Head>
    );
  }
}

export default MyApp;