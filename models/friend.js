const connection = require('../dbConnect');
const mysql = require('mysql2');

function Friend(userID1, userID2) {
    this.user_id1 = userID1;
    this.user_id2 = userID2;
    this.status = "pending";
    this.request_date = new Date();
}

function createFriend(req, res){
    const email = req.email;
    const user_id1 = req.user_id;

    const findUserSQL = mysql.format(`SELECT * FROM users WHERE email = ?`, [email]);
    connection.query(findUserSQL,  (err, result) => { //Search for user with email
        if (err) throw err;

        if (result.length > 0){
            const user_id2 = result[0].id;

            if (user_id1 != user_id2){
                const friend = new Friend(user_id1, user_id2);

                const sql = mysql.format(`INSERT INTO friends SET ?`, friend);
                connection.query(sql,  (err, result) => { //Create friend within DB
                    if (err) throw err;
                    res.send({result: 200, data: result});
                });
            }
            else{
                res.send({result: 400, data: 'You entered your own email!'});
            }
        }
        else{
            res.send({result: 400, data: 'No user found with that email!'});
        }
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
        UPDATE friends SET ? WHERE id = ?`, [{'status': req.status}, req.id]);

    console.log(sql);
    
    connection.query(sql,  (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send({result: 200, data: result});
    });
}

function getAll(res){
    connection.query("SELECT * FROM friends",  (err, result) => {
        if (err) throw err;
        res.send({result: 200, data: result});
    });
}

module.exports = {
    Friend,
    createFriend,
    getFriendsByUserID,
    getPendingFriendsByUserID,
    setFriendshipStatus,
    getAll,
}