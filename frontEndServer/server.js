const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Metascraper = require('metascraper');
const path = require('path');
const https = require('https');
const fs = require('fs');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const devConfig = require('./webpack.dev.config.js');
const popup = require('./routes/popup');
const md = require('../modifyData');
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

// Check to see what dev environment we are in
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 8080 : process.env.PORT;

//Body Parser
app.use(bodyParser.json({
  extended:true
}));

app.use('/api/popup', popup);

//Scraper that takes the URL
app.post('/', (req,res) => {

  Metascraper
    .scrapeUrl(req.body.url)
    .then(metadata => {
      let keywords = md.keywordGenerator(metadata.title, metadata.description)
      console.log('keywords: ', keywords);
      keywords = keywords.map(word => {
        return `"${word}"`;
      }).join(', ')
      let source = md.sourceFinder(metadata.url)
      if(source.length === 0) {
        source = [{source: article.author, name: 'unknown', view: 'n/a'}]
      }
      let retrieveQuery = `MATCH p=(n:Article)-[r:HAS_KEYWORD]->(k:Keyword)
      WHERE k.word IN [${keywords}] RETURN n, count(p) ORDER BY count(p) DESC`
      findArticles(retrieveQuery, req, res)

    });
});

if (isDeveloping) {
  app.set('host', 'http://localhost');
  const compiler = webpack(devConfig);
  const middleware = webpackMiddleware(compiler, {
    publicPath: devConfig.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  });
  const response = (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.resolve(__dirname, 'dist/index.html')));
    res.end();
  };

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  //put routes before here
  app.get('*', response);
} else {
  app.use(express.static(`${__dirname}/dist`));
  app.get('*', (req, res) => {
    res.write(
      fs.readFileSync(path.resolve(__dirname, 'dist/index.html'))
    );
    res.end();
  });
}

//SSL so that we can take URL from Https
let secureServer = https.createServer({
    key: fs.readFileSync('./frontEndServer/ssl/server.key'),
    cert: fs.readFileSync('./frontEndServer/ssl/server.crt'),
    ca: fs.readFileSync('./frontEndServer/ssl/ca.crt'),
    requestCert: true,
    rejectUnauthorized: false
}, app).listen('8080', function() {
    console.log("Secure Express server listening on port 8080");
});

module.exports = app;