const sources = require('./sources')
const stopWords = require('./stopWords')

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
        return source
      }
    })
  }

  const keywordGenerator = (title, description) => {
    title = title.toLowerCase().split(' ');
    description  = description.toLowerCase().split(' ');
    let kws = title.filter( word => {
      return stopWords.indexOf(word) === -1
    }).concat(
      description.filter( word => {
        return stopWords.indexOf(word) === -1 && title.indexOf(word) === -1
      })
    ).map( word => {
      let punctuations = ['.', ',', "\'", "'", '?', '!', ':', ';', "\""]
      let splitW = word.split('').filter((letter, i) => {
        return punctuations.indexOf(letter) === -1
      })
      word = splitW.join('')
      return word

    })
    return kws
  }

  const newData = (title, source, view, url, keywords, date) => {
    return {
      title,
      source,
      view,
      url,
      keywords,
      date
    }
  }

  return {
    sourceFinder,
    keywordGenerator,
    newData,
  }


})();