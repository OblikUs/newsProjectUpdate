import React from 'react';
import styles from './Header.scss';
import { Link } from 'react-router';

const Header = () => (
  <div className={styles.container}>
      <div className={styles.logo}><a href='#'>Oblik</a></div>
    <ul className={styles.mainNav}>
      <Link to="/how-it-works"><li>How it Works</li></Link>
      <Link to="/about-us"><li>About Us</li></Link>
      <li><a href="#">Install Oblik</a></li>
    </ul>
  </div>
);

export default Header;