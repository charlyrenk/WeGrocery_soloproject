var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var grocerySchema = new Schema({
    listName: {type: String},
    newGroceryList: {type: Object},
    itemStatus: {type: Boolean},
    username: {type: String},
    user_id: {type: String}
},
{
    collection: 'grocery_list'
}
);
module.exports = mongoose.model('grocery_list', grocerySchema);