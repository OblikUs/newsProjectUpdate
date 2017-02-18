const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;
const request = require('request');
const cron = require('node-cron');


app.use(bodyParser.urlencoded({extended:true}))


let url = [
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
           "https://newsapi.org/v1/articles?source=fox-sports&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=hacker-news&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=ign&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=independent&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=mirror&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=mashable&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=mtv-news&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=national-geographic&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=new-scientist&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=newsweek&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=new-york-magazine&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=nfl-news&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=recode&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=reddit-r-all&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=reuters&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=sky-news&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=techcrunch&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=techradar&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=the-economist&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=the-guardian-au&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=the-guardian-uk&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=the-huffington-post&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=the-lad-bible&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=the-new-york-times&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=the-telegraph&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=the-wall-street-journal&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=the-washington-post&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=time&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           "https://newsapi.org/v1/articles?source=usa-today&sortBy=top&apiKey=9f3b3102ab704b7c9a874ee92cdb288f",
           ]

// cron.schedule('43,44 19 * * *', () => {

  for(var i = 0; i < url.length; i++) {
    request(url[i], (error, response, body) => {
      console.log('response.statuscode: ', response.statusCode);
      console.log('json.parse(body): ', JSON.parse(body));
      if(!error && response.statusCode === 200) {
        //push data to database after done
      }
    });
  }
// })




app.listen(PORT, () =>{
  console.log("Server started on " + PORT);
})


