
app.controller('UserCtrl', ['$scope', 'userFactory', function ($scope, userFactory) {
    $scope.message = null;

	userFactory.getUsers().then(function(users)
	{
		$scope.users = users.data;
        console.log(users.data);
	}).catch(function(error){
		console.log(error);
	});


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
          "url": "http://localhost:8080/rest/users/add",
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
        });
    };
}]);

app.factory('userFactory', ['$http', function($http) 
{
    var urlService = 'http://localhost:8080/rest/users/';
    
    var obj = {};

    obj.getUsers = function()
    {
        return $http.get(urlService + 'all');
    };

    obj.getUser = function(id)
    {
        return $http.get(urlService + id);
    };
    
    return obj;

}]); 
