import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from '../styles/MainLayout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
