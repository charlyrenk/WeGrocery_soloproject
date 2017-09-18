myApp.service('FriendsService', ['$http', '$location', 'UserService', function ($http, $location, UserService) {
    console.log('FriendsService loaded');
    var self = this;
    self.allUsers = {
        list: []
    }
    self.allRequests = {
        list: []
    }

    var userIdCheck = UserService.userObject.id
    self.getAllUsers = function () {
        $http.get('/friends/allUsers').then(function (response) {
            // self.allUsers.list = response.data;
            for (var i = 0; i < response.data.length; i++) {
                if ((response.data[i]._id != userIdCheck)) {
                    var userObject = {
                        user_id: response.data[i]._id,
                        username: response.data[i].username

                    }


                    self.allUsers.list.push(userObject)
                }

            }
            console.log('All users :', self.allUsers.list);
        })
    }

    self.getAllRequests = function () {
        $http.get('/friends/allRequests').then(function (response) {
           
            for (var i = 0; i < response.data.length; i++) {
                if ((response.data[i]._id === userIdCheck)) {
                    self.allRequests.list.push(response.data[i].pendingFriendRequests)
                }
            }
            console.log('All requests :', self.allRequests.list);

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

    self.acceptFriendRequest = function (userToAdd, currentUser) {
        console.log("friend acceptance of:", userToAdd)
        console.log("friend accepted by:", currentUser)
        // var data = {
        //     userToAdd: userToAdd,
        //     currentUser: currentUser
        // }
        // $http.post('/friends', data).then(function (response) {
        //     console.log('post response', response);
        //     // $location.path('/user');
        // });
    }


}]);