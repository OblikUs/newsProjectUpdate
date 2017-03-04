import React from 'react';
import styles from './AboutUs.scss';

const AboutUs = () => (

    <div className={styles.main}>
      <div className={styles.about_container}>
        <h1 className={styles.header}>About Us</h1>
          <p>We are a group of three freshly baked full stack developers from DevLeague, and this project represents our last weeks
          work on the three-month inmersive bootcamp. We decided to build this project because we knew it would challenge us to use the skills
          we learned in the program and apply them to teach ourselves new skills; from web crawlers to graph databases, we are proud
          of what we achieved.</p>
          <p>Oblik was born as a response to the current political climate. We can find politics everywhere nowadays, and we wanted to show that there is more than
           one news source or perspective to look at when trying to inform ourselves about what is going
          on in the world.</p>
         <p>While building this project and spending so much time looking at news articles from different points of the political spectrum
         we learned to read the news better. Noticing that most articles are inevitably biased, and that as users, we need to be as
         critical as ever. This is why we decided to name our product Oblik, aliasing the word "oblique" (having a slant or sloping direction),
         to remind us of our biases, helping us fight them, and read news the most objective way possible.</p>
        </div>

         <div className={styles.imagesContainer}>
          <div className={styles.image}>
            <img src={'https://i.imgur.com/qJOBORD.jpg'} alt="estefania"/>
            <div className={styles.profile}>
              <h3>Estefanía Morton</h3>
              <p>title</p>
            </div>
          </div>

          <div className={styles.image}>
            <img src={'http://i.imgur.com/2BIHdnZ.jpg'} alt="tyler"/>
            <div className={styles.profile}>
              <h3>Tyler Nichols</h3>
              <p>Pizza Critic/Developer</p>
            </div>
          </div>

          <div className={styles.image}>
            <img src={'https://i.imgur.com/AULF5VS.jpg'} alt="jay"/>
            <div className={styles.profile}>
              <h3>Jay Houn</h3>
              <p>title</p>
            </div>
          </div>

         </div>
    </div>

);

export default AboutUs;