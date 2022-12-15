const Models = require('../models/index');

function createEventInvite(req, res){
    Models.EventInvite.createEventInvite(req, res);
}

function setEventInviteStatus(req, res){
    Models.EventInvite.setEventInviteStatus(req, res);
}

function getPendingEventsByUserID(req, res){
    Models.EventInvite.getPendingEventsByUserID(req, res);
}

module.exports = {
    createEventInvite,
    setEventInviteStatus,
    getPendingEventsByUserID
}