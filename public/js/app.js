angular.module('mapa',["ngMap"]); //definición de módulo, código en map.js

var app = angular.module('ctosApp',['ngRoute','ngMap']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/',{ templateUrl: '/views/abmCamara.html'})
		.when('/agregar',{ templateUrl: '/views/formularioCamara.html'})
		.when('/mapa',{ templateUrl: '/views/mapa.html'});
}]);

app.controller("CamaraController",["$scope", '$http',function($scope, $http){

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
	}
}]);

app.directive("directivaEditar", function() {
  var linkFunction = function(scope, element, attributes) {
  	//Element es un arreglo, el [0] es el elemento DOM?
  	e = element;
  	console.log(element);
    var paragraph = element.children()[0];
    $(paragraph).on("click", function() {
      $(this).css({ "background-color": "red" });
    });
  };

  return {
    restrict: "E",
    link: linkFunction
  };
});