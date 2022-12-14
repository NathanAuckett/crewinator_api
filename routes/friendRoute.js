const express = require("express");
const router = express.Router();
const Controllers = require('../controllers');

router.post("/create", (req, res) => {
  Controllers.FriendController.createFriend(req.body, res);
});

router.put("/set-friendship-status", (req, res) => {
  Controllers.FriendController.setFriendshipStatus(req.body, res);
});

router.get("/from-user-id", (req, res) => {
    Controllers.FriendController.getFriendsByUserID(req, res);
});

router.get("/pending-from-user-id", (req, res) => {
  Controllers.FriendController.getPendingFriendsByUserID(req, res);
});

router.put("/set-friendship-status", (req, res) => {
  Controllers.FriendController.setFriendshipStatus(req.body, res);
});


module.exports = router;
