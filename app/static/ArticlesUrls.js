import React from 'react';
import styles from './ArticlesUrls.scss';

const ArticleUrls = ({data, title}) => (
  <ul className={styles.ul}>
    <h3>{title}&nbsp;<span>{data.length}</span></h3>
    { data.map((g, i) => {
      return (
        <li className={styles.li} key={ i }>
          <a href={g.url} target='_blank'>
            <p>{g.title}</p>
          </a>
        </li>
      )
    })}
  </ul>
)
export default ArticleUrls;