app.controller('GraphicCtrl', ['$scope', 'graphicFactory', function ($scope, graphicFactory) {


    graphicFactory.getAmbitos().then(function(ambitos)
    {
        $scope.ambitos = ambitos.data;
        //console.log(ambitos.data);
    }).catch(function(error){
        console.log(error);
    });

    graphicFactory.getSurveys().then(function(surveys)
    {
        $scope.surveys = surveys.data;
    }).catch(function(error){
        console.log(error);
    });

    $scope.selected = function(){
        if(localStorage.getItem('graphic')=='uno'){
            getGraphicsBar($scope.surveyid);
        }
        if(localStorage.getItem('graphic')=='dos'){
            getGraphicsRadar($scope.surveyid);
        }
        if(localStorage.getItem('graphic')=='tres'){
            getGraphicsGroups($scope.surveyid);
        }
    };

    $scope.cargarGrafico = function(opcion){
        if(opcion == 'uno'){
            localStorage.setItem('graphic','uno');
        }
        if(opcion == 'dos') {
            localStorage.setItem('graphic','dos');
        }
        if(opcion == 'tres') {
            localStorage.setItem('graphic','tres');
        }
    };

    function getGraphicsRadar(survey){
        graphicFactory.getGraphics(survey).then(function(response){
            console.log(response.data);
            todos=response.data;
            var numero = 0
            for(var i=0; i< todos.length; i++)
            {
                numero++;

                var datos = JSON.parse(todos[i].data);
                var labeles = JSON.parse(todos[i].labels);

                if(datos.length !=0)
                {
                    console.log(datos);
                    console.log(labeles);

                    var capa = document.getElementById("capa");
                    var ctx = document.createElement("canvas");
                    ctx.setAttribute('id',numero);
                    capa.appendChild(ctx);
                    var crx = document.getElementById(numero).getContext('2d');
                    var myChart = new Chart(crx, {
                        type: 'radar',
                        data: {
                        labels: labeles,
                        datasets: [{
                            data: datos,
                            label: todos[i].name,
                            backgroundColor: 'rgba(00,255,00,0.1)',
                            borderColor: '#00FF00',
                            borderWidth: 2
                        }]
                    },
                        options: {
                            scales: {
                                display: false
                            },
                            ticks: {
                                beginAtZero: true,
                                min: 0,
                                max: 100,
                                stepSize: 20
                            }
                        }
                    });
                }
            }        
        }).catch(function(error){

        });
    };

    function getGraphicsBar(survey){
        graphicFactory.getGraphics(survey).then(function(response){
            console.log(response.data);
            todos=response.data;
            var numero = 0
            for(var i=0; i< todos.length; i++)
            {
                numero++;

                var datos = JSON.parse(todos[i].data);
                var labeles = JSON.parse(todos[i].labels);

                if(datos.length !=0)
                {
                    console.log(datos);
                    console.log(labeles);

                    var capabar = document.getElementById("capabar");
                    var ctx = document.createElement("canvas");
                    ctx.setAttribute('id',numero);
                    capabar.appendChild(ctx);
                    var crx = document.getElementById(numero).getContext('2d');
                    var myChart = new Chart(crx, {
                        type: 'bar',
                        data: {
                        labels: labeles,
                        datasets: [{
                            data: datos,
                            label: todos[i].name
                        }]
                    },
                        options: {
                            scales: {
                                display: false
                            }
                        }
                    });
                }
            }        
        }).catch(function(error){

        });
    };

    function getGraphicsGroups(survey){
        //graphicFactory.getGraphics(municipality).then(function(response){
          //  console.log(response.data);
            graphicFactory.getGraphicsGroups().then(function(response){
                todos=response.data;
                console.log(todos);
                var numero = 0
                for(var i=0; i< todos.length; i++)
                {
                    numero++;

                    var datos = JSON.parse(todos[i].data);
                    var labeles = JSON.parse(todos[i].labels);


                    if(datos.length !=0)
                    {
                        console.log(datos);
                        console.log(labeles);
                        console.log(todos[i].name);
                        var capa = document.getElementById("capa");
                        var ctx = document.createElement("canvas");
                        ctx.setAttribute('id',numero);
                        capa.appendChild(ctx);
                        var crx = document.getElementById(numero).getContext('2d');
                        var myChart = new Chart(crx, {
                            type: 'radar',
                            data: {
                            labels: labeles,
                            datasets: [{
                                data: datos,
                                label: todos[i].name
                            }]
                        },
                            options: {
                                scales: {
                                    display: false
                                }
                            }
                        });
                    }
                }
            }).catch(function(error){

            });
       // }).catch(function(error){

        //});
    };

    //donwload pdf from original canvas
    $scope.downloadPDF = function() {
      var canvas = document.querySelector('#2');
        //creates image
        var canvasImg = canvas.toDataURL("image/jpeg", 1.0);
      
        //creates PDF from img
        var doc = new jsPDF('landscape');
        doc.setFontSize(20);
        doc.text(15,15,"Cool Chart");
        doc.addImage(canvasImg, 'JPEG', 10, 10, 280, 150);
        doc.save('canvas.pdf');
    };

}]);



app.factory('graphicFactory', ['$http', function($http) 
{
    var urlService = 'http://localhost:8080/rest/ambitos/';
    
    var obj = {};

    obj.getAmbitos = function()
    {
        return $http.get(urlService + 'all');
    };

    obj.getGraphics = function(id)
    {
    	return $http.get('http://localhost:8080/rest/groups/getGraphics?id=1');
    };

    obj.getSurveys = function()
    {
        return $http.get('http://localhost:8080/rest/surveys/all');
    };

    obj.getGraphicsGroups = function()
    {
        return $http.get('http://localhost:8080/rest/groups/getGraphicsGroup');
    };

    return obj;

}]); 
