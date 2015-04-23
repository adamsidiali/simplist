Template.swiper.rendered = function () {

  var swiper = new Swiper('.container', {
        slideClass: 'slide',
        pagination: '.swiper-pagination',
        slidesPerView: 4,
        centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 30
    });

}
