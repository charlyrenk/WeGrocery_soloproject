myApp.controller('FriendsController', ['UserService', 'FriendsService', function(UserService, FriendsService) {
    console.log('FriendsController created');
    var vm = this;
    vm.currentUser = UserService.userObject
    vm.currentUserId = UserService.userObject.id

    vm.allUsers = FriendsService.allUsers;
    vm.allRequests = FriendsService.allRequests
    vm.sendFriendRequest = FriendsService.sendFriendRequest;
    vm.acceptFriendRequest = FriendsService.acceptFriendRequest;
    
    FriendsService.getAllUsers();
    FriendsService.getAllRequests();
}]);