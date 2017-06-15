angular.module('mapa',[])
	.factory('markers', ["$scope", '$http', function () {
		$http.get("/camaras").then(function(response){
			$scope.camaras = response.data;
		});
  }]);
