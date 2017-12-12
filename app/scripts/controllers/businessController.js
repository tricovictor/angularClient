app.controller('BusinessCtrl', ['$scope', 'businessFactory', 'routeini', function ($scope, businessFactory, routeini) {

    $scope.subambitos = {};

    businessFactory.getBusiness().then(function (business) {
        $scope.business = business.data;
    }).catch(function (error) {
        console.log(error);
    });

    businessFactory.getSubAmbitos().then(function (response) {
        $scope.subAmbitos = response.data;
    }).catch(function (error) {

    });

    if (localStorage.getItem('business_id')) {
        businessFactory.getBusines(localStorage.getItem('business_id')).then(function (busines) {
            $scope.busines = busines.data;
            localStorage.removeItem('business_id');
        }).catch(function (error) {
            console.log(error);
        });
    }

    $scope.addBusiness = function () {
        var parameter = {
            name: $scope.name,
            description: $scope.description,
            address: $scope.address,
            phone: $scope.phone
        };
        parameter = JSON.stringify(parameter);

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": routeini + "business/add",
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
            },
            "processData": false,
            "data": parameter
        };
        $.ajax(settings).done(function (response) {
            $scope.message = response;
            console.log(response);
            window.location.replace("#!adminHome");
        });
    };

    $scope.editBusiness = function (business_id) {
        localStorage.setItem("business_id", business_id);
        window.location.replace("#!business/edit");
    };

    $scope.updateBusiness = function () {
        var parameter = {
            id: $scope.busines.id,
            name: $scope.busines.name,
            description: $scope.busines.description,
            address: $scope.busines.address,
            phone: $scope.busines.phone
        };
        parameter = JSON.stringify(parameter);
        businessFactory.updateBusiness(parameter).then(function (response) {
        }).catch(function (error) {
            console.log(error);
        });
        window.location.replace("#!adminHome");
    };

    $scope.businessSubAmbito = function (business_id) {
        localStorage.setItem("business_id", business_id);
        window.location.replace("#!business/businessSubAmbitos");

    };

    $scope.updateSubAmbito = function () {
        var sub_ambitos = [];
        for (var propiedad in $scope.subambitos) {
            sub_ambitos.push(propiedad);
        }
        var parameter = {
            id: $scope.busines.id,
            subambitos: sub_ambitos.toString()
        };

        businessFactory.getBusinessSubAmbito($scope.busines.id, sub_ambitos).then(function (response) {
            console.log(response);
        }).catch(function (error) {

        });
        /*        console.log(parameter);
        parameter = JSON.stringify(parameter);

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": routeini + "business/updateSubAmbitos",
         "method": "GET",
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
         window.location.replace("#!adminHome");*/
    };

    $scope.generatePDF = function () {
        kendo.drawing.drawDOM($("#capa")).then(function (group) {
            kendo.drawing.pdf.saveAs(group, "Converted PDF.pdf");
        });

    };


}]);

app.factory('businessFactory', ['$http', 'routeini', function ($http, routeini) {
    var urlService = routeini;

    var obj = {};

    obj.getBusines = function (id) {
        return $http.get(urlService + 'business/getBusinessById?id=' + id);
    };

    obj.updateBusiness = function (parameter) {
        return $http.put(urlService + 'business/update', parameter);
    };

    obj.getBusiness = function () {
        return $http.get(urlService + 'business/all');
    };

    obj.getSubAmbitos = function () {
        return $http.get(urlService + 'subambitos/all');
    };

    obj.getBusinessSubAmbito = function (id, subambitos) {
        return $http.get(urlService + 'business/updateSubAmbitos?id=' + id + '&subambitos=' + subambitos);
    }

    return obj;

}]); 
