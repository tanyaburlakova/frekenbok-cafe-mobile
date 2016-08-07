'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

$(function () {
    var _$$slick;

    var $body = $('body'),
        $popups = $('.jsPopupEl'),

    // classes
    showPopup = 'is-show-popup',
        noScroll = 'is-no-scroll';
    // vars

    $('.jsOpinionsCarousel').slick((_$$slick = {
        dots: true,
        speed: 500,
        arrows: false,
        fade: true
    }, _defineProperty(_$$slick, 'dots', true), _defineProperty(_$$slick, 'autoplay', true), _defineProperty(_$$slick, 'autoplaySpeed', 7000), _$$slick));

    $('.jsSlider').slick({
        speed: 500,
        fade: true
    });

    // Setup form validation on the form 'send-review-form'
    $.validate({
        form: '#send-review-form',
        errorMessageClass: 'error-message',
        onError: function onError($form) {}
    });

    // show/hide site popups
    $('.jsPopupHandler').on('click', function (e) {
        e.preventDefault();

        var currentClass = $(this).data('popup-handler'),
            currentPopup = $popups.filter('[data-popup-el="' + currentClass + '"]');
        // vars

        if (!currentPopup.hasClass(showPopup)) {
            currentPopup.addClass(showPopup);
            $body.addClass(noScroll);
        } else {
            currentPopup.removeClass(showPopup);
            $body.removeClass(noScroll);
        }
    });

    $('.jsPopupClose').on('click', function (e) {
        e.preventDefault();

        $(this).closest('.jsPopupEl').removeClass(showPopup);
        $body.removeClass(noScroll);
    });

    // scroll to selected section
    $('.jsScrollToHandler').on('click', function (e) {
        e.preventDefault();

        var $section = $('.jsScrollToEl'),
            currentHadler = $(this).attr('href'),
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
        // need to remove after add real data
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
        }];

        var map,
            icons = [],
            markers = [],
            iconsLength,
            iconCounter = 0,
            iconURLPrefix = '../img/markers/';
        // vars

        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 3,
            disableDefaultUI: true,
            zoomControl: false,
            scaleControl: false,
            scrollwheel: false,
            center: { lat: 47.210921, lng: 38.932016 },
            styles: [{ 'featureType': 'administrative', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'poi', 'stylers': [{ 'visibility': 'simplified' }] }, { 'featureType': 'road', 'elementType': 'labels', 'stylers': [{ 'visibility': 'simplified' }] }, { 'featureType': 'water', 'stylers': [{ 'visibility': 'simplified' }] }, { 'featureType': 'transit', 'stylers': [{ 'visibility': 'simplified' }] }, { 'featureType': 'landscape', 'stylers': [{ 'visibility': 'simplified' }] }, { 'featureType': 'road.highway', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'road.local', 'stylers': [{ 'visibility': 'on' }] }, { 'featureType': 'road.highway', 'elementType': 'geometry', 'stylers': [{ 'visibility': 'on' }] }, { 'featureType': 'water', 'stylers': [{ 'color': '#84afa3' }, { 'lightness': 52 }] }, { 'stylers': [{ 'saturation': -17 }, { 'gamma': 0.36 }] }, { 'featureType': 'transit.line', 'elementType': 'geometry', 'stylers': [{ 'color': '#3f518c' }] }]
        });

        // Setup the different icons
        icons = [iconURLPrefix + 'm1.png', iconURLPrefix + 'm2.png', iconURLPrefix + 'm3.png', iconURLPrefix + 'm4.png', iconURLPrefix + 'm5.png'];

        iconsLength = icons.length;

        for (var i = 0; i < macDoList.length; i++) {
            var myLatLng, marker;
            // vars

            myLatLng = new google.maps.LatLng(macDoList[i].lat, macDoList[i].lng);

            marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                icon: icons[iconCounter]
            });

            markers.push(marker);

            iconCounter++;
            // We only have a limited number of possible icon colors, so we may have to restart the counter
            if (iconCounter >= iconsLength) {
                iconCounter = 0;
            }

            // Register a click event listener on the marker to show popup
            google.maps.event.addListener(marker, 'click', function (marker, i) {
                return function () {
                    $('.jsPopupHandler[data-popup-handler="reviews"]').trigger('click');
                };
            }(marker, i));
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

        var clusterStyles, clusterOptions, markerCluster;
        //vars

        clusterStyles = [{
            textColor: '#ffffff',
            url: '../img/cluster.svg',
            fontFamily: 'Neucha',
            height: 28,
            width: 28,
            textSize: 15
        }];

        clusterOptions = {
            styles: clusterStyles,
            zoomOnClick: false
        };

        markerCluster = new MarkerClusterer(map, markers, clusterOptions);

        // Register a click event listener on the cluster
        google.maps.event.addListener(markerCluster, 'clusterclick', function (cluster) {
            $('.jsPopupHandler[data-popup-handler="reviews"]').trigger('click');
        });

        function HomeControl(controlDiv, map) {
            google.maps.event.addDomListener(zoomout, 'click', function () {
                var currentZoomLevel = map.getZoom();
                if (currentZoomLevel != 0) {
                    map.setZoom(currentZoomLevel - 1);
                }
            });

            google.maps.event.addDomListener(zoomin, 'click', function () {
                var currentZoomLevel = map.getZoom();
                if (currentZoomLevel != 21) {
                    map.setZoom(currentZoomLevel + 1);
                }
            });
        }

        // Create the DIV to hold the control and
        // call the HomeControl() constructor passing
        // in this DIV.
        var homeControlDiv = document.createElement('div'),
            homeControl = new HomeControl(homeControlDiv, map);

        homeControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(homeControlDiv);
    }

    google.maps.event.addDomListener(window, 'load', initMap);

    function initDirectionMap(link) {
        var map,
            marker,
            myLatLng = { lat: 47.210921, lng: 38.932016 };

        map = new google.maps.Map(document.getElementById('map-direction'), {
            center: myLatLng,
            zoom: 16,
            disableDefaultUI: true,
            zoomControl: false,
            scaleControl: false,
            scrollwheel: false,
            styles: [{ 'featureType': 'administrative', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'poi', 'stylers': [{ 'visibility': 'simplified' }] }, { 'featureType': 'road', 'elementType': 'labels', 'stylers': [{ 'visibility': 'simplified' }] }, { 'featureType': 'water', 'stylers': [{ 'visibility': 'simplified' }] }, { 'featureType': 'transit', 'stylers': [{ 'visibility': 'simplified' }] }, { 'featureType': 'landscape', 'stylers': [{ 'visibility': 'simplified' }] }, { 'featureType': 'road.highway', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'road.local', 'stylers': [{ 'visibility': 'on' }] }, { 'featureType': 'road.highway', 'elementType': 'geometry', 'stylers': [{ 'visibility': 'on' }] }, { 'featureType': 'water', 'stylers': [{ 'color': '#84afa3' }, { 'lightness': 52 }] }, { 'stylers': [{ 'saturation': -17 }, { 'gamma': 0.36 }] }, { 'featureType': 'transit.line', 'elementType': 'geometry', 'stylers': [{ 'color': '#3f518c' }] }]
        });

        marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: "Hello World!"
        });

        function HomeControl(controlDiv, map) {
            google.maps.event.addDomListener(zoomout1, 'click', function () {
                var currentZoomLevel = map.getZoom();
                if (currentZoomLevel != 0) {
                    map.setZoom(currentZoomLevel - 1);
                }
            });

            google.maps.event.addDomListener(zoomin1, 'click', function () {
                var currentZoomLevel = map.getZoom();
                if (currentZoomLevel != 21) {
                    map.setZoom(currentZoomLevel + 1);
                }
            });
        }

        // HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                // the coordinates of geolocation
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                // vars

                getAddressFromLatLang(pos.lat, pos.lng);

                function getAddressFromLatLang(lat, lng) {
                    var geocoder = new google.maps.Geocoder(),
                        myLatLng = new google.maps.LatLng(lat, lng);
                    // vars

                    geocoder.geocode({ 'latLng': myLatLng }, function (results, status) {
                        console.log(results);
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[0]) {
                                var currentAddress = results[0].formatted_address,

                                // the coordinates for direction
                                end = new google.maps.LatLng(47.210921, 38.932016),
                                    start = new google.maps.LatLng(pos.lat, pos.lng),

                                // init services
                                directionsDisplay = new google.maps.DirectionsRenderer(),
                                    directionsService = new google.maps.DirectionsService(),

                                // request
                                request = {
                                    origin: start,
                                    destination: end,
                                    travelMode: google.maps.TravelMode.DRIVING
                                };
                                // vars

                                directionsDisplay.setMap(map);

                                // response
                                directionsService.route(request, function (response, status) {
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
            }, function () {
                handleLocationError(true, map.setCenter(marker.getPosition()));
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, map.setCenter(marker.getPosition()));
        }

        // Create the DIV to hold the control and
        // call the HomeControl() constructor passing
        // in this DIV.
        var homeControlDiv = document.createElement('div'),
            homeControl = new HomeControl(homeControlDiv, map);

        homeControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(homeControlDiv);
    }

    $('.jsInitMapDirection').on('click', function () {
        google.maps.event.addDomListener(window, 'load', initDirectionMap(this));
    });
});
//# sourceMappingURL=../js/app.js.map