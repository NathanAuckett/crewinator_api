const connection = require('../dbConnect');
const mysql = require('mysql2');

function Friend(userID1, userID2) {
    this.user_id1 = userID1;
    this.user_id2 = userID2;
    this.status = "pending";
    this.request_date = new Date();
}

function createFriend(req, res){
    try {
        const email = req.email;
        const user_id1 = req.user_id;

        const findUserSQL = mysql.format(`SELECT * FROM users WHERE email = ?`, [email]);
        connection.query(findUserSQL,  (err, result) => { //Search for user with email
            if (err) { console.log(err); }
            else{
                if (result.length > 0){
                    const user_id2 = result[0].id;

                    if (user_id1 !== user_id2){
                        const friend = new Friend(user_id1, user_id2);

                        const sql = mysql.format(`INSERT INTO friends SET ?`, friend);
                        connection.query(sql,  (err, result) => { //Create friend within DB
                            if (err) { console.log(err); }
                            else{
                                //res.send({result: 200, data: result});
                                res.status(200).json(result);
                            }
                        });
                    }
                    else{
                        //res.send({result: 400, data: 'You entered your own email!'});
                        res.status(400).send('You entered your own email!');
                    }
                }
                else{
                    //res.send({result: 400, data: 'No user found with that email!'});
                    res.status(400).send('No user found with that email!');
                }
            }
        });
    }
    catch (err){
        res.status(500).send('Server error! Request failed!');
        console.log(err);
    }
}

function getFriendsByUserID(req, res){
    try {
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

        connection.query(sql,  (err, result) => {
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

function getPendingFriendsByUserID(req, res){
    try {
        const sql = mysql.format(`
            SELECT users.user_id, users.username, friends.friend_id
            FROM users, friends
            
            WHERE status = 'pending'
            AND
            friends.user_id2 = ?
            AND users.user_id = friends.user_id1`,
        [req.query.user_id]);

        connection.query(sql,  (err, result) => {
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

function setFriendshipStatus(req, res){
    try {
        const sql = mysql.format(`
            UPDATE friends SET ? WHERE friend_id = ?`, [{'status': req.status}, req.id]);

        console.log(sql);
        
        connection.query(sql,  (err, result) => {
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
    createFriend,
    getFriendsByUserID,
    getPendingFriendsByUserID,
    setFriendshipStatus
}