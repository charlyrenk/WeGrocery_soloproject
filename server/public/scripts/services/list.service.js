myApp.service('ListService', ['$http', '$location', 'UserService', function ($http, $location, UserService) {
    console.log('ListService loaded');
    var self = this;
    self.newGroceryItems = {
        newGroceryList: []
    }
    self.existingGroceryLists = {
        list: []
    }

    //adds to length of array to allow more input 
    // fields for the creation of a new grocery list which is stored in another object
    self.addNewItem = function () {
        console.log('addNewItem button clicked.')
        self.newGroceryItems.newGroceryList.push({})
    }

    //removes selected input field
    self.removeItemInputRow = function (index) {
        console.log('removeItemInputRow button clicked.')

        self.newGroceryItems.newGroceryList.splice(index, 1);

        for (var i = index + 1; i < self.newGroceryItems.newGroceryList.length; i++) {
            console.log('if working', self.newGroceryItems.newGroceryList)
            var index = i - 1;

            self.newGroceryItems.newGroceryList.splice(index, {
                index: self.newGroceryItems.newGroceryList[index]

            })
        }

    }

    //sends new grocery list
    self.sendNewList = function (newGroceryList, listName, user) {
        console.log('sendNewList button clicked.', newGroceryList)
        for (var i = 0; i < self.newGroceryItems.newGroceryList.length; i++) {
            self.newGroceryItems.newGroceryList[i].itemStatus = false

        }
        var data = {
            newGroceryList: newGroceryList,
            listName: listName,
            user: user
        }

        $http.post('/grocery', data).then(function (response) {
            console.log('Saved new grocery list!', response);
            self.getLists()
            location.reload()
        });
    }

    //retrievs users created lists
    self.getLists = function () {
        
        if(self.existingGroceryLists.list.length > 0){
            self.existingGroceryLists = {
            list: []
        }}

        $http.get('/grocery').then(function (response) {

            console.log('data:', response.data)
            var userIdCheck = UserService.userObject.id
            console.log('user: ', userIdCheck)
            //used to authenticated user's id with the same id stored with the list from db
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].user_id === userIdCheck) {
                    self.existingGroceryLists.list.push(response.data[i])
                }
            }
            console.log('Get return:', self.existingGroceryLists.list)

        });

    }
    //updates itemStatus boolean in db
    self.changeItemStatus = function (listObject, item, itemStatus) {
        console.log('List to update: ', listObject)
        item.itemStatus = itemStatus
        console.log(item.itemName, "'s status changed to ", item.itemStatus)
        console.log('updatedList: ', listObject)
        var data = {
            objectId: listObject._id,
            listObject: listObject
        }
        $http.put('/grocery', data).then(function (response) {
            console.log('post response', response);
            // $location.path('/user');
        });
    }

    self.editList = function (listObject) {

        var data = {
            objectId: listObject._id,
            listObject: listObject
        }
        $http.put('/grocery', data).then(function (response) {
            console.log('post response', response);
            // $location.path('/user');
        });
    }

    self.deleteList = function(listId){
        
        $http.delete('/grocery/' + listId).then(function (response) {
            console.log('service delete response:', response);
            self.getLists();
            location.reload();
        });
    }

    self.updateList = function (listObject) {
        console.log('List to update: ', listObject)
        var data = {
            objectId: listObject._id,
            listObject: listObject
        }
        $http.put('/grocery', data).then(function (response) {
            console.log('post response', response);
            self.getLists();
            location.reload();
        });
    }
    //this function is a stretch goal
    self.removeItem = function (list, index) {
        console.log('removeItemInputRow button clicked.')
        console.log('list:', list, 'index: ', index)

       list.newGroceryList.splice(index, 1);

    }
}]);