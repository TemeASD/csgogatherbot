const player = require('./model.js');

exports.createPlayer = (data) => {
	const newPlayer = new player({
		username: data.username,
		popflashId: data.popflashId,
		elo: data.elo,
    });
    console.log(newPlayer);
	newPlayer.save()
};

exports.getPlayer = (id) => {
	player.findById(id)
		.then(data => {
			return data;
		}).catch(err => {
			return err; 
		});
};

exports.updatePlayerElo = (data) => {
	player.findOneAndUpdate({username: data.username}, {$set:{elo:data.elo}}, {new: true}, (err, doc) => {
		if (err) {
			console.log("Something wrong when updating data!");
		}
		console.log(doc);
	});
}