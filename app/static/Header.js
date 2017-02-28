import React from 'react';
import styles from './Header.scss';
import { Link } from 'react-router';

const Header = () => (
  <div className={styles.container}>
      <div className={styles.logo}><a href='#'>Oblik</a></div>
    <ul className={styles.mainNav}>
      <li><Link to="/how-it-works">How it Works</Link></li>
      <li><Link to="/about-us">About Us</Link></li>
      <li><a href="#">Install Oblik</a></li>
    </ul>
  </div>
);

export default Header;