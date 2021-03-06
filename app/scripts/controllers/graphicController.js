app.controller('GraphicCtrl', ['$scope', 'graphicFactory', 'routeini', function ($scope, graphicFactory, routeini) {


    graphicFactory.getAmbitos().then(function(ambitos)
    {
        $scope.ambitos = ambitos.data;
    }).catch(function(error){
    });

    graphicFactory.getMunicipalities().then(function(municipalities)
    {
        $scope.municipalities = municipalities.data;
    }).catch(function(error){
    });

    graphicFactory.getSurveys().then(function(surveys)
    {
        $scope.surveys = surveys.data;
        $scope.surveysDrop = surveys.data;
        varios();
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
        setTimeout(function () {
        }, 1000);

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

    /*    INICIO GRAFICO DE RADAR*/
    function getGraphicsRadar(survey){
        graphicFactory.getGraphics(survey).then(function(response){
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

                    for (var j = 0; j < datos.length; j++)
                    {
                        var lab = document.createElement("label");
                        lab.setAttribute('id','lab'+datosarray);
                        lab.setAttribute('style', 'font-weight: normal; color: #B4886B;');
                        capa.appendChild(lab);
                        /*
                        document.getElementById('lab'+datosarray).innerHTML = labeles[j]+': '+datos[j];
                         */
                        document.getElementById('lab' + datosarray).innerHTML =
                            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
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

    /*    INICIO GRAFICO DE BARRAS*/
    function getGraphicsBar(survey){
        graphicFactory.getGraphics(survey).then(function(response){
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

                    var capabar = document.getElementById("capa");
                    var ctx = document.createElement("canvas");
                    ctx.setAttribute('id',numero);
                    ctx.setAttribute('width','80%');
                    capa.appendChild(ctx);
                    /*   for (var j = 0; j < datos.length; j++)
                    {
                        var lab = document.createElement("label");
                        lab.setAttribute('id','lab'+datosarray);
                        lab.setAttribute('style', 'font-weight: normal; color: #B4886B;');
                        capa.appendChild(lab);
                        document.getElementById('lab' + datosarray).innerHTML = labeles[j] + ': ' + datos[j]
                            + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
                        datosarray++;
                     }*/


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
                                xAxes: [{
                                    display: false
                                }],
                                yAxes: [{
                                    display: true
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

    /*    INICIO GRAFICO DE GRUPOS*/
    function getGraphicsGroups(survey){
        graphicFactory.getGraphicsGroups(survey).then(function (response) {
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
                        var capa = document.getElementById("capa");
                        var ctx = document.createElement("canvas");
                        ctx.setAttribute('id',numero);
                        capa.appendChild(ctx);

                        /*      for (var j = 0; j < datos.length; j++)
                        {
                            var lab = document.createElement("label");
                            lab.setAttribute('id','lab'+datosarray);
                            lab.setAttribute('style', 'font-weight: normal; color: #B4886B;');
                            capa.appendChild(lab);
                            document.getElementById('lab' + datosarray).innerHTML = labeles[j] + ': ' + datos[j]
                                + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
                            datosarray++;
                        }
                         */
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
                                    xAxes: [{
                                        display: false
                                    }],
                                    yAxes: [{
                                          gridLines: {
                                            zeroLineColor: "black",
                                            zeroLineWidth: 2
                                          },
                                          ticks: {
                                            min: 0,
                                            max: 100,
                                            stepSize: 10
                                          },
                                          scaleLabel: {
                                            display: true,
                                            labelString: "Cubrimiento"
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

    /*    INICIO GRAFICO POR AMBITO*/
    function getGraphicsXAmbito(survey){
        graphicFactory.getGraphicsAmbitos(survey).then(function (response) {
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
                            var capa = document.getElementById("capa");
                            var ctx = document.createElement("canvas");
                            ctx.setAttribute('id',numero);
                            capa.appendChild(ctx);

                            for (var j = 0; j < datos.length; j++)
                            {
                                var lab = document.createElement("label");
                                lab.setAttribute('id','lab'+datosarray);
                                lab.setAttribute('style', 'font-weight: normal; color: #B4886B;');
                                capa.appendChild(lab);
                                /*document.getElementById('lab' + datosarray).innerHTML = labeles[j] + ': ' + datos[j]
                                 + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';*/
                                document.getElementById('lab' + datosarray).innerHTML =
                                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                                    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
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

    $scope.generatePDF = function() {kendo.drawing.drawDOM($("#capa")).then(function(group) {
        kendo.drawing.pdf.saveAs(group, "Converted PDF.pdf");
        });
    }


}]);


app.factory('graphicFactory', ['$http', 'routeini', function ($http, routeini)
{
    var urlService = routeini;

    var obj = {};

    obj.getAmbitos = function()
    {
        return $http.get(urlService + 'ambitos/all');
    };


    obj.getSurveys = function () {
        return $http.get(urlService + 'surveys/all');
    };

    obj.getGraphics = function(id)
    {
    	return $http.get(urlService + 'groups/getGraphics?id=1');
    };

    obj.getGraphicsGroups = function (id)
    {
        return $http.get(urlService + 'groups/getGraphicsGroup?id=' + id);
    };

    obj.getGraphicsAmbitos = function (id)
    {
        return $http.get(urlService + 'groups/getGraphicsAmbitos?id=' + id);
    };

    obj.getMunicipalities = function() {
        return $http.get(urlService + 'municipalities/all');
    };

    return obj;

}]); 
