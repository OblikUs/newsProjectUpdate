const sources = require('./sources')

// FIX SKY.NEWS

module.exports = (() => {

  const sourceFinder = (url) => {
    url = url.split('http://').join('').split('.')
    if(url[0].substring(0, 8) === 'https://') {
      url[0] = url[0].substring(8)
    }
    url.map( (item, i) => {
      if( item.length === 1 || item === 'www' || item === 'uk' || item ==='co' || item ==='com' || item ==='us' || item === 'money' || item === 'https://www'|| item === 'rssfeeds') {
        url.splice(i, 1)
      }
    })
    return sources.filter( source => {
      if(source.source.search(url[0]) !== -1) {
        // console.log(source);
        return source
      }
    })
  }

  const keywordGenerator = (entities, tags) => {
    entities = entities.map( entity => { return entity.toLowerCase()});
    keywords = tags.filter( tag => {
      return entities.indexOf(tag) === -1
    }).concat(entities)
    return keywords
  }

  const newData = (title, source, view, url, keywords) => {
    return {
      title,
      source,
      view,
      url,
      keywords
    }
  }

  return {
    sourceFinder,
    keywordGenerator,
    newData
  }


})();