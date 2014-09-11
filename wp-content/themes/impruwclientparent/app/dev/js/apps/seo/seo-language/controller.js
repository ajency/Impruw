var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/seo/seo-language/view'], function(App, AppController) {
  return App.module('SeoApp.SeoLanguage', function(SeoLanguage, App, Backbone, Marionette, $, _) {
    SeoLanguage.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var collection;
        this.collection = collection = App.request("get:all:languages");
        this.languageSelectionView = this._getLanguageView(this.collection);
        this.listenTo(this.languageSelectionView, "load:seo:page:nav", this.loadSeoPageNav);
        return this.show(this.languageSelectionView, {
          loading: true
        });
      };

      Controller.prototype._getLanguageView = function(collection, model) {
        return new SeoLanguage.Views.SeoLanguageView({
          collection: collection
        });
      };

      Controller.prototype.loadSeoPageNav = function(selectedSeoLanguage) {
        return Marionette.triggerMethod.call(this.region, "load:seo:page:nav:bar", selectedSeoLanguage);
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("seo:language:selection:app", function(opts) {
      return new SeoLanguage.Controller(opts);
    });
  });
});
