myApp.service('DisplayFriendsService', ['$http', '$location', 'UserService', function ($http, $location, UserService) {
    console.log('DisplayFriendsService loaded');
    var self = this;
    self.thisFriendsList = {
        list: []
    };

    self.getThisFriendsLists = function (friend) {
        console.log('friend', friend)
       
        
        var friendId = friend.id
       
 
        $http.get('/displayFriends').then(function (response) {

            console.log('data:', response.data)
            self.thisFriendsList.list = [];
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].user_id === friendId) {
                    self.thisFriendsList.list.push(response.data[i])
                }
            }


            console.log('Get return:', self.thisFriendsList.list)


        });
    }
}]);