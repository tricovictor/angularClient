
app.controller('UserCtrl', ['$scope', 'userFactory', function ($scope, userFactory) {
    $scope.message = null;
	userFactory.getUsers().then(function(users)
	{
		$scope.users = users.response;
        console.log(users.response);
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
        console.log(parameter);
        userFactory.addUser(parameter).then(function(user){
            //$scope.message = user.data.response;
            console.log(user.data);
           // window.location.replace("#!/");
        }).catch(function(error){
            console.log(error);
            //$scope.message = error.data.response;
        });
    };

    /*userFactory.getUser(1).then(function(user)
    {
        $scope.user = user.data;
    });*/

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
    
    obj.addUser = function(user)
    {
        return $http.post(urlService + 'add', user);
    };

    return obj;

}]); 
