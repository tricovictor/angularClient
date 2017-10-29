
app.controller('TypologyCtrl', ['$scope', 'typologyFactory', function ($scope, typologyFactory) {

/*	typologyFactory.getTypologies().then(function(typologies)
	{
		$scope.typologies = typologies.data;
	}).catch(function(error){
		console.log(error);
	});
   $scope.typologies = typologyFactory.getTypologies()
   .then(function(){
   });*/
   

}]);


app.factory('typologyFactory', ['$http', function($http) 
{
    var urlService = 'http://localhost:8080/rest/typologies/';
    
    var obj = {};

    obj.getTypologies = function()
    {
        return $http.get(urlService + 'all');
    };

    return obj;

}]); 