angular.module('mapa',["ngMap"])
	.factory('markers', ["$scope", '$http', function () {
		$http.get("/camaras").then(function(response){
			$scope.camaras = response.data;
		});
  }]);
