var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: -38.7183177, lng: -62.2663478},
	  zoom: 14,
	  styles: [
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
          ]
	});

  var image = {
    //url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    url: './img/camara2.png',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(256, 256),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 0),
    //Reescalado
    scaledSize: new google.maps.Size(20, 20), // scaled size
  };

  //XXX
  app.run(function ($http) {
    console.log("running");
    $http.get("/camaras").then(function(response){
      camaras = response.data;
      console.log(camaras);
    })
  });
 
  var marker = new google.maps.Marker({
    position: {lat: -38.7183177, lng: -62.2663478},
    map: map,
    title: 'Hello World!',
    icon: image
  });


  var marker = new google.maps.Marker({
    position: {lat: -38.7183100, lng: -62.266},
    map: map,
    title: 'Adios World!',
    icon: image
  });
}