import { Link } from 'react-router-dom';
import styles from './Landing.module.css';
import landing_img from '../assets/landing_img.png';

export function Landing() {
  return (
    <div className={styles.content}>
      <div className={styles.left_content}>
        <img className={styles.img} src={landing_img} alt="landing-img" />
      </div>
      <div className={styles.right_content}>
        <p>“Remember that happiness is a way of travel, not a destination.”</p>
        <h1 className={styles.title}>Henry Countries</h1>
        <Link to={"/countries/"}>
        <h2>get started</h2>
      </Link>
      </div>
    </div>
  )
}