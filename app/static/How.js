import React from 'react';
import styles from './How.scss';
import C3Chart from 'react-c3js';
import ArticleUrls from './ArticlesUrls';

class How extends React.Component {
  constructor(props) {
    super();

    this.state = {
      data: {
        columns: [
          ['left', 30],
          ['center-left',25],
          ['center', 40],
          ['center-right', 20],
          ['right', 43]
        ],
        types: {
          left: 'bar',
          'center-left': 'bar',
          center: 'bar',
          'center-right': 'bar',
          right: 'bar'
        }
      },
      allUrls: {
        'left-titles': [],
        'left-urls': [],
        'center-left-titles': [],
        'center-left-urls': [],
        'center-titles': [],
        'center-urls': [],
        'center-right-titles': [],
        'center-right-urls': [],
        'right-titles': [],
        'right-urls': []
      },
      showUrls: '',
      result: []
    }

   this.handleSubmit = this.handleSubmit.bind(this);
   this.getData = this.getData.bind(this);
   this.handleArticleUrl = this.handleArticleUrl.bind(this);
   this.sortData = this.sortData.bind(this);

  }

  handleSubmit(event) {
    event.preventDefault();

    let submittedText = {
      search: document.getElementById('inputText').value
    }

    let form = document.getElementById('form');
    form.reset();

    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', this.getData);
    oReq.addEventListener('error', (event) => {
      console.log('error', event);
    })
    oReq.open('POST', '/article-search');
    oReq.setRequestHeader("content-type", "application/json");
    oReq.send(JSON.stringify(submittedText));

  }

  getData(event) {
    let articles = JSON.parse(event.currentTarget.responseText);
    this.setState(articles)
  }

  handleArticleUrl(event) {
    const {innerHTML} = event.target;
    this.setState({
      showUrls: innerHTML.toLowerCase(),
      result: this.sortData(innerHTML.toLowerCase() + '-urls', innerHTML.toLowerCase() + '-titles' )
    })
  }

  sortData(url, title) {
    const results = this.state.allUrls[`${url}`].map((curr, indx) => {
      return {
        url: curr,
        title: this.state.allUrls[`${title}`][indx]
      }
    })
    return results || []
  }


  render() {
    console.log('this.state.showUrls: ', this.state.showUrls);
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>How It Works</h2>
        </div>
            <div className={styles.info}>
            <div className={styles.info1}>
              <img className={styles.icons} src="http://i.imgur.com/wcg2Jhd.png" />
              <h3>How we related articles</h3>
              <p className={styles.p1}>
                Graph databases! We used Neo4j to make relationships between articles sharing the same context. We created algorithms to extract keywords from the articles we
                were collecting and made relationships between the ones that shared the same keywords.
              </p>
            </div>
            <div className={styles.info1}>
              <img className={styles.icons} src="http://i.imgur.com/nWFAUuc.png" />
              <h3>Insights</h3>
              <p className={styles.p1}>
              Our team started to notice a recurring pattern where our graph database would return mostly liberal articles when we are visiting liberal news sources. We realized that liberal news sources tend to share the same vocabulary and subject matter, therefore our database would return more articles from the left. This outcome would be the same when visiting conservative news sources.
              </p>
            </div>
           <div className={styles.info1}>
             <img className={styles.icons} src="http://i.imgur.com/e0Hm6KQ.png" />
             <h3>Road Blocks Along The Way</h3>
             <p className={styles.p1}>
               Need to get data from sources without API's? Build web crawlers! One of the main hurdles was gathering data from the complete political spectrum since many news sources don't have open APIs, our solution, build webscrapers to gather the data for us.
             </p>
          </div>
          </div>


        <div className={styles.subtitle}>
          <h2>Give Oblik A Test Run</h2>
        </div>
        <div className={styles.explain}>
          <p>
            Go ahead enter a topic that interests you!! Click the
            buttons below to explore related news articles
            from hundreds of different sources and views.
          </p>
          <p>
            Cant find what your looking for? Dont worry, we are adding thousands of articles
            a day to ensure you have the most up to date news all the time.
          </p>
        </div>

        <div className={styles.flexContainer}>
          <div className={styles.leftHow}>
            <form id="form" className={styles.form} onSubmit={this.handleSubmit}>
              <input type="text" id="inputText" placeholder="search for a topic" />
              <input type="submit" id="submit" value="SUBMIT" />
            </form>

            <C3Chart data={this.state.data} style={{width: 500, height: 400}} />
          </div>

          <div className={styles.chart}>
            <div className={styles.urlButtons}>
              <button className={styles.button} onClick={this.handleArticleUrl}>Left</button>
              <button className={styles.button} onClick={this.handleArticleUrl}>Center-Left</button>
              <button className={styles.button} onClick={this.handleArticleUrl}>Center</button>
              <button className={styles.button} onClick={this.handleArticleUrl}>Center-Right</button>
              <button className={styles.button} onClick={this.handleArticleUrl}>Right</button>
              <ArticleUrls data={this.state.result} title={this.state.showUrls} />
            </div>
          </div>
        </div>
        <div className={styles.imgContainer}>
            <h3>Technology used</h3>
            <img className={styles.img} src="https://i.imgur.com/ucxGCPQ.png" />
          </div>
      </div>
    )
  }

}



export default How;

<div className={styles.imgContainer}>
            <h3>Technology used</h3>
            <img className={styles.img} src="https://i.imgur.com/ucxGCPQ.png" />
          </div>

