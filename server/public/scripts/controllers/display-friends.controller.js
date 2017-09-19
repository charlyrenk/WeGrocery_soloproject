myApp.controller('DisplayFriendsController', ['UserService', 'DisplayFriendsService', 'ListService', function(UserService, DisplayFriendsService, ListService) {
    console.log('DisplayFriendsController loaded');
    var vm = this;

    vm.thisFriendsList = DisplayFriendsService.thisFriendsList;

    vm.userObject = UserService.userObject;
    vm.getThisFriendsLists = DisplayFriendsService.getThisFriendsLists;
    vm.changeItemStatus = ListService.changeItemStatus;

   
}]);