const Models = require('../models/index');

function createFriend(req, res){
    Models.Friend.createFriend(req, res);
}

function getFriendsByUserID(req, res){
    Models.Friend.getFriendsByUserID(req, res);
}

module.exports = {
    createFriend,
    getFriendsByUserID
}