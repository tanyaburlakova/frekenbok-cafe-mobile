$(() => {
    var
        map,
        mapDirection,
        $body = $('body'),
        $popups = $('.jsPopupEl'),
        $section = $('.jsScrollToEl'),
        // classes
        showPopup = 'is-show-popup',
        noScroll = 'is-no-scroll';


    $(".jsOpinionsCarousel").owlCarousel({
        items: 1,

        // Events
        touchDrag: false,

        //Autoplay
        autoplay: true,
        autoplayTimeout: 8000,

        //Pagination
        dots: true,

        // Other
        addClassActive: true,
        loop: true,
        singleItem: true,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut'
    });

    $('.jsConceptCarousel').owlCarousel({
        items: 1,

        // Events
        touchDrag: false,

        // Other
        addClassActive: true,
        loop: true,
        dots: false,
        nav: true,
        navText: false,
        singleItem: true,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut'
    });

    $('.jsReviewsCarousel').owlCarousel({
        items: 1,

        // Events
        touchDrag: false,

        // Other
        addClassActive: true,
        loop: true,
        dots: false,
        nav: true,
        navText: false,
        singleItem: true,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut'
    });

    // show/hide site popups
    $('.jsPopupHandler').on('click', function(e) {
        e.preventDefault();

        var
            currentClass = $(this).data('popup-handler'),
            currentPopup = $popups.filter('[data-popup-el="' + currentClass + '"]');
        // vars

        if (!(currentPopup.hasClass(showPopup))) {
            currentPopup.addClass(showPopup);
            $body.addClass(noScroll);
        } else {
            currentPopup.removeClass(showPopup);
            $body.removeClass(noScroll);
        }
    });

    $('.jsPopupClose').on('click', function(e) {
        e.preventDefault();

        $(this).closest('.jsPopupEl').removeClass(showPopup);
        $body.removeClass(noScroll);
    });

    // scroll to selected section
    $('.jsScrollToHandler').on('click', function(e) {
        e.preventDefault();

        var currentHadler = $(this).attr('href'),
            currentId = currentHadler.replace('#', ''),
            currentEl = $section.filter('[id="' + currentId + '"]'),
            elPosition = currentEl.offset().top,
            extraPadding = currentEl.css('padding-top');

        $body.stop().animate({
            scrollTop: elPosition + parseInt(extraPadding) - 90
        }, 700);

        $popups.removeClass(showPopup);
        $body.removeClass(noScroll);
    });

    function initMap() {
        /**
         * The HomeControl adds +/- button for the map
         *
         */

        function HomeControl(controlDiv, map) {
            google.maps.event.addDomListener(zoomout, 'click', function() {
                var currentZoomLevel = map.getZoom();
                if (currentZoomLevel != 0) {
                    map.setZoom(currentZoomLevel - 1);
                }
            });

            google.maps.event.addDomListener(zoomin, 'click', function() {
                var currentZoomLevel = map.getZoom();
                if (currentZoomLevel != 21) {
                    map.setZoom(currentZoomLevel + 1);
                }
            });
        }

        var macDoList = [{
            lat: 49.00408,
            lng: 2.56228,
            data: {
                city: 'Париж',
                reviews: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            }
        }, {
            lat: 49.00408,
            lng: 2.56228,
            data: {
                city: 'Париж',
                reviews: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation'
            }
        }, {
            lat: 48.93675,
            lng: 2.35237,
            data: {
                city: 'Сент-Дениз',
                reviews: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            }
        }, {
            lat: 48.93168,
            lng: 2.39858,
            data: {
                city: 'Ля Корню',
                reviews: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
            }
        }, {
            lat: 48.91304,
            lng: 2.38027,
            data: {
                city: 'Ауберлиез',
                reviews: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            }
        }, ];

        // Setup the different icons and shadows
        var iconURLPrefix = '../img/markers/';

        var icons = [
            iconURLPrefix + 'm1.png',
            iconURLPrefix + 'm2.png',
            iconURLPrefix + 'm3.png',
            iconURLPrefix + 'm4.png',
            iconURLPrefix + 'm5.png'
        ]

        var iconsLength = icons.length;

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 3,
            disableDefaultUI: true,
            zoomControl: false,
            scaleControl: false,
            scrollwheel: false,
            center: { lat: 47.210921, lng: 38.932016 },
            styles: [
                { 'featureType': 'administrative', 'stylers': [{ 'visibility': 'off' }] },
                { 'featureType': 'poi', 'stylers': [{ 'visibility': 'simplified' }] },
                { 'featureType': 'road', 'elementType': 'labels', 'stylers': [{ 'visibility': 'simplified' }] },
                { 'featureType': 'water', 'stylers': [{ 'visibility': 'simplified' }] },
                { 'featureType': 'transit', 'stylers': [{ 'visibility': 'simplified' }] },
                { 'featureType': 'landscape', 'stylers': [{ 'visibility': 'simplified' }] },
                { 'featureType': 'road.highway', 'stylers': [{ 'visibility': 'off' }] },
                { 'featureType': 'road.local', 'stylers': [{ 'visibility': 'on' }] },
                { 'featureType': 'road.highway', 'elementType': 'geometry', 'stylers': [{ 'visibility': 'on' }] },
                { 'featureType': 'water', 'stylers': [{ 'color': '#84afa3' }, { 'lightness': 52 }] }, { 'stylers': [{ 'saturation': -17 }, { 'gamma': 0.36 }] },
                { 'featureType': 'transit.line', 'elementType': 'geometry', 'stylers': [{ 'color': '#3f518c' }] }
            ]
        });

        var infowindow = new google.maps.InfoWindow({
            maxWidth: 160
        });

        var markers = [];
        var iconCounter = 0;

        for (var i = 0; i < macDoList.length; i++) {

            var latLng = new google.maps.LatLng(
                macDoList[i].lat,
                macDoList[i].lng);

            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                icon: icons[iconCounter]
            });

            markers.push(marker);

            iconCounter++;
            // We only have a limited number of possible icon colors, so we may have to restart the counter
            if (iconCounter >= iconsLength) {
                iconCounter = 0;
            }

            // Register a click event listener on the marker to display the corresponding infowindow content
            google.maps.event.addListener(marker, 'click', (function(marker, i) {

                return function() {
                    // Register a click event listener on the marker
                    $('.jsPopupHandler[data-popup-handler="reviews"]').trigger('click');
                }

            })(marker, i));

        }

        function autoCenter() {
            //  Create a new viewpoint bound
            var bounds = new google.maps.LatLngBounds();
            //  Go through each...
            for (var i = 0; i < markers.length; i++) {
                bounds.extend(markers[i].position);
            }
            //  Fit these bounds to the map
            map.fitBounds(bounds);
        }

        autoCenter();

        var clusterStyles = [{
            textColor: '#333333',
            url: '../img/but_blue.svg',
            height: 25,
            width: 25,
            textSize: 14
        }];

        var clusterOptions = {
            styles: clusterStyles,
            zoomOnClick: false
        };

        var markerCluster = new MarkerClusterer(map, markers, clusterOptions);

        // Register a click event listener on the cluster
        google.maps.event.addListener(markerCluster, 'clusterclick',
            function(cluster) {
                $('.jsPopupHandler[data-popup-handler="reviews"]').trigger('click');
            }
        );

        // Create the DIV to hold the control and
        // call the HomeControl() constructor passing
        // in this DIV.
        var homeControlDiv = document.createElement('div');
        var homeControl = new HomeControl(homeControlDiv, map);

        homeControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(homeControlDiv);

    }

    google.maps.event.addDomListener(window, 'load', initMap);

    function initializeDirection(link) {
        var map = new google.maps.Map(document.getElementById('map-direction'), {
            center: { lat: 47.210921, lng: 38.932016 },
            zoom: 12,
            disableDefaultUI: true,
            zoomControl: false,
            scaleControl: false,
            scrollwheel: false,
            styles: [
                { 'featureType': 'administrative', 'stylers': [{ 'visibility': 'off' }] },
                { 'featureType': 'poi', 'stylers': [{ 'visibility': 'simplified' }] },
                { 'featureType': 'road', 'elementType': 'labels', 'stylers': [{ 'visibility': 'simplified' }] },
                { 'featureType': 'water', 'stylers': [{ 'visibility': 'simplified' }] },
                { 'featureType': 'transit', 'stylers': [{ 'visibility': 'simplified' }] },
                { 'featureType': 'landscape', 'stylers': [{ 'visibility': 'simplified' }] },
                { 'featureType': 'road.highway', 'stylers': [{ 'visibility': 'off' }] },
                { 'featureType': 'road.local', 'stylers': [{ 'visibility': 'on' }] },
                { 'featureType': 'road.highway', 'elementType': 'geometry', 'stylers': [{ 'visibility': 'on' }] },
                { 'featureType': 'water', 'stylers': [{ 'color': '#84afa3' }, { 'lightness': 52 }] }, { 'stylers': [{ 'saturation': -17 }, { 'gamma': 0.36 }] },
                { 'featureType': 'transit.line', 'elementType': 'geometry', 'stylers': [{ 'color': '#3f518c' }] }
            ]
        });

        /**
         * The HomeControl adds +/- button for the map
         *
         */

        function HomeControl(controlDiv, map) {
            google.maps.event.addDomListener(zoomout1, 'click', function() {
                var currentZoomLevel = map.getZoom();
                if (currentZoomLevel != 0) {
                    map.setZoom(currentZoomLevel - 1);
                }
            });

            google.maps.event.addDomListener(zoomin1, 'click', function() {
                var currentZoomLevel = map.getZoom();
                if (currentZoomLevel != 21) {
                    map.setZoom(currentZoomLevel + 1);
                }
            });
        }

        //var infoWindow = new google.maps.InfoWindow({ map: map });

        // HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                // the coordinates of geolocation
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                getAddressFromLatLang(pos.lat, pos.lng);

                function getAddressFromLatLang(lat, lng) {
                    var geocoder = new google.maps.Geocoder();
                    var latLng = new google.maps.LatLng(lat, lng);
                    geocoder.geocode({ 'latLng': latLng }, function(results, status) {
                        console.log(results);
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[0]) {
                                var currentAddress = results[0].formatted_address;

                                // the coordinates for direction
                                var end = new google.maps.LatLng(47.210921, 38.932016);
                                var start = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                                // init services
                                var directionsDisplay = new google.maps.DirectionsRenderer();
                                directionsDisplay.setMap(map);

                                // request
                                var request = {
                                    origin: start,
                                    destination: end,
                                    travelMode: google.maps.TravelMode.DRIVING
                                };

                                // response
                                var directionsService = new google.maps.DirectionsService();
                                directionsService.route(request, function(response, status) {
                                    if (status == google.maps.DirectionsStatus.OK) {
                                        directionsDisplay.setDirections(response);
                                    }
                                });

                                // create popup with start address
                                // infoWindow.setPosition(pos);
                                // infoWindow.setContent(currentAddress);
                            }
                        } else {
                            console.log("Geocode was not successful for the following reason: " + status);
                        }
                    });
                }
            }, function() {
                handleLocationError(true, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, map.getCenter());
        }

        // Create the DIV to hold the control and
        // call the HomeControl() constructor passing
        // in this DIV.
        var homeControlDiv = document.createElement('div');
        var homeControl = new HomeControl(homeControlDiv, map);

        homeControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(homeControlDiv);
    }

    $('.jsInitMapDirection').on('click', function() {
        google.maps.event.addDomListener(window, 'load', initializeDirection(this));
    })
});
