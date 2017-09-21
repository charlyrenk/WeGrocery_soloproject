myApp.controller('FriendsController', ['UserService', 'FriendsService', '$mdDialog', function(UserService, FriendsService, $mdDialog) {
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

    vm.showAlert = function(ev) {
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .title('Friend request sent!')
            .ok('Got it!')
            .targetEvent(ev)
        );
    };

}]);