define(['jquery', 'underscore', 'jqueryvalidate', 'jqueryuii18n', 'configs/polyglot'], function($, _) {
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
  $.datepicker.setDefaults($.datepicker.regional[WPML_DEFAULT_LANG]);
  $.validator.setDefaults({
    ignore: [],
    errorElement: 'div',
    errorClass: 'field-error',
    validClass: 'field-valid'
  });
  $.extend($.validator.messages, {
    required: _.polyglot.t("This field is required."),
    remote: _.polyglot.t("Please fix this field."),
    email: _.polyglot.t("Please enter a valid email address."),
    url2: _.polyglot.t("Please enter a valid URL."),
    date: _.polyglot.t("Please enter a valid date."),
    dateISO: _.polyglot.t("Please enter a valid date (ISO)."),
    number: _.polyglot.t("Please enter a valid number."),
    digits: _.polyglot.t("Please enter only digits."),
    creditcard: _.polyglot.t("Please enter a valid credit card number."),
    equalTo: _.polyglot.t("Please enter the same value again."),
    maxlength: $.validator.format(_.polyglot.t("Please enter no more than {0} characters.")),
    minlength: $.validator.format(_.polyglot.t("Please enter at least {0} characters.")),
    rangelength: $.validator.format(_.polyglot.t("Please enter a value between {0} and {1} characters long.")),
    range: $.validator.format(_.polyglot.t("Please enter a value between {0} and {1}.")),
    max: $.validator.format(_.polyglot.t("Please enter a value less than or equal to {0}.")),
    min: $.validator.format(_.polyglot.t("Please enter a value greater than or equal to {0}."))
  }, $.validator.addMethod("url2", function(value, element) {
    return this.optional(element) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
  }, $.validator.messages.url));
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
    $(window).on('scroll', (function(_this) {
      return function() {
        return _this.css({
          top: (($(parent).height() - _this.outerHeight()) / 2) + $(parent).scrollTop() + "px"
        });
      };
    })(this));
    return this;
  };
  $.fn.selectSelectableElements = function(elementsToSelect) {
    $(".ui-selected", this).not(elementsToSelect).removeClass("ui-selected");
    return $(elementsToSelect).not(".ui-selected").addClass("ui-selected");
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
  $.fn.removeAllAttr = function() {
    var attrs;
    attrs = ['class', 'tabindex', 'contenteditable', 'id', 'spellcheck', 'role', 'aria-label', 'title', 'aria-describedby', 'style'];
    return _.each(this, function(div) {
      return _.each(attrs, function(attr) {
        return $(div).removeAttr(attr);
      });
    });
  };
  adjustPageDim = _.debounce(function() {
    var height, minHeight, navHeight;
    height = $(window).height();
    navHeight = $('.aj-imp-left').height();
    minHeight = height - 40;
    $('.aj-upper-content').css('min-height', minHeight);
    $('.aj-upper-content').children().css('min-height', minHeight);
    $('.aj-imp-right').css('min-height', navHeight);
    return setTimeout((function() {
      $(window).trigger('resize');
    }), 1000);
  }, 30);
  $(document).ready(function() {
    return adjustPageDim();
  });
  return $(window).resize(adjustPageDim);
});
