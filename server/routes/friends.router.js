var express = require('express');

var router = express.Router();
var Grocery = require('../models/grocery.schema.js')
var User = require('../models/user.js')
router.get('/allUsers', function (req, res) {
    User.find({}, function (err, data) {
        if (err) {
            console.log('find error: ', err);
            res.sendStatus(500);
        } else {
            console.log('found data: ', data);
            res.send(data);
        }
    });
})

router.post('/', function (req, res) {
    var userToAdd = req.body.userToAdd
    var currentUser = req.body.currentUser
    console.log('Friend post initiated:', userToAdd, currentUser)
    User.findByIdAndUpdate(userToAdd, {
            $push: {
                pendingFriendRequests: currentUser
            }
        },
        function (err, data) {
            if (err) {
                console.log('update error: ', err);

                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    )
})
module.exports = router;