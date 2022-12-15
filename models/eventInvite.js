const connection = require('../dbConnect');
const mysql = require('mysql2');

function EventInvite(eventID, userID) {
    this.event_id = eventID;
    this.user_id = userID;
    this.status = "pending";
    this.request_date = new Date();
}

function createEventInvite(req, res){
    const event_id = req.event_id;
    const user_id1 = req.user_id;

    const invite = new EventInvite(event_id, user_id1);

    const sql = mysql.format(`INSERT INTO event_invites SET ?`, invite);
    connection.query(sql,  (err, result) => { //Create friend within DB
        if (err) throw err;
        res.send({result: 200, data: result});
    });
}

function getFriendsByUserID(req, res){
    const sql = mysql.format(`
        SELECT users.user_id, users.username
        FROM users, friends
        
        WHERE status = 'accepted'
        AND
        ((friends.user_id1 = ?
        AND users.user_id = friends.user_id2)
        OR
        (friends.user_id2 = ?
        AND users.user_id = friends.user_id1))`,
    [req.query.user_id, req.query.user_id]);
    
    console.log(sql);

    connection.query(sql,  (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send({result: 200, data: result});
    });
}

function getPendingFriendsByUserID(req, res){
    const sql = mysql.format(`
        SELECT users.user_id, users.username, friends.friend_id
        FROM users, friends
        
        WHERE status = 'pending'
        AND
        friends.user_id2 = ?
        AND users.user_id = friends.user_id1`,
    [req.query.user_id]);

    connection.query(sql,  (err, result) => {
        if (err) throw err;
        res.send({result: 200, data: result});
    });
}

function setFriendshipStatus(req, res){
    const sql = mysql.format(`
        UPDATE friends SET ? WHERE friend_id = ?`, [{'status': req.status}, req.id]);

    console.log(sql);
    
    connection.query(sql,  (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send({result: 200, data: result});
    });
}

module.exports = {
    Friend,
    createFriend,
    getFriendsByUserID,
    getPendingFriendsByUserID,
    setFriendshipStatus
}