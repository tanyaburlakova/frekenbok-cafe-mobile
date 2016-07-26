$(() => {
    $(document).ready(function() {
        $(".jsReviewsCarousel").owlCarousel({
            items: 1,

            // Events
            touchDrag: false,

            //Autoplay
            autoplay: 7000,

            // Navigation
            navigation: false,
            navigationText : false,

            //Pagination
            pagination: true,
            paginationNumbers: false,

            // Other
            addClassActive: true,
            singleItem: true,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut',
        });
        $('.jsConceptCarousel').owlCarousel({
            items: 1,

            // Events
            touchDrag: false,

            // Other
            addClassActive: true,
            singleItem: true,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut',
        });
    });
});
