var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-page-nav/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguagePageNav', function(LanguagePageNav, App, Backbone, Marionette, $, _) {
    LanguagePageNav.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        var collection, language;
        language = opts.language;
        this.collection = collection = App.request("get:all:pages", language);
        this.languagePageNavView = this._getPageNavView(this.collection);
        this.listenTo(this.languagePageNavView, "itemview:page:room:content", this.loadLanguagePageRoomContent);
        return this.show(this.languagePageNavView, {
          loading: true
        });
      };

      Controller.prototype._getPageNavView = function(collection) {
        return new LanguagePageNav.Views.LanguagePageNavView({
          collection: collection
        });
      };

      Controller.prototype.loadLanguagePageRoomContent = function() {
        return Marionette.triggerMethod.call(this.region, "load:page:room:content");
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("show:language:page:nav:app", function(opts) {
      return new LanguagePageNav.Controller(opts);
    });
  });
});
