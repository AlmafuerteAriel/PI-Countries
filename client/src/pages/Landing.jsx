import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

export function Landing() {
  return (
    <div className={styles.content}>
      <h1>Countries</h1>
      <Link to='/home'>
        <button>Get Started</button>
      </Link>
    </div>
  )
}