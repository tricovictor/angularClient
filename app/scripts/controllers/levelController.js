
app.controller('LevelCtrl', ['$scope', 'levelFactory', 'routeini', function ($scope, levelFactory, routeini) {

	levelFactory.getLevels().then(function(levels)
	{
		$scope.levels = levels.data;
	}).catch(function(error){
		console.log(error);
	});

}]);


app.factory('levelFactory', ['$http', 'routeini', function($http, routeini) 
{
    var urlService = routeini;
    
    var obj = {};

    obj.getLevels = function()
    {
        return $http.get(urlService + 'levels/all');
    };

    return obj;

}]); 
