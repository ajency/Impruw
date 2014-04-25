define(['jquery', 'underscore', 'jqueryvalidate'], function($, _) {
  var adjustPageDim;
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
    return this.css({
      position: "fixed",
      top: (($(parent).height() - this.outerHeight()) / 2) + $(parent).scrollTop() + "px",
      left: (($(parent).width() - this.outerWidth()) / 2) + $(parent).scrollLeft() + "px"
    });
  };
  this;
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
  return $(window).resize(adjustPageDim);

  /**** Float Menu Script ****/
  //config
  $float_speed=1500; //milliseconds
  $float_easing="easeOutQuint";
  $menu_fade_speed=500; //milliseconds
  $closed_menu_opacity=0.75;
   
  //cache vars
  $fl_menu = $("#aj-imp-trash-elements");
  $fl_menu_menu = $("#aj-imp-trash-elements .aj-imp-drag-menu");
  $fl_menu_label = $("#aj-imp-trash-elements .trash-label");
   
  $(window).load(function() {
      menuPosition=$('#fl_menu').position().top;
      FloatMenu();
      $fl_menu.hover(
          function(){ //mouse over
              $fl_menu_label.fadeTo($menu_fade_speed, 1);
              $fl_menu_menu.fadeIn($menu_fade_speed);
          },
          function(){ //mouse out
              $fl_menu_label.fadeTo($menu_fade_speed, $closed_menu_opacity);
              $fl_menu_menu.fadeOut($menu_fade_speed);
          }
      );
  });
   
  $(window).scroll(function () {
      FloatMenu();
  });
   
  function FloatMenu(){
      var scrollAmount=$(document).scrollTop();
      var newPosition=menuPosition+scrollAmount;
      if($(window).height()<$fl_menu.height()+$fl_menu_menu.height()){
          $fl_menu.css("top",menuPosition);
      } else {
          $fl_menu.stop().animate({top: newPosition}, $float_speed, $float_easing);
      }
  }
});
