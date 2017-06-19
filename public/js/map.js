app.controller('MapController', ["$scope", '$http', 'NgMap', '$location', '$rootScope',function($scope, $http, NgMap, $location, $rootScope){

	$rootScope.marcador = {};

	//datos iniciales
	$rootScope.marcador.latitud = "-38.7183177";
	$rootScope.marcador.longitud = "-62.2663478";
	$rootScope.marcador.zoom = "14";

	$rootScope.comentarios_id = 'main';
	$rootScope.comentarios_url = 'http://localhost:3000/#!/';
	$rootScope.comentarios_title = 'Comentarios Generales';

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

	//obtener los datos de las cámaras desde nuestra API
	$http.get("/camaras").then(function(response){
			$scope.camaras = response.data;
	})

	//obtener los datos de delitos desde la municipalidad
	var limite = 100;
	$http.get("http://api.datos.bahiablanca.gob.ar/api/v2/datastreams/SEGUR-MAPA-DEL-DELIT-11354/data.json/?auth_key=898a9afe2b8b1bc741654a15b5c77427c57cc7dd&limit="+limite).then(function(response){
			//Los primeros 6 elementos del arreglo tienen los nombres de los campos correspondientes, luego cada fila tiene el formato
			//[Fecha, evento, lat, lng, aprehension, casos] para identificar hechos delictuales
			var datos = response.data.result.fArray; //arreglo con los limite*6 elementos
			console.log(datos);
			var delitos = {};
			var i = 6;
			var j = 0;
			//valor máximo 300 porque pedimos 50 casos y el primero corresponde en realidad a los nombres de los campos
			for (i = 6; i < limite*6; i+=6) {
				delitos[j] = { fecha: datos[i].fStr,
											evento: datos[i+1].fStr,
											latitud: datos[i+2].fStr,
											longitud: datos[i+3].fStr,
											aprehension: datos[i+4].fStr,
											casos: datos[i+5].fStr};
				j++;
			}
			console.log(delitos);
			$scope.delitos = delitos;
	})


	$scope.mostrarComentarios = function(event, camara) {

		//Uso de rootScope para que puede ser accedido desde un div que no está en el scope de este controller
		$rootScope.marcador = camara;
		//$rootScope.marcador.zoom = "14"; //estas dos líneas hacen que vuelva a hacer zoom si se salió de él
		app.map.setZoom(18);
		console.log("marcador: ")
		console.log($rootScope.marcador);

		$rootScope.comentarios_id = camara._id;
		$rootScope.comentarios_url = 'http://localhost:3000/#!/mapa/'+camara.nombre;
		$rootScope.comentarios_title = camara.nombre;

		console.log($rootScope.comentarios_id, $rootScope.comentarios_title, $rootScope.comentarios_url);

		//Necesario para cambiar el thread en aplicaciones AJAX o Single Page
		DISQUS.reset({
		  reload: true,
		  config: function () {
		    this.page.identifier = camara._id;
		    this.page.url = 'http://localhost:3000/#!/mapa/'+camara.nombre;
				this.page.title =  camara.nombre;
		  }
		});
	}

}]);
