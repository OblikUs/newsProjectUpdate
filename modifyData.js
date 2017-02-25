const sources = require('./sources')
const stopWords = require('./stopWords')


module.exports = (() => {

  const sourceFinder = (url) => {
    url = url.replace(/\w+:\/\//, '');
    url = url.replace(/\/.*/, '')
    return sources.filter( source => {
      if(source.source === url) {
        return source
      }
    })
  }

  const keywordGenerator = (title, description) => {
    title = title.toLowerCase().split(' ');
    description  = description.toLowerCase().split(' ');
    return title.concat(description)
      .map( word => {
        word = word.replace(/\W/g, '')
        word = word.replace(/('s')/, '')
        return word
      })
      .filter( word => {
        return stopWords.indexOf(word) === -1 && word !== '';
      })
  }

  const newData = (title, source, view, url, keywords, date, image) => {
    return {
      title,
      source,
      view,
      url,
      keywords,
      date,
      image
    }
  }

  return {
    sourceFinder,
    keywordGenerator,
    newData,
  }


})();