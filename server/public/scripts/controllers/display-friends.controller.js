myApp.controller('DisplayFriendsController', ['UserService', 'DisplayFriendsService', function(UserService, DisplayFriendsService) {
    console.log('DisplayFriendsController loaded');
    var vm = this;

    vm.getThisFriendsLists = DisplayFriendsService.getThisFriendsLists

    vm.userObject = UserService.userObject;
    vm.getThisFriendsLists = DisplayFriendsService.getThisFriendsLists;

   
}]);