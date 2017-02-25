const sources = require('./sources')
const stopWords = require('./stopWords')

// FIX SKY.NEWS

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
    // title = title.toLowerCase().split(' ');
    title = title.toLowerCase()
    title = title.replace( /[.,\/#!$%\^&\*;:{}=\_`~"'…|()?]/, '')
    return title;
    // description  = description.toLowerCase().split(' ');
    // let kws = title.filter( word => {
    //   return stopWords.indexOf(word) === -1
    // }).concat(
    //   description.filter( word => {
    //     return stopWords.indexOf(word) === -1 && title.indexOf(word) === -1
    //   })
    // ).map( word => {
    //   // word = word.replace( /[.,\/#!$%\^&\*;:{}=\_`~"'…|()?]/, "")
    //   word = word.replace( /\W/, "")
    //   word = word.replace(/('s')/, "")
    //   return word
    // }).filter(word => {
    //   return word !== ''
    // })
    // return kws
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