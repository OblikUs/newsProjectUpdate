import React from 'react';
import styles from './AboutUs.scss';

const AboutUs = () => (

    <div className={styles.about_container}>
        <h1 className={styles.header}>About Us</h1>
        <p>We are a group of three freshly baked full stack developers from DevLeague, and this project represents our last weeks'
        work on the three-month inmersive bootcamp. We decided to build this project because we knew it would challenge us to use the skills
        we learned in the program and apply them to teach ourselves new skills; from web crawlers to graph databases, we are proud
        of what we achieved.</p>
        <p>Oblik was born as a response to the current political climate. We can find politics everywhere nowadays, and we wanted to show that there is more than
        only one news source or perspective to look at when trying to inform ourselves as best as possible about what is going
        on in the world.</p>
         <p>While building this project and spending so much time looking at news articles from different points of the political spectrum
         we learned to read the news better. Noticing that most articles are inevitably biased, and that as users we need to be as
         critical as ever, this is why we decided to name our product Oblik, aliasing the word "oblique" (having a slant or sloping direction),
         to remind us of our biases, helping us fight them, and read news the most objective way possible.</p>
    </div>

);

export default AboutUs;