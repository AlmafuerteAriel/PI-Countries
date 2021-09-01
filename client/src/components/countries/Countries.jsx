import { Link } from 'react-router-dom';
import styles from './Countries.module.css';

export function Countries() {
  return (
    <div className={styles.content}>
      <div className={styles.left_content}>

      </div>
      <div className={styles.right_content}>
        <p>“Remember that happiness is a way of travel, not a destination.”</p>
        <h1 className={styles.title}>Countries</h1>
        <Link to={"/countries"}>
        <h2>get started</h2>
      </Link>
      </div>
    </div>
  )
}