import React from 'react';
import styles from './ArticlesUrls.scss';

const ArticleUrls = ({urls, title}) => (
  <ul className={styles.ul}>
    <h3>{title}&nbsp;<span>{urls.length}</span></h3>
    { urls.map((g, i) => {
      return (
        <li className={styles.li} key={ i }>
          <a href={g} target='_blank'>
            <span className={styles.span}>&nbsp;{ g }</span>
          </a>
        </li>
      )
    })}
  </ul>
)
export default ArticleUrls;