Write how to configure SSL

# Oblik.US

## Getting Started
- Fork and clone this repository
- Run `npm install`
- Start a Neo4j database and modify the `neo4jAuth.config.example.js file` to have your credentials, rename that file to `neo4jAuth.config.js`
- Create an directory named `ssl`
- Generate a self-signed certificate and add the files to the `ssl` directory
  - [this blog post explains how to generate an self-signed certificate](https://matoski.com/article/node-express-generate-ssl/)
- Run `npm start`.
- Going to the Neo4j browser app (default http://localhost:7474/browser/) and runing the query `MATCH (n:Article) RETUN n` should result in 300+ articles. Nodes with the label `Article` have `:HAS_KEYWORD` relationships to nodes with the label `Keyword`.
- Go to the chrome extension's repository and follow the `Getting Started` instructions on the README.md file.
  - [chrome extension](https://github.com/OblikUs/chrome_extension)