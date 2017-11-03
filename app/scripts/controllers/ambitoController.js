app.controller('AmbitoCtrl', ['$scope', 'ambitoFactory', function ($scope, ambitoFactory) {

    $scope.subambitos = null;
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

    $scope.selectSubAmbito = function(subambito_id)
    {
        ambitoFactory.getSubAmbitoTypeLevel(subambito_id).then(function(response)
        {
            $scope.selected = response.data.typeLevelId;
        }).catch(function(error){
            console.log(error);
        });
    };

/*    ambitoFactory.getDegrees().then(function(degrees)
    {
        $scope.degrees = degrees.data;
        console.log(degrees);
    }).catch(function(error){
        console.log(error);
    });*/

    ambitoFactory.getTypeLevels().then(function(typeslevels)
    {
        $scope.typeslevels = typeslevels.data;
        console.log(typeslevels.data[0].degrees[0].id);
    }).catch(function(error){
        console.log(error);
    });


    $scope.selectLevel = function(degreeId)
    {
        $scope.selectedLevel = degreeId;
        ambitoFactory.getLevels().then(function(response)
        {
            $scope.levels = response.data;
        }).catch(function(error){
            console.log(error);
        });
    };

    $scope.saveScore = function()
    {
        console.log($scope);
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
/*    obj.getDegrees = function()
    {
        return $http.get('http://localhost:8080/rest/degrees/all');
    };*/

    obj.getLevels = function()
    {
        return $http.get('http://localhost:8080/rest/levels/all');
    };

    obj.getSubAmbitoTypeLevel = function(subambito_id)
    {
        return $http.get('http://localhost:8080/rest/subambitostypelevel/getSubAmbitosTypeLevel?id=' + subambito_id);
    };

    return obj;

}]); 
