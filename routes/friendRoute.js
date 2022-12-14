const express = require("express");
const router = express.Router();
const Controllers = require('../controllers');

router.post("/create", (req, res) => {
  Controllers.FriendController.createFriend(req.body, res);
});

router.get("/from-user-id", (req, res) => {
    Controllers.FriendController.getFriendsByUserID(req, res);
});

module.exports = router;
