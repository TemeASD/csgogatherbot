const playerController = require ('../database/controller');

exports.createNewPlayer = (data) => {
    playerController.createPlayer(data);
}