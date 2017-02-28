const express = require('express');
const router = express.Router();
const MetaInspector = require('meta-scrape');
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
      let client = new MetaInspector(req.body.url, {});

    client.on("fetch", function(){
      let keywords = md.keywordGenerator(client.title, client.description)
      keywords = keywords.map(word => {
        return `"${word}"`;
      }).join(', ')
      let source = md.sourceFinder(client.url)
      if(source.length === 0) {
        source = [{source: article.author, name: 'unknown', view: 'n/a'}]
      }
    let retrieveQuery = `MATCH p=(n:Article)-[r:HAS_KEYWORD]->(k:Keyword)
    WHERE k.word IN [${keywords}] RETURN n, count(p) ORDER BY count(p) DESC`
    findArticles(retrieveQuery, req, res)

    });

    client.on("error", function(err){
      console.log(err);
    });

    client.fetch();

  })

module.exports = router;