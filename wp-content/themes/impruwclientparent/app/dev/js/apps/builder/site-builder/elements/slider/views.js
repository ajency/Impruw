var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'holder'], function(App, Holder) {
  return App.module('SiteBuilderApp.Element.Slider.Views', function(Views, App, Backbone, Marionette, $, _) {
    var SliderItem;
    SliderItem = (function(_super) {
      __extends(SliderItem, _super);

      function SliderItem() {
        return SliderItem.__super__.constructor.apply(this, arguments);
      }

      SliderItem.prototype.template = '<img src="{{full_url}}" alt="Slide" data-bgfit="cover" data-bgposition="left top" data-bgrepeat="no-repeat"/>';

      SliderItem.prototype.tagName = 'li';

      SliderItem.prototype.events = {
        'click': function(e) {
          return this.trigger("show:slider:manager");
        }
      };

      SliderItem.prototype.onRender = function() {
        return this.$el.attr('data-transition', 'fade').attr('data-slotamount', '7').attr('data-masterspeed', '1500');
      };

      return SliderItem;

    })(Marionette.ItemView);
    return Views.SliderView = (function(_super) {
      __extends(SliderView, _super);

      function SliderView() {
        return SliderView.__super__.constructor.apply(this, arguments);
      }

      SliderView.prototype.className = 'fullwidthbanner-container roundedcorners';

      SliderView.prototype.template = '<div class="fullwidthbanner"><ul></ul></div>';

      SliderView.prototype.id = _.uniqueId('carousel-');

      SliderView.prototype.itemView = SliderItem;

      SliderView.prototype.itemViewContainer = '.fullwidthbanner > ul';

      SliderView.prototype.onClose = function() {
        return delete this.revapi;
      };

      SliderView.prototype.onShow = function() {
        return this.revapi = this.$el.find(".fullwidthbanner").revolution({
          delay: 9000,
          startwidth: 1170,
          startheight: 500,
          hideThumbs: 10,
          thumbWidth: 100,
          thumbHeight: 50,
          thumbAmount: 5,
          navigationType: "both",
          navigationArrows: "solo",
          navigationStyle: "round",
          touchenabled: "on",
          onHoverStop: "on",
          navigationHAlign: "center",
          navigationVAlign: "bottom",
          navigationHOffset: 0,
          navigationVOffset: 0,
          soloArrowLeftHalign: "left",
          soloArrowLeftValign: "center",
          soloArrowLeftHOffset: 20,
          soloArrowLeftVOffset: 0,
          soloArrowRightHalign: "right",
          soloArrowRightValign: "center",
          soloArrowRightHOffset: 20,
          soloArrowRightVOffset: 0,
          shadow: 0,
          fullWidth: "on",
          fullScreen: "off",
          stopLoop: "off",
          stopAfterLoops: -1,
          stopAtSlide: -1,
          shuffle: "off",
          autoHeight: "off",
          forceFullWidth: "off",
          hideThumbsOnMobile: "off",
          hideBulletsOnMobile: "on",
          hideArrowsOnMobile: "on",
          hideThumbsUnderResolution: 0,
          hideSliderAtLimit: 0,
          hideCaptionAtLimit: 768,
          hideAllCaptionAtLilmit: 0,
          startWithSlide: 0,
          fullScreenOffsetContainer: ""
        });
      };

      return SliderView;

    })(Marionette.CompositeView);
  });
});
