    /* global google */
   (function() {
       function initialize() {
           var mapOptions = {
               center: {
                   lat: 52.173931692568,
                   lng: 18.8525390625
               },
               zoom: 6,
               scrollwheel: false,
               draggable: false,
               disableDefaultUI: true
           };
           var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
           var cities = {
               'poznan': {
                   'marker': new google.maps.Marker({
                       position: new google.maps.LatLng(52.467118, 16.927674),
                       map: map,
                       title: 'BrainCode Mobi #2 @ Poznań',
                       animation: google.maps.Animation.DROP
                   }),
                   'infoWindow': new google.maps.InfoWindow({
                       content: "<strong>Gdzie</strong>: Wydział Matematyki i Informatyki Uniwersytetu Adama Mickiewicza<br /><br /><strong>Ulica</strong>: Umultowska 87<br /><br /><strong>Start</strong>: 13.03.2015 17:00"
                   })
               },
               'torun': {
                   'marker': new google.maps.Marker({
                       position: new google.maps.LatLng(53.010038, 18.594946),
                       map: map,
                       title: 'BrainCode Mobi #2 @ Toruń',
                       animation: google.maps.Animation.DROP
                   }),
                   'infoWindow': new google.maps.InfoWindow({
                       content: "<strong>Gdzie</strong>: Wydział Matematyki i Informatyki Uniwersytetu Mikołaja Kopernika<br /><br /><strong>Ulica</strong>: Chopina 12/18<br /><br /><strong>Start</strong>: 13.03.2015 17:00"
                   })
               },
               'warszawa': {
                   'marker': new google.maps.Marker({
                       position: new google.maps.LatLng(52.211674, 20.981500),
                       map: map,
                       title: 'BrainCode Mobi #2 @ Warszawa',
                       animation: google.maps.Animation.DROP
                   }),
                   'infoWindow': new google.maps.InfoWindow({
                       content: "<strong>Gdzie</strong>: Wydział Matematyki, Informatyki i Mechaniki Uniwersytetu Warszawskiego<br /><br /><strong>Ulica</strong>: Stefana Banacha 2<br /><br /><strong>Start</strong>: 13.03.2015 17:00"
                   })
               },
               'krakow': {
                   'marker': new google.maps.Marker({
                       position: new google.maps.LatLng(50.067048, 19.915253),
                       map: map,
                       title: 'BrainCode Mobi #2 @ Kraków',
                       animation: google.maps.Animation.DROP
                   }),
                   'infoWindow': new google.maps.InfoWindow({
                       content: "<strong>Gdzie</strong>: Wydział Informatyki, Elektroniki i Telekomunikacji, Katedra Telekomunikacji, AGH<br /><br /><strong>Ulica</strong>: Czarnowiejska 78<br /><br /><strong>Start</strong>: 13.03.2015 17:00"
                   })
               }
           };
           var allCities = ['poznan', 'krakow', 'torun', 'warszawa'];
           var closeOther = function(selected) {
               allCities.forEach(function(city) {
                   if (city !== selected) {
                       cities[city]['infoWindow'].close();
                   }
               });
           };
           var centerOnCity = function(city) {
               cities[city].infoWindow.open(map, cities[city]['marker']);
               closeOther(city);
               map.setZoom(15);
               map.panTo(cities[city]['marker'].getPosition());
               return false;
           };
           allCities.forEach(function(city) {
               var init = function(current) {
                   google.maps.event.addListener(cities[current]['marker'], 'click', function() {
                       centerOnCity(current);
                   });
                   google.maps.event.addListener(cities[current]['infoWindow'], 'closeclick', function() {
                       map.setZoom(6);
                       map.setCenter(new google.maps.LatLng(52.173931692568, 18.8525390625));
                       closeOther(null);
                   });
               };
               init(city);
           });
           document.getElementById('cities').addEventListener('click', function(e) {
               var el = e.target;
               if (el.tagName === 'SPAN') {
                   var city = el.getAttribute('data-city');
                   centerOnCity(city);
               }
           });
       }
       google.maps.event.addDomListener(window, 'load', initialize);
   })()