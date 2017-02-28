import React from 'react';
import styles from './AboutUs.scss';

const AboutUs = () => (
  <div className="content-container">
      <div className="header-image about">
        <h1 className={styles.header}>About Us</h1>
      </div>

        <div className={styles.flex_container}>
          <div className={styles.text1}>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys
            standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with
            desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum.</p>
          </div>
          <div className={styles.text2}>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys
            standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with
            desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum.</p>
            </div>
            <div className={styles.text3}>
             <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys
            standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with
            desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum.</p>
            </div>
        </div>




  </div>
);

export default AboutUs;