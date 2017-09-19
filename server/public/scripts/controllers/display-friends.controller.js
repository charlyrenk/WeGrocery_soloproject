myApp.controller('DisplayFriendsController', ['UserService', 'DisplayFriendsService', function(UserService, DisplayFriendsService) {
    console.log('DisplayFriendsController loaded');
    var vm = this;

    vm.thisFriendsList = DisplayFriendsService.thisFriendsList;

    vm.userObject = UserService.userObject;
    vm.getThisFriendsLists = DisplayFriendsService.getThisFriendsLists;

   
}]);