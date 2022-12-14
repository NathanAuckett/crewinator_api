const Models = require('../models/index');

function createFriend(req, res){
    Models.Friend.createFriend(req, res);
}

function getFriendsByUserID(req, res){
    Models.Friend.getFriendsByUserID(req, res);
}

function getPendingFriendsByUserID(req, res){
    Models.Friend.getPendingFriendsByUserID(req, res);
}

function setFriendshipStatus(req, res){
    Models.Friend.setFriendshipStatus(req, res);
}

module.exports = {
    createFriend,
    getFriendsByUserID,
    getPendingFriendsByUserID,
    setFriendshipStatus
}