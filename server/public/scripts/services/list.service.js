myApp.service('ListService', ['$http', '$location', 'UserService', function ($http, $location, UserService) {
    console.log('ListService loaded');
    var self = this;
    self.newGroceryItems = {
        newGroceryList: []
    }
    self.existingGroceryLists = {
        list: []
    }

    self.addNewItem = function () {
        console.log('addNewItem button clicked.')
        var newItemNo = self.newGroceryItems.newGroceryList.length + 1;
        self.newGroceryItems.newGroceryList.push({})
    }
    self.removeItemInputRow = function (item) {
        console.log('removeItemInputRow button clicked.')
        var index = self.newGroceryItems.newGroceryList.indexOf(item);
        self.newGroceryItems.newGroceryList.splice(index, 1);

    }
    self.sendNewList = function (newGroceryList, listName, user) {
        console.log('sendNewList button clicked.')
        for (var i = 0; i < self.newGroceryItems.newGroceryList.length; i++) {
            newGroceryList[i].itemStatus = false
        }
        var data = {
            newGroceryList: newGroceryList,
            listName: listName,
            user: user
        }

        $http.post('/grocery', data).then(function (response) {
            console.log('Saved new grocery list!', response);
        });
    }

    self.getLists = function (userObject) {
        $http.get('/grocery').then(function (response) {
            console.log('data:', response.data)
            var userIdCheck = userObject.id
            console.log('user: ', userIdCheck)

            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].user_id === userIdCheck) {
                    self.existingGroceryLists.list.push(response.data[i])
                }
            }
            console.log('Get return:', self.existingGroceryLists.list)

        });

    }

    self.changeItemStatus = function (listObject, item, itemStatus, index){
        console.log('List to update: ', listObject)
        console.log('item:', item)
        item.itemStatus = itemStatus
        console.log(item.itemName, "'s status changed to ", item.itemStatus)
        console.log('item:', item)
        var data = {
            objectId: listObject._id,
            item: item,
            index: index
        }
        $http.put('/grocery', data).then(function(response){
            console.log('post response', response);
            // $location.path('/user');
          });
    }
}]);