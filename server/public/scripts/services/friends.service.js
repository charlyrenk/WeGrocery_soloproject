myApp.service('FriendsService', ['$http', '$location', 'UserService', function ($http, $location, UserService) {
    console.log('FriendsService loaded');
    var self = this;
    self.allUsers = {
        list: []
    }

    self.getAllUsers = function () {
        $http.get('/friends').then(function (response) {
            // self.allUsers.list = response.data;
            for (var i = 0; i < response.data.length; i++) {
                var userObject = {
                    user_id: response.data[i]._id,
                    username: response.data[i].username
                    
                }
                self.allUsers.list.push(userObject)
            }
            console.log('All users :', self.allUsers.list);
        })
    }

    self.sendFriendRequest = function (userToAdd, currentUser) {
        console.log("friend request sent to:", userToAdd)
        console.log("friend request send by:", currentUser)
        var data = {
            userToAdd: userToAdd,
            currentUser: currentUser
        }
        $http.post('/friends', data).then(function (response) {
            console.log('post response', response);
            // $location.path('/user');
        });
    }


}]);