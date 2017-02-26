const neo4jUrl = "http://localhost:7474/db/data/transaction/commit";
const authUrl = "http://localhost:7474/user/neo4j";
const r = require("request");
const md = require('./modifyData')
const conservative = require('./conservative')
const liberal = require('./liberal')
const usernameAndPwd = new Buffer("neo4j:c15finalP").toString('base64');

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

let orientationQuery = `
WITH {json} AS data
UNWIND data.data as x
MERGE (o:Orientation {name: x.orientation})

FOREACH (wordInArr IN x.words |
MERGE (w:Word {word: wordInArr, score: 0})
ON MATCH SET w.score = o.score + 1 )
MERGE (o)-[:HAS_WORD]->(w)
`;

let libWords = md.keywordGenerator(liberal);
let repWords = md.keywordGenerator(conservative)

let json = {
  data: [{
      orientation: 'liberal',
      words: []
    },
    {
      orientation: 'conservative',
      words: []
    }
  ]
}
json.data[0].words = libWords
json.data[1].words = repWords

cypher(orientationQuery, {json:json}, function(err, result) { console.log(err, JSON.stringify(result))})



