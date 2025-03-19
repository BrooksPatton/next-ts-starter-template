import React from 'react';
import styles from '../styles/About.module.scss';

const AboutPage = () => {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.aboutContent}>
        <h1>About This Project</h1>
        <h2>Purpose</h2>
        <p>
          This Next.js TypeScript starter template is specifically designed for conducting pair programming interviews.
          It provides a robust foundation with common features and challenges that developers encounter in real-world
          applications.
        </p>

        <h2>Key Features</h2>
        <ul>
          <li>📝 Blog-style content management with CRUD operations</li>
          <li>🔍 Server-side and static page generation</li>
          <li>🎨 Modern UI components with SCSS styling</li>
          <li>✅ Comprehensive test coverage using Jest and React Testing Library</li>
          <li>📱 Responsive design principles</li>
          <li>🔒 Type safety with TypeScript</li>
        </ul>

        <h2>Interview Scenarios</h2>
        <p>
          This codebase can be used to evaluate candidates skills in:
        </p>
        <ul>
          <li>Understanding and extending existing React/Next.js components</li>
          <li>Working with TypeScript types and interfaces</li>
          <li>Implementing new features and fixing bugs</li>
          <li>Writing and maintaining tests</li>
          <li>Handling API integrations and data management</li>
          <li>Applying responsive design principles</li>
        </ul>

        <h2>Getting Started</h2>
        <p>
          Interviewers can use this template to:
        </p>
        <ul>
          <li>Add new feature requirements</li>
          <li>Introduce intentional bugs for debugging exercises</li>
          <li>Request improvements to existing components</li>
          <li>Discuss architectural decisions and trade-offs</li>
          <li>Evaluate code quality and best practices</li>
        </ul>

        <h2>Tech Stack</h2>
        <ul className={styles.techStack}>
          <li>Next.js for server-side rendering and routing</li>
          <li>TypeScript for type safety</li>
          <li>SCSS modules for styling</li>
          <li>Jest and React Testing Library for testing</li>
          <li>ESLint and Prettier for code quality</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;