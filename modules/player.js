const playerController = require ('../database/controller');

exports.createNewPlayer = (data) => {
    playerController.createPlayer(data);
}

exports.updatePlayerElo = (data) => {
    playerController.updatePlayerElo(data);
}