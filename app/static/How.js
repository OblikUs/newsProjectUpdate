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

          <div className={styles.info}>
            <p className={styles.info1}>
              <h3>How relationships were established between articles</h3>
              Dessert cake pudding jujubes wafer tootsie roll candy canes ice cream tart. Lollipop sugar plum carrot cake chupa chups ice cream cheesecake carrot cake. Carrot cake donut cake.
              Lemon drops sweet roll cake ice cream liquorice sugar plum toffee. Brownie candy tiramisu jelly marzipan. Liquorice croissant pastry. Chocolate bar powder sweet chocolate bar toffee.
              Sweet oat cake marzipan cotton candy marzipan cupcake halvah donut. Jujubes liquorice pie. Croissant powder apple pie jelly-o candy canes candy gummies.
              Liquorice donut cake caramels carrot cake wafer. Marshmallow bear claw pastry marzipan carrot cake jelly tart. Cake candy sugar plum.
              Cotton candy jelly gingerbread gingerbread. Pudding gummies soufflé jujubes. Danish tootsie roll sesame snaps pie ice cream.
            </p>
            <p className={styles.info2}>
              <h3>Road Blocks Along The Way</h3>
              Throughout the development process, the obstacles we faced stacked higher than the ceiling. Our only solution was to think "outside the box" in order to solve them quickly and efficiently.
              One of the main hurdles was gathering data from the complete politcial spectrum since many many news sources don't have open API's. Our solution, build
              webscrapers to gather the data for us. Once the data began flowing, we were hindered with the question "how can we derive context from these articles without machine learning?".
              Through some ingenious algorithms, we successfully transformed our data into meaningful context to which we could generate relationships from. The end goal was to provide
              quick and accurate information back to the end user. -Team Oblik

            </p>
            <p className={styles.info3}>
              <h3>Insights</h3>
              We categorized news articles based on liberal, neutral, and conservative news sources, so we labeled them with either
               "left", "center-left", "center", "center-right", and "right". Our team started to notice a recurrent pattern that our
                database would return mostly "center" and "center-left" articles when visiting liberal websites. The Neo4j database
                is constantly making relationships between keywords from the database and the articles being visited. We concluded
                that liberal news sources tend to share the same vocabulary and subject matter. The same goes for the conservative
                side, the same keywords being used over and over again. We were fascinated by this information and can see why certain
                people can be drawn into one political avenue compared to another.
            </p>
            <div className={styles.imgContainer}>
              <h3>Technology used</h3>
              <img className={styles.img} src="https://i.imgur.com/ucxGCPQ.png" />
            </div>
          </div>
      </div>
    )
  }

}



export default How;