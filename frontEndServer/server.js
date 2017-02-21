const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const MetaInspector = require('meta-scrape');
const https = require('https');
const fs = require('fs');

app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
}))

app.set('view engine', '.hbs');

app.set('views', 'views')

app.use(express.static('public'));

app.use(bodyParser.json({
  extended:true
}));

app.get('/', (req, res) => {
  res.render('index');
})

app.post('/', (req,res) => {
  let client = new MetaInspector(req.body.url, {});

  client.on("fetch", function(){
    console.log("keywords: " + client.keywords);
  });

  client.on("error", function(err){
    console.log(err);
  });

  client.fetch();

})

let secureServer = https.createServer({
    key: fs.readFileSync('./ssl/server.key'),
    cert: fs.readFileSync('./ssl/server.crt'),
    ca: fs.readFileSync('./ssl/ca.crt'),
    requestCert: true,
    rejectUnauthorized: false
}, app).listen('8080', function() {
    console.log("Secure Express server listening on port 8080");
});


module.exports = app;