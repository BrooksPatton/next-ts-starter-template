import Link from 'next/link';
import React from 'react';
import MainLayout from '../components/MainLayout';
import styles from '../styles/Home.module.scss';

const TestPage = () => {
  return (
    <MainLayout>
      <div className={styles.main}>
        <h1>Test Page</h1>
        <p>This is a test page to verify routing and layout functionality.</p>
        <Link href="/">Back to Home</Link>
      </div>
    </MainLayout>
  );
};

export default TestPage;