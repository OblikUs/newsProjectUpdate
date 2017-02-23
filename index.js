const bodyParser = require('body-parser');
const neo4j = require('neo4j-driver').v1;
const neo4jUrl = "http://localhost:7474/db/data/transaction/commit";
const authUrl = "http://localhost:7474/user/neo4j";
const cron = require('node-cron');
const got = require('got');
const r = require("request");
const md = require('./modifyData')
const usernameAndPwd = new Buffer("neo4j:c15finalP").toString('base64');
const Promise = require('bluebird');


function cypher(query, params, cb) {
  r.post({
    uri:neo4jUrl,
    headers:{Authorization: usernameAndPwd},
    json:{statements:[{statement:query, parameters:params }]}},
    function(err,res) {
      cb(err,res.body)
    })
}

let query = `
WITH {json} AS data
UNWIND data.data as x
MERGE (article:Article {title: x.title}) ON CREATE
  SET article.source = x.name, article.url = x.url, article.view = x.view

FOREACH (keywordWord IN x.keywords | MERGE (keyword:Keyword {word: keywordWord}) MERGE (article)-[:HAS_KEYWORD]->(keyword))
`;

let json = {data:[]};
// let data = [];

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

  // })
const apiKey = 'PRcyspm59vmsh7X8ue7NfZFzZz7op1oAfxsjsnCLMHQkRfnvUL';

Promise.map(urls, (topStoryUrl) => {
  return got(topStoryUrl)
  .catch(function ignore() {});
})
.map(response => {
  let article = JSON.parse(response.body).articles;
  return article
})
.reduce((prev, articles) => {
  return prev.concat(articles);
}, [])
.map((topStory) => {
  let encodedUrl = encodeURIComponent(topStory.url.trim());
  return got(
    'https://joanfihu-article-analysis-v1.p.mashape.com/link?' +
    'entity_description=False&' +
    `link=${encodedUrl}`,
    {
      headers: {
        "X-Mashape-Key": apiKey,
      },
      json: true
    }
  )
  .catch(function ignore() {});
}, {concurrency: 3})
.filter((NLPResult) => {
  return typeof NLPResult !== 'undefined';
})
.each((NLPResult) => {
  // console.log('NLPResult.body: ', NLPResult.body.link);
  let source = md.sourceFinder(NLPResult.body.link);
  if(source.length === 0) {
    if(NLPResult.body.author.length === 1) {
      source = [{source: NLPResult.body.author, name: NLPResult.body.author[0], view: 'n/a'}]
    } else {
      source = [{source: NLPResult.body.author, name: 'unknown', view: 'n/a'}]
    }
  }
  let keywords = md.keywordGenerator(NLPResult.body.entities, NLPResult.body.tags)
  json.data.push(md.newData(NLPResult.body.title, source.name, source.view, NLPResult.body.link, keywords))
})
.then(() => {
  json = JSON.stringify(json);
  // data = JSON.stringify(data);
  json = (JSON.parse(json));
  cypher(query, {json:json}, function(err, result) { console.log(err, JSON.stringify(result))});
})
.catch(error => {
  console.log(error);
});



