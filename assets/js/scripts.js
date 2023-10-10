/*===================================
Version      : 2.0.0
===================================*/

(function ($) {
  "use strict";

  /*===================================*
	01. LOADING JS
	/*===================================*/
  $(window).on("load", function () {
    var preLoder = $("#preloader");
    preLoder.delay(700).fadeOut(500).addClass("loaded");
  });

  /*===================================*
	02. SMOOTH SCROLLING JS
	*===================================*/
  // Select all links with hashes
  var headerHeight = $(".header_wrap").height() - 10;
  $("a.page-scroll").on("click", function (event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, "") ===
        this.pathname.replace(/^\//, "") &&
      location.hostname === this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash),
        speed = $(this).data("speed") || 800;
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");

      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $("html, body").animate(
          {
            scrollTop: target.offset().top - headerHeight,
          },
          speed
        );
      }
    }
  });

  $(window).on("load resize ready", function () {
    $(".header_wrap.fixed-top").css({ "padding-top": $(".alertbox").height() });
  });
  $(".alertbox .close").on("click", function () {
    $(".header_wrap ").css({ "padding-top": "0" });
  });

  $(function () {
    if ($(".header_wrap").hasClass("fixed-top")) {
      $(".alertbox").addClass("alert_fixed");
    }
  });

  /*===================================*
	03. MENU JS
	*===================================*/
  //Main navigation scroll spy for shadow
  $(window).on("scroll", function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 80) {
      $("header").addClass("nav-fixed");
      $(".alert_fixed").addClass("fixed");
    } else {
      $("header").removeClass("nav-fixed");
      $(".alert_fixed").removeClass("fixed");
    }
  });

  //Show Hide dropdown-menu Main navigation
  $(document).ready(function () {
    $(".dropdown-menu a.dropdown-toggler").on("click", function (e) {
      var $el = $(this);
      var $parent = $(this).offsetParent(".dropdown-menu");
      if (!$(this).next().hasClass("show")) {
        $(this)
          .parents(".dropdown-menu")
          .first()
          .find(".show")
          .removeClass("show");
      }
      var $subMenu = $(this).next(".dropdown-menu");
      $subMenu.toggleClass("show");

      $(this).parent("li").toggleClass("show");

      $(this)
        .parents("li.nav-item.dropdown.show")
        .on("hidden.bs.dropdown", function (e) {
          $(".dropdown-menu .show").removeClass("show");
        });

      return false;
    });
  });

  //Hide Navbar Dropdown After Click On Links
  var navBar = $(".header_wrap");
  var navbarLinks = navBar.find(".navbar-collapse ul li a.page-scroll");

  $.each(navbarLinks, function (i, val) {
    var navbarLink = $(this);

    navbarLink.on("click", function () {
      navBar.find(".navbar-collapse").collapse("hide");
      $("header").removeClass("active");
    });
  });

  //Main navigation Active Class Add Remove
  $(".navbar-toggler").on("click", function () {
    $("header").toggleClass("active");
    if ($(".search-overlay").hasClass("open")) {
      $(".search-overlay").removeClass("open");
      $(".search_trigger").removeClass("open");
    }
  });

  $(window).on("load resize ready", function () {
    function getClass(element, startsWith) {
      var result = undefined;
      $(element.attr("class").split(" ")).each(function () {
        if (this.indexOf(startsWith) > -1) result = this;
      });
      return result;
    }
    $(".header_wrap").each(function () {
      var className = getClass($(this), "bg_") || getClass($(this), "bg-");
      if ($(".header_wrap").hasClass(className)) {
        Array.prototype.forEach.call(
          document.querySelectorAll(".dropdown-menu"),
          function (el) {
            el.classList.add(className);
          }
        );
      }
      if ($(window).width() <= 992) {
        $(".navbar-nav").addClass(className);
      }
    });
  });

  $(".sidetoggle").on("click", function () {
    $(".sidebar_menu").addClass("active");
    $("body").addClass("active");
    $("body").append('<div id="header-overlay" class="header-overlay"></div>');
  });

  $(document).ready(function () {
    $(document).on("click", "#header-overlay, .sidemenu_close", function () {
      $(".sidebar_menu").removeClass("active");
      $("body").removeClass("active");
      $("#header-overlay").fadeOut("3000", function () {
        $("#header-overlay").remove();
      });
      return false;
    });
  });

  //Language Select Dropdown
  $(document).ready(function () {
    $(".custome_select").msDropdown();
  });
  /*===================================*
	04. SEARCH JS
	*===================================*/
  $(".search_trigger").on("click", function () {
    $(".search-overlay").toggleClass("open");
    $(".search_trigger").toggleClass("open");
    if ($(".navbar-collapse").hasClass("show")) {
      $(".navbar-collapse").removeClass("show");
      $(".navbar-toggler").addClass("collapsed");
      $(".navbar-toggler").attr("aria-expanded", false);
    }
  });

  /*===================================*
	05. SLIDER JS
	*===================================*/
  var owl = $(".owl-thumbs-slider");
  owl.owlCarousel({
    loop: false,
    items: 4,
    dots: false,
    margin: 10,
    nav: true,
    navText: [
      '<i class="ion-ios-arrow-forward"></i>',
      '<i class="ion-ios-arrow-back"></i>',
    ],
  });

  $(window).on("load", function () {
    $(".carousel_slide1").each(function () {
      var $carousel = $(this);
      $carousel.owlCarousel({
        dots: $carousel.data("dots"),
        loop: $carousel.data("loop"),
        margin: $carousel.data("margin"),
        mouseDrag: $carousel.data("mouse-drag"),
        touchDrag: $carousel.data("touch-drag"),
        items: 1,
        autoHeight: $carousel.data("autoheight"),
        nav: $carousel.data("nav"),
        navText: [
          '<i class="ion-ios-arrow-forward"></i>',
          '<i class="ion-ios-arrow-back"></i>',
        ],
        autoplay: $carousel.data("autoplay"),
        animateIn: $carousel.data("animate-in"),
        animateOut: $carousel.data("animate-out"),
        autoplayTimeout: $carousel.data("autoplay-timeout"),
        smartSpeed: $carousel.data("smart-speed"),
      });
      var t = $(".testimonial_wrap");
      $carousel.on("changed.owl.carousel", function (event) {
        t.hasClass("active")
          ? t.removeClass("active")
          : (t.addClass("active"),
            setTimeout(function () {
              t.removeClass("active");
            }, 500));
      });
    });

    $(".carousel_slide2").each(function () {
      var $carousel = $(this);
      $carousel.owlCarousel({
        loop: $carousel.data("loop"),
        margin: $carousel.data("margin"),
        mouseDrag: $carousel.data("mouse-drag"),
        touchDrag: $carousel.data("touch-drag"),
        dots: $carousel.data("dots"),
        autoHeight: true,
        center: $carousel.data("center"),
        rewind: $carousel.data("rewind"),
        autoplay: $carousel.data("autoplay"),
        animateIn: $carousel.data("animate-in"),
        animateOut: $carousel.data("animate-out"),
        nav: $carousel.data("nav"),
        navText: [
          '<i class="ion-ios-arrow-forward"></i>',
          '<i class="ion-ios-arrow-back"></i>',
        ],
        autoplayTimeout: $carousel.data("autoplay-timeout"),
        responsive: {
          0: {
            items: 1,
          },
          380: {
            items: 1,
          },
          576: {
            items: 2,
          },
          1000: {
            items: 2,
          },
          1199: {
            items: 2,
          },
        },
      });
    });

    $(".carousel_slide3").each(function () {
      var $carousel = $(this);
      $carousel.owlCarousel({
        loop: $carousel.data("loop"),
        margin: $carousel.data("margin"),
        mouseDrag: $carousel.data("mouse-drag"),
        touchDrag: $carousel.data("touch-drag"),
        dots: $carousel.data("dots"),
        autoHeight: true,
        center: $carousel.data("center"),
        rewind: $carousel.data("rewind"),
        autoplay: $carousel.data("autoplay"),
        nav: $carousel.data("nav"),
        navText: [
          '<i class="ion-ios-arrow-forward"></i>',
          '<i class="ion-ios-arrow-back"></i>',
        ],
        autoplayTimeout: $carousel.data("autoplay-timeout"),
        responsive: {
          0: {
            items: 1,
          },
          380: {
            items: 1,
          },
          576: {
            items: 2,
          },
          1000: {
            items: 3,
          },
          1199: {
            items: 3,
          },
        },
      });
    });

    $(".carousel_slide4").each(function () {
      var $carousel = $(this);
      $carousel.owlCarousel({
        dots: $carousel.data("dots"),
        loop: $carousel.data("loop"),
        margin: $carousel.data("margin"),
        mouseDrag: $carousel.data("mouse-drag"),
        touchDrag: $carousel.data("touch-drag"),
        autoHeight: true,
        center: $carousel.data("center"),
        rewind: $carousel.data("rewind"),
        autoplay: $carousel.data("autoplay"),
        nav: $carousel.data("nav"),
        navText: [
          '<i class="ion-ios-arrow-forward"></i>',
          '<i class="ion-ios-arrow-back"></i>',
        ],
        autoplayTimeout: $carousel.data("autoplay-timeout"),
        responsive: {
          0: {
            items: 1,
          },
          380: {
            items: 1,
          },
          576: {
            items: 2,
          },
          1000: {
            items: 3,
          },
          1199: {
            items: 4,
          },
        },
      });
    });

    $(".carousel_slide5").each(function () {
      var $carousel = $(this);
      $carousel.owlCarousel({
        dots: $carousel.data("dots"),
        loop: $carousel.data("loop"),
        margin: $carousel.data("margin"),
        mouseDrag: $carousel.data("mouse-drag"),
        touchDrag: $carousel.data("touch-drag"),
        autoHeight: true,
        center: $carousel.data("center"),
        rewind: $carousel.data("rewind"),
        autoplay: $carousel.data("autoplay"),
        nav: $carousel.data("nav"),
        navText: [
          '<i class="ion-ios-arrow-forward"></i>',
          '<i class="ion-ios-arrow-back"></i>',
        ],
        autoplayTimeout: $carousel.data("autoplay-timeout"),
        responsive: {
          0: {
            items: 2,
            margin: 15,
          },
          380: {
            items: 3,
          },
          576: {
            items: 4,
          },
          1000: {
            items: 5,
          },
          1199: {
            items: 5,
          },
        },
      });
    });

    $(".cl_logo_slider").each(function () {
      var $carousel = $(this);
      $carousel.owlCarousel({
        dots: $carousel.data("dots"),
        loop: $carousel.data("loop"),
        margin: $carousel.data("margin"),
        mouseDrag: $carousel.data("mouse-drag"),
        touchDrag: $carousel.data("touch-drag"),
        autoHeight: true,
        rewind: $carousel.data("rewind"),
        autoplay: $carousel.data("autoplay"),
        nav: $carousel.data("nav"),
        navText: [
          '<i class="ion-ios-arrow-forward"></i>',
          '<i class="ion-ios-arrow-back"></i>',
        ],
        autoplayTimeout: $carousel.data("autoplay-timeout"),
        responsive: {
          0: {
            items: 2,
          },
          380: {
            items: 3,
          },
          600: {
            items: 4,
          },
          1000: {
            items: 5,
          },
          1199: {
            items: 6,
          },
        },
      });
    });
  });
  /*===================================*
16. PARALLAX JS
*===================================*/
  $(window).on("load", function () {
    $(".parallax_bg").parallaxBackground();
  });
  /*===================================*
     07.COUNTDOWN JS
    *===================================*/
  $(".countdown_time").each(function () {
    var endTime = $(this).data("time");
    $(this).countdown(endTime, function (tm) {
      $(this).html(
        tm.strftime(
          '<div class="countdown_box"><div class="countdown_content"><span class="countdown days">%D </span><span class="cd_text">ثانیه</span></div></div><div class="countdown_box"><div class="countdown_content"><span class="countdown hours">%H</span><span class="cd_text">دقیقه</span></div></div><div class="countdown_box"><div class="countdown_content"><span class="countdown minutes">%M</span><span class="cd_text">ساعت</span></div></div><div class="countdown_box"><div class="countdown_content"><span class="countdown seconds">%S</span><span class="cd_text">روز</span></div></div>'
        )
      );
    });
  });

  /*===================================*
	08. CONTACT FORM JS
	*===================================*/
  $("#submitButton").on("click", function (event) {
    event.preventDefault();
    var mydata = $("form").serialize();
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "contact.php",
      data: mydata,
      success: function (data) {
        if (data.type === "error") {
          $("#alert-msg").removeClass("alert-msg-success");
          $("#alert-msg").addClass("alert-msg-failure");
        } else {
          $("#alert-msg").addClass("alert-msg-success");
          $("#alert-msg").removeClass("alert-msg-failure");
          $("#first-name").val("Enter Name");
          $("#email").val("Enter Email");
          $("#phone").val("Enter Phone Number");
          $("#subject").val("Enter Subject");
          $("#description").val("Enter Message");
        }
        $("#alert-msg").html(data.msg);
        $("#alert-msg").show();
      },
      error: function (xhr, textStatus) {},
    });
  });

  /*===================================*
	09. SCROLLUP JS
	*===================================*/
  $(window).scroll(function () {
    if ($(this).scrollTop() > 150) {
      $(".scrollup").fadeIn();
    } else {
      $(".scrollup").fadeOut();
    }
  });

  $(".scrollup").on("click", function (e) {
    e.preventDefault();
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      600
    );
    return false;
  });

  /*===================================*
	10. POPUP JS
	*===================================*/
  $(".content-popup").magnificPopup({
    type: "inline",
    preloader: true,
    mainClass: "mfp-zoom",
  });

  $(".image_gallery").each(function () {
    // the containers for all your galleries
    $(this).magnificPopup({
      delegate: "a", // the selector for gallery item
      type: "image",
      gallery: {
        enabled: true,
      },
      zoom: {
        enabled: true,
        duration: 300, // don't foget to change the duration also in CSS
        opener: function (element) {
          return element.find("img");
        },
      },
    });
  });

  $(document).ready(function () {
    $(".popup-ajax").magnificPopup({
      type: "ajax",
    });
  });

  /*===================================*
	11. QUICKVIEW POPUP + ZOOM IMAGE + PRODUCT SLIDER JS
	*===================================*/
  var image = $("#product_img");
  var zoomConfig = {};
  var zoomActive = false;

  zoomActive = !zoomActive;
  if (zoomActive) {
    if ($(window).width() >= 768) {
      var firstImgHeight = $(".pr_detail").height();
      var divWidth = $(".pr_detail").width();
      $("#product_img").elevateZoom({
        cursor: "crosshair",
        easing: true,
        scrollZoom: true,
        gallery: "pr_item_gallery",
        zoomWindowOffetx: 30,
        zoomWindowWidth: divWidth,
        zoomWindowHeight: firstImgHeight,
        borderSize: 0,
        galleryActiveClass: "active",
      });
    } else {
      $("#product_img").elevateZoom({
        cursor: "crosshair",
        easing: true,
        gallery: "pr_item_gallery",
        zoomType: "inner",
        galleryActiveClass: "active",
      });
    }
  } else {
    $.removeData(image, "elevateZoom"); //remove zoom instance from image
    $(".zoomContainer:last-child").remove(); // remove zoom container from DOM
  }

  $.magnificPopup.defaults.callbacks = {
    open: function () {
      $("body").addClass("zoom_image");
    },
    close: function () {
      // Wait until overflow:hidden has been removed from the html tag
      setTimeout(function () {
        $("body").removeClass("zoom_image");
        $(".zoomContainer:last-child").remove();
      }, 100);
    },
  };

  /*===================================*
	14. QUNTITY JS
	*===================================*/
  $(".plus").on("click", function () {
    if ($(this).prev().val()) {
      $(this)
        .prev()
        .val(+$(this).prev().val() + 1);
    }
  });
  $(".minus").on("click", function () {
    if ($(this).next().val() > 1) {
      if ($(this).next().val() > 1)
        $(this)
          .next()
          .val(+$(this).next().val() - 1);
    }
  });

  /*Cart Page Payment option*/
  $('[name="payment_option"]').on("click", function () {
    var $value = $(this).attr("value");

    $(".payment-text").slideUp();
    $('[data-method="' + $value + '"]').slideDown();
  });
  /*==============================================================
    11. VIDEO JS
    ==============================================================*/
  $(document).ready(function () {
    $(".video_popup, .iframe_popup").magnificPopup({
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false,
    });
  });

  /*===================================*
	12. ANIMATION JS
	*===================================*/
  $(function () {
    function ckScrollInit(items, trigger) {
      items.each(function () {
        var ckElement = $(this),
          AnimationClass = ckElement.attr("data-animation"),
          AnimationDelay = ckElement.attr("data-animation-delay");

        ckElement.css({
          "-webkit-animation-delay": AnimationDelay,
          "-moz-animation-delay": AnimationDelay,
          "animation-delay": AnimationDelay,
          opacity: 0,
        });

        var ckTrigger = trigger ? trigger : ckElement;

        ckTrigger.waypoint(
          function () {
            ckElement.addClass("animated").css("opacity", "1");
            ckElement.addClass("animated").addClass(AnimationClass);
          },
          {
            triggerOnce: true,
            offset: "95%",
          }
        );
      });
    }

    ckScrollInit($(".animation"));
    ckScrollInit($(".staggered-animation"), $(".staggered-animation-wrap"));
  });

  /*===================================*
	13. BACKGROUND IMAGE JS
	*===================================*/
  /*data image src*/
  $(".background_bg").each(function () {
    var attr = $(this).attr("data-img-src");
    if (typeof attr !== typeof undefined && attr !== false) {
      $(this).css("background-image", "url(" + attr + ")");
      $(this).css("background-position", "center center");
      $(this).css("background-size", "cover");
    }
  });

  /*===================================*
	15. COUNTER JS
	*===================================*/
  $(".counter").counterUp({
    time: 1500,
  });

  /*===================================*
	17. RATING STAR JS
	*===================================*/
  $(document).ready(function () {
    $(".star_rating span").on("click", function () {
      var onStar = parseFloat($(this).data("value"), 10); // The star currently selected
      var stars = $(this).parent().children(".star_rating span");
      for (var i = 0; i < stars.length; i++) {
        $(stars[i]).removeClass("selected");
      }
      for (i = 0; i < onStar; i++) {
        $(stars[i]).addClass("selected");
      }
    });
  });

  /*===================================*
	18. CHECKBOX CHECK THEN ADD CLASS JS
	*===================================*/
  $(".create-account,.different_address").hide();
  $("#createaccount:checkbox").change(function () {
    if ($(this).is(":checked")) {
      $(".create-account").show(300);
    } else {
      $(".create-account").hide(300);
    }
  });
  $("#differentaddress:checkbox").change(function () {
    if ($(this).is(":checked")) {
      $(".different_address").show(300);
    } else {
      $(".different_address").hide(300);
    }
  });

  /*===================================*
	19. PRICE FILTER JS
	*===================================*/
  $(function () {
    $("#price_filter").slider({
      range: true,
      min: 0,
      max: 200,
      values: [30, 150],
      slide: function (event, ui) {
        $("#flt_price").html(
          ui.values[0] + " تومان" + " - " + ui.values[1] + "  تومان"
        );
        $("#price_first").val(ui.values[0]);
        $("#price_second").val(ui.values[1]);
      },
    });
    $("#flt_price").html(
      $("#price_filter").slider("values", 0) +
        " تومان " +
        " - " +
        $("#price_filter").slider("values", 1) +
        "  تومان"
    );
  });

  /*===================================*
	20 .List Grid JS
	*===================================*/
  $(".shorting_icon").on("click", function (e) {
    if ($(this).hasClass("grid_view")) {
      $(".shop_container").removeClass("list_view").addClass("grid_view");
      $(this).addClass("active").siblings().removeClass("active");
    } else if ($(this).hasClass("list_view")) {
      $(".shop_container").removeClass("grid_view").addClass("list_view");
      $(this).addClass("active").siblings().removeClass("active");
    }
    $(".shop_container").append(
      '<div class="loading_pr"><div class="mfp-preloader"></div></div>'
    );
    setTimeout(function () {
      $(".loading_pr").remove();
    }, 800);
  });

  /*==============================================================
    21. FIT VIDEO JS
    ==============================================================*/
  if ($(".fit-videos").length > 0) {
    $(".fit-videos").fitVids({
      customSelector: "iframe[src^='https://w.soundcloud.com']",
    });
  }

  /*===================================*
	22. MASONRY JS
	*===================================*/
  $(window).on("load", function () {
    var $grid_selectors = $(".grid_container");
    var filter_selectors = ".grid_filter > li > a";
    $(document).ready(function () {
      if ($grid_selectors.length > 0) {
        $grid_selectors.imagesLoaded(function () {
          if ($grid_selectors.hasClass("masonry")) {
            $grid_selectors.isotope({
              itemSelector: ".grid_item",
              percentPosition: true,
              layoutMode: "masonry",
              masonry: {
                columnWidth: ".grid-sizer",
              },
            });
          } else {
            $grid_selectors.isotope({
              itemSelector: ".grid_item",
              percentPosition: true,
              layoutMode: "fitRows",
            });
          }
        });
      }
    });

    //isotope filter
    $(document).on("click", filter_selectors, function () {
      $(filter_selectors).removeClass("current");
      $(this).addClass("current");
      var dfselector = $(this).data("filter");
      if ($grid_selectors.hasClass("masonry")) {
        $grid_selectors.isotope({
          itemSelector: ".grid_item",
          layoutMode: "masonry",
          masonry: {
            columnWidth: ".grid_item",
          },
          filter: dfselector,
        });
      } else {
        $grid_selectors.isotope({
          itemSelector: ".grid_item",
          layoutMode: "fitRows",
          filter: dfselector,
        });
      }
      return false;
    });

    $(window).resize(function () {
      setTimeout(function () {
        $grid_selectors
          .find(".grid_item")
          .removeClass("animation")
          .removeClass("animated"); // avoid problem to filter after window resize
      }, 300);
    });
  });

  $(".grid_item .image_popup").on("click", function () {
    $(this).find(".link_container").magnificPopup("open");
  });
  $(".link_container").each(function () {
    $(this).magnificPopup({
      delegate: ".image_popup",
      type: "image",
      gallery: {
        enabled: true,
      },
    });
  });

  /*===================================*
	23. PROGRESS BAR JS
	*===================================*/
  $(document).ready(function () {
    $(".progress .progress-bar").css("width", function () {
      return $(this).attr("aria-valuenow") + "%";
    });
  });

  // //Demo js
  // $( window ).on( "load", function() {
  // 	document.onkeydown = function(e) {
  // 		if(e.keyCode == 123) {
  // 		 return false;
  // 		}
  // 		if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
  // 		 return false;
  // 		}
  // 		if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
  // 		 return false;
  // 		}
  // 		if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
  // 		 return false;
  // 		}
  //
  // 		if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)){
  // 		 return false;
  // 		}
  // 	 }
  //
  // 	$("html").on("contextmenu",function(){
  // 		return false;
  // 	});
  // });

  /*===================================*
	DEMO SWITCHER JS
	*===================================*/

  // $(document).ready( function() {
  // 	$(window).on("load", function() {
  // 		$('body').prepend('<div id="demo_content" class="demo_switcher"></div>');
  // 		$("#demo_content").load("http://bestwebcreator.com/organiq/demo/demo.html");
  // 	});
  // });
})(jQuery);
// * my script
$(".sliderCompetitiveAdvantage").owlCarousel({
  loop: true,
  margin: 10,
  nav: false,
  items: 1,
  autoplay: true,
  autoplayTimeout: 2000,
});
$(".sliderDiscount").owlCarousel({
  loop: true,
  nav: false,
  autoplay: true,
  autoplayTimeout: 2000,
  responsive: {
    0: {
      items: 1,
      margin: 0,
    },
    500: {
      items: 2,
      margin: 40,
    },
    700: {
      items: 3,
      margin: 50,
    },
    1000: {
      items: 5,
      margin: 70,
    },
  },
});
$(".sliderCategoryProduct").owlCarousel({
  loop: true,
  nav: false,
  autoplay: true,
  autoplayTimeout: 2000,
  responsive: {
    0: {
      items: 3,
      margin: 0,
    },
    500: {
      items: 2,
      margin: 40,
    },
    700: {
      items: 3,
      margin: 50,
    },
    1000: {
      items: 7,
      margin: 70,
    },
  },
});
