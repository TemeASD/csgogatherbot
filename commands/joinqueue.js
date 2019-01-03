
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "joinqueue",
    category: "Miscelaneous",
    description: "jonoo",
    usage: "!queue"
};

const queue = require('../modules/queue');

exports.run = async (client, message, args, level) => {
    if (queue.addToQueue(message.author)) {
        message.channel.send(`Lisätty, jonoon. Jonossa on ${queue.amountOfPlayers() }/10 pelaajaa`);
    } else {
        message.channel.send(`Olet jo jonossa. Jonossa on ${queue.amountOfPlayers() }/10 pelaajaa`);
    }
    if(queue.amountOfPlayers() === 1) {
        message.channel.send('Olet ensimmäinen pelaaja jonossa. URL on:')
        message.channel.send(`https://popflash.site/scrim/teemalobby`)
    }
};

