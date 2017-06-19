app.controller('MapController', ["$scope", '$http', 'NgMap',function($scope, $http, NgMap){

	$scope.comentarios_id = 'main';
	$scope.comentarios_url = 'http://localhost:3000/#!/';
	$scope.comentarios_title = 'Comentarios Generales';

	console.log($scope.comentarios_title);
	console.log($scope.comentarios_id);
	console.log($scope.comentarios_url);


	NgMap.getMap().then(function(map) {
	    app.map = map;	//variable para acceder al mapa
	});

	var styleArray = [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ];
	$scope.estilo = styleArray;

	$http.get("/camaras").then(function(response){
			$scope.camaras = response.data;
	})

	$scope.mostrarComentarios = function(event, id) {

		console.log(this);

		var title = this.title;
		console.log("title: ")
		console.log(title);
		title = title.split('~');
		var nombre = title[0];
		var id = title[1];

		console.log(id, nombre);
		$scope.comentarios_id = id;
		$scope.comentarios_url = 'http://localhost:3000/#!/';
		$scope.comentarios_title = nombre;

		DISQUS.reset({
		  reload: true,
		  config: function () {
		    this.page.identifier = $scope.comentarios_id;
		    this.page.url = $scope.comentarios_url;
		  }
		});
	}

}]);
