var express = require('express');

var router = express.Router();
var Grocery = require('../models/grocery.schema.js')
var User = require('../models/user.js')
router.get('/allUsers', function (req, res) {
    if (req.isAuthenticated()) {
        let friendsList = req.user.friendsList
        let friendIdList = []
        for (var i = 0; i < friendsList.length; i ++){
            friendIdList.push(friendsList[i].id)
        }
        friendIdList.push(req.user._id)
        User.find({_id: { "$nin": friendIdList } }, function (err, data) {
            if (err) {
                console.log('find error: ', err);
                res.sendStatus(500);
            } else {
                console.log('found data: ', data);
                res.send(data);
            }
        });
    }
})

router.get('/allRequests', function (req, res) {
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

router.post('/sendRequest', function (req, res) {
    var userToAddId = req.body.userToAdd.user_id
    var userToAdd = req.body.userToAdd
    var currentUser = req.body.currentUser
    var currentUserId = req.body.currentUser.id

    console.log('Friend post initiated:', userToAddId, currentUser)
    User.findByIdAndUpdate(userToAddId, {
            $push: {
                pendingFriendRequests: currentUser
            }
        },
        function (err, data) {
            if (err) {
                console.log('update error: ', err);

                res.sendStatus(500);
            } else {
                console.log("userToAdd found")
            }
        }
    )

})

router.post('/acceptRequest', function (req, res) {
    var userToAdd = req.body.userToAdd
    var otherUserId = req.body.userToAdd.id
    var currentUser = req.body.currentUser
    var currentUserId = req.body.currentUser.id
    var allRequestsObject = req.body.allRequestsObject

    console.log('Friend post initiated:', userToAdd, currentUserId)

    // User.findByIdAndUpdate(currentUserId, {
    //     $set: userToAdd

    // })
    User.findById(currentUserId, function (err, user) {
        if (err) return handleError(err);

        //console.log('Basket Index server: ', user.basket[basketIndex].quantity)
        user.pendingFriendRequests = allRequestsObject //$inc
        user.save(function (err) {
            if (err) {
                return handleError(err)
            };
        });
    });



    User.findByIdAndUpdate(currentUserId, {
            $push: {
                friendsList: {
                    id: otherUserId,
                    userName: userToAdd.userName
                }
            }
        },
        function (err, data) {
            if (err) {
                console.log('update error: ', err);

                res.sendStatus(500);
            }
        }
    )

    User.findByIdAndUpdate(otherUserId, {
            $push: {
                friendsList: {
                    id: currentUserId,
                    userName: currentUser.userName
                }
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