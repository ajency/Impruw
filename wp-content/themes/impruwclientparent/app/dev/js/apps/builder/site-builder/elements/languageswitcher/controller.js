var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/builder/site-builder/elements/languageswitcher/views'], function(App) {
  return App.module('SiteBuilderApp.Element.LanguageSwitcher', function(LanguageSwitcher, App, Backbone, Marionette, $, _) {
    return LanguageSwitcher.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        this.renderElement = __bind(this.renderElement, this);
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(options) {
        var collection;
        this.collection = collection = App.request("get:selected:languages");
        _.defaults(options.modelData, {
          element: 'LanguageSwitcher',
          image_id: 0,
          size: 'thumbnail'
        });
        return Controller.__super__.initialize.call(this, options);
      };

      Controller.prototype._getLanguageSwitcherView = function(languageSwitcherModel) {
        return new LanguageSwitcher.Views.LanguageSwitcherView({
          model: languageSwitcherModel,
          collection: this.collection
        });
      };

      Controller.prototype.renderElement = function() {
        var languageSwitcherModel;
        this.removeSpinner();
        languageSwitcherModel = new Backbone.Model;
        return App.execute("when:fetched", languageSwitcherModel, (function(_this) {
          return function() {
            var view;
            view = _this._getLanguageSwitcherView(languageSwitcherModel);
            return _this.layout.elementRegion.show(view);
          };
        })(this));
      };

      return Controller;

    })(App.SiteBuilderApp.Element.Controller);
  });
});
