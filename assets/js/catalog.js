const swiper = new Swiper('.image-slider', {
    mouswheel: {
        sensitivity: 2,
        eventsTarget: ".image-slider",
    },
    // Default parameters
    slidesPerView: 1,
    spaceBetween: 0,
    // Responsive breakpoints
    breakpoints: {
        // when window width is >= 375px
        375: {
            slidesPerView: 5.1,
            spaceBetween: 0
        },
    }
})