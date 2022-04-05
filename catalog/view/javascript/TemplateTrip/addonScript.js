/*! Customized Jquery from Punit Korat.  punit@templatetrip.com  : www.templatetrip.com
Authors & copyright (c) 2016: TemplateTrip - Webzeel Services(addonScript). */
/*! NOTE: This Javascript is licensed under two options: a commercial license, a commercial OEM license and Copyright by Webzeel Services - For use Only with TemplateTrip Themes for our Customers*/
/* ------------ Start Content-width JS --------------- */
$(document).ready(function() {

	$('.image-additional img').on(
      'click',
      (event) => {
        $('.product-image img').attr('src',$(event.target).data('image-large-src'));
        $('.selected').removeClass('selected');
        $(event.target).addClass('selected');
        $('.product-image img').prop('src', $(event.currentTarget).data('image-large-src'));
      }
	);

	$(".ttsearch_button").click(function() {
			$("#page").toggleClass("ttsearch-fixed");
			$('.ttsearchtoggle').parent().toggleClass('active');
		    $(".ttuserheading").removeClass("active");
			$('.ttsearchtoggle .input-lg').attr('autofocus', 'autofocus').focus();
			$(".account-link-toggle").slideUp("slow");
			$(".header-cart-toggle").slideUp("slow");
			$(".currency-toggle").slideUp("slow");
			$(".language-toggle").slideUp("slow");
	 	});

	$("#top-links a.dropdown-toggle").click(function(){
			$( ".account-link-toggle" ).slideToggle( "2000" );
			$(".currency-toggle").slideUp("slow");
			$(".language-toggle").slideUp("slow");

		   	$(".header-cart-toggle").slideUp("slow");
			$('.ttsearchtoggle').parent().removeClass("active");
			$('.ttsearchtoggle').hide('fast');

    	});

		$("#cart button.dropdown-toggle").click(function(){
			$( ".header-cart-toggle" ).slideToggle( "2000" );
		   	$(".account-link-toggle").slideUp("slow");
			$(".language-toggle").slideUp("slow");
			$(".currency-toggle").slideUp("slow");
			$('.ttsearchtoggle').parent().removeClass("active");
			$('.ttsearchtoggle').hide('fast');
   	    });
		$("#form-currency button.dropdown-toggle").click(function(){
			$( ".currency-toggle" ).slideToggle( "2000" );
			$(".language-toggle").slideUp("slow");
			$(".account-link-toggle").slideUp("slow");
			$(".header-cart-toggle").slideUp("slow");
			$('.ttsearchtoggle').parent().removeClass("active");
			$('.ttsearchtoggle').hide('fast');

    	});

        $("#form-language button.dropdown-toggle").click(function(){
			$( ".language-toggle" ).slideToggle( "2000" );
			$(".currency-toggle").slideUp("fast");
			$(".account-link-toggle").slideUp("slow");
			$(".header-cart-toggle").slideUp("slow");
			$('.ttsearchtoggle').parent().removeClass("active");
			$('.ttsearchtoggle').hide('fast');
       	});

		/* start leftmenu js*/
			$(".leftmenu").on("click" , function(){
				$(this).toggleClass("active");
				$('.left-main-menu .cat-menu').toggleClass('active');
				$("body").toggleClass("nav-open");
			});
		/*-----------End menu toggle ------------*/

		$(".option-filter .list-group-items a").click(function() {
		$(this).toggleClass('collapsed').next('.list-group-item').slideToggle();
	});

	$("ul.breadcrumb li:nth-last-child(1) a").addClass('last-breadcrumb').removeAttr('href');

	$("#column-left .products-list .product-thumb, #column-right .products-list .product-thumb").unwrap();

	$("#content > h1, .account-wishlist #content > h2, .account-address #content > h2, .account-download #content > h2").first().addClass("page-title");

	// $("#content > .page-title").wrap("<div class='page-title-wrapper'><div class='breadcrumb-wrapper'><div class='container'></div></div></div>");
	// $(".page-title-wrapper .breadcrumb-wrapper .container").append($("ul.breadcrumb"));
	// $("#content > .page-title-wrapper").appendTo($("#page > .header-content-title"));

	$("#account-order #content > h2").wrap("<div class='page-title-wrapper'><div class='breadcrumb-wrapper'><div class='container'></div></div></div>");
	$("#account-address #content > h2").wrap("<div class='page-title-wrapper'><div class='breadcrumb-wrapper'><div class='container'></div></div></div>");
	$(".page-title-wrapper .breadcrumb-wrapper .container").append($("ul.breadcrumb"));
	$("#content > .page-title-wrapper").appendTo($("#page > .header-content-title"));

	$('#column-left .product-thumb .image, #column-right .product-thumb .image').attr('class', 'image col-xs-5 col-sm-4 col-md-4');
	$('#column-left .product-thumb .thumb-description, #column-right .product-thumb .thumb-description').attr('class', 'thumb-description col-xs-7 col-sm-8 col-md-8');

		$('#content .row > .product-list .product-thumb .image').attr('class', 'image col-xs-5 col-sm-4 col-md-4');
		$('#content .row > .product-list .product-thumb .thumb-description').attr('class', 'thumb-description col-xs-7 col-sm-8 col-md-8');
		$('#content .row > .product-grid .product-thumb .image').attr('class', 'image col-xs-12');
		$('#content .row > .product-grid .product-thumb .thumb-description').attr('class', 'thumb-description col-xs-12');

		$('select.form-control').wrap("<div class='select-wrapper'></div>");
		$('input[type="checkbox"]').each(function(){
            if( $(this).prop('checked') ){
                $(this).wrap("<span class='checkbox-wrapper active'></span>")
            }else{
                $(this).wrap("<span class='checkbox-wrapper'></span>")
            }
        });
		$('input[type="checkbox"]').attr('class','checkboxid');
		$('input[type="radio"]').each(function(){
			if( $(this).prop('checked') ){
				$(this).wrap("<span class='radio-wrapper active'></span>")
			}else{
				$(this).wrap("<span class='radio-wrapper'></span>")
			}
		});
		$('input[type="radio"]').attr('class','radioid');

		$('#column-left .products-list .btn-cart').removeAttr('data-original-title');

	  $("#ttcmsfooter").append($(".footer-container .block-social"));
/*-------start go to top---------*/
	$( "body" ).append( "<div class='backtotop-img'><div class='goToTop ttbox'></div></div>" );
	$( "body" ).append( "<div id='goToTop' title='Top' class='goToTop ttbox-img'></div>" );
	$("#goToTop").hide();
/*-------end go to top---------*/

/*---------------- Start cart ---------------- */
		   jQuery('body').on('click',function(e){
				jQuery('#cart').removeClass('open');
				jQuery(".header-cart-toggle").on('click',function(e){
						$(".header-cart-toggle").slideUp("slow");
				});
			});
/*---------------- End cart ---------------- */

/*---------------------- Inputtype Js Start -----------------------------*/
	$('.checkboxid').change(function(){
	if($(this).is(":checked")) {
	$(this).addClass("chkactive");
	$(this).parent().addClass('active');
	} else {
	$(this).removeClass("chkactive");
	$(this).parent().removeClass('active');
	}
	});

	$(function() {
	var $radioButtons = $('input[type="radio"]');
	$radioButtons.click(function() {
	$radioButtons.each(function() {
	$(this).parent().toggleClass('active', this.checked);
	});
	});
	});
/*---------------------- Inputtype Js End -----------------------------*/

/*------------- Slider -Loader Js Strat ---------------*/
		$(window).load(function() {
		$(".ttloading-bg").fadeOut("slow");
		})
/*------------- Slider -Loader Js End ---------------*/

/* Slider Load Spinner */
$(window).load(function() {
	$(".slideshow-panel .ttloading-bg").removeClass("ttloader");
});
/*-----------start menu toggle ------------*/

/* --------------- Start Sticky-Left JS ---------------*/
		function stickyleft() {
			if ($(document).width() <= 1199) {
				jQuery('#column-left, #column-Right').theiaStickySidebar({
		  additionalMarginBottom: 30,
		  additionalMarginTop: 30
		});
			} else if ($(document).width() >= 1200) {
				jQuery('#column-left, #column-Right').theiaStickySidebar({
		  additionalMarginBottom: 30,
		  additionalMarginTop: 130
		});
			}
		}
		$(document).ready(function() {
			stickyleft();
		});
		$(window).resize(function() {
			stickyleft();
		});
/* --------------- End Sticky-Left JS ---------------*/
/* --------------- Start Sticky-header JS ---------------*/
function menuClass() {
	if($( window ).width() > 1199) {
		$( ".left-main-menu" ).addClass( "left-menu" );
	}
	else {
		$( ".left-main-menu" ).removeClass( "left-menu" );
	}
}
$(document).ready(function(){menuClass();});
$(window).resize(function() {menuClass();});

		function header() {
		  if (jQuery(window).width() > 1199){
			if (jQuery(this).scrollTop() > 250) {
			  jQuery('.full-header').addClass("fixed");
			}else{
			  jQuery('.full-header').removeClass("fixed");
			}
		  } else {
			jQuery('.full-header').removeClass("fixed");
		  }
		}

		$(document).ready(function(){header();});
		jQuery(window).resize(function() {header();});
		jQuery(window).scroll(function() {header();});
/* --------------- End Sticky-header JS ---------------*/

   var tttestimonial = $("#tttestimonial-carousel");
    tttestimonial.owlCarousel({
        autoPlay: true,
		stopOnHover : true,
        pagination: true,
        paginationNumbers: false,
        items: 1, //10 items above 1000px browser width
        itemsDesktop: [1200, 1],
        itemsDesktopSmall: [991, 1],
        itemsTablet: [767, 1],
        itemsMobile: [480, 1]
    });


 	/* ---------------- start TT sub cat more menu ----------------------*/
		$('.tt-category-featured .content .caption .cat-sub > ul').each(function(){
		var subcat = $(this).find('li');
		var mainul = $(this).parent().closest('.caption').find('.cat-title > h4 > a');
		var ahref = mainul.attr('href');
		var max_link = 3;
		if ( subcat.length > max_link ) {
		$(this).append('<li class="more"><div class="tt_more-menu"><span class="categories"><a href="'+ahref+'">More</a></span></div></li>');
		}
		subcat.each(function(j) {
		if ( j >= max_link ) {
		$(this).css('display', 'none');
		$(this).addClass('disable');
		}
		});
		});

	/* ---------------- End TT sub cat more menu ----------------------*/
/* --------------------- Blog js Start -------------------------  */
 	var ttblog = $("#ttsmartblog-carousel");
      ttblog.owlCarousel({
     	 items :3, //10 items above 1000px browser width
		 itemsDesktop : [1200,3],
     	 itemsDesktopSmall : [991,2],
     	 itemsTablet: [767,2],
     	 itemsMobile : [480,1],
		 navigation: true,
		 pagination: false,
		 autoPlay: true
      });

      // Custom Navigation Events

     $(".ttblog_next").click(function(){
        ttblog.trigger('owl.next');
      })
      $(".ttblog_prev").click(function(){
        ttblog.trigger('owl.prev');
      })
/*-------------------------- Blog js End ------------------------------ */

/* ------------ Start TemplateTrip Parallax JS ------------ */
	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
	if(!isMobile) {
	if($(".parallex").length){  $(".parallex").sitManParallex({  invert: false });};
	}else{
	$(".parallex").sitManParallex({  invert: true });
	}
/* ------------ End TemplateTrip Parallax JS ------------ */

var relatedproduct = $(".related-carousel .related-items.products-carousel");
	relatedproduct.owlCarousel({
	items:4,
	itemsDesktop : [1199,3],
	itemsDesktopSmall : [991,3],
	itemsTablet: [767,2],
	itemsMobile : [480,1],
	navigation: true,
	pagination: false
});

// Carousel Counter
colsCarousel = $('#column-right, #column-left').length;
if (colsCarousel == 1) {
	ci=1;
} else if (colsCarousel == 0) {
	ci=4;
} else {
	ci=4;
}
// product Carousel
$("#content .products-carousel").owlCarousel({
	items: 4,
	itemsDesktop : [1400,4],
	itemsDesktopSmall : [1199,4],
	itemsTablet: [991,3],
	itemsTabletSmall: [767,2],
	itemsMobile : [480,1],
	navigation: true,
	pagination: false
});
$(".customNavigation .next").click(function(){
	$(this).parent().parent().find(".products-carousel").trigger('owl.next');
})
$(".customNavigation .prev").click(function(){
	$(this).parent().parent().find(".products-carousel").trigger('owl.prev');
})
$(".products-list .customNavigation").addClass('owl-navigation');

/* Go to Top JS START */
	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 150) {
				$('.goToTop').fadeIn();
			} else {
				$('.goToTop').fadeOut();
			}
		});

		// scroll body to 0px on click
		$('.goToTop').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 1000);
			return false;
		});
	});
	/* Go to Top JS END */
$(".product-layout.product-list .product-thumb .image .button-group").each(function(){
  $(this).appendTo($(this).parent().parent().find(".thumb-description"));
});
$(".product-layout.product-list .product-thumb .image .rating").each(function(){
	$(this).insertBefore($(this).parent().parent().parent().find(".thumb-description .caption .price"));
});
$(".product-layout.product-grid .product-thumb .thumb-description .button-group").each(function(){
  $(this).appendTo($(this).parent().parent().parent().find(".image"));
});
$(".product-layout.product-grid .product-thumb .thumb-description .caption .rating").each(function(){
  $(this).appendTo($(this).parent().parent().parent().find(".image"));
});

/* Active class in Product List Grid START */
	$('#list-view').click(function() {
		$('#grid-view').removeClass('active');
		$('#list-view').addClass('active');
		$('#content .row > .product-list .product-thumb .image').attr('class', 'image col-xs-5 col-sm-4 col-md-4');
		$('#content .row > .product-list .product-thumb .thumb-description').attr('class', 'thumb-description col-xs-7 col-sm-8 col-md-8');
		//$(".product-layout.product-list .product-thumb .button-group .btn-cart").removeAttr('data-original-title'); /* for remove tooltrip */
		$(".product-layout.product-list .product-thumb .image .button-group").each(function(){
		  $(this).appendTo($(this).parent().parent().find(".thumb-description"));
		});
		$(".product-layout.product-list .product-thumb .image .rating").each(function(){
			$(this).insertBefore($(this).parent().parent().parent().find(".thumb-description .caption .price"));
		});

	});
	$('#grid-view').click(function() {
		$('#list-view').removeClass('active');
		$('#grid-view').addClass('active');
		$('#content .row > .product-grid .product-thumb .image').attr('class', 'image col-xs-12');
		$('#content .row > .product-grid .product-thumb .thumb-description').attr('class', 'thumb-description col-xs-12');
		//$(".product-layout.product-grid .product-thumb .button-group .btn-cart").attr('data-original-title','Add to cart');/* for add tooltrip */
		$(".product-layout.product-grid .product-thumb .thumb-description .button-group").each(function(){
		  $(this).appendTo($(this).parent().parent().parent().find(".image"));
		});
		$(".product-layout.product-grid .product-thumb .thumb-description .caption .rating").each(function(){
		  $(this).appendTo($(this).parent().parent().parent().find(".image"));
		});

	});
	if (localStorage.getItem('display') == 'list') {
		$('#list-view').addClass('active');
	} else {
		$('#grid-view').addClass('active');
	}
	/* Active class in Product List Grid END */

}); // Documnet.ready() over....
/*****************start animation script*******************/
function hb_animated_contents() {
	$(".hb-animate-element:in-viewport").each(function (i) {
	var $this = $(this);
	if (!$this.hasClass('hb-in-viewport')) {
	setTimeout(function () {
	$this.addClass('hb-in-viewport');
	}, 180 * i);
	}
	});
	}
	$(window).scroll(function () {
	hb_animated_contents();
	});
	$(window).load(function () {
	hb_animated_contents();
});
/*****************end animation script*******************/
function footerToggle() {
	if($( window ).width() < 992) {
		$("footer .footer-column h5").addClass( "toggle" );
		$("footer .footer-column ul").css( 'display', 'none' );
		$("footer .footer-column.active ul").css( 'display', 'block' );
		$("footer .footer-column h5.toggle").unbind("click");
		$("footer .footer-column h5.toggle").click(function() {
			$(this).parent().toggleClass('active').find('ul.list-unstyled').slideToggle( "fast" );
		});
	} else {
		$("footer .footer-column h5.toggle").unbind("click");
		$("footer .footer-column h5").removeClass('toggle');
		$("footer .footer-column ul.list-unstyled").css('display', 'block');
	}
}
$(document).ready(function() {footerToggle();});
$(window).resize(function() {footerToggle();});


/* FilterBox - Responsive Content*/
function optionFilter(){

	if ($(window).width() <= 991) {
		$('#column-left .option-filter-box').appendTo('#content .category-description');
		$('#column-right .option-filter-box').appendTo('#content .category-description');

	} else {
		$('#content .category-description .option-filter-box').appendTo('#column-left .option-filter');
		$('#content .category-description .option-filter-box').appendTo('#column-right .option-filter');
	}
}
$(document).ready(function(){ optionFilter(); });
$(window).resize(function(){ optionFilter(); });


function columnToggle() {
	if($( window ).width() < 992) {

		$("#column-left .panel-heading").addClass( "toggle" );
		$("#column-left .list-group").css( 'display', 'none' );
		$("#column-left .panel-default.active .list-group").css( 'display', 'block' );
		$("#column-left .panel-heading.toggle").unbind("click");
		$("#column-left .panel-heading.toggle").click(function() {
		$(this).parent().toggleClass('active').find('.list-group').slideToggle( "fast" );
		});

		$("#column-left .box-heading").addClass( "toggle" );
		$("#column-left .products-carousel").css( 'display', 'none' );
		$("#column-left .products-list.active .products-carousel").css( 'display', 'block' );
		$("#column-left .box-heading.toggle").unbind("click");
		$("#column-left .box-heading.toggle").click(function() {
		$(this).parent().toggleClass('active').find('.products-carousel').slideToggle( "fast" );
		});

	} else {

		$("#column-left .panel-heading").unbind("click");
		$("#column-left .panel-heading").removeClass( "toggle" );
		$("#column-left .list-group").css( 'display', 'block' );

		$("#column-left .box-heading").unbind("click");
		$("#column-left .box-heading").removeClass( "toggle" );
		$("#column-left .products-carousel").css( 'display', 'block' );

	}
}

$(document).ready(function() {columnToggle();});
$(window).resize(function() {columnToggle();});

/* Category List - Tree View */
function categoryListTreeView() {
	$(".category-treeview li.category-li").find("ul").parent().prepend("<div class='list-tree'></div>").find("ul").css('display','none');

	$(".category-treeview li.category-li.category-active").find("ul").css('display','block');
	$(".category-treeview li.category-li.category-active").toggleClass('active');
}
$(document).ready(function() {categoryListTreeView();});


/* Category List - TreeView Toggle */
function categoryListTreeViewToggle() {
	$(".category-treeview li.category-li .list-tree").click(function() {
		$(this).parent().toggleClass('active').find('ul').slideToggle();
	});
}
$(document).ready(function() {categoryListTreeViewToggle();});
$(document).ready(function(){ menuMore(); });
function menuToggle() {
	if($( window ).width() < 992) {
		$(".main-category-list .menu-category ul.dropmenu").css('display', 'none');

		$(".main-category-list ul.dropmenu li.dropdown > i").remove();
		$(".main-category-list ul.dropmenu .dropdown-menu ul li.dropdown-inner > i").remove();

		$(".main-category-list ul.dropmenu > li.dropdown > a").after("<i class='fa fa-angle-down'></i>");
		//$(".menu-category > li.dropdown .dropdown-inner ul > li.dropdown a.single-dropdown").after("<i class='fa fa-angle-down'></i>");

		$(".main-category-list ul.dropmenu > li.dropdown > span").after("<i class='fa fa-angle-down'></i>");

		$(".main-category-list .TT-panel-heading").unbind("click");
		$('.main-category-list .TT-panel-heading').click(function(){
			$(this).parent().toggleClass('TTactive').find('ul.dropmenu').slideToggle( "fast" );
		});

		$(".main-category-list ul.dropmenu > li.dropdown > i").unbind("click");
		$(".main-category-list ul.dropmenu > li.dropdown > i").click(function() {
			$(this).parent().toggleClass("active").find("ul").first().slideToggle();
		});

		$(".menu-category > li.dropdown .dropdown-inner ul > li.dropdown > i").unbind("click");
		$(".menu-category > li.dropdown .dropdown-inner ul > li.dropdown > i").click(function() {
			$(this).parent().toggleClass("active").find(".dropdown-menu").slideToggle();
		});
	}
	else {
		$(".menu-category > li.dropdown .dropdown-inner ul > li.dropdown > i").unbind("click");
		$(".menu-category > li.dropdown .dropdown-inner ul > li.dropdown > i").unbind("click");
		$(".main-category-list").removeClass('ttactive');
		$(".main-category-list .menu-category ul.dropmenu").css('display', 'block');
		$(".menu-category ul.dropmenu li.dropdown > i").remove();
		$(".menu-category > li.dropdown .dropdown-inner ul > li.dropdown > i").remove();
		$(".main-category-list ul.dropmenu > li.dropdown > i").remove();
	}
}
$(document).ready(function() {menuToggle();});
$( window ).resize(function(){menuToggle();});

/* Main Menu - MORE items */
function menuMore(){
	//$(function($){
		var max_items = 3;
		var liItems = $('.menu-category > ul.dropmenu > li');
		var remainItems = liItems.slice(max_items, liItems.length);
		remainItems.wrapAll('<li class="dropdown more-menu"><div class="dropdown-menu"><div class="dropdown-inner"><ul class="list-unstyled childs_1 single-dropdown-menu"></ul></div></div></li>');
		$('.more-menu').prepend('<span>More<div class="blog-nav-dot blog-detail-dot"></div></span>');
	//});
}

/* Animate effect on Review Links - Product Page */
$(".product-total-review, .product-write-review").click(function() {
    $('html, body').animate({ scrollTop: $(".product-tabs").offset().top }, 1000);
});


function responsivecolumn()
{
	if ($(document).width() <= 991)
	{
		$('#page > .container > .content_wrap > #column-left').appendTo('#page  > .container > .content_wrap');
		$('#page > .container > .content_wrap > #column-right').appendTo('#page  > .container > .content_wrap');
	}
	else if($(document).width() >= 992)
	{
		$('#page > .container > .content_wrap > #column-left').prependTo('#page  > .container > .content_wrap');
		$('#page > .container > .content_wrap > #column-right').prependTo('#page  > .container > .content_wrap');
	}
}
$(document).ready(function(){responsivecolumn();});
$(window).resize(function(){responsivecolumn();});


function cookiecall()
{
	// Notification Module
	$('.module-notification').each(function () {
		var $this = $(this);
		var options = $this.data('options');
		var cookie = 'n-' + options['cookie'];

		if (!$.cookie('acceptcookie')) {
			$this.find('.notification-close').on('click', function () {
				$('.module-notification').slideUp("slow");
				$.cookie('acceptcookie', 'yes', {expires: 1 });
			});
		}
		else{
			$('.module-notification').css('display', 'none')
		}
	});

}
$(document).ready(function(){cookiecall();});
