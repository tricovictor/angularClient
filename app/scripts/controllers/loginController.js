
app.controller('LoginCtrl', ['$scope', '$location', '$http', 'loginFactory', function($scope, $location, $http, loginFactory) {

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
          "url": "http://localhost:8080/rest/users/getLogin",
          "method": "POST",
          "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache"
          },
          "processData": false,
          "data": parameter
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
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

app.factory('loginFactory', ['$http', function($http) 
{
    var urlService = 'http://localhost:8080/rest/users/';

    var obj = {};
     
    return obj;
}]); 
