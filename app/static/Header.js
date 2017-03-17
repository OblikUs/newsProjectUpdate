import React from 'react';
import styles from './Header.scss';
import { Link } from 'react-router';

const Header = () => (
  <div className={styles.container}>
        <div className={styles.logo}><a href='#'>Oblik</a></div>
        <div className={styles.menuBtn}>
          <img className={styles.svg} src="https://f.cl.ly/items/1U2c3b1215383h3a2T2r/icon-menu.svg" />
        </div>
      <ul className={styles.mainNav}>
        <li className={styles.menu}>Menu</li>
        <hr/>
        <li><Link to="#">Home</Link></li>
        <hr/>
        <li><Link to="/how-it-works">How it Works</Link></li>
        <hr/>
        <li><Link to="/about-us">About Us</Link></li>
        <hr/>
        <li><a href="https://chrome.google.com/webstore/detail/oblikus/jdhmfapoagfijjpbnknhnhojmccphfjb?hl=en-US"
          target="_blank">Install Oblik
        </a></li>
      </ul>
  </div>
);

export default Header;