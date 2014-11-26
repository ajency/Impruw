var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['app', 'controllers/base-controller', 'apps/language-translation/language-menus/original-menu/view'], function(App, AppController) {
  return App.module('LanguageApp.LanguageMenuContent.OriginalMenu', function(OriginalMenu, App, Backbone, Marionette, $, _) {
    OriginalMenu.Controller = (function(_super) {
      __extends(Controller, _super);

      function Controller() {
        return Controller.__super__.constructor.apply(this, arguments);
      }

      Controller.prototype.initialize = function(opts) {
        this.editLang = opts.editLang;
        this.headerElementsCollection = App.request("get:header:elements");
        this.originalMenuView = this._getMenuView(this.headerElementsCollection);
        return this.show(this.originalMenuView, {
          loading: true
        });
      };

      Controller.prototype._getMenuView = function(collection) {
        return new OriginalMenu.Views.OriginalMenuView({
          collection: collection
        });
      };

      return Controller;

    })(AppController);
    return App.commands.setHandler("original:menu:app", function(opts) {
      return new OriginalMenu.Controller(opts);
    });
  });
});
