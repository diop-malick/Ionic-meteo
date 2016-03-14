 /* =================================================================================
                                                         GEO LOCATION 
                                                         ================================================================================= */

 app.controller('GeoCtrl', function($scope, $ionicLoading, $cordovaGeolocation, StorageService) {

     console.log('coucou geo');

     $ionicLoading.show({
         template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
     });

     var counter;
     var currentLatitude;
     var currentLongitude;
     var markers = [];

     var posOptions = {
         enableHighAccuracy: true,
         timeout: 10000,
         maximumAge: 0
     };

     $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
             var lat = position.coords.latitude;
             var lng = position.coords.longitude;

             currentLatitude = position.coords.latitude;
             currentLongitude = position.coords.longitude;

             // var theLatlng = new google.maps.LatLng(lat, long);
             var latLng = new google.maps.LatLng(lat, lng);

             $scope.position = position;
             // CEATE THE MAP
             var mapOptions = {
                 center: latLng,
                 zoom: 15,
                 mapTypeId: google.maps.MapTypeId.ROADMAP
             };
             $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
             // MARKER, Wait until the map is loaded
             // idle : This event is fired when the map becomes idle after panning or zooming.
             google.maps.event.addListenerOnce($scope.map, 'idle', function() {
                 $scope.newMarker(position, $scope.map);
             });
             // LOADING
             $ionicLoading.hide();
             // watcher
             $scope.watchThePosition($scope.map);

         },
         function(err) {
             $ionicLoading.hide();
             console.log("Could not get location");
             console.log(err);
         });

     // WATCHER 
     // pas besoin de passer la map en param s'il est dans le scop
     $scope.watchThePosition = function() {
         var watchOptions = {
             enableHighAccuracy: true,
             timeout: 20000 // ts les 2 secondes
         };
         watch = $cordovaGeolocation.watchPosition(watchOptions);
         watch.then(
             null,
             function(err) {
                 console.log(err);
             },
             function(position) {
                 if (position.coords.latitude != currentLatitude && position.coords.longitude != currentLongitude) {
                     console.log(position);
                     $scope.position = position;
                     $scope.newMarker(position, $scope.map);
                     //update current position vlaues
                     currentLatitude = position.coords.latitude;
                     currentLongitude = position.coords.longitude;
                     console.log(currentLatitude + "-" + currentLongitude);
                 }
             }
         );
     }

     // ADD NEW MARKER
     $scope.newMarker = function(position) {
         var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
         //Add a Marker
         var marker = new google.maps.Marker({
             // map: $scope.map,
             animation: google.maps.Animation.DROP,
             position: latLng,
             title: "Je suis ici - Position " + (++counter),
             label: "H"
         });
         marker.setMap($scope.map);
         // marker.setMap(null); // masquer le marqueur

         markers.push(marker);

         // add a pop up window when a user taps the marker to give them a little more information.
         var infoWindow = new google.maps.InfoWindow({
             content: "Here I am!"
         });

         google.maps.event.addListener(marker, 'click', function() {
             infoWindow.open($scope.map, marker);
         });

         StorageService.addPosition({
             lat: position.coords.latitude,
             lng: position.coords.longitude
         });

         $scope.alltraj = StorageService.getAllPositions();
     }

     // SHWO TRAJECT
     $scope.showTraject = function() {
         traj = StorageService.getAllPositions();
         traj.forEach(function(p) {
             $scope.showMarker(p);
         });
     }
     $scope.hideTraject = function() {
         markers.forEach(function(m) {
             m.setMap(null);
         });
     }

     $scope.showMarker = function(pos) {
         latLng = new google.maps.LatLng(pos.lat, pos.lng);
         marker = new google.maps.Marker({
             position: latLng,
             label: "F"
         });
         marker.setMap($scope.map);
         markers.push(marker);
     }

 });
