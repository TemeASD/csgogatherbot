exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "matchresult",
  category: "Miscelaneous",
  description: "fak.",
  usage: "!matchresult `url`"
};


var request = require('request-promise-native');
const tabletojson = require('tabletojson');
const cheerio = require('cheerio');

exports.run = async (client, message, args, level) => {
  console.log('y')
  let url = message.content.split(" ");
  if (url[1] === undefined) { return message.channel.send(`Anna popflash match url`) }
  await getMatchDatatoArray(url[1]).then(data => {
      if(data.team1.score > data.team2.score) {
        message.channel.send('Tiimi 1 voitti.')
        message.channel.send(prettyprintNames(data.team1.players));
      } else {
        message.channel.send('Tiimi 2 voitti.')
        message.channel.send(prettyprintNames(data.team2.players));
      }
  })
}

//Names to beautiful format, dunno how to use replacer to get rid of keys in JSON
const prettyprintNames = function (JSONarray) {
    return(`Pelaajat: ${JSONarray[0]['0']}, ${JSONarray[1]['0']}, ${JSONarray[2]['0']}, ${JSONarray[3]['0']}, ${JSONarray[4]['0']}`)
}
/*sorttausfunktio
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

const getMatchDatatoArray = async (url) => {
  //json object for later use
  let parsedMatchData = {
    team1: {
      'score': {
      },
    },
    team2: {
      'score': {
      },
    },
  }

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
    });
    return parsedMatchData;
  } catch (err) {
    console.log(err);
    return `fak (c) gob b`;
  }
}