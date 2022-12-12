const connection = require('../dbConnect');
const mysql = require('mysql2');

function Event(title, eventDate, creatorID, imageURL) {
    this.title = title;
    this.start_date_time = eventDate;
    this.creator_id = creatorID;
    this.image_url = imageURL || "";
    this.creation_date = new Date();
    this.last_update = new Date();
}

function createEvent(req, res){
    const event = new Event(req.title, new Date(req.start_date_time), req.creator_id, req.image_url);

    const sql = mysql.format(`INSERT INTO events SET ?`, event);
    console.log(event.start_date_time);
    console.log(event.creation_date);

    connection.query(sql,  (err, result) => {
        if (err) throw err;
        res.send({result: 200, data: result});
    });
}

function getByMonth(req, res){
    const sql = mysql.format(`SELECT * from events WHERE MONTH(start_date_time) = ? OR MONTHNAME(start_date_time) = ?`, [req.query.month, req.query.month]);

    connection.query(sql,  (err, result) => {
        if (err) throw err;
        res.send({result: 200, data: result});
    });
}

function getFuture(res){
    const sql = mysql.format(`SELECT * from events WHERE start_date_time >= UTC_TIMESTAMP() ORDER BY start_date_time`);

    console.log(sql);

    connection.query(sql, (err, result) => {
        if (err) throw err;
        //console.log(result.data[0].start_date_time);
        console.log(result);
        res.send({result: 200, data: result});
    });
}

function getAll(res){
    connection.query("SELECT * FROM events ORDER BY start_date_time", (err, result) => {
        if (err) throw err;
        res.send({result: 200, data: result});
    });
}

module.exports = {
    Event,
    createEvent,
    getAll,
    getByMonth,
    getFuture
}