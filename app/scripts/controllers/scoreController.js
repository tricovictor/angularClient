
app.controller('ScoreCtrl', ['$scope', 'scoreFactory', function ($scope, scoreFactory) {

	scoreFactory.getScores().then(function(scores)
	{
		$scope.scores = scores.data;
	}).catch(function(error){
		console.log(error);
	});

}]);


app.factory('scoreFactory', ['$http', function($http) 
{
    var urlService = 'http://localhost:8080/rest/scores/';
    
    var obj = {};

    obj.getScores = function()
    {
        return $http.get(urlService + 'all');
    };

    return obj;

}]); 
