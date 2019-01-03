exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "popflashid",
  category: "Miscelaneous",
  description: "Assosioi popflash id discord tunnuksesi kanssa.",
  usage: "popflashid <popflashid>"
};

const player = require ('../modules/player');

const data = {
    username: '',
    popflashId: '',
    elo:''
}
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  data.username = message.author.username
  data.popflashId = args[0]
  data.elo = 1000;
  player.createNewPlayer(data);
};
  
