
app.controller('DepartmentCtrl', ['$scope', 'departmentFactory', function ($scope, departmentFactory) {

	departmentFactory.getDepartments().then(function(departments)
	{
		$scope.departments = departments.data;
	}).catch(function(error){
		console.log(error);
	});

}]);


app.factory('departmentFactory', ['$http', function($http) 
{
    var urlService = 'http://localhost:8080/rest/departments/';
    
    var obj = {};

    obj.getDepartments = function()
    {
        return $http.get(urlService + 'all');
    };

    return obj;

}]); 
