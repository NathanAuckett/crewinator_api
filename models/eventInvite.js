const connection = require('../dbConnect');
const mysql = require('mysql2');

function EventInvite(eventID, userID) {
    this.event_id = eventID;
    this.user_id = userID;
    this.status = "pending";
    this.invite_date = new Date();
}

function createEventInvite(req, res){
    const event_id = req.event_id;
    const user_id = req.user_id;

    const invite = new EventInvite(event_id, user_id);

    const sql = mysql.format(`INSERT INTO event_invites SET ?`, invite);
    connection.query(sql,  (err, result) => { //Create friend within DB
        if (err) throw err;
        res.send({result: 200, data: result});
    });
}

function setEventInviteStatus(req, res){
    const sql = mysql.format(`
        UPDATE event_invites SET ? WHERE event_invite_id = ?`, [{'status': req.status}, req.event_invite_id]);

    console.log(sql);
    
    connection.query(sql,  (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send({result: 200, data: result});
    });
}

function getPendingEventsByUserID(req, res){
    const sql = mysql.format(`
        SELECT events.*, event_invites.event_invite_id, users.username
        FROM events LEFT JOIN event_invites ON 1=1, users
        WHERE events.start_date_time >= UTC_TIMESTAMP()
        AND event_invites.user_id = ? AND event_invites.event_id = events.event_id AND event_invites.status = 'pending'
        AND users.user_id = events.creator_user_id
        ORDER BY events.start_date_time`,
    [req.query.user_id]);

    connection.query(sql,  (err, result) => {
        if (err) { console.log(err); }
        else{
            res.send({result: 200, data: result});
        }
    });
}

module.exports = {
    createEventInvite,
    setEventInviteStatus,
    getPendingEventsByUserID
}