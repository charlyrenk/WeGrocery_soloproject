myApp.service('DisplayFriendsService', ['$http', '$location', 'UserService', function ($http, $location, UserService) {
       console.log('DisplayFriendsService loaded');
    var self = this;
    self.thisFriendsList = {};

    self.getThisFriendsLists = function(friend){
        self.thisFriendsList= {
        }
        
        console.log('getThisFriendsLists button clicked', friend)
        
    }
}]);