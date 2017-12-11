
app.controller('LoginCtrl', ['$scope', '$location', '$http', 'loginFactory','routeini', function($scope, $location, $http, loginFactory, routeini) {

	$scope.submit = function()
	{
        var parameter = {
            'email': $scope.jUser,
            'password': $scope.jPass
        };
        parameter = JSON.stringify(parameter);
        var settings = {
          "async": true,
          "crossDomain": true,
            "url": routeini + "users/getLoginweb",
          "method": "POST",
          "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache"
          },
          "processData": false,
          "data": parameter
        }

        $.ajax(settings).done(function (response) {
            if(response.response){
                alert(response.response);
            } else {
                if (response.type == 'admin')
                {
                    localStorage.setItem("token", 'admin');
                    localStorage.setItem("tokenrgc", response.id);
                    window.location.replace("#!adminHome");
                } else {
                    localStorage.setItem("token", 'interviewer');
                    localStorage.setItem("tokenrgc", response.id);
                    window.location.replace("#!interviewerHome");
                }
            }
        });
	};

    $scope.logout = function()
    {
        localStorage.removeItem("token");
        window.location.replace("#!login");
    };

  }]);

app.factory('loginFactory', ['$http', 'routeini', function($http,routeini) 
{
    var urlService = routeini + 'users/';

    var obj = {};
     
    return obj;
}]); 
