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
  vm.changeItemStatus = ListService.changeItemStatus

  ListService.getLists(vm.userObject);
}]);
