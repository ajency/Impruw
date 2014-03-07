var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/builder/site-builder/elements/slider/views', 'apps/builder/site-builder/elements/slider/settings/controller'], function(App) {
  return App.module('SiteBuilderApp.Element.Slider', function(Slider, App, Backbone, Marionette, $, _) {
    return Slider.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.renderElement = __bind(this.renderElement, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        _.defaults(options.modelData, {
          element: 'Slider',
          slider_id: 1
        });
        return Controller.__super__.initialize.call(this, options);
      };

      Controller.prototype.bindEvents = function() {
        this.listenTo(this.layout.model, "change:slider_id", this.renderElement(null));
        return Controller.__super__.bindEvents.call(this);
      };

      Controller.prototype._getSliderView = function(collection) {
        return new Slider.Views.SliderView({
          collection: collection
        });
      };

      Controller.prototype.renderElement = function(slidesCollection) {
        this.removeSpinner();
        if (!_.isObject(slidesCollection)) {
          slidesCollection = App.request("get:slides:for:slide", this.layout.model.get('slider_id'));
        }
        return App.execute("when:fetched", slidesCollection, (function(_this) {
          return function() {
            var view;
            view = _this._getSliderView(slidesCollection);
            _this.listenTo(view, "show:slides:manager", function() {
              return App.execute("show:slides:manager", slidesCollection);
            });
            _this.listenTo(slidesCollection, "remove add slides:order:updated", function() {
              return _this.renderElement(slidesCollection);
            });
            return _this.layout.elementRegion.show(view);
          };
        })(this));
      };

      return Controller;

    })(App.SiteBuilderApp.Element.Controller);
  });
});
