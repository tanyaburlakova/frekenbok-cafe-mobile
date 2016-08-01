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
        autoplayTimeout: 8000;

        //Pagination
        dots: true,

        // Other
        addClassActive: true,
        singleItem: true,
        animateIn: 'fadeIn',
        loop: true,
        animateOut: 'fadeOut',
    });
    $('.jsConceptCarousel').owlCarousel({
        items: 1,

        // Events
        touchDrag: false,

        // Other
        addClassActive: true,
        dots: false,
        nav: true,
        navText: false,
        singleItem: true,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        loop: true,
    });

    $('.jsReviewsCarousel').owlCarousel({
        items: 1,

        // Events
        touchDrag: false,

        // Other
        addClassActive: true,
        dots: false,
        nav: true,
        navText: false,
        singleItem: true,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        loop: true
    });

    // show/hide site popups
    $('.jsPopupHandler').on('click', function( e ) {
        e.preventDefault();

        var
            currentClass = $(this).data('popup-handler'),
            currentPopup = $popups.filter('[data-popup-el="' + currentClass + '"]');
        // vars

        if ( !(currentPopup.hasClass( showPopup ) ) ) {
            currentPopup.addClass(showPopup);
        } else {
            currentPopup.removeClass(showPopup);
        }
    });

    $('.jsPopupCloser').on('click', function( e ) {
        e.preventDefault();

        $(this).closest('.jsPopupEl').removeClass(showPopup);
    });

    // When the window has finished loading create our google map below
    google.maps.event.addDomListener(window, 'load', init);

    function init() {
        // Basic options for a simple Google Map
        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
        var mapOptions = {
            // How zoomed in you want the map to start at (always required)
            zoom: 3,
            disableDefaultUI:true,

            // The latitude and longitude to center the map (always required)
            center: new google.maps.LatLng(40.6700, -73.9400), // New York

            // How you would like to style the map.
            // This is where you would paste any style found on Snazzy Maps.
            styles: [{"featureType":"administrative","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","stylers":[{"color":"#84afa3"},{"lightness":52}]},{"stylers":[{"saturation":-17},{"gamma":0.36}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#3f518c"}]}]
        };

        // Get the HTML DOM element that will contain your map
        // We are using a div with id="map" seen below in the <body>
        var mapElement = document.getElementById('map');

        // Create the Google Map using our element and options defined above
        var map = new google.maps.Map(mapElement, mapOptions);

        // Let's also add a marker while we're at it
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(40.6700, -73.9400),
            map: map,
            title: 'Snazzy!'
        });
    }
});
