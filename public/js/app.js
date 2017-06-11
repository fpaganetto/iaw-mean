var app = angular.module('ctosApp',['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/',{ templateUrl: 'views/listaCamaras.html'})
		.when('/agregar',{ templateUrl: 'views/formularioCamara.html'});
}]);

app.controller("AddCamarasController", function($scope, $http){
	$scope.agregarCamara = function(){
		//console.log($scope.camara);
		$http.post('/camaras', $scope.camara);
	}
});

app.controller("ListCamarasController", function($scope, $http){
	$http.get("/camaras").then(function(response){
		//console.log(response.data);
		$scope.camaras = response.data;
	});
});