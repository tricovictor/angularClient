
app.controller('ScoreCtrl', ['$scope', 'scoreFactory', 'routeini', function ($scope, scoreFactory,routeini) {

	scoreFactory.getScores().then(function(scores)
	{
		$scope.scores = scores.data;
	}).catch(function(error){
		console.log(error);
	});

}]);


app.factory('scoreFactory', ['$http', 'routeini', function($http, routeini) 
{
    var urlService = routeini;
    
    var obj = {};

    obj.getScores = function()
    {
        return $http.get(urlService + 'scores/all');
    };

    return obj;

}]); 
