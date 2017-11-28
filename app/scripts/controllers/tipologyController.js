
app.controller('TipologyCtrl', ['$scope', 'tipologyFactory', function ($scope, tipologyFactory) {

    $scope.subambitos = {};
    $scope.tipologyy = null;
    tipologyFactory.getSubAmbitos().then(function(response){
        $scope.subAmbitos = response.data;
    }).catch(function(error){

    });

	tipologyFactory.getTipologies().then(function(tipologies)
	{
		$scope.tipologies = tipologies.data;
	}).catch(function(error){
		console.log(error);
	});

    function getTipology()
    {
        tipologyFactory.getTipology($scope.tipologyId).then(function(tipology)
        {
            $scope.tipology = tipology.data;
        }).catch(function(error){
            console.log(error);
        });
    };
    
    if(localStorage.getItem('tipologyId'))
    {
        tipologyFactory.getTipology(localStorage.getItem('tipologyId')).then(function(tipology)
        {
            $scope.tipologyy = tipology.data;
            console.log($scope.tipologyy);
            tipologyFactory.getSubAmbitosByTipologyById(localStorage.getItem('tipologyId')).then(function(subambitosTipology){
                $scope.subambitosTipology = subambitosTipology.data;
                localStorage.removeItem('tipologyId');
            }).catch(function(error){

            });
        }).catch(function(error){
            console.log(error);
        });
    };


    $scope.viewTipology = function(tipologyId) {
        localStorage.setItem('tipologyId',tipologyId);
            window.location.replace("#!municipality/viewTipology");

    };

    $scope.addTipology = function(){
        var sub_ambitos = [];
        for(var propiedad in $scope.subambitos)
        {
            sub_ambitos.push(propiedad);
        }
        var parameter = {
            description: $scope.description,
            name: $scope.name,
            descriptionExtra: $scope.descriptionExtra,
            subAmbitos: sub_ambitos.toString()
        };
        parameter = JSON.stringify(parameter);
        console.log(parameter);
       var settings = {
          "async": true,
          "crossDomain": true,
          "url": "http://localhost:8080/rest/tipologies/add",
          "method": "POST",
          "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache"
          },
          "processData": false,
          "data": parameter
        };
        $.ajax(settings).done(function (response) {
          $scope.message = response;
          console.log(response);
          console.log(response);
          window.location.replace("#!adminHome");
        });
    };

    $scope.editTipology = function()
    {
        getTipology();
    };

    $scope.updateTipology = function()
    {
        var sub_ambitos = [];
        for(var propiedad in $scope.subambitos)
        {
            sub_ambitos.push(propiedad);
        }
        var parameter = {
            id: $scope.tipologyId,
            description: $scope.tipology.description,
            name: $scope.tipology.name,
            descriptionExtra: $scope.tipology.descriptionExtra,
            subAmbitos: sub_ambitos.toString()
        };
        parameter = JSON.stringify(parameter);

        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "http://localhost:8080/rest/tipologies/update",
          "method": "PUT",
          "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache"
          },
          "processData": false,
          "data": parameter
        }

        $.ajax(settings).done(function (response) {
          alert(response);
        });
        window.location.replace("#!adminHome");
    };

    $scope.generatePDF = function() {kendo.drawing.drawDOM($("#capa")).then(function(group) {
        kendo.drawing.pdf.saveAs(group, "Converted PDF.pdf");
        });
    }



}]);


app.factory('tipologyFactory', ['$http', function($http) 
{
    var urlService = 'http://localhost:8080/rest/';
    
    var obj = {};

    obj.getTipologies = function()
    {
        return $http.get(urlService + 'tipologies/all');
    };

    obj.getSubAmbitosByTipologyById = function(id)
    {
        return $http.get(urlService + 'tipologies/getSubAmbitosByTipologyById/?id='+id);
    };

    obj.getTipology = function(id)
    {
        return $http.get(urlService + 'tipologies/getTipologyById/?id='+id);
    };

    obj.getSubAmbitos = function()
    {
        return $http.get(urlService + 'subambitos/all');
    };

    return obj;

}]); 