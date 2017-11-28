app.controller('AmbitoCtrl', ['$scope', 'ambitoFactory', function ($scope, ambitoFactory) {

    $scope.subambitos = null;
    $scope.subambito = null;
    $scope.typeslevels = null;
    $scope.degrees = null;
    $scope.selected = null;
    $scope.selectedLevel = null;

    ambitoFactory.getAmbitos().then(function(ambitos)
    {
        $scope.ambitos = ambitos.data;
    }).catch(function(error){
        console.log(error);
    });

    ambitoFactory.getSubAmbitos().then(function(subAmbitos)
    {
        $scope.subambitos = subAmbitos.data;
    }).catch(function(error){
        console.log(error);
    });

    function ambitoSelect(){
        $scope.subambito = localStorage.getItem('selectSubAmbito');
    };

    $scope.selectSubAmbito = function(subambito_id)
    {
        localStorage.setItem('selectSubAmbito', subambito_id);
        ambitoSelect();
        ambitoFactory.getSubAmbitoTypeLevel(subambito_id).then(function(response)
        {
            $scope.selected = response.data.typeLevelId;
        }).catch(function(error){
            console.log(error);
        });
    };

    ambitoFactory.getTypeLevels().then(function(typeslevels)
    {
        $scope.typeslevels = typeslevels.data;
    }).catch(function(error){
        console.log(error);
    });


    $scope.selectLevel = function(degreeId)
    {
        $scope.selectedLevel = degreeId;
        ambitoFactory.getLevels().then(function(response)
        {
            $scope.levels = response.data;
            console.log(response.data);
        }).catch(function(error){
            console.log(error);
        });
        ambitoFactory.getScoreByMunicipality(localStorage.getItem('surveyId')).then(function(response)
        {
            $scope.scores = response.data;
            console.log(response.data);
        }).catch(function(error){
            console.log(error);
        });

    };

    $scope.saveScore = function(idScore, level)
    {
        console.log(idScore);
        console.log(level);
        var parameter = {
            id: idScore,
            levelId: level
        };
        parameter = JSON.stringify(parameter);
        console.log(parameter);
        ambitoFactory.updateScore(parameter).then(function(response){
            console.log(response);
        }).catch(function(error){
            console.log(error);
        });

    };

    $scope.oneAtATime = true;

}]);



app.factory('ambitoFactory', ['$http', function($http) 
{
    var urlService = 'http://localhost:8080/rest/ambitos/';
    
    var obj = {};

    obj.getAmbitos = function()
    {
        return $http.get(urlService + 'all');
    };

    obj.getSubAmbitos = function()
    {
        return $http.get('http://localhost:8080/rest/subambitos/all');
    };

    obj.getTypeLevels = function()
    {
        return $http.get('http://localhost:8080/rest/typesLevels/all')
    };

    obj.getLevels = function()
    {
        return $http.get('http://localhost:8080/rest/levels/all');
    };

    obj.getSubAmbitoTypeLevel = function(subambito_id)
    {
        return $http.get('http://localhost:8080/rest/subambitostypelevel/getSubAmbitosTypeLevel?id=' + subambito_id);
    };

    obj.getScoreByMunicipality = function(id)
    {
        return $http.get('http://localhost:8080/rest/scores/getScoreByMunicipality?id=' + id);
    };

    obj.updateScore = function(parameter)
    {
        return $http.put('http://localhost:8080/rest/scores/updateScore', parameter);
    };

    return obj;

}]); 
