/*takes popflash match urls and does magic with them*/
const request = require('request-promise-native');
const tabletojson = require('tabletojson');
const cheerio = require('cheerio');


let parsedMatchData = {
  matchUrl: '',
  team1: {
    'score': {
    },
  },
  team2: {
    'score': {
    },
  },
}

exports.getMatchData  = async (url) => {
  //json object for later use
  const options = {
    uri: url,
  };
  try {
    await request(options).then(response => {
      //Put match data into json
      const parsedHTML = cheerio.load(response)
      parsedPlayerData = tabletojson.convert(response, { ignoreColumns: [2, 4, 5, 7, 8, 9, 10, 11] })
      //Splicing away first cells. They contain no useful data
      parsedPlayerData[0].splice(0, 1);
      parsedPlayerData[1].splice(0, 1);
      //Yeah, this is horrible
      parsedMatchData.team1.players = parsedPlayerData[0];
      parsedMatchData.team2.players = parsedPlayerData[1];
      parsedMatchData.team1.score = parseInt(parsedHTML('.score-1').text().trim());
      parsedMatchData.team2.score = parseInt(parsedHTML('.score-2').text().trim());
      parsedMatchData.matchUrl = url;
    });
    console.log(parsedMatchData.team1.players);
    return parsedMatchData;
  } catch (err) {
    console.log(err);
    return `fak (c) gob b`;
  }
}






const checkUrl = () => {
  return parsedMatchData.matchUrl;
}
//Names to beautiful format, dunno how to use replacer to get rid of keys in JSON
exports.prettyprintNames = (JSONarray) => {
  playerNames = [];
  JSONarray.forEach(element => {
    playerNames.push(element['0']);
  });
    return `Pelaajat: ${playerNames.join(', ')}`
}

/*
sorttausfunktio
field, string = json avain
reverse, true/false
primer, parseInt, toUpperCase()
ESIM: team1.sort(sort_by('1', true, parseInt));
https://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects
*/
const sort_by = function (field, reverse, primer) {

  var key = primer ?
    function (x) { return primer(x[field]) } :
    function (x) { return x[field] };

  reverse = !reverse ? 1 : -1;

  return function (a, b) {
    return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
  }
}

