const express = require('express');
const router = express.Router();
const md = require('../data/modifyData');
const usernameAndPwd = require('../neo4jAuth.config')
const r = require("request");
const neo4jUrl = "http://localhost:7474/db/data/transaction/commit";
const authUrl = "http://localhost:7474/user/neo4j";

function findArticles(query, callback) {
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
      let articleUrls = results.filter(article => article[0].url)
      let total_Left_Articles = results.filter(article => article[0].view === 'left').length
      let total_Center_Left_Articles = results.filter(article => article[0].view === 'center-left').length
      let total_Center_Articles = results.filter(article => article[0].view === 'center').length
      let total_Center_Right_Articles = results.filter(article => article[0].view === 'center-right').length
      let total_Right_Articles = results.filter(article => article[0].view === 'right').length

      let articleViews = {
        data: {
          columns: [
            ['left', total_Left_Articles ],
            ['center-left', total_Center_Left_Articles],
            ['center', total_Center_Articles],
            ['center-right', total_Center_Right_Articles],
            ['right', total_Right_Articles]
          ]
        }
      }
      callback(articleViews)
    })

}

router.route('/')
  .post((req,res) => {
      let keywords = md.keywordGenerator(req.body.search)
      keywords = keywords.map(word => {
        return `"${word}"`;
    }).join(', ')
      console.log('keywords: ', keywords);
      let retrieveQuery = `MATCH p=(n:Article)-[r:HAS_KEYWORD]->(k:Keyword)
      WHERE k.word IN [${keywords}] RETURN n, count(p) ORDER BY count(p) DESC`
      findArticles(retrieveQuery, (articlesGraphData) => {
        res.send(articlesGraphData)
      })

  })






module.exports = router;