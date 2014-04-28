define(['jquery', 'underscore', 'jqueryvalidate'], function($, _) {
  var $closed_menu_opacity, $fl_menu, $fl_menu_label, $fl_menu_menu, $float_easing, $float_speed, $menu_fade_speed, FloatMenu, adjustPageDim;
  $.fn.isEmptyColumn = function(params) {
    if (params == null) {
      params = {};
    }
    return this.children('.element-wrapper').length === 0;
  };
  $.fn.canBeDeleted = function() {
    var columns, empty;
    columns = this.children('.column');
    empty = true;
    _.each(columns, (function(_this) {
      return function(column, index) {
        if (!$(column).isEmptyColumn()) {
          return empty = false;
        }
      };
    })(this));
    return empty;
  };
  $.validator.setDefaults({
    ignore: [],
    errorElement: 'div',
    errorClass: 'field-error',
    validClass: 'field-valid'
  });
  $.fn.center = function(parent) {
    if (parent) {
      parent = this.parent();
    } else {
      parent = window;
    }
    this.css({
      position: "fixed",
      top: (($(parent).height() - this.outerHeight()) / 2) + $(parent).scrollTop() + "px",
      left: (($(parent).width() - this.outerWidth()) / 2) + $(parent).scrollLeft() + "px"
    });
    return this;
  };
  $.scrollTop = function() {
    return $('html, body').animate({
      scrollTop: 0
    }, 1000);
  };
  $.scrollTo = function(ele) {
    var $ele;
    $ele = $(ele);
    return $('html, body').animate({
      scrollTop: $ele.offset().top
    }, 1000);
  };
  adjustPageDim = _.debounce(function() {
    var height, minHeight;
    height = $(window).height();
    minHeight = height - 40;
    $('.aj-upper-content').css('min-height', minHeight);
    return $('.aj-upper-content').children().css('min-height', minHeight);
  }, 30);
  $(document).ready(function() {
    return adjustPageDim();
  });
  $(window).resize(adjustPageDim);
  FloatMenu = function() {
    var menuPosition, newPosition, scrollAmount;
    menuPosition = $("#fl_menu").position().top;
    scrollAmount = $(document).scrollTop();
    newPosition = menuPosition + scrollAmount;
    if ($(window).height() < $fl_menu.height() + $fl_menu_menu.height()) {
      return $fl_menu.css("top", menuPosition);
    } else {
      return $fl_menu.stop().animate({
        top: newPosition
      }, $float_speed, $float_easing);
    }
  };
  $float_speed = 1500;
  $float_easing = "easeOutQuint";
  $menu_fade_speed = 500;
  $closed_menu_opacity = 0.75;
  $fl_menu = $("#fl_menu");
  $fl_menu_menu = $("#fl_menu .menu");
  $fl_menu_label = $("#fl_menu .label");
  $(window).load(function() {
    var menuPosition;
    menuPosition = $("#fl_menu").position().top;
    FloatMenu();
    return $fl_menu.hover(function() {
      $fl_menu_label.fadeTo($menu_fade_speed, 1);
      return $fl_menu_menu.fadeIn($menu_fade_speed);
    }, function() {
      $fl_menu_label.fadeTo($menu_fade_speed, $closed_menu_opacity);
      return $fl_menu_menu.fadeOut($menu_fade_speed);
    });
  });
  return $(window).scroll(function() {
    return FloatMenu();
  });
});
