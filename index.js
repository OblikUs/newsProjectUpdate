const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;
const cron = require('node-cron');
const got = require('got');

const Promise = require('bluebird');

app.use(bodyParser.urlencoded({extended:true}))

let urls = [
           "https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=abc-news-au&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=associated-press&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=bloomberg&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=business-insider&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=business-insider-uk&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=buzzfeed&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=daily-mail&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=engadget&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=entertainment-weekly&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=espn&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=fox-sports&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=hacker-news&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=ign&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=independent&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=mirror&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=mashable&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=mtv-news&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=national-geographic&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=new-scientist&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=newsweek&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=new-york-magazine&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=nfl-news&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=recode&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=reddit-r-all&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=reuters&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=sky-news&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=techcrunch&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=techradar&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=the-economist&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=the-guardian-au&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=the-guardian-uk&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=the-huffington-post&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=the-lad-bible&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=the-new-york-times&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=the-telegraph&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=the-wall-street-journal&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=the-washington-post&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=time&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           // "https://newsapi.org/v1/articles?source=usa-today&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           ]
while(urls.length > 0) {
  console.log('urls.length: ', urls.length);
  console.log('IN WHILE LOOP');
  let newsApiSourceUrls = urls.splice(0,3);

  // cron.schedule('43,44 19 * * *', () => {

  // })

  let sendToNewsApi = [];
  let newsApiStoryUrls = [];
  for(var i = 0; i < newsApiSourceUrls.length; i++) {
    sendToNewsApi.push(got(newsApiSourceUrls[i]));
  }
  Promise.map(sendToNewsApi, (x) => {
    return x.body;
  })
  .then(response => {
    for(var i = 0; i < response.length; i++) {
      let data = JSON.parse(response[i]);
      for(var j = 0; j < data.articles.length; j++) {
        let newUrls = encodeURIComponent(data.articles[j].url.trim());
        newsApiStoryUrls.push(newUrls);
      }
    }
  })
  .then(() => {
    let newFiles = [];
    for(var p = 0; p < newsApiStoryUrls.length; p++) {

      newFiles.push(got(`https://joanfihu-article-analysis-v1.p.mashape.com/link?entity_description=False&link=${newsApiStoryUrls[p]}`, {
                      headers: {
                        "X-Mashape-Key": "PRcyspm59vmsh7X8ue7NfZFzZz7op1oAfxsjsnCLMHQkRfnvUL",
                      },
                      json: true
                    }))
    }

    return Promise.map(newFiles, (t) => {
            return t.body;
          })
  })
    .then(response => {
      console.log('response: ', response);
      for(var h = 0; h <response.length; h++) {
        console.log('h: ', h);
      }
    })
    .catch(error => {
      console.log(error);
    })
    .catch(SyntaxError, (e) => {
      console.error('Invalid JSON');
    });
}






// app.listen(PORT, () =>{
//   console.log("Server started on " + PORT);
// })


