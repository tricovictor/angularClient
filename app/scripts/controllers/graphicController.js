app.controller('GraphicCtrl', ['$scope', 'graphicFactory', function ($scope, graphicFactory) {


    graphicFactory.getAmbitos().then(function(ambitos)
    {
        $scope.ambitos = ambitos.data;
        console.log(ambitos.data);
    }).catch(function(error){
        console.log(error);
    });

    graphicFactory.getSurveys().then(function(surveys)
    {
        $scope.surveys = surveys.data;
        console.log(surveys.data);
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
        if(localStorage.getItem('graphic')=='cuatro'){
            getGraphicsXAmbito($scope.surveyid);
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
        if(opcion == 'cuatro') {
            localStorage.setItem('graphic','cuatro');
        }
    };

    function getGraphicsRadar(survey){
        graphicFactory.getGraphics(survey).then(function(response){
            console.log(response.data);
            todos=response.data;
            var numero = 0;
            var datosarray = 0;

            for(var i=0; i< todos.length; i++)
            {
                numero++;

                var datos = JSON.parse(todos[i].data);
                var labeles = JSON.parse(todos[i].labels);

                if(datos.length !=0)
                {
                    var capa = document.getElementById("capa");
                    var ctx = document.createElement("canvas");
                    ctx.setAttribute('id',numero);
                    capa.appendChild(ctx);
    
                    for(var j=0; j<datos.length; j++) 
                    {
                        var lab = document.createElement("label");
                        lab.setAttribute('id','lab'+datosarray);
                        lab.setAttribute('style', 'font-weight: normal; color: #B4886B;');
                        capa.appendChild(lab);
                        document.getElementById('lab'+datosarray).innerHTML = labeles[j]+': '+datos[j];
                        datosarray++;
                    }
                    var crx = document.getElementById(numero).getContext('2d');
                    var myChart = new Chart(crx, {
                        type: 'radar',
                        data: {
                        labels: labeles,
                        datasets: [{
                            data: datos,
                            borderWidth: 6,
                            borderColor: 'rgba(77,166,253,0.85)',
                            backgroundColor: 'rgba(208, 196, 253, 0.69)'
                        }]
                    },
                        options: {
                            scale: {
                                ticks: {
                                    beginAtZero: true,
                                    min: 0,
                                    max: 100,
                                    stepSize: 20
                                }
                            },
                            title: {
                                display: true,
                                fontSize: 20,
                                fontColor: 'rgba(127,191,63,1)',
                                text: todos[i].name
                            },
                            legend: {
                                display: false
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
            var datosarray = 0;
            for(var i=0; i< todos.length; i++)
            {
                numero++;

                var datos = JSON.parse(todos[i].data);
                var labeles = JSON.parse(todos[i].labels);

                if(datos.length !=0)
                {
                    console.log(datos);
                    console.log(labeles);

                    var capabar = document.getElementById("capa");
                    var ctx = document.createElement("canvas");
                    ctx.setAttribute('id',numero);
                    ctx.setAttribute('width','80%');
                    capa.appendChild(ctx);
                    for(var j=0; j<datos.length; j++) 
                    {
                        var lab = document.createElement("label");
                        lab.setAttribute('id','lab'+datosarray);
                        lab.setAttribute('style', 'font-weight: normal; color: #B4886B;');
                        capa.appendChild(lab);
                        document.getElementById('lab'+datosarray).innerHTML = labeles[j]+': '+datos[j];
                        datosarray++;
                    }


                    var crx = document.getElementById(numero).getContext('2d');
                    var myChart = new Chart(crx, {
                        type: 'bar',
                        data: {
                        labels: labeles,
                        datasets: [{
                            data: datos,
                            backgroundColor: ["rgba(127,191,63,1)", "rgba(232,119,175,1)", "rgba(232,232,119,1)", "rgba(123,119,232,0.7)"]
                        }]
                    },
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        min: 0,
                                        max: 100,
                                        stepSize: 10
                                    }
                                }]
                            },
                            title: {
                                display: true,
                                fontSize: 20,
                                fontColor: 'rgba(127,191,63,1)',
                                text: todos[i].name
                            },
                            legend: {
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
        graphicFactory.getGraphics(survey).then(function(response){
            console.log(response.data);
            graphicFactory.getGraphicsGroups().then(function(response){
                todos=response.data;
                var numero = 0
                var datosarray = 0;
                for(var i=0; i< todos.length; i++)
                {
                    numero++;
                    var datos = JSON.parse(todos[i].data);
                    var labeles = JSON.parse(todos[i].labels);
                    console.log(datos);
                    if(datos.length !=0)
                    {
                        var capa = document.getElementById("capa");
                        var ctx = document.createElement("canvas");
                        ctx.setAttribute('id',numero);
                        capa.appendChild(ctx);

                        for(var j=0; j<datos.length; j++) 
                        {
                            var lab = document.createElement("label");
                            lab.setAttribute('id','lab'+datosarray);
                            lab.setAttribute('style', 'font-weight: normal; color: #B4886B;');
                            capa.appendChild(lab);
                            document.getElementById('lab'+datosarray).innerHTML = labeles[j]+': '+datos[j];
                            datosarray++;
                        }

                        var crx = document.getElementById(numero).getContext('2d');
                        var myChart = new Chart(crx, {
                            type: 'radar',
                            data: {
                            labels: labeles,
                            datasets: [{
                                data: datos,
                                borderWidth: 6,
                                borderColor: 'rgba(77,166,253,0.85)',
                                backgroundColor: 'rgba(208, 196, 253, 0.69)'
                            }]
                        },
                            options: {
                                scale: {
                                    ticks: {
                                        beginAtZero: true,
                                        min: 0,
                                        max: 100,
                                        stepSize: 20
                                    }
                                },
                                title: {
                                    display: true,
                                    fontSize: 20,
                                    fontColor: 'rgba(127,191,63,1)',                               
                                    text: todos[i].name
                                },
                                legend: {
                                    display: false
                                }
                            }
                        });
                    }
                }
            }).catch(function(error){

            });
        }).catch(function(error){

        });

    };


    function getGraphicsXAmbito(survey){
        graphicFactory.getGraphics(survey).then(function(response){
            graphicFactory.getGraphicsGroups().then(function(response){
                graphicFactory.getGraphicsAmbitos().then(function(response){
                    todos=response.data;
                    console.log(response.data);
                    var numero = 0
                    var datosarray = 0;
                    for(var i=0; i< todos.length; i++)
                    {
                        numero++;
                        var datos = JSON.parse(todos[i].data);
                        var labeles = JSON.parse(todos[i].labels);
                        if(datos.length !=0)
                        {
                            var capa = document.getElementById("capa");
                            var ctx = document.createElement("canvas");
                            ctx.setAttribute('id',numero);
                            capa.appendChild(ctx);

                            for(var j=0; j<datos.length; j++) 
                            {
                                var lab = document.createElement("label");
                                lab.setAttribute('id','lab'+datosarray);
                                lab.setAttribute('style', 'font-weight: normal; color: #B4886B;');
                                capa.appendChild(lab);
                                document.getElementById('lab'+datosarray).innerHTML = labeles[j]+': '+datos[j];
                                datosarray++;
                            }



                            var crx = document.getElementById(numero).getContext('2d');
                            var myChart = new Chart(crx, {
                                type: 'radar',
                                data: {
                                labels: labeles,
                                datasets: [{
                                    data: datos,
                                    borderWidth: 6,
                                    borderColor: 'rgba(77,166,253,0.85)',
                                    backgroundColor: 'rgba(208, 196, 253, 0.69)'
                                }]
                            },
                                options: {
                                    scale: {
                                        ticks: {
                                            beginAtZero: true,
                                            min: 0,
                                            max: 100,
                                            stepSize: 20
                                        }
                                    },
                                    title: {
                                        display: true,
                                        fontSize: 20,
                                        fontColor: 'rgba(127,191,63,1)',
                                        text: todos[i].name
                                    },
                                    legend: {
                                        display: false
                                    }
                                }
                            });
                        }
                    }
                }).catch(function(error){

                });

            }).catch(function(error){

            });
        }).catch(function(error){

        });

    };

    $scope.generatePDF = function() {kendo.drawing.drawDOM($("#capa")).then(function(group) {
        kendo.drawing.pdf.saveAs(group, "Converted PDF.pdf");
        });
    }

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

    obj.getGraphicsAmbitos = function()
    {
        return $http.get('http://localhost:8080/rest/groups/getGraphicsAmbitos');
    };

    return obj;

}]); 
