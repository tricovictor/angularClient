
app.controller('AmbitoCtrl', ['$scope', 'ambitoFactory', function ($scope, ambitoFactory) {

	ambitoFactory.getAmbitos().then(function(ambitos)
	{
		$scope.ambitos = ambitos.data;
	}).catch(function(error){
		console.log(error);
	});

}]);


app.factory('ambitoFactory', ['$http', function($http) 
{
    var urlService = 'http://localhost:8080/rest/ambitos/';
    
    var obj = {};

    obj.getAmbitos = function()
    {
        return $http.get(urlService + 'all');
    };

    return obj;

}]); 
