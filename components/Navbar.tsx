import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from '../styles/Navbar.module.scss';

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return router.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={150}
            height={40}
            priority
            className={styles.logoImage}
          />
        </Link>
        <button className={styles.menuButton} onClick={toggleMenu}>
          <span className={styles.menuIcon}></span>
          <span className={styles.menuIcon}></span>
          <span className={styles.menuIcon}></span>
        </button>
        <div className={`${styles.navLinks} ${isMenuOpen ? styles.active : ''}`}>
          <Link href="/">
            <span 
              className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
              onClick={handleLinkClick}
            >
              Home
            </span>
          </Link>
          <Link href="/about">
            <span 
              className={`${styles.navLink} ${isActive('/about') ? styles.active : ''}`}
              onClick={handleLinkClick}
            >
              About
            </span>
          </Link>
          <Link href="/new">
            <span 
              className={`${styles.navLink} ${isActive('/new') ? styles.active : ''}`}
              onClick={handleLinkClick}
            >
              New Post
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
