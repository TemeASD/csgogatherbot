const PlayerSchema = require('./model.js');

exports.createPlayer = (data) => {
	const player = new PlayerSchema({
		username: data.username,
		popflashId: data.popflashId,
		elo: data.elo,
    });
    console.log(player);
	player.save()
};