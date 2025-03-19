import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styles from '../styles/Navbar.module.scss';

export default function Navbar() {
  const router = useRouter();

  const isActive = (path: string) => {
    return router.pathname === path;
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>Next Blog</span>
        </Link>
        <div className={styles.navLinks}>
          <Link href="/">
            <span className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}>
              Home
            </span>
          </Link>
          <Link href="/about">
            <span className={`${styles.navLink} ${isActive('/about') ? styles.active : ''}`}>
              About
            </span>
          </Link>
          <Link href="/new">
            <span className={`${styles.navLink} ${isActive('/new') ? styles.active : ''}`}>
              New Post
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
