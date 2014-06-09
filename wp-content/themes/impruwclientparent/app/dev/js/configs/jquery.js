define(['jquery', 'underscore', 'jqueryvalidate', 'configs/polyglot'], function($, _) {
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
  $.extend($.validator.messages, {
    required: _.polyglot.t("This field is required."),
    remote: _.polyglot.t("Please fix this field."),
    email: _.polyglot.t("Please enter a valid email address."),
    url: _.polyglot.t("Please enter a valid URL."),
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
});
