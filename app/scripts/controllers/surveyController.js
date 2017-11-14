
app.controller('SurveyCtrl', ['$scope', 'surveyFactory', function ($scope, surveyFactory) {

    $scope.message = null;
    $scope.municipality = null;

  	surveyFactory.getSurveys().then(function(surveys)
  	{
  		$scope.surveys = surveys.data;
  	}).catch(function(error){
  		console.log(error);
  	});

    function searchSurvey(id)
    {
      surveyFactory.getSurvey(id).then(function(survey)
      {
        $scope.survey = survey.data;
        localStorage.setItem('surveyId',$scope.survey.id);
        console.log($scope.survey);
      }).catch(function(error){
        console.log(error);
      });
    }

    surveyFactory.getMunicipalities().then(function(municipalities)
    {
        $scope.municipalities = municipalities.data;
    }).catch(function(error){
        console.log(error);
    });

    $scope.addSurvey = function()
    {
      if($scope.municipality == null)
      {
        alert("Debe seleccionar un municipio");

      } else {
        var parameter = {
            municipalityId: $scope.municipality,
            state: 'activa',
            userId: localStorage.getItem('tokenrgc')
        };
        parameter = JSON.stringify(parameter);
        console.log(parameter);

       var settings = {
          "async": true,
          "crossDomain": true,
          "url": "http://localhost:8080/rest/surveys/add",
          "method": "POST",
          "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache"
          },
          "processData": false,
          "data": parameter
        };
        $.ajax(settings).done(function (response) {
            console.log(response);
          if(response){
            alert("La encuesta se guardo con exito");
            window.location.replace("#!interviewerHome");
          } else {
            alert("La encuesta ya Existe");
            window.location.replace("#!interviewerHome");
          }
        });
      }
    };

    $scope.editSurvey = function()
    {
      if($scope.municipality == null)
      {
        alert("Debe seleccionar un municipio");

      } else {

        searchSurvey($scope.municipality);
      }
    };
    
}]);


app.factory('surveyFactory', ['$http', function($http) 
{
    var urlService = 'http://localhost:8080/rest/surveys/';
    
    var obj = {};

    obj.getMunicipalities = function()
    {
        return $http.get('http://localhost:8080/rest/municipalities/all');
    };

    obj.getSurveys = function()
    {
        return $http.get(urlService + 'all');
    };

    obj.getSurvey = function(id)
    {
        return $http.get(urlService + 'getSurveyById/?id=' + id);
    };
    return obj;

}]); 
