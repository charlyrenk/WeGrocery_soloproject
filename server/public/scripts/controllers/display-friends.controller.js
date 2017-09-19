myApp.controller('DisplayFriendsController', ['UserService', 'ListService', 'FriendsService', function(UserService, ListService, FriendsService) {
    console.log('DisplayFriendsController loaded');
    var vm = this;

    vm.userObject = UserService.userObject;

   
}]);