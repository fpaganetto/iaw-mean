angular.module('mapa',["ngMap"]); //definición de módulo, código en map.js

var app = angular.module('ctosApp',['ngRoute','ngMap']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/',{ templateUrl: '/views/mapa.html'})
		.when('/mapa',{ templateUrl: '/views/mapa.html'})
		.when('/admin',{ templateUrl: '/views/admin.html'})
		.when('/abm',{ templateUrl: '/views/abmCamara.html'})
		.when('/prueba',{ templateUrl: '/views/prueba.html'});
}]);

app.controller("CamaraController",["$scope", '$http', '$window', function($scope, $http, $window){

	//Editor
	$scope.formEditar = 0;
	$scope.toggleEditor = function (id) {
		if ($scope.formEditar == id) //Si ya hay uno, lo desactiva
			$scope.formEditar = 0;
		else $scope.formEditar = id;
	};

	//PUT
	$scope.editarCamamara = function(camara){
		//console.log(camara);
		$http.post('/auth/camaras/editar/'+camara._id, {token: $window.sessionStorage.getItem("token"), camara: $scope.camara}).then(function(response){
			refresh();
			Materialize.toast('Camara editada', 4000, "rounded");
		}).catch(errorABM);
		$scope.toggleEditor(camara._id);
	}

	//GET
	refresh = function(){
		$http.get("/camaras").then(function(response){
			//console.log(response.data);
			$scope.camaras = response.data;
			actualizarAutocompletar(response.data);
		})
	};

	refresh(); //Para cargar por primera vez

	//POST
	$scope.agregarCamara = function(){
		//console.log($scope.camara);
		$http.post('/auth/camaras/agregar/', {token: $window.sessionStorage.getItem("token"),camara: $scope.camara}).then(function(response){
			refresh();
		}).catch(errorABM);
		$scope.camara = null;
	};

	//DELETE
	$scope.eliminarCamara = function(id){
		//console.log("eliminando "+id);
		$http.post('/auth/camaras/eliminar/'+id, {token: $window.sessionStorage.getItem("token")}).then(function(responde){
			refresh();
			Materialize.toast('Camara eliminada', 4000, "rounded");
		}).catch(errorABM);
	}	
}]);

app.controller("LoginController", function($scope, $http, $window){
	$scope.login = function(){
		$http.post('/auth/login', {username: $scope.username, password: $scope.password}).then(function(response){
			console.log(response);
			if(response.data.success){//Si el login es exitoso, guardo el mensaje
				$window.sessionStorage.setItem("token", response.data.token);
				$window.location.href = '#!abm';
			}
			else Materialize.toast(response.data.message, 4000, "rounded"); //Sino error
		});
	}
});

errorABM = function(){
			Materialize.toast("Acceso denegado", 4000, "rounded");
		}