$(() => {
    var
        $body = $('body'),
        $popups = $('.jsPopupEl'),
        // classes
        showPopup = 'is-show-popup';


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
        } else {
            currentPopup.removeClass(showPopup);
        }
    });

    $('.jsPopupCloser').on('click', function(e) {
        e.preventDefault();

        $(this).closest('.jsPopupEl').removeClass(showPopup);
    });

    /**
     * The HomeControl adds +/- button for the map
     *
     */

    var map;

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

    function initialize() {
        var mapDiv = document.getElementById('map');

        var mapOptions = {
            zoom: 3,
            disableDefaultUI: true,

            // The latitude and longitude to center the map (always required)
            center: new google.maps.LatLng(40.6700, -73.9400), // New York

            // How you would like to style the map.
            // This is where you would paste any style found on Snazzy Maps.
            styles: [{ "featureType": "administrative", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "water", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "transit", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "landscape", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.highway", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.local", "stylers": [{ "visibility": "on" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "visibility": "on" }] }, { "featureType": "water", "stylers": [{ "color": "#84afa3" }, { "lightness": 52 }] }, { "stylers": [{ "saturation": -17 }, { "gamma": 0.36 }] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "color": "#3f518c" }] }]
        }


        map = new google.maps.Map(mapDiv, mapOptions);

        // Create the DIV to hold the control and
        // call the HomeControl() constructor passing
        // in this DIV.
        var homeControlDiv = document.createElement('div');
        var homeControl = new HomeControl(homeControlDiv, map);

        homeControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(homeControlDiv);

    }

    google.maps.event.addDomListener(window, 'load', initialize);
});
