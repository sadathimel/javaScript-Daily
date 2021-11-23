// Main Js File

var Molla = [];

if ( window.NodeList && !NodeList.prototype.forEach ) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

( function ( $ ) {
  'use strict';
  function molla_filter( func_name, args ) {
    var events = $._data( $( document )[ 0 ], 'events' );
    if ( events[ func_name ] ) {
      return events[ func_name ][ 0 ].handler.call( args );
    }
    return args[ 0 ];
  }

  var size_tab_active = false,
    sticky_header_height = 0,
    sticky_offset_top = 0,
    ajax_filter_cat_content = {},
    desktop_width = 992,
    tablet_width = 768,
    mobile_width = 576,
    mobile_menu_load = true,
    skrollr_id = '';

  var gutterWidth;
  if ( $( 'header .container' ).length ) {
    gutterWidth = parseInt( $( 'header .container' ).css( 'padding-right' ) );
  } else if ( $( 'header .container-fluid' ).length ) {
    gutterWidth = parseInt( $( 'header .container-fluid' ).css( 'padding-right' ) );
  } else {
    gutterWidth = 20;
  }

  var self = Molla = {
    initialised: false,
    mobile: false,
    init: function () {
      if ( !this.initialised ) {
        this.initialised = true;
      } else {
        return;
      }

      if ( $.fn.lazyload ) {
        var lazy_options = {
          effect: 'fadeIn',
          data_attribute: 'src',
          effect_speed: 400,
          load: function () {
            self.afterImgLoaded( $( document.body ), $( this ) );
          }
        };
        $( '.owl-carousel' ).on(
          'initialized.owl.carousel resized.owl.carousel',
          function ( e ) {
            if ( $( this ).find( '.owl-item.cloned' ).length ) {
              $( this ).find( '.molla-lazyload, .molla-lazyload-back' ).filter(
                function () {
                  if ( $( this ).data( '_lazyload_init' ) ) {
                    return false;
                  }
                  return true;
                }
              ).data( '_lazyload_init', 1 ).map(
                function () {
                  $( this ).lazyload( lazy_options );
                }
              );
            }
          }
        );
      }

      // Molla functions
      self.headerHeight();
      self.stickyHeaderHeight();
      self.searchToggle();
      self.noLink();
      self.stickyHeader();
      self.dropdownToggle();
      self.mobileMenu();
      self.sidebarTitle();
      self.sidebarCtrl();
      self.magnificPopup();
      self.requiredFields();
      self.sectionScrolling();
      self.productSlide();
      self.priceSlider();
      self.resetShopAttrs();
      self.quantityInputs();
      self.stickySidebarInit();
      self.owlCarousels();
      self.checkoutInput();
      self.isotopeInit();
      self.productImageZoom();
      self.countDown();
      self.countTo();
      self.reviewLink();
      self.scrollTo();
      self.scrollToTop();
      self.layoutForm();
      self.sizeGuide();
      self.commentRecommend();
      self.googleMap();
      self.quickView();
      self.carouselDot();
      self.parallaxCtrl();
      self.floatingElements();
      self.lazyloadImg();
      self.lazyloadMenu();
      self.checkPopupExists();
      self.fitVid();
      self.add_to_cart_sticky();
      self.loadResizeAfter();
      self.wc_fragments_refreshed();
      self.refreshCartFragment();
      self.miniCartUpdate();
      self.cartCanvasToggle();
      self.ajax_cart_loaded();
      self.ajax_load();
      self.ajax_login_form();
      self.ajax_login_form_submit();
      self.countUpdatedCtrl();
      self.tabCtrl();
      self.productSelect();
      self.productOrder();
      self.preOrder();
      self.windowEvents();
      self.productTotalSales();
      self.progressInit();
      self.productGallery();
      self.singleProduct( $( '.single-products' ) );
      self.appearAnimate( '.elementor-widget-molla_banner .banner-elem, .elementor-widget-molla_banner .banner-content' );
      setTimeout( function () {
        function stopDrag( e ) {
          $( e.target ).closest( '.product-intro .owl-carousel' ).length && e.stopPropagation();
        }
        $( '.single-products.owl-carousel .single-product-widget' ).each( function () {
          this.addEventListener( 'mousedown', stopDrag );
          if ( 'ontouchstart' in document ) {
            this.addEventListener( 'touchstart', stopDrag, { passive: true } );
          }
        } )

        self.productSingle( '.product-intro' );
      } )


      $( document.body ).on( 'adding_to_cart', function ( e, $btn, data ) {
        data.quantity = $btn.closest( '.product' ).find( '.qty' ).val();
      } );
    },
    requestTimeout: function ( fn, delay ) {
      var handler = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
      if ( !handler ) {
        return setTimeout( fn, delay );
      }
      var start, rt = new Object();

      function loop( timestamp ) {
        if ( !start ) {
          start = timestamp;
        }
        var progress = timestamp - start;
        progress >= delay ? fn.call() : rt.val = handler( loop );
      };

      rt.val = handler( loop );
      return rt;
    },
    getScrollbarWidth: function () {
      return window.innerWidth - document.body.clientWidth;
    },
    calcDesktopWidth: function () {
      desktop_width = 992 - self.getScrollbarWidth();
    },
    headerHeight: function () {
      return $( 'header:not(.fixed-header)' ).outerHeight();
    },
    stickyHeaderHeight: function () {
      $( '.sticky-wrapper' ).each(
        function () {
          var $sticky_header = $( this ).find( '.sticky-header' );
          $sticky_header.addClass( 'fixed' );
          sticky_header_height += $sticky_header.outerHeight();
          $sticky_header.removeClass( 'fixed' );
        }
      )
      sticky_offset_top = sticky_header_height + ( 'undefined' == typeof $( '#wpadminbar' ).outerHeight( true ) ? 0 : $( '#wpadminbar' ).outerHeight( true ) );
    },
    calcMegamenuPosition: function () {
      if ( $( window ).width() < 992 ) {
        $( '.menu .megamenu > .sub-menu' ).each(
          function () {
            $( this ).css( 'max-width', '' ).css( 'margin-left', '' );
          }
        );
        return;
      }

      // category dropdown menu
      $( '.menu-vertical .megamenu > .sub-menu' ).each(
        function () {
          var $this = $( this ),
            outerWidth = $this.outerWidth(),
            $dropdown_menu = $this.closest( '.menu-vertical' ),
            offset = ( $dropdown_menu.offset().left + $dropdown_menu.outerWidth() + outerWidth ) - ( $( window ).width() - parseInt( $( '.page-wrapper' ).css( 'margin-right' ) ) - gutterWidth );
          $this.css( 'max-width', outerWidth - offset + 'px' );
        }
      )

      // general menu
      $( '.menu:not(.menu-vertical) .megamenu > .sub-menu' ).each(
        function () {
          var $this = $( this ),
            left = $this.offset().left,
            outerWidth = $this.outerWidth(),
            offset = ( left + outerWidth ) - ( $( window ).width() - parseInt( $( '.page-wrapper' ).css( 'margin-right' ) ) - gutterWidth );

          if ( ( parseInt( $this.css( 'margin-left' ) ) < 0 || offset > 0 ) && left > gutterWidth ) {
            $this.css( 'margin-left', -offset + 'px' );
          } else {
            $this.css( 'max-width', outerWidth - offset + 'px' );
          }
        }
      );
    },
    searchToggle: function () {
      // Header Search Toggle

      $( 'body' ).on(
        'click',
        '.header .search-toggle',
        function ( e ) {
          $( '.header .search-wrapper' ).toggleClass( 'show' );
          $( this ).toggleClass( 'active' );
          $( '.header .search-wrapper' ).find( 'input' ).focus();
          e.preventDefault();
        }
      );

      $( 'body' ).on(
        'click',
        function ( e ) {
          if ( $( '.header .search-wrapper' ).hasClass( 'show' ) ) {
            $( '.header .search-wrapper' ).removeClass( 'show' );
            $( '.header .search-toggle' ).removeClass( 'active' );
            $( 'body' ).removeClass( 'is-search-active' );
          }
        }
      );

      $( 'body' ).on(
        'click',
        '.header-search',
        function ( e ) {
          e.stopPropagation();
        }
      );

      $( 'body' ).on(
        'click',
        '.top-menu > li > a',
        function ( e ) {
          e.preventDefault();
        }
      )
    },
    noLink: function () {
      // header no link
      $( 'body' ).on(
        'click',
        '.no-link > a',
        function () {
          return false;
        }
      )
    },
    stickyHeader: function () {
      // Sticky header
      var $header = $( '.header' );
      var height = $header.height(),
        sticky_offset = 0,
        active_toggle = 0;

      // get sticky offset
      if ( $header.data( 'stickyOffset' ) ) {
        sticky_offset = parseInt( $header.data( 'stickyOffset' ) );
      }

      if ( $( '.custom-header' ).length && $( '.custom-header .sticky-header' ).length ) {
        $( '.custom-header .sticky-header' ).wrap( '<div class="sticky-wrapper"></div>' );
      }

      $( window ).on(
        'load scroll resize',
        function () {
          height = $( 'header' ).height() + sticky_offset;
          if ( $( '.sticky-header' ).length && $( window ).width() >= desktop_width ) {
            if ( $( window ).scrollTop() > height ) {
              $( '.sticky-header' ).each(
                function () {
                  if ( !$( this ).hasClass( 'fixed' ) ) {
                    var $this = $( this );
                    $this.closest( '.sticky-wrapper' ).height( $this.outerHeight() + 'px' );
                    if ( !$this.hasClass( 'fixed' ) ) {
                      active_toggle = $this.find( '.dropdown-menu-wrapper.open-toggle' ).hasClass( 'show' );
                    }
                    $this.addClass( 'fixed' );
                    $( 'body' ).hasClass( 'home' ) && $this.find( '.dropdown-menu-wrapper.open-toggle' ).removeClass( 'show' );
                  }
                }
              )
            } else {
              $( 'body' ).hasClass( 'home' ) && $( '.dropdown-menu-wrapper.open-toggle' ).each(
                function () {
                  var $this = $( this );
                  if ( active_toggle ) {
                    $this.closest( '.sticky-header' ).hasClass( 'fixed' ) && $this.addClass( 'show' );
                  }
                }
              );

              $( '.sticky-header' ).removeClass( 'fixed' );
              $( '.sticky-header' ).css( 'top', '' );
            }
            var sticky_height = 'undefined' == typeof $( '#wpadminbar' ).height() ? 0 : $( '#wpadminbar' ).height();
            var z_index = $( '.sticky-header.fixed' ).css( 'z-index' );
            var $last_sticky = $( '.sticky-header.fixed' );
            $( '.sticky-header.fixed' ).each(
              function () {
                $last_sticky = $( this );
                if ( !sticky_height ) {
                  sticky_height = 0;
                }
                $( this ).css( 'top', sticky_height + 'px' );
                sticky_height += $( this ).outerHeight();
                $( this ).css( 'z-index', z_index );
                z_index--;
              }
            )
            $last_sticky.parent().siblings( '.sticky-wrapper' ).find( '.sticky-header.fixed' ).css( 'box-shadow', 'none' );
          }
        }
      )
    },
    dropdownToggle: function () {
      $( '.dropdown-menu-wrapper.open-toggle>.dropdown-toggle' ).on(
        'click',
        function ( e ) {
          $( this ).parent().toggleClass( 'show' ).data( 'closable', true );
          e.preventDefault();
          e.stopPropagation();
        }
      );

      $( 'body' ).on(
        'click',
        function () {
          $( '.dropdown-menu-wrapper.open-toggle.show' ).each(
            function () {
              var $this = $( this );
              $this.data( 'closable' ) && $this.removeClass( 'show' );
            }
          );
        }
      )
    },
    mobileMenu: function () {

      // Mobile Menu Toggle - Show & Hide
      $( '.mobile-menu-toggler' ).on(
        'click',
        function ( e ) {
          if ( mobile_menu_load ) {
            $( '.mobile-menu-container' ).addClass( 'molla-loading' );
            $.ajax(
              {
                type: 'POST',
                url: theme.ajax_url,
                data: {
                  action: "molla_load_mobile_menus",
                  nonce: theme.nonce,
                },
                success: function ( response ) {
                  $( '.mobile-menus' ).append( response );

                  // Add Mobile menu icon arrows to items with children
                  $( '.mobile-menus' ).find( 'li' ).each(
                    function () {
                      var $this = $( this );

                      if ( $this.find( 'ul' ).length ) {
                        $(
                          '<span/>',
                          {
                            'class': 'mmenu-btn'
                          }
                        ).appendTo( $this.children( 'a' ) );
                      }
                    }
                  );

                  $( 'body' ).addClass( 'mmenu-loaded' );
                  $( '.mobile-menu-container' ).removeClass( 'molla-loading' );
                }
              }
            );

            mobile_menu_load = false;
          }
          $( 'body' ).toggleClass( 'mmenu-active' );
          $( this ).toggleClass( 'active' );
          e.preventDefault();
        }
      );

      $( '.mobile-menu-overlay, .mobile-menu-close' ).on(
        'click',
        function ( e ) {
          $( 'body' ).removeClass( 'mmenu-active' );
          $( '.menu-toggler' ).removeClass( 'active' );
          e.preventDefault();
        }
      );

      // Mobile Menu toggle children menu
      $( 'body' ).on(
        'click',
        '.mmenu-btn',
        function ( e ) {
          var $parent = $( this ).closest( 'li' ),
            $targetUl = $parent.find( 'ul' ).eq( 0 );

          if ( !$parent.hasClass( 'open' ) ) {
            $parent.addClass( 'open' );
            $targetUl.slideDown( 300 );
          } else {
            $parent.removeClass( 'open' );
            $targetUl.slideUp( 300 );
          }

          e.stopPropagation();
          e.preventDefault();
        }
      );
    },
    sidebarCtrl: function () {
      // Sidebar Filter - Show & Hide
      var $sidebarToggler = $( '.sidebar-toggler' ),
        $filter_toggle = $( 'body' ).find( '.top-sidebar .toolbox .filter-toggler' );

      $sidebarToggler.on(
        'click',
        function ( e ) {
          $( 'body' ).toggleClass( 'sidebar-active' );
          if ( $( this ).closest( '.right-sidebar' ).length ) {
            $( 'body' ).toggleClass( 'right-sidebar-active' );
          }
          $( this ).toggleClass( 'active' );
          self.requestTimeout(
            function () {
              if ( $( '.sidebar .molla-lazyload' ).length || $( '.sidebar .molla-lazyload-back' ).length ) {
                $( window ).trigger( 'scroll' );
              }
            },
            200
          );
          e.preventDefault();
        }
      );

      $( '.sidebar' ).on(
        'scroll',
        function () {
          $( window ).trigger( 'scroll' );
        }
      );

      $( 'body' ).on(
        'click',
        '.sidebar-overlay, .filter-close',
        function ( e ) {
          $( 'body' ).removeClass( 'sidebar-active' );
          if ( $( this ).closest( '.right-sidebar' ).length ) {
            $( 'body' ).removeClass( 'right-sidebar-active' );
          }
          $sidebarToggler.removeClass( 'active' );
          e.preventDefault();
        }
      );

      $( '.top-sidebar .filter-toggler' ).on(
        'click',
        function ( e ) {
          if ( $( window ).width() >= desktop_width ) {
            $( this ).closest( '.toolbox' ).siblings( 'aside' ).slideToggle( 300 );
            $( this ).closest( '.toolbox' ).find( '.product-filter' ).fadeToggle( 'fast' );
            $( this ).toggleClass( 'active' );

            if ( $( this ).hasClass( 'active' ) ) {
              $.cookie( 'molla_horizontal_filter', true );
            } else {
              $.cookie( 'molla_horizontal_filter', false );
            }
          }
          $( 'body' ).toggleClass( 'sidebar-active' );
          if ( $( this ).closest( '.right-sidebar' ).length ) {
            $( 'body' ).toggleClass( 'right-sidebar-active' );
          }
          e.preventDefault();
        }
      )
      if ( $.cookie && 'true' == $.cookie( 'molla_horizontal_filter' ) && $( window ).width() >= desktop_width ) {
        $( '.top-sidebar .filter-toggler' ).trigger( 'click' );
      }

    },
    magnificPopup: function () {
      // Popup - Iframe Video - Map, Modal etc.
      if ( $( '.molla-lightbox-open.molla-onload' ).length > 0 ) {
        var $obj = $( '.molla-lightbox-open.molla-onload' ).eq( 0 ),
          timeout = 0;
        if ( $obj.data( 'timeout' ) ) {
          timeout = parseInt( $obj.data( 'timeout' ), 10 );
        }
        setTimeout(
          function () {
            self.openLightbox( $obj );
          },
          timeout
        );
      }

      $( 'body' ).on(
        'click',
        '.molla-lightbox-open',
        function ( e ) {
          e.preventDefault();
          self.openLightbox( $( this ) );
        }
      );
    },
    openLightbox: function ( $obj, target, type ) {
      if ( !$.fn.magnificPopup ) {
        return;
      }

      if ( typeof target == 'undefined' ) {
        target = $obj.data( 'lightbox-id' );
        target = '#' + escape( target );
      }
      if ( typeof type == 'undefined' ) {
        type = $obj.data( 'type' );
      }
      animate = '';
      if ( $obj.length ) {
        var animate = $obj.data( 'lightbox-animate' );
      }

      if ( typeof target == 'undefined' ) {
        return;
      }
      if ( typeof type == 'undefined' ) {
        type = 'inline';
      }
      var args = {
        tLoading: '',
        preloader: false,
        removalDelay: 350,
        autoFocusLast: false,
        mainClass: 'mfp-molla-lightbox' + ( $obj.data( 'lightbox-id' ) ? ( ' mfp-' + $obj.data( 'lightbox-id' ) ) : '' ),
        items: {
          src: target
        },
        type: type,
        callbacks: {
          open: function () {
            $( this )[ 0 ].container.addClass( animate + ' animated' );
            $( 'html' ).css( 'overflow', 'hidden' );
            $( 'body' ).css( 'overflow-x', 'visible' );
            $( '.mfp-wrap' ).css( 'overflow', 'hidden auto' );
            $( 'html, .sticky-header.fixed, .sticky-bar.fixed' ).css( 'margin-right', self.getScrollbarWidth() );
          },
          close: function () {
            $( 'html' ).css( 'overflow-y', '' );
            $( 'body' ).css( 'overflow-x', 'hidden' );
            $( '.mfp-wrap' ).css( 'overflow', '' );
            $( 'html, .sticky-header.fixed, .sticky-bar.fixed' ).css( 'margin-right', '' );
          }
        }
      };

      var mpInstance = $.magnificPopup.instance;
      if ( mpInstance.isOpen ) {
        mpInstance.close();
      }
      setTimeout(
        function () {
          $.magnificPopup.open( args, 0 );
        },
        500
      );
    },
    checkPopupExists: function () {
      if ( theme.popup && $.cookie && 'true' != $.cookie( 'molla_modal_disable_onload' ) ) {
        var popup_id = theme.popup.popup_id,
          delay = theme.popup.popup_delay;

        setTimeout( function () {
          $.post(
            theme.ajax_url,
            {
              action: 'molla_print_popup',
              nonce: theme.nonce,
              popup_id: popup_id
            },
            function ( ret ) {
              if ( !ret ) {
                return;
              }

              var mpInstance = $.magnificPopup.instance;
              if ( mpInstance.isOpen ) {
                mpInstance.close();
              }

              setTimeout( function () {
                $.magnificPopup.open( {
                  tLoading: '',
                  preloader: false,
                  removalDelay: 350,
                  autoFocusLast: false,
                  mainClass: 'mfp-molla-lightbox mfp-molla-lightbox-' + popup_id,
                  type: 'inline',
                  items: {
                    src: ret
                  },
                  callbacks: {
                    open: function () {
                      var $popupContainer = $( this )[ 0 ].container.find( '.molla-lightbox-wrapper' ),
                        animate = $popupContainer.children().eq( 0 ).attr( 'data-lightbox-animate' );

                      $( this )[ 0 ].container.addClass( animate + ' animated' );
                      $popupContainer.find( '.molla-lightbox-container' ).removeClass( 'mfp-hide' );
                      $( 'html' ).css( 'overflow', 'hidden' );
                      $( 'body' ).css( 'overflow-x', 'visible' );
                      $( '.mfp-wrap' ).css( 'overflow', 'hidden auto' );
                      $( 'html, .sticky-header.fixed, .sticky-bar.fixed' ).css( 'margin-right', self.getScrollbarWidth() );
                      self.owlCarousels( $popupContainer );
                      self.isotopeInit( $popupContainer );
                      self.countDown();
                      self.countTo();
                      self.tabCtrl();
                      self.progressInit( $popupContainer );
                      self.floatingElements( $popupContainer );
                      self.requiredFields();
                    },
                    close: function () {
                      $( 'html' ).css( 'overflow-y', '' );
                      $( 'body' ).css( 'overflow-x', 'hidden' );
                      $( '.mfp-wrap' ).css( 'overflow', '' );
                      $( 'html, .sticky-header.fixed, .sticky-bar.fixed' ).css( 'margin-right', '' );
                    }
                  }
                }, 0 );
              }, 500 )
            }
          );
        }, delay * 1000 );
      }
    },
    requiredFields: function () {
      $( '[aria-required="true"]' ).prop( 'required', true );
    },
    sectionScrolling: function () {
      if ( $.fn.themePluginSectionScroll ) {
        $( 'body' ).themePluginSectionScroll();
      }
    },
    productSlide: function ( $wrap ) {
      // Product hover
      if ( typeof $wrap == 'undefined' ) {
        $wrap = $( 'body' );
      }
      $wrap.find( '.product-popup' ).each(
        function () {
          var $this = $( this ),
            $body = $this.find( '.product-body' ),
            $media = $this.find( '.product-media' ),
            $footer = $this.find( '.product-footer' ),
            animDistance;

          $this.on(
            'mouseover touchstart',
            function ( e ) {
              if ( $this.hasClass( 'product-slide' ) ) { // Product Slide Popup
                animDistance = $body.outerHeight();
                $footer.css( { 'visibility': 'visible', 'transform': 'translateY(' + -animDistance + 'px)' } );

                animDistance = $footer.outerHeight() + $body.outerHeight() - ( $this.height() - $media.outerHeight() - $body.outerHeight() ) - 1;
                $body.css( 'transform', 'translateY(' + -animDistance + 'px)' );

              } else { // Product Popup 1,2
                animDistance = $footer.outerHeight() - ( $this.outerHeight() - ( $body.outerHeight() + $media.outerHeight() ) ) - 1;
                $body.css( 'transform', 'translateY(' + -animDistance + 'px)' );

                $footer.css( { 'visibility': 'visible', 'transform': 'translateY(0)' } );
              }
            }
          )

          $this.on(
            'mouseleave touchcancel',
            function ( e ) {
              $body.css( 'transform', 'translateY(0)' );
              $footer.css( { 'visibility': 'hidden', 'transform': 'translateY(100%)' } );
              $this.removeClass( 'active' );
            }
          )
        }
      )
    },
    productTotalSales: function ( $products ) {

      if ( !$products || $products.length == 0 ) {
        $( '.products' ).each(
          function () {
            self.productTotalSales( $( this ) );
          }
        )
      } else {
        var total_sales_max = 0;

        // get max of total sales
        $products.find( '.product-sales mark' ).each(
          function () {
            var total_sales = parseInt( $( this ).html() );
            if ( total_sales_max < total_sales ) {
              total_sales_max = total_sales;
            }
          }
        )

        if ( $.fn.appear ) {
          $products.appear( function () {
            // recalculate
            total_sales_max && $products.find( '.product' ).each(
              function () {
                var total_sales = parseInt( $( this ).find( '.product-sales mark' ).html() );
                $( this ).find( '.product-sales-percent' ).animate( { width: Math.round( total_sales / total_sales_max * 100 ) + '%' }, 500 );
              }
            );
          } )
        }
      }
    },
    priceSlider: function () {
      // Slider For category pages / filter price
      if ( $.fn.slider ) {
        $( document.body ).on(
          'price_slider_create price_slider_slide',
          function ( event, min, max ) {

            $( '.price_label span.from' ).html(
              accounting.formatMoney(
                min,
                {
                  symbol: woocommerce_price_slider_params.currency_format_symbol,
                  decimal: woocommerce_price_slider_params.currency_format_decimal_sep,
                  thousand: woocommerce_price_slider_params.currency_format_thousand_sep,
                  precision: woocommerce_price_slider_params.currency_format_num_decimals,
                  format: woocommerce_price_slider_params.currency_format
                }
              )
            );

            $( '.price_label span.to' ).html(
              accounting.formatMoney(
                max,
                {
                  symbol: woocommerce_price_slider_params.currency_format_symbol,
                  decimal: woocommerce_price_slider_params.currency_format_decimal_sep,
                  thousand: woocommerce_price_slider_params.currency_format_thousand_sep,
                  precision: woocommerce_price_slider_params.currency_format_num_decimals,
                  format: woocommerce_price_slider_params.currency_format
                }
              )
            );

            $( '.ui-slider-handle:first-of-type' ).html( '<span class="noUi-tooltip">' + $( '.price_label span.from' ).html() + '</span>' );
            $( '.ui-slider-handle:last-of-type' ).html( '<span class="noUi-tooltip">' + $( '.price_label span.to' ).html() + '</span>' );

            $( document.body ).trigger( 'price_slider_updated', [ min, max ] );
          }
        );
        self.initPriceFilter();
      }

      $( 'body' ).on(
        'price_slider_change',
        function () {
          $( '.price_slider_wrapper' ).closest( 'form' ).submit();
        }
      )
    },
    initPriceFilter: function () {
      $( 'input#min_price, input#max_price' ).hide();
      $( '#price_slider, .price_label' ).show();

      var min_price = $( '.price_slider_amount #min_price' ).data( 'min' ),
        max_price = $( '.price_slider_amount #max_price' ).data( 'max' ),
        step = $( '.price_slider_amount' ).data( 'step' ) || 1,
        current_min_price = $( '.price_slider_amount #min_price' ).val(),
        current_max_price = $( '.price_slider_amount #max_price' ).val();

      $( '#price_slider:not(.ui-slider)' ).slider(
        {
          range: true,
          animate: true,
          min: min_price,
          max: max_price,
          step: step,
          tooltips: true,
          values: [ current_min_price, current_max_price ],
          create: function () {

            $( '.price_slider_amount #min_price' ).val( current_min_price );
            $( '.price_slider_amount #max_price' ).val( current_max_price );

            $( document.body ).trigger( 'price_slider_create', [ current_min_price, current_max_price ] );
          },
          slide: function ( event, ui ) {

            $( 'input#min_price' ).val( ui.values[ 0 ] );
            $( 'input#max_price' ).val( ui.values[ 1 ] );

            $( document.body ).trigger( 'price_slider_slide', [ ui.values[ 0 ], ui.values[ 1 ] ] );
          },
          change: function ( event, ui ) {

            $( document.body ).trigger( 'price_slider_change', [ ui.values[ 0 ], ui.values[ 1 ] ] );
          }
        }
      );
    },
    resetShopAttrs: function () {
      $( 'body' ).on(
        'click',
        '.yith-wcan-reset-navigation',
        function () {
          var $sidebar = $( this ).closest( '.sidebar-content' );
          $sidebar.find( '.ui-slider-range' ).css( { 'width': '100%', 'left': '0%' } );
          $sidebar.find( '.ui-slider-handle:first-of-type' ).css( 'left', '0%' );
          $sidebar.find( '.ui-slider-handle:last-of-type' ).css( 'left', '100%' );

          $('.widget_product_categories .product-categories .current-cat').removeClass('current-cat');
          $('.widget_product_categories .product-categories .cat-parent').removeClass('cat-parent');
          $('.widget_product_categories .product-categories .current-cat-parent').removeClass('current-cat-parent');
        }
      )
    },
    sidebarTitle: function () {
      $( '.widget .cat-parent:not(.collapsed) > .children' ).css( 'display', 'block' );
      $( 'body' ).on(
        'click',
        '.widget .widget-title',
        function () {
          var toggle = true;
          if ( $( this ).closest( 'footer' ).length ) {
            return;
          }
          if ( $( window ).width() >= desktop_width ) {
            if ( $( this ).closest( '.top-sidebar' ).length ) {
              toggle = false;
            }
          }
          if ( toggle ) {
            $( this ).siblings().slideToggle( 300 );
            $( this ).toggleClass( 'collapsed' );
          }

        }
      )
      $( 'body' ).on(
        'click',
        '.cat-parent .toggle',
        function ( e ) {
          var $parent = $( this ).closest( '.cat-parent' ),
            $sibling = $parent.siblings( '.cat-parent:not(.collapsed)' );
          $sibling.toggleClass( 'collapsed' );
          $sibling.children( '.children' ).slideToggle( 300 );
          $parent.children( '.children' ).slideToggle( 300 );
          $parent.toggleClass( 'collapsed' );
          e.stopPropagation();
          e.preventDefault();
        }
      )
    },
    quantityInputs: function ( $selector ) {
      // Quantity Input - Cart page - Product Details pages
      if ( $.fn.inputSpinner ) {
        if ( undefined == $selector ) {
          $selector = $( "input[type='number']:not(.wcfm-text)" );
        }
        $selector.each(
          function () {
            if ( !$( this ).siblings( '.input-spinner' ).length ) {
              $( this ).inputSpinner(
                {
                  decrementButton: '<i class="icon-minus"></i>',
                  incrementButton: '<i class="icon-plus"></i>',
                  groupClass: 'input-spinner',
                  buttonsClass: 'btn-spinner',
                  buttonsWidth: '26px'
                }
              );
            }
          }
        )
      }
    },
    stickySidebar: function () {
      // Sticky Content - Sidebar - Social Icons etc..

      var add_padding = 20;
      if ( $( '#wpadminbar' ).length ) {
        add_padding += $( '#wpadminbar' ).outerHeight( true );
      }
      if ( $( '.sidebar .widget.yith-woo-ajax-reset-navigation' ).length ) {
        add_padding -= $( '.sidebar .widget.yith-woo-ajax-reset-navigation' ).outerHeight();
      }
      $( '.sticky-sidebar' ).themeSticky(
        {
          autoInit: true,
          minWidth: desktop_width,
          containerSelector: '.sticky-sidebar-wrapper',
          autoFit: true,
          paddingOffsetBottom: 0,
          paddingOffsetTop: sticky_header_height + add_padding,
        }
      );
    },
    stickySidebarInit: function () {
      if ( $( window ).width() >= desktop_width && !$( '.sidebar' ).closest( '.toggle-sidebar' ).length ) {
        $( '.sidebar' ).removeClass( 'sidebar-toggle' );
        self.stickySidebar();
      } else {
        $( '.sidebar' ).each(
          function () {
            var $aside = $( this ).closest( 'aside' );
            if ( $aside.parent().siblings( '.sidebar-toggler' ).length ) {
              $aside.find( '.sidebar' ).addClass( 'sidebar-toggle' );
            }
            self.stickySidebar();
          }
        )
      }
    },
    owlCarousels: function ( $wrap, options ) {
      if ( $.fn.owlCarousel ) {
        var owlSettings = {
          items: 1,
          loop: true,
          margin: 0,
          responsiveClass: true,
          nav: true,
          navText: [ '<i class="icon-angle-left">', '<i class="icon-angle-right">' ],
          dots: true,
          smartSpeed: 400,
          autoplay: false,
          autoplayTimeout: 10000
        };
        if ( typeof $wrap == 'undefined' ) {
          $wrap = $( 'body' );
        }
        if ( options ) {
          owlSettings = $.extend( {}, owlSettings, options );
        }
        // Init all carousel
        $wrap.find( '[data-toggle="owl"]' ).each(
          function () {

            if ( $( this ).hasClass( '.thumbnails-outer' ) && !$( this ).closest( '.thumb-horizontal' ).length && $( window ).width() > 991 ) {
              return;
            }

            var $this = $( this ),
              newOwlSettings = $.extend( {}, owlSettings, $this.data( 'owl-options' ) );
            if ( $( 'body' ).hasClass( 'rtl' ) ) {
              newOwlSettings.rtl = true;
            }

            $this.on(
              'initialized.owl.carousel',
              function () {
                $( this ).attr( 'class', $( this ).attr( 'class' ).replace( / c-.*[0-9]/, '' ) );

                // Entrance Animation
                var $animated_items = $( this ).find( '.owl-item .elementor-invisible' ),
                  $invisible = $( this ).find( '.owl-item:not(.active) .elementor-invisible' );

                $animated_items.each(
                  function () {
                    var $this = $( this ),
                      data_animation = {};
                    data_animation.animation = typeof $this.data( 'settings' )._animation != 'undefined' ? $this.data( 'settings' )._animation : $this.data( 'settings' ).animation;
                    data_animation.animation_delay = typeof $this.data( 'settings' )._animation_delay != 'undefined' ? $this.data( 'settings' )._animation_delay : $this.data( 'settings' ).animation_delay;
                    if ( $this.hasClass( 'animated-slow' ) ) {
                      data_animation.animation_duration = 2000;
                    } else if ( $this.hasClass( 'animated-fast' ) ) {
                      data_animation.animation_duration = 750;
                    } else {
                      data_animation.animation_duration = 1250;
                    }
                    $this.addClass( 'animating-item' );
                    $this.attr( 'data-animate-args', JSON.stringify( data_animation ) );
                    if ( $this.closest( '.owl-item' ).hasClass( 'active' ) ) {
                      $this.addClass( 'owl-animated' );
                      $this.css( 'animation-duration', data_animation.animation_duration + 'ms' );
                    } else {
                      $this.css( 'visibility', 'hidden' );
                      $this.css( { 'animation-duration': data_animation.animation_duration + 'ms', 'animation-delay': data_animation.animation_delay + 'ms' } );
                      $this.css( { 'transition-duration': data_animation.animation_duration + 'ms', 'transition-delay': data_animation.animation_delay + 'ms' } );
                    }
                  }
                )
              }
            );
            $this.on(
              'translated.owl.carousel',
              function () {
                var $invisible = $( this ).find( '.owl-item:not(.active) .animating-item' ),
                  $visible = $( this ).find( '.owl-item.active .animating-item' );

                $invisible.each(
                  function () {
                    var invisible_animate_args = $( this ).data( 'animate-args' );
                    $( this ).removeClass( 'owl-animated' ).removeClass( invisible_animate_args.animation ).addClass( 'elementor-invisible' );
                    $( this ).css( { 'transition-duration': '', 'transition-delay': '' } );
                  }
                )
                $visible.each(
                  function () {
                    self.entranceAnimate( $( this ) );
                  }
                )
              }
            );

            if ( !$( this ).hasClass( 'elementor-container' ) ) {
              $this.css( { marginLeft: 0, marginRight: 0, width: '100%' } );
            }

            $this.owlCarousel( newOwlSettings );
          }
        );

      }
    },
    entranceAnimate: function ( $wrap ) {
      if ( $wrap.hasClass( 'owl-animated' ) ) {
        return;
      }
      var animate_args = $wrap.data( 'animate-args' ),
        animation_name = animate_args.animation;
      if ( $wrap.hasClass( animation_name ) ) {
        $wrap.removeClass( animation_name );
      }
      $wrap.css( { 'animation-duration': animate_args.animation_duration + 'ms', 'animation-delay': animate_args.animation_delay + 'ms' } );
      $wrap.css( { 'transition-duration': animate_args.animation_duration + 'ms', 'transition-delay': animate_args.animation_delay + 'ms' } );
      setTimeout( function () {
        $wrap.css( 'visibility', '' );
        $wrap.addClass( animation_name );
        $wrap.addClass( 'owl-animated' );
      }, 10 );
      $wrap.removeClass( 'elementor-invisible' );
      setTimeout( function () {
        $wrap.css( 'transition-duration', '' );
        $wrap.css( 'transition-delay', '' );
      }, animate_args.animation_delay + 20 );
    },
    appear: function ( el, fn, intObsOptions ) {
      var interSectionObserverOptions = {
        rootMargin: '0px 0px 200px 0px',
        threshold: 0,
        alwaysObserve: true
      };

      if ( intObsOptions && Object.keys( intObsOptions ).length ) {
        intersectionObserverOptions = $.extend( intersectionObserverOptions, intObsOptions );
      }
      var j = 0;
      var observer = new IntersectionObserver( function ( entries ) {
        for ( var i = 0; i < entries.length; i++ ) {
          var entry = entries[ i ];

          if ( entry.intersectionRatio > 0 ) {

            if ( typeof fn === 'string' ) {
              var func = Function( 'return ' + functionName )();
            } else {

              var callback = fn;
              if ( j == 1 ) {
                return;
              }
              callback.call( entry.target );
              j = j + 1;
            }
          }
        }
      }, interSectionObserverOptions );

      observer.observe( el );

      return this;
    },
    appearAnimate: function ( selector ) {
      Molla.$( selector ).each( function () {
        var el = this;
        Molla.appear( el, function () {
          var $this = $( this ),
            settings = $( this ).data( 'settings' );

          if ( !settings ) {
            return;
          }

          var animation = settings._animation,
            delay = settings._animation_delay;

          setTimeout( function () {
            $this.removeClass( 'elementor-invisible' ).addClass( 'animated ' + animation );
          }, delay )
        } )
      } )
    },
    checkoutInput: function () {
      // Checkout discount input - toggle label if input is empty etc...
      $( 'body' ).on(
        'focus',
        '#checkout-discount-input',
        function () {
          // Hide label on focus
          $( this ).parent( 'form' ).find( 'label' ).css( 'opacity', 0 );
        }
      ).on(
        'blur',
        function () {
          // Check if input is empty / toggle label
          var $this = $( this );

          if ( $this.val().length !== 0 ) {
            $this.parent( 'form' ).find( 'label' ).css( 'opacity', 0 );
          } else {
            $this.parent( 'form' ).find( 'label' ).css( 'opacity', 1 );
          }
        }
      );
    },
    layoutInit: function ( $container, selector ) { // Init Isotope
      if ( !$.fn.isotope || $container.hasClass( 'float-grid' ) ) {
        return;
      }

      if ( undefined == selector ) {
        selector = '.grid-item';
      }

      var isotopeSettings = {
        itemSelector: selector,
        layoutMode: 'masonry',
        getSortData: {
          order: '[data-creative-order] parseInt',
          order_lg: '[data-creative-order-lg] parseInt',
          order_md: '[data-creative-order-md] parseInt',
        },
      };

      if ( undefined == $container ) {
        $( 'body' ).find( '[data-toggle="isotope"]' ).each(
          function () {
            var $this = $( this );
            var options = $this.data( 'isotope-options' ),
              newIsotopeSettings = $.extend( {}, isotopeSettings, options );

            $this.isotope( newIsotopeSettings );
            self.isotopeFilter( $this.siblings( '.nav-filter' ), $this );
          }
        )
      } else if ( $container.data( 'toggle' ) == 'isotope' ) {
        Object.setPrototypeOf( $container.get( 0 ), HTMLElement.prototype );
        $container.find( selector ).each(
          function () {
            Object.setPrototypeOf( $( this ).get( 0 ), HTMLElement.prototype );
          }
        )

        var options = $container.data( 'isotope-options' ),
          newIsotopeSettings = $.extend( {}, isotopeSettings, options );
        $container.isotope( newIsotopeSettings );
        if ( $container.hasClass( 'products' ) ) {
          var top_sidebar = $container.closest( '.top-sidebar' );
          if ( top_sidebar.length ) {
            self.isotopeFilter( top_sidebar.find( '.nav-filter' ), $container );
          }
        } else {
          self.isotopeFilter( $container.siblings( '.nav-filter' ), $container );
        }
      }

      self.requestTimeout(
        function () {
          $( window ).trigger( 'scroll' );
        },
        500
      );
    },
    isotopeFilter: function ( $filterNav, $container ) {
      $( 'body' ).on( 'click', '.filter-toggler', function ( e ) {
        e.preventDefault();
      } )
      if ( !$filterNav.length || !$container.length ) {
        return;
      }
      var duration = ( $filterNav.data( 'duration' ) ? $filterNav.data( 'duration' ) : '0.7' ) + 's';
      $filterNav.on(
        'click',
        'a',
        function ( e ) {
          var $this = $( this ),
            filter = $this.attr( 'data-filter' );

          // Remove active class
          $filterNav.find( '.active' ).removeClass( 'active' );

          $container.isotope(
            {
              filter: filter,
              transitionDuration: duration
            }
          );
          $container.css( 'transition', 'height ' + duration );
          self.requestTimeout(
            function () {
              $( window ).trigger( 'scroll' );
            },
            500
          );

          // Add active class
          $this.closest( 'li' ).addClass( 'active' );
          e.preventDefault();
        }
      );
    },
    isotopeInit: function () {
      if ( !$.fn.isotope ) {
        return;
      }

      /* Masonry / Grid Layout & Isotope Filter for blog/portfolio etc... */
      $( '[data-toggle="isotope"]' ).each(
        function () {
          var $this = $( this );
          if ( typeof imagesLoaded === 'function' ) {
            $( this ).imagesLoaded(
              function () {
                self.layoutInit( $this ); // container - selector
                if ( $( '.product-filter' ).length ) {
                  self.isotopeFilter( $( '.product-filter' ), $this );
                }
              }
            )
          } else {
            self.layoutInit( $this ); // container - selector
            if ( $( '.product-filter' ).length ) {
              self.isotopeFilter( $( '.product-filter' ), $this );
            }
          }
        }
      )
    },
    // thumbnailSlide: function ($selector) {
    //  var $carousel = undefined == $selector ? $('.thumbnails-wrap') : $selector.find('.thumbnails-wrap');
    //  var $outer = $carousel.find('.thumbnails-outer');
    //  if ($carousel.length && $outer.length) {
    //    var $top = $outer.css('top');
    //    $top = Number($top.slice(0, -2));
    //    $carousel.find('.nav-prev, .nav-next').removeClass('disabled');

    //    if (!$top) {
    //      $carousel.find('.nav-prev').addClass('disabled');
    //    }
    //    if ($outer.height() <= $carousel.height()) {
    //      $carousel.find('.nav-next').addClass('disabled');
    //    }

    //    $('body').on(
    //      'click',
    //      '.thumbnails-wrap .nav-next',
    //      function () {
    //        var $top = $outer.css('top');
    //        $top = Number($top.slice(0, -2));

    //        if ($outer.height() + $top - 50 > $carousel.height()) {
    //          $top -= 50;
    //        } else {
    //          $top = $carousel.height() - $outer.height();
    //          $carousel.find('.nav-next').addClass('disabled');
    //        }
    //        $top = $top.toFixed(2);
    //        $outer.css('top', $top + 'px');

    //        if ($top) {
    //          $carousel.find('.nav-prev').removeClass('disabled');
    //        }

    //        $(window).trigger('scroll');
    //      }
    //    )
    //    $('body').on(
    //      'click',
    //      '.thumbnails-wrap .nav-prev',
    //      function () {
    //        var $top = $outer.css('top');
    //        $top = Number($top.slice(0, -2));

    //        if ($top < -50) {
    //          $top += 50;
    //        } else {
    //          $top = 0;
    //          $carousel.find('.nav-prev').addClass('disabled');
    //        }
    //        $top = $top.toFixed(2);
    //        $outer.css('top', $top + 'px');

    //        if ($outer.height() + Number($top) >= $carousel.height()) {
    //          $carousel.find('.nav-next').removeClass('disabled');
    //        }

    //        $(window).trigger('scroll');
    //      }
    //    )

    //    var $productIntro = $carousel.closest('.product-intro'),
    //      $thumbnails = $productIntro.find('.thumbnails-outer'),
    //      $gallery_carousel = $productIntro.find('.product-gallery-carousel'),
    //      $active_item = $gallery_carousel.find('.active img');

    //    if ($thumbnails.hasClass('owl-carousel')) {
    //      if (!$thumbnails.find('.product-thumb a.active').length) {
    //        $thumbnails.find('.owl-item:first-of-type .product-thumb a').addClass('active');
    //      }
    //    } else {
    //      if (!$thumbnails.find('.product-thumb a.active').length) {
    //        $thumbnails.children('.product-thumb:first-of-type').find('a').addClass('active');
    //      }
    //    }
    //    $gallery_carousel.on(
    //      'click',
    //      '.product-thumb a',
    //      function (e) {
    //        e.preventDefault();
    //      }
    //    )

    //    $thumbnails.on(
    //      'click',
    //      '.product-thumb a',
    //      function (e) {
    //        if ($(this).closest('.thumbnails-outer').hasClass('owl-carousel')) {
    //          $gallery_carousel.trigger('to.owl.carousel', [$(this).closest('.owl-item').index(), 300, true]);
    //        } else {
    //          $gallery_carousel.trigger('to.owl.carousel', [$(this).parent().index(), 300, true]);
    //        }

    //        $thumbnails.find('.product-thumb a').removeClass('active');
    //        $(this).addClass('active');
    //        e.preventDefault();
    //      }
    //    )
    //    $gallery_carousel.on(
    //      'translated.owl.carousel',
    //      function (e) {
    //        var index = e.item.index;
    //        if ($thumbnails.hasClass('owl-carousel')) {
    //          $thumbnails.trigger('to.owl.carousel', [index, 300, true]);
    //          var $thumb = $thumbnails.find('.owl-item').eq(index);
    //          $thumbnails.find('.product-thumb a').removeClass('active');
    //          $thumb.find('a').addClass('active');
    //        } else {
    //          $thumbnails.find('a').removeClass('active');
    //          $thumbnails.children().eq(index).find('a').addClass('active');
    //        }

    //        //  $active_item = $gallery_carousel.find('.active img');
    //        // zoomOptions.zoomContainer = $active_item.parent();
    //        // self.elevateZoomInit($active_item, zoomOptions);
    //      }
    //    )
    //  }
    //  // $('body').on(
    //  //  'click',
    //  //  '.woocommerce-product-gallery__image > a',
    //  //  function (e) {
    //  //    e.preventDefault();
    //  //  }
    //  // )
    // },
    thumbResponsiveCtrl: function () {
      var $wrap = $( '.product .woocommerce-product-gallery' ),
        $outer = $( '.product .thumbnails-outer' );
      $outer.each(
        function () {
          var $this = $( this );
          if ( $this.closest( '.quickView-content.horizontal' ).length || $this.closest( '.thumb-horizontal' ).length ) {
            return;
          }
          if ( $( window ).width() > 991 ) {
            if ( $this.length && $this.attr( 'data-toggle' ) == 'owl' ) {
              $this.attr( 'data-toggle', '' );
              $( this ).attr( 'class', $( this ).attr( 'class' ).replace( / (sp)|c-.*[0-9]/, '' ) );
              $this.removeClass( 'owl-carousel' );
              $this.data( 'owl.carousel' ) && $this.data( 'owl.carousel' ).destroy();
            }
          } else {
            if ( $( window ).width() > 575 && $( window ).width() < 768 ) {
              $this.attr( 'data-toggle', '' );
              $( this ).attr( 'class', $( this ).attr( 'class' ).replace( / (sp)|c-.*[0-9]/, '' ) );
              $this.removeClass( 'owl-carousel' );
              $this.data( 'owl.carousel' ) && $this.data( 'owl.carousel' ).destroy();
            } else {
              if ( $this.length && !$this.hasClass( 'owl-carousel' ) ) {
                if ( $this.attr( 'data-toggle' ) != 'owl' ) {
                  $this.attr( 'data-toggle', 'owl' );
                  $this.addClass( 'owl-carousel owl-nav-inside owl-full' );
                } else {
                  $this.addClass( 'owl-carousel' );
                }

                $this.css( 'top', '' );
                self.owlCarousels( $this.parent() );
                self.lazyloadImg( $( '.thumbnails-wrap' ) );
              }
            }
          }
        }
      )
    },
    productGallery: ( function () {
      function ProductGallery( $el ) {
        return this.init( $el );
      }

      ProductGallery.prototype.init = function ( $wc_gallery ) {
        var self = this;

        typeof $wc_gallery.data( 'product_gallery' ) == 'undefined' && $wc_gallery.wc_product_gallery();
        self.$wc_gallery = $wc_gallery;
        self.wc_gallery = $wc_gallery.data( 'product_gallery' );
        var $gallery_carousel = $wc_gallery.find( '.product-gallery-carousel' ),
          $thumbcarousel = $wc_gallery.find( '.thumbnails-outer' ),
          $thumbwrap = $wc_gallery.find( '.thumbnails-wrap' );

        if ( $wc_gallery.length ) {
          self.zoom = self.zoom.bind( this );
          self.zoom();
          window.addEventListener( 'resize', self.zoom, { passive: true } );

          if ( $thumbcarousel.hasClass( 'owl-carousel' ) ) {
            if ( !$thumbcarousel.find( '.product-thumb a.active' ).length ) {
              $thumbcarousel.find( '.owl-item:first-of-type .product-thumb a' ).addClass( 'active' );
            }
          } else {
            if ( !$thumbcarousel.find( '.product-thumb a.active' ).length ) {
              $thumbcarousel.children( '.product-thumb:first-of-type' ).find( 'a' ).addClass( 'active' );
            }
          }

          if ( $thumbcarousel.length ) {
            var $top = $thumbcarousel.css( 'top' );
            $top = Number( $top.slice( 0, -2 ) );
            $thumbwrap.find( '.nav-prev, .nav-next' ).removeClass( 'disabled' );

            if ( !$top ) {
              $thumbwrap.find( '.nav-prev' ).addClass( 'disabled' );
            }
            if ( $thumbcarousel.height() <= $thumbwrap.height() ) {
              $thumbwrap.find( '.nav-next' ).addClass( 'disabled' );
            }

            $( 'body' ).on(
              'click',
              '.thumbnails-wrap .nav-next',
              function () {
                var $top = $thumbcarousel.css( 'top' );
                $top = Number( $top.slice( 0, -2 ) );

                if ( $thumbcarousel.height() + $top - 50 > $thumbwrap.height() ) {
                  $top -= 50;
                } else {
                  $top = $thumbwrap.height() - $thumbcarousel.height();
                  $thumbwrap.find( '.nav-next' ).addClass( 'disabled' );
                }
                $top = $top.toFixed( 2 );
                $thumbcarousel.css( 'top', $top + 'px' );

                if ( $top ) {
                  $thumbwrap.find( '.nav-prev' ).removeClass( 'disabled' );
                }

                $( window ).trigger( 'scroll' );
              }
            )
            $( 'body' ).on(
              'click',
              '.thumbnails-wrap .nav-prev',
              function () {
                var $top = $thumbcarousel.css( 'top' );
                $top = Number( $top.slice( 0, -2 ) );

                if ( $top < -50 ) {
                  $top += 50;
                } else {
                  $top = 0;
                  $thumbwrap.find( '.nav-prev' ).addClass( 'disabled' );
                }
                $top = $top.toFixed( 2 );
                $thumbcarousel.css( 'top', $top + 'px' );

                if ( $thumbcarousel.height() + Number( $top ) >= $thumbwrap.height() ) {
                  $thumbwrap.find( '.nav-next' ).removeClass( 'disabled' );
                }

                $( window ).trigger( 'scroll' );
              }
            )
          }
        }


        $wc_gallery
          .off( 'click', '.woocommerce-product-gallery__image a' )
          .on( 'click', function ( e ) {
            e.preventDefault();
          } );

        $thumbcarousel.on(
          'click',
          '.product-thumb a',
          function ( e ) {
            if ( $( this ).closest( '.thumbnails-outer' ).hasClass( 'owl-carousel' ) ) {
              $gallery_carousel.data( 'owl.carousel' ).to( $( this ).closest( '.owl-item' ).index(), 300 );
            } else {
              $gallery_carousel.data( 'owl.carousel' ).to( $( this ).parent().index(), 300 );
            }

            $thumbcarousel.find( '.product-thumb a' ).removeClass( 'active' );
            $( this ).addClass( 'active' );
            e.preventDefault();
          }
        )

        $gallery_carousel.on(
          'translated.owl.carousel',
          function ( e ) {
            var index = e.item.index;
            if ( $thumbcarousel.hasClass( 'owl-carousel' ) ) {
              $thumbcarousel.data( 'owl.carousel' ).to( index, 100 );
              var $thumb = $thumbcarousel.find( '.owl-item' ).eq( index );
              $thumbcarousel.find( '.product-thumb a' ).removeClass( 'active' );
              $thumb.find( 'a' ).addClass( 'active' );
            } else {
              $thumbcarousel.find( 'a' ).removeClass( 'active' );
              $thumbcarousel.children().eq( index ).find( 'a' ).addClass( 'active' );
            }
          }
        )

        $wc_gallery.find( '.btn-product-gallery' ).on( 'click', function ( e ) {
          e.preventDefault();
          self.lightbox( e );
        } )

        $( document ).on(
          'found_variation reset_image',
          '.variations_form',
          function ( e ) {
            //    self.zoom($wc_gallery.find('.product-gallery-carousel .woocommerce-product-gallery__image > a'));
            self.zoom();
            // if ( $gallery_carousel.length ) {
            //  $gallery_carousel.data( 'owl.carousel' ) && $gallery_carousel.data( 'owl.carousel' ).to( 0, 300, true );
            // }
          }
        )

      }

      ProductGallery.prototype.zoom = function () {
        var self = this;
        self.$wc_gallery.find( '.woocommerce-product-gallery__image a' ).each( function () {
          var $zoomTarget = $( this );
          var width = $zoomTarget.children( 'img' ).attr( 'data-large_image_width' ),
            // zoom option
            zoom_options = $.extend( {
              touch: false
            }, {} );

          if ( 'ontouchstart' in document.documentElement ) {
            zoom_options.on = 'click';
          }

          $zoomTarget.trigger( 'zoom.destroy' ).children( '.zoomImg' ).remove();

          if ( $zoomTarget.children( 'img' ).hasClass( 'product-attr-image' ) ) {
            zoom_options.url = $zoomTarget.children( 'img:last-child' ).attr( 'src' );
          } else {
            zoom_options.url = $zoomTarget.children( 'img:first-child' ).attr( 'src' );
          }
          // zoom
          if ( 'undefined' != typeof width && $zoomTarget.width() < width ) {
            $zoomTarget.zoom( zoom_options );

            // show zoom on hover
            setTimeout( function () {
              $zoomTarget.find( ':hover' ).length && $zoomTarget.trigger( 'mouseover' );
            }, 100 );
          }
        } )
      }

      ProductGallery.prototype.lightbox = function ( e ) {
        if ( wc_single_product_params.photoswipe_options ) {
          e.preventDefault();

          var carousel = this.$wc_gallery.find( '.product-single-carousel, .product-gallery-carousel' ).data( 'owl.carousel' );

          // Carousel Type
          if ( carousel ) {
            var count = carousel.items().length - carousel.clones().length;
            wc_single_product_params.photoswipe_options.index = ( $( e.currentTarget ).closest( '.owl-item' ).index() - carousel.clones().length / 2 + count ) % count;
          } else {
            var itemIndex = 0,
              $target = $( e.currentTarget ).closest( '.woocommerce-product-gallery__image' ),
              count = this.$wc_gallery.find( '.woocommerce-product-gallery__image' ).length;
            if ( $( e.currentTarget ).closest( '.product-intro' ).hasClass( 'masonry_sticky-product' ) ) {
              itemIndex = $target.parent().hasClass( 'product-main-image' ) ? 0 : $target.index() + 1;
            } else if ( 0 < $target.index() ) {
              itemIndex = $target.index() - 1;
            }
            wc_single_product_params.photoswipe_options.index = ( itemIndex + count ) % count;
          }

          this.wc_gallery.openPhotoswipe( e );

          // to disable elementor's light box.
          e.stopPropagation();
        }
      }

      // ProductGallery.prototype.thumbclick = function () {

      // }

      // ProductGallery.prototype.thumbmove = function () {

      // }

      return function ( selector ) {
        if ( $.fn.wc_product_gallery ) {
          Molla.$( selector ).each( function () {
            var $this = $( this );
            $this.data( 'molla_product_gallery', new ProductGallery( $this ) );
          } );
        }
      }
    } )(),

    productSingle: ( function () {
      function ProductSingle( $el ) {
        return this.init( $el );
      }

      ProductSingle.prototype.init = function ( $el ) {
        this.$product = $el;

        // gallery
        $el.find( '.woocommerce-product-gallery' ).each( function () {
          Molla.productGallery( $( this ) );
        } )
      }

      return function ( selector ) {
        Molla.$( selector ).each( function () {
          var $this = $( this );
          $this.data( 'molla_product_single', new ProductSingle( $this ) );
        } );
      }
    } )(),
    // elevateZoomInit: function ($selector, options) {
    //  if (!$.fn.elevateZoom) {
    //    return;
    //  }
    //  if (undefined == $selector || !$selector.length) {
    //    return;
    //  }
    //  var zoomOptions = {
    //    zoomType: "inner",
    //    cursor: "crosshair",
    //    borderSize: 0,
    //    zoomWindowFadeIn: 400,
    //    zoomWindowFadeOut: 400,
    //    responsive: true,
    //  };

    //  if (theme.prevent_elevate && $(window).width() < tablet_width) {
    //    zoomOptions = { zoomEnabled: false };
    //  }

    //  if (options) {
    //    zoomOptions = $.extend({}, zoomOptions, options);
    //  }
    //  $selector.elevateZoom(zoomOptions);
    // },
    // elevateZoomCtrl: function ($selector) {
    //  // Product Image Zoom plugin - product pages
    //  if (undefined == $selector) {
    //    $selector = $('.product-gallery');
    //  }

    //  if ($selector.closest('.quickView-content').length) {
    //    return;
    //  }

    //  var options = {};

    //  // if ($.fn.elevateZoom) {

    //  //  // Set default active item
    //  //  var $thumbnails = $selector.find('.product-image-gallery .thumbnails-outer>div');
    //  //  if (!$thumbnails.find('.active:not(.owl-item)').length) {
    //  //    if ($thumbnails.hasClass('owl-stage-outer')) {
    //  //      $thumbnails.find('.owl-item').eq(0).find('a').addClass('active');
    //  //    } else {
    //  //      $thumbnails.children().eq(0).addClass('active');
    //  //    }
    //  //  }
    //  //  if (!$('.product-gallery-masonry').find('.active').length) {
    //  //    $('.product-gallery-masonry').children().eq(0).find('a').addClass('active');
    //  //  }

    //  //  $selector.find('.product-main-image .wp-post-image:not(.molla-lazyload)').each(
    //  //    function () {
    //  //      options.zoomContainer = $(this).parent();
    //  //      options.gallery = 'product-zoom-gallery';
    //  //      options.galleryActiveClass = 'active';
    //  //      self.elevateZoomInit($(this), options)
    //  //    }
    //  //  )

    //  //  $selector.find('.woocommerce-product-gallery__image img:not(.molla-lazyload)').each(
    //  //    function () {
    //  //      if (!$(this).closest('.product-image-gallery').length) {
    //  //        options.zoomContainer = $(this).parent();
    //  //        self.elevateZoomInit($(this), options)
    //  //      }
    //  //    }
    //  //  )

    //  //  $('body').on(
    //  //    'click',
    //  //    '.product-main-image a, .product-gallery-carousel .woocommerce-product-gallery__image a',
    //  //    function (e) {
    //  //      e.preventDefault();
    //  //    }
    //  //  )

    //  //  $selector.find('.product-image-gallery a').on(
    //  //    'click',
    //  //    function (e) {
    //  //      var $srcImg = $(this).find('img'),
    //  //        srcset = $srcImg.attr('srcset'),
    //  //        src = $srcImg.data('image'),
    //  //        $mainImg = $('.product-main-image img');
    //  //      $mainImg.attr('srcset', srcset);
    //  //      $mainImg.attr('data-image', $srcImg.data('image'));
    //  //      $mainImg.attr('data-zoom-image', $srcImg.data('zoom-image'));
    //  //      $mainImg.attr('data-srcset', $mainImg.attr('srcset'));
    //  //      if ($mainImg.hasClass('molla-lazyload')) {
    //  //        $srcImg.closest('.product-image-gallery').find('.active').removeClass('active');
    //  //        $srcImg.parent().addClass('active');
    //  //        $mainImg.removeClass('molla-lazyload');
    //  //        $mainImg.css('padding-top', 0);
    //  //        self.elevateZoomCtrl();
    //  //      }
    //  //      $mainImg.parent().siblings('.zoomContainer').remove();
    //  //      e.preventDefault();
    //  //    }
    //  //  )
    //  // }

    //  $selector.find('.product-image-gallery img').each(
    //    function () {
    //      var img = $(this).data('image');
    //      var zoom_img = $(this).data('zoom-image');
    //      $(this).closest('a').attr('data-image', img);
    //      $(this).closest('a').attr('data-zoom-image', zoom_img);
    //    }
    //  )

    //  // Product Gallery
    //  if ($.fn.owlCarousel && $.fn.elevateZoom) {
    //    var owlProductGallery = $selector.find('.product-gallery-carousel');
    //    owlProductGallery.find('.active img:not(.molla-lazyload)').each(
    //      function () {
    //        options.zoomContainer = $(this).parent();
    //        self.elevateZoomInit($(this), options);
    //      }
    //    )

    //    owlProductGallery.on(
    //      'change.owl.carousel',
    //      function () {
    //        $('.zoomContainer').remove();
    //      }
    //    );

    //    owlProductGallery.on(
    //      'translated.owl.carousel',
    //      function () {
    //        owlProductGallery.find('.active img:not(.molla-lazyload)').each(
    //          function () {
    //            options.zoomContainer = $(this).parent();
    //            self.elevateZoomInit($(this), options);
    //          }
    //        )
    //      }
    //    );
    //  }
    // },
    productImageZoom: function () {
      var galleryArr = [], srcs = [], i = 0;
      $( '.product-gallery' ).find( 'img' ).each(
        function () {
          var $this = $( this ),
            imgSrc = $this.attr( 'data-zoom-image' ),
            imgTitle = $this.attr( 'alt' ),
            obj = { 'src': imgSrc, 'title': imgTitle };

          if ( srcs.indexOf( imgSrc ) == -1 ) {
            srcs.push( imgSrc );
            galleryArr.push( obj );

            $this.closest( '.woocommerce-product-gallery__image' ).find( '.btn-product-gallery' ).data( 'index', i );
            $this.closest( '.woocommerce-product-gallery__image' ).data( 'index', i );
            i++;
          }
        }
      )
      // $('.btn-product-gallery').on(
      //  'click',
      //  function (e) {

      //  }
      // )
      // Open popup - product images
      // $('.btn-product-gallery').on(
      //  'click',
      //  function (e) {
      //    var index = $(this).data('index');
      //    if ($(this).closest('.product-main-image').length && $(this).closest('.product-main-image').siblings('.product-image-gallery').length) {
      //      var $gallery = $(this).closest('.product-main-image').siblings('.product-image-gallery');
      //      index = $gallery.find('.woocommerce-product-gallery__image .active').parent().data('index');
      //    }

      //    // $.magnificPopup.open(
      //    //  {
      //    //    items: galleryArr,
      //    //    type: 'image',
      //    //    gallery: {
      //    //      enabled: true
      //    //    },
      //    //    fixedContentPos: true,
      //    //    removalDelay: 600,
      //    //    closeBtnInside: false,
      //    //    callbacks: {
      //    //      open: function () {
      //    //        $('html, .sticky-header.fixed, .sticky-bar.fixed').css('margin-right', self.getScrollbarWidth());
      //    //      },
      //    //      close: function () {
      //    //        $('html, .sticky-header.fixed, .sticky-bar.fixed').css('margin-right', '');
      //    //      }
      //    //    }
      //    //  },
      //    //  index
      //    // );

      //    e.preventDefault();
      //  }
      // );
    },
    countDown: function ( $wrap ) {
      if ( $.fn.countdown ) {

        if ( typeof $wrap == 'undefined' ) {
          $wrap = $( 'body' );
        }

        $wrap.find( '.deal-countdown' ).each(
          function () {
            if ( typeof $( this ).data( 'countdown_initialized' ) != 'undefined' && $( this ).data( 'countdown_initialized' ) ) {
              return;
            }
            var $this = $( this ),
              untilDate = $this.attr( 'data-until' ),
              compact = $this.attr( 'data-compact' ),
              dateFormat = ( !$this.attr( 'data-format' ) ) ? 'DHMS' : $this.attr( 'data-format' ),
              newLabels = ( !$this.attr( 'data-labels-short' ) ) ?
                [ 'Years', 'Months', 'Weeks', 'Days', 'Hours', 'Minutes', 'Seconds' ] :
                [ 'Years', 'Months', 'Weeks', 'Days', 'Hours', 'Mins', 'Secs' ],
              newLabels1 = ( !$this.attr( 'data-labels-short' ) ) ?
                [ 'Year', 'Month', 'Week', 'Day', 'Hour', 'Minute', 'Second' ] :
                [ 'Year', 'Month', 'Week', 'Day', 'Hour', 'Min', 'Sec' ];
            if ( $this.attr( 'data-labels' ) ) {
              var labels = $this.attr( 'data-labels' );
              labels = JSON.parse( labels );
              newLabels = [ labels.Years, labels.Months, labels.Weeks, labels.Days, labels.Hours, labels.Minutes, labels.Seconds ];
              newLabels1 = [ labels.Year, labels.Month, labels.Week, labels.Day, labels.Hour, labels.Minute, labels.Second ];
            }
            if ( $( this ).hasClass( 'user_tz' ) ) {
              $this.countdown(
                {
                  until: ( !$this.attr( 'data-relative' ) ) ? new Date( untilDate ) : untilDate,
                  format: dateFormat,
                  padZeroes: true,
                  compact: compact,
                  compactLabels: [ 'y', 'm', 'w', ' days,' ],
                  timeSeparator: ' : ',
                  labels: newLabels,
                  labels1: newLabels1,
                  serverSync: new Date( $( this ).attr( 'data-time-now' ) )
                }
              );
            } else {
              $this.countdown(
                {
                  until: ( !$this.attr( 'data-relative' ) ) ? new Date( untilDate ) : untilDate,
                  format: dateFormat,
                  padZeroes: true,
                  compact: compact,
                  compactLabels: [ 'y', 'm', 'w', ' days,' ],
                  timeSeparator: ' : ',
                  labels: newLabels,
                  labels1: newLabels1
                }
              );
            }
            $( this ).attr( 'data-countdown_initialized', true );
          }
        );
      }
    },
    countTo: function ( $wrap ) {
      // Count

      if ( $.fn.countTo ) {
        if ( typeof $wrap == 'undefined' ) {
          $wrap = $( 'body' );
        }
        $wrap.find( '.molla-count-wrapper .count' ).each( function () {
          if ( $.fn.waypoint ) {
            $( this ).waypoint(
              function () {
                $( this.element ).countTo();
              },

              {
                offset: '90%',
                triggerOnce: true
              }
            );
          } else {
            $( this ).countTo();
          }
        } )
      }
    },
    reviewLink: function () {
      // Review tab/collapse show + scroll to tab
      $( 'body' ).on(
        'click',
        '.woocommerce-review-link',
        function ( e ) {
          var target = $( this ).attr( 'href' );
          if ( '#reviews' == target ) {
            var $target = $( target );

            if ( $( '#tab-reviews' ).length ) {
              $( '#tab-reviews' ).collapse( 'show' );
            }

            if ( $target.length ) {
              // Add offset for sticky menu
              var scrolloffset = ( $( window ).width() >= desktop_width ) ? ( $target.offset().top - sticky_offset_top - 40 ) : ( $target.offset().top - 40 );
              $( 'html, body' ).animate(
                {
                  'scrollTop': scrolloffset
                },
                600
              );

              $target.tab( 'show' );
            }
            e.preventDefault();
          }
        }
      );
    },
    scrollTo: function () {
      // Scroll To button
      var $scrollTo = $( '.scroll-to' );
      // If button scroll elements exists
      if ( $scrollTo.length ) {
        // Scroll to - Animate scroll
        $scrollTo.on(
          'click',
          function ( e ) {
            var target = $( this ).attr( 'href' );

            if ( target.indexOf( '#' ) == 0 ) {
              var $target = $( target );
            } else {
              var url = window.location.href;
              url = url.substring( url.indexOf( '://' ) + 3 );
              if ( url.indexOf( '#' ) != -1 ) {
                url = url.substring( 0, url.indexOf( '#' ) );
              }
              target = target.substring( target.indexOf( '://' ) + 3 );
              target = target.substring( target.indexOf( url ) + url.length );

              if ( target.indexOf( '#' ) == 0 ) {
                var $target = $( target );
                self.scrollToAnimate( $target );
              }
            }
          }
        );
      }

      var target = window.location.hash;
      self.scrollToAnimate( $( target ) );
    },
    scrollToAnimate: function ( $target ) {
      if ( typeof $target != 'undefined' && $target.length ) {
        // Add offset for sticky menu
        var scrolloffset = ( $( window ).width() >= desktop_width ) ? ( $target.offset().top - sticky_offset_top ) : $target.offset().top;
        $( 'html, body' ).animate(
          {
            'scrollTop': scrolloffset
          },
          600
        );
      }
    },
    scrollToTop: function () {
      // Scroll Top Button - Show
      var $scrollTop = $( '#scroll-top' );

      $( window ).on(
        'load scroll',
        function () {
          if ( $( window ).scrollTop() >= 400 ) {
            $scrollTop.addClass( 'show' );
          } else {
            $scrollTop.removeClass( 'show' );
          }
        }
      );
      // On click animate to top
      $scrollTop.on(
        'click',
        function ( e ) {
          $( 'html, body' ).animate(
            {
              'scrollTop': 0
            },
            800
          );
          var $section_nav = $( '.section-scroll-nav' );
          if ( $section_nav.length ) {
            $( '.section-wrapper' ).removeClass( 'active' );
            $( '.section-wrapper' ).eq( 0 ).addClass( 'active' );
            $section_nav.find( 'li' ).removeClass( 'active' );
            $section_nav.find( 'li:first-child' ).addClass( 'active' );
          }
          e.preventDefault();
        }
      );
    },
    layoutForm: function () {
      $( 'body' ).on(
        'click',
        '.btn-layout',
        function ( e ) {
          var classes = $( this )[ 0 ].classList[ 1 ];
          classes = classes.slice( 7 );
          classes = classes.replace( 'col', '' );
          $( '.layout-type' ).val( classes );
          if ( $( window ).width() >= desktop_width ) {
            $( '.device-width' ).val( 'lg' );
          } else if ( $( window ).width() >= tablet_width ) {
            $( '.device-width' ).val( 'md' );
          } else if ( $( window ).width() >= mobile_width ) {
            $( '.device-width' ).val( 'sm' );
          } else {
            $( '.device-width' ).val( 'xs' );
          }
          $( 'form.grid-layout-link' ).submit();
          e.preventDefault();

        }
      )
    },
    sizeGuide: function () {
      $( 'body' ).on(
        'click',
        '.size-guide',
        function ( e ) {
          var size_tab = $( this ).closest( 'body' ).find( '.size_tab' );
          var target = $( '.size_tab' );
          if ( target.length ) {
            var scrolloffset = ( $( window ).width() >= desktop_width ) ? ( target.offset().top - sticky_offset_top - 40 - ( 'undefined' == typeof $( '.collapse.show' ).height() ? 0 : $( '.collapse.show' ).height() ) ) : ( target.offset().top - 40 );
            $( 'html, body' ).animate(
              {
                'scrollTop': scrolloffset
              },
              400
            );
          }
          size_tab.addClass( 'active' ).siblings().removeClass( 'active' );
          $( '#' + size_tab.attr( 'aria-controls' ) ).addClass( 'active show' ).show().siblings().removeClass( 'active show' );

          if ( size_tab.closest( '.card' ).length ) {
            size_tab.closest( '.card' ).siblings().find( '[class*="_tab"]' ).addClass( 'collapsed' );
            size_tab.closest( '.card' ).siblings().find( '.panel.entry-content' ).removeClass( 'show' );
            size_tab.closest( '.card' ).find( '.panel.entry-content' ).addClass( 'show' );
          }
          size_tab.removeClass( 'collapsed' );
          if ( !size_tab_active ) {
            if ( $.fn.isotope ) {
              self.isotopeInit();
            }
            size_tab_active = true;
          }
          e.preventDefault();
        }
      )
      $( 'body' ).on(
        'click',
        '.size_tab',
        function () {
          if ( !size_tab_active ) {
            if ( $.fn.isotope ) {
              self.isotopeInit();
            }
          }
        }
      )

    },
    commentRecommend: function () {
      $( 'body' ).on(
        'click',
        '.recommend',
        function () {
          var $this = $( this ),
            $parent = $this.parent(),
            review_id = $this.attr( 'data-id' ),
            status = $this.hasClass( 'like' ) ? true : false;

          $this.attr( 'disabled', true );

          $.post(
            theme.ajax_url,
            {
              review_id: review_id,
              action: 'molla_review-action',
              status: status,
              nonce: theme.nonce
            },
            function ( ret ) {
              if ( ret ) {
                ret = JSON.parse( ret );
                $parent.find( '.like .review-count' ).text( ret[ 0 ] ? ret[ 0 ] : 0 );
                $parent.find( '.dislike .review-count' ).text( ret[ 1 ] ? ret[ 1 ] : 0 );
                if ( ret[ 2 ].length ) {
                  $parent.find( '.like' ).removeClass( 'fade-out' );
                  $parent.find( '.like' ).addClass( 'fade-in' );
                  setTimeout(
                    function () {
                      $parent.find( '.like' ).removeClass( 'fade-in' );
                      $parent.find( '.like' ).addClass( 'fade-out' );
                    },
                    650
                  );
                }
                if ( ret[ 3 ].length ) {
                  $parent.find( '.dislike' ).removeClass( 'fade-out' );
                  $parent.find( '.dislike' ).addClass( 'fade-in' );
                  setTimeout(
                    function () {
                      $parent.find( '.dislike' ).removeClass( 'fade-in' );
                      $parent.find( '.dislike' ).addClass( 'fade-out' );
                    },
                    650
                  );
                }
                $this.attr( 'disabled', false );
              }
            }
          );
        }
      )
    },
    googleMap: function () {
      // Google Map api v3 - Map for contact pages
      if ( document.getElementById( "map" ) && typeof google === "object" ) {

        var content = '<address>' +
          '88 Pine St,<br>' +
          'New York, NY 10005, USA<br>' +
          '<a href="#" class="direction-link" target="_blank">Get Directions <i class="icon-angle-right"></i></a>' +
          '</address>';

        var latLong = new google.maps.LatLng( 40.8127911, -73.9624553 );

        var map = new google.maps.Map(
          document.getElementById( 'map' ),
          {
            zoom: 14,
            center: latLong, // Map Center coordinates
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP

          }
        );

        var infowindow = new google.maps.InfoWindow(
          {
            content: content,
            maxWidth: 360
          }
        );

        var marker;
        marker = new google.maps.Marker(
          {
            position: latLong,
            map: map,
            animation: google.maps.Animation.DROP
          }
        );

        google.maps.event.addListener(
          marker,
          'click',
          ( function ( marker ) {
            return function () {
              infowindow.open( map, marker );
            }
          } )( marker )
        );
      }

    },
    quickView: function () {
      // Product quickView popup
      $( 'body' ).on(
        'click',
        '.btn-quickview',
        function ( e ) {
          if ( $.fn.magnificPopup ) {
            var $this = $( this );
            var src = '<div class="container quickView-container woocommerce">' +
              '<div class="quickView-content ' + theme.quickview + '">' +
              molla_filter( 'quickview_content_before_ajax', [ '<div class="molla-loading" style="min-height: 510px;"></div>' ] ) +
              '</div>' +
              '</div>';

            $.magnificPopup.open(
              {
                type: 'ajax',
                mainClass: "mfp-ajax-product",
                tLoading: '',
                preloader: false,
                removalDelay: 350,
                autoFocusLast: false,
                items: {
                  src: src,
                  type: 'inline'
                },
                callbacks: {
                  open: function () {
                    $( 'html' ).css( 'overflow', 'hidden' );
                    $( 'body' ).css( 'overflow-x', 'visible' );
                    $( '.mfp-wrap' ).css( 'overflow', 'hidden auto' );
                    $( 'html, .sticky-header.fixed, .sticky-bar.fixed' ).css( 'margin-right', self.getScrollbarWidth() );
                  },
                  close: function () {
                    $( 'html' ).css( 'overflow-y', '' );
                    $( 'body' ).css( 'overflow-x', 'hidden' );
                    $( '.mfp-wrap' ).css( 'overflow', '' );
                    $( 'html, .sticky-header.fixed, .sticky-bar.fixed' ).css( 'margin-right', '0' );
                  }
                }
              }
            );

            $.post(
              theme.ajax_url,
              {
                action: 'molla_quickview-action',
                product_id: $this.data( 'product-id' ),
                nonce: theme.nonce
              },
              function ( ret ) {
                if ( ret ) {
                  $( '.quickView-content' ).html( $( ret ) );
                  self.singleInit( $( '.quickView-content .product' ) );
                }
              }
            );

            e.preventDefault();
          }
        }
      );
    },
    carouselDot: function () {
      $( 'body' ).on(
        'click',
        '.carousel-dot',
        function () {
          $( this ).siblings().removeClass( 'active' );
          $( this ).addClass( 'active' );
        }
      );
    },
    lazyloadImg: function ( $selector ) {
      if ( undefined == $selector ) {
        $selector = $( 'body' );
      }
      if ( !$.fn.lazyload ) {
        return;
      }

      var options = {
        effect: 'fadeIn',
        data_attribute: 'src',
        effect_speed: 400,
        load: function () {
          self.afterImgLoaded( $selector, $( this ) );
        }
      }

      $selector.find( '.molla-lazyload, .molla-lazyload-back' ).filter(
        function () {
          if ( $( this ).closest( '.owl-carousel' ).length && $( this ).closest( '.owl-carousel' ).find( '.owl-item.cloned' ).length ) {
            return false;
          }
          return true;
        }
      ).map(
        function () {
          $( this ).lazyload( options );
        }
      )
    },
    afterImgLoaded: function ( $wrap, $img ) {
      if ( $img.hasClass( 'molla-lazyload' ) ) {
        $img.css( 'padding-top', '' ).removeClass( 'molla-lazyload' );
      } else {
        $img.removeClass( 'molla-lazyload-back' );
      }

      if ( $img.closest( '.product-gallery' ).length && !$img.closest( '.product-image-gallery' ).length ) {
        if ( !$img.data( 'elevateZoom' ) ) {
          var $main = $img.closest( '.product-main-image' );
          var options = {};
          options.zoomContainer = $img.parent();
          if ( $main.length ) {
            if ( $main.siblings( '.product-image-gallery' ).length ) {
              options.gallery = 'product-zoom-gallery';
              options.galleryActiveClass = 'active';
            }
          }

          if ( !$img.closest( '.owl-item' ).length || $img.closest( '.owl-item' ).hasClass( 'active' ) ) {
            // self.elevateZoomInit($img, options);
          }
        }
      }

      var $isotope_wrap = $img.closest( '[data-toggle="isotope"]' );
      if ( $isotope_wrap.length && $isotope_wrap.data( 'isotope' ) ) {
        $isotope_wrap.isotope( 'layout' );
      }
    },
    lazyloadMenu: function () {
      var lazyMenus = $( '.lazy-menu' ).map( function () {
        return this.getAttribute( 'id' ).slice( 5 ); // remove prefix 'menu-'
      } ).get();

      if ( !lazyMenus.length ) {
        return;
      }
      $.ajax(
        {
          type: 'POST',
          url: theme.ajax_url,
          data: {
            action: "molla_lazy_load_menus",
            menus: lazyMenus,
            nonce: theme.nonce,
          },
          success: function ( menus ) {
            menus = JSON.parse( menus );
            if ( menus ) {
              for ( var menuId in menus ) {
                var $submenus = $( '#menu-' + menuId ).removeClass( 'lazy-menu' ).children( 'li' );
                $( menus[ menuId ] ).filter( 'li' ).each( function () {
                  var $newli = $( this ),
                    $oldli = $submenus.eq( $newli.index() );
                  $oldli.children( 'ul' ).remove();
                  $oldli.append( $newli.children( 'ul' ) );
                } );
                self.owlCarousels( $( '#menu-' + menuId ) );
                self.floatingElements( $( '#menu-' + menuId ) );
                self.countDown( $( '#menu-' + menuId ) );
                self.layoutInit( $( '#menu-' + menuId ) );
              }
            }
          }
        }
      );
    },
    fitVid: function ( $selector ) {
      // fit video

      if ( typeof $selector == 'undefined' ) {
        $selector = $( '.fit-video' );
      }

      if ( $.fn.fitVids ) {

        if ( window.wp.mediaelement ) {
          window.wp.mediaelement.initialize();
        }
        $selector.fitVids();
        $( window ).on(
          'resize',
          function () {
            $selector.fitVids();
          }
        );
      }
    },
    videoBack: function ( $wrap ) {
      if ( !$.fn.vide ) {
        return;
      }

      var defaultOptions = {
        volume: 0.67,
        muted: true,
        loop: true,
        autoplay: true,
        position: '50% 50%',
        posterType: 'detect',
        playbackRate: 1,
        className: ''
      }

      if ( typeof $wrap == 'undefined' ) {
        $wrap = $( 'body' );
      }
      $wrap.find( '[data-toggle="video"]' ).each( function () {
        var options = $( this ).data( 'options' );
        if ( options ) {
          options = $.extend( {}, defaultOptions, options );
        }
        $( this ).vide( options.path, options );
      } )

      $( 'body' ).on( 'click', '.vce-molla-banner .video-banner', function ( e ) {
        if ( $( this ).find( '.btn-video' ).length ) {
          return;
        }
        var video = $( this ).find( 'video' );
        if ( !video.length ) {
          return;
        }
        video = video[ 0 ];
        if ( $( this ).hasClass( 'video-lightbox' ) ) {
          video = $( this ).find( 'video' );
          if ( video.length ) {
            var videoHtml = '<video autoplay controls' + ( typeof video.attr( 'muted' ) != 'undefined' ? " muted" : "" ) + ( typeof video.attr( 'loop' ) != 'undefined' ? " loop" : "" ) + ' src="' + video.find( "source" ).attr( "src" ) + '" style="position: relative; left: 50%; transform: translate(-50%);"></video';
            self.openLightbox( {}, videoHtml, 'inline' );
          }
        } else {
          video.play();
        }

        var parallaxWrap = $( this ).find( '.parallax-wrap' );
        if ( parallaxWrap.length ) {
          $( this ).removeClass( 'parallax-container' );
          parallaxWrap.remove();
        }
      } )
      $( 'body' ).on( 'click', '.vce-molla-banner .video-banner .btn-video', function ( e ) {
        var videoBanner = $( this ).closest( '.video-banner' ),
          video = videoBanner.find( 'video' );
        if ( !video.length ) {
          return;
        }
        if ( videoBanner.hasClass( 'video-lightbox' ) ) {
          var videoHtml = '<video autoplay controls' + ( typeof video.attr( 'muted' ) != 'undefined' ? " muted" : "" ) + ( typeof video.attr( 'loop' ) != 'undefined' ? " loop" : "" ) + ' src="' + video.find( "source" ).attr( "src" ) + '" style="position: relative; left: 50%; transform: translate(-50%);"></video';
          self.openLightbox( {}, videoHtml, 'inline' );
        } else {
          video = video[ 0 ];
          video.play();
        }

        var parallaxWrap = videoBanner.find( '.parallax-wrap' );
        if ( parallaxWrap.length ) {
          videoBanner.removeClass( 'parallax-container' );
          parallaxWrap.remove();
        }

        e.preventDefault();
      } )
    },
    add_to_cart_sticky: function () {
      var $sticky_bar_wrapper = $( '.sticky-bar-wrapper' );
      if ( $sticky_bar_wrapper.length ) {
        var $sticky_bar = $sticky_bar_wrapper.find( '.sticky-bar' );
        if ( $( window ).width() >= desktop_width ) {
          if ( $sticky_bar_wrapper.offset().top < $( window ).scrollTop() ) {
            if ( !$sticky_bar.hasClass( 'fixed' ) ) {
              $sticky_bar_wrapper.css( 'height', $sticky_bar.outerHeight() + 'px' );
            }
            $sticky_bar.addClass( 'fixed' );
            $sticky_bar.css( 'transform', 'trnaslateY(0)' );
            $( 'body' ).addClass( 'mb-lg-max-0' );
            $( 'body' ).css( 'margin-bottom', $( '.sticky-bar.fixed' ).outerHeight() + 'px' );
          } else {
            $sticky_bar.removeClass( 'fixed' );
            $sticky_bar_wrapper.css( 'height', '' );
          }
        } else if ( $sticky_bar.hasClass( 'fixed' ) ) {
          $sticky_bar.removeClass( 'fixed' );
        }
      }
    },
    ajax_cart_loaded: function () {
      $( 'body' ).on( 'wc_fragments_refreshed', function ( e, f ) {
        self.quantityInputs();
      } )
    },
    ajax_load: function () {
      // Products Ajax Load (Button, Scroll)
      $( 'body' ).on(
        'click',
        '.more-product',
        function ( e ) {
          var more_container = $( this ).closest( '.more-container' );
          var $products = more_container.prev().find( ".products" ).length > 0 ? more_container.prev().find( ".products" ) : more_container.prev();

          var $options = JSON.parse( $products.attr( 'data-props' ) );
          if ( $products.length ) {
            if ( undefined == $options.extra_atts || undefined == $options.extra_atts.page || $options.total_pages > $options.extra_atts.page ) {
              if ( $products.closest( '.molla-product-wrapper' ).find( '.cat-filter' ).length ) {
                self.ajax_load_products( $products, $products.closest( '.molla-product-wrapper' ).find( '.cat-filter .active a' ).attr( 'data-filter' ), true );
              } else {
                self.ajax_load_products( $products, undefined, true );
              }
            }
          }
          e.preventDefault();
        }
      );
      // Posts Ajax Load (Button, Scroll)
      $( 'body' ).on(
        'click',
        '.more-articles',
        function ( e ) {
          var $loadmore = $( this ),
            $posts = $( this ).closest( '.more-container' ).siblings( '.posts' );
          self.ajax_load_posts( $posts, $loadmore );
          e.preventDefault();
        }
      );
      // Pagination Ajax Load
      $( 'body' ).on(
        'click',
        '.pagination a.page-numbers',
        function ( e ) {
          var $pagination = $( this ).closest( '.pagination' ),
            url = $( this ).attr( 'href' );

          if ( $pagination.parent().find( '.products' ).length ) {
            self.ajax_load_more_pagination( $pagination.parent().find( '.products' ), $pagination, url );
            e.preventDefault();
          } else if ( $pagination.parent().find( '.posts' ).length ) {
            self.ajax_load_more_pagination( $pagination.parent().find( '.posts' ), $pagination, url );
            e.preventDefault();
          }
        }
      )

      // Products Widget Category Filter
      $( 'body' ).on(
        'click',
        '.molla-product-wrapper .cat-filter a',
        function ( e ) {
          e.preventDefault();
          var $products = $( this ).closest( '.molla-product-wrapper' ).find( '.products' );

          if ( $products.length && !$products.hasClass( 'molla-loading' ) ) {
            var category = $( this ).attr( 'data-filter' );
            var id = $( this ).closest( '.elementor-widget-molla_product' ).attr( 'data-id' );

            if ( undefined == ajax_filter_cat_content[ id ] || -1 == Object.keys( ajax_filter_cat_content[ id ] ).indexOf( category ) ) {
              self.ajax_load_products( $products, category );
            } else {
              var $curItem = $products.closest( '.molla-product-wrapper' ).find( '.cat-filter' ).find( '[data-filter="' + category + '"]' ),
                $container = $products.closest( '.molla-product-wrapper' );
              $curItem.parent().addClass( 'active' ).siblings().removeClass( 'active' );
              $container.html( $( ajax_filter_cat_content[ id ][ category ] ) );
              $products = $container.find( '.products' );
              $products.css( 'opacity', 0 );
              if ( $products.hasClass( 'owl-carousel' ) ) {
                self.owlCarousels( $products.parent() );
              } else if ( $products.data( 'toggle' ) == 'isotope' ) {
                self.layoutInit( $products );
              }
              $products.animate(
                {
                  'opacity': 1,
                },
                400,
                function () {
                  $products.css( 'opacity', '' );
                }
              );

              self.productSlide( $products );
              self.countDown( $products );
            }
          } else if ( !$products.length ) {
            $( this ).parent().addClass( 'active' ).siblings().removeClass( 'active' );
          }
        }
      )
    },
    ajax_load_products: function ( $products, $category, $btn_more ) {
      if ( !$products.length ) {
        return;
      }

      var $loadmore = $products.closest( '.yit-wcan-container' ).siblings( '.more-container' ).children( '.btn-more' );
      if ( !$loadmore.length ) {
        $loadmore = $products.closest( '.woocommerce' ).find( '.more-container' ).children( '.btn-more' );
      }
      if ( $btn_more == undefined ) {
        $products.addClass( 'molla-loading' );
      } else {
        var $more_container = $loadmore.closest( '.more-container' ),
          $icon = $loadmore.find( 'i' );
        if ( $icon.length ) {
          $icon.addClass( 'molla-loading' );
        } else {
          $loadmore.find( 'span' ).append( '<span class="molla-loading"></span>' );
        }
      }
      $( document ).trigger( 'molla_before_ajax_load_products', [ $products, $loadmore ] );

      var options = JSON.parse( $products.attr( 'data-props' ) );
      var url = theme.ajax_url;

      if ( options.name == undefined || options.name == '' ) { // shop page
        var curUrl = window.location.href.split( '/' ),
          idx = curUrl.indexOf( 'page' );

        if ( idx != -1 ) {
          curUrl[ idx + 1 ]++;
        } else {
          var query = curUrl.pop();
          curUrl.push( 'page' );
          curUrl.push( ( options.extra_atts == undefined || options.extra_atts.page == undefined ) ? 2 : options.extra_atts.page + 1 );
          curUrl.push( query );
        }

        url = curUrl.join( '/' );
      }

      $.post(
        url,
        {
          action: ( options.name == undefined || options.name == '' ? '' : 'molla_more_product-action' ),
          options: options,
          ajax_loadmore: ( options.name == undefined || options.name == '' ? '' : true ), // for loading only products widget.
          filter_cat: ( $category == undefined ? false : $category ),
          btn_more: ( $btn_more == undefined ? false : true ), // loadmore button or infinite scroll
          nonce: theme.nonce
        },
        function ( ret ) {
          if ( ret ) {
            if ( $btn_more == undefined ) { // category filter
              $products.removeClass( 'molla-loading' );
              var $container = $products.closest( '.molla-product-wrapper' );
              $products.children().remove();
              $products.append( $( ret ).find( '.products > *' ) );
              $products.attr( 'data-props', $( ret ).find( '.products' ).attr( 'data-props' ) );
              $products = $container.find( '.products' );
              var $curItem = $container.find( '.cat-filter' ).find( '[data-filter="' + $category + '"]' );
              var id = $container.closest( '.elementor-widget-molla_product' ).attr( 'data-id' );
              $curItem.parent().addClass( 'active' ).siblings().removeClass( 'active' );
              if ( ajax_filter_cat_content[ id ] == undefined ) {
                ajax_filter_cat_content[ id ] = {};
              }
              // load more
              if ( !$( ret ).find( '.more-container' ).length ) {
                $loadmore.hide();
              } else {
                $loadmore.show();
                $loadmore.find( 'i' ).removeClass( 'molla-loading' );
                $loadmore.find( '.molla-loading' ).remove();
              }
              ajax_filter_cat_content[ id ][ $category ] = $container.html();
              $products.css( 'opacity', '0' );
              if ( $products.hasClass( 'owl-carousel' ) ) {
                $products.trigger( 'destroy.owl.carousel' );
                self.owlCarousels( $products.parent() );
              } else if ( $products.data( 'layout' ) == 'masonry' ) {
                if ( $products.data( 'isotope' ) ) {
                  $products.isotope( 'destroy' );
                }

                if ( typeof imagesLoaded === 'function' ) {
                  $products.imagesLoaded(
                    function () {
                      self.layoutInit( $products );
                    }
                  )
                }
              }
              $products.animate(
                {
                  'opacity': 1,
                },
                400,
                function () {
                  $products.css( 'opacity', '' );
                }
              );
            } else {
              $more_container.removeClass( 'molla-loading' );
              if ( $products.hasClass( 'owl-carousel' ) ) {
                $( ret ).find( '.product' ).parent().each(
                  function () {
                    if ( this.tagName ) {
                      $products.trigger( 'add.owl.carousel', [ $( this ) ] );
                    }
                  }
                );
                $products.trigger( 'refresh.owl.carousel' );
              } else if ( $products.hasClass( 'grid' ) ) {
                var $items = $( ret ).find( '.product' ).parent().addClass( 'grid-item' );
                $products.append( $items ).isotope( 'appended', $items );
                self.requestTimeout(
                  function () {
                    $products.isotope( 'layout' );
                  },
                  100
                );
              } else {
                var $ret_pro = $( ret ).find( '.product' ).parent().css( { position: 'relative', top: '50px', opacity: 0 } );
                $products.append( $ret_pro );
                $ret_pro.animate(
                  {
                    top: 0,
                    opacity: 1
                  },
                  300,
                  function () {
                    $( this ).css( { position: '', top: '', opacity: '' } );

                    var $cat = $products.closest( '.molla-product-wrapper' ).find( '.cat-filter' );
                    if ( $cat.length ) {
                      var id = $products.closest( '.elementor-widget-molla_product' ).attr( 'data-id' );
                      $cat = $cat.find( '.active a' ).attr( 'data-filter' );
                      if ( ajax_filter_cat_content[ id ] == undefined ) {
                        ajax_filter_cat_content[ id ] = {};
                      }
                      ajax_filter_cat_content[ id ][ $cat ] = $products.closest( '.molla-product-wrapper' ).html();
                    }
                  }
                )
              }

              if ( $products.find( '.owl-carousel' ).length ) {
                self.owlCarousels( $products );
                $products.trigger( 'refresh.owl.carousel' );
              }

              var props = JSON.parse( $products.attr( 'data-props' ) );

              if ( props.name == "" ) { // shop page
                if ( undefined == props.extra_atts || undefined == props.extra_atts.page ) {
                  props.page = 2;
                  props.extra_atts = { page: 2 };
                } else {
                  props.page = props.extra_atts.page = props.extra_atts.page + 1;
                }
              } else { // products widget
                props.page = props.extra_atts.page = JSON.parse( $( ret ).find( '.products' ).attr( 'data-props' ) ).extra_atts.page;
              }
              $products.attr( 'data-props', JSON.stringify( props ) );
              if ( props.page >= props.total_pages ) {
                $loadmore.hide();
              } else {
                $loadmore.find( 'i' ).removeClass( 'molla-loading' );
                $loadmore.find( '.molla-loading' ).remove();
              }

              var $wc_res = $loadmore.parent().parent().find( '.woocommerce-result-count' );
              if ( $wc_res.length ) {
                if ( props.page == props.total_pages ) {
                  $wc_res.children( '.total' ).siblings().remove();
                  $wc_res.children( '.total' ).text( 'all ' + props.total );
                } else {
                  $wc_res.children( '.to' ).text( props.per_page * props.page );
                }
              }
            }
            self.productSlide( $products );
            self.countDown( $products );
            self.productTotalSales( $products );
            $( window ).trigger( 'scroll' );
            $( document ).trigger( 'molla_ajax_load_products_success', [ $products, $loadmore ] );
          }
        }
      );
    },
    ajax_load_posts: function ( $posts, $loadmore ) {
      if ( !$posts.length || !$loadmore.length ) {
        return;
      }
      var $more_container = $loadmore.closest( '.more-container' );
      $more_container.addClass( 'molla-loading' );
      $loadmore.hide();
      $( document ).trigger( 'molla_before_ajax_load_posts', [ $posts, $loadmore ] );

      var url = theme.ajax_url;
      var args = JSON.parse( $posts.attr( 'data-props' ) ),
        args_page = JSON.parse( $posts.attr( 'data-page-props' ) );
      if ( args.name == undefined ) {
        args.name = '';
      }

      if ( args.name != 'posts' ) {
        var curUrl = window.location.href.split( '/' ),
          idx = curUrl.indexOf( 'page' );

        if ( curUrl[ curUrl.length - 1 ] == '#' || curUrl[ curUrl.length - 1 ] == '' ) {
          curUrl.pop();
        }

        if ( idx != -1 ) {
          curUrl[ idx + 1 ]++;
        } else {
          var page_args = JSON.parse( $loadmore.attr( 'data-page-args' ) );
          curUrl.push( 'page' );
          curUrl.push( page_args.paged == undefined ? 2 : page_args.paged + 1 );
        }

        url = curUrl.join( '/' );
      }

      $.post(
        url,
        {
          action: ( args.name != 'posts' ? '' : 'molla_more_articles-action' ),
          atts: args,
          page: args_page,
          nonce: theme.nonce
        },
        function ( ret ) {
          if ( ret ) {
            if ( $posts.hasClass( 'owl-carousel' ) ) {
              $( ret ).each(
                function () {
                  if ( this.tagName ) {
                    $posts.trigger( 'add.owl.carousel', [ $( this ) ] );
                  }
                }
              );
              $posts.trigger( 'refresh.owl.carousel' );
            }

            if ( !$posts.hasClass( 'owl-carousel' ) ) {
              var $ret_post = $( ret ).find( 'article' ).parent().css( { position: 'relative', top: '50px', opacity: 0 } );
              $posts.append( $ret_post );
              if ( !$posts.hasClass( 'grid' ) ) {
                $ret_post.animate(
                  {
                    top: 0,
                    opacity: 1
                  },
                  300,
                  function () {
                    $( this ).css( { position: '', top: '', opacity: '' } );
                  }
                )
              }
            }

            if ( $posts.hasClass( 'grid' ) ) {
              if ( $posts.data( 'isotope' ) ) {
                self.requestTimeout(
                  function () {
                    $posts.isotope( 'appended', $ret_post );
                  },
                  100
                );
              } else {
                self.requestTimeout(
                  function () {
                    self.layoutInit( $posts );
                  },
                  100
                );
              }
            }

            if ( $posts.find( '.owl-carousel' ).length ) {
              self.owlCarousels( $posts );
              $posts.trigger( 'refresh.owl.carousel' );
            }

            args_page.paged++;
            if ( Number( args_page.paged ) < Number( args.max_num_pages ) ) {
              $loadmore.show();
            }
            $posts.attr( 'data-page-props', JSON.stringify( args_page ) );
            $more_container.removeClass( 'molla-loading' );

            var $filter = $posts.siblings( '.nav-filter' ),
              total_cnt = $posts.find( '.grid-item' ).length;
            $ret_post.each(
              function () {
                var e_cats = $( this ).attr( 'data-cats' ).split( ' ' );
                for ( var i = 0; i < e_cats.length; i++ ) {
                  var $count = $filter.find( '.nav-item .' + e_cats[ i ] ).find( '.count' ),
                    $item = $count.closest( '.nav-item' );

                  $count.html( Number( $count.html() ) + 1 );

                  if ( $item.hasClass( 'd-none' ) ) {
                    $item.removeClass( 'd-none' );
                  }
                }
              }
            )
            $filter.find( '.nav-item:first-child .count' ).html( total_cnt );
            $( document ).trigger( 'molla_ajax_load_posts_success', [ $posts, $loadmore ] );
          }
        }
      );
    },
    ajax_load_more_pagination: function ( $content, $pagination, url ) {
      if ( !$content.length || !$pagination.length || !url ) {
        return;
      }

      $content.removeClass( 'molla-loading' );
      $( document ).trigger( 'molla_before_ajax_load_more_pagination', [ $content, $pagination, url ] );
      if ( $content.data( 'isotope' ) ) {
        $content.isotope( 'destroy' );
      } else if ( $content.hasClass( 'owl-carousel' ) ) {
        $content.trigger( 'destroy.owl.carousel' );
      }
      $.post(
        url,
        function ( ret ) {
          if ( ret ) {
            $content.removeClass( 'molla-loading' );
            var $parent = $content.parent(),
              creative = false,
              slider = false,
              filter = false;

            if ( $content.hasClass( 'grid' ) ) {
              creative = true;
              if ( $content.hasClass( 'posts' ) && $content.siblings( '.nav-filter' ).length ) {
                filter = true;
              }
            } else if ( $content.hasClass( 'owl-carousel' ) ) {
              slider = true;
            }

            if ( $content.hasClass( 'posts' ) ) {
              $parent = $content.closest( '.blog-entry-wrapper' );
              $content.closest( '.blog-entry-wrapper' ).html( $( ret ).find( '.blog-entry-wrapper' )[ 0 ].children );
            } else {
              var cls = $content.attr( 'class' ).replace( / +/g, '.' ),
                data = $( ret ).find( '.' + cls )[ 0 ];

              $content.replaceWith( $( data ) );
              $( '.woocommerce-result-count' ).replaceWith( $( $( ret ).find( '.woocommerce-result-count' )[ 0 ] ) );
              $pagination.replaceWith( $( $( ret ).find( '.pagination' )[ 0 ] ) );
            }

            if ( creative ) {
              if ( typeof imagesLoaded === 'function' ) {
                $parent.imagesLoaded(
                  function () {
                    self.layoutInit( $parent.find( '.grid' ) );
                  }
                )
              } else {
                self.layoutInit( $parent.find( '.grid' ) );
              }
            } else if ( slider ) {
              self.owlCarousels( $parent );
            }

            self.productSlide( $parent.find( '.products' ) );
            self.countDown( $parent.find( '.products' ) );

            //update browser history (IE doesn't support it)
            if ( !navigator.userAgent.match( /msie/i ) ) {
              window.history.pushState( { "pageTitle": ret.pageTitle }, "", url );
            }
            if ( $( '.sticky-sidebar.sidebar' ).length ) {
              $( '.sticky-sidebar.sidebar' ).trigger( 'recalc.pin' );
            }

            var $updated_page_header = $( ret ).find( '.main > .page-header' );
            if ( $updated_page_header.length ) {
              if ( $( '.page-header' ).length ) {
                $( '.page-header' ).replaceWith( $updated_page_header );
              } else {
                $( '.main' ).prepend( $updated_page_header );
              }
            } else {
              $( '.page-header' ).remove();
            }

            $( document ).trigger( 'molla_ajax_load_more_pagination_success', [ ret, $content, $pagination ] );
          }
        }
      );
    },
    wc_fragments_refreshed: function () {
      $( 'body' ).on(
        'wc_fragments_refreshed wc_fragments_loaded',
        function () {
          self.refreshCartFragment();
          self.calcCartListHeight();
        }
      );
    },
    refreshCartFragment: function () {
      $( document ).off( 'click', '.widget_shopping_cart .remove' ).on(
        'click',
        '.widget_shopping_cart .remove',
        function ( e ) {
          e.preventDefault();
          var $this = $( this );
          var cart_id = $this.data( "cart_item_key" );
          var product_id = $this.data( "product_id" );

          $.ajax(
            {
              type: 'POST',
              dataType: 'json',
              url: theme.ajax_url,
              data: {
                action: "molla_cart_item_remove",
                nonce: theme.nonce,
                cart_id: cart_id
              },
              success: function ( response ) {
                var this_page = window.location.toString(),
                  item_count = $( response.fragments[ 'div.widget_shopping_cart_content' ] ).find( '.mini_cart_item' ).length;

                this_page = this_page.replace( 'add-to-cart', 'added-to-cart' );
                $( document.body ).trigger( 'wc_fragment_refresh' );
                $( '.viewcart-' + product_id ).removeClass( 'added' );
                $( '.molla_cart_item_' + cart_id ).remove();

                // Block widgets and fragments
                if ( item_count == 0 && ( $( 'body' ).hasClass( 'woocommerce-cart' ) || $( 'body' ).hasClass( 'woocommerce-checkout' ) ) ) {
                  $( '.page-content' ).fadeTo( '400', '0.8' ).block(
                    {
                      message: null,
                      overlayCSS: {
                        opacity: 0.2
                      }
                    }
                  );
                } else {
                  $( '.shop_table.cart, .shop_table.review-order, .updating, .cart_totals' ).fadeTo( '400', '0.8' ).block(
                    {
                      message: null,
                      overlayCSS: {
                        opacity: 0.2
                      }
                    }
                  );
                }

                // Unblock
                $( '.widget_shopping_cart, .updating' ).stop( true ).unblock();

                // Cart page elements
                if ( item_count == 0 && ( $( 'body' ).hasClass( 'woocommerce-cart' ) || $( 'body' ).hasClass( 'woocommerce-checkout' ) ) ) {
                  $( '.page-content' ).load(
                    this_page + ' .page-content:eq(0) > *',
                    function () {
                      $( '.page-content' ).stop( true ).css( 'opacity', '1' ).unblock();
                    }
                  );
                } else {
                  $( '.shop_table.cart' ).load(
                    this_page + ' .shop_table.cart:eq(0) > *',
                    function () {
                      $( '.shop_table.cart' ).stop( true ).css( 'opacity', '1' ).unblock();
                      self.quantityInputs();
                    }
                  );

                  $( '.cart_totals' ).load(
                    this_page + ' .cart_totals:eq(0) > *',
                    function () {
                      $( '.cart_totals' ).stop( true ).css( 'opacity', '1' ).unblock();
                    }
                  );

                  // Checkout page elements
                  $( '.shop_table.review-order' ).load(
                    this_page + ' .shop_table.review-order:eq(0) > *',
                    function () {
                      $( '.shop_table.review-order' ).stop( true ).css( 'opacity', '1' ).unblock();
                    }
                  );
                }
              }
            }
          );

          return false;
        }
      );
    },
    miniCartUpdate: function () {
      var timerId = 0;
      $( '.cart-popup' ).on( 'change', '.qty', function () {
        var cart_item_key = $( this ).closest( '.mini_cart_item' ).find( '.remove' ).data( 'cart_item_key' ),
          qty = $( this ).val();
        timerId && clearTimeout( timerId );
        timerId = setTimeout( function () {
          // Update Cart Content
          $.ajax(
            {
              type: 'POST',
              url: theme.ajax_url,
              data: {
                action: "molla_update_minicart_qty",
                cart_item_key: cart_item_key,
                qty: qty
              },
              success: function ( response ) {
                $( 'body' ).trigger( 'wc_fragment_refresh' );
              }
            }
          );
        }, 700 );
      } )
    },
    ajax_login_form: function () {
      $( 'body' ).on(
        'click',
        '.account-links .login-link',
        function ( e ) {
          var mpInstance = $.magnificPopup.instance;
          if ( mpInstance.isOpen ) {
            mpInstance.close();
          }
          var src = '<div class="login-popup-container"><div class="login-popup"></div></div>';
          $.magnificPopup.open(
            {
              items: {
                src: src,
                type: 'inline'
              },
              preloader: false,
              removalDelay: 350,
              mainClass: 'mfp-login-form woocommerce',
              callbacks: {
                open: function () {
                  $( 'html' ).css( 'overflow', 'hidden' );
                  $( 'body' ).css( 'overflow-x', 'visible' );
                  $( '.mfp-wrap' ).css( 'overflow', 'hidden auto' );
                  $( 'html, .sticky-header.fixed, .sticky-bar.fixed' ).css( 'margin-right', self.getScrollbarWidth() );
                  $( '.mfp-bg' ).addClass( 'molla-loading' );
                },
                close: function () {
                  $( 'html' ).css( 'overflow-y', '' );
                  $( 'body' ).css( 'overflow-x', 'hidden' );
                  $( '.mfp-wrap' ).css( 'overflow', '' );
                  $( 'html, .sticky-header.fixed, .sticky-bar.fixed' ).css( 'margin-right', '0' );
                }
              }
            }
          );
          $.post(
            theme.ajax_url,
            {
              action: 'molla_account_form',
              nonce: theme.nonce
            },
            function ( ret ) {
              if ( ret ) {
                $( '.mfp-bg' ).removeClass( 'molla-loading' );
                $( '.mfp-login-form .login-popup' ).html( ret );
                $( '.mfp-login-form .mfp-content' ).css( { 'transform': 'none', 'opacity': '1' } );
              }
            }
          );
          e.preventDefault();
        }
      )
    },
    ajax_login_form_submit: function () {
      $( 'body' ).on(
        'submit',
        '#customer_login form',
        function ( e ) {
          var $form = $( this ), isLogin = $form.hasClass( 'login' );
          $form.find( 'p.submit-status' ).show().text( 'Please wait...' ).addClass( 'loading' );
          $form.find( 'button[type=submit]' ).attr( 'disabled', 'disabled' );
          $.ajax(
            {
              type: 'POST',
              dataType: 'json',
              url: theme.ajax_url,
              data: $form.serialize() + '&action=molla_account_login_popup_' + ( isLogin ? 'login' : 'register' ),
              success: function ( data ) {
                $form.find( 'p.submit-status' ).html( data.message.replace( '/<script.*?\/script>/s', '' ) ).removeClass( 'loading' );
                $form.find( 'button[type=submit]' ).removeAttr( 'disabled' );
                if ( data.loggedin === true ) {
                  window.location.reload();
                }
              }
            }
          );
          e.preventDefault();
        }
      );
    },
    fullWidthControl: function () {
      var body_width = $( 'body' ).width();
      $( '.page-content > .container > .alignfull' ).each(
        function () {
          $( this ).css( 'margin-left', -( body_width - $( this ).parent().width() ) / 2 + 'px' ).width( body_width );
        }
      )
    },
    countUpdatedCtrl: function () {
      $( 'body' ).on(
        'added_to_wishlist',
        function () {
          $( '.wishlist-count' ).each(
            function () {
              var $wishlist = $( this ),
                wishlist_count = $( this ).html();
              wishlist_count = wishlist_count.replace( /[^0-9]/, '' );
              wishlist_count = parseInt( wishlist_count ) + 1;
              if ( -1 !== $wishlist.html().indexOf( '(' ) ) {
                wishlist_count = '(' + wishlist_count + ')';
              }
              $wishlist.html( wishlist_count );
              if ( $wishlist.closest( '.shop-icons' ).length ) {
                self.countUpdatedAnimate( $wishlist );
              }
            }
          )
        }
      )
      $( 'body' ).on(
        'removed_from_wishlist',
        function () {
          $( '.wishlist-count' ).each(
            function () {
              var $wishlist = $( this ),
                wishlist_count = $( this ).html();
              wishlist_count = wishlist_count.replace( /[^0-9]/, '' );
              wishlist_count = parseInt( wishlist_count ) - 1;
              if ( -1 !== $wishlist.html().indexOf( '(' ) ) {
                wishlist_count = '(' + wishlist_count + ')';
              }
              $wishlist.html( wishlist_count );
              if ( $wishlist.closest( '.shop-icons' ).length ) {
                self.countUpdatedAnimate( $wishlist );
              }
            }
          )
        }
      )
      $( 'body' ).on(
        'added_to_cart',
        function ( e, fragments, cart_hash, $button ) {
          if ( $button.closest( '#yith-wcwl-form' ).length ) {
            $( '.wishlist-count' ).each(
              function () {
                var $wishlist = $( this ),
                  wishlist_count = $( this ).html();
                wishlist_count = wishlist_count.replace( /[^0-9]/, '' );
                wishlist_count = parseInt( wishlist_count ) - 1;
                if ( -1 !== $wishlist.html().indexOf( '(' ) ) {
                  wishlist_count = '(' + wishlist_count + ')';
                }
                $wishlist.html( wishlist_count );
                if ( $wishlist.closest( '.shop-icons' ).length ) {
                  self.countUpdatedAnimate( $wishlist );
                }
              }
            )
          }
          if ( $( '.cart-popup.cart-canvas' ).length && $( '.cart-popup' ).hasClass( 'after-added-product' ) ) {
            $( 'body' ).addClass( 'canvas-active' );
          }
        }
      )
      $( 'body' ).on(
        'added_to_cart removed_from_cart',
        function ( e ) {
          if ( $( '.cart-canvas' ).length ) {
            self.quantityInputs( $( '.cart-canvas' ).find( 'input[type="number"]' ) );
          }
          self.countUpdatedAnimate( $( '.cart-count' ) );
          self.calcCartListHeight();
        }
      )
    },
    countUpdatedAnimate: function ( $obj ) {
      if ( $obj && $obj.length ) {
        $obj.addClass( 'updated-count' );
        setTimeout(
          function () {
            $obj.removeClass( 'updated-count' );
          },
          1000
        );
      }
    },
    calcCartListHeight: function () {
      var $cart_list = $( '.widget_shopping_cart_content .cart_list' ),
        $cart_items = $cart_list.children(),
        cart_cnt = $cart_items.length;
      if ( !$cart_list.find( '.cart-popup' ).hasClass( 'dropdown-menu' ) ) {
        return;
      }
      if ( cart_cnt >= 3 ) {
        if ( cart_cnt > 3 ) {
          $cart_list.addClass( 'scrollable' );
        }

        var height = 0;
        for ( var i = 1; i < 4; i++ ) {
          height += $( '.widget_shopping_cart_content .cart_list li:nth-child(' + i + ')' ).outerHeight();
        }
        var style = '.cart_list{' + 'max-height:' + height + 'px;}';
        if ( $( '#cart-popup-height' ).length ) {
          $( '#cart-popup-height' ).text( style );
        } else {
          $( '.cart-popup' ).append( '<style id="cart-popup-height" type="text/css">' + style + "</style>" );
        }

      } else {
        $( '#cart-popup-height' ).remove();
        $cart_list.removeClass( 'scrollable' );
      }
    },
    cartCanvasToggle: function () {
      $( 'body' ).on( 'click', '.canvas-close', function ( e ) {
        e.preventDefault();
        $( 'body' ).removeClass( 'canvas-active' );
      } )
      $( 'body' ).on( 'click', '.canvas-overlay', function ( e ) {
        $( 'body' ).removeClass( 'canvas-active' );
      } )
      if ( $( '.cart-popup.cart-canvas' ).length && $( '.cart-popup' ).hasClass( 'cart-link-click' ) ) {
        $( 'body' ).on( 'click', '.cart-dropdown .dropdown-toggle', function ( e ) {
          e.preventDefault();
          $( 'body' ).addClass( 'canvas-active' );
        } )
      }
    },
    parallaxCtrl: function ( $wrap ) {
      if ( typeof $wrap == 'undefined' ) {
        $wrap = $( 'body' );
      }
      $wrap.find( '.parallax-container' ).each(
        function () {
          var scroll = $( window ).scrollTop() + 100,
            target = $( this ).offset().top;
          var $wrap = $( this ).find( '.parallax-wrap' );
          var img_url = $( this ).data( 'plx-img' ),
            img_repeat = $( this ).data( 'plx-img-repeat' ),
            img_pos = $( this ).data( 'plx-img-pos' ) ? $( this ).data( 'plx-img-pos' ) : 'center',
            img_att = $( this ).data( 'plx-img-att' ),
            img_size = $( this ).data( 'plx-size' ) ? $( this ).data( 'plx-size' ) : 'cover',
            back_color = $( this ).data( 'plx-color' ),
            lazyload = $( this ).data( 'lazyload' ),
            speed = 10,
            offset = 0;
          if ( $( this ).attr( 'data-plx-speed' ) ) {
            speed = $( this ).attr( 'data-plx-speed' ) * 2;
          }

          if ( !$wrap.length ) {
            $( this ).prepend( '<div class="parallax-wrap"></div>' );
            $wrap = $( this ).find( '.parallax-wrap' );
            if ( img_url ) {
              var url = "url('" + img_url + "')";
              if ( typeof lazyload != 'undefined' && ( !$( this ).closest( '.customize-preview' ).length ) ) {
                $wrap.addClass( 'molla-lazyload-back' );
                $wrap.data( 'background-src', url );
              } else {
                $wrap.css( 'background-image', url );
              }
              if ( img_repeat ) {
                $wrap.css( 'background-repeat', img_repeat );
              }
              if ( img_pos ) {
                $wrap.css( 'background-position', img_pos );
              }
              if ( img_att ) {
                $wrap.css( 'background-attachment', img_att );
              }
              if ( back_color ) {
                $wrap.css( 'background-color', back_color );
              }
              if ( img_size ) {
                $wrap.css( 'background-size', img_size );
              }
            }
            $wrap.attr( 'data-src', img_url );
          }
          offset = ( $wrap.height() - $wrap.parent().height() ) / 2;
          var yPos = -( scroll - target ) / speed,
            plxPos = ( yPos < 0 ) ? Math.abs( yPos ) : -Math.abs( yPos );
          $wrap.css( 'transform', 'translate3d(0, ' + ( ( plxPos - offset ) ) + 'px, 0)' );
          $wrap.css( '-webkit-transform', 'translate3d(0, ' + ( ( plxPos - offset ) ) + 'px, 0)' );
        }
      )
      $wrap.find( '.section-parallax' ).each( function () {

        if ( $( window ).scrollTop() < $( this ).offset().top ) {
          $( this ).find( '.section-parallax-inner' ).css( 'transform', '' );
          return;
        }

        var $inner = $( this ).find( '.section-parallax-inner' ),
          scroll = $( window ).scrollTop(),
          target = $( this ).offset().top;
        var speed = 10,
          offset = 0;

        if ( $( this ).attr( 'data-plx-speed' ) ) {
          speed = $( this ).attr( 'data-plx-speed' );
        }

        var yPos = -( scroll - target ) / speed,
          plxPos = ( yPos < 0 ) ? Math.abs( yPos ) : -Math.abs( yPos );
        $inner.css( 'transform', 'translateY(' + plxPos + 'px)' );
        $inner.css( '-webkit-transform', 'translateY(' + plxPos + 'px)' );
      }
      )
    },
    tabCtrl: function () {
      $( 'body' ).on(
        'click',
        '.nav-link',
        function ( e ) {
          if ( $( this ).closest( '.accordion' ).length ) {
            return;
          }
          if ( typeof $( this ).attr( 'data-target' ) == 'undefined' ) {
            var target = $( this ).attr( 'href' );
          } else {
            var target = $( this ).attr( 'data-target' );
          }
          $( this ).parent().addClass( 'active' );
          $( this ).parent().siblings().removeClass( 'active' );
          $( '[data-id="' + target + '"], ' + target ).siblings( '.tab-pane' ).removeClass( 'active show' );
          $( '[data-id="' + target + '"], ' + target ).addClass( 'active show' );
          $( window ).trigger( 'scroll' );
          e.preventDefault();
        }
      )
    },
    floatingElements: function ( $wrap ) {
      if ( $.fn.parallax ) {

        if ( typeof $wrap == 'undefined' ) {
          $wrap = $( 'body' );
        }
        $wrap.find( '[data-toggle="floating"]' ).each( function ( e ) {
          var $this = $( this );
          if ( $this.data( 'parallax' ) ) {
            $this.parallax( 'disable' );
            $this.removeData( 'parallax' );
            $this.removeData( 'options' );
          }
          $this.children( 'figure, .elementor-widget-container' ).addClass( 'layer' ).attr( 'data-depth', $this.attr( 'data-child-depth' ) );
          $this.parallax( $this.data( 'options' ) );
        } );
      }
    },
    singleProductAccordion: function ( $wrap ) {
      if ( undefined == $wrap || !$wrap.closest( '.product' ).length ) {
        return;
      }
      if ( $wrap.offset().top - 100 < $( window ).scrollTop() ) {
        var scrolloffset = $wrap.offset().top - sticky_header_height - $wrap.siblings( '.card-header' ).outerHeight() - 40;
        $( 'html, body' ).animate(
          {
            'scrollTop': scrolloffset
          },
          400
        );
      }
    },
    productSelect: function () {

      $( '.variations .nav-thumbs ~ .select-custom' ).hide();

      $( 'body' ).on(
        'click',
        '.variations .nav-thumb',
        function ( e ) {

          var $select = $( this ).parent().siblings( '.select-custom' ).find( 'select' );

          $( this ).siblings().removeClass( 'active' );

          if ( $( this ).hasClass( 'active' ) ) {
            $( this ).removeClass( 'active' );
          } else {
            $( this ).addClass( 'active' );
          }

          $select.children().prop( 'selected', false );
          $select.val( '' );

          if ( $( this ).hasClass( 'active' ) ) {
            $select.children().prop( 'selected', false );
            $select.children( '[value="' + $( this ).attr( 'name' ) + '"]' ).prop( 'selected', true );
            $select.val( $( this ).attr( 'name' ) );
          }
          $select.change();

          e.preventDefault();
        }
      );

      $( 'body' ).on(
        'click',
        '.variations .reset_variations',
        function () {
          $( this ).closest( '.variations' ).find( '.active' ).removeClass( 'active' );
          var $thumbs = $( '.thumbnails-outer' );
          if ( $thumbs.length ) {
            $thumbs.find( '.active' ).trigger( 'click' );
          }
        }
      )
    },
    productOrder: function () {
      $( 'body' ).on(
        'click',
        '.ordering-list a',
        function ( e ) {
          var $parent = $( this ).parent(),
            $select = $( this ).closest( '.ordering-list' ).siblings( '.select-custom' ).find( 'select' );

          $parent.siblings().removeClass( 'chosen' );

          if ( $parent.hasClass( 'chosen' ) ) {
            $parent.removeClass( 'chosen' );
          } else {
            $parent.addClass( 'chosen' );
          }

          $select.children().prop( 'selected', false );
          $select.val( '' );

          if ( $parent.hasClass( 'chosen' ) ) {
            $select.children().prop( 'selected', false );
            $select.children( '[value="' + $( this ).data( 'ordering' ) + '"]' ).prop( 'selected', true );
            $select.val( $( this ).data( 'ordering' ) );
          }
          $select.closest( 'form' ).submit();
          e.preventDefault();
        }
      );
    },
    preOrder: function () {
      // pre-order
      if ( theme.pre_order ) {
        var molla_pre_order = {
          init: function () {
            this.$add_to_cart_btn = $( '.product-intro .single_add_to_cart_button' );
            this.add_to_cart_label = this.$add_to_cart_btn.html();

            $( document ).on(
              'found_variation',
              '.variations_form',
              function ( e, args ) {
                if ( args.molla_pre_order ) {
                  molla_pre_order.$add_to_cart_btn.html( args.molla_pre_order_label );
                  if ( args.molla_pre_order_date ) {
                    $( this ).find( '.woocommerce-variation-description' ).append( args.molla_pre_order_date );
                  }
                } else {
                  molla_pre_order.$add_to_cart_btn.html( molla_pre_order.add_to_cart_label );
                }
              }
            ).on(
              'reset_data',
              function () {
                molla_pre_order.$add_to_cart_btn.html( molla_pre_order.add_to_cart_label );
              }
            );
          }
        };
        if ( $( '.skeleton-body' ).length ) {
          // If skeleton loading is enabled
          $( document ).on(
            'molla_skeleton_loaded',
            function ( e, $skeleton_obj ) {
              molla_pre_order.init();
            }
          );
        } else {
          // Init pre-order
          molla_pre_order.init();
        }
      }
    },
    progressInit: function ( $selector ) {
      if ( typeof $selector == 'undefined' ) {
        $selector = $( 'body' );
      }
      $selector.find( '[data-toggle="progress"]' ).each( function () {
        if ( $.fn.appear ) {
          $( this ).appear( function () {
            $( this ).find( '.progress-size' ).animate( { width: $( this ).data( 'width' ) + '%' }, 500 );
          } )
        }
      } );
    },
    singleProduct: function ( $selector ) {
      // Load bootstrap-input-spinner.js file
      var defer_input_spinner = ( function () {
        var deferred = $.Deferred();
        if ( $.fn.inputSpinner ) {
          deferred.resolve();
        } else {
          $( document.createElement( 'script' ) ).attr( 'id', 'bootstrap-input-spinner' ).appendTo( 'body' ).on(
            'load',
            function () {
              deferred.resolve();
            }
          ).attr( 'src', theme.assets_url + 'js/bootstrap-input-spinner.js' );
        }
        return deferred.promise();
      } )();
      // Load owl.carousel.min.js file
      var defer_carousel = ( function () {
        var deferred = $.Deferred();
        if ( $.fn.owlCarousel ) {
          deferred.resolve();
        } else {
          $( document.createElement( 'script' ) ).attr( 'id', 'owl-carousel' ).appendTo( 'body' ).on(
            'load',
            function () {
              deferred.resolve();
            }
          ).attr( 'src', theme.assets_url + 'js/plugins/owl.carousel.min.js' );
        }
        return deferred.promise();
      } )();
      // // Load jquery.elevateZoom.min.js file
      // var defer_elevate = (function () {
      //  var deferred = $.Deferred();
      //  if ($.fn.elevateZoom) {
      //    deferred.resolve();
      //  } else {
      //    $(document.createElement('script')).attr('id', 'jquery-elevateZoom').appendTo('body').on(
      //      'load',
      //      function () {
      //        deferred.resolve();
      //      }
      //    ).attr('src', theme.assets_url + 'js/plugins/jquery.elevatezoom.min.js');
      //  }
      //  return deferred.promise();
      // })();
      // Load WooCommerce/single-product.min.js file
      // var defer_wc_single = (function () {
      //  var deferred = $.Deferred();
      //  if ($.fn.wc_product_gallery) {
      //    deferred.resolve();
      //  } else {
      //    if ('' == theme.wc_url) {
      //      console.log('Woocommerce plugin is not installed.');
      //    } else {
      //      $(document.createElement('script')).attr('id', 'wc-single-product').appendTo('body').on(
      //        'load',
      //        function () {
      //          deferred.resolve();
      //        }
      //      ).attr('src', theme.wc_url + 'js/frontend/single-product.js');
      //    }
      //  }
      //  return deferred.promise();
      // })();
      // // Load Wordpress/underscore.min.js file ( for add-to-cart-variation.min.js )
      // var defer_wp_util = (function () {
      //  var deferred = $.Deferred();
      //  if (!$selector.hasClass('product-type-variable') || typeof wp.template != 'undefined') {
      //    deferred.resolve();
      //  } else {
      //    $(document.createElement('script')).attr('id', 'underscore').appendTo('body').on(
      //      'load',
      //      function () {
      //        deferred.resolve();
      //      }
      //    ).attr('src', theme.ajax_url.replace('wp-admin/admin-ajax.php', 'wp-includes/js/underscore.min.js'));
      //  }
      //  return deferred.promise();
      // })();
      // // Load Wordpress/wp-util.min.js file ( for add-to-cart-variation.min.js )
      // var defer_wp_util = (function () {
      //  var deferred = $.Deferred();
      //  if (!$selector.hasClass('product-type-variable') || typeof wp.template != 'undefined') {
      //    deferred.resolve();
      //  } else {
      //    $(document.createElement('script')).attr('id', 'wp-util').appendTo('body').on(
      //      'load',
      //      function () {
      //        deferred.resolve();
      //      }
      //    ).attr('src', theme.ajax_url.replace('wp-admin/admin-ajax.php', 'wp-includes/js/wp-util.min.js'));
      //  }
      //  return deferred.promise();
      // })();
      // Load WooCommerce/add-to-cart-variation.min.js file
      var defer_wc_variation = ( function () {
        var deferred = $.Deferred();
        if ( !$selector.hasClass( 'product-type-variable' ) || $.fn.wc_variation_form ) {
          deferred.resolve();
        } else {
          if ( '' == theme.wc_url ) {
            console.log( 'Woocommerce plugin is not installed.' );
          } else {
            $( document.createElement( 'script' ) ).attr( 'id', 'wc-add-to-cart-variation' ).appendTo( 'body' ).on(
              'load',
              function () {
                deferred.resolve();
              }
            ).attr( 'src', theme.wc_url + 'js/frontend/add-to-cart-variation.min.js' );
          }
        }
        return deferred.promise();
      } )();
      $.when( defer_input_spinner, defer_carousel, defer_wc_variation ).done(
        function ( e ) {
          self.quantityInputs( $selector.find( "input[type='number']" ) );
          self.countDown( $selector );
          self.owlCarousels( $selector.parent() );
          self.progressInit( $selector );
          self.thumbResponsiveCtrl();
          //self.elevateZoomElement($selector.find('.product-gallery-carousel img').parent());
          // self.requestTimeout(
          //  function () {
          //    self.thumbnailSlide($selector);
          //  },
          //  100
          // );
          self.productSingle( $selector );

          if ( !$selector.parent().hasClass( 'quickView-content' ) ) {
            //    self.elevateZoomCtrl($selector);
            self.productImageZoom();
          }

          if ( typeof wc_single_product_params != 'undefined' ) {
            // if ($.fn.wc_product_gallery) {
            //  $('.woocommerce-product-gallery').wc_product_gallery(wc_single_product_params);
            // }

            var form_variation = $selector.find( 'form.variations_form' );
            if ( form_variation.length ) {
              form_variation.each(
                function () {
                  var ev = $._data( $( this )[ 0 ], 'events' );
                  if ( undefined == ev || undefined == ev.check_variations ) {
                    $( this ).wc_variation_form();
                  }
                }
              );
            }
          }
          if ( $selector.parent().hasClass( 'quickView-content' ) ) {
            $( document.body ).on(
              'click',
              '.quickView-content .single_add_to_cart_button:not(.disabled)',
              function ( e ) {
                if ( $( this ).closest( '.product' ).hasClass( 'product-type-external' ) || $( this ).closest( '.single-product' ).hasClass( 'product-type-grouped' ) ) {
                  return true;
                }

                e.preventDefault();

                var $button = $( this ),
                  $form = $button.closest( 'form' ),
                  product_id = $button.val(),
                  variation_id = $form.find( 'input[name="variation_id"]' ).val(),
                  quantity = $form.find( 'input[name="quantity"]' ).val();
                if ( $form.hasClass( 'molla-loading' ) ) {
                  return false;
                }
                $button.removeClass( 'added' );
                $form.addClass( 'molla-loading' );

                var data = {
                  product_id: variation_id ? variation_id : product_id,
                  quantity: quantity
                };

                // Trigger event.
                $( document.body ).trigger( 'adding_to_cart', [ $button, data ] );

                $.ajax(
                  {
                    type: 'POST',
                    url: wc_add_to_cart_params.wc_ajax_url.toString().replace( '%%endpoint%%', 'add_to_cart' ),
                    data: data,
                    dataType: 'json',
                    success: function ( response ) {
                      $form.removeClass( 'molla-loading' );
                      if ( !response ) {
                        return;
                      }
                      if ( response.error && response.product_url ) {
                        window.location = response.product_url;
                        return;
                      }
                      // Redirect to cart option
                      if ( wc_add_to_cart_params.cart_redirect_after_add === 'yes' ) {
                        window.location = wc_add_to_cart_params.cart_url;
                        return;
                      }

                      // Trigger event.
                      $( document.body ).trigger( 'added_to_cart', [ response.fragments, response.cart_hash, $button ] );
                    }
                  }
                );
              }
            )
          }
        }
      );
    },
    loadResizeAfter: function () {
      self.calcDesktopWidth();
      self.fullWidthControl();
      self.thumbResponsiveCtrl();
      // self.requestTimeout(
      //  function () {
      //    self.thumbnailSlide();
      //  },
      //  300
      // );
      //  self.elevateZoomCtrl();
      self.elAdvancedMotions();
      //Molla.productSingle('.product-intro');

      // Reorder isotope items.
      var $grids = $( '[data-toggle="isotope"]' );
      $grids.each(
        function ( e ) {
          if ( !$( this ).attr( 'data-creative-breaks' ) || $( this ).hasClass( 'float-grid' ) ) {
            return;
          }

          $( this ).children( '.grid-item' ).css( { 'animation-fill-mode': 'none', '-webkit-animation-fill-mode': 'none' } );

          var width = $( window ).width() + self.getScrollbarWidth(),
            breaks = JSON.parse( $( this ).attr( 'data-creative-breaks' ) ),
            cur_break = $( this ).attr( 'data-current-break' ),
            $item;

          if ( width >= breaks[ 'lg' ] ) {
            width = '';
          } else if ( width >= breaks[ 'md' ] && width < breaks[ 'lg' ] ) {
            width = 'lg';
          } else if ( width < breaks[ 'md' ] ) {
            width = 'md';
          }

          if ( width == cur_break ) {
            return;
          }

          if ( $( this ).data( 'isotope' ) ) {
            $( this ).isotope(
              {
                sortBy: 'order' + ( width ? '_' + width : '' ),
              }
            );
            $( this ).isotope( 'layout' );
          } else {
            var options = $( this ).attr( 'data-isotope-options' );
            if ( undefined == options ) {
              options = [];
              options[ 'sortBy' ] = 'order' + ( width ? '_' + width : '' );
            } else {
              options = JSON.parse( options );
              options[ 'sortBy' ] = 'order' + ( width ? '_' + width : '' );
            }
            $( this ).attr( 'data-isotope-options', JSON.stringify( options ) );

            self.layoutInit( $( this ) );
          }
          $( this ).attr( 'data-current-break', width );
        }
      )
      self.calcMegamenuPosition();
    },
    windowEvents: function () {
      $( window ).on(
        'scroll',
        function () {
          self.parallaxCtrl();
        }
      )
      $( window ).on(
        'scroll resize',
        function () {
          self.add_to_cart_sticky();
        }
      )
      $( window ).on(
        'resize',
        function () {
          self.loadResizeAfter();
        }
      )

      // Product Data Accordion
      var hash = window.location.hash;
      if ( ( hash === '#reviews' || hash === '#tab-reviews' ) ) {
        if ( $( '#tab-reviews' ).length && $( '#tab-reviews' ).closest( '.accordion' ).length ) {
          $( '#tab-reviews' ).collapse( 'show' );
          self.scrollToAnimate( $( '#tab-reviews' ) );
        }
      }
      // Product Data Tab
      var $review_link = $( '.reviews_tab' );
      if ( $review_link.length && $review_link.hasClass( 'active' ) ) {
        $review_link.click();
      }

      if ( $( '.sidebar-toggle .molla-lazyload' ).length || $( '.sidebar-toggle .molla-lazyload-back' ).length ) {
        $( '.sidebar-toggle' ).scroll(
          function () {
            $( window ).trigger( 'scroll' );
          }
        );
      }
      self.calcCartListHeight();

      $( window ).on(
        'scroll resize',
        function () {
          self.stickySidebarInit();
        }
      )
    },
    singleInit: function ( $selector ) {

      self.singleProduct( $selector );

      //  Molla.productSingle($selector.find('.product-intro'));
      $( '.wc-tabs-wrapper, .woocommerce-tabs' ).trigger( 'init' );
      if ( !$( '.comment-form' ).find( '.stars' ).length ) {
        $( '#rating' ).trigger( 'init' );
      }

      // var form_variation = $selector.find('form.variations_form');
      // if (form_variation.length) {
      //  form_variation.each(
      //    function () {
      //      var ev = $._data($(this)[0], 'events');
      //      if (undefined == ev || undefined == ev.check_variations) {
      //        $(this).wc_variation_form();
      //      }
      //    }
      //  );
      // }
    },
    elAdvancedMotions: function ( $wrap, action ) {

      if ( typeof skrollr == 'undefined' ) {
        return;
      }

      if ( typeof target == 'undefined' ) {
        $wrap = $( 'body' );
      }

      if ( action == 'destroy' && typeof skrollr.get != "undefined" && typeof skrollr_id.destroy == 'function' ) {
        skrollr.get().destroy();
        return;
      }

      if ( $( window ).width() < desktop_width ) {
        return;
      }

      $wrap.find( '.molla-motion-effect-widget' ).each( function () {
        var $this = $( this );

        if ( $( this ).hasClass( 'molla-scroll-effect-widget' ) ) {

          var motions = JSON.parse( $( this ).attr( 'data-molla-scroll-effect-settings' ) );

          var transforms = {};

          for ( var key in motions ) {
            var start = '', end = '';
            if ( key == 'Vertical' ) {
              if ( motions[ key ].direction == 'up' ) {
                start = motions[ key ].speed + 'vh';
                end = -motions[ key ].speed + 'vh';
              } else {
                start = -motions[ key ].speed + 'vh';
                end = motions[ key ].speed + 'vh';
              }
              transforms.translateY = [ start, end ];
            } else if ( key == 'Horizontal' ) {
              if ( motions[ key ].direction == 'left' ) {
                start = motions[ key ].speed + 'vw';
                end = -motions[ key ].speed + 'vw';
              } else {
                start = -motions[ key ].speed + 'vw';
                end = motions[ key ].speed + 'vw';
              }
              transforms.translateX = [ start, end ];
            } else if ( key == 'Transparency' ) {
              if ( motions[ key ].direction == 'in' ) {
                start = ( 10 - motions[ key ].speed ) * 10 + '%';
                end = '100%';
              } else {
                start = motions[ key ].speed + '%';
                end = '0%';
              }
              transforms.opacity = [ start, end ];
            } else if ( key == 'Rotate' ) {
              if ( motions[ key ].direction == 'left' ) {
                start = 0 + 'deg';
                end = -motions[ key ].speed * 36 + 'deg';
              } else {
                start = 0 + 'deg';
                end = motions[ key ].speed * 36 + 'deg';
              }
              transforms.rotate = [ start, end ];
            } else if ( key == 'Scale' ) {
              if ( motions[ key ].direction == 'in' ) {
                start = 1 - motions[ key ].speed / 10;
                end = 1;
              } else {
                start = 1 + motions[ key ].speed / 10;
                end = 1;
              }
              transforms.scale = [ start, end ];
            }
          }
          var bottom_top = '', bottom_top_opacity = '',
            top_bottom = '', top_bottom_opacity = '',
            center = '', center_opacity = '',
            center_top = '', center_top_opacity = '',
            center_bottom = '', center_bottom_opacity = '';

          if ( typeof transforms.translateY != 'undefined' && typeof transforms.translateX != 'undefined'
            && transforms.translateY[ 2 ] == transforms.translateX[ 2 ] ) {
            transforms.translate = [ transforms.translateX[ 0 ] + ',' + transforms.translateY[ 0 ], transforms.translateX[ 1 ] + ',' + transforms.translateY[ 1 ], transforms.translateY[ 2 ] ];
            delete transforms.translateX;
            delete transforms.translateY;
          }

          for ( var transform in transforms ) {
            if ( motions.viewport == 'centered' ) {
              if ( transform == 'opacity' ) {
                bottom_top_opacity += 'opacity:' + transforms[ transform ][ 0 ] + ';';
                center_opacity += 'opacity:' + transforms[ transform ][ 1 ] + ';';
              } else {
                if ( bottom_top ) {
                  bottom_top += ' ' + transform + '(' + transforms[ transform ][ 0 ] + ')';
                } else {
                  bottom_top += transform + '(' + transforms[ transform ][ 0 ] + ')';
                }
                if ( center ) {
                  center += ' ' + transform + '(' + transforms[ transform ][ 1 ] + ')';
                } else {
                  center += transform + '(' + transforms[ transform ][ 1 ] + ')';
                }
              }
            } else if ( motions.viewport == 'top_bottom' ) {
              if ( transform == 'opacity' ) {
                bottom_top_opacity += 'opacity:' + transforms[ transform ][ 0 ] + ';';
                top_bottom_opacity += 'opacity:' + transforms[ transform ][ 1 ] + ';';
              } else {
                if ( bottom_top ) {
                  bottom_top += ' ' + transform + '(' + transforms[ transform ][ 0 ] + ')';
                } else {
                  bottom_top += transform + '(' + transforms[ transform ][ 0 ] + ')';
                }
                if ( top_bottom ) {
                  top_bottom += ' ' + transform + '(' + transforms[ transform ][ 1 ] + ')';
                } else {
                  top_bottom += transform + '(' + transforms[ transform ][ 1 ] + ')';
                }
              }
            } else if ( motions.viewport == 'center_top' ) {
              if ( transform == 'opacity' ) {
                bottom_top_opacity += 'opacity:' + transforms[ transform ][ 0 ] + ';';
                center_top_opacity += 'opacity:' + transforms[ transform ][ 1 ] + ';';
              } else {
                if ( bottom_top ) {
                  bottom_top += ' ' + transform + '(' + transforms[ transform ][ 0 ] + ')';
                } else {
                  bottom_top += transform + '(' + transforms[ transform ][ 0 ] + ')';
                }
                if ( center_top ) {
                  center_top += ' ' + transform + '(' + transforms[ transform ][ 1 ] + ')';
                } else {
                  center_top += transform + '(' + transforms[ transform ][ 1 ] + ')';
                }
              }
            } else if ( motions.viewport == 'center_bottom' ) {
              if ( transform == 'opacity' ) {
                bottom_top_opacity += 'opacity:' + transforms[ transform ][ 0 ] + ';';
                center_bottom_opacity += 'opacity:' + transforms[ transform ][ 1 ] + ';';
              } else {
                if ( bottom_top ) {
                  bottom_top += ' ' + transform + '(' + transforms[ transform ][ 0 ] + ')';
                } else {
                  bottom_top += transform + '(' + transforms[ transform ][ 0 ] + ')';
                }
                if ( center_bottom ) {
                  center_bottom += ' ' + transform + '(' + transforms[ transform ][ 1 ] + ')';
                } else {
                  center_bottom += transform + '(' + transforms[ transform ][ 1 ] + ')';
                }
              }
            }
          }

          bottom_top = bottom_top ? ( 'transform: ' + bottom_top + ';' + bottom_top_opacity ) : bottom_top_opacity;
          top_bottom = top_bottom ? ( 'transform: ' + top_bottom + ';' + top_bottom_opacity ) : top_bottom_opacity;
          center = center ? ( 'transform: ' + center + ';' + center_opacity ) : center_opacity;
          center_top = center_top ? ( 'transform: ' + center_top + ';' + center_top_opacity ) : center_top_opacity;
          center_bottom = center_bottom ? ( 'transform: ' + center_bottom + ';' + center_bottom_opacity ) : center_bottom_opacity;

          if ( $this.hasClass( 'elementor-element' ) ) {
            $this = $this.children( '.elementor-widget-container' );
          }

          bottom_top && $this.attr( 'data-bottom-top', bottom_top );
          top_bottom && $this.attr( 'data-top-bottom', top_bottom );
          center && $this.attr( 'data-center', center );
          center_top && $this.attr( 'data-center-top', center_top );
          center_bottom && $this.attr( 'data-center-bottom', center_bottom );
        }
      } )

      if ( typeof skrollr.init != 'function' ) {
        return;
      }

      if ( $wrap.find( '.molla-motion-effect-widget' ).length ) {
        skrollr_id = skrollr.init( { forceHeight: false } );
      }
    }
  };

  /**
   * Open magnific popup
   *
   * @since 1.0
   * @param {Object} options
   * @param {string} preset
   * @return {void}
   */
  Molla.popup = function ( options, preset ) {
    var mpInstance = $.magnificPopup.instance;
    // if something is already opened, retry after 5seconds
    if ( mpInstance.isOpen ) {
      if ( mpInstance.content ) {
        setTimeout( function () {
          Molla.popup( options, preset );
        }, 5000 );
      } else {
        $.magnificPopup.close();
      }
    } else {
      // if nothing is opened, open new
      $.magnificPopup.open(
        $.extend( true, {},
          preset ? preset : {},
          options
        )
      );
    }
  }

  /**
   * Get jQuery object
   * 
   * @since 1.0
   * @param {string|jQuery} selector  Selector to find
   * @param {string|jQuery} find    Find from selector root
   * @return {jQuery|Object}      jQuery Object or {each: $.noop}
   */
  Molla.$ = function ( selector, find ) {
    if ( typeof selector == 'string' && typeof find == 'string' ) {
      return $( selector + ' ' + find );
    }
    if ( selector instanceof jQuery ) {
      if ( selector.is( find ) ) {
        return selector;
      }
      if ( typeof find == 'undefined' ) {
        return selector;
      }
      return selector.find( find );
    }
    if ( typeof selector == 'undefined' || !selector ) {
      return $( find );
    }
    if ( typeof find == 'undefined' ) {
      return $( selector );
    }
    return $( selector ).find( find );
  }

  $( document ).on(
    'found_variation',
    'variations_form',
    function ( e ) {
      //  console.trace();
      // self.zoom($wc_gallery.find('.product-attr-image, .zoomImg'));
      // if ($gallery_carousel.length) {
      //  $gallery_carousel.trigger('to.owl.carousel', [0, 300, true]);
      // }
    }
  )

  if ( $( '.skeleton-body' ).length ) {
    $( document ).on( 'molla_skeleton_loaded', function () {
      Molla.init();

      if ( $( document.body ).hasClass( 'single-product' ) && typeof wc_single_product_params != 'undefined' ) {
        var form_variation = $( 'form.variations_form' );
        if ( form_variation.length ) {
          form_variation.each(
            function () {
              var ev = $._data( this, 'events' );
              if ( undefined == ev || undefined == ev.check_variations ) {
                $( this ).wc_variation_form();
              }
            }
          );
        }
      }
    } )
  } else {
    jQuery( document ).ready(
      function ( $ ) {
        'use strict';
        if ( location.search && location.search.indexOf( 'elementor-preview=' ) > 0 ) {
          setTimeout( function () {
            Molla.init();
          }, 3000 );
        } else {
          Molla.init();
        }
      }
    );
  }


  // Load Event
  $( window ).on(
    'load',
    function () {
      $( 'body' ).addClass( "loaded" );
    }
  );

  // $(document).on(
  //  'found_variation',
  //  '.variations_form',
  //  function (e, args) {

  //  }
  // )

  $( document ).on(
    'found_variation reset_data',
    '.variations_form',
    function ( e, args ) {
      $( '.variations .select-custom' ).each(
        function () {
          var $select = $( this );

          $( this ).parent().find( '.nav-thumb' ).each(
            function () {
              $( this ).prop( 'disabled', false );
              if ( 0 == $select.find( '[value="' + $( this ).attr( 'name' ) + '"]' ).length ) {
                $( this ).prop( 'disabled', true ).removeClass( 'active' );
              }
            }
          )
        }
      )
    }
  );

  $( document ).on(
    'yith-wcan-ajax-filtered',
    function ( e, res ) {
      self.quantityInputs();
      // Ajax Load More Compatibility
      var more_container = $( res ).find( yith_wcan.container ).siblings( '.more-container' )[ 0 ];
      $( '.yit-wcan-container' ).siblings( '.more-container' ).remove();
      $( '.yit-wcan-container' ).after( $( more_container ) );
      // Pagination Compatibility
      var pagination = $( res ).find( yith_wcan.container ).siblings( '.pagination' )[ 0 ];
      $( '.yit-wcan-container' ).siblings( '.pagination' ).remove();
      $( '.yit-wcan-container' ).after( $( pagination ) );

      // Isotope refresh
      if ( $( '.yit-wcan-container' ).children( '.products' ).hasClass( 'grid' ) && $( '.toolbox .product-filter' ).length ) {
        Molla.isotopeFilter( $( '.toolbox .nav-filter' ), $( '.yit-wcan-container .grid' ) );
      }
    }
  )

  $( document ).on( 'yith-wcan-ajax-loading', function ( e ) {
    if ( $( '.yit-wcan-container' ).length ) {
      $( 'html, body' ).animate( {
        'scrollTop': $( '.yit-wcan-container' ).offset().top - $( '.sticky-header.fixed' ).outerHeight() - ( 'undefined' == typeof $( '#wpadminbar' ).outerHeight() ? 0 : $( '#wpadminbar' ).outerHeight() )
      }, 400 );
    }
  } )

  $( document ).on(
    'shown.bs.collapse',
    '.collapse',
    function () {
      $( '.sticky-product .accordion' ).trigger( 'resize' );
      Molla.singleProductAccordion( $( this ) );
    }
  )
} )( jQuery );
