var express = require('express');

var router = express.Router();
var User = require('../models/user.js');

var Grocery = require('../models/grocery.schema.js')

//to send new grocery list to database
router.post('/', function (req, res) {
    console.log('new grocery list to add: ', req.body);

    var newGroceryList;
    // fields that rent and sale have in commmon
    var groceryListObject = {
        listName: req.body.listName,
        newGroceryList: req.body.newGroceryList,
        itemStatus: req.body.itemStatus,
        username: req.body.user.userName,
        user_id: req.body.user.id
    };
    newGroceryList = new Grocery(groceryListObject)
    // save to the selected schema
    newGroceryList.save(function (err, data) {
        if (err) {
            console.log('save error: ', err);
            res.sendStatus(500);
        } else {
            console.log('saved data: ', data);
            res.sendStatus(201);
        }
    });

});

router.get('/', function (req, res) {
    // if(req.isAuthenticated()) {
    // send back user object from database
    // console.log('logged in', req.user);
    //user_id: req.user.user_id
    Grocery.find({}, function (err, data) {
        if (err) {
            console.log('find error: ', err);
            res.sendStatus(500);
        } else {
            console.log('found data: ', data);
            res.send(data);
        }
    });
    //   } else {
    //     // failure best handled on the server. do redirect here.
    //     console.log('not logged in');
    //     // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    //     res.send(false);
    //   }
})

router.put('/', function (req, res) {
    var id = req.body.objectId
    var groceryListIndex = req.body.index
    console.log("recieved id: ", id)


    Grocery.findByIdAndUpdate(id, {
            $set: req.body.listObject

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
});

router.delete('/:id', function (req, res) {
    Grocery.findByIdAndRemove({
            _id: req.params.id
        },
        function (err, data) {
            if (err) {
                console.log('delete error: ', err);

                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});



// if (err) return handleError(err);
// var groceryListIndex = parseInt(req.body.index);
// console.log('grocery: ', grocery);
// console.log('index: ', groceryListIndex)
// console.log('grocery list to set: ', grocery.newGroceryList[groceryListIndex])
// // res.sendStatus(200);

// grocery.newGroceryList[groceryListIndex].itemStatus = req.body.item.itemStatus,
// grocery.newGroceryList[groceryListIndex].itemNotes = req.body.item.itemNotes,
// grocery.newGroceryList[groceryListIndex].itemQuantity = req.body.item.itemQuantity,
// grocery.newGroceryList[groceryListIndex].itemName = req.body.item.itemName

// grocery.set(grocery)

// console.log('grocery list set: ', grocery.newGroceryList[groceryListIndex])

// grocery.save(function (err) {
//     if (err) {
//         return handleError(err)
//     };
//     res.sendStatus(200);
// });




module.exports = router;