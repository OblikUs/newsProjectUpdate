import React from 'react';
import styles from './How.scss';
import C3Chart from 'react-c3js';

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
        ['right', 50]
      ],
      types: {
        left: 'bar',
        'center-left': 'bar',
        center: 'bar',
        'center-right': 'bar',
        right: 'bar'
      }
    },
    style: {
      bar: {
        width: {
          ratio: 0.2
        }
      }
    }

  }

   this.handleSubmit = this.handleSubmit.bind(this);
   this.getData = this.getData.bind(this);
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




  render() {
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>How Oblik Works</h2>
        </div>
        <form id="form" className={styles.form} onSubmit={this.handleSubmit}>
          <input type="text" id="inputText" />
          <input type="submit" value="SUBMIT" />
        </form>
        <C3Chart data={this.state.data} style={this.state.style} />
      </div>
    )
  }

}



export default How;