const bodyParser = require('body-parser');
const neo4jUrl = "http://localhost:7474/db/data/transaction/commit";
const authUrl = "http://localhost:7474/user/neo4j";
const cron = require('node-cron');
const got = require('got');
const r = require("request");
const md = require('./modifyData')
const usernameAndPwd = require('../neo4jAuth.config')
const cheerio = require('cheerio');
const Metascraper = require('metascraper');
const Promise = require('bluebird');

module.exports = function() {

  let json = {};
  let urlsToScrape;

  function get_blazeNewsUrls () {
    r('http://www.theblaze.com/news', function (error, response, html) {
      let blazeUrls = [];
      if (!error && response.statusCode == 200) {
        let $ = cheerio.load(html);

        let url = $('.main-content').children().children().find('.feed-link');

        for(var i = 0; i < url.length; i++) {
          let newUrl = "http://www.theblaze.com" + url[i].attribs.href;
          blazeUrls.push(newUrl);
        }
        urlsToScrape = blazeUrls;
        get_breitbartNewsUrls()
      }
    });
  }

  function get_breitbartNewsUrls () {
    r('http://www.breitbart.com/big-government/', function (error, response, html) {
      let breitbartUrls = [];
      if (!error && response.statusCode == 200) {
        let $ = cheerio.load(html);

        let urls = $('.article-list').children().children().map((i, url) => {
          if(url.attribs.href !== undefined) {
            breitbartUrls.push(url.attribs.href)
          }
        })
        urlsToScrape = urlsToScrape.concat(breitbartUrls)
        scrapeUrls(urlsToScrape)
      }
    });
  }

  function scrapeUrls (arr) {
    Promise.map(arr, (blazeArr) => {
      return Metascraper
        .scrapeUrl(blazeArr)
        .then((metadata) => {
          let keywords = md.keywordGenerator(metadata.title, metadata.description)
          return md.newData(metadata.title, metadata.publisher, 'right', metadata.url, keywords, metadata.date, metadata.image)
        })
    })
    .then(parsedData => {
      json.data = json.data.concat(parsedData)
      console.log('I did it');
      cypher(articleQuery, {json:json}, function(err, result) { console.log(err, JSON.stringify(result))})
    })
  }

  function cypher(query, params, cb) {
    r.post({
      uri:neo4jUrl,
      headers:{Authorization: usernameAndPwd},
      json:{statements:[{statement:query, parameters:params }]}},
      function(err,res) {
        if(err) {
          console.log(err);
        }
        cb(err,res.body)
      })
  }

  let articleQuery = `
  WITH {json} AS data
  UNWIND data.data as x
  MERGE (article:Article {title: x.title}) ON CREATE
    SET article.source = x.source, article.url = x.url, article.view = x.view, article.publishedAt = x.date, article.image = x.image

  FOREACH (keywordWord IN x.keywords | MERGE (keyword:Keyword {word: keywordWord}) MERGE (article)-[:HAS_KEYWORD]->(keyword))
  `;


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
    .map((article) => {
      if(article.description === null) {
        article.description = '';
      }
      let keywords = md.keywordGenerator(article.title, article.description)
      let source = md.sourceFinder(article.url);
      if(source.length === 0) {
        source = [{source: article.author, name: 'unknown', view: 'n/a'}]
      }
      return md.newData(article.title, source[0].name, source[0].view, article.url, keywords, article.publishedAt, article.urlToImage)
    })
    .then((newsApiData) => {
      json['data'] = newsApiData
      get_blazeNewsUrls();
    })
    .catch(error => {
      console.log(error);
    });

}




