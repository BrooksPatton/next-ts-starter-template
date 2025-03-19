import Link from 'next/link';
import React from 'react';
import MainLayout from '../components/MainLayout';
import styles from '../styles/Home.module.scss';

const OtherPage = () => {
  return (
    <MainLayout>
      <div className={styles.main}>
        <h1>Other Page</h1>
        <p>This is another test page to verify routing and layout functionality.</p>
        <Link href="/">Back to Home</Link>
      </div>
    </MainLayout>
  );
};

export default OtherPage;