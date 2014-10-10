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

      SliderItem.prototype.template = '<img src="{{full_url}}" alt="Slide" data-bgfit="contain" data-bgposition="center center" data-bgrepeat="no-repeat"/> {{#layers}}<div class="tp-caption {{style}} {{animation}}" data-x="{{left}}" data-y="{{top}}" data-speed="{{speed}}" data-start="{{time}}" data-easing="{{easing}}" data-endspeed="{{endspeed}}" style="z-index: 6">{{{txt}}} </div>{{/layers}}';

      SliderItem.prototype.tagName = 'li';

      SliderItem.prototype.events = {
        'click a': function(e) {
          return e.preventDefault();
        }
      };

      SliderItem.prototype.mixinTemplateHelpers = function(data) {
        data = SliderItem.__super__.mixinTemplateHelpers.call(this, data);
        if (data.layers.length) {
          data.txt = _.stripslashes(data.layers[0].text);
        }
        return data;
      };

      SliderItem.prototype.onRender = function() {
        return this.$el.attr('data-slotamount', '0').attr('data-masterspeed', '500').attr('data-transition', Marionette.getOption(this, 'slide_transition'));
      };

      SliderItem.prototype.modelEvents = {
        'change:thumb_url change:full_url': function(model) {
          return model.collection.trigger('slide:image:url:updated');
        },
        'model:changed': function() {
          return this.trigger('render:slider');
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

      SliderView.prototype.itemViewOptions = function() {
        return {
          slide_transition: this.model.get('reset_transitions')
        };
      };

      SliderView.prototype.events = {
        'click': 'sliderClick',
        'click .tp-rightarrow,.tp-leftarrow,.bullet': function(e) {
          return e.stopPropagation();
        }
      };

      SliderView.prototype.modelEvents = {
        'change:reset_transitions': 'changeTransitions'
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

      SliderView.prototype.changeTransitions = function(model, reset_transitions) {
        return this.trigger('render:slider');
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
        return SliderView.__super__.initialize.call(this, options);
      };

      SliderView.prototype.onShow = function() {
        var defaults, options;
        if (this.collection.length === 0) {
          this.model.set('height', this.$el.height());
          this.model.set('width', this.$el.width());
          this.$el.resizable({
            helper: "ui-image-resizable-helper",
            handles: "s",
            stop: (function(_this) {
              return function() {
                return _this.model.set('height', _this.$el.height());
              };
            })(this)
          });
          return;
        }
        defaults = this._getDefaults();
        options = {
          startheight: parseInt(this.model.get('height')),
          startwidth: this.$el.width()
        };
        options = _.defaults(options, defaults);
        this.revapi = this.$el.find(".fullwidthbanner").revolution(options);
        return this.$el.resizable({
          helper: "ui-image-resizable-helper",
          handles: "s",
          stop: (function(_this) {
            return function(evt, ui) {
              console.log(_this.$el.height());
              _this.$el.width('auto');
              options = {
                startheight: _this.$el.height(),
                startwidth: _this.$el.width()
              };
              _this.revapi = _this.$el.find(".fullwidthbanner").revolution(options);
              return _this._saveSliderHeightWidth();
            };
          })(this),
          start: (function(_this) {
            return function(evt, ui) {
              return $(_this).addClass('noclick');
            };
          })(this)
        });
      };

      SliderView.prototype.sliderClick = function(e) {
        var ratio;
        e.stopPropagation();
        if ($(e.target).hasClass('noclick')) {
          return $(e.target).removeClass('noclick');
        } else {
          ratio = this._getSliderRatio();
          return this.trigger("show:slides:manager", ratio);
        }
      };

      SliderView.prototype._saveSliderHeightWidth = function() {
        return this.trigger("set:slider:height:width", this.$el.height(), this.$el.width());
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

      return SliderView;

    })(Marionette.CompositeView);
  });
});
