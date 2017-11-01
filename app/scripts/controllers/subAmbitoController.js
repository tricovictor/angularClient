
app.controller('SubAmbitoCtrl', ['$scope', 'subAmbitoFactory', function ($scope, subAmbitoFactory) {

    $scope.subAmbitosByAmbito = null;

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

    $scope.getSubAmbitosByAmbito = function(idAmbito)
    {
        localStorage.setItem("idAmbito", idAmbito);
    };


}]);


app.factory('subAmbitoFactory', ['$http', function($http) 
{
    var urlService = 'http://localhost:8080/rest/subambitos/';
    
    var obj = {};

    obj.getSubAmbitos = function()
    {
        return $http.get(urlService + 'all');
    };

    obj.getSubAmbitosByAmbito = function(id)
    {
        return $http.get(urlService + 'getSubAmbitosByAmbito?='+id);
    };

    return obj;

}]); 
