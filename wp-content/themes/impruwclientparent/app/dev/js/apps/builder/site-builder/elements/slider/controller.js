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
          slider_id: 0
        });
        return Controller.__super__.initialize.call(this, options);
      };

      Controller.prototype.bindEvents = function() {
        this.listenTo(this.layout.model, "change:style", this.renderElement);
        return Controller.__super__.bindEvents.call(this);
      };

      Controller.prototype._getSliderView = function(collection) {
        return new Slider.Views.SliderView({
          collection: collection
        });
      };

      Controller.prototype.renderElement = function() {
        var collection, view;
        this.removeSpinner();
        collection = new Backbone.Collection([
          {
            image: 'dsds',
            order: 1
          }, {
            image: 'dsds',
            order: 2
          }, {
            image: 'dsds',
            order: 3
          }
        ]);
        view = this._getSliderView(collection);
        this.listenTo(view, "itemview:show:slider:manager", (function(_this) {
          return function() {
            return App.navigate("slider-manager", {
              trigger: true
            });
          };
        })(this));
        return this.layout.elementRegion.show(view);
      };

      return Controller;

    })(App.SiteBuilderApp.Element.Controller);
  });
});
