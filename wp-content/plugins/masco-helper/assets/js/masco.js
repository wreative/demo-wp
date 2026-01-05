(function ($) {

  "use strict";

  /* ---------------------------------------------

  Navigation menu

  --------------------------------------------- */

  // dropdown for mobile
  /* is_exist() */
  jQuery.fn.is_exist = function () {
    return this.length;
  }


  $(window).load(function () {

  })

  // start masco text infinite slider
  // var MascoTextSlider = function ($scope, $) {

  //   var wrapper = $scope.find(".masco-text-slider");
  //   if (wrapper.length === 0)
  //     return;
  //   // var settings = wrapper.data('settings');

  //   wrapper.slick({
  //     rtl: false,
  //     infinite: true,
  //     slidesToShow: 2,
  //     slidesToScroll: 1,
  //     arrows: false,
  //     dots: false,
  //     autoplay: true,
  //     autoplaySpeed: 0,
  //     speed: 10000,
  //     cssEase: 'linear',
  //     pauseOnHover: true,
  //     adaptiveHeight: true,
  //     responsive: [
  //       {
  //         breakpoint: 1400,
  //         settings: {
  //           slidesToShow: 1,
  //           slidesToScroll: 1,
  //         }
  //       }

  //     ]
  //   });

  // }



  var MascoTextSlider = function ($scope, $) {
    var wrapper = $scope.find(".masco-text-slider");



    if (wrapper.length === 0)
      return;
    var settings = wrapper.data('settings');

    wrapper.slick({

      rtl: settings['slider_rtl'],
      infinite: true,
      slidesToShow: settings['per_coulmn'],
      slidesToScroll: settings['slide_scroll'],
      arrows: false,
      dots: false,
      autoplay: true,
      autoplaySpeed: 0,
      speed: 10000,
      cssEase: 'linear',
      pauseOnHover: true,
      adaptiveHeight: true,
      responsive: [{
        breakpoint: 1600,
        settings: {
          slidesToShow: settings['per_coulmn'],
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: settings['per_coulmn_tablet'],
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: settings['per_coulmn_mobile'],
          slidesToScroll: 1,
        },
      },
      ],
    });
  }







  // start masco slider one
  var MascoSliderOne = function ($scope, $) {
    var wrapper = $scope.find(".masco-slider-one");
    if (wrapper.length === 0)
      return;
    // var settings = wrapper.data('settings');
    wrapper.slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      autoplay: true,
      dots: false,
      prevArrow: $('.prev'),
      nextArrow: $('.next'),
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
          }
        }

      ]
    });

  }

  // start nft slider one
  var MascoNftSlider = function ($scope, $) {
    var wrapper = $scope.find(".masco-nft-slider");
    if (wrapper.length === 0)
      return;
    // var settings = wrapper.data('settings');
    wrapper.slick({
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      autoplay: true,
      autoplaySpeed: 0,
      speed: 10000,
      cssEase: 'linear',
      pauseOnHover: true,
      adaptiveHeight: true,
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 575,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
          }
        }
      ]
    });

  }


    // start nft slider one
  var MascoTslider = function ($scope, $) {
    var wrapper = $scope.find(".masco-t-slider");
    if (wrapper.length === 0)
      return;
      var settings = wrapper.data('settings');
      wrapper.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: settings['autoplay'],
        dots: settings['dots'],

    });

  }




  // start masco testimonial 2 column slider
  var MascoTwoColumnSlider = function ($scope, $) {
    var wrapper = $scope.find(".masco-t-2column-slider");
    if (wrapper.length === 0)
      return;
    var settings = wrapper.data('settings');
    wrapper.slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: settings['arrows'],
      dots: settings['dots'],
      autoplay: settings['autoplay'],
      prevArrow: $('.prev'),
      nextArrow: $('.next'),
    });

  }


// all demos js init

    $(".menu-bar").on("click", function () {
        $(".masco-sidemenu-column, .offcanvas-overlay").addClass("active");
      });
      $(".masco-sidemenu-close, .offcanvas-overlay").on("click", function () {
          $(".masco-sidemenu-column, .offcanvas-overlay").removeClass("active");
    });







  $(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction("frontend/element_ready/masco_text_slider_widget.default", MascoTextSlider);
    elementorFrontend.hooks.addAction("frontend/element_ready/masco_project_card.default", MascoSliderOne);
    elementorFrontend.hooks.addAction("frontend/element_ready/masco_nft_slider.default", MascoNftSlider);
    elementorFrontend.hooks.addAction("frontend/element_ready/Masco_T_slider.default", MascoTslider);
    elementorFrontend.hooks.addAction("frontend/element_ready/Masco_Two_Column_Slider.default", MascoTwoColumnSlider);
  });

})(jQuery);