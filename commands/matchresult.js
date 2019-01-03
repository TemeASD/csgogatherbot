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

const pfParser = require('../modules/popflashparser');

exports.run = async (client, message, args, level) => {
  let url = args[0];
  let team;
  if (url === undefined/*TODO check onko popflash url*/) { return message.channel.send(`Anna popflash match url`) }
  await pfParser.getMatchData(url).then(data => {
      if(data.team1.score > data.team2.score) {
        team = 'team1'
        message.channel.send('Tiimi 1 voitti.')
        message.channel.send(pfParser.showDetailedStats(team), {code:"asciidoc"});
      } else {
        team = 'team2'
        message.channel.send('Tiimi 2 voitti.')
        message.channel.send(pfParser.showDetailedStats(team), {code:"asciidoc"});
      }
  })
}
