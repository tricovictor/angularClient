
app.controller('DegreeCtrl', ['$scope', 'degreeFactory', 'routeini' , function ($scope, degreeFactory, routeini) {

	degreeFactory.getDegrees().then(function(degrees)
	{
		$scope.degrees = degrees.data;
	}).catch(function(error){
		console.log(error);
	});

}]);


app.factory('degreeFactory', ['$http', 'routeini', function($http, routeini) 
{
    var urlService = routeini;
    
    var obj = {};

    obj.getDegrees = function()
    {
        return $http.get(urlService + 'degrees/all');
    };

    return obj;

}]); 
