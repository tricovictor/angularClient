
app.controller('MunicipalityCtrl', ['$scope', 'municipalityFactory', function ($scope, municipalityFactory) {

	municipalityFactory.getMunicipalities().then(function(municipalities)
	{
		$scope.municipalities = municipalities.data;
	}).catch(function(error){
		console.log(error);
	});


    $scope.addMunicipality = function()
    {
        var parameter = {
            name: $scope.name,
            intendent: $scope.intendente,
            alcalde: $scope.alcalde,
            department_id: $scope.department_id,
            idioms: $scope.language,
            longitude: 0,
            latitude: 0,
            population: $scope.population,
            superficie: $scope.superficie,
            website: $scope.web
        };
        parameter = JSON.stringify(parameter);

       var settings = {
          "async": true,
          "crossDomain": true,
          "url": "http://localhost:8080/rest/municipalities/add",
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
          window.location.replace("#!adminHome");
        });
    };

}]);


app.factory('municipalityFactory', ['$http', function($http) 
{
    var urlService = 'http://localhost:8080/rest/municipalities/';
    
    var obj = {};

    obj.getMunicipalities = function()
    {
        return $http.get(urlService + 'all');
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

