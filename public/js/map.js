angular.module('mapa',["ngMap"])

.controller("MapController",["$scope", '$http',function($scope, $http){

	refresh = function(){
		$http.get("/camaras").then(function(response){
			$scope.camaras = response.data;
		})}
	}]);

//archivo inútil???
