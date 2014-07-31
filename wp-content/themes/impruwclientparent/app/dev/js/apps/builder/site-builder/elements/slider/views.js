var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(['app'], function(App) {
  return App.module('SiteBuilderApp.Element.Slider.Views', function(Views, App, Backbone, Marionette, $, _) {
    var EmptySlider, SliderItem;
    SliderItem = (function(_super) {
      __extends(SliderItem, _super);

      function SliderItem() {
        return SliderItem.__super__.constructor.apply(this, arguments);
      }

      SliderItem.prototype.template = '<img src="{{full_url}}" alt="Slide" data-bgfit="contain" data-bgposition="center center" data-bgrepeat="no-repeat"/>';

      SliderItem.prototype.tagName = 'li';

      SliderItem.prototype.onRender = function() {
        return this.$el.attr('data-transition', 'fade').attr('data-slotamount', '0').attr('data-masterspeed', '500');
      };

      SliderItem.prototype.modelEvents = {
        'change:thumb_url change:full_url': function(model) {
          return model.collection.trigger('slide:image:url:updated');
        }
      };

      return SliderItem;

    })(Marionette.ItemView);
    EmptySlider = (function(_super) {
      __extends(EmptySlider, _super);

      function EmptySlider() {
        return EmptySlider.__super__.constructor.apply(this, arguments);
      }

      EmptySlider.prototype.template = '<div class="empty-view"><span class="bicon icon-uniF119"></span>{{#polyglot}}No images in slider{{/polyglot}}<br> {{#polyglot}}Add images to slider{{/polyglot}}</div>';

      return EmptySlider;

    })(Marionette.ItemView);
    return Views.SliderView = (function(_super) {
      __extends(SliderView, _super);

      function SliderView() {
        this._saveSliderHeightWidth = __bind(this._saveSliderHeightWidth, this);
        return SliderView.__super__.constructor.apply(this, arguments);
      }

      SliderView.prototype.className = 'fullwidthbanner-container roundedcorners';

      SliderView.prototype.template = '<div class="fullwidthbanner"><ul></ul></div>';

      SliderView.prototype.id = _.uniqueId('carousel-');

      SliderView.prototype.itemView = SliderItem;

      SliderView.prototype.emptyView = EmptySlider;

      SliderView.prototype.itemViewContainer = '.fullwidthbanner > ul';

      SliderView.prototype.events = {
        'click': function(e) {
          var ratio;
          ratio = this._getSliderRatio();
          return this.trigger("show:slides:manager", ratio);
        },
        'click .tp-rightarrow,.tp-leftarrow,.bullet': function(e) {
          return e.stopPropagation();
        }
      };

      SliderView.prototype.collectionEvents = {
        'slide:image:url:updated': function() {
          this.render();
          return this.triggerMethod('show');
        }
      };

      SliderView.prototype.onClose = function() {
        return delete this.revapi;
      };

      SliderView.prototype._getSliderRatio = function() {
        var height, width;
        width = this.$el.width();
        height = this.$el.height();
        return "" + (parseInt(width)) + ":" + (parseInt(height));
      };

      SliderView.prototype.initialize = function(options) {
        if (options == null) {
          options = {};
        }
        SliderView.__super__.initialize.call(this, options);
        return this.sliderHeight = Marionette.getOption(this, 'sliderHeight');
      };

      SliderView.prototype.onShow = function() {
        var defaults, options;
        if (this.collection.length === 0) {
          return;
        }
        defaults = this._getDefaults();
        options = {
          startheight: this.sliderHeight
        };
        options = _.defaults(options, defaults);
        this.revapi = this.$el.find(".fullwidthbanner").revolution(options);
        this.$el.resizable({
          helper: "ui-image-resizable-helper",
          handles: "s",
          stop: (function(_this) {
            return function(evt, ui) {
              console.log(_this.$el.height());
              options.startheight = _this.$el.height();
              _this.$el.width('auto');
              _this.revapi = _this.$el.find(".fullwidthbanner").revolution(options);
              return _this._saveSliderHeightWidth();
            };
          })(this)
        });
        $('.aj-imp-publish').on('click', this._saveSliderHeightWidth);
        return this._saveSliderHeightWidth();
      };

      SliderView.prototype._saveSliderHeightWidth = function() {
        return this.trigger("set:slider:height:width", this.$el.height(), this.$el.width());
      };

      SliderView.prototype.getTallestColumnHeight = function() {
        var column, height, row;
        column = this.$el.closest('.column');
        if (column.length === 0) {
          return 350;
        }
        row = column.closest('.row');
        height = 350;
        $(row).children('.column').each(function(index, col) {
          if ($(col).height() >= height) {
            return height = $(col).height();
          }
        });
        return height;
      };

      SliderView.prototype._getDefaults = function() {
        return {
          delay: 9000,
          startwidth: '100%',
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
          autoHeight: "on",
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
        };
      };

      SliderView.prototype.onBeforeClose = function() {
        return $('.aj-imp-publish').off('click', this._saveSliderHeightWidth);
      };

      return SliderView;

    })(Marionette.CompositeView);
  });
});
