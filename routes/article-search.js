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
      let seen = {};
      result = JSON.stringify(result)
      result = JSON.parse(result)
      results = result.body.results[0].data.map( article => {
        return article.row
      }).filter( article => {
        let url = article[0].url
        if(seen[url]) {
          return;
        } else {
          seen[url] = true;
          return article;
        }
      })

      console.log(results);

      let Left_Articles = results.filter(article => article[0].view === 'left');

      let Center_Left_Articles = results.filter(article => article[0].view === 'center-left')

      let Center_Articles = results.filter(article => article[0].view === 'center')

      let Center_Right_Articles = results.filter(article => article[0].view === 'center-right')

      let Right_Articles = results.filter(article => article[0].view === 'right')

      let graphDataPayload = {
        data: {
          columns: [
            ['left', Left_Articles.length ],
            ['center-left', Center_Left_Articles.length],
            ['center', Center_Articles.length],
            ['center-right', Center_Right_Articles.length],
            ['right', Right_Articles.length]
          ]
        },
        allUrls: {
          'left-titles': Left_Articles.map(article => article[0].title),
          'left-urls': Left_Articles.map(article => article[0].url),

          'center-left-titles': Center_Left_Articles.map(article => article[0].title),
          'center-left-urls': Center_Left_Articles.map(article => article[0].url),

          'center-titles': Center_Articles.map(article => article[0].title),
          'center-urls': Center_Articles.map(article => article[0].url),

          'center-right-titles': Center_Right_Articles.map(article => article[0].title),
          'center-right-urls': Center_Right_Articles.map(article => article[0].url),

          'right-titles': Right_Articles.map(article => article[0].title),
          'right-urls': Right_Articles.map(article => article[0].url)
        }
      }
      callback(graphDataPayload)
    })

}

router.route('/')
  .post((req,res) => {
      let keywords = md.keywordGenerator(req.body.search)
      keywords = keywords.map(word => {
        return `"${word}"`;
    }).join(', ')
      let retrieveQuery = `MATCH p=(n:Article)-[r:HAS_KEYWORD]->(k:Keyword)
      WHERE k.word IN [${keywords}] RETURN n, count(p) ORDER BY count(p) DESC`
      findArticles(retrieveQuery, (graphDataPayload) => {
        console.log(graphDataPayload);
        res.send(graphDataPayload)
      })

  })






module.exports = router;