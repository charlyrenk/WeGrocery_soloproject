var mongoose = require('mongoose');
var friends = require("mongoose-friends")
var Schema = mongoose.Schema;

var friendsSchema = new Schema({
    friends_list: {type: Array},
    username: {type: String},
    user_id: {type: String}


},
{
    collection: 'friends'
}
);
module.exports = mongoose.model('friends', grocerySchema);