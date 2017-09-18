myApp.controller('FriendsController', ['UserService', 'ListService', 'FriendsService', function(UserService, ListService, FriendsService) {
    console.log('FriendsController created');
    var vm = this;
    vm.currentUser = UserService.userObject
    vm.currentUserId = UserService.userObject.id

    vm.allUsers = FriendsService.allUsers.list;
    vm.allRequests = FriendsService.allRequests.list
    vm.sendFriendRequest = FriendsService.sendFriendRequest;
    vm.acceptFriendRequest = FriendsService.acceptFriendRequest;
    
    FriendsService.getAllUsers();
    FriendsService.getAllRequests();
}]);