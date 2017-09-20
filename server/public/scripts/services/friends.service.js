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
            self.allUsers.list = [];
            var userIdCheck = UserService.userObject.id
            self.allUsers.list = response.data
     
            console.log('All users :', self.allUsers.list);

        })
    }

    self.getAllRequests = function () {
        var userIdCheck = UserService.userObject.id
     
        $http.get('/friends/allRequests').then(function (response) {
            self.allRequests.list = [];

            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i]._id === userIdCheck) {
                    self.allRequests.list.push(response.data[i].pendingFriendRequests)
                }
            }
            console.log('All requests :', self.allRequests.list);

        })

    }

    self.sendFriendRequest = function (userToAdd, currentUser) {
        alert('Friend Request Sent!')
        currentUser.friendRequestStatus = false;
        
        console.log("friend request sent to:", userToAdd)
        console.log("friend request send by:", currentUser)
        var data = {
            userToAdd: userToAdd,
            currentUser: currentUser
        }
        $http.post('/friends/sendRequest', data).then(function (response) {
            console.log('post response', response);
            
    
        });
    }

    self.acceptFriendRequest = function (userToAdd, currentUser) {
        userToAdd.friendRequestStatus = true
        console.log("friend acceptance of:", userToAdd)
        console.log("friend accepted by:", currentUser)
        var data = {
            userToAdd: userToAdd,
            currentUser: currentUser,
            allRequestsObject: self.allRequests.list
        }
        console.log("new allRequest object:", self.allRequests.list[0])
        $http.post('/friends/acceptRequest', data).then(function (response) {
            console.log('post response', response);
            location.reload();
        });
    }


}]);