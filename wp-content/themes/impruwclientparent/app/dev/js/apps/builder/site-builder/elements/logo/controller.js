var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/builder/site-builder/elements/logo/views', 'apps/builder/site-builder/elements/logo/settings/controller'], function(App) {
  return App.module('SiteBuilderApp.Element.Logo', function(Logo, App, Backbone, Marionette, $, _) {
    return Logo.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.renderElement = __bind(this.renderElement, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        _.defaults(options.modelData, {
          element: 'Logo',
          image_id: 0,
          size: 'thumbnail'
        });
        return Controller.__super__.initialize.call(this, options);
      };

      Controller.prototype.bindEvents = function() {
        this.listenTo(this.layout.model, "change:image_id", this.renderElement);
        return Controller.__super__.bindEvents.call(this);
      };

      Controller.prototype._getLogoView = function(imageModel) {
        return new Logo.Views.LogoView({
          model: imageModel
        });
      };

      Controller.prototype.renderElement = function() {
        var imageModel;
        this.removeSpinner();
        if (this.layout.model.get('image_id') !== 0) {
          imageModel = App.request("get:media:by:id", this.layout.model.get('image_id'));
        } else {
          imageModel = new Backbone.Model;
        }
        return App.execute("when:fetched", imageModel, (function(_this) {
          return function() {
            var view;
            view = _this._getLogoView(imageModel);
            _this.listenTo(view, "show:media:manager", function() {
              return App.navigate("media-manager", {
                trigger: true
              });
            });
            return _this.layout.elementRegion.show(view);
          };
        })(this));
      };

      return Controller;

    })(App.SiteBuilderApp.Element.Controller);
  });
});