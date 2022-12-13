const Models = require('../models/index');

function createGameUser(req, res){
    Models.GameUser.createGameUser(req, res);
}

function getGamesByUserID(req, res){
    Models.GameUser.getGamesByUserID(req, res);
}

module.exports = {
    createGameUser,
    getGamesByUserID
}