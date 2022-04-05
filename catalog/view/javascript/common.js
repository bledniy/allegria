function getURLVar(key) {
	var value = [];

	var query = String(document.location).split('?');

	if (query[1]) {
		var part = query[1].split('&');

		for (i = 0; i < part.length; i++) {
			var data = part[i].split('=');

			if (data[0] && data[1]) {
				value[data[0]] = data[1];
			}
		}

		if (value[key]) {
			return value[key];
		} else {
			return '';
		}
	} else { 			// Изменения для seo_url OpenCart 3x
		var query = String(document.location.pathname).split('/');
		if (query[query.length - 1] == 'cart') value['route'] = 'checkout/cart';
		if (query[query.length - 1] == 'checkout') value['route'] = 'checkout/checkout';

		if (value[key]) {
			return value[key];
		} else {
			return '';
		}
	}
}

$( document ).ajaxSend(function( ) {
	$('button').prop('disabled', true);
});
$( document ).ajaxStop(function() {
	$('button').prop('disabled', false);
});

$(document).ready(function() {
    // Desktop menu handler
    if( $(window).width() > 991 ){
        $('.sex .sex-current').hoverIntent(function(){
            var dropdown = $(this).children('.child-menu');
            if(dropdown.length === 0) return;
            $(this).addClass('active');
            dropdown.addClass('active');
        }, function(){
            var dropdown = $(this).children('.child-menu');
            if(dropdown.length === 0) return;
            $(this).removeClass('active');
            dropdown.removeClass('active');
        });
    }
	// Highlight any found errors
	$('.text-danger').each(function() {
		var element = $(this).parent().parent();

		if (element.hasClass('form-group')) {
			element.addClass('has-error');
		}
	});

	// Currency
	$('#form-currency .currency-select').on('click', function(e) {
		e.preventDefault();

		$('#form-currency input[name=\'code\']').val($(this).attr('name'));

		$('#form-currency').submit();
	});

	// Language
/* 	$('#form-language .language-select').on('click', function(e) {
		e.preventDefault();

		$('#form-language input[name=\'code\']').val($(this).attr('name'));

		$('#form-language').submit();
	}); */
    $('.js-form-language a').on('click', function(e){
        e.preventDefault();
        var code = $(this).attr('data-code');
        var $form = $(this).parents('.js-form-language')
        if( ! code ) return;

        $form.find('input[name=\'code\']').val(code);

        $form.submit();
    })

    // Popups

    $(document).on('click', '[data-popup]', function(ev){
        ev.preventDefault();
        var id = $(this).attr('data-popup');
        var $popup = $('#' + id);
        if($popup.length === 0) return;
        $('.popup-bg').fadeIn();
        $popup.fadeIn();
        $('body').addClass('is-ohidden');
    })

    $(document).on('click', '.js-popup-close, .popup-bg', function(){
        $('.popup').fadeOut();
        $('.popup-bg').fadeOut();
        $('body').removeClass('is-ohidden');

    })

	/* Search */
	$('.js-search-form input[name=\'search\']').parent().find('button').on('click', function() {
		var url = $('base').attr('href') + 'index.php?route=product/search';

		var value = $(this).siblings('input[name=\'search\']').val();

		if (value) {
			url += '&search=' + encodeURIComponent(value);
		}

		location = url;
	});

	$('.js-search-form input[name=\'search\']').on('keydown', function(e) {
		if (e.keyCode == 13) {
			$(this).parent().find('button').trigger('click');
		}
	});

	// Menu
	$('#menu .dropdown-menu').each(function() {
		var menu = $('#menu').offset();
		var dropdown = $(this).parent().offset();

		var i = (dropdown.left + $(this).outerWidth()) - (menu.left + $('#menu').outerWidth());

		if (i > 0) {
			$(this).css('margin-left', '-' + (i + 10) + 'px');
		}
	});

	// Product List
	$('#list-view').click(function() {
		$('#content .product-grid > .clearfix').remove();

		$('#content .row > .product-grid').attr('class', 'product-layout product-list col-xs-12');
		$('#grid-view').removeClass('active');
		$('#list-view').addClass('active');

		localStorage.setItem('display', 'list');
	});

	// Product Grid
	$('#grid-view').click(function() {
		// What a shame bootstrap does not take into account dynamically loaded columns
		var cols = $('#column-right, #column-left').length;

		if (cols == 2) {
			$('#content .product-list').attr('class', 'product-layout product-grid col-lg-6 col-md-6 col-sm-12 col-xs-12');
		} else if (cols == 1) {
			$('#content .product-list').attr('class', 'product-layout product-grid col-lg-4 col-md-4 col-sm-6 col-xs-12');
		} else {
			$('#content .product-list').attr('class', 'product-layout product-grid col-lg-3 col-md-3 col-sm-6 col-xs-12');
		}

		$('#list-view').removeClass('active');
		$('#grid-view').addClass('active');

		localStorage.setItem('display', 'grid');
	});

	if (localStorage.getItem('display') == 'list') {
		$('#list-view').trigger('click');
		$('#list-view').addClass('active');
	} else {
		$('#grid-view').trigger('click');
		$('#grid-view').addClass('active');
	}

	// Checkout
	$(document).on('keydown', '#collapse-checkout-option input[name=\'email\'], #collapse-checkout-option input[name=\'password\']', function(e) {
		if (e.keyCode == 13) {
			$('#collapse-checkout-option #button-login').trigger('click');
		}
	});

	// // tooltips on hover
	// $('[data-toggle=\'tooltip\']').tooltip({container: 'body'});

	// // Makes tooltips work on ajax generated content
	// $(document).ajaxStop(function() {
	// 	$('[data-toggle=\'tooltip\']').tooltip({container: 'body'});
	// });
});

// Cart add remove functions
var cart = {
	'add': function(product_id, quantity) {
		$.ajax({
			url: 'index.php?route=checkout/cart/add',
			type: 'post',
			data: 'product_id=' + product_id + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').button('loading');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},
			success: function(json) {
				$('.alert-dismissible, .text-danger').remove();

				// if (json['redirect']) {
				// 	location = json['redirect'];
				// }

				if (json['success']) {
					$('#content').parent().before('<div class="alert alert-success alert-dismissible"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');

					// Need to set timeout otherwise it wont update the total
					setTimeout(function () {
						$('#cart .badge-content').html(json['total']);
					}, 100);

					$('html, body').animate({ scrollTop: 0 }, 'slow');

					$('#cart > ul').load('index.php?route=common/cart/info ul li');
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	},
	'update': function(key, quantity) {
		$.ajax({
			url: 'index.php?route=checkout/cart/edit',
			type: 'post',
			data: 'key=' + key + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').button('loading');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},
			success: function(json) {
				// Need to set timeout otherwise it wont update the total
				setTimeout(function () {
					$('#cart .badge-content').html(json['total']);
				}, 100);

				if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
					location = 'index.php?route=checkout/cart';
				} else {
					$('#cart > ul').load('index.php?route=common/cart/info ul li');
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	},
	'remove': function(key) {
		$.ajax({
			url: 'index.php?route=checkout/cart/remove',
			type: 'post',
			data: 'key=' + key,
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').button('loading');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},
			success: function(json) {
				// Need to set timeout otherwise it wont update the total
				setTimeout(function () {
					$('#cart .badge-content').html(json['total']);
				}, 100);

				if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
					location = 'index.php?route=checkout/cart';
				} else {
					$('#cart > ul').load('index.php?route=common/cart/info ul li');
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	}
}

var voucher = {
	'add': function() {

	},
	'remove': function(key) {
		$.ajax({
			url: 'index.php?route=checkout/cart/remove',
			type: 'post',
			data: 'key=' + key,
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').button('loading');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},
			success: function(json) {
				// Need to set timeout otherwise it wont update the total
				setTimeout(function () {
					$('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + json['total'] + '</span>');
				}, 100);

				if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
					location = 'index.php?route=checkout/cart';
				} else {
					$('#cart > ul').load('index.php?route=common/cart/info ul li');
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	}
}

var wishlist = {
	'add': function(product_id) {
		$.ajax({
			url: 'index.php?route=account/wishlist/add',
			type: 'post',
			data: 'product_id=' + product_id,
			dataType: 'json',
			success: function(json) {
				$('.alert-dismissible').remove();

				if (json['redirect']) {
					location = json['redirect'];
				}

				if (json['success']) {
					$('#content').parent().before('<div class="alert alert-success alert-dismissible"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				}

				$('#wishlist-total .badge-content').html(json['total']);

				$('html, body').animate({ scrollTop: 0 }, 'slow');
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	},
	'remove': function(product_id) {
        $.ajax({
			url: 'index.php?route=account/wishlist/remove',
			type: 'post',
			data: 'product_id=' + product_id,
			dataType: 'json',
			success: function(json) {
				$('.alert-dismissible').remove();

				if (json['redirect']) {
					location = json['redirect'];
				}

				if (json['success']) {
					$('#content').parent().before('<div class="alert alert-success alert-dismissible"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				}

				$('#wishlist-total .badge-content').html(json['total']);

				$('html, body').animate({ scrollTop: 0 }, 'slow');
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	}
}

$(document).ready(function(){
    $(document).on('click', '[data-wishlist-toggle]', function(){
        var product_id = $(this).attr('data-wishlist-toggle');
        var isActive = $(this).hasClass('active');
        if( product_id.length === 0 ) return;

        if( isActive ){
            wishlist.remove(product_id);
        }else{
            wishlist.add(product_id);
        }

        $(this).toggleClass('active');
    })
})

var compare = {
	'add': function(product_id) {
		$.ajax({
			url: 'index.php?route=product/compare/add',
			type: 'post',
			data: 'product_id=' + product_id,
			dataType: 'json',
			success: function(json) {
				$('.alert-dismissible').remove();

				if (json['success']) {
					$('#content').parent().before('<div class="alert alert-success alert-dismissible"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');

					$('#compare-total').html(json['total']);

					$('html, body').animate({ scrollTop: 0 }, 'slow');
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	},
	'remove': function() {

	}
}

/* Agree to Terms */
$(document).delegate('.agree', 'click', function(e) {
	e.preventDefault();

	$('#modal-agree').remove();

	var element = this;

	$.ajax({
		url: $(element).attr('href'),
		type: 'get',
		dataType: 'html',
		success: function(data) {
			html  = '<div id="modal-agree" class="modal">';
			html += '  <div class="modal-dialog">';
			html += '    <div class="modal-content">';
			html += '      <div class="modal-header">';
			html += '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
			html += '        <h4 class="modal-title">' + $(element).text() + '</h4>';
			html += '      </div>';
			html += '      <div class="modal-body">' + data + '</div>';
			html += '    </div>';
			html += '  </div>';
			html += '</div>';

			$('body').append(html);

			$('#modal-agree').modal('show');
		}
	});
});

// Autocomplete */
(function($) {
	$.fn.autocomplete = function(option) {
		return this.each(function() {
			this.timer = null;
			this.items = new Array();

			$.extend(this, option);

			$(this).attr('autocomplete', 'off');

			// Focus
			$(this).on('focus', function() {
				this.request();
			});

			// Blur
			$(this).on('blur', function() {
				setTimeout(function(object) {
					object.hide();
				}, 200, this);
			});

			// Keydown
			$(this).on('keydown', function(event) {
				switch(event.keyCode) {
					case 27: // escape
						this.hide();
						break;
					default:
						this.request();
						break;
				}
			});

			// Click
			this.click = function(event) {
				event.preventDefault();

				value = $(event.target).parent().attr('data-value');

				if (value && this.items[value]) {
					this.select(this.items[value]);
				}
			}

			// Show
			this.show = function() {
				var pos = $(this).position();

				$(this).siblings('ul.dropdown-menu').css({
					top: pos.top + $(this).outerHeight(),
					left: pos.left
				});

				$(this).siblings('ul.dropdown-menu').show();
			}

			// Hide
			this.hide = function() {
				$(this).siblings('ul.dropdown-menu').hide();
			}

			// Request
			this.request = function() {
				clearTimeout(this.timer);

				this.timer = setTimeout(function(object) {
					object.source($(object).val(), $.proxy(object.response, object));
				}, 200, this);
			}

			// Response
			this.response = function(json) {
				html = '';

				if (json.length) {
					for (i = 0; i < json.length; i++) {
						this.items[json[i]['value']] = json[i];
					}

					for (i = 0; i < json.length; i++) {
						if (!json[i]['category']) {
							html += '<li data-value="' + json[i]['value'] + '"><a href="#">' + json[i]['label'] + '</a></li>';
						}
					}

					// Get all the ones with a categories
					var category = new Array();

					for (i = 0; i < json.length; i++) {
						if (json[i]['category']) {
							if (!category[json[i]['category']]) {
								category[json[i]['category']] = new Array();
								category[json[i]['category']]['name'] = json[i]['category'];
								category[json[i]['category']]['item'] = new Array();
							}

							category[json[i]['category']]['item'].push(json[i]);
						}
					}

					for (i in category) {
						html += '<li class="dropdown-header">' + category[i]['name'] + '</li>';

						for (j = 0; j < category[i]['item'].length; j++) {
							html += '<li data-value="' + category[i]['item'][j]['value'] + '"><a href="#">&nbsp;&nbsp;&nbsp;' + category[i]['item'][j]['label'] + '</a></li>';
						}
					}
				}

				if (html) {
					this.show();
				} else {
					this.hide();
				}

				$(this).siblings('ul.dropdown-menu').html(html);
			}

			$(this).after('<ul class="dropdown-menu"></ul>');
			$(this).siblings('ul.dropdown-menu').delegate('a', 'click', $.proxy(this.click, this));

		});
	}

	// Custom scripts
	$(document).ready(function(){
		$(".catalog .sidebar-filter .tabs_body .filter-row .head").click(function(){
			$(this).parent().toggleClass('open');
		});

		// $(document).on('click', '.js-quickview', function(){
		// 	var productId = $(this).attr('data-product-id');
		// 	if(productId.length === 0) return;
		// 	cart.add(productId, 1);
		// 	window.location.href = '/index.php?route=checkout/simplecheckout';
		// })

		// $(".catalog .sidebar-filter .tabs_head ul li").click(function(){
		// 	$('.catalog .sidebar-filter .tabs_head ul li').toggleClass('active');
		// 	$('.catalog .sidebar-filter .tabs_body').toggleClass('active');
		// });

		$(".header-mob-trigger").click(function(){
			$(this).toggleClass('open');
			$('header .container-mob').toggleClass('open');
		});

		$("header .container-mob .body .child-menu .col .title_cat").click(function(){
			$(this).parent().toggleClass('open');
		});

		$("header .header-center .sex li").click(function(){
			$('header .header-center .sex li').toggleClass('sex-current');
			$('header .container-mob .body .child-menu').toggleClass('active');
		});

		// $("#filter_mob").click(function(){
		// 	$('.catalog .sidebar-filter').addClass('open');
		// });

		$("#filter_mob").click(function(){
			$('.catalog .sidebar-filter').addClass('open');
			$('.background').addClass('show');
			$('#product-category').addClass('active');
		});

		$("#sort_mob").click(function(){
			$('.sort-method-mob').addClass('open');
			$('.background').addClass('show');
		});

		$(".sort-method-mob .sort-head .close").click(function(){
			$('.sort-method-mob').removeClass('open');
			$('.background').removeClass('show');
		});

		$(".filter-head-mob .close").click(function(){
			$('.catalog .sidebar-filter').removeClass('open');
			$('.background').removeClass('show');
			$('#product-category').removeClass('active');
		});

		$(".background").click(function(){
			$('.catalog .sidebar-filter').removeClass('open');
			$('.background').removeClass('show');
			$('#product-category').removeClass('active');
			$('.sort-method-mob').removeClass('open');
		});

		$(".filter-head-mob .back").click(function(){
			$('.catalog .sidebar-filter').removeClass('open');
			$('.background').removeClass('show');
		});

		$(".sort-method-mob .sort-body ul li").click(function(){
			$('.sort-method-mob .sort-body ul li').removeClass('active');
			$(this).addClass('active');
		});

        $('.js-modal-close').on('click', function(){
			$('.modal').modal('hide')
        })

		$('.close').on('click', function(){
			$('.modal').modal('hide')
		})

        $('.js-modal-close > .modal-dialog').on('click', function(ev){
			ev.stopPropagation();
		})

        $('.js-show-password').on('click', function(){
            var input = $(this).siblings('input');
            $(this).toggleClass('is-active');
            if( $(this).hasClass('is-active') ){
                input.attr('type', 'text');
            }else{
                input.attr('type', 'password');
            }
        })

		$('#account-sidebar a').each(function(){
			if( $(this).attr('href') === window.location.href ){
				$(this).addClass('is-active');
			}
		})
	})

})(window.jQuery);
