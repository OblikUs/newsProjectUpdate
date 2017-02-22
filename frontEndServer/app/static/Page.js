import React from 'react';
import styles from './Page.scss';

class Page extends React.Component {
  render() {
    return (
      <div>
        <div className={styles.banner}>
          <div className={styles.container}>
            <h1 className={styles.headline}>Get a Different Perspective</h1>
            <span className={styles.tagline}>Read news articles from the left, right, and just in between.</span>
          </div>
              <a href="#" className={styles.btn}>Download Now</a>
        </div>
        <div className={styles.imgContainer}>
          <div className={styles.newsExplain}>Over 70+ news sources</div>
          <img src={'http://i.imgur.com/aFZOJfT.png'} alt="news_articles" className={styles.newsLogos}/>
        </div>
      </div>

    )
  }
};

export default Page;