var express = require('express')
var router = express.Router()

var friends = require("../data/friends.js").friends;

router.get("/friends", function(req, res) {
	res.json(friends);
});

router.post("/friends", function(req, res) {
	var userScores = req.body.scores;
	var minDifference;
	var closestMatch;
	friends.forEach(function(friend) {
		let difference = 0;
		let friendScores = friend.scores;
		for (let i = 0; i < friendScores.length; i++) {
			difference += Math.abs(friendScores[i] - userScores[i]);
		}
		if (!minDifference || minDifference > difference) {
			minDifference = difference;
			closestMatch = friend;
		}
		// console.log("Friend: " + friend.name);
		// console.log("Difference: " + difference);
	})
	res.send(closestMatch);
});

module.exports = router