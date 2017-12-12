
app.controller('TipologyCtrl', ['$scope', 'tipologyFactory','routeini', function ($scope, tipologyFactory, routeini) {

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

    tipologyFactory.getPuntaje().then(function(puntaje)
    {
        $scope.puntaje = puntaje.data;
        console.log(puntaje);
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
            tipologyFactory.getSubAmbitosByTipologyById(localStorage.getItem('tipologyId')).then(function(subambitosTipology){
                $scope.subambitosTipology = subambitosTipology.data;
                localStorage.removeItem('tipologyId');
            }).catch(function(error){

            });
        }).catch(function(error){
            console.log(error);
        });
    };

    tipologyFactory.getSurveys().then(function(surveys)
    {
        $scope.surveysDrop = surveys.data;
        varios();
        console.log($scope.surveysDrop);
    }).catch(function(error){
        console.log(error);
    });

    function varios(){
        var surveysCount = $scope.surveysDrop.length;
        var municipalityCount = $scope.municipalities.length;

        for ( var i = 0; i < surveysCount ; i++ ) {
            for (j = 0; j < municipalityCount ; j++)
            {
                if($scope.surveysDrop[i].municipalityId == $scope.municipalities[j].id){
                    $scope.surveysDrop[i].municipalityId = $scope.municipalities[j].name;
                }
            }
        }
    };

    function selectedSolutions(){
        tipologyFactory.getSubAmbitosByTipologyComparative($scope.surveyid).then(function(tipology){
            $scope.subambitosTipologySolution = tipology.data;
            $scope.nameTipology = $scope.subambitosTipologySolution[0].nameTipology;
            $scope.description = $scope.subambitosTipologySolution[0].description;
            $scope.descriptionExtra = $scope.subambitosTipologySolution[0].descriptionExtra;
            console.log($scope.subambitosTipologySolution);
        }).catch(function(error){

        });
    };

    $scope.selected = function(){
        selectedSolutions();
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
          "url": routeini+"tipologies/add",
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
          "url": routeini+"tipologies/update",
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

    $scope.tipologiaAceptable = function()
    {
        if($scope.puntaje > 0 && $scope.puntaje <=100) {
            tipologyFactory.setPuntaje($scope.puntaje).then(function(response){
                alert(response.data.response);
                window.location.replace("#!adminHome");
            }).catch(function(error){

            });
        }
    };

    $scope.generatePDF = function() {kendo.drawing.drawDOM($("#capa")).then(function(group) {
        kendo.drawing.pdf.saveAs(group, "Converted PDF.pdf");
        });
    }



}]);


app.factory('tipologyFactory', ['$http','routeini', function($http, routeini) 
{
    var urlService = routeini;
    
    var obj = {};

    obj.getTipologies = function()
    {
        return $http.get(urlService + 'tipologies/all');
    };

    obj.getSubAmbitosByTipologyById = function(id)
    {
        return $http.get(urlService + 'tipologies/getSubAmbitosByTipologyById/?id='+id);
    };

    obj.getSurveys = function()
    {
        return $http.get(urlService + 'surveys/all');
    };

    obj.getTipology = function(id)
    {
        return $http.get(urlService + 'tipologies/getTipologyById/?id='+id);
    };
    obj.getSubAmbitosByTipologyComparative = function(id)
    {
        return $http.get(urlService + 'tipologies/getSubAmbitosByTipologyComparative/?id=' + id);
    };

    obj.getSubAmbitos = function()
    {
        return $http.get(urlService + 'subambitos/all');
    };

    obj.getPuntaje = function()
    {
        return $http.get(urlService + 'tipologies/getPuntaje');
    };

    obj.setPuntaje = function(id)
    {
        return $http.get(urlService + 'tipologies/setPuntaje?id=' + id);
    };

    return obj;

}]); 