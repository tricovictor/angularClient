
app.controller('SubAmbitoCtrl', ['$scope', 'subAmbitoFactory', 'routeini', function ($scope, subAmbitoFactory, routeini) {

    $scope.subAmbitosByAmbito = null;
    $scope.message = null;
    $scope.subAmbito =null;

    /*if(localStorage.getItem('idAmbito'))
    {
        subAmbitoFactory.getSubAmbitosByAmbito(localStorage.getItem('idAmbito')).then(function(subAmbitos)
        {
            $scope.subAmbitosByAmbito = subAmbitos.data;
            console.log(subAmbitos);
        }).catch(function(error){
            console.log(error);
        });
    };*/
    if(localStorage.getItem('subambito_id'))
    {
        subAmbitoFactory.getSubAmbito(localStorage.getItem('subambito_id')).then(function(subambito)
        {
            $scope.subAmbito = subambito.data;
            localStorage.removeItem('subambito_id');
        }).catch(function(error){
            console.log(error);
        });
    }

    subAmbitoFactory.getAmbitos().then(function (ambitos) {
        $scope.ambitos = ambitos.data;
    }).catch(function (error) {
        console.log(error);
    });


    subAmbitoFactory.getGraphicsGroups().then(function(response){
        $scope.graphsGroups = response.data;
    }).catch(function(error){

    });

    subAmbitoFactory.getSubAmbitos().then(function(response){
        $scope.subAmbitos = response.data;
    }).catch(function(error){

    });

    $scope.addSubAmbito = function()
    {
        var parameter = {
            name: $scope.name,
            groupId: $scope.groupId,
            state: true,
            ambito: {id: $scope.ambitoId}
        };
        parameter = JSON.stringify(parameter);
       var settings = {
          "async": true,
          "crossDomain": true,
          "url": routeini+"subambitos/add",
          "method": "POST",
          "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache",
          },
          "processData": false,
          "data": parameter
        };
        $.ajax(settings).done(function (response) {
          alert('Sub Ambito creado correctamente');
          window.location.replace("#!adminHome");
        });
    };

    $scope.editSubAmbito = function(subambito_id)
    {
        localStorage.setItem("subambito_id", subambito_id);
        window.location.replace("#!subambitos/edit");
    };

    $scope.updateSubAmbito = function()
    {
        var parameter = {
            name: $scope.name,
            groupId: $scope.groupId,
            state: true,
            ambito: {id: $scope.ambitoId}
        };
        parameter = JSON.stringify(parameter);
        subAmbitoFactory.updateSubAmbito(parameter).then(function(response){
        }).catch(function(error){
            console.log(error);
        });
        window.location.replace("#!adminHome");
    };


    $scope.getSubAmbitosByAmbito = function(idAmbito)
    {
        localStorage.setItem("idAmbito", idAmbito);
    };


}]);


app.factory('subAmbitoFactory', ['$http', 'routeini', function($http, routeini) 
{
    var urlService = routeini;
    
    var obj = {};

    obj.getSubAmbitos = function()
    {
        return $http.get(urlService + 'subambitos/all');
    };

    obj.getSubAmbito = function()
    {
        return $http.get(urlService + 'subambitos/getSubAmbitoById?id='+localStorage.getItem('subambito_id'));
    };

    obj.getGraphicsGroups = function()
    {
        return $http.get(urlService + 'graphGroup/all');
    };

    obj.updateSubAmbito = function(parameter)
    {
        return $http.put(urlService +'subambitos/update', parameter);
    };


    obj.getSubAmbitosByAmbito = function(id)
    {
        return $http.get(urlService + 'subambitos/getSubAmbitosByAmbito?='+id);
    };

    obj.getAmbitos = function () {
        return $http.get(urlService + 'ambitos/all');
    };

    return obj;

}]); 
