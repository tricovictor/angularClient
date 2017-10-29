
app.controller('LoginCtrl', ['$scope', '$location', '$http', function($scope, $location, $http) {

	$scope.submit = function()
	{
        var parameter = {
            'email': $scope.jUser,
            'password': $scope.jPass
        };
        loginFactory.getLogin(parameter).then(function(user,status,headers,config){
            $scope.user = user.data;
            console.log(user);
            if(user.data.response){
                alert(user.data.response);
            } else {
            	if (user.data.type == 'admin')
            	{
                	localStorage.setItem("token", 1);
            	} else {
                	localStorage.setItem("token", 2);
            	}

                localStorage.setItem("id", user.data.id);
                if(user.data.type=='admin'){
                    window.location.replace("#!adminHome");
                }
                if(user.data.type=='interviewer'){
                    window.location.replace("#!interviewerHome");
                }
            }
        });
        window.location.replace("#!interviewerHome");
	};



  }]);

app.factory('loginFactory', ['$http', function($http) 
{
    var urlService = 'http://localhost/api/';
    
    var obj = {};

    obj.getUsers = function()
    {
        return $http.get(urlService + 'user');
    };

    obj.getUser = function(id)
    {
        return $http.get(urlService + 'user/' + id);
    }
    obj.getLogin = function(parameter)
    {
        return $http.post(urlService + 'getlogin',parameter);
    };
     
    return obj;
}]); 
