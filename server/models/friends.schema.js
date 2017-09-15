var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var friendsSchema = new Schema({
    
},
{
    collection: 'grocery_list'
}
);
module.exports = mongoose.model('grocery_list', grocerySchema);