myApp.controller('FriendsController', ['UserService', 'ListService', 'FriendsService', function(UserService, ListService, FriendsService) {
    console.log('FriendsController created');
    var vm = this;
    vm.currentUser = UserService.userObject

    vm.allUsers = FriendsService.allUsers.list;
    vm.sendFriendRequest = FriendsService.sendFriendRequest;
    
    FriendsService.getAllUsers();
}]);