var app = angular.module('ctosApp',['ngRoute','ngMap', 'ngDisqus']);

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
		console.log(camara);
		$http.put('/auth/camaras/'+camara._id, {token: $window.sessionStorage.getItem("token"), camara: camara}).then(function(response){
			refresh();
			Materialize.toast('Camara editada', 4000, "rounded");
		}).catch(toastError);
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
		$http.post('/auth/camaras/', {token: $window.sessionStorage.getItem("token"),camara: $scope.camara}).then(function(response){
			refresh();
			Materialize.toast('Camara agregada', 4000, "rounded");
		}).catch(toastError);
		$scope.camara = null;
	};

	//DELETE
	$scope.eliminarCamara = function(id){
		//console.log("eliminando "+id);
		$http.post('/auth/camaras/eliminar/'+id, {token: $window.sessionStorage.getItem("token")}).then(function(response){
			refresh();
			Materialize.toast('Camara eliminada', 4000, "rounded");
		}).catch(toastError);
	}

	toastError = function(e){
		Materialize.toast("Error "+e.status+"\n"+e.statusText, 4000, "rounded");
	}
}]);

app.controller("LoginController", function($scope, $http, $window, $rootScope){

	//función que permite desde cualquier lado saber si el admin está logueado
	$rootScope.logueado = function () {
		return $window.sessionStorage.getItem("token") != null;
	}

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
