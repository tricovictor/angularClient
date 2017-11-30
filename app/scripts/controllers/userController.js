
app.controller('UserCtrl', ['$scope', 'userFactory', '$http', 'routeini', function ($scope, userFactory, $http, routeini) {
   
    $scope.message = null;
    $scope.user = null;
	userFactory.getUsers().then(function(users)
	{
		$scope.users = users.data;
	}).catch(function(error){
		console.log(error);
	});

    if(localStorage.getItem('user_id'))
    {
        userFactory.getUser(localStorage.getItem('user_id')).then(function(user)
        {
            $scope.user = user.data;
            localStorage.removeItem('user_id');
        }).catch(function(error){
            console.log(error);
        });
    }


    $scope.addUser = function()
    {
        var parameter = {
            email: $scope.email,
            password: $scope.password,
            type: $scope.type,
            name: $scope.name,
            lastname: $scope.lastname,
            phone: $scope.phone,
            state: true
        };
        parameter = JSON.stringify(parameter);

       var settings = {
          "async": true,
          "crossDomain": true,
          "url": routeini+"users/add",
          "method": "POST",
          "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache",
          },
          "processData": false,
          "data": parameter
        };
        $.ajax(settings).done(function (response) {
          $scope.message = response;
          console.log(response);
          window.location.replace("#!adminHome");
        });
    };



    $scope.deleteUser = function(user_id)
    {
        userFactory.deleteUser(user_id).then(function(response){
            console.log(response);
        }).catch(function(error){
            console.log(error);
        });
        window.location.replace("#!adminHome");
    };

    $scope.editUser = function(user_id)
    {
        localStorage.setItem("user_id", user_id);
        window.location.replace("#!user/edit");
    };

    $scope.updateUser = function()
    {
        var parameter = {
            id: $scope.user.id,
            email: $scope.user.email,
            password: $scope.user.password,
            type: $scope.user.type,
            name: $scope.user.name,
            lastname: $scope.user.lastname,
            phone: $scope.user.phone,
            state: true
        };
        parameter = JSON.stringify(parameter);
        userFactory.updateUser(parameter).then(function(response){
        }).catch(function(error){
            console.log(error);
        });
        window.location.replace("#!adminHome");
    };

}]);

app.factory('userFactory', ['$http', 'routeini', function($http, routeini) 
{
    var urlService = routeini;
    
    var obj = {};

    obj.getUsers = function()
    {
        return $http.get(urlService + 'users/all');
    };

    obj.getUser = function(id)
    {
        return $http.get(urlService +'users/getUserById/?id='+ id);
    };
    
    obj.updateUser = function(parameter)
    {
        return $http.put(urlService +'users/update', parameter);
    };

    obj.deleteUser = function(id)
    {
        return $http.get(urlService +'users/deleteUserById/?id='+ id);
    };

    return obj;

}]); 
