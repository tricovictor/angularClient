
app.controller('DepartmentCtrl', ['$scope', 'departmentFactory', function ($scope, departmentFactory) {

	departmentFactory.getDepartments().then(function(departments)
	{
		$scope.departments = departments.data;
	}).catch(function(error){
		console.log(error);
	});

    if(localStorage.getItem('departmentId'))
    {
        departmentFactory.getDepartment(localStorage.getItem('departmentId')).then(function(department)
        {
            $scope.department = department.data;
            localStorage.removeItem('departmentId');
        }).catch(function(error){
            console.log(error);
        });
    }


    $scope.addDepartment = function()
    {
        var parameter = {
            name: $scope.name
        };
        parameter = JSON.stringify(parameter);

       var settings = {
          "async": true,
          "crossDomain": true,
          "url": "http://localhost:8080/rest/departments/add",
          "method": "POST",
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

    $scope.editDepartment = function(departmentId)
    {
        localStorage.setItem("departmentId", departmentId);
        window.location.replace("#!department/edit");
    };

    $scope.updateDepartment = function()
    {
        var parameter = {
            id: $scope.department.id,
            name: $scope.department.name
        };
        parameter = JSON.stringify(parameter);
        console.log($scope.department);
        console.log(parameter);
        departmentFactory.updateDepartment(parameter).then(function(response){
            alert(response.data.response);
        }).catch(function(error){
            console.log(error);
        });
        window.location.replace("#!adminHome");
    };

}]);


app.factory('departmentFactory', ['$http', function($http) 
{
    var urlService = 'http://localhost:8080/rest/departments/';
    
    var obj = {};

    obj.getDepartments = function()
    {
        return $http.get(urlService + 'all');
    };

    obj.getDepartment = function(id)
    {
        return $http.get(urlService + 'getDepartmentById/?id='+ id);
    };

    obj.updateDepartment = function(parameter)
    {
        return $http.put(urlService +'update', parameter);
    };

    return obj;

}]); 
