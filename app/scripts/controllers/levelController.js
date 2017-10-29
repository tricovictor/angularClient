
app.controller('LevelCtrl', ['$scope', 'levelFactory', function ($scope, levelFactory) {

	levelFactory.getLevels().then(function(levels)
	{
		$scope.levels = levels.data;
	}).catch(function(error){
		console.log(error);
	});

}]);


app.factory('levelFactory', ['$http', function($http) 
{
    var urlService = 'http://localhost:8080/rest/levels/';
    
    var obj = {};

    obj.getLevels = function()
    {
        return $http.get(urlService + 'all');
    };

    return obj;

}]); 
