var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'apps/builder/site-builder/elements/languageswitcher/views', 'apps/builder/site-builder/elements/languageswitcher/settings/controller'], function(App) {
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
          size: 'thumbnail',
          element: 'LanguageSwitcher',
          style: 'Default Style'
        });
        return Controller.__super__.initialize.call(this, options);
      };

      Controller.prototype.bindEvents = function() {
        this.listenTo(this.layout.model, "change:style", this.renderElement);
        return Controller.__super__.bindEvents.call(this);
      };

      Controller.prototype._getLanguageSwitcherView = function(languageSwitcherModel, style) {
        return new LanguageSwitcher.Views.LanguageSwitcherView({
          model: languageSwitcherModel,
          collection: this.collection,
          style: style
        });
      };

      Controller.prototype.renderElement = function() {
        var collection, languageSwitcherModel, style;
        this.removeSpinner();
        languageSwitcherModel = new Backbone.Model;
        style = this.layout.model.get('style');
        collection = App.request("get:site:languageswitcher");
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
