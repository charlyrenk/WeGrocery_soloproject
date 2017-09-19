var express = require('express');

var router = express.Router();
var Grocery = require('../models/grocery.schema.js')
var User = require('../models/user.js')

router.get('/', function (req, res) {


    Grocery.find({}, function (err, data) {
        if (err) {
            console.log('find error: ', err);
            res.sendStatus(500);
        } else {
            console.log('found Friends Grocery data: ', data);
            res.send(data);
        }
    });

})

module.exports = router;