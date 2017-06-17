angular.module('mapa',["ngMap"]); //definición de módulo, código en map.js

var app = angular.module('ctosApp',['ngRoute','ngMap']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/',{ templateUrl: '/views/abmCamara.html'})
		.when('/agregar',{ templateUrl: '/views/formularioCamara.html'})
		.when('/mapa',{ templateUrl: '/views/mapa.html'})
		.when('/prueba',{ templateUrl: '/views/prueba.html'});
}]);

app.controller("CamaraController",["$scope", '$http',function($scope, $http){

	//Editor
	$scope.formEditar = 0;
	$scope.toggleEditor = function (id) {
		if ($scope.formEditar == id) //Si ya hay uno, lo desactiva
			$scope.formEditar = 0;
		else $scope.formEditar = id;
	};

	$scope.editarCamamara = function(id){
		console.log($scope.camara);
		$http.post('/camaras/editar/'+id, $scope.camara).then(function(responde){
			refresh();
		});
		Materialize.toast('Camara editada', 4000, "rounded");
		$scope.toggleEditor(id);
	}

	//Refresh list
	refresh = function(){
		$http.get("/camaras").then(function(response){
			//console.log(response.data);
			$scope.camaras = response.data;
			actualizarAutocompletar(response.data);
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
		Materialize.toast('Camara eliminada', 4000, "rounded");
	}	
}]);