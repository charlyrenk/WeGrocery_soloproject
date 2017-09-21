myApp.controller('UserController', ['UserService', 'ListService', function(UserService, ListService) {
  console.log('UserController created');
  var vm = this;

  //user information
  vm.userService = UserService;
  vm.userObject = UserService.userObject;

  //list service arrays
  vm.newGroceryItems = ListService.newGroceryItems;
  vm.existingGroceryLists = ListService.existingGroceryLists;

  //list service functions
  vm.addNewItem = ListService.addNewItem;
  vm.removeItemInputRow = ListService.removeItemInputRow;
  vm.sendNewList = ListService.sendNewList;
  vm.changeItemStatus = ListService.changeItemStatus;
  vm.editList = ListService.editList;
  vm.deleteList = ListService.deleteList;
  vm.updateList = ListService.updateList;
  vm.removeItem = ListService.removeItem;

  //functions on page load
  ListService.getLists();

  this.buttonFunction = function(){
    console.log('Button test');
    debugger;
  }
}]);
