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
        left: [],
        'center-left': [],
        center: [],
        'center-right': [],
        right: []
      },
      showUrls: '',
      hideUrls: false


    }

   this.handleSubmit = this.handleSubmit.bind(this);
   this.getData = this.getData.bind(this);
   this.handleArticleUrl = this.handleArticleUrl.bind(this);
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
    this.setState({showUrls: event.target.innerHTML.toLowerCase() })
    this.setState({hideUrls: !this.state.hideUrls})
  }



  render() {
    let urlsToShow = this.state.allUrls[this.state.showUrls] || []
    return (
      <div className={styles.container}>

        <div className={styles.title}>
          <h2>Give Oblik A Test Run</h2>
          <p>
            Go ahead enter some keywords of a topic that interests you!!
          </p>

        </div>

        <form id="form" className={styles.form} onSubmit={this.handleSubmit}>
          <input type="text" id="inputText" placeholder="search for a topic" />
          <input type="submit" id="submit" value="SUBMIT" />
        </form>

        <div className={styles.chart}>
          <C3Chart data={this.state.data} style={{width: 500, height: 400}} />

          <div className={styles.urlButtons}>
            <button className={styles.button} onClick={this.handleArticleUrl}>Left</button>
            <button className={styles.button} onClick={this.handleArticleUrl}>Center-Left</button>
            <button className={styles.button} onClick={this.handleArticleUrl}>Center</button>
            <button className={styles.button} onClick={this.handleArticleUrl}>Center-Right</button>
            <button className={styles.button} onClick={this.handleArticleUrl}>Right</button>
            <ArticleUrls urls={urlsToShow} title={this.state.showUrls} />
          </div>

        </div>
      </div>
    )
  }

}



export default How;