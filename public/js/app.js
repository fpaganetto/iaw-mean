var app = angular.module('ctosApp',['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/',{ templateUrl: 'views/listaCamaras.html'})
		.when('/agregar',{ templateUrl: 'views/formularioCamara.html'});
}]);

app.controller("CamaraController",["$scope", '$http',function($scope, $http){
	
	refresh = function(){
		$http.get("/camaras").then(function(response){
			//console.log(response.data);
			$scope.camaras = response.data;
		})
	};

	refresh(); //Para cargar por primera vez

	$scope.agregarCamara = function(){
		//console.log($scope.camara);
		$http.post('/camaras', $scope.camara).then(function(response){
			refresh();
		});
	};
	$scope.eliminarCamara = function(id){
		//console.log("eliminando "+id);
		$http.delete('/camaras/'+id, $scope.camara).then(function(responde){
			refresh();
		});
	}
}]);