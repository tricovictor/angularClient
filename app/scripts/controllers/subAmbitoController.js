
app.controller('SubAmbitoCtrl', ['$scope', 'subAmbitoFactory', function ($scope, subAmbitoFactory) {

	subAmbitoFactory.getSubAmbitos().then(function(subAmbitos)
	{
		$scope.subAmbitos = subAmbitos.data;
	}).catch(function(error){
		console.log(error);
	});

}]);


app.factory('subAmbitoFactory', ['$http', function($http) 
{
    var urlService = 'http://localhost:8080/rest/subambitos/';
    
    var obj = {};

    obj.getSubAmbitos = function()
    {
        return $http.get(urlService + 'all');
    };

    return obj;

}]); 
