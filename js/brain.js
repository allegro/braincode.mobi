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
                disableDefaultUI: true,
                backgroundColor: '#ffffff'
            };
            var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
            var citiesInfo = [{
                city: "poznan",
                position: new google.maps.LatLng(52.467118, 16.927674),
                title: "BrainCode Mobi #2 @ Poznań",
                place: "Wydział Matematyki i Informatyki Uniwersytetu Adama Mickiewicza",
                street: "Umultowska 87",
                start: "13.03.2015 17:00"
            }, {
                city: "torun",
                position: new google.maps.LatLng(53.010038, 18.594946),
                title: "BrainCode Mobi #2 @ Toruń",
                place: "Wydział Matematyki i Informatyki Uniwersytetu Mikołaja Kopernika",
                street: "Chopina 12/18",
                start: "13.03.2015 17:00"
            }, {
                city: "warszawa",
                title: "BrainCode Mobi #2 @ Warszawa",
                position: new google.maps.LatLng(52.211674, 20.981500),
                place: "Wydział Matematyki, Informatyki i Mechaniki Uniwersytetu Warszawskiego",
                street: " Stefana Banacha 2",
                start: "13.03.2015 17:00"
            }, {
                city: "krakow",
                position: new google.maps.LatLng(50.067048, 19.915253),
                title: "BrainCode Mobi #2 Kraków",
                place: "Wydział Informatyki, Elektroniki i Telekomunikacji, Katedra Telekomunikacji, AGH",
                street: "Czarnowiejska 78",
                start: "13.03.2015 17:00"
            }];
            var cities = citiesInfo.map(function(city) {
                var url = "http://maps.google.com/maps?ll=" + city.position.k + "," + city.position.D + "&z=14&t=m&hl=pl&gl=US&q=" + city.place;
                var content = "<strong>Gdzie: </strong>" + city.place + "<br/><strong>Ulica: </strong>" + city.street + "<br/><strong>Start: </strong>" + city.start + "<br/><a href=" + encodeURI(url) + ">Zobacz w Mapach Google.</a>";
                return {
                    marker: new google.maps.Marker({
                        position: city.position,
                        map: map,
                        title: city.title,
                        animation: google.maps.Animation.DROP
                    }),
                    infoWindow: new google.maps.InfoWindow({
                        content: content,
                        maxWidth: 300
                    }),
                    city: city.city
                };
            });
            var closeOther = function(selected) {
                cities.forEach(function(city) {
                    if (city.city !== selected) {
                        city.infoWindow.close();
                    }
                });
            };
            var centerOnCity = function(city) {
                var cityCenter = cities.filter(function(item) {
                    return item.city === city;
                })[0];
                cityCenter.infoWindow.open(map, cityCenter.marker);
                closeOther(city);
                map.setZoom(15);
                map.panTo(cityCenter.marker.getPosition());
                return false;
            };
            cities.forEach(function(city) {
                google.maps.event.addListener(city.marker, 'click', function() {
                    centerOnCity(city.city);
                });
                google.maps.event.addListener(city.infoWindow, 'closeclick', function() {
                    map.setZoom(6);
                    map.setCenter(new google.maps.LatLng(52.173931692568, 18.8525390625));
                    closeOther(null);
                });
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
    })();