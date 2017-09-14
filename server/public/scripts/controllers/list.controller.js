app.controller('ListController', ['UserService','ListService', '$routeParams', function(UserService, ListService, $routeParams){
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.existingGroceryLists = ListService.existingGroceryLists;
    console.log('$routeParams', $routeParams);
    ListService.getLists(self.userObject);
}]);