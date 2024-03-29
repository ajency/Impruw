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
          height: 156,
          slider_id: 0,
          reset_transitions: 'fade'
        });
        return Controller.__super__.initialize.call(this, options);
      };

      Controller.prototype.bindEvents = function() {
        this.listenTo(this.layout.model, "change:slider_id", this.renderElement);
        return Controller.__super__.bindEvents.call(this);
      };

      Controller.prototype._getSliderView = function(collection) {
        return new Slider.Views.SliderView({
          collection: collection,
          model: this.layout.model
        });
      };

      Controller.prototype._getSlidesCollection = function() {
        if (!this.slidesCollection) {
          if (this.layout.model.get('slider_id') > 0) {
            this.slidesCollection = App.request("get:slides:for:slide", this.layout.model.get('slider_id'));
          } else {
            this.slidesCollection = App.request("get:slides:collection");
            this.slidesCollection.once("add", (function(_this) {
              return function(model) {
                _this.layout.model.set('slider_id', model.get('slider_id'));
                return _this.layout.model.save();
              };
            })(this));
          }
        }
        return this.slidesCollection;
      };

      Controller.prototype.renderElement = function() {
        this.removeSpinner();
        this._getSlidesCollection();
        return App.execute("when:fetched", this.slidesCollection, (function(_this) {
          return function() {
            var view;
            view = _this._getSliderView(_this.slidesCollection);
            _this.listenTo(view, 'show', function() {
              if (!_this.layout.model.get('width')) {
                return view.triggerMethod("set:width");
              }
            });
            _this.listenTo(view, "show:slides:manager", function(ratio) {
              App.execute("show:slides:manager", _this.slidesCollection, _this.layout.model.get('element'));
              return App.currentImageRatio = ratio;
            });
            _this.listenTo(view, "set:slider:height:width", function(height, width) {
              _this.layout.model.set('width', width);
              _this.layout.model.set('height', height);
              return _this.layout.model.save();
            });
            _this.listenTo(_this.slidesCollection, "remove add slides:order:updated", function() {
              view.close();
              _this.stopListening();
              return _this.renderElement();
            });
            _this.listenTo(view, "render:slider itemview:render:slider", function() {
              _this.layout.model.save();
              view.close();
              _this.stopListening();
              return _this.renderElement();
            });
            return _this.layout.elementRegion.show(view);
          };
        })(this));
      };

      return Controller;

    })(App.SiteBuilderApp.Element.Controller);
  });
});
