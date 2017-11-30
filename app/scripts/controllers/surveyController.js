
app.controller('SurveyCtrl', ['$scope', 'surveyFactory', 'routeini', function ($scope, surveyFactory,routeini) {

    $scope.message = null;
    $scope.municipality = null;

    function searchSurvey(id)
    {
      surveyFactory.getSurvey(id).then(function(survey)
      {
        $scope.survey = survey.data;
        localStorage.setItem('surveyId',$scope.survey.id);
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

    surveyFactory.getSurveys().then(function(surveys)
    {
      $scope.surveys = surveys.data;
      $scope.surveysDrop = surveys.data;
    }).catch(function(error){
      console.log(error);
    });


    function varios(){
        for ( var i = 0; i < $scope.surveysDrop.length; i++ ) {
            for (j = 0; j < $scope.municipalities.length; j++)
            {
                if($scope.surveysDrop[i].municipalityId == $scope.municipalities[j].id){
                    $scope.surveysDrop[i].municipalityId = $scope.municipalities[j].name;
                }
            }
        }
    };

    $scope.closed = function(id)
    {
      alert(id);
      surveyFactory.closeSurvey(id).then(function(surveys){
        alert("Encuesta Cerrada");
      }).catch(function(error){

      });
    };

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
          "url": routeini+"surveys/add",
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


app.factory('surveyFactory', ['$http', 'routeini', function($http,routeini) 
{
    var urlService = routeini;
    
    var obj = {};

    obj.getMunicipalities = function()
    {
        return $http.get(urlService + 'municipalities/all');
    };

    obj.getSurveys = function()
    {
        return $http.get(urlService + 'surveys/all');
    };

    obj.getSurvey = function(id)
    {
        return $http.get(urlService + 'surveys/getSurveyById/?id=' + id);
    };

    obj.closeSurvey = function(id)
    {
        return $http.get(urlService + 'surveys/closeSurvey/?id=' + id);
    };

    return obj;

}]); 
