const express = require('express');
const router = express.Router();
const Metascraper = require('metascraper');
const md = require('../data/modifyData');
const usernameAndPwd = new Buffer("neo4j:c15finalP").toString('base64');
const r = require("request");
const neo4jUrl = "http://localhost:7474/db/data/transaction/commit";
const authUrl = "http://localhost:7474/user/neo4j";

function findArticles(query, req, res) {
  r.post({
    uri:neo4jUrl,
    headers:{Authorization: usernameAndPwd},
    json:{statements:[{statement:query, resultDataContents:[ "row", "graph"]}]}},
    function(err, result) {
      result = JSON.stringify(result)
      result = JSON.parse(result)
      results = result.body.results[0].data.map( article => {
        return article.row
      })
      res.send(results)
    })
}

  router.route('/')
    .post((req,res) => {
      Metascraper
        .scrapeUrl(req.body.url)
        .then(metadata => {
          console.log('metadata.title: ', metadata.title);
          let keywords = md.keywordGenerator(metadata.title, metadata.description)
          console.log('keywords: ', keywords);
          keywords = keywords.map(word => {
            return `"${word}"`;
        }).join(', ')
          let source = md.sourceFinder(metadata.url)
          if(source.length === 0) {
            source = [{source: 'unknown', name: 'unknown', view: 'n/a'}]
          }
          let retrieveQuery = `MATCH p=(n:Article)-[r:HAS_KEYWORD]->(k:Keyword)
          WHERE k.word IN [${keywords}] RETURN n, count(p) ORDER BY count(p) DESC`
          findArticles(retrieveQuery, req, res)
        })
        .catch(error => {
          console.log(error);
        });

  })

module.exports = router;