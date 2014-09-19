var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/slider-manager/edit-slider/slide-text-layer/slide-text-layer-views'], function(App, AppController) {
  return App.module("SliderManager.SlideTextLayer", function(SlideTextLayer, App) {
    SlideTextLayer.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        var blankLayerAdded;
        this.model = options.model;
        blankLayerAdded = false;
        if (!this.model.get('layers').length) {
          blankLayerAdded = true;
          this.model.set('layers', [this.layerDefault()]);
        }
        this.view = this._getTextLayerView();
        this.listenTo(this.view, 'add:text:layer', function() {});
        this.listenTo(this.view, 'itemview:remove:text:layer', function(itemview) {});
        this.listenTo(this.view, 'save:text:layer', (function(_this) {
          return function() {
            _this.model.save();
            _this.model.trigger('model:changed');
            return Marionette.triggerMethod.call(_this.region, "slide:layers:saved");
          };
        })(this));
        this.listenTo(this.view, 'cancel:text:layer', (function(_this) {
          return function() {
            if (blankLayerAdded) {
              _this.model.set('layers', []);
            }
            return Marionette.triggerMethod.call(_this.region, "slide:layers:saved");
          };
        })(this));
        return this.show(this.view);
      };

      Controller.prototype.onClose = function() {
        return console.log('closed');
      };

      Controller.prototype._getTextLayerView = function() {
        return new SlideTextLayer.Views.TextLayerView({
          model: this.model
        });
      };

      Controller.prototype.layerDefault = function() {
        return {
          align_hor: "left",
          align_vert: "top",
          alt: "",
          animation: "tp-fade",
          attrClasses: "",
          attrID: "",
          attrRel: "",
          attrTitle: "",
          corner_left: "nothing",
          corner_right: "nothing",
          easing: "Power3.easeInOut",
          endSpeedFinal: 300,
          endTimeFinal: 8700,
          endanimation: "auto",
          endeasing: "nothing",
          endspeed: 300,
          endsplit: "none",
          endsplitdelay: "10",
          endtime: "",
          height: -1,
          hiddenunder: false,
          left: 'center',
          link: "",
          link_open_in: "same",
          link_slide: "nothing",
          max_height: "auto",
          max_width: "auto",
          realEndTime: 9000,
          resizeme: true,
          scaleProportional: false,
          scaleX: "",
          scaleY: "",
          scrollunder_offset: "",
          serial: 0,
          speed: 300,
          split: "none",
          splitdelay: "10",
          style: "black",
          text: "Caption Text",
          time: 500,
          timeLast: 8500,
          top: 'center',
          type: "text",
          whitespace: "nowrap",
          width: -1
        };
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler('show:slide:text:layer', function(opts) {
      return new SlideTextLayer.Controller(opts);
    });
  });
});
