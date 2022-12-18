const connection = require('../dbConnect');
const mysql = require('mysql2');

const Invite = require('./eventInvite');

function Event(title, eventDate, creatorID, imageURL) {
    this.title = title;
    this.start_date_time = eventDate;
    this.creator_user_id = creatorID;
    this.image_url = imageURL || "";
    this.creation_date = new Date();
    this.last_update = new Date();
}

function createEvent(req, res){
    try {
        console.log(req);
        const event = new Event(req.title, new Date(req.start_date_time), req.creator_user_id, req.image_url);

        const sql = mysql.format(`INSERT INTO events SET ?`, event);

        connection.query(sql,  (err, result) => {
            if (err) { console.log(err); }
            else{
                console.log(result);
                const event_id = result.insertId;

                const friends = req.friends;
                if (friends !== null){
                    for (friend of friends){
                        console.log(friend);
                        let invite = new Invite.EventInvite(event_id, friend.user_id);

                        const sql = mysql.format(`INSERT INTO event_invites SET ?`, invite);
                        connection.query(sql,  (err, result) => { //Create friend within DB
                            if (err) { console.log(err); }
                            else{
                                console.log(result);
                            }
                        });
                    }
                }

                res.status(200).json(result);
            }
        });
    }
    catch (err){
        res.status(500).send('Server error! Request failed!');
        console.log(err);
    }
}

function getByMonth(req, res){
    try {
        const sql = mysql.format(`
            SELECT events.event_id, events.title, events.start_date_time
            FROM events LEFT JOIN event_invites ON 1=1
            WHERE 
                (
                    MONTH(events.start_date_time) = ? OR MONTHNAME(start_date_time) = ?
                )
                AND (
                    (events.creator_user_id = ?)
                    OR
                    (event_invites.user_id = ? AND event_invites.event_id = events.event_id AND event_invites.status = 'accepted')
                )
            GROUP BY events.event_id, events.title, events.start_date_time
            ORDER BY events.start_date_time`,
        [req.query.month, req.query.month, req.query.user_id, req.query.user_id]);

        connection.query(sql,  (err, result) => {
            if (err) { console.log(err); }
            else{
                res.status(200).json(result);
            }
        });
    }
    catch (err){
        res.status(500).send('Server error! Request failed!');
        console.log(err);
    }
}

function deleteEvent(req, res){
    try {
        const sql = mysql.format(`DELETE FROM events WHERE event_id = ?`, [req.query.event_id]);

        connection.query(sql,  (err, result) => {
            if (err) { console.log(err); }
            else{
                res.status(200).json(result);
            }
        });
    }
    catch (err){
        res.status(500).send('Server error! Request failed!');
        console.log(err);
    }
}

function getFuture(req, res){
    try {
        const sql = mysql.format(`
            SELECT events.event_id, events.title, events.start_date_time, events.image_url
            FROM events LEFT JOIN event_invites ON 1=1
            WHERE events.start_date_time >= UTC_TIMESTAMP()
            AND (
                (events.creator_user_id = ?)
                OR
                (event_invites.user_id = ? AND event_invites.event_id = events.event_id AND event_invites.status = 'accepted')
            )
            GROUP BY events.event_id, events.title, events.start_date_time, events.image_url
            ORDER BY events.start_date_time
            `,
            
        [req.query.user_id, req.query.user_id]);

        connection.query(sql, (err, result) => {
            if (err) { console.log(err); }
            else{
                res.status(200).json(result);
            }
        });
    }
    catch (err){
        res.status(500).send('Server error! Request failed!');
        console.log(err);
    }
}

function getAll(res){
    try {
        connection.query("SELECT * FROM events ORDER BY start_date_time", (err, result) => {
            if (err) { console.log(err); }
            else{
                //res.send({result: 200, data: result});
                res.status(200).json(result);
            }
        });
    }
    catch (err){
        res.status(500).send('Server error! Request failed!');
        console.log(err);
    }
}

module.exports = {
    createEvent,
    getAll,
    getByMonth,
    getFuture,
    deleteEvent
}