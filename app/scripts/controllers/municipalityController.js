
app.controller('MunicipalityCtrl', ['$scope', 'municipalityFactory','routeini', function ($scope, municipalityFactory, routeini) {

    $scope.municipality = null;

    municipalityFactory.getDepartments().then(function(departments)
    {
        $scope.departments = departments.data;
    }).catch(function(error){
        console.log(error);
    });

    municipalityFactory.getTipologies().then(function(tipologies){
        $scope.tipologies = tipologies.data;
    }).catch(function(error){
        console.log(error);
    });
	municipalityFactory.getMunicipalities().then(function(municipalities)
	{
		$scope.municipalities = municipalities.data;
	}).catch(function(error){
		console.log(error);
	});

    if(localStorage.getItem('municipality_id'))
    {
        municipalityFactory.getMunicipality(localStorage.getItem('municipality_id')).then(function(municipality)
        {
            $scope.municipality = municipality.data;
            localStorage.removeItem('municipality_id');
        }).catch(function(error){
            console.log(error);
        });
    }

    $scope.addMunicipality = function()
    {
        var parameter = {
            name: $scope.name,
            intendent: $scope.intendente,
            alcalde: $scope.alcalde,
            departmentId: $scope.departmentId,
            idioms: $scope.language,
            longitude: 0,
            latitude: 0,
            habitants: $scope.population,
            superficie: $scope.superficie,
            tipologyId: $scope.tipologyId,
            website: $scope.web
        };
        parameter = JSON.stringify(parameter);
        console.log(parameter);
       var settings = {
          "async": true,
          "crossDomain": true,
          "url": routeini+"municipalities/add",
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

    $scope.editMunicipality = function(municipality_id)
    {
        localStorage.setItem("municipality_id", municipality_id);
        window.location.replace("#!municipality/edit");
    };

    $scope.updateMunicipality = function()
    {
        var parameter = {
            id: $scope.municipality.id,
            name: $scope.municipality.name,
            intendent: $scope.municipality.intendent,
            alcalde: $scope.municipality.alcalde,
            departmentId: $scope.municipality.department_id,
            idioms: $scope.municipality.idioms,
            longitude: 0,
            latitude: 0,
            habitants: $scope.municipality.habitants,
            superficie: $scope.municipality.superficie,
            tipologyId: $scope.municipality.tipologyId,
            website: $scope.municipality.website
        };
        parameter = JSON.stringify(parameter);
        console.log($scope.municipality);
        console.log(parameter);
        municipalityFactory.updateMunicipality(parameter).then(function(response){
            console.log(response);
        }).catch(function(error){
            console.log(error);
        });
        window.location.replace("#!adminHome");
    };


}]);


app.factory('municipalityFactory', ['$http', 'routeini', function($http, routeini) 
{
    var urlService = routeini;
    
    var obj = {};

    obj.getMunicipalities = function()
    {
        return $http.get(urlService + 'municipalities/all');
    };

    obj.getMunicipality = function(id)
    {
        return $http.get(urlService + 'municipalities/getMunicipalityById/?id='+ id);
    };

    obj.updateMunicipality = function(parameter)
    {
        return $http.put(urlService +'municipalities/update', parameter);
    };

    obj.getDepartments = function()
    {
        return $http.get(urlService + 'departments/all');
    };

    obj.getTipologies = function()
    {
        return $http.get(urlService + 'tipologies/all');
    };

    return obj;

}]); 


function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    disableDefaultUI: true,
    zoom: 13
    });

    //var infoAqui = new google.maps.InfoWindow({map: map});

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

//            infoAqui.setPosition(pos);
//            infoAqui.setContent('Ud. Está Aqui.');
            map.setCenter(pos);

            var locations = [];
            $.getJSON('http://reservocancha.com/api/getComplexGeolocalization', function(data) {
            var infoWindow = new google.maps.InfoWindow();
                
                for(var i=0; i<data.length; i++) {
                    locations.push({id: data[i].id, latlng: new google.maps.LatLng(data[i].latitude , data[i].longitude) });
                    var dist = distance(pos.lat, pos.lng, locations[i].latlng.lat(), locations[i].latlng.lng());
                    if(dist<50) {
                        dist = dist.toString();
                        var iwContent = locations[i].id;
                        createMarker(locations[i].latlng, locations[i].name, iwContent); 
                    }

                }
                
                createMyMarker(pos,"Estoy aqui",null);

                function createMarker(latlng, title, iwContent) {
                    var marker = new google.maps.Marker({
                            position: latlng,
                            map: map,
                            title: title,
                           /* label: iwContent,*/
                            animation: google.maps.Animation.DROP,
                            labelClass: "my-custom-class-for-label",
                            icon:'http://reservocancha.com/storage/images/marker.png'
                        });
                    google.maps.event.addListener(marker, 'click', function(){
                        localStorage.setItem("cardId", iwContent);
                        window.location.replace("#!player/card");
                        });
                }

                function createMyMarker(latlng, title, iwContent) {
                    var marker = new google.maps.Marker({
                            position: latlng,
                            map: map,
                            title: title,
                            label: iwContent,
                            animation: google.maps.Animation.DROP,
                            labelClass: "my-custom-class-for-label",
                            icon:'http://reservocancha.com/storage/images/aqui.png'
                        });
                }

            });

        }, 

        function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }
    
    function distance(lat1, lng1, lat2, lng2) {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var radlon1 = Math.PI * lng1 / 180;
        var radlon2 = Math.PI * lng2 / 180;
        var theta = lng1 - lng2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;

        //Get in in kilometers
        dist = dist * 1.609344;
        dist = dist.toFixed(1);

        return dist;
    }

    $('#uno').on('click', function(){map.setCenter(new google.maps.LatLng(-34.795940,-54.929188))});
    $('#dos').on('click', function(){var pos = new google.maps.LatLng(-34.790855,-54.900707);map.setCenter(pos);});
    $('#tre').on('click', function(){var pos = new google.maps.LatLng(-34.792362,-54.916908);map.setCenter(pos);});
    $('#cua').on('click', function(){var pos = new google.maps.LatLng(-34.796989,-54.913521);map.setCenter(pos);});
    $('#cin').on('click', function(){var pos = new google.maps.LatLng(-34.791569,-54.909138);map.setCenter(pos);});
    $('#sei').on('click', function(){var pos = new google.maps.LatLng(51.97,5.66667);map.setCenter(pos);});

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}

