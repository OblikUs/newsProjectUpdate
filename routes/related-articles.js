const express = require('express');
const router = express.Router();
const Metascraper = require('metascraper');
const md = require('../data/modifyData');
const usernameAndPwd = require('../neo4jAuth.config')
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
          console.log(metadata.url);
          if(metadata.title === null && metadata.description === null) {
            return;
          }
          let keywords = md.keywordGenerator(metadata.title, metadata.description)
          keywords = keywords.map(word => {
            return `"${word}"`;
        }).join(', ')
          let source = [];
          if(metadata.url !== null) {
            source = md.sourceFinder(metadata.url)
          }
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