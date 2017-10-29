
app.controller('SurveyCtrl', ['$scope', 'surveyFactory', function ($scope, surveyFactory) {

	surveyFactory.getSurveys().then(function(surveys)
	{
		$scope.surveys = surveys.data;
	}).catch(function(error){
		console.log(error);
	});

}]);


app.factory('surveyFactory', ['$http', function($http) 
{
    var urlService = 'http://localhost:8080/rest/surveys/';
    
    var obj = {};

    obj.getSurveys = function()
    {
        return $http.get(urlService + 'all');
    };

    return obj;

}]); 
