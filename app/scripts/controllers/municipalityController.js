
app.controller('MunicipalityCtrl', ['$scope', 'municipalityFactory', function ($scope, municipalityFactory) {

	municipalityFactory.getMunicipalities().then(function(municipalities)
	{
		$scope.municipalities = municipalities.data;
	}).catch(function(error){
		console.log(error);
	});

}]);


app.factory('municipalityFactory', ['$http', function($http) 
{
    var urlService = 'http://localhost:8080/rest/municipalities/';
    
    var obj = {};

    obj.getMunicipalities = function()
    {
        return $http.get(urlService + 'all');
    };

    return obj;

}]); 
