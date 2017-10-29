
app.controller('DegreeCtrl', ['$scope', 'degreeFactory', function ($scope, degreeFactory) {

	degreeFactory.getDegrees().then(function(degrees)
	{
		$scope.degrees = degrees.data;
	}).catch(function(error){
		console.log(error);
	});

}]);


app.factory('degreeFactory', ['$http', function($http) 
{
    var urlService = 'http://localhost:8080/rest/degrees/';
    
    var obj = {};

    obj.getDegrees = function()
    {
        return $http.get(urlService + 'all');
    };

    return obj;

}]); 
