import React from 'react';
import styles from './Header.scss';
// import { Link } from 'react-router';

const Header = () => (
  <div className={styles.container}>
      <div className={styles.logo}><a href='#'>Oblik</a></div>
    <ul className={styles.mainNav}>
      <li><a href="#">How it Works</a></li>
      <li><a href="#">About Us</a></li>
      <li><a href="#">Install Oblik</a></li>
    </ul>
  </div>
);

export default Header;