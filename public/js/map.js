angular.module('mapa',["ngMap"])

.controller("MapController",["$scope", '$http',function($scope, $http){

	refresh = function(){
		$http.get("/camaras").then(function(response){
			//console.log(response.data);
			$scope.camaras = response.data;
		})}
	}]);
