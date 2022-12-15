const Models = require('../models/index');

function createEvent(req, res){
    Models.Event.createEvent(req, res);
}

function getEvents(res){
    Models.Event.getAll(res);
}

function getByMonth(req, res){
    Models.Event.getByMonth(req, res);
}

function getFuture(req, res){
    Models.Event.getFuture(req, res);
}

module.exports = {
    createEvent,
    getEvents,
    getByMonth,
    getFuture
}